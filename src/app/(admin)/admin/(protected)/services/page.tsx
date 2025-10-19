"use client";

import React, { useEffect, useState } from "react";
import { tableFilter } from "@/lib/hooks/tableFilter";
import { Pencil, Trash2 } from "lucide-react";
import ServiceModal from "../components/Modal/ServiceModal";
import TableSection from "../components/TableSection";
import { Service } from "@/types/services";
import { getSlots, createSlot, updateSlot, deleteSlot } from "@/lib/api/slotService";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchServices() {
            try {
                setLoading(true);
                const res = await getSlots();
                setServices(res.data?.services || []); // ✅ unwrap array

            } catch (err: any) {
                console.error("Failed to fetch services:", err);
                setError(err.message || "Failed to fetch services");
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);


    // ✅ Filters
    const filterState = tableFilter<Service>({
        data: services,
        searchFields: (s) => [s.name, s.serviceDesc],
        getBadge: (s) => (s.status ? "Deleted" : "Active"),
        customFilters: {
            status: {
                getValue: (s) => (s.status ? "Deleted" : "Active"),
                options: ["Active", "Deleted"],
            },
        },
    });

    const {
        filteredData,
        filter,
        setFilter,
        badgeFilter,
        setBadgeFilter,
        search,
        setSearch,
        resetFilters,
        customFilterValues,
        setCustomFilter,
    } = filterState;

    // ✅ Handle Create or Update
    const handleSaveService = async (service: Service | Omit<Service, "id">) => {
        try {
            if ("id" in service && service.id) {
                const updated = await updateSlot(service.id, service);
                setServices((prev) =>
                    prev.map((s) => (s.id === updated.id ? updated : s))
                );
            } else {
                const created = await createSlot(service);
                setServices((prev) => [...prev, created]);
            }
            setModalOpen(false);
            setEditingService(null);
        } catch (err: any) {
            alert(`Error saving service: ${err.message}`);
        }
    };

    // ✅ Handle Delete
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            await deleteSlot(id);
            setServices((prev) =>
                prev.map((s) => (s.id === id ? { ...s, status: true } : s))
            );
        } catch (err: any) {
            alert(`Error deleting service: ${err.message}`);
        }
    };

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Loading services...</p>;
    }

    if (error) {
        return (
            <p className="text-center mt-10 text-red-500">
                Failed to load services: {error}
            </p>
        );
    }

    return (
        <>
            <TableSection
                title="Services Management"
                data={filteredData}
                columns={[
                    { key: "id", label: "ID" },
                    { key: "name", label: "Service Name" },
                    { key: "status", label: "Service Description" },
                    {
                        key: "status",
                        label: "Status",
                        render: (item) => (
                            <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${item.status
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {item.status ? "Active" : "Inactive"}
                            </span>
                        ),
                    },
                ]}
                actions={(item) => (
                    <div className="flex items-center gap-2 justify-end">
                        <button
                            onClick={() => {
                                setEditingService(item);
                                setModalOpen(true);
                            }}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-600"
                            disabled={item.status}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
                filterState={{
                    filter,
                    setFilter,
                    badgeFilter,
                    setBadgeFilter,
                    search,
                    setSearch,
                    resetFilters,
                    customFilterValues,
                    setCustomFilter,
                }}
                customFilters={{
                    status: {
                        label: "Service Status",
                        options: ["Active", "Deleted"],
                    },
                }}
                showDateFilter={false}
                showStatusFilter={false}
                badgeOptions={[]}
                onAdd={() => {
                    setEditingService(null);
                    setModalOpen(true);
                }}
                addLabel="Add Service"
            />

            <ServiceModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveService}
                initialData={editingService}
            />
        </>
    );
}
