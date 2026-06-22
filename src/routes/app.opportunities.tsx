import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { opportunities } from "@/lib/mock";

export const Route = createFileRoute("/app/opportunities")({
  head: () => ({ meta: [{ title: "Opportunity Engine · LifeOS" }] }),
  component: Opp,
});

function Opp() {
  return (
    <AppShell title="Opportunity Engine" subtitle="ฟีดเดียว — เรียงตามความตรงกับโปรไฟล์ของคุณ">
      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((o) => (
          <Card key={o.id}>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="yellow">{o.type}</Pill>
                    {o.sponsored && <Pill tone="ink">ผู้สนับสนุน</Pill>}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-tight">{o.title}</h3>
                </div>
                <div className="shrink-0 rounded-lg border-2 border-ink bg-yellow px-3 py-2 text-center shadow-brutal-sm">
                  <div className="font-display text-2xl font-bold leading-none">{o.match}<span className="text-sm">%</span></div>
                  <div className="text-[10px] font-mono">match</div>
                </div>
              </div>
              <p className="mt-4 rounded-lg border-2 border-dashed border-ink/30 bg-cream p-3 text-sm">
                <span className="font-semibold">ทำไมแนะนำ:</span> {o.reason}
              </p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-md border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-cream shadow-brutal-sm">ดูรายละเอียด</button>
                <button className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-medium">บันทึก</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}