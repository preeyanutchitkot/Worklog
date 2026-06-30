import { useState, useEffect } from "react";
import { user as mockUser } from "@/lib/mock";

const SHEET_URL_KEY = "worklog-sheet-url";

export function getSheetUrl(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(SHEET_URL_KEY) || "";
}

export function setSheetUrl(url: string) {
  window.localStorage.setItem(SHEET_URL_KEY, url);
}

export async function fetchSheetData(sheetName: string) {
  const url = getSheetUrl();
  if (!url) return [];
  
  try {
    const response = await fetch(`${url}?sheet=${encodeURIComponent(sheetName)}`);
    const data = await response.json();
    
    if (data.status === "error") {
      console.error("API Error:", data.message);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error("Failed to fetch sheet data:", error);
    return [];
  }
}

export async function fetchUser() {
  const data = await fetchSheetData("Sheet1");
  if (data && data.length > 0) {
    return data[0]; // แถวแรกที่มีข้อมูลคือ user profile
  }
  return null;
}

export function useUser() {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("worklog-profile");
        if (saved && saved !== "undefined") {
          return { ...mockUser, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error("Failed to parse user profile from local storage", e);
      }
    }
    return mockUser;
  });

  useEffect(() => {
    // Listen for custom event to update user globally
    const handleUpdate = (e: any) => setUser(e.detail);
    window.addEventListener("update-profile", handleUpdate);
    return () => window.removeEventListener("update-profile", handleUpdate);
  }, []);

  return user;
}

export function updateUser(newUser: any) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("worklog-profile", JSON.stringify(newUser));
    window.dispatchEvent(new CustomEvent("update-profile", { detail: newUser }));
  }
}

export async function saveToGoogleSheets(data: any) {
  const url = getSheetUrl();
  if (!url) {
    console.error("No Google Sheets URL configured");
    return false;
  }
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.status === "success" || result.status === 200;
  } catch (error) {
    console.error("Failed to save to Google Sheets:", error);
    return false;
  }
}
