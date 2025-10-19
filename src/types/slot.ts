// src/types/slot.ts

export type SlotStatus = "Available" | "Booked" | "Blocked";

export interface Slot {
  id: number;
  serviceId: string;
  serviceName: string;
  slotDate: string;      // YYYY-MM-DD
  startTime: string;     // HH:mm
  endTime: string;       // HH:mm
  doctor?: string;
  status?: SlotStatus;
}
