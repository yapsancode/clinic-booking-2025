import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";

export const metadata = {
  title: "Klinik Mekar - Online Appointment Booking",
  description:
    "Experience seamless healthcare in Serdang, Bangi. Book appointments with trusted doctors online at Klinik Mekar.",
  keywords:
    "clinic, doctor appointment, healthcare, medical booking, online appointment, klinik Serdang, klinik Bangi, Klinik Mekar",
  authors: [{ name: "Klinik Mekar" }],
  creator: "Klinik Mekar",
  publisher: "Klinik Mekar",
  openGraph: {
    title: "Klinik Mekar - Online Appointment Booking",
    description:
      "Book appointments with trusted doctors online. Quality healthcare in Serdang, Bangi.",
    type: "website",
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klinik Mekar - Online Appointment Booking",
    description:
      "Book appointments with trusted doctors online. Quality healthcare in Serdang, Bangi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: { width: "device-width", initialScale: 1, maximumScale: 5 },
  // Geo for local SEO
  metadataBase: new URL("https://klinikmekar.com"),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="msapplication-TileColor" content="#0d9488" />
        <meta name="geo.region" content="MY-Selangor" />
        <meta name="geo.placename" content="Serdang, Bangi" />
        <meta name="geo.position" content="3.0259;101.5394" />
        <meta name="ICBM" content="3.0259,101.5394" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "Klinik Mekar",
              "image": "https://klinikmekar.com/og-image.jpg",
              "@id": "https://klinikmekar.com",
              "url": "https://klinikmekar.com",
              "telephone": "+603-xxxx-xxxx",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Serdang",
                "addressRegion": "Selangor",
                "postalCode": "xxxxx",
                "addressCountry": "MY"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 3.0259,
                "longitude": 101.5394
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61570849671649",
                "https://www.instagram.com/klinikmekar24jamserdang/",
                "https://www.tiktok.com/@klinikmekar24jam_serdang"
              ]
            }),
          }}
        />

      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded"
        >
          Skip to main content
        </a>

        {/* Header - always visible */}
        <Header />

        {/* Main content area */}
        <main
          id="main-content"
          className="flex-1 w-full pt-10"
          role="main"
        >
          {children}
        </main>


        {/* Footer */}
        <Footer />

        {/* Back to top button - Client Component */}
        <BackToTop />
      </body>
    </html>
  );
}