"use client";
import { useBooking } from "@/context/BookingContext";
import StepsIndicator from "@/components/booking/StepsIndicator";
import StepAppointment from "@/components/booking/steps/StepAppointment";
import StepConfirm from "@/components/booking/steps/StepConfirm";
import StepCompleted from "@/components/booking/steps/StepCompleted";

export default function BookingForm() {
  const { currentStep } = useBooking();
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Page Title Section */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Book Your Medical Appointment
      </h1>
      
      <StepsIndicator currentStep={currentStep} />
      
      <main>
        {currentStep === 1 && <StepAppointment />}
        {currentStep === 2 && <StepConfirm />}
        {currentStep === 3 && <StepCompleted />}
      </main>
    </div>
  );
}