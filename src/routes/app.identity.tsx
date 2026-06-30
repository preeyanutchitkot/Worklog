import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AppShell, Card } from "@/components/AppShell";
import { identity as mockIdentity } from "@/lib/mock";

export const Route = createFileRoute("/app/identity")({
  head: () => ({ meta: [{ title: "Identity Hub · LifeOS" }] }),
  component: Identity,
});

const identityStorageKey = "worklog-identity";
const defaultIdentity = [
  { key: "core_skill", label: "ทักษะหลัก", value: "Full Stack Development", detail: "เชี่ยวชาญ React และ Node.js", source: "Work logs ล่าสุด" },
  { key: "interest", label: "ความสนใจ", value: "System Design", detail: "ชอบอ่านบทความเกี่ยวกับ Architecture", source: "พฤติกรรมการอ่าน" },
];

function Identity() {
  const [identityList, setIdentityList] = useState(() => {
    const saved = window.localStorage.getItem(identityStorageKey);
    if (saved) return JSON.parse(saved);
    if (mockIdentity && mockIdentity.length > 0) return mockIdentity;
    return defaultIdentity;
  });

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ value: "", detail: "", source: "" });
  const [newItemForm, setNewItemForm] = useState({ key: "", label: "", value: "", detail: "", source: "" });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(identityStorageKey, JSON.stringify(identityList));
  }, [identityList]);

  function handleEdit(item: any) {
    setEditingKey(item.key);
    setEditForm({ value: item.value, detail: item.detail, source: item.source });
  }

  function saveEdit(key: string) {
    setIdentityList((cur: any[]) =>
      cur.map((i) => (i.key === key ? { ...i, ...editForm } : i))
    );
    setEditingKey(null);
    toast.success("บันทึกข้อมูลเรียบร้อย");
  }

  function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItemForm.key || !newItemForm.label) {
      toast.error("กรุณากรอก Key และ Label");
      return;
    }
    setIdentityList((cur: any[]) => [...cur, newItemForm]);
    setIsAdding(false);
    setNewItemForm({ key: "", label: "", value: "", detail: "", source: "" });
    toast.success("เพิ่ม Identity เรียบร้อย");
  }

  return (
    <AppShell title="Identity Hub" subtitle="ระบบรู้จักคุณยังไง — โปร่งใส กดแก้ไขได้ทุกอย่าง">
      <div className="mb-6 rounded-2xl border-2 border-ink bg-yellow p-5 shadow-brutal-sm flex justify-between items-center">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest">ข้อมูลตัวตน</div>
          <p className="mt-1 font-display text-lg font-semibold">แก้ไขข้อมูลให้สะท้อนตัวตนของคุณที่สุด</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-md border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-cream"
        >
          {isAdding ? "ยกเลิก" : "+ เพิ่มข้อมูล"}
        </button>
      </div>

      {isAdding && (
        <Card className="mb-6 p-6">
          <form onSubmit={handleAddItem} className="space-y-3">
            <h3 className="font-display font-bold text-lg">เพิ่ม Identity ใหม่</h3>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Key (เช่น language)" value={newItemForm.key} onChange={e => setNewItemForm({...newItemForm, key: e.target.value})} className="rounded-md border-2 border-ink bg-cream p-2 text-sm" />
              <input placeholder="Label (เช่น ภาษาที่ถนัด)" value={newItemForm.label} onChange={e => setNewItemForm({...newItemForm, label: e.target.value})} className="rounded-md border-2 border-ink bg-cream p-2 text-sm" />
              <input placeholder="Value (เช่น TypeScript)" value={newItemForm.value} onChange={e => setNewItemForm({...newItemForm, value: e.target.value})} className="col-span-2 rounded-md border-2 border-ink bg-cream p-2 text-sm" />
              <input placeholder="Detail" value={newItemForm.detail} onChange={e => setNewItemForm({...newItemForm, detail: e.target.value})} className="col-span-2 rounded-md border-2 border-ink bg-cream p-2 text-sm" />
              <input placeholder="Source" value={newItemForm.source} onChange={e => setNewItemForm({...newItemForm, source: e.target.value})} className="col-span-2 rounded-md border-2 border-ink bg-cream p-2 text-sm" />
            </div>
            <button type="submit" className="w-full rounded-md border-2 border-ink bg-yellow py-2 text-sm font-semibold">บันทึก</button>
          </form>
        </Card>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {identityList.map((i: any) => (
          <Card key={i.key}>
            {editingKey === i.key ? (
              <div className="p-6 space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{i.key} - {i.label}</div>
                <input value={editForm.value} onChange={(e) => setEditForm({ ...editForm, value: e.target.value })} className="w-full rounded border-2 border-ink p-2 text-sm" />
                <textarea value={editForm.detail} onChange={(e) => setEditForm({ ...editForm, detail: e.target.value })} className="w-full rounded border-2 border-ink p-2 text-sm" rows={2} />
                <input value={editForm.source} onChange={(e) => setEditForm({ ...editForm, source: e.target.value })} className="w-full rounded border-2 border-ink p-2 text-sm" placeholder="Source" />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(i.key)} className="flex-1 rounded border-2 border-ink bg-yellow py-1 text-sm font-semibold">บันทึก</button>
                  <button onClick={() => setEditingKey(null)} className="flex-1 rounded border-2 border-ink bg-card py-1 text-sm font-semibold">ยกเลิก</button>
                </div>
              </div>
            ) : (
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{i.key}</div>
                    <div className="mt-1 font-display text-xl font-bold">{i.label}</div>
                    <div className="mt-2 text-base">{i.value}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={(e) => { e.preventDefault(); handleEdit(i); }} className="rounded border-2 border-ink bg-yellow px-2 py-1 text-xs font-semibold">แก้ไข</button>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-card text-lg font-bold transition-transform group-open:rotate-45 ml-auto">+</div>
                  </div>
                </summary>
                <div className="border-t-2 border-dashed border-ink/15 px-6 py-5">
                  <p className="text-sm">{i.detail}</p>
                  <div className="mt-4 rounded-lg border-2 border-ink bg-cream p-3 text-xs">
                    <span className="font-mono font-semibold">ทำไมระบบคิดแบบนี้:</span> {i.source}
                  </div>
                </div>
              </details>
            )}
          </Card>
        ))}
      </div>
    </AppShell>
  );
}