export const GOOGLE_SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbzBlxxdp0LY6Fg1cC9DRv--ZMP7XtWvhy0x0cOHPYkVulCVo8bK6smqWR1T_LRCCwjcBQ/exec";

export async function fetchSheetData(sheetName: string) {
  try {
    const response = await fetch(`${GOOGLE_SHEETS_API_URL}?sheet=${encodeURIComponent(sheetName)}`);
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
