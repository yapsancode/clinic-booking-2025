"use client";

import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import TableSection from "../components/TableSection";
import { tableFilter } from "@/lib/hooks/tableFilter";
import SlotModal from "../components/Modal/SlotsModal";

// Slot interface
interface Slot {
    id: number;
    serviceId: string;
    serviceName: string;
    slotDate: string;
    startTime: string;
    endTime: string;
    doctor?: string;
}

// Mock data
const mockSlots: Slot[] = [
    {
        id: 1,
        serviceId: "S001",
        serviceName: "Dental Check-up",
        slotDate: "2025-10-16",
        startTime: "09:00",
        endTime: "09:30",
        doctor: "Dr. Raj Kumar",
    },
    {
        id: 2,
        serviceId: "S002",
        serviceName: "General Consultation",
        slotDate: "2025-10-17",
        startTime: "10:00",
        endTime: "10:30",
        doctor: "Dr. Lee Kok Seng",
    },
];

export default function SlotMgmtPage() {
    const [slots, setSlots] = useState<Slot[]>(mockSlots);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    const emptySlot: Omit<Slot, "id"> = {
        serviceId: "",
        serviceName: "",
        slotDate: "",
        startTime: "",
        endTime: "",
        doctor: "",
    };

    const [formData, setFormData] = useState(emptySlot);

    // Filters
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
    } = tableFilter<Slot>({
        data: slots,
        searchFields: (slot) => [slot.serviceName, slot.doctor ?? ""],
        getDate: (slot) => slot.slotDate,
    });

    // Open Add/Edit Modal
    const openModal = (slot?: Slot) => {
        if (slot) {
            setSelectedSlot(slot);
            setFormData({
                serviceId: slot.serviceId,
                serviceName: slot.serviceName,
                slotDate: slot.slotDate,
                startTime: slot.startTime,
                endTime: slot.endTime,
                doctor: slot.doctor || "",
            });
        } else {
            setSelectedSlot(null);
            setFormData(emptySlot);
        }
        setIsModalOpen(true);
    };

    // Save Slot
    const handleSave = () => {
        if (!formData.serviceId || !formData.serviceName || !formData.slotDate)
            return alert("Please fill all required fields.");

        if (selectedSlot) {
            // Update existing
            setSlots((prev) =>
                prev.map((slot) =>
                    slot.id === selectedSlot.id ? { ...slot, ...formData } : slot
                )
            );
        } else {
            // Add new
            const newSlot: Slot = {
                id: slots.length ? Math.max(...slots.map((s) => s.id)) + 1 : 1,
                ...formData,
            };
            setSlots((prev) => [...prev, newSlot]);
        }

        setIsModalOpen(false);
        setSelectedSlot(null);
    };

    // Delete Slot
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
                    { key: "startTime", label: "Start Time" },
                    { key: "endTime", label: "End Time" },
                    { key: "doctor", label: "Assigned Doctor" },
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
                }}
                showDateFilter
                showStatusFilter={false}
                onAdd={() => openModal()}
                addLabel="Add Slot"
            />

            {/* Modal for Add/Edit Slot */}
            <SlotModal
                isOpen={isModalOpen}
                initialData={selectedSlot}
                onSave={handleSave}
                onClose={() => setIsModalOpen(false)}
            />

        </>
    );
}
