import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ClipboardList, TimerReset } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkLog · ระบบจดงานประจำวัน" },
      { name: "description", content: "จด work log วางตารางงาน และสรุปผลงานรายสัปดาห์" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark size={36} />
          <span className="font-display text-xl font-bold">
            Work<span className="text-yellow-deep">Log</span>
          </span>
        </Link>
        <Link to="/app" className="rounded-md border-2 border-ink bg-yellow px-4 py-2 text-sm font-semibold shadow-brutal-sm">
          เปิดแดชบอร์ด
        </Link>
      </nav>

      <main className="border-y-2 border-ink bg-yellow">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-medium">
              ระบบจดงานประจำวัน + ตารางทำงาน
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              จดว่าวันนี้ทำอะไร
              <br />
              แล้วเปลี่ยนเป็น
              <br />
              ตารางงานที่ทำจริง
            </h1>
            <p className="mt-6 max-w-xl text-base text-ink/80 md:text-lg">
              Adapt จากโปรเจกต์เดิมให้เป็นแอป WorkLog: เช็กงานวันนี้ เพิ่มบันทึกงาน วางแผนสัปดาห์ และดูสรุปผลงานย้อนหลัง
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app" className="rounded-md border-2 border-ink bg-ink px-6 py-3.5 text-base font-semibold text-cream shadow-brutal">
                เริ่มจดงาน
              </Link>
              <Link to="/app/calendar" className="rounded-md border-2 border-ink bg-cream px-6 py-3.5 text-base font-semibold shadow-brutal-sm">
                ดูตารางงาน
              </Link>
            </div>
          </div>

          <div className="rounded-lg border-2 border-ink bg-cream p-5 shadow-brutal">
            <div className="text-xs text-muted-foreground">ภาพรวมวันนี้</div>
            <div className="mt-4 space-y-3">
              {[
                ["09:00", "แก้ UI หน้า Dashboard", ClipboardList],
                ["10:45", "ต่อ API สำหรับบันทึก work log", TimerReset],
                ["16:30", "เขียนสรุปสิ่งที่ทำและปัญหาที่เจอ", CalendarDays],
              ].map(([time, task, Icon]) => {
                const TaskIcon = Icon as typeof ClipboardList;
                return (
                  <div key={task as string} className="flex items-center gap-3 rounded-lg border-2 border-ink bg-card p-3">
                    <TaskIcon className="h-5 w-5" />
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">{time as string}</div>
                      <div className="text-sm font-semibold">{task as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
