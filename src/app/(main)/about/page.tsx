"use client";

import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackgroundHeroLayout from "@/components/ui/BackgroundHeroLayout";
import { useState, useEffect } from 'react';

// Fade-in on scroll component
const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`fade-${delay}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, hasAnimated]);

  return (
    <div
      id={`fade-${delay}`}
      className={`transform transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <BackgroundHeroLayout heightClassName="min-h-[20vh]">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            About <span className="text-teal-600">Klinik Mekar 24 Jam Serdang</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated to being your trusted healthcare partner — delivering compassionate,
            reliable, and accessible medical care around the clock.
          </p>
        </div>
      </BackgroundHeroLayout>

      {/* Vision */}
      <section className="py-20 px-4 lg:px-6 -mt-10 relative z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <FadeInSection delay={100}>
              <div className="bg-white rounded-3xl shadow-2xl p-10 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-teal-500 group">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Vision</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded"></div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the leading healthcare provider, recognized for exceptional services,
                  reliable and compassionate care — delivering 24-hour services that truly make a difference.
                </p>
              </div>
            </FadeInSection>

            {/* Mission Card */}
            <FadeInSection delay={200}>
              <div className="bg-white rounded-3xl shadow-2xl p-10 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-cyan-500 group">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Mission</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded"></div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To provide continuous, patient-centered medical care by combining advanced medical
                  practices with an unwavering commitment to compassion, accessibility, and trust.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <FadeInSection delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The guiding principles that shape every interaction and decision at Klinik Mekar 24 Jam Serdang.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Compassion",
                desc: "Treating every patient with empathy, kindness, and respect — because every life deserves care and dignity.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                gradient: "from-rose-400 to-pink-500",
                bg: "bg-rose-50",
              },
              {
                title: "Quality",
                desc: "Ensuring excellence in every service we provide, maintaining the highest standards of medical care and professionalism.",
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                gradient: "from-amber-400 to-orange-500",
                bg: "bg-amber-50",
              },
              {
                title: "Integrity",
                desc: "Upholding transparency, ethics, and trust in all our interactions with patients and the community.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                gradient: "from-blue-400 to-indigo-500",
                bg: "bg-blue-50",
              },
              {
                title: "Availability",
                desc: "Always here when you need us — providing 24/7 care with consistency, compassion, and readiness.",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                gradient: "from-teal-400 to-cyan-500",
                bg: "bg-teal-50",
              },
            ].map((value, index) => (
              <FadeInSection key={index} delay={100 * (index + 1)}>
                <div className={`relative text-center p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 ${value.bg} border-2 border-transparent hover:border-white group overflow-hidden transform hover:-translate-y-2`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <svg
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={value.icon} />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{value.title}</h3>
                    <div className={`w-16 h-1 bg-gradient-to-r ${value.gradient} rounded mx-auto mb-4`}></div>
                    <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 lg:px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience Our Care?</h2>
          <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
            Join the families who trust us for their healthcare needs — 24 hours a day, 7 days a week.
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
