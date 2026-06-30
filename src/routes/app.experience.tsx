import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { experiences as mockExperiences } from "@/lib/mock";

export const Route = createFileRoute("/app/experience")({
  head: () => ({ meta: [{ title: "Experience Vault · LifeOS" }] }),
  component: Vault,
});

const expStorageKey = "worklog-experiences";
const defaultExperiences = [
  { id: 1, type: "Project", title: "สร้าง LifeOS MVP ด้วย React", period: "มิ.ย. 2026 - ปัจจุบัน", verified: false },
];

function Vault() {
  const [expList, setExpList] = useState(() => {
    const saved = window.localStorage.getItem(expStorageKey);
    if (saved) return JSON.parse(saved);
    if (mockExperiences && mockExperiences.length > 0) return mockExperiences;
    return defaultExperiences;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newExp, setNewExp] = useState({ type: "Project", title: "", period: "", verified: false });

  useEffect(() => {
    window.localStorage.setItem(expStorageKey, JSON.stringify(expList));
  }, [expList]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newExp.title) {
      toast.error("กรุณากรอกชื่อประสบการณ์");
      return;
    }
    setExpList((cur: any[]) => [...cur, { ...newExp, id: Date.now() }]);
    setNewExp({ type: "Project", title: "", period: "", verified: false });
    setIsAdding(false);
    toast.success("เพิ่มประสบการณ์เรียบร้อย");
  }

  function toggleVerified(id: number) {
    setExpList((cur: any[]) => cur.map((e) => e.id === id ? { ...e, verified: !e.verified } : e));
    toast.success("อัปเดตสถานะแล้ว");
  }

  function deleteExp(id: number) {
    setExpList((cur: any[]) => cur.filter((e) => e.id !== id));
    toast.success("ลบประสบการณ์แล้ว");
  }

  return (
    <AppShell title="Experience Vault" subtitle="ทุกอย่างที่คุณเคยทำ — ระบบสร้าง Growth Resume ให้เอง">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-ink p-5 text-cream shadow-brutal-sm">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-yellow">Growth Resume</div>
          <p className="mt-1 font-display text-lg font-semibold">อัปเดตล่าสุด {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })} — พร้อมส่งสมัครงาน</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toast.success("คัดลอกลิงก์แล้ว")} className="rounded-md border-2 border-cream bg-ink px-4 py-2 text-sm font-semibold">แชร์เป็นลิงก์</button>
          <button onClick={() => toast.success("ดาวน์โหลด PDF จำลอง")} className="rounded-md border-2 border-cream bg-yellow px-4 py-2 text-sm font-semibold text-ink">ดาวน์โหลด PDF</button>
        </div>
      </div>

      <div className="grid gap-3">
        {expList.map((e: any) => (
          <Card key={e.id}>
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Pill tone="yellow">{e.type}</Pill>
                  <button onClick={() => toggleVerified(e.id)}>
                    {e.verified ? <Pill tone="ink">✓ ยืนยันแล้ว</Pill> : <Pill>รอยืนยัน</Pill>}
                  </button>
                </div>
                <div className="mt-2 font-display text-lg font-bold">{e.title}</div>
                <div className="text-sm text-muted-foreground">{e.period}</div>
              </div>
              <button onClick={() => deleteExp(e.id)} className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-medium text-red-600">ลบ</button>
            </div>
          </Card>
        ))}

        {isAdding ? (
          <Card className="p-5">
            <form onSubmit={handleAdd} className="space-y-3">
              <h3 className="font-display font-bold text-lg">เพิ่มประสบการณ์ใหม่</h3>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="ประเภท (เช่น Project, Work, Study)" value={newExp.type} onChange={e => setNewExp({...newExp, type: e.target.value})} className="rounded-md border-2 border-ink bg-cream p-2 text-sm" />
                <input placeholder="ระยะเวลา (เช่น 2024 - ปัจจุบัน)" value={newExp.period} onChange={e => setNewExp({...newExp, period: e.target.value})} className="rounded-md border-2 border-ink bg-cream p-2 text-sm" />
                <input placeholder="ชื่อผลงาน / ประสบการณ์" value={newExp.title} onChange={e => setNewExp({...newExp, title: e.target.value})} className="col-span-2 rounded-md border-2 border-ink bg-cream p-2 text-sm" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 rounded-md border-2 border-ink bg-yellow py-2 text-sm font-semibold">บันทึก</button>
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 rounded-md border-2 border-ink bg-card py-2 text-sm font-semibold">ยกเลิก</button>
              </div>
            </form>
          </Card>
        ) : (
          <button onClick={() => setIsAdding(true)} className="rounded-2xl border-2 border-dashed border-ink py-6 text-sm font-semibold text-muted-foreground hover:bg-card">+ เพิ่มประสบการณ์ใหม่</button>
        )}
      </div>
    </AppShell>
  );
}