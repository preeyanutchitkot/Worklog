import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { mentorChat } from "@/lib/mock";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/app/mentor")({
  head: () => ({ meta: [{ title: "AI Mentor · LifeOS" }] }),
  component: Mentor,
});

function Mentor() {
  const [messages, setMessages] = useState(mentorChat);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "me", text: t }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      const reply =
        /docker|kubernetes|k8s/i.test(t)
          ? "Docker คุณเพิ่งเริ่ม ตอนนี้ Skill 25% ผมแนะนำให้จบตอนที่ 3-5 ก่อน ค่อยขยับ Kubernetes ครับ"
          : /โฟกัส|วันนี้/i.test(t)
          ? "วันนี้คุณมี deep-work 2 ช่วงเช้า เอาเวลา 07:00 ทำ Docker ตอนที่ 3 ก่อน แล้วช่วง 14:00 ค่อยทำ ETL"
          : "ผมบันทึกคำถามนี้ไว้ใน Mentor Log แล้ว — จะตอบเชิงลึกใน Daily Review พรุ่งนี้ตอน 08:00";
      setMessages((m) => [...m, { from: "mentor", text: reply }]);
      setTyping(false);
    }, 700);
  }

  return (
    <AppShell title="AI Mentor" subtitle="ที่ปรึกษาที่รู้บริบทคุณทั้งหมด — เป้าหมาย เวลา ทักษะ พฤติกรรม">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <div className="flex h-[640px] flex-col">
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  {m.from === "mentor" && <div className="mr-3 mt-1 shrink-0"><Mascot size={32} /></div>}
                  <div className={`max-w-[75%] rounded-2xl border-2 border-ink px-4 py-3 text-sm leading-relaxed shadow-brutal-sm ${m.from === "me" ? "bg-ink text-cream" : "bg-yellow"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="mr-3 mt-1 shrink-0"><Mascot size={32} /></div>
                  <div className="rounded-2xl border-2 border-ink bg-yellow px-4 py-3 text-sm shadow-brutal-sm">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink" />
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t-2 border-ink bg-card p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(draft);
                }}
                className="flex gap-2"
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="flex-1 rounded-md border-2 border-ink bg-cream px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-yellow"
                  placeholder="พิมพ์คำถามอะไรก็ได้ — Mentor รู้บริบทคุณทั้งหมด"
                />
                <button type="submit" className="rounded-md border-2 border-ink bg-yellow px-5 py-3 text-sm font-bold shadow-brutal-sm">
                  ส่ง →
                </button>
              </form>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {["รีวิวสัปดาห์นี้ให้หน่อย", "ควรเรียน Kubernetes มั้ย?", "วันนี้ฉันควรโฟกัสอะไร"].map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border-2 border-ink bg-cream px-3 py-1 font-medium hover:bg-yellow">{s}</button>
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