import { notFound } from "next/navigation";
import { fetchBlogBySlug } from "@/lib/api/blogs";
import { Blogs } from "@/types/blogs";
import sanitizeHtml from 'sanitize-html';
import "./blog.css";

async function fetchHTMLContent(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load blog content");
    return await res.text();
}

interface BlogPageProps {
    params: {
        slug: string;
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const resolvedParams = await params;
    const blog: Blogs | null = await fetchBlogBySlug(resolvedParams.slug);
    if (!blog) return notFound();
    let htmlContent = "";
    try {
        htmlContent = await fetchHTMLContent(blog.html_link);
    } catch {
        htmlContent = "<p>Unable to load article content.</p>";
    }
    return (
        <article className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-500 mb-6">
                By <span className="font-medium text-gray-700">{blog.author}</span> ·{" "}
                {blog.dateAdded
                    ? new Date(blog.dateAdded).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                    : "Date not available"}
            </p>
            <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-2xl mb-8 shadow-md"
            />
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </article>
    );
}