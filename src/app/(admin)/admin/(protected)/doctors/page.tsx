"use client";

import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { tableFilter } from "@/lib/hooks/tableFilter";
import TableSection from "../components/TableSection";
import DoctorModal, { Doctor } from "../components/Modal/DoctorModal";

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Smith",
    image: "/images/doctors/smith.jpg",
    specialty: "General Practitioner",
    email: "smith@klinikmekar.com",
    phone: "+60 3-1234 5678",
    unavailableSlots: {
      "2025-10-15": ["09:00", "14:00"],
      "2025-10-16": ["11:00", "13:30"],
    },
  },
  {
    id: 2,
    name: "Dr. Raj Kumar",
    image: "/images/doctors/raj.jpg",
    specialty: "Dentist",
    email: "raj@klinikmekar.com",
    phone: "+60 3-8765 4321",
    unavailableSlots: {
      "2025-10-15": ["10:30", "15:30"],
      "2025-10-17": ["11:30", "16:30"],
    },
  },
  {
    id: 3,
    name: "Dr. Lee Kok Seng",
    image: "/images/doctors/lee.jpg",
    specialty: "Dermatologist",
    email: "lee@klinikmekar.com",
    phone: "+60 3-2468 1357",
    unavailableSlots: {
      "2025-10-16": ["08:30", "16:00"],
      "2025-10-18": ["10:00", "15:00"],
    },
  },
  {
    id: 4,
    name: "Dr. Sarah Tan",
    image: "/images/doctors/sarah.jpg",
    specialty: "Dentist",
    email: "sarah@klinikmekar.com",
    phone: "+60 3-9876 5432",
    unavailableSlots: {},
  },
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique specialties for filter
  const uniqueSpecialties = Array.from(
    new Set(doctors.map((d) => d.specialty))
  );

  // Enhanced filtering
  const filterState = tableFilter<Doctor>({
    data: doctors,
    searchFields: (doc) => [doc.name, doc.email, doc.specialty, doc.phone],
    getBadge: (doc) => doc.specialty,
    customFilters: {
      specialty: {
        getValue: (doc) => doc.specialty,
        options: uniqueSpecialties,
      },
    },
  });

  const {
    filteredData: filteredDoctors,
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

  const handleSaveDoctor = (doctor: Doctor | Omit<Doctor, "id">) => {
    if ("id" in doctor) {
      setDoctors((prev) =>
        prev.map((d) => (d.id === doctor.id ? doctor : d))
      );
    } else {
      const newDoctor: Doctor = {
        ...doctor,
        id: Math.max(...doctors.map((d) => d.id)) + 1,
        unavailableSlots: {},
      };
      setDoctors((prev) => [...prev, newDoctor]);
    }
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="relative">
      <TableSection
        title="Doctors Management"
        data={filteredDoctors}
        columns={[
          {
            key: "name",
            label: "Doctor",
            render: (doc) => (
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="text-gray-900">{doc.name}</span>
              </div>
            ),
          },
          { 
            key: "specialty", 
            label: "Specialty",
            render: (doc) => (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
                {doc.specialty}
              </span>
            ),
          },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
        ]}
        actions={(doc) => (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setSelectedDoctor(doc);
                setIsModalOpen(true);
              }}
              className="text-teal-500 hover:text-teal-600"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(doc.id)}
              className="text-red-500 hover:text-red-600"
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
          specialty: {
            label: "Specialty",
            options: uniqueSpecialties,
          },
        }}
        badgeOptions={[]}
        showDateFilter={false}
        showStatusFilter={false}
        onAdd={() => {
          setSelectedDoctor(null);
          setIsModalOpen(true);
        }}
        addLabel="Add Doctor"
      />

      <DoctorModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDoctor(null);
        }}
        onSave={handleSaveDoctor}
        initialData={selectedDoctor}
      />
    </div>
  );
}