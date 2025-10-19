"use client";

import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import TableSection from "../components/TableSection";
import { tableFilter } from "@/lib/hooks/tableFilter";
import SlotModal from "../components/Modal/SlotsModal";
import { getSlots, createSlot, updateSlot, deleteSlot } from "@/lib/api/slotService";

interface Slot {
    id: number;
    serviceId: string;
    serviceName: string;
    slotDate: string;
    startTime: string;
    endTime: string;
    doctor?: string;
    status?: "Available" | "Booked" | "Blocked"; // NEW
}

const mockSlots: Slot[] = [
    {
        id: 1,
        serviceId: "S001",
        serviceName: "Dental Check-up",
        slotDate: "2025-10-16",
        startTime: "09:00",
        endTime: "09:30",
        doctor: "Dr. Raj Kumar",
        status: "Available",
    },
    {
        id: 2,
        serviceId: "S002",
        serviceName: "General Consultation",
        slotDate: "2025-10-17",
        startTime: "10:00",
        endTime: "10:30",
        doctor: "Dr. Lee Kok Seng",
        status: "Booked",
    },
    {
        id: 3,
        serviceId: "S003",
        serviceName: "Blood Test",
        slotDate: "2025-10-18",
        startTime: "14:00",
        endTime: "14:30",
        doctor: "Dr. Raj Kumar",
        status: "Available",
    },
    {
        id: 4,
        serviceId: "S001",
        serviceName: "Dental Check-up",
        slotDate: "2025-10-19",
        startTime: "11:00",
        endTime: "11:30",
        doctor: "Dr. Sarah Tan",
        status: "Blocked",
    },
];

export default function SlotMgmtPage() {

    
    const [slots, setSlots] = useState<Slot[]>(mockSlots);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    // Get unique doctors and services for filter options
    const uniqueDoctors = Array.from(
        new Set(slots.map(s => s.doctor).filter((d): d is string => Boolean(d)))
    );
    const uniqueServices = Array.from(new Set(slots.map(s => s.serviceName)));

    // Enhanced filters with custom filters
    const filterState = tableFilter<Slot>({
        data: slots,
        searchFields: (slot) => [slot.serviceName, slot.doctor ?? "", slot.serviceId],
        getDate: (slot) => slot.slotDate,
        // NEW: Custom filters for doctor, service, and slot status
        customFilters: {
            doctor: {
                getValue: (slot) => slot.doctor ?? "",
                options: uniqueDoctors,
            },
            service: {
                getValue: (slot) => slot.serviceName,
                options: uniqueServices,
            },
            slotStatus: {
                getValue: (slot) => slot.status ?? "Available",
                options: ["Available", "Booked", "Blocked"],
            },
        },
    });

    const {
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
    } = filterState;

    const openModal = (slot?: Slot) => {
        if (slot) {
            setSelectedSlot(slot);
        } else {
            setSelectedSlot(null);
        }
        setIsModalOpen(true);
    };

    const handleSave = (data: any) => {
        if (selectedSlot) {
            setSlots((prev) =>
                prev.map((slot) =>
                    slot.id === selectedSlot.id ? { ...slot, ...data } : slot
                )
            );
        } else {
            const newSlot: Slot = {
                id: slots.length ? Math.max(...slots.map((s) => s.id)) + 1 : 1,
                ...data,
            };
            setSlots((prev) => [...prev, newSlot]);
        }
        setIsModalOpen(false);
        setSelectedSlot(null);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this slot?")) {
            setSlots((prev) => prev.filter((s) => s.id !== id));
        }
    };

    return (
        <>
            <TableSection
                title="Appointment Slot Management"
                data={filteredData}
                columns={[
                    { key: "serviceId", label: "Service ID" },
                    { key: "serviceName", label: "Service Name" },
                    { key: "slotDate", label: "Slot Date" },
                    { 
                        key: "startTime", 
                        label: "Time Slot",
                        render: (slot) => `${slot.startTime} - ${slot.endTime}`
                    },
                    { key: "doctor", label: "Assigned Doctor" },
                    {
                        key: "status",
                        label: "Status",
                        render: (slot) => (
                            <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    slot.status === "Available"
                                        ? "bg-green-100 text-green-700"
                                        : slot.status === "Booked"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {slot.status}
                            </span>
                        ),
                    },
                ]}
                actions={(row) => (
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => openModal(row)}
                            className="text-teal-500 hover:text-teal-600"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete((row as Slot).id)}
                            className="text-red-500 hover:text-red-600"
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                )}
                filterState={{
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
                }}
                // NEW: Custom filter UI configuration
                customFilters={{
                    doctor: {
                        label: "Doctor",
                        options: uniqueDoctors,
                    },
                    service: {
                        label: "Service Type",
                        options: uniqueServices,
                    },
                    slotStatus: {
                        label: "Slot Status",
                        options: ["Available", "Booked", "Blocked"],
                    },
                }}
                showDateFilter
                badgeOptions={[]} // No badge filter needed for slots
                onAdd={() => openModal()}
                addLabel="Add Slot"
            />

            <SlotModal
                isOpen={isModalOpen}
                initialData={selectedSlot}
                onSave={handleSave}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}