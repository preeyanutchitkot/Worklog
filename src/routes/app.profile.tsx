import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { identity, experiences, growthStats, goals } from "@/lib/mock";
import { saveToGoogleSheets, useUser } from "@/lib/api";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "โปรไฟล์ · LifeOS" }] }),
  component: Profile,
});

function Profile() {
  const user = useUser();
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [bio, setBio] = useState(() => {
    const saved = window.localStorage.getItem("worklog-profile-bio");
    return saved || "นักศึกษาปี 4 สาย CS · กำลังสร้างเส้นทางสู่ Data Engineer · ชอบสร้างของจริงมากกว่าตำแหน่งโต";
  });
  const [draft, setDraft] = useState(bio);
  
  const [links, setLinks] = useState(() => {
    const saved = window.localStorage.getItem("worklog-profile-links");
    if (saved) return JSON.parse(saved);
    return [
      { label: "GitHub", value: "github.com/phumtnp" },
      { label: "LinkedIn", value: "linkedin.com/in/phumtnp" },
      { label: "Email", value: "phum@lifeos.app" },
    ];
  });

  const [identityList, setIdentityList] = useState(() => {
    const saved = window.localStorage.getItem("worklog-identity");
    if (saved) return JSON.parse(saved);
    return identity && identity.length > 0 ? identity : [
      { key: "core_skill", label: "ทักษะหลัก", value: "Full Stack Development", detail: "เชี่ยวชาญ React และ Node.js", source: "Work logs ล่าสุด" },
      { key: "interest", label: "ความสนใจ", value: "System Design", detail: "ชอบอ่านบทความเกี่ยวกับ Architecture", source: "พฤติกรรมการอ่าน" },
    ];
  });

  const [expList, setExpList] = useState(() => {
    const saved = window.localStorage.getItem("worklog-experiences");
    if (saved) return JSON.parse(saved);
    return experiences && experiences.length > 0 ? experiences : [
      { id: 1, type: "Project", title: "สร้าง LifeOS MVP ด้วย React", period: "มิ.ย. 2026 - ปัจจุบัน", verified: false },
    ];
  });

  useEffect(() => {
    window.localStorage.setItem("worklog-profile-bio", bio);
    window.localStorage.setItem("worklog-profile-links", JSON.stringify(links));
  }, [bio, links]);

  function save() {
    setBio(draft);
    setEditing(false);
    toast.success("บันทึกโปรไฟล์แล้ว");
  }

  function share() {
    navigator.clipboard?.writeText("https://lifeos.app/u/phumtnp").catch(() => {});
    toast.success("คัดลอกลิงก์โปรไฟล์แล้ว", { description: "lifeos.app/u/phumtnp" });
  }

  async function handleSaveToSheets() {
    setIsSaving(true);
    toast("กำลังบันทึกลง Google Sheets...");
    const success = await saveToGoogleSheets({ type: "profile", data: { bio, links, identity: identityList, experiences: expList } });
    if (success) {
      toast.success("บันทึกลง Google Sheets สำเร็จ!");
    } else {
      toast.error("บันทึกไม่สำเร็จ ตรวจสอบ Webhook URL");
    }
    setIsSaving(false);
  }

  return (
    <AppShell title="โปรไฟล์ของคุณ" subtitle="ภาพรวมตัวตน · ทักษะ · ผลงาน — แชร์ให้คนอื่นได้ในลิงก์เดียว">
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Left: identity card */}
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl border-2 border-ink bg-yellow p-2 shadow-brutal-sm">
                  <Mascot size={72} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl font-bold leading-tight">{user.name}</h2>
                  <div className="mt-1 text-sm text-muted-foreground">{user.role}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Pill tone="yellow">Lv.3</Pill>
                    <Pill>streak {user.streak} วัน</Pill>
                    <Pill tone="ink">เปิดรับงาน</Pill>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest">เกี่ยวกับฉัน</span>
                  {!editing && (
                    <button
                      onClick={() => {
                        setDraft(bio);
                        setEditing(true);
                      }}
                      className="text-xs font-semibold underline underline-offset-2"
                    >
                      แก้ไข
                    </button>
                  )}
                </div>
                {editing ? (
                  <div className="space-y-2">
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      rows={4}
                      className="w-full rounded-md border-2 border-ink bg-card p-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={save}
                        className="rounded-md border-2 border-ink bg-yellow px-3 py-1.5 text-xs font-semibold shadow-brutal-sm"
                      >
                        บันทึก
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="rounded-md border-2 border-ink bg-card px-3 py-1.5 text-xs font-medium"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{bio}</p>
                )}
              </div>

              <div className="mt-5 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest">ช่องทางติดต่อ</span>
                {links.map((l, i) => (
                  <div key={l.label} className="flex items-center gap-2 text-sm">
                    <span className="w-20 shrink-0 font-mono text-xs uppercase text-muted-foreground">{l.label}</span>
                    <input
                      value={l.value}
                      onChange={(e) => {
                        const next = [...links];
                        next[i] = { ...l, value: e.target.value };
                        setLinks(next);
                      }}
                      className="min-w-0 flex-1 rounded-md border-2 border-ink bg-card px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-yellow"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={share}
                  className="flex-1 rounded-md border-2 border-ink bg-ink px-3 py-2 text-sm font-semibold text-cream shadow-brutal-sm"
                >
                  แชร์โปรไฟล์
                </button>
                <button
                  onClick={() => toast.success("ดาวน์โหลด PDF เรียบร้อย (mock)")}
                  className="rounded-md border-2 border-ink bg-card px-3 py-2 text-sm font-medium shadow-brutal-sm"
                >
                  PDF
                </button>
              </div>
              <div className="mt-2">
                <button
                  onClick={handleSaveToSheets}
                  disabled={isSaving}
                  className="w-full rounded-md border-2 border-ink bg-yellow px-3 py-2 text-sm font-semibold shadow-brutal-sm disabled:opacity-50"
                >
                  {isSaving ? "กำลังบันทึก..." : "บันทึกลง Google Sheets"}
                </button>
              </div>
            </div>
          </Card>

          <Card tone="yellow">
            <div className="p-6">
              <div className="text-xs font-mono uppercase tracking-widest">เป้าหมายหลักตอนนี้</div>
              <div className="mt-2 font-display text-xl font-bold leading-tight">{user.goal}</div>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
                <div className="h-full bg-ink" style={{ width: `${user.goalProgress}%` }} />
              </div>
              <div className="mt-1 text-xs font-mono">{user.goalProgress}% ของเส้นทาง</div>
            </div>
          </Card>
        </div>

        {/* Right: stats / identity / experience */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {growthStats.map((s) => (
              <Card key={s.label}>
                <div className="p-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
                  <div className="mt-1 font-display text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">Identity Snapshot</h3>
                <span className="text-xs font-mono text-muted-foreground">8 มิติ</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {identityList.slice(0, 6).map((it: any) => (
                  <div key={it.key} className="rounded-lg border-2 border-ink/15 p-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{it.label}</div>
                    <div className="mt-0.5 text-sm font-semibold">{it.value}</div>
                    <div className="text-xs text-muted-foreground">{it.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">เป้าหมายที่กำลังเดิน</h3>
                <ul className="mt-3 space-y-3">
                  {goals.map((g) => (
                    <li key={g.id} className="rounded-lg border-2 border-ink/15 p-3">
                      <div className="text-sm font-semibold">{g.title}</div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full border border-ink/20 bg-cream">
                        <div className="h-full bg-yellow" style={{ width: `${g.progress}%` }} />
                      </div>
                      <div className="mt-1 text-xs font-mono text-muted-foreground">
                        {g.done}/{g.sub} subgoals · {g.progress}%
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">ผลงานที่ยืนยันแล้ว</h3>
                <ul className="mt-3 space-y-3">
                  {expList.map((e: any) => (
                    <li key={e.id} className="flex items-start gap-3">
                      <Pill tone={e.verified ? "yellow" : "light"}>{e.type}</Pill>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold">{e.title}</div>
                        <div className="text-xs text-muted-foreground">{e.period}</div>
                      </div>
                      {e.verified && <span className="text-xs font-mono text-yellow-deep">✓ verified</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}