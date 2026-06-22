import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { user, todayTasks, opportunities, insights, growthStats } from "@/lib/mock";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "โฮม · LifeOS" }] }),
  component: Home,
});

function Home() {
  const [tasks, setTasks] = useState(todayTasks);
  const toggleTask = (id: number) =>
    setTasks((cur) =>
      cur.map((t) => {
        if (t.id !== id) return t;
        const done = !t.done;
        toast(done ? "เก่งมาก! บันทึกเสร็จแล้ว" : "เปิดงานกลับมาแล้ว");
        return { ...t, done };
      }),
    );
  return (
    <AppShell title={`สวัสดี ${user.name.split(" ")[0]}`} subtitle="วันนี้คุณมีพื้นที่ทำ 3 อย่าง — ไม่ต้องทำทุกอย่างที่ค้างอยู่">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card tone="yellow" className="lg:col-span-2">
          <div className="p-7">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>เป้าหมายหลักที่กำลังเดิน</span>
              <Link to="/app/goals" className="underline underline-offset-2">ดูทั้งหมด →</Link>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">{user.goal}</h2>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <div className="font-display text-5xl font-bold">{user.goalProgress}%</div>
                <div className="mt-1 text-sm">3 จาก 7 เป้าหมายย่อยเสร็จแล้ว</div>
              </div>
              <div className="hidden md:block"><Mascot size={120} /></div>
            </div>
            <div className="mt-5 h-2.5 rounded-full border-2 border-ink bg-cream">
              <div className="h-full rounded-full bg-ink" style={{ width: `${user.goalProgress}%` }} />
            </div>
          </div>
        </Card>

        <Card tone="ink">
          <div className="flex flex-col items-center p-6 text-center">
            <Mascot size={120} />
            <div className="mt-3 font-display text-xl font-bold">{user.mascotName}</div>
            <div className="mt-1 text-xs text-cream/70">streak {user.streak} วัน · Lv.3</div>
            <button
              onClick={() =>
                toast("พิกซี่หน้าตาแบบนี้เพราะ", {
                  description: "Streak 18 วัน + Skill Python 85 + Goal เดิน 42%",
                })
              }
              className="mt-4 rounded-md border-2 border-cream bg-yellow px-4 py-2 text-xs font-semibold text-ink"
            >
              ทำไมหน้าตาแบบนี้?
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">วันนี้ — ทำแค่นี้ก็พอ</h3>
              <span className="text-xs text-muted-foreground">22 มิ.ย. 2026</span>
            </div>
            <div className="mt-5 divide-y-2 divide-dashed divide-ink/15">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-4 py-4">
                  <button
                    onClick={() => toggleTask(t.id)}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-ink ${t.done ? "bg-ink text-cream" : "bg-cream"}`}
                  >
                    {t.done && "✓"}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium ${t.done ? "line-through opacity-50" : ""}`}>{t.title}</div>
                    <div className="mt-1 flex flex-wrap gap-2"><Pill>{t.goal}</Pill><Pill>{t.time}</Pill></div>
                  </div>
                  <button
                    onClick={() => toast.success(`เริ่ม: ${t.title}`, { description: "ตั้ง Focus Timer แล้ว" })}
                    className="rounded-md border-2 border-ink bg-yellow px-3 py-1.5 text-xs font-semibold shadow-brutal-sm"
                  >
                    เริ่ม
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card tone="ink">
          <div className="p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-yellow">AI Insight</div>
            <p className="mt-3 font-display text-lg font-semibold leading-snug">{insights[0].text}</p>
            <div className="mt-4 text-xs text-cream/60">{insights[0].time}</div>
            <button
              onClick={() =>
                toast("AI ใช้ข้อมูลเหล่านี้ตอบ", {
                  description: "Goal · Skills · Calendar · GitHub commits 7 วันล่าสุด",
                })
              }
              className="mt-4 text-xs underline underline-offset-2 hover:text-yellow"
            >
              ดูว่า AI ใช้ข้อมูลอะไรตอบ
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">โอกาสใหม่ที่ตรงกับคุณ</h3>
              <Link to="/app/opportunities" className="text-sm font-medium underline underline-offset-2">ดูทั้งหมด</Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {opportunities.slice(0, 4).map((o) => (
                <div key={o.id} className="rounded-xl border-2 border-ink bg-cream p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-display text-base font-bold leading-tight">{o.title}</div>
                    <div className="rounded-md border-2 border-ink bg-yellow px-2 py-0.5 font-mono text-xs font-bold">{o.match}%</div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Pill>{o.type}</Pill>
                    {o.sponsored && <Pill tone="ink">ผู้สนับสนุน</Pill>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold">โตขึ้นแค่ไหนเดือนนี้</h3>
            <div className="mt-5 space-y-4">
              {growthStats.map((s) => (
                <div key={s.label} className="flex items-end justify-between border-b border-dashed border-ink/15 pb-3">
                  <div>
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.sub}</div>
                  </div>
                  <div className="font-display text-2xl font-bold">{s.value}</div>
                </div>
              ))}
            </div>
            <Link to="/app/growth" className="mt-5 block text-sm font-medium underline underline-offset-2">เปิด Growth Graph →</Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}