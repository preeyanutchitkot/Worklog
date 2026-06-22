import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { careerGap } from "@/lib/mock";

export const Route = createFileRoute("/app/career")({
  head: () => ({ meta: [{ title: "Career Lab · LifeOS" }] }),
  component: Career,
});

function Career() {
  return (
    <AppShell title="Career Lab" subtitle={`เทียบสิ่งที่ตลาดต้องการ vs สิ่งที่คุณมี · ${careerGap.updated}`}>
      <Card tone="yellow" className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest">เป้าหมายอาชีพ</div>
            <div className="mt-1 font-display text-2xl font-bold">{careerGap.role}</div>
          </div>
          <button className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-medium">เปลี่ยนเป้าหมาย</button>
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="font-display text-lg font-bold">สิ่งที่คุณมีอยู่แล้ว</h3>
            <div className="mt-5 space-y-4">
              {careerGap.have.map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{s.skill}</span><span>{s.level}%</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-full border border-ink bg-cream">
                    <div className="h-full rounded-full bg-ink" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card tone="ink">
          <div className="p-6">
            <h3 className="font-display text-lg font-bold text-yellow">Gap — ที่ตลาดต้องการแต่คุณยังขาด</h3>
            <div className="mt-5 space-y-4">
              {careerGap.gap.map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{s.skill}</span>
                    <span className="font-mono text-xs text-cream/60">ตลาดต้องการ {s.demand}%</span>
                  </div>
                  <div className="mt-1 flex h-2.5 overflow-hidden rounded-full border border-cream bg-cream/10">
                    <div className="bg-yellow" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-md border-2 border-cream bg-yellow py-3 text-sm font-bold text-ink shadow-brutal-sm">สร้างแผนพัฒนา 8 สัปดาห์ →</button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}