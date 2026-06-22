import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { calendar, weekSummary } from "@/lib/mock";

export const Route = createFileRoute("/app/calendar")({
  head: () => ({ meta: [{ title: "Calendar OS · LifeOS" }] }),
  component: CalendarPage,
});

function CalendarPage() {
  return (
    <AppShell title="Calendar OS" subtitle="ปฏิทินที่รู้ว่า Event ไหนเกี่ยวกับเป้าหมาย">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">สัปดาห์นี้</h3>
              <div className="flex gap-2 text-sm">
                <button className="rounded border-2 border-ink bg-card px-2 py-1">←</button>
                <button className="rounded border-2 border-ink bg-yellow px-3 py-1 font-semibold">วันนี้</button>
                <button className="rounded border-2 border-ink bg-card px-2 py-1">→</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendar.map((d, i) => (
                <div key={i} className="rounded-xl border-2 border-ink bg-cream p-2">
                  <div className="text-center text-xs font-mono font-semibold">{d.day}</div>
                  <div className="mt-2 space-y-1.5">
                    {d.events.map((e, j) => (
                      <div key={j} className={`rounded border-2 border-ink p-1.5 text-[10px] leading-tight ${e.goal ? "bg-yellow" : "bg-card"}`}>
                        <div className="font-mono">{e.time}</div>
                        <div className="font-semibold">{e.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="space-y-5">
          <Card tone="ink">
            <div className="p-6">
              <div className="text-xs font-mono uppercase tracking-widest text-yellow">สรุปสัปดาห์</div>
              <div className="mt-3 font-display text-5xl font-bold">{weekSummary.onGoal}%</div>
              <p className="mt-1 text-sm text-cream/70">เวลาที่ใช้กับเป้าหมาย</p>
              <div className="mt-5 flex h-3 overflow-hidden rounded-full border-2 border-cream">
                <div className="bg-yellow" style={{ width: `${weekSummary.onGoal}%` }} />
                <div className="bg-cream/30" style={{ width: `${weekSummary.other}%` }} />
              </div>
              <div className="mt-3 text-xs text-cream/60">อีก {weekSummary.other}% เป็นเวลาที่ไม่ได้เกี่ยวกับเป้าหมายตอนนี้ — ก็โอเค</div>
            </div>
          </Card>
          <Card>
            <div className="p-5">
              <h4 className="font-display font-bold">เชื่อม Google Calendar</h4>
              <p className="mt-1 text-sm text-muted-foreground">ดึง Event อัตโนมัติ ไม่ต้องพิมพ์เอง</p>
              <button className="mt-3 w-full rounded-md border-2 border-ink bg-yellow py-2 text-sm font-semibold shadow-brutal-sm">เชื่อม Google Calendar</button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}