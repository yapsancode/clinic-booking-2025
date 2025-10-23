import Image from "next/image";
import dynamic from "next/dynamic";

const GoogleReviews = dynamic(() => import("@/components/ui/GoogleReviews"), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  ),
});

interface AboutSectionProps {
  isVisible: boolean;
}

const highlights = [
  { label: "Compassionate Care", color: "red" },
  { label: "Accessible & Affordable", color: "blue" },
  { label: "24/7 Medical Support", color: "emerald" },
  { label: "Trusted Professionals", color: "purple" }
];

const trustStats = [
  { value: "Growing", label: "Patient Community", gradient: "from-red-600 to-pink-600" },
  { value: "98%", label: "Satisfaction Rate", gradient: "from-blue-600 to-indigo-600" },
  { value: "5", label: "Dedicated Doctors", gradient: "from-emerald-600 to-teal-600" },
  { value: "24/7", label: "Emergency Support", gradient: "from-purple-600 to-pink-600" }
];

export default function AboutSection({ isVisible }: AboutSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-red-50/30 to-blue-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 border-3 border-red-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border-3 border-blue-300/40 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 border-3 border-emerald-300/40 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 rounded-full mb-6">
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">About Klinik Mekar 24 Jam Serdang</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Compassion. Trust. Care.
              </span>
              <br />
              <span className="text-gray-800">Every Hour, Every Day</span>
            </h2>

            <div className="space-y-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                At <span className="font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Klinik Mekar 24 Jam Serdang</span>, 
                we are more than just a clinic — we are your reliable partner on the journey to better health. 
                We understand that when it comes to healthcare, <span className="font-semibold text-red-600">trust is everything</span>.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Guided by compassion, accessibility, and reliability, our mission is to deliver high-quality, 
                patient-centered care that not only meets your medical needs but also brings peace of mind. 
                Whether it’s a <span className="font-medium text-emerald-600">late-night emergency</span> or a 
                <span className="font-medium text-blue-600"> routine check-up</span>, you can always count on our 
                experienced medical professionals — <span className="font-semibold text-gray-800">day or night, rain or shine</span>.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment extends beyond individual care — we strive to enhance the well-being of our entire community 
                by ensuring that <span className="font-semibold text-emerald-600">affordable, expert healthcare </span> 
                is always within reach.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <div key={index} className={`flex items-center space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-${highlight.color}-100`}>
                  <div className={`w-3 h-3 bg-${highlight.color}-500 rounded-full animate-pulse`}></div>
                  <span className="text-gray-700 font-medium">{highlight.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/about"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 via-pink-600 to-red-700 hover:from-red-700 hover:via-pink-700 hover:to-red-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 mr-3">Learn More About Us</span>
                <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/klinik-mekar-interior.jpg"
                  alt="Klinik Mekar 24 Jam Serdang - Modern Healthcare Facility"
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl -z-10 animate-float shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`mt-20 pt-12 border-t border-gray-200 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} delay-800`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Trusted by the Community</h3>
            <p className="text-gray-600">Our commitment to excellence speaks for itself</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustStats.map((stat, index) => (
              <div key={index} className="group">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Google Reviews Section */}
        <div className={`mt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} delay-1000`}>
          <GoogleReviews />
        </div>
      </div>
    </section>
  );
}
