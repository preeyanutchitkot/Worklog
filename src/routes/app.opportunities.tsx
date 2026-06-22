import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { opportunities } from "@/lib/mock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/app/opportunities")({
  head: () => ({ meta: [{ title: "Opportunity Engine · LifeOS" }] }),
  component: Opp,
});

const TYPES = ["ทั้งหมด", "งานประจำ", "ฝึกงาน", "Hackathon", "ทุน", "Co-founder"];

function Opp() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("ทั้งหมด");
  const [saved, setSaved] = useState<number[]>([]);
  const [applied, setApplied] = useState<number[]>([]);
  const [active, setActive] = useState<(typeof opportunities)[number] | null>(null);

  const list = useMemo(
    () =>
      opportunities.filter(
        (o) =>
          (type === "ทั้งหมด" || o.type === type) &&
          (q.trim() === "" || o.title.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, type],
  );

  function toggleSave(id: number) {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    toast.success(saved.includes(id) ? "เอาออกจากที่บันทึก" : "บันทึกไว้ดูทีหลัง");
  }

  function apply(id: number, title: string) {
    if (applied.includes(id)) return;
    setApplied((a) => [...a, id]);
    toast.success("ส่งใบสมัครแล้ว (mock)", { description: title });
    setActive(null);
  }

  return (
    <AppShell title="Opportunity Engine" subtitle="ฟีดเดียว — เรียงตามความตรงกับโปรไฟล์ของคุณ">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหางาน / โอกาส..."
          className="min-w-[220px] flex-1 rounded-md border-2 border-ink bg-card px-3 py-2 text-sm shadow-brutal-sm focus:outline-none focus:ring-4 focus:ring-yellow"
        />
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold ${
                type === t ? "bg-yellow" : "bg-card"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((o) => (
          <Card key={o.id}>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="yellow">{o.type}</Pill>
                    {o.sponsored && <Pill tone="ink">ผู้สนับสนุน</Pill>}
                    {applied.includes(o.id) && <Pill tone="ink">สมัครแล้ว</Pill>}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-tight">{o.title}</h3>
                </div>
                <div className="shrink-0 rounded-lg border-2 border-ink bg-yellow px-3 py-2 text-center shadow-brutal-sm">
                  <div className="font-display text-2xl font-bold leading-none">{o.match}<span className="text-sm">%</span></div>
                  <div className="text-[10px] font-mono">match</div>
                </div>
              </div>
              <p className="mt-4 rounded-lg border-2 border-dashed border-ink/30 bg-cream p-3 text-sm">
                <span className="font-semibold">ทำไมแนะนำ:</span> {o.reason}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setActive(o)}
                  className="rounded-md border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-cream shadow-brutal-sm transition-transform hover:-translate-y-0.5"
                >
                  ดูรายละเอียด
                </button>
                <button
                  onClick={() => toggleSave(o.id)}
                  className={`rounded-md border-2 border-ink px-4 py-2 text-sm font-medium ${
                    saved.includes(o.id) ? "bg-yellow" : "bg-card"
                  }`}
                >
                  {saved.includes(o.id) ? "★ บันทึกแล้ว" : "☆ บันทึก"}
                </button>
              </div>
            </div>
          </Card>
        ))}
        {list.length === 0 && (
          <Card>
            <div className="p-10 text-center text-sm text-muted-foreground">
              ไม่พบโอกาสที่ตรงกับเงื่อนไข ลองเปลี่ยนคำค้นหรือหมวดดู
            </div>
          </Card>
        )}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="border-2 border-ink bg-cream sm:max-w-xl">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Pill tone="yellow">{active.type}</Pill>
                  <Pill tone="ink">match {active.match}%</Pill>
                </div>
                <DialogTitle className="font-display text-2xl">{active.title}</DialogTitle>
                <DialogDescription>{active.reason}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="rounded-lg border-2 border-ink/20 bg-card p-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">สิ่งที่คุณมีแล้ว</div>
                  <div className="mt-1">Python · SQL · Git · Linux พื้นฐาน</div>
                </div>
                <div className="rounded-lg border-2 border-ink/20 bg-card p-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">สิ่งที่ยังต้องเก็บ</div>
                  <div className="mt-1">Docker · Airflow · AWS basics</div>
                </div>
                <div className="rounded-lg border-2 border-dashed border-ink/30 bg-yellow/30 p-3">
                  <div className="text-xs font-semibold">AI แนะนำ</div>
                  <div className="mt-0.5">ใช้โปรเจกต์ ETL ปัจจุบันแนบในใบสมัคร — ตรงกับสิ่งที่ทีมนี้ทำอยู่</div>
                </div>
              </div>
              <DialogFooter>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-medium"
                >
                  ปิด
                </button>
                <button
                  onClick={() => apply(active.id, active.title)}
                  disabled={applied.includes(active.id)}
                  className="rounded-md border-2 border-ink bg-yellow px-4 py-2 text-sm font-semibold shadow-brutal-sm disabled:opacity-60"
                >
                  {applied.includes(active.id) ? "สมัครแล้ว" : "สมัครเลย"}
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}