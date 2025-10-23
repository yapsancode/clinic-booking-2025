"use client";

import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackgroundHeroLayout from "@/components/ui/BackgroundHeroLayout";
import { useState } from "react";

export default function ServicesPage() {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      title: "24/7 Emergency Care & First Aid",
      desc: "Round-the-clock emergency services and immediate medical attention when every second counts.",
      icon: "M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50",
    },
    {
      title: "General Medical Consultations",
      desc: "Comprehensive consultations for all general health concerns, guided by experienced doctors.",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Health Screenings & Preventive Care",
      desc: "Early detection and prevention through regular health checks and wellness programs.",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Chronic Disease Management",
      desc: "Long-term care for diabetes, hypertension, asthma, and other chronic conditions.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pediatric Care",
      desc: "Gentle and specialized care for infants, children, and adolescents.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Antenatal & Women's Health",
      desc: "Comprehensive pregnancy monitoring and women's health consultations for every stage of life.",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Vaccinations & Immunizations",
      desc: "Protective vaccines for children and adults, helping prevent infectious diseases.",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50",
    },
    {
      title: "Diagnostic & Laboratory Services",
      desc: "Accurate lab testing and diagnostics to support effective treatment decisions.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Occupational Health (OHD) Screening",
      desc: "Health assessments and screening for workplace safety and compliance requirements.",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "from-slate-500 to-gray-600",
      bgColor: "bg-slate-50",
    },
    {
      title: "Minor Surgical Procedures",
      desc: "Professional minor surgeries performed safely in a clean, sterile environment.",
      icon: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Modern Dressing & Wound Care",
      desc: "Expert wound management and modern dressing services to promote faster healing.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50",
    },
    {
      title: "Medication Dispensing & Prescription",
      desc: "Fully stocked in-house pharmacy for easy access to prescribed medications.",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <BackgroundHeroLayout heightClassName="min-h-[25vh]">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Our <span className="text-teal-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Klinik Mekar, we offer a full spectrum of medical services —
            reliable, compassionate, and available 24 hours a day.
          </p>
        </div>
      </BackgroundHeroLayout>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive medical care tailored to your health and well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative bg-white border-2 border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-md bg-gradient-to-br ${service.color}`}>
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d={service.icon} />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {service.title}
                  </h3>

                  {/* Underline */}
                  <div className={`w-12 h-0.5 bg-gradient-to-r ${service.color} rounded mx-auto mb-4 transform origin-center group-hover:w-20 transition-all duration-300`}></div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.desc}
                  </p>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-bl-full`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold mb-6">Need medical care now?</h2>
          <p className="text-lg mb-8">
            Our team is available 24/7 to provide you with trusted and compassionate care.
          </p>
          <WhatsAppButton
            label="Book Appointment Now"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-700 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}
