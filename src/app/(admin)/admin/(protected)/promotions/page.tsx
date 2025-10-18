"use client";

import React, { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Promotion } from "@/types/promotion";
import { tableFilter } from "@/lib/hooks/tableFilter";
import TableSection from "../components/TableSection";
import PromotionModal from "../components/Modal/PromotionModal";

const initialPromotions: Promotion[] = [
  {
    id: 1,
    image: "/images/klinik-mekar-outside.jpg",
    title: "Comprehensive Health Screening Package",
    description: "Complete health check-up with modern equipment and experienced medical professionals",
    discount: "30% OFF",
    validUntil: "2025-12-31",
    buttonText: "Book Now",
    buttonLink: "/book-screening",
    badge: "Popular",
  },
  {
    id: 2,
    image: "/images/klinik-mekar-interior-2.jpg",
    title: "Vaccination Campaign",
    description: "Protect yourself and your family with our comprehensive vaccination program",
    discount: "FREE Consultation",
    validUntil: "2025-11-30",
    buttonText: "Learn More",
    buttonLink: "/vaccination",
    badge: "Limited Time",
  },
  {
    id: 3,
    image: "/images/klinik-mekar-patient-room.jpg",
    title: "Specialist Consultation Discount",
    description: "Expert medical consultation with our board-certified specialists",
    discount: "25% OFF",
    validUntil: "2025-10-31",
    buttonText: "Schedule Visit",
    buttonLink: "/consultation",
    badge: "New",
  },
  {
    id: 4,
    image: "/images/klinik-mekar-outside.jpg",
    title: "Senior Citizen Health Package",
    description: "Special health screening package for seniors aged 60+",
    discount: "40% OFF",
    validUntil: "2025-11-15",
    buttonText: "Book Now",
    buttonLink: "/senior-package",
    badge: "Popular",
  },
];

interface PromotionFormData {
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  buttonText: string;
  buttonLink: string;
  badge: string;
  image: string;
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  // Get unique discount types for filter
  const uniqueDiscountTypes = Array.from(
    new Set(
      promotions.map((p) => {
        if (p.discount.includes("%")) return "Percentage";
        if (p.discount.includes("FREE")) return "Free";
        return "Other";
      })
    )
  );

  const filterState = tableFilter<Promotion>({
    data: promotions,
    searchFields: (p) => [p.title, p.description, p.badge, p.discount],
    getDate: (p) => p.validUntil,
    getBadge: (p) => p.badge,
    customFilters: {
      promoType: {
        getValue: (p) => p.badge,
        options: ["Popular", "New", "Limited Time"],
      },
      discountType: {
        getValue: (p) => {
          if (p.discount.includes("%")) return "Percentage";
          if (p.discount.includes("FREE")) return "Free";
          return "Other";
        },
        options: uniqueDiscountTypes,
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

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      setPromotions((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (data: PromotionFormData) => {
    if (selectedPromo) {
      setPromotions((prev) =>
        prev.map((p) =>
          p.id === selectedPromo.id ? { ...p, ...data } : p
        )
      );
    } else {
      const newPromo: Promotion = {
        ...data,
        id: promotions.length > 0 ? Math.max(...promotions.map((p) => p.id)) + 1 : 1,
      };
      setPromotions((prev) => [...prev, newPromo]);
    }

    setIsModalOpen(false);
    setSelectedPromo(null);
  };

  return (
    <>
      <TableSection
        title="Promotions Management"
        data={filteredData}
        columns={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { key: "discount", label: "Discount" },
          {
            key: "validUntil",
            label: "Valid Until",
            render: (item) => format(parseISO(item.validUntil), "MMM dd, yyyy"),
          },
          {
            key: "badge",
            label: "Badge",
            render: (item) => (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.badge === "Popular"
                    ? "bg-blue-100 text-blue-700"
                    : item.badge === "New"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.badge}
              </span>
            ),
          },
        ]}
        actions={(item) => (
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                setSelectedPromo(item);
                setIsModalOpen(true);
              }}
              className="text-blue-500 hover:text-blue-600"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <Link
              href={item.buttonLink}
              className="text-teal-500 hover:text-teal-600"
            >
              <Eye className="w-4 h-4" />
            </Link>
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
        customFilters={{
          promoType: {
            label: "Promotion Type",
            options: ["Popular", "New", "Limited Time"],
          },
          discountType: {
            label: "Discount Type",
            options: uniqueDiscountTypes,
          },
        }}
        showDateFilter
        showStatusFilter
        badgeOptions={[]}
        onAdd={() => {
          setSelectedPromo(null);
          setIsModalOpen(true);
        }}
        addLabel="Add Promotion"
      />

      <PromotionModal
        isOpen={isModalOpen}
        initialData={selectedPromo}
        onSave={handleSave}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPromo(null);
        }}
      />
    </>
  );
}