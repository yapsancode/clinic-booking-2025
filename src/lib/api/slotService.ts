// /lib/api/slotService.ts

const API_BASE_URL = process.env.LOCAL_HOST_IPCONFIG || "";

export async function getSlots() {
    const token = sessionStorage.getItem("authToken");
    console.log("Token being sent:", token);

    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${API_BASE_URL}/services/adminServices`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Failed to fetch slots: ${err}`);
    }

    return res.json();
}
export async function createSlot(data: any) {
    const token = sessionStorage.getItem("authToken");

    const res = await fetch(`${API_BASE_URL}/slots`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create slot");
    return res.json();
}

export async function updateSlot(id: number, data: any) {
    const token = sessionStorage.getItem("authToken");

    const res = await fetch(`${API_BASE_URL}/slots/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update slot");
    return res.json();
}

export async function deleteSlot(id: number) {
    const token = sessionStorage.getItem("authToken");

    const res = await fetch(`${API_BASE_URL}/slots/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Failed to delete slot");
    return true;
}
