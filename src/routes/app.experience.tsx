import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { experiences } from "@/lib/mock";

export const Route = createFileRoute("/app/experience")({
  head: () => ({ meta: [{ title: "Experience Vault · LifeOS" }] }),
  component: Vault,
});

function Vault() {
  return (
    <AppShell title="Experience Vault" subtitle="ทุกอย่างที่คุณเคยทำ — ระบบสร้าง Growth Resume ให้เอง">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-ink p-5 text-cream shadow-brutal-sm">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-yellow">Growth Resume</div>
          <p className="mt-1 font-display text-lg font-semibold">อัปเดตล่าสุด 18 มิ.ย. 2026 — พร้อมส่งสมัครงาน</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md border-2 border-cream bg-ink px-4 py-2 text-sm font-semibold">แชร์เป็นลิงก์</button>
          <button className="rounded-md border-2 border-cream bg-yellow px-4 py-2 text-sm font-semibold text-ink">ดาวน์โหลด PDF</button>
        </div>
      </div>
      <div className="grid gap-3">
        {experiences.map((e) => (
          <Card key={e.id}>
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Pill tone="yellow">{e.type}</Pill>
                  {e.verified ? <Pill tone="ink">✓ ยืนยันแล้ว</Pill> : <Pill>รอยืนยัน</Pill>}
                </div>
                <div className="mt-2 font-display text-lg font-bold">{e.title}</div>
                <div className="text-sm text-muted-foreground">{e.period}</div>
              </div>
              <button className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-medium">รายละเอียด</button>
            </div>
          </Card>
        ))}
        <button className="rounded-2xl border-2 border-dashed border-ink py-6 text-sm font-semibold text-muted-foreground hover:bg-card">+ เพิ่มประสบการณ์ใหม่</button>
      </div>
    </AppShell>
  );
}