import { Promotion } from "@/types/promotion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_TEST || "https://dev-app-0-1-latest.onrender.com/api";

export async function fetchPromotions(): Promise<Promotion[]> {
  console.log("Fetching from:", `${API_BASE_URL}/promotions`);
  
  const res = await fetch(`${API_BASE_URL}/promotions`, {
    cache: 'no-store', // or 'force-cache' depending on your needs
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch promotions: ${res.status}`);
  }
  
  const data = await res.json();
  console.log("Fetched promotions:", data);
  
  return data; // API returns array directly
}