import { createFileRoute, Link } from "@tanstack/react-router";
import { Mascot } from "@/components/Mascot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LifeOS — รู้ว่าตอนนี้คุณอยู่ตรงไหน และควรก้าวต่อไปทางไหน" },
      { name: "description", content: "AI Mentor ส่วนตัวที่รู้จักคุณจริง ช่วยตัดสินใจเรื่องอาชีพ ทักษะ และเป้าหมายชีวิต ใช้งานฟรี" },
      { property: "og:title", content: "LifeOS — AI Mentor ที่รู้จักคุณจริง" },
      { property: "og:description", content: "รู้ Gap ของตัวเองใน 5 นาที แล้วเดินทางที่ใช่ พร้อมแผนที่ AI ปรับให้ทุกวัน" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink bg-yellow font-display text-lg font-bold">L</div>
          <span className="font-display text-xl font-bold">LifeOS</span>
        </div>
        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="#how" className="hover:text-yellow-deep">วิธีใช้งาน</a>
          <a href="#modules" className="hover:text-yellow-deep">โมดูล</a>
          <a href="#stories" className="hover:text-yellow-deep">เรื่องจริง</a>
          <a href="#faq" className="hover:text-yellow-deep">คำถามที่พบบ่อย</a>
        </div>
        <Link to="/onboarding" className="rounded-md border-2 border-ink bg-yellow px-4 py-2 text-sm font-semibold shadow-brutal-sm transition-transform hover:-translate-y-0.5">
          เริ่มต้นฟรี
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-y-2 border-ink bg-yellow">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-ink" /> AI Mentor สำหรับชีวิตจริง · เบต้าเปิดแล้ว
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              รู้ว่าตอนนี้<br />คุณอยู่ตรงไหน<br />
              <span className="bg-ink px-3 text-cream">และควรก้าวต่อ</span><br />ทางไหน
            </h1>
            <p className="mt-6 max-w-md text-base text-ink/80 md:text-lg">
              ไม่ต้องกรอกฟอร์มยาว เชื่อม GitHub หรือ LinkedIn 1 ครั้ง แล้วให้ระบบสรุปจุดแข็ง จุดต้องพัฒนา และก้าวต่อไปให้คุณภายใน 60 วินาที
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/onboarding" className="rounded-md border-2 border-ink bg-ink px-6 py-3.5 text-base font-semibold text-cream shadow-brutal transition-transform hover:-translate-y-0.5">
                เริ่มต้นใช้งานฟรี →
              </Link>
              <Link to="/app" className="rounded-md border-2 border-ink bg-cream px-6 py-3.5 text-base font-semibold shadow-brutal-sm transition-transform hover:-translate-y-0.5">
                ดูตัวอย่าง Dashboard
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-5 text-xs text-ink/70">
              <span>✓ ไม่ต้องใช้บัตรเครดิต</span>
              <span>✓ ข้อมูลคุณเป็นของคุณ</span>
              <span>✓ ออกเมื่อไหร่ก็ได้</span>
            </div>
          </div>

          {/* Wow moment preview card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl border-2 border-ink bg-ink/5" />
            <div className="relative rounded-2xl border-2 border-ink bg-cream p-5 shadow-brutal">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>AI Insight แรกของคุณ</span>
                <span>0:43</span>
              </div>
              <p className="mt-3 font-display text-xl font-semibold leading-snug">
                "จากโค้ดของคุณ — Python แข็งแล้ว ตลาด Data Engineer<br />ต้องการ <span className="bg-yellow px-1.5">Docker + Cloud</span> เพิ่ม"
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { l: "Python", v: 85 },
                  { l: "SQL", v: 78 },
                  { l: "Docker (gap)", v: 25 },
                  { l: "AWS (gap)", v: 18 },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="flex justify-between text-xs font-medium">
                      <span>{s.l}</span>
                      <span>{s.v}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full border border-ink bg-cream">
                      <div className="h-full rounded-full bg-ink" style={{ width: `${s.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full rounded-md border-2 border-ink bg-yellow py-2.5 text-sm font-semibold shadow-brutal-sm">
                ดูแผนพัฒนาเต็มรูป →
              </button>
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border-2 border-ink bg-cream p-3 shadow-brutal-sm">
              <Mascot size={64} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b-2 border-ink bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x-2 divide-cream/20 md:grid-cols-4">
          {[
            { v: "12,408", l: "คนใช้งานอยู่" },
            { v: "84,210", l: "Goal ที่กำลังเดิน" },
            { v: "31,557", l: "Skill Gap ที่ปิดแล้ว" },
            { v: "2,140", l: "โอกาสที่จับคู่สำเร็จ" },
          ].map((s) => (
            <div key={s.l} className="px-6 py-7 text-center">
              <div className="font-display text-3xl font-bold md:text-4xl">{s.v}</div>
              <div className="mt-1 text-xs text-cream/70 md:text-sm">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 pillars */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-mono uppercase tracking-widest text-yellow-deep">วิธีที่ LifeOS ทำงาน</div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            สามอย่าง ทำงานเป็นระบบเดียว
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { i: "☺", t: "ระบบรู้จักคุณ", d: "Identity Hub สรุป Personality, Skills, Values, Working Style จากข้อมูลที่คุณมีอยู่แล้ว ไม่ต้องตอบแบบทดสอบยาว" },
            { i: "✦", t: "AI Mentor ช่วยตัดสินใจ", d: "ทุกคำตอบอ้างอิงเป้าหมายและข้อมูลจริงของคุณ พร้อมปุ่ม 'ดูว่า AI ใช้ข้อมูลอะไรตอบ' เสมอ" },
            { i: "◆", t: "พาคุณไปถึงเป้าหมาย", d: "Goals · Calendar · Career Lab · Opportunity ทำงานเชื่อมกัน ไม่ต้องวางแผนเองทุกขั้น" },
          ].map((p, i) => (
            <div key={p.t} className="group relative rounded-2xl border-2 border-ink bg-card p-7 shadow-brutal-sm transition-transform hover:-translate-y-1">
              <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
              <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-md border-2 border-ink bg-yellow text-xl">{p.i}</div>
              <h3 className="mt-5 font-display text-xl font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules grid */}
      <section id="modules" className="border-y-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm font-mono uppercase tracking-widest text-yellow-deep">โมดูลทั้งหมด</div>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">10 โมดูล · 1 จังหวะใช้งาน</h2>
            </div>
            <Link to="/app" className="rounded-md border-2 border-ink bg-yellow px-4 py-2 text-sm font-semibold shadow-brutal-sm">เปิด Dashboard →</Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              ["◉", "Dynamic Home", "หน้าโฮมที่ปรับตามบทบาทและช่วงชีวิต"],
              ["☺", "Identity Hub", "8 หมวด — Personality, Skills, Values, ..."],
              ["▥", "Growth Graph", "ดูการเติบโตทุกวันแบบ GitHub Contribution"],
              ["◎", "Goals Center", "เป้าหมายหลักไม่เกิน 3 อัน เพื่อไม่ล้น"],
              ["▦", "Calendar OS", "เวลาที่ใช้กับเป้าหมาย vs เวลาส่วนตัว"],
              ["✸", "Experience Vault", "ทุก Project + ใบ Cert พร้อม Growth Resume"],
              ["↗", "Career Lab", "Gap Analysis เทียบกับตลาดจริง"],
              ["◆", "Opportunity", "งาน · Hackathon · ทุน · Co-founder"],
              ["?", "Research Center", "ถาม AI แบบรู้บริบทคุณทั้งหมด"],
              ["♥", "Mascot Companion", "พิกซี่ที่เติบโตตามข้อมูลจริงของคุณ"],
              ["♣", "Social Layer", "Accountability Group เล็กๆ ที่ไว้ใจได้"],
              ["▲", "Business Mode", "เปิดเฉพาะเจ้าของธุรกิจ"],
            ].map(([icon, name, desc]) => (
              <div key={name} className="rounded-xl border-2 border-ink bg-cream p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink bg-yellow text-base">{icon}</div>
                <div className="mt-3 font-display text-base font-bold">{name}</div>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-sm font-mono uppercase tracking-widest text-yellow-deep">เรื่องจริงจากผู้ใช้</div>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          ไม่ใช่ฟีเจอร์ที่สวย แต่เป็น <em className="not-italic underline decoration-yellow decoration-[10px] underline-offset-2">ผลลัพธ์ที่ใช้ได้จริง</em>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { q: "AI บอกผมว่าควรเรียน Docker ก่อน SQL ผมทำตามแล้วได้ Internship ใน 2 เดือน", n: "ธีร์ · ปี 4 วิศวะคอม" },
            { q: "เลิกตั้งเป้าหมายเยอะเกินเพราะระบบจำกัดให้ 3 อัน 6 เดือนผ่านไป ทำสำเร็จจริง 2 อัน", n: "พลอย · Designer" },
            { q: "Growth Resume สร้างให้อัตโนมัติ ส่งสมัครงานได้เลยไม่ต้องนั่งเขียนใหม่", n: "เอิร์ธ · จบใหม่ Data" },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border-2 border-ink bg-card p-6 shadow-brutal-sm">
              <div className="font-display text-2xl leading-none text-yellow-deep">"</div>
              <p className="mt-2 text-base font-medium leading-relaxed">{s.q}</p>
              <div className="mt-5 border-t-2 border-dashed border-ink/20 pt-3 text-xs text-muted-foreground">{s.n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-y-2 border-ink bg-ink text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              ตัดสินใจเรื่องชีวิต<br />ด้วยข้อมูลของ <span className="text-yellow">ตัวเอง</span> สักที
            </h2>
            <p className="mt-4 max-w-md text-cream/70">ใช้เวลา 60 วินาที เห็นแผนการเติบโตของตัวเองเป็นครั้งแรก</p>
          </div>
          <Link to="/onboarding" className="rounded-md border-2 border-cream bg-yellow px-8 py-4 text-lg font-bold text-ink shadow-brutal transition-transform hover:-translate-y-0.5">
            เริ่มต้นใช้งานฟรี →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded border-2 border-ink bg-yellow font-display font-bold">L</div>
            <span className="font-medium text-ink">LifeOS</span>
            <span>© 2026</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-ink">ความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-ink">ข้อตกลงการใช้งาน</a>
            <a href="#" className="hover:text-ink">ติดต่อ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
