import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AppShell, Card } from "@/components/AppShell";
import { calendar as mockCalendar, weekSummary } from "@/lib/mock";
import { saveToGoogleSheets } from "@/lib/api";

export const Route = createFileRoute("/app/calendar")({
  head: () => ({ meta: [{ title: "ตารางงาน · WorkLog" }] }),
  component: CalendarPage,
});

const calendarStorageKey = "worklog-calendar";

function CalendarPage() {
  const [calendar, setCalendar] = useState(() => {
    const saved = window.localStorage.getItem(calendarStorageKey);
    if (saved) return JSON.parse(saved);
    // Create current week by default
    const curr = new Date();
    const first = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);
    const defaultWeek = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(curr);
      d.setDate(first + i);
      defaultWeek.push({ date: d.toISOString().split('T')[0], events: [] });
    }
    return defaultWeek;
  });

  const [newEvent, setNewEvent] = useState({ date: new Date().toISOString().split('T')[0], time: "09:00", title: "", goal: false });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(calendarStorageKey, JSON.stringify(calendar));
  }, [calendar]);

  function addEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!newEvent.title.trim()) {
      toast.error("กรอกชื่องานก่อนนะ");
      return;
    }
    
    setCalendar((cur: any[]) => {
      let found = false;
      const next = cur.map((day) => {
        if (day.date === newEvent.date) {
          found = true;
          return {
            ...day,
            events: [...day.events, { time: newEvent.time, title: newEvent.title, goal: newEvent.goal }].sort((a: any, b: any) => a.time.localeCompare(b.time)),
          };
        }
        return day;
      });
      
      if (!found) {
        next.push({
          date: newEvent.date,
          events: [{ time: newEvent.time, title: newEvent.title, goal: newEvent.goal }]
        });
      }
      
      // Sort days by date
      return next.sort((a, b) => a.date.localeCompare(b.date));
    });
    
    toast.success("เพิ่มงานลงตารางแล้ว");
    setNewEvent((cur) => ({ ...cur, title: "", goal: false }));
  }

  async function handleSaveToSheets() {
    setIsSaving(true);
    toast("กำลังบันทึกลง Google Sheets...");
    const success = await saveToGoogleSheets({ type: "calendar", data: calendar });
    if (success) {
      toast.success("บันทึกลง Google Sheets สำเร็จ!");
    } else {
      toast.error("บันทึกไม่สำเร็จ ตรวจสอบ Webhook URL");
    }
    setIsSaving(false);
  }

  return (
    <AppShell title="ตารางงาน" subtitle="วางแผนงานรายสัปดาห์ แยกเวลาโฟกัส งานทีม และเวลาสรุป log">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <div className="p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-xl font-bold">สัปดาห์นี้</h3>
              <div className="flex gap-2 text-sm">
                <button className="rounded border-2 border-ink bg-card px-2 py-1">←</button>
                <button className="rounded border-2 border-ink bg-yellow px-3 py-1 font-semibold">วันนี้</button>
                <button className="rounded border-2 border-ink bg-card px-2 py-1">→</button>
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-7">
              {calendar.map((day: any, index: number) => {
                const dateObj = new Date(day.date);
                const dateLabel = new Intl.DateTimeFormat('th-TH', { weekday: 'short', day: 'numeric', month: 'short' }).format(dateObj);
                return (
                  <div key={index} className="min-h-36 rounded-lg border-2 border-ink bg-cream p-2">
                    <div className="text-center text-xs font-mono font-semibold">{dateLabel}</div>
                    <div className="mt-2 space-y-1.5">
                      {day.events.map((event: any, eventIndex: number) => (
                        <div
                          key={eventIndex}
                          className={`rounded border-2 border-ink p-1.5 text-[11px] leading-tight ${event.goal ? "bg-yellow" : "bg-card"}`}
                        >
                          <div className="font-mono">{event.time}</div>
                          <div className="font-semibold">{event.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveToSheets}
                disabled={isSaving}
                className="rounded-md border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-cream shadow-brutal-sm disabled:opacity-50"
              >
                {isSaving ? "กำลังบันทึก..." : "บันทึกลง Google Sheets"}
              </button>
            </div>
          </div>
        </Card>
        <div className="space-y-5">
          <Card>
            <form onSubmit={addEvent} className="p-5">
              <h4 className="font-display font-bold">เพิ่มงานลงตาราง</h4>
              <div className="mt-4 space-y-3">
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                />
                <input
                  type="text"
                  placeholder="ชื่องาน"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                />
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={newEvent.goal}
                    onChange={(e) => setNewEvent({ ...newEvent, goal: e.target.checked })}
                    className="h-4 w-4 accent-ink"
                  />
                  เป็นงานเป้าหมายหลัก
                </label>
                <button type="submit" className="w-full rounded-md border-2 border-ink bg-yellow py-2 text-sm font-semibold shadow-brutal-sm">
                  + เพิ่มลงตาราง
                </button>
              </div>
            </form>
          </Card>
          <Card tone="ink">
            <div className="p-6">
              <div className="text-xs font-mono uppercase tracking-widest text-yellow">สรุปสัปดาห์</div>
              <div className="mt-3 font-display text-5xl font-bold">{weekSummary.onGoal}%</div>
              <p className="mt-1 text-sm text-cream/70">เวลาที่ใช้กับงานหลัก</p>
              <div className="mt-5 flex h-3 overflow-hidden rounded-full border-2 border-cream">
                <div className="bg-yellow" style={{ width: `${weekSummary.onGoal}%` }} />
                <div className="bg-cream/30" style={{ width: `${weekSummary.other}%` }} />
              </div>
              <div className="mt-3 text-xs text-cream/60">อีก {weekSummary.other}% เป็นงานทีม พัก หรือ context switching</div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
