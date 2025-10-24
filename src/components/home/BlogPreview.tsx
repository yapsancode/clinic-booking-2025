"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchBlogs } from "@/lib/api/blogs";
import { Blogs } from "@/types/blogs";

interface BlogPreviewSectionProps {
  isVisible: boolean;
}

export default function BlogPreviewSection({ isVisible }: BlogPreviewSectionProps) {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Error loading blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const handleBlogClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    setNavigatingTo(slug);
    router.push(`/blog/${slug}`);
  };

  // While loading, you can either show nothing or a placeholder
  if (loading) return null;

  // If error occurred, hide the section completely
  if (error) return null;

  // If no blogs available, you can also choose to hide it
  if (!blogs.length) return null;

  return (
    <>
      {/* Full-screen loading overlay */}
      {navigatingTo && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              {/* Spinning gradient ring */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-r-blue-600 animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">Loading article...</p>
          </div>
        </div>
      )}

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
            {blogs.map((blog) => (
              <a
                href={`/blog/${blog.slug}`}
                key={blog.id}
                onClick={(e) => handleBlogClick(e, blog.slug!)}
                className={`group bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${
                  navigatingTo === blog.slug ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={blog.thumbnail || "/images/Heath-blog.png"}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Card-level loading indicator */}
                  {navigatingTo === blog.slug && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                      <div className="w-8 h-8 border-3 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text uppercase mb-2">
                    {blog.dateAdded
                      ? new Date(blog.dateAdded).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No date available"}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
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
    </>
  );
}