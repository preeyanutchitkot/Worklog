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
  const [user, setUser] = useState(mockUser);

  useEffect(() => {
    fetchUser().then((data) => {
      if (data) {
        setUser({ ...mockUser, ...data });
      }
    });
  }, []);

  return user;
}
