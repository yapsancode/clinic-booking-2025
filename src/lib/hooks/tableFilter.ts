"use client";

import { useState, useMemo } from "react";
import { isAfter, parseISO, isWithinInterval } from "date-fns";

export interface TableFilterOptions<T> {
    /** The full dataset */
    data: T[];
    /** Search fields */
    searchFields?: (item: T) => string[];
    /** Date parsing */
    getDate?: (item: T) => string | null;
    /** Badge field */
    getBadge?: (item: T) => string | null;
    /** NEW: Custom filter function */
    customFilters?: {
        [key: string]: {
            getValue: (item: T) => any;
            options?: string[];
        };
    };
}

export interface TableFilter<T> {
    filteredData: T[];
    filter: string;
    setFilter: (val: string) => void;
    badgeFilter: string;
    setBadgeFilter: (val: string) => void;
    dateFilter: string;
    setDateFilter: (val: string) => void;
    dateRange: [Date | null, Date | null];
    setDateRange: (range: [Date | null, Date | null]) => void;
    search: string;
    setSearch: (val: string) => void;
    resetFilters: () => void;
    // NEW: Dynamic custom filters
    customFilterValues: Record<string, string>;
    setCustomFilter: (key: string, value: string) => void;
}

export function tableFilter<T>({
    data,
    searchFields,
    getDate,
    getBadge,
    customFilters = {},
}: TableFilterOptions<T>): TableFilter<T> {
    const [filter, setFilter] = useState("All");
    const [badgeFilter, setBadgeFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All");
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [search, setSearch] = useState("");
    
    // NEW: Dynamic custom filter state
    const [customFilterValues, setCustomFilterValues] = useState<Record<string, string>>(
        Object.keys(customFilters).reduce((acc, key) => ({ ...acc, [key]: "All" }), {})
    );

    const [startDate, endDate] = dateRange;

    const filteredData = useMemo(() => {
        return data
            .filter((item) => {
                // Active/Expired filter
                if (filter === "All") return true;
                const dateStr = getDate ? getDate(item) : null;
                if (!dateStr) return false;
                const date = parseISO(dateStr);
                if (filter === "Active") return isAfter(date, new Date());
                if (filter === "Expired") return !isAfter(date, new Date());
                return true;
            })
            .filter((item) => {
                // Badge filter
                if (badgeFilter === "All") return true;
                const badge = getBadge ? getBadge(item) : null;
                return badge === badgeFilter;
            })
            .filter((item) => {
                // Date range filter
                if (dateFilter !== "Custom") return true;
                if (!startDate || !endDate || !getDate) return true;
                const dateStr = getDate(item);
                if (!dateStr) return false;
                const date = parseISO(dateStr);
                return isWithinInterval(date, { start: startDate, end: endDate });
            })
            .filter((item) => {
                // NEW: Custom filters
                return Object.entries(customFilterValues).every(([key, value]) => {
                    if (value === "All") return true;
                    const filterConfig = customFilters[key];
                    if (!filterConfig) return true;
                    const itemValue = filterConfig.getValue(item);
                    return itemValue === value;
                });
            })
            .filter((item) => {
                // Search filter
                if (!search.trim() || !searchFields) return true;
                const searchValue = search.toLowerCase();
                return searchFields(item).some((field) =>
                    field.toLowerCase().includes(searchValue)
                );
            });
    }, [data, filter, badgeFilter, dateFilter, startDate, endDate, search, customFilterValues]);

    const setCustomFilter = (key: string, value: string) => {
        setCustomFilterValues(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilter("All");
        setBadgeFilter("All");
        setDateFilter("All");
        setDateRange([null, null]);
        setSearch("");
        setCustomFilterValues(
            Object.keys(customFilters).reduce((acc, key) => ({ ...acc, [key]: "All" }), {})
        );
    };

    return {
        filteredData,
        filter,
        setFilter,
        badgeFilter,
        setBadgeFilter,
        dateFilter,
        setDateFilter,
        dateRange,
        setDateRange,
        search,
        setSearch,
        resetFilters,
        customFilterValues,
        setCustomFilter,
    };
}