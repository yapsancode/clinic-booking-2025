"use client";

import Image from "next/image";

interface BlogPreviewSectionProps {
  isVisible: boolean;
}

const blogPosts = [
  {
    title: "When to Visit a 24-Hour Clinic: A Quick Guide",
    excerpt: "Learn the key signs and symptoms that require urgent medical attention — and how 24-hour clinics can help.",
    image: "/images/Heath-blog.png",
    date: "October 10, 2025",
    link: "/blog/when-to-visit-24-hour-clinic",
    color: "from-red-500 to-rose-600",
  },
  {
    title: "Understanding Common Fevers in Children",
    excerpt: "Not all fevers are emergencies. Here’s how to know when to visit your doctor — and what you can do at home first.",
    image: "/images/Heath-blog.png",
    date: "October 5, 2025",
    link: "/blog/common-fevers-in-children",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Simple Health Checks You Should Do Every Year",
    excerpt: "Stay proactive with regular screenings — discover which health tests are most important for early detection.",
    image: "/images/Heath-blog.png",
    date: "September 28, 2025",
    link: "/blog/annual-health-checks",
    color: "from-blue-500 to-indigo-600",
  },
];

export default function BlogPreviewSection({ isVisible }: BlogPreviewSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-red-50/20 to-blue-50/20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-red-200/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl animate-float-delayed"></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 rounded-full mb-6 transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
              Health Articles
            </span>
          </div>

          <h2
            className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } delay-200`}
          >
            <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Latest Health Insights
            </span>
          </h2>

          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Stay informed with trusted medical advice and wellness tips from our doctors and healthcare team.
          </p>
        </div>

        {/* Blog Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          } delay-500`}
        >
          {blogPosts.map((post, index) => (
            <a
              href={post.link}
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6">
                <div className={`text-xs font-semibold text-transparent bg-gradient-to-r ${post.color} bg-clip-text uppercase mb-2`}>
                  {post.date}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span
                  className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${post.color} bg-clip-text text-transparent`}
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
