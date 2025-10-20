import { BookingProvider } from "@/context/BookingContext";
import BookingForm from "./BookingForm";
import { notFound } from "next/navigation";

export default function BookAppointmentPage() {
  
  // temporary logic to hide this page
  const isInvalid = true

  if (isInvalid) {
    notFound();
  }

  
  return (
    <BookingProvider>
      <BookingForm />
    </BookingProvider>
  );
}