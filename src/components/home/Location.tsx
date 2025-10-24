import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState } from "react";

interface LocationSectionProps {
  isVisible: boolean;
}

export default function LocationSection({ isVisible }: LocationSectionProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(() => ({ lat: 3.036736, lng: 101.707301 }), []);
  const [infoOpen, setInfoOpen] = useState(true); // Auto open info window

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold text-gray-800 mb-4 transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Find Us
          </h2>
          <p
            className={`text-gray-600 max-w-2xl mx-auto transition-all duration-800 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We are conveniently located in the heart of Seri Kembangan. Visit us for your next
            appointment.
          </p>
        </div>

        {/* Google Map */}
        <div
          className={`w-full h-96 bg-gray-300 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          } delay-400`}
        >
          {!isLoaded ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                <p className="text-gray-500">Loading Map...</p>
              </div>
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
                <InfoWindow position={center} onCloseClick={() => setInfoOpen(false)}>
                  <div className="text-gray-800">
                    <h2 className="text-lg font-semibold mb-1">Klinik Mekar Serdang</h2>
                    <p className="text-sm mb-2">
                      A-G-3A, A-G5 Jalan SP 4/1, Seksyen 4, Taman Serdang Perdana,
                      <br />
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

        {/* Button below the map */}
        <div
          className={`mt-8 text-center transition-all duration-800 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://maps.app.goo.gl/BUFeXDcwqcegoREf6"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
