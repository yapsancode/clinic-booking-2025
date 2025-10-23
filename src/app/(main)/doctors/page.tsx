"use client";
import Image from "next/image";
import { doctors, staff } from "@/data/doctors-data";
import BackgroundHeroLayout from "@/components/ui/BackgroundHeroLayout";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <BackgroundHeroLayout heightClassName="min-h-[20vh]">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Our <span className="text-teal-600">Doctors</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet our team of dedicated and highly-qualified medical professionals, committed to providing you with the best care.
          </p>
        </div>
      </BackgroundHeroLayout>

      {/* Doctors Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 w-full max-w-sm"
              >
                <div className="relative h-64 w-64 mx-auto">
                  <Image
                    src={doctor.image}
                    alt={`Photo of ${doctor.name}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    className="object-top"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-teal-600 font-semibold mb-3">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {doctor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}