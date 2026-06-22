import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

type AddGoalDialogProps = {
  trigger: React.ReactNode;
  onCreate?: (g: { title: string; horizon: string; why: string }) => void;
};

export function AddGoalDialog({ trigger, onCreate }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [horizon, setHorizon] = useState("6 เดือน");
  const [why, setWhy] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("กรอกชื่อเป้าหมายก่อนนะ");
      return;
    }
    onCreate?.({ title: title.trim(), horizon, why: why.trim() });
    toast.success("เพิ่มเป้าหมายแล้ว", { description: title });
    setTitle("");
    setWhy("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-2 border-ink bg-cream sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">เพิ่มเป้าหมายใหม่</DialogTitle>
          <DialogDescription>เก็บไว้ไม่เกิน 3 อันพร้อมกัน — เพื่อให้ลงมือทำได้จริง</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-mono uppercase tracking-widest">ชื่อเป้าหมาย</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น เป็น Data Engineer ภายใน 8 เดือน"
              className="mt-1 w-full rounded-md border-2 border-ink bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-widest">ระยะเวลา</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {["1 เดือน", "3 เดือน", "6 เดือน", "1 ปี"].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorizon(h)}
                  className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold ${
                    horizon === h ? "bg-yellow" : "bg-card hover:bg-yellow/30"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-widest">ทำไมถึงสำคัญ</label>
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows={3}
              placeholder="เขียนสั้นๆ — AI จะใช้ตอนเตือนคุณว่าอย่ายอมแพ้"
              className="mt-1 w-full rounded-md border-2 border-ink bg-card px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
            />
          </div>
          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-medium"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="rounded-md border-2 border-ink bg-ink px-5 py-2 text-sm font-semibold text-cream shadow-brutal-sm"
            >
              บันทึกเป้าหมาย
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const searchIndex = [
  { label: "Goals Center", to: "/app/goals", hint: "เป้าหมายหลัก 3 อัน" },
  { label: "AI Mentor", to: "/app/mentor", hint: "ถาม AI ที่รู้บริบทคุณ" },
  { label: "Calendar OS", to: "/app/calendar", hint: "ตารางสัปดาห์ + เวลา on-goal" },
  { label: "Growth Graph", to: "/app/growth", hint: "การเติบโต 12 สัปดาห์" },
  { label: "Career Lab", to: "/app/career", hint: "Gap analysis เทียบตลาด" },
  { label: "Opportunity Engine", to: "/app/opportunities", hint: "งาน · Hackathon · ทุน" },
  { label: "Experience Vault", to: "/app/experience", hint: "Growth Resume" },
  { label: "Research Center", to: "/app/research", hint: "ถามอะไรก็ได้" },
  { label: "Identity Hub", to: "/app/identity", hint: "บุคลิก ทักษะ คุณค่า" },
];

export function SearchDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = searchIndex.filter(
    (r) => !q.trim() || (r.label + " " + r.hint).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-2 border-ink bg-cream p-0 sm:max-w-xl">
        <div className="border-b-2 border-ink p-3">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหาโมดูล หรือสิ่งที่อยากทำ…"
            className="w-full rounded-md bg-transparent px-2 py-2 text-base focus:outline-none"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">ไม่พบ "{q}"</li>}
          {results.map((r) => (
            <li key={r.to}>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate({ to: r.to });
                }}
                className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm hover:bg-yellow/40"
              >
                <span className="font-semibold">{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t-2 border-ink px-4 py-2 text-xs text-muted-foreground">
          <span>↵ เปิด</span>
          <span>⌘K สลับเปิด/ปิด</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SubgoalsDialog({
  trigger,
  title,
  subgoals,
}: {
  trigger: React.ReactNode;
  title: string;
  subgoals: { id: number; title: string; done: boolean }[];
}) {
  const [items, setItems] = useState(subgoals);
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-2 border-ink bg-cream sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
          <DialogDescription>กดที่ช่องเพื่อทำเครื่องหมายเสร็จ</DialogDescription>
        </DialogHeader>
        <ul className="space-y-2">
          {items.map((s) => (
            <li key={s.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-ink bg-card px-3 py-2.5 hover:bg-yellow/20">
                <input
                  type="checkbox"
                  checked={s.done}
                  onChange={() => {
                    setItems((cur) => cur.map((i) => (i.id === s.id ? { ...i, done: !i.done } : i)));
                    toast.success(s.done ? "เปิดงานกลับมาแล้ว" : "เก่งมาก! บันทึกแล้ว");
                  }}
                  className="h-4 w-4 accent-ink"
                />
                <span className={`text-sm font-medium ${s.done ? "line-through opacity-60" : ""}`}>{s.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export function ConfirmButton({
  label,
  toastMsg,
  className = "",
  variant = "ghost",
}: {
  label: string;
  toastMsg: string;
  className?: string;
  variant?: "ghost" | "primary";
}) {
  const base =
    variant === "primary"
      ? "border-2 border-ink bg-yellow shadow-brutal-sm"
      : "border-2 border-ink bg-card";
  return (
    <button
      type="button"
      onClick={() => toast(toastMsg)}
      className={`rounded-md ${base} px-4 py-2 text-sm font-medium hover:-translate-y-0.5 transition-transform ${className}`}
    >
      {label}
    </button>
  );
}

// Re-export Link so callers can use as DialogTrigger fallback
export { Link };