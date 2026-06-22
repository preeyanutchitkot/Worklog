import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { growthStats, growthGrid } from "@/lib/mock";

export const Route = createFileRoute("/app/growth")({
  head: () => ({ meta: [{ title: "Growth Graph · LifeOS" }] }),
  component: Growth,
});

function intensity(v: number) {
  const map = ["bg-cream", "bg-yellow/30", "bg-yellow/60", "bg-yellow", "bg-yellow-deep"];
  return map[v] ?? map[0];
}

function Growth() {
  return (
    <AppShell title="Growth Graph" subtitle="12 สัปดาห์ที่ผ่านมา — มองย้อนแล้วรู้สึกดี">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {growthStats.map((s) => (
          <Card key={s.label}>
            <div className="p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-2 font-display text-3xl font-bold">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xl font-bold">การเติบโตทุกวัน</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>น้อย</span>
              {[0, 1, 2, 3, 4].map((v) => (
                <span key={v} className={`h-3.5 w-3.5 rounded border border-ink ${intensity(v)}`} />
              ))}
              <span>มาก</span>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto">
            <div className="flex gap-1.5">
              {growthGrid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1.5">
                  {week.map((v, di) => (
                    <div key={di} className={`h-4 w-4 rounded border border-ink/40 ${intensity(v)}`} title={`สัปดาห์ ${wi + 1} วัน ${di + 1}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 rounded-lg border-2 border-ink bg-yellow px-4 py-3 text-sm font-medium">
            ✦ สัปดาห์นี้คุณก้าวไปกับ Goal มากกว่าสัปดาห์ก่อน 28% — ทำต่อแบบนี้
          </p>
        </div>
      </Card>
    </AppShell>
  );
}