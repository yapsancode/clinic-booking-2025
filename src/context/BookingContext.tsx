"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { BookingForm } from "@/lib/validation";

interface BookingContextType {
  currentStep: number;
  form: BookingForm;
  setStep: (step: number) => void;
  setForm: (data: Partial<BookingForm>) => void;
  reset: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialFormState: BookingForm = {
  service: "",
  date: "",
  time: "",
  doctor: "",
  name: "",
  email: "",
  phone: "",
  reason: "",
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setFormState] = useState<BookingForm>(initialFormState);

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  const setForm = (data: Partial<BookingForm>) => {
    setFormState((prev) => ({ ...prev, ...data }));
  };

  const reset = () => {
    setCurrentStep(1);
    setFormState(initialFormState);
  };

  return (
    <BookingContext.Provider value={{ currentStep, form, setStep, setForm, reset }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}