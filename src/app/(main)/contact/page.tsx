"use client";

import ContactForm from "@/components/ContactForm";
import BackgroundHeroLayout from "@/components/ui/BackgroundHeroLayout";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState } from "react";

export default function ContactPage() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const [infoOpen, setInfoOpen] = useState(true); // Auto-open info window

    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const center = useMemo(() => ({ lat: 3.036736, lng: 101.707301 }), []);

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Call Us",
            content: "+60 11-6999 9443",
            link: "tel:+601169999443",
            gradient: "from-blue-500 to-indigo-600",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email",
            content: "klinikmekarserdang@gmail.com",
            link: "mailto:klinikmekarserdang@gmail.com",
            gradient: "from-purple-500 to-pink-600",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Visit Us",
            content: "A-G-3A, A-G5 Jalan SP 4/1, Seksyen 4, Taman Serdang Perdana, 43300 Seri Kembangan, Selangor",
            link: "https://maps.google.com/?q=3.036736,101.707301",
            gradient: "from-teal-500 to-cyan-600",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Open 24/7",
            content: "Available 24 hours a day, 7 days a week",
            link: null,
            gradient: "from-amber-500 to-orange-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <BackgroundHeroLayout heightClassName="min-h-[20vh]">
                <div className="container mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                        Contact <span className="text-teal-600">Us</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We’re here to assist you with appointments, inquiries, and general
                        information about Klinik Mekar.
                    </p>
                </div>
            </BackgroundHeroLayout>

            {/* Contact Info Grid */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                        {info.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                        {info.title}
                                    </h3>

                                    {/* Underline */}
                                    <div className={`w-12 h-0.5 bg-gradient-to-r ${info.gradient} rounded mx-auto mb-4 transform origin-center group-hover:w-20 transition-all duration-300`}></div>

                                    {/* Content */}
                                    {info.link ? (
                                        <a
                                            href={info.link}
                                            target={info.link.startsWith('http') ? '_blank' : undefined}
                                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="text-gray-600 hover:text-teal-600 transition-colors text-center block leading-relaxed"
                                        >
                                            {info.content}
                                        </a>
                                    ) : (
                                        <p className="text-gray-600 text-center leading-relaxed">
                                            {info.content}
                                        </p>
                                    )}
                                </div>

                                {/* Corner accent */}
                                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-bl-full`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Google Map */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
                        {!isLoaded ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">Loading Map...</p>
                            </div>
                        ) : (
                            <GoogleMap
                                mapContainerStyle={{ width: "100%", height: "100%" }}
                                center={center}
                                zoom={15}
                                options={{
                                    styles: [
                                        {
                                            featureType: "all",
                                            elementType: "geometry",
                                            stylers: [{ color: "#eaeaea" }],
                                        },
                                        {
                                            featureType: "road",
                                            elementType: "geometry",
                                            stylers: [{ color: "#ffffff" }],
                                        },
                                        {
                                            featureType: "road",
                                            elementType: "labels.text.fill",
                                            stylers: [{ color: "#666666" }],
                                        },
                                        {
                                            featureType: "poi",
                                            elementType: "geometry",
                                            stylers: [{ color: "#f5f5f5" }],
                                        },
                                        {
                                            featureType: "poi.business",
                                            stylers: [{ visibility: "off" }],
                                        },
                                        {
                                            featureType: "poi.park",
                                            elementType: "geometry",
                                            stylers: [{ color: "#d9f0ed" }],
                                        },
                                        {
                                            featureType: "water",
                                            elementType: "geometry",
                                            stylers: [{ color: "#c5e8e3" }],
                                        },
                                        {
                                            featureType: "transit",
                                            stylers: [{ visibility: "off" }],
                                        },
                                    ],
                                    disableDefaultUI: true,
                                    zoomControl: true,
                                }}
                            >
                                <Marker
                                    position={center}
                                    onClick={() => setInfoOpen(true)}
                                />

                                {infoOpen && (
                                    <InfoWindow
                                        position={center}
                                        onCloseClick={() => setInfoOpen(false)}
                                    >
                                        <div className="text-gray-800">
                                            <h2 className="text-lg font-semibold mb-1">Klinik Mekar Serdang</h2>
                                            <p className="text-sm mb-2">
                                                A-G-3A, A-G5 Jalan SP 4/1, Seksyen 4, Taman Serdang Perdana,<br />
                                                43300 Seri Kembangan, Selangor
                                            </p>
                                            <a
                                                href="https://maps.google.com/?q=3.036736,101.707301"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-teal-600 hover:underline text-sm font-medium"
                                            >
                                                View on Google Maps
                                            </a>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>

                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
