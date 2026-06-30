import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { growthGrid, growthStats, insights, workLogs } from "@/lib/mock";

export const Route = createFileRoute("/app/growth")({
  head: () => ({ meta: [{ title: "สรุปผลงาน · WorkLog" }] }),
  component: Growth,
});

function intensity(value: number) {
  const map = ["bg-cream", "bg-yellow/30", "bg-yellow/60", "bg-yellow", "bg-yellow-deep"];
  return map[value] ?? map[0];
}

function Growth() {
  return (
    <AppShell title="สรุปผลงาน" subtitle="ดูภาพรวมเวลาทำงาน งานที่เสร็จ และ pattern การจด work log">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {growthStats.map((stat) => (
          <Card key={stat.label}>
            <div className="p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              <div className="mt-2 font-display text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-bold">ความต่อเนื่องของ Work Log</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>น้อย</span>
                {[0, 1, 2, 3, 4].map((value) => (
                  <span key={value} className={`h-3.5 w-3.5 rounded border border-ink ${intensity(value)}`} />
                ))}
                <span>มาก</span>
              </div>
            </div>
            <div className="mt-5 overflow-x-auto">
              <div className="flex gap-1.5">
                {growthGrid.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1.5">
                    {week.map((value, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`h-4 w-4 rounded border border-ink/40 ${intensity(value)}`}
                        title={`สัปดาห์ ${weekIndex + 1} วัน ${dayIndex + 1}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 rounded-lg border-2 border-ink bg-yellow px-4 py-3 text-sm font-medium">
              {insights[1].text}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold">งานที่ใช้ทำรายงานได้</h3>
            <div className="mt-4 space-y-3">
              {workLogs.map((log) => (
                <div key={log.id} className="rounded-lg border-2 border-ink bg-cream p-3">
                  <div className="text-xs text-muted-foreground">{log.date} · {log.duration}</div>
                  <div className="mt-1 text-sm font-semibold">{log.task}</div>
                  <div className="mt-2 text-xs text-muted-foreground">{log.note}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
