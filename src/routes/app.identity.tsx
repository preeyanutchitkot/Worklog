import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { identity } from "@/lib/mock";

export const Route = createFileRoute("/app/identity")({
  head: () => ({ meta: [{ title: "Identity Hub · LifeOS" }] }),
  component: Identity,
});

function Identity() {
  return (
    <AppShell title="Identity Hub" subtitle="ระบบรู้จักคุณยังไง — โปร่งใส กดดูที่มาได้ทุกอย่าง">
      <div className="mb-6 rounded-2xl border-2 border-ink bg-yellow p-5 shadow-brutal-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest">แจ้งเตือนเล็กน้อย</div>
            <p className="mt-1 font-display text-lg font-semibold">ดูเหมือนความสนใจของคุณเปลี่ยนไปทาง System Design — อัปเดตโปรไฟล์มั้ย?</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-semibold">ยังไม่ใช่</button>
            <button className="rounded-md border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-cream">ใช่ อัปเดตเลย</button>
          </div>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {identity.map((i) => (
          <Card key={i.key}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{i.key}</div>
                  <div className="mt-1 font-display text-xl font-bold">{i.label}</div>
                  <div className="mt-2 text-base">{i.value}</div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-yellow text-lg font-bold transition-transform group-open:rotate-45">+</div>
              </summary>
              <div className="border-t-2 border-dashed border-ink/15 px-6 py-5">
                <p className="text-sm">{i.detail}</p>
                <div className="mt-4 rounded-lg border-2 border-ink bg-cream p-3 text-xs">
                  <span className="font-mono font-semibold">ทำไมระบบคิดแบบนี้:</span> {i.source}
                </div>
              </div>
            </details>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}