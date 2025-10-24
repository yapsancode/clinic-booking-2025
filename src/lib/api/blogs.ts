import { Blogs } from "@/types/blogs";

const API_BASE_URLV2 = "https://clinic-system-2025-backend.fly.dev/api";

export async function fetchPromotions(): Promise<Blogs[]> {
  const res = await fetch(`${API_BASE_URLV2}/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch promotions: ${res.status}`);
  }

  const data = await res.json();
  console.log("Fetched promotions:", data);

  return data; // API returns array directly
}