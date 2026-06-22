import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mascot } from "@/components/Mascot";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "เริ่มต้น · LifeOS" },
      { name: "description", content: "ตอบ 2 คำถามใน 15 วินาที แล้ว LifeOS จะปรับหน้าจอให้ตรงกับช่วงชีวิตของคุณ" },
    ],
  }),
  component: Onboarding,
});

const roles = [
  { id: "student", label: "นักศึกษา / กำลังหางาน", desc: "วางแผน Skill และหา Internship แรก" },
  { id: "switcher", label: "ทำงานแล้ว อยากเปลี่ยนสาย", desc: "หา Skill ที่ขาดและจังหวะที่ใช่" },
  { id: "owner", label: "เจ้าของธุรกิจ", desc: "ดู Revenue · Customer · Competitor" },
  { id: "starter", label: "อยากเริ่มทำธุรกิจ", desc: "Validate ไอเดียและหา Co-founder" },
];
const goalsByRole: Record<string, string[]> = {
  student: ["หางาน / ฝึกงาน", "เปลี่ยนสายเรียน", "ยังไม่แน่ใจ อยากสำรวจตัวเอง"],
  switcher: ["เปลี่ยนสายงาน", "เลื่อนตำแหน่ง", "เริ่มงานฟรีแลนซ์"],
  owner: ["เพิ่ม Revenue 30%", "ขยายทีม", "ออกโปรดักต์ใหม่"],
  starter: ["Validate ไอเดีย", "หา Co-founder", "หานักลงทุน"],
};
const connectByRole: Record<string, { name: string; benefit: string }[]> = {
  student: [
    { name: "GitHub", benefit: "AI จะรู้ Skill จริงจากโค้ดที่เขียน ไม่ต้องพิมพ์เอง" },
    { name: "LinkedIn", benefit: "ดึงประวัติเรียน/ฝึกงานอัตโนมัติ" },
    { name: "Google Calendar", benefit: "วิเคราะห์ว่าเวลาคุณไปอยู่ที่ไหน" },
  ],
  switcher: [
    { name: "LinkedIn", benefit: "ดึงประสบการณ์ทำงานเดิม" },
    { name: "GitHub", benefit: "ตรวจ Skill เชิงเทคนิคจริง" },
    { name: "Google Calendar", benefit: "วิเคราะห์การใช้เวลา" },
  ],
  owner: [
    { name: "Google Calendar", benefit: "วิเคราะห์การใช้เวลาในธุรกิจ" },
    { name: "Stripe", benefit: "ดู Revenue real-time" },
  ],
  starter: [
    { name: "LinkedIn", benefit: "ดู Network ที่มีอยู่" },
    { name: "Notion", benefit: "ดึงเอกสารไอเดียที่จดไว้" },
  ],
};

function Onboarding() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  const total = 5;
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b-2 border-ink px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium">
            <div className="flex h-7 w-7 items-center justify-center rounded border-2 border-ink bg-yellow font-display font-bold">L</div>
            LifeOS
          </Link>
          <div className="font-mono text-xs text-muted-foreground">{step + 1} จาก {total}</div>
        </div>
        <div className="mx-auto mt-3 h-1.5 max-w-3xl rounded-full border border-ink bg-cream">
          <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        {step === 0 && (
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">ตอนนี้คุณอยู่ในช่วงไหนของชีวิต</h1>
            <p className="mt-3 text-muted-foreground">เลือกอันที่ใกล้ที่สุด ระบบจะปรับทุกหน้าให้ตรงกับคุณตั้งแต่วินาทีถัดไป</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setRole(r.id); setStep(1); }}
                  className={`group rounded-2xl border-2 border-ink p-6 text-left shadow-brutal-sm transition-transform hover:-translate-y-1 ${role === r.id ? "bg-yellow" : "bg-card"}`}
                >
                  <div className="font-display text-xl font-bold">{r.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">เป้าหมายตอนนี้คืออะไร</h1>
            <p className="mt-3 text-muted-foreground">เลือกหนึ่งข้อ — แก้ภายหลังได้เสมอ</p>
            <div className="mt-8 space-y-3">
              {(goalsByRole[role] ?? goalsByRole.student).map((g) => (
                <button
                  key={g}
                  onClick={() => { setGoal(g); setStep(2); }}
                  className={`flex w-full items-center justify-between rounded-xl border-2 border-ink p-5 text-left shadow-brutal-sm transition-transform hover:-translate-y-0.5 ${goal === g ? "bg-yellow" : "bg-card"}`}
                >
                  <span className="font-display text-lg font-semibold">{g}</span>
                  <span className="text-xl">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">เชื่อมข้อมูลที่มีอยู่แล้ว</h1>
            <p className="mt-3 text-muted-foreground">ไม่บังคับ — ข้ามได้ตลอด แต่เชื่อมแล้ว AI จะรู้จักคุณจริงเร็วขึ้นมาก</p>
            <div className="mt-8 space-y-3">
              {(connectByRole[role] ?? connectByRole.student).map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-xl border-2 border-ink bg-card p-5 shadow-brutal-sm">
                  <div>
                    <div className="font-display text-lg font-semibold">{c.name}</div>
                    <div className="mt-0.5 text-sm text-muted-foreground">{c.benefit}</div>
                  </div>
                  <button className="rounded-md border-2 border-ink bg-yellow px-4 py-2 text-sm font-semibold shadow-brutal-sm">เชื่อม</button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="text-sm font-medium text-muted-foreground hover:text-ink">← ย้อนกลับ</button>
              <button onClick={() => setStep(3)} className="rounded-md border-2 border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-brutal-sm">ข้ามและไปต่อ →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">คุยกับ AI Mentor สั้นๆ</h1>
            <p className="mt-3 text-muted-foreground">3 คำถาม ใช้เวลาไม่เกิน 30 วินาที</p>
            <div className="mt-8 space-y-5">
              {[
                { q: "เวลาตัดสินใจเรื่องสำคัญ คุณเป็นแบบไหนมากกว่า", a: ["คิดเยอะก่อนทำ", "ลงมือทำแล้วปรับ"] },
                { q: "ของใหม่ที่ไม่เคยทำ คุณรู้สึกยังไง", a: ["ตื่นเต้น อยากลอง", "ขอดูคนอื่นทำก่อน"] },
                { q: "ทำงานแบบไหน you อินที่สุด", a: ["คนเดียวลึกๆ", "ทีมเล็กที่สนิท", "ทีมใหญ่ คุยเยอะ"] },
              ].map((qa, i) => (
                <div key={i} className="rounded-2xl border-2 border-ink bg-card p-5 shadow-brutal-sm">
                  <div className="text-xs font-mono text-muted-foreground">คำถาม {i + 1} / 3</div>
                  <div className="mt-1 font-display text-lg font-semibold">{qa.q}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {qa.a.map((a) => (
                      <button key={a} className="rounded-full border-2 border-ink bg-cream px-4 py-1.5 text-sm font-medium hover:bg-yellow">{a}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="text-sm font-medium text-muted-foreground hover:text-ink">← ย้อนกลับ</button>
              <button onClick={() => setStep(4)} className="rounded-md border-2 border-ink bg-yellow px-5 py-2.5 text-sm font-semibold shadow-brutal-sm">เห็นผลลัพธ์แรก →</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-medium">✦ AI Insight แรกของคุณ</div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              จากโค้ดของคุณ — <span className="bg-yellow px-2">Python แข็งแล้ว</span><br /> ตลาดต้องการ Docker + Cloud เพิ่ม
            </h1>
            <div className="mt-8 grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div className="rounded-2xl border-2 border-ink bg-card p-6 shadow-brutal-sm">
                <div className="space-y-4">
                  {[
                    { l: "Python", v: 85, gap: false },
                    { l: "SQL", v: 78, gap: false },
                    { l: "Docker (สิ่งที่ตลาดต้องการ)", v: 25, gap: true },
                    { l: "AWS / GCP (สิ่งที่ตลาดต้องการ)", v: 18, gap: true },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="flex justify-between text-sm font-medium">
                        <span>{s.l}</span><span>{s.v}%</span>
                      </div>
                      <div className="mt-1 h-2.5 rounded-full border border-ink bg-cream">
                        <div className={`h-full rounded-full ${s.gap ? "bg-destructive" : "bg-ink"}`} style={{ width: `${s.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Mascot size={160} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app" className="rounded-md border-2 border-ink bg-ink px-6 py-3 text-base font-semibold text-cream shadow-brutal">
                ดูแผนพัฒนาเต็มรูป →
              </Link>
              <button className="rounded-md border-2 border-ink bg-card px-6 py-3 text-base font-medium shadow-brutal-sm">บันทึก Insight</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}