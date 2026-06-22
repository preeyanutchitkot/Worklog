import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { goals } from "@/lib/mock";

export const Route = createFileRoute("/app/goals")({
  head: () => ({ meta: [{ title: "Goals Center · LifeOS" }] }),
  component: Goals,
});

function Goals() {
  return (
    <AppShell title="Goals Center" subtitle="ทำพร้อมกันได้สูงสุด 3 เป้าหมายหลัก — เพื่อให้ลงมือทำได้จริง">
      <div className="grid gap-5">
        {goals.map((g, i) => (
          <Card key={g.id} tone={i === 0 ? "yellow" : "light"}>
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono uppercase tracking-widest opacity-70">เป้าหมาย {i + 1}</div>
                  <h3 className="mt-1 font-display text-2xl font-bold">{g.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>{g.done}/{g.sub} ย่อย</Pill>
                    <Pill>ผูกกับปฏิทินแล้ว</Pill>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-4xl font-bold">{g.progress}%</div>
                </div>
              </div>
              <div className="mt-5 h-2.5 rounded-full border-2 border-ink bg-cream">
                <div className="h-full rounded-full bg-ink" style={{ width: `${g.progress}%` }} />
              </div>
              <div className="mt-5 flex gap-2">
                <button className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-semibold shadow-brutal-sm">ดูเป้าหมายย่อย</button>
                <button className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-medium">พักไว้ก่อน</button>
              </div>
            </div>
          </Card>
        ))}
        <Card>
          <div className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-display text-lg font-bold">ตอนนี้มี 3 เป้าหมายแล้ว</div>
              <p className="text-sm text-muted-foreground">อยากเพิ่มอันใหม่ หรือเอาอันเก่าไปพักไว้ก่อน?</p>
            </div>
            <button className="rounded-md border-2 border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-brutal-sm">+ เพิ่มเป้าหมายใหม่</button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}