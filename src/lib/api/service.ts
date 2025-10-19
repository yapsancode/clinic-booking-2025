// src/lib/api/serviceApi.ts
import { Service } from "@/types/services";


interface ServicesResponse {
  data: {
    services: Service[];
  };
  message?: string;
}

export async function fetchServices(): Promise<Service[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API base URL not configured. Please check your .env.local file.");
  }

  const res = await fetch(`${baseUrl}/services`, { cache: "no-store" });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch services: ${error}`);
  }

  const json: ServicesResponse = await res.json();
  return json.data.services;
}
