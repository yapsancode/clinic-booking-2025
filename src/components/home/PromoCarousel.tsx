"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import { useState, useRef, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Promotion } from "../../types/promotion";
import { fetchPromotions } from "@/lib/api/promotions";
import WhatsAppButton from "../layout/WhatsAppButton";

export default function PromoCarousel() {
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    async function loadPromotions() {
      try {
        setLoading(true);
        const data = await fetchPromotions();
        setPromotions(data);
      } catch (err: any) {
        console.error("Failed to fetch promotions:", err);
        setError("Failed to load promotions");
      } finally {
        setLoading(false);
      }
    }
    loadPromotions();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const autoplayConfig = useMemo(
    () => ({
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }),
    []
  );

  const toggleAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (isAutoplay) swiper.autoplay.stop();
    else swiper.autoplay.start();
    setIsAutoplay((prev) => !prev);
  };

  const goToSlide = (index: number) => {
    const swiper = swiperRef.current;
    if (swiper) swiper.slideTo(index);
  };

  // 🧠 If still loading, or error occurred, or no promotions — render nothing
  if (isLoading || error || promotions.length === 0) return null;

  // ✅ Render only when data is available
  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Latest Promotions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't miss out on our exclusive healthcare offers designed to keep you and your family healthy
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Autoplay, Pagination, EffectFade]}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          pagination={{
            el: ".swiper-pagination-custom",
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} w-3 h-3 bg-white/50 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/80"></span>`,
          }}
          autoplay={isAutoplay ? autoplayConfig : false}
          loop
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="rounded-2xl shadow-2xl overflow-hidden group"
        >
          {promotions.map((promo, index) => (
            <SwiperSlide key={promo.id}>
              <div className="relative h-[500px] lg:h-[600px]">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-2xl text-white">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white mb-4 animate-pulse">
                        {promo.badge}
                      </div>
                      <div className="text-4xl lg:text-6xl font-bold text-yellow-400 mb-2">
                        {promo.discount}
                      </div>
                      <h3 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
                        {promo.title}
                      </h3>
                      <p className="text-lg lg:text-xl text-gray-200 mb-6 leading-relaxed">
                        {promo.description}
                      </p>
                      <p className="text-sm text-gray-300 mb-6">
                        Valid until:{" "}
                        <span className="font-semibold text-yellow-400">{promo.validUntil}</span>
                      </p>
                      <WhatsAppButton
                        label="Book Now"
                        className="inline-flex items-center px-8 py-4 bg-white text-teal-700 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="swiper-pagination-custom absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2"></div>

        <button
          onClick={toggleAutoplay}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          {isAutoplay ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </button>
      </div>

      {/* Slide Counter */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <span className="text-gray-600 text-sm">
          {currentSlide + 1} of {promotions.length}
        </span>
        <div className="hidden md:flex space-x-2">
          {promotions.map((promo, index) => (
            <button
              key={promo.id}
              onClick={() => goToSlide(index)}
              className={`w-16 h-10 rounded overflow-hidden border-2 transition-all duration-300 ${
                currentSlide === index
                  ? "border-blue-600 shadow-lg scale-110"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Image
                src={promo.image}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={40}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div
          className="bg-blue-600 h-1 rounded-full transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / promotions.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
