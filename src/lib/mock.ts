export const user = {
  name: "พลอย",
  role: "Full Stack Developer",
  goal: "ส่งงาน Sprint 14 ให้ครบก่อนวันศุกร์",
  goalProgress: 72,
  mascotName: "Work Buddy",
  streak: 12,
};

export const todayTasks = [
  { id: 1, title: "แก้ UI หน้า Dashboard ตาม feedback", goal: "Sprint 14", time: "09:00-10:30", done: true },
  { id: 2, title: "ต่อ API สำหรับบันทึก work log", goal: "WorkLog MVP", time: "10:45-12:00", done: false },
  { id: 3, title: "เขียนสรุปสิ่งที่ทำและปัญหาที่เจอ", goal: "Daily Report", time: "16:30-17:00", done: false },
];

export const workLogs = [
  {
    id: 1,
    date: "30 มิ.ย. 2026",
    project: "WorkLog MVP",
    task: "ออกแบบ flow การเพิ่มบันทึกงานรายวัน",
    duration: "2 ชม.",
    status: "เสร็จแล้ว",
    mood: "โฟกัสดี",
    note: "แยกช่องสิ่งที่ทำ ปัญหา และ next step เพื่อให้สรุปรายวันง่ายขึ้น",
  },
  {
    id: 2,
    date: "30 มิ.ย. 2026",
    project: "Sprint 14",
    task: "แก้ responsive layout หน้า Dashboard",
    duration: "1.5 ชม.",
    status: "กำลังทำ",
    mood: "ติดนิดหน่อย",
    note: "ยังต้องเช็ก card บน mobile อีกครั้ง",
  },
  {
    id: 3,
    date: "29 มิ.ย. 2026",
    project: "House Visualizer",
    task: "อ่านโครงสร้างโปรเจกต์ของเพื่อนและจดจุดที่ reuse ได้",
    duration: "1 ชม.",
    status: "เสร็จแล้ว",
    mood: "เข้าใจมากขึ้น",
    note: "ใช้ shell, card, dialog และ calendar layout เดิมมาต่อยอดได้",
  },
];

export const insights = [
  { id: 1, text: "วันนี้ใช้เวลาไปกับงาน Sprint 14 มากที่สุด และยังเหลืองาน API ที่ควรปิดก่อนพักกลางวันพรุ่งนี้", time: "วันนี้ 17:10" },
  { id: 2, text: "งานที่ค้างมักเป็นงานที่ยังไม่แตก task ย่อย ลองแบ่งเป็น 30-45 นาทีต่อชิ้น", time: "เมื่อวาน" },
  { id: 3, text: "ช่วง 09:00-11:00 เป็นเวลาที่ทำงาน UI ได้เร็วที่สุดจาก log 7 วันที่ผ่านมา", time: "2 วันที่แล้ว" },
];

export const goals = [
  { id: 1, title: "ปิด WorkLog MVP", progress: 72, sub: 6, done: 4, color: "yellow" },
  { id: 2, title: "ทำตารางงานรายสัปดาห์", progress: 50, sub: 4, done: 2, color: "ink" },
  { id: 3, title: "สรุปรายงานส่งอาจารย์/หัวหน้า", progress: 35, sub: 5, done: 2, color: "ink" },
];

export const calendar = [
  { day: "จ.", events: [{ title: "Plan week", goal: true, time: "09:00" }, { title: "Project sync", goal: false, time: "13:30" }] },
  { day: "อ.", events: [{ title: "Build work log form", goal: true, time: "10:00" }, { title: "Daily summary", goal: true, time: "16:30" }] },
  { day: "พ.", events: [{ title: "API integration", goal: true, time: "09:30" }, { title: "Review with friend", goal: false, time: "15:00" }] },
  { day: "พฤ.", events: [{ title: "Fix bugs", goal: true, time: "10:00" }, { title: "Write report", goal: true, time: "14:00" }] },
  { day: "ศ.", events: [{ title: "Demo", goal: true, time: "11:00" }, { title: "Retro", goal: true, time: "16:00" }] },
  { day: "ส.", events: [{ title: "Polish UI", goal: true, time: "10:30" }] },
  { day: "อา.", events: [{ title: "พัก / ทบทวนเบา ๆ", goal: false, time: "-" }] },
];

export const weekSummary = { onGoal: 74, other: 26 };

export const growthStats = [
  { label: "เวลาทำงาน", value: "24.5 ชม.", sub: "รวม 7 วันที่ผ่านมา" },
  { label: "งานเสร็จ", value: "18", sub: "จาก 25 task" },
  { label: "Log ต่อเนื่อง", value: "12 วัน", sub: "จดทุกวันหลังเลิกงาน" },
  { label: "งานค้าง", value: "7", sub: "ควรจัด priority ใหม่" },
];

export const growthGrid: number[][] = Array.from({ length: 12 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    if (w < 2) return [0, 1, 1, 0, 2, 1, 0][d];
    if (w < 6) return [1, 2, 2, 3, 1, 2, 1][d];
    if (w < 9) return [2, 3, 3, 2, 4, 2, 1][d];
    return [3, 3, 4, 3, 4, 2, 2][d];
  }),
);

export const opportunities = [
  { id: 1, title: "เตรียม Daily Report", type: "รายงาน", match: 92, sponsored: false, reason: "ดึงจาก work log วันนี้ได้ทันที" },
  { id: 2, title: "แตก API task เป็น 3 งานย่อย", type: "จัดงาน", match: 84, sponsored: false, reason: "ช่วยลดงานค้างก่อนเดโม" },
  { id: 3, title: "จองเวลา review กับเพื่อน", type: "ทีม", match: 76, sponsored: false, reason: "มี dependency ที่ควรคุยก่อน merge" },
  { id: 4, title: "สรุป blocker รายสัปดาห์", type: "ปรับปรุง", match: 68, sponsored: false, reason: "พบ blocker ซ้ำเรื่อง scope ไม่ชัด" },
];

export const identity = [
  { key: "Focus", label: "ช่วงโฟกัส", value: "09:00-11:00", detail: "ทำงาน coding/UI ได้เร็วสุด", source: "จาก work log 12 วัน" },
  { key: "Pattern", label: "รูปแบบงาน", value: "ทำดีเมื่อ task เล็ก", detail: "งาน 30-45 นาทีปิดได้บ่อยกว่า", source: "จาก task completion" },
  { key: "Blocker", label: "ปัญหาซ้ำ", value: "scope ไม่ชัด", detail: "ควรเขียน acceptance criteria ก่อนเริ่ม", source: "จาก note รายวัน" },
];

export const experiences = workLogs.map((log) => ({
  id: log.id,
  type: log.project,
  title: log.task,
  period: `${log.date} · ${log.duration}`,
  verified: log.status === "เสร็จแล้ว",
}));

export const careerGap = {
  role: "WorkLog MVP",
  updated: "อัปเดต 30 มิ.ย. 2026",
  have: [
    { skill: "UI Layout", level: 85 },
    { skill: "React State", level: 72 },
    { skill: "Task Planning", level: 70 },
    { skill: "Daily Summary", level: 64 },
  ],
  gap: [
    { skill: "Persist Data", level: 30, demand: 90 },
    { skill: "Export Report", level: 20, demand: 70 },
    { skill: "Calendar Sync", level: 15, demand: 65 },
    { skill: "Team Review Flow", level: 35, demand: 60 },
  ],
};

export const mentorChat = [
  { from: "mentor", text: "วันนี้คุณเหลืองาน API กับสรุปรายวัน อยากปิด API ก่อนแล้วค่อยให้ระบบช่วย draft report ไหม?" },
  { from: "me", text: "เอา API ก่อน เพราะถ้าเสร็จจะ demo ได้" },
  { from: "mentor", text: "โอเค ผมจะแยกเป็น 3 task: schema, form submit, mock persistence แล้วล็อกเวลา 10:00-12:00 ให้" },
];
