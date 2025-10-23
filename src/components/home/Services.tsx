interface ServicesSectionProps {
  isVisible: boolean;
}

const mainServices = [
  {
    title: "General Medical Consultation",
    description: "Comprehensive consultations for all general health concerns, guided by experienced doctors dedicated to your well-being.",
    price: "From RM50",
    badge: "Popular",
    badgeColor: "from-red-500 to-pink-500",
    icon: (
      <svg className="w-10 h-10 text-red-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    colorScheme: {
      bgColor: "from-red-100 to-red-200",
      hoverBg: "from-red-200 to-red-300",
      borderColor: "border-red-100 hover:border-red-300",
      shadowColor: "hover:shadow-red-500/10",
      textColor: "group-hover:text-red-600",
      linkColor: "text-red-600 group-hover:text-red-700",
      gradientBg: "from-red-50/80"
    },
    delay: "delay-400"
  },
  {
    title: "Health Screening & Preventive Care",
    description: "Early detection through routine check-ups and lab tests for a healthier, longer life.",
    price: "From RM30",
    badge: "Essential",
    badgeColor: "from-green-500 to-emerald-500",
    icon: (
      <svg className="w-10 h-10 text-green-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colorScheme: {
      bgColor: "from-green-100 to-emerald-200",
      hoverBg: "from-green-200 to-emerald-300",
      borderColor: "border-green-100 hover:border-green-300",
      shadowColor: "hover:shadow-green-500/10",
      textColor: "group-hover:text-green-600",
      linkColor: "text-green-600 group-hover:text-green-700",
      gradientBg: "from-green-50/80"
    },
    delay: "delay-600"
  },
  {
    title: "24/7 Emergency & First Aid",
    description: "Round-the-clock emergency care and immediate treatment when every second counts.",
    price: "Available Anytime",
    badge: "24/7",
    badgeColor: "from-blue-500 to-indigo-500",
    icon: (
      <svg className="w-10 h-10 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colorScheme: {
      bgColor: "from-blue-100 to-indigo-200",
      hoverBg: "from-blue-200 to-indigo-300",
      borderColor: "border-blue-100 hover:border-indigo-300",
      shadowColor: "hover:shadow-indigo-500/10",
      textColor: "group-hover:text-blue-600",
      linkColor: "text-blue-600 group-hover:text-blue-700",
      gradientBg: "from-blue-50/80"
    },
    delay: "delay-800"
  }
];

const additionalServices = [
  {
    title: "Vaccination",
    subtitle: "Child & Adult Immunization",
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547" />
      </svg>
    ),
    bgColor: "from-teal-100 to-cyan-200",
    borderColor: "border-gray-100 hover:border-teal-200"
  },
  {
    title: "Women's Health",
    subtitle: "Antenatal & Wellness",
    icon: (
      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" />
      </svg>
    ),
    bgColor: "from-amber-100 to-orange-200",
    borderColor: "border-gray-100 hover:border-amber-200"
  },
  {
    title: "Wound Care",
    subtitle: "Modern Dressing",
    icon: (
      <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    bgColor: "from-rose-100 to-pink-200",
    borderColor: "border-gray-100 hover:border-rose-200"
  },
  {
    title: "Lab Services",
    subtitle: "Diagnostics & Testing",
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H9z" />
      </svg>
    ),
    bgColor: "from-indigo-100 to-blue-200",
    borderColor: "border-gray-100 hover:border-indigo-200"
  }
];


export default function ServicesSection({ isVisible }: ServicesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-red-50/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-red-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/4 left-1/6 opacity-10">
          <div className="w-16 h-4 bg-red-400 rounded-full"></div>
          <div className="w-4 h-16 bg-red-400 rounded-full absolute top-0 left-6"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 opacity-10">
          <div className="w-20 h-5 bg-blue-400 rounded-full"></div>
          <div className="w-5 h-20 bg-blue-400 rounded-full absolute top-0 left-7"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 rounded-full mb-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Healthcare Services</span>
          </div>

          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-200`}>
            <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>

          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Comprehensive healthcare solutions designed with your well-being in mind. From routine check-ups to specialized treatments,
            we're here for every step of your health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border ${service.colorScheme.borderColor} shadow-lg hover:shadow-2xl ${service.colorScheme.shadowColor} transition-all duration-500 transform hover:-translate-y-4 md:col-span-${index === 2 ? '2' : '1'} lg:col-span-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${service.delay}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.colorScheme.gradientBg} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${service.colorScheme.bgColor} rounded-3xl flex items-center justify-center mb-6 group-hover:${service.colorScheme.hoverBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                  {service.icon}
                </div>

                <h3 className={`text-2xl font-bold text-gray-800 mb-4 ${service.colorScheme.textColor} transition-colors duration-300`}>
                  {service.title}
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  {/* <div className={`flex items-center ${service.colorScheme.linkColor} font-semibold transition-colors duration-300`}>
                    <span className="mr-2">{service.price}</span>
                  </div>
                  <div className={`inline-flex items-center ${service.colorScheme.linkColor} font-semibold transition-colors duration-300`}>
                    <span className="mr-2 text-sm">Book Now</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div> */}
                </div>
              </div>

              <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${service.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                {service.badge}
              </div>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} delay-1000`}>
          {additionalServices.map((service, index) => (
            <div key={index} className={`group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border ${service.borderColor} hover:shadow-lg transition-all duration-300`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">{service.title}</h4>
              <p className="text-xs text-gray-600">{service.subtitle}</p>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-800 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/services" className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 mr-3">View All Services</span>
              <svg className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Need help choosing?</span> Call us at
            <a href="tel:+601169999443" className="font-semibold text-red-600 hover:text-red-700 transition-colors duration-300 ml-1">
              +60 11-6999 9443
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}