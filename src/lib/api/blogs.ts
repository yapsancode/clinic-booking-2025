import { Blogs } from "@/types/blogs";

const API_BASE_URLV2 = "https://clinic-system-2025-backend.fly.dev/api";

export async function fetchBlogs(): Promise<Blogs[]> {
    const res = await fetch(`${API_BASE_URLV2}/blogs`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.status}`);
    }

    const data = await res.json();
    return data; // API already returns an array
}
