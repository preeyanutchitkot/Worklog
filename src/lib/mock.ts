export const user = {
  name: "ภูมิ ธนพล",
  role: "นักศึกษา · กำลังหางาน",
  goal: "เป็น Data Engineer ภายใน 8 เดือน",
  goalProgress: 42,
  mascotName: "พิกซี่",
  streak: 18,
};

export const todayTasks = [
  { id: 1, title: "เรียน Docker ตอนที่ 3 — Networking", goal: "Data Engineer", time: "45 นาที", done: false },
  { id: 2, title: "แก้โค้ด ETL pipeline + push GitHub", goal: "Portfolio", time: "1 ชม.", done: false },
  { id: 3, title: "อ่าน Job Description ที่ AI คัดมา 3 ที่", goal: "หางาน", time: "15 นาที", done: true },
];

export const opportunities = [
  { id: 1, title: "Junior Data Engineer — LINE MAN Wongnai", type: "งานประจำ", match: 87, sponsored: false, reason: "ตรงกับ Skill Python + Airflow ที่คุณกำลังพัฒนา" },
  { id: 2, title: "Hackathon: Bangkok Data Week 2026", type: "Hackathon", match: 81, sponsored: false, reason: "ตรงกับเป้าหมาย Data Engineer และมีทีมหา Data PM" },
  { id: 3, title: "Internship — SCB 10X (Data Platform)", type: "ฝึกงาน", match: 76, sponsored: false, reason: "ใช้ Cloud Stack ที่คุณวางแผนเรียน" },
  { id: 4, title: "ทุนเรียน Cloud — AWS re/Start", type: "ทุน", match: 72, sponsored: true, reason: "Skill Gap ตรงกับหลักสูตร" },
  { id: 5, title: "หา Co-founder สาย Data — FoodTech Startup", type: "Co-founder", match: 64, sponsored: false, reason: "ตรงกับ Values 'สร้างของจริง'" },
];

export const insights = [
  { id: 1, text: "สัปดาห์นี้คุณก้าวไปกับเป้าหมาย Data Engineer มากกว่าสัปดาห์ก่อน 28%", time: "วันนี้ 09:12" },
  { id: 2, text: "โค้ดที่ push 14 commits ล่าสุด สะท้อนว่า SQL ของคุณแข็งแล้ว ลองเริ่ม Docker ได้เลย", time: "เมื่อวาน" },
  { id: 3, text: "ตำแหน่ง Data Engineer ในไทย 3 เดือนที่ผ่านมา ต้องการ dbt เพิ่มขึ้น 41%", time: "2 วันก่อน" },
];

export const identity = [
  { key: "Personality", label: "บุคลิก", value: "นักวางแผนที่ลงมือทำ", detail: "คิดเป็นระบบ แต่ไม่ติดวิเคราะห์นาน", source: "จากคำตอบ Onboarding + พฤติกรรมการใช้แอป" },
  { key: "Skills", label: "ทักษะหลัก", value: "Python · SQL · Git", detail: "Docker กำลังพัฒนา · Cloud ยังเริ่มต้น", source: "จาก GitHub 142 commits + Vault" },
  { key: "Interests", label: "ความสนใจ", value: "Data · System Design · FinTech", detail: "อ่านบทความสาย Data บ่อยที่สุด", source: "จากคำถามที่ถาม AI Mentor" },
  { key: "Values", label: "คุณค่า", value: "สร้างของจริง มากกว่า ตำแหน่งโต", detail: "เลือก Hackathon มากกว่า Networking Event", source: "จากตัวเลือกที่กดใน Opportunity" },
  { key: "Working Style", label: "สไตล์ทำงาน", value: "Deep work ช่วงเช้า · ทีมเล็ก", detail: "ทำงานยาว 2-3 ชม.ติดได้ดีที่สุด", source: "จาก Calendar OS" },
  { key: "Learning Style", label: "สไตล์เรียน", value: "ลงมือทำก่อน อ่านทีหลัง", detail: "Tutorial → Build → Read Docs", source: "จากลำดับ Resource ที่คลิก" },
  { key: "Risk Profile", label: "ระดับการเสี่ยง", value: "กล้าเสี่ยงปานกลาง", detail: "พร้อมลองของใหม่ถ้าวางแผนไว้ก่อน", source: "จากคำถาม Onboarding" },
  { key: "Leadership", label: "ภาวะผู้นำ", value: "ผู้นำแบบลงมือทำให้ดู", detail: "ชอบรับงานยากเป็นคนแรก", source: "จาก Experience Vault" },
];

export const goals = [
  { id: 1, title: "เป็น Data Engineer ภายใน 8 เดือน", progress: 42, sub: 7, done: 3, color: "yellow" },
  { id: 2, title: "ทำ Portfolio Data Pipeline 3 ชิ้น", progress: 33, sub: 3, done: 1, color: "ink" },
  { id: 3, title: "อ่านหนังสือ System Design Interview", progress: 60, sub: 12, done: 7, color: "ink" },
];

export const experiences = [
  { id: 1, type: "Project", title: "ETL Pipeline สำหรับร้านกาแฟ", period: "ก.ย. 2025 – ปัจจุบัน", verified: true },
  { id: 2, type: "Certificate", title: "Google Data Analytics Professional", period: "ส.ค. 2025", verified: true },
  { id: 3, type: "Competition", title: "Super AI Engineer Season 4 — รอบคัด", period: "ก.ค. 2025", verified: true },
  { id: 4, type: "Volunteer", title: "สอน Python ให้รุ่นน้องคณะ", period: "ปี 3 เทอม 2", verified: false },
  { id: 5, type: "Job", title: "Part-time Data Assistant — SME ค้าปลีก", period: "พ.ค. – ก.ค. 2025", verified: true },
];

export const careerGap = {
  role: "Data Engineer (Junior, ไทย)",
  updated: "อัปเดต 19 มิ.ย. 2026",
  have: [
    { skill: "Python", level: 85 },
    { skill: "SQL", level: 78 },
    { skill: "Git / GitHub", level: 72 },
    { skill: "Linux Basics", level: 60 },
  ],
  gap: [
    { skill: "Docker", level: 25, demand: 92 },
    { skill: "Airflow / dbt", level: 12, demand: 78 },
    { skill: "AWS / GCP", level: 18, demand: 88 },
    { skill: "System Design", level: 30, demand: 65 },
  ],
};

export const calendar = [
  { day: "จ.", events: [{ title: "Docker ตอนที่ 3", goal: true, time: "07:00" }, { title: "เรียน", goal: false, time: "09:00" }] },
  { day: "อ.", events: [{ title: "ETL coding", goal: true, time: "06:30" }, { title: "ประชุมโปรเจกต์", goal: true, time: "14:00" }] },
  { day: "พ.", events: [{ title: "อ่าน System Design", goal: true, time: "07:00" }] },
  { day: "พฤ.", events: [{ title: "Pair coding", goal: true, time: "19:00" }] },
  { day: "ศ.", events: [{ title: "Demo + retro", goal: true, time: "17:00" }, { title: "กินข้าวกับเพื่อน", goal: false, time: "19:30" }] },
  { day: "ส.", events: [{ title: "Side project", goal: true, time: "10:00" }] },
  { day: "อา.", events: [{ title: "พักผ่อน", goal: false, time: "—" }] },
];

export const weekSummary = { onGoal: 68, other: 32 };

export const growthStats = [
  { label: "Skills เพิ่ม", value: "+14%", sub: "เทียบเดือนก่อน" },
  { label: "Projects ใหม่", value: "+2", sub: "ETL & dbt demo" },
  { label: "Knowledge เพิ่ม", value: "+22%", sub: "อ่าน + จด Insight" },
  { label: "Experience", value: "+3", sub: "ชิ้นยืนยันแล้ว" },
];

// 12 weeks x 7 days contribution-style grid (0-4 intensity)
export const growthGrid: number[][] = Array.from({ length: 12 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const x = (w * 7 + d) % 13;
    if (w < 2) return x % 5 === 0 ? 1 : 0;
    if (w < 5) return [0, 1, 2, 1, 0, 2, 3][d];
    if (w < 8) return [1, 2, 2, 3, 2, 3, 1][d];
    return [2, 3, 3, 4, 3, 4, 2][d];
  }),
);

export const mentorChat = [
  { from: "mentor", text: "สวัสดี ภูมิ วันนี้คุณเหลือ 45 นาทีก่อนคลาส อยากดู Docker ตอนที่ 3 ต่อ หรือเก็บมาทำพรุ่งนี้ดี?" },
  { from: "me", text: "ขอเก็บไว้พรุ่งนี้ วันนี้อยากแก้โค้ด ETL ที่ค้างก่อน" },
  { from: "mentor", text: "โอเค ผมจะเลื่อน Docker ไป 06:30 พรุ่งนี้ให้ และโน้ตไว้ใน Goal 'Data Engineer'" },
  { from: "mentor", text: "ระหว่างที่คุณแก้โค้ด ผมเห็นว่า PR ก่อนหน้ามี test ตกอยู่ 1 อัน อยากให้ผมสรุปสาเหตุให้ก่อนเริ่มมั้ย?" },
];