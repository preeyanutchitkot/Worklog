import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { mentorChat } from "@/lib/mock";

export const Route = createFileRoute("/app/mentor")({
  head: () => ({ meta: [{ title: "AI Mentor · LifeOS" }] }),
  component: Mentor,
});

function Mentor() {
  return (
    <AppShell title="AI Mentor" subtitle="ที่ปรึกษาที่รู้บริบทคุณทั้งหมด — เป้าหมาย เวลา ทักษะ พฤติกรรม">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <div className="flex h-[640px] flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {mentorChat.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  {m.from === "mentor" && <div className="mr-3 mt-1 shrink-0"><Mascot size={32} /></div>}
                  <div className={`max-w-[75%] rounded-2xl border-2 border-ink px-4 py-3 text-sm leading-relaxed shadow-brutal-sm ${m.from === "me" ? "bg-ink text-cream" : "bg-yellow"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-ink bg-card p-4">
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-md border-2 border-ink bg-cream px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-yellow"
                  placeholder="พิมพ์คำถามอะไรก็ได้ — Mentor รู้บริบทคุณทั้งหมด"
                />
                <button className="rounded-md border-2 border-ink bg-yellow px-5 py-3 text-sm font-bold shadow-brutal-sm">ส่ง →</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {["รีวิวสัปดาห์นี้ให้หน่อย", "ควรเรียน Kubernetes มั้ย?", "วันนี้ฉันควรโฟกัสอะไร"].map((s) => (
                  <button key={s} className="rounded-full border-2 border-ink bg-cream px-3 py-1 font-medium hover:bg-yellow">{s}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <div className="space-y-5">
          <Card tone="yellow">
            <div className="p-5">
              <div className="text-xs font-mono uppercase tracking-widest">บริบทที่ Mentor เห็นอยู่</div>
              <ul className="mt-3 space-y-2 text-sm font-medium">
                <li>● Goal: Data Engineer (42%)</li>
                <li>● Skill: Python 85, SQL 78</li>
                <li>● Gap: Docker, Cloud</li>
                <li>● Streak: 18 วัน</li>
                <li>● สไตล์: Deep work เช้า</li>
              </ul>
            </div>
          </Card>
          <Card>
            <div className="p-5">
              <div className="font-display font-bold">ความโปร่งใส</div>
              <p className="mt-1 text-sm text-muted-foreground">ทุกคำตอบมีปุ่ม "ดูว่า AI ใช้ข้อมูลอะไร" ใต้ข้อความ คลิกได้เลย</p>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}