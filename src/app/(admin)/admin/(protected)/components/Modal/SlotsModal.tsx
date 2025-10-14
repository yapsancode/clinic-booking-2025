"use client";

import React, { useState, useEffect } from "react";

export interface Slot {
  id: number;
  serviceId: string;
  serviceName: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  doctor?: string;
}

interface SlotModalProps {
  isOpen: boolean;
  initialData?: Slot | null;
  onSave: (data: Omit<Slot, "id"> & { id?: number | undefined }) => void;
  onClose: () => void;
}

export default function SlotModal({
  isOpen,
  initialData,
  onSave,
  onClose,
}: SlotModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Omit<Slot, "id">>({
    serviceId: "",
    serviceName: "",
    slotDate: "",
    startTime: "09:00",
    endTime: "09:30",
    doctor: "",
  });
  const [slotId, setSlotId] = useState<number | undefined>(undefined); // Changed from number | null to number | undefined
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setForm(rest);
      setSlotId(id); // Set slotId to the initial id if editing
      setStep(2); // Start at step 2 if editing
    } else {
      setForm({
        serviceId: "",
        serviceName: "",
        slotDate: "",
        startTime: "09:00",
        endTime: "09:30",
        doctor: "",
      });
      setSlotId(undefined); // Reset to undefined for new slots
      setStep(1);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // API calls
  const createSlot = async (data: Omit<Slot, "id" | "doctor">) => {
    try {
      const response = await fetch('/api/create-slot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: data.serviceId,
          serviceName: data.serviceName,
          slotDate: data.slotDate,
          startTime: data.startTime,
          endTime: data.endTime,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to create slot');
      return result.slotId;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Network error');
    }
  };

  const assignDoctor = async (slotId: number, doctor: string) => {
    try {
      const response = await fetch('/api/assign-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId, doctor }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to assign doctor');
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Network error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (step === 1) {
        const newSlotId = await createSlot(form);
        setSlotId(newSlotId);
        setStep(2);
      } else if (step === 2) {
        if (!slotId) throw new Error('Slot ID is missing');
        await assignDoctor(slotId, form.doctor || '');
        onSave({ ...form, id: slotId }); // Safe to pass slotId here
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed z-50 top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Slot" : step === 1 ? "Create Slot (Step 1)" : "Assign Doctor (Step 2)"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              {/* Service ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service ID
                </label>
                <input
                  type="text"
                  value={form.serviceId}
                  onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
                  required
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Name
                </label>
                <input
                  type="text"
                  value={form.serviceName}
                  onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
                  required
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Slot Date
                </label>
                <input
                  type="date"
                  value={form.slotDate}
                  onChange={(e) => setForm({ ...form, slotDate: e.target.value })}
                  required
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    required
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    required
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div>
              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assign Doctor
                </label>
                <input
                  type="text"
                  value={form.doctor || ''}
                  onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  placeholder="Dr. Name"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-teal-300"
            >
              {isLoading ? "Saving..." : step === 1 ? "Next" : initialData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}