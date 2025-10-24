import { Blogs } from "@/types/blogs";

const API_BASE_URLV2 = "https://clinic-system-2025-backend.fly.dev/api";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")     // spaces → dashes
    .trim();
}

export async function fetchBlogs(): Promise<Blogs[]> {
  const res = await fetch(`${API_BASE_URLV2}/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status}`);
  }

  const data: Blogs[] = await res.json();
  return data.map((b) => ({ ...b, slug: generateSlug(b.title) }));
}

export async function fetchBlogBySlug(slug: string): Promise<Blogs | null> {
  const blogs = await fetchBlogs();
  const blog = blogs.find((b) => b.slug === slug);
  return blog || null;
}
