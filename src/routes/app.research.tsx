import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";

export const Route = createFileRoute("/app/research")({
  head: () => ({ meta: [{ title: "Research Center · LifeOS" }] }),
  component: Research,
});

function Research() {
  return (
    <AppShell title="Research Center" subtitle="ถามอะไรก็ได้ — AI ใช้ข้อมูลคุณบวกข้อมูลตลาดล่าสุดในการตอบ">
      <div className="mx-auto max-w-3xl">
        <Card tone="ink">
          <div className="p-8">
            <input
              className="w-full rounded-lg border-2 border-yellow bg-ink-soft px-5 py-5 text-lg font-medium text-cream placeholder:text-cream/40 focus:outline-none focus:ring-4 focus:ring-yellow"
              placeholder="เช่น 'ควรเรียน Kubernetes ไหม' หรือ 'Data Engineer ในไทยเงินเดือนเท่าไหร่'"
            />
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {["ควรเปลี่ยนงานตอนนี้มั้ย", "Skill ไหนที่ตลาด AI ปี 2026 ต้องการ", "ทุนป.โท Data ในยุโรปฟรี"].map((s) => (
                <button key={s} className="rounded-full border-2 border-cream bg-ink px-3 py-1 font-medium text-cream hover:bg-yellow hover:text-ink">{s}</button>
              ))}
            </div>
          </div>
        </Card>
        <div className="mt-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">คำถามล่าสุด</div>
          {[
            { q: "ถ้าจะ apply ฝึกงาน Data Engineer ที่ SCB 10X ควรเตรียมอะไร?", t: "เมื่อวาน · 22:14" },
            { q: "เทียบ Airflow vs Prefect สำหรับโปรเจกต์เดี่ยว", t: "3 วันก่อน" },
            { q: "ควรทำ Master's Data Science หรือทำงานก่อน?", t: "สัปดาห์ที่แล้ว" },
          ].map((q) => (
            <Card key={q.q}>
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <div className="font-display text-base font-semibold">{q.q}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{q.t}</div>
                </div>
                <button className="rounded-md border-2 border-ink bg-yellow px-4 py-2 text-sm font-semibold shadow-brutal-sm">เปิดอ่าน</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}