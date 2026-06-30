import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { AddGoalDialog, SubgoalsDialog } from "@/components/dialogs";
import { goals as seedGoals } from "@/lib/mock";

export const Route = createFileRoute("/app/goals")({
  head: () => ({ meta: [{ title: "งานและเป้าหมาย · WorkLog" }] }),
  component: Goals,
});

const goalsStorageKey = "worklog-goals";

function Goals() {
  const [list, setList] = useState(() => {
    const saved = window.localStorage.getItem(goalsStorageKey);
    return saved ? JSON.parse(saved) : seedGoals.map((goal) => ({ ...goal, paused: false }));
  });
  const active = list.filter((goal) => !goal.paused);

  function addGoal(goal: { title: string; horizon: string; why: string }) {
    setList((cur) => [
      ...cur,
      { id: Date.now(), title: goal.title, progress: 0, sub: 3, done: 0, color: "ink", paused: false },
    ]);
  }

  useEffect(() => {
    window.localStorage.setItem(goalsStorageKey, JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const handler = (e: any) => addGoal(e.detail);
    window.addEventListener("add-goal", handler);
    return () => window.removeEventListener("add-goal", handler);
  }, []);

  function togglePause(id: number) {
    setList((cur) => cur.map((goal) => (goal.id === id ? { ...goal, paused: !goal.paused } : goal)));
    toast("อัปเดตสถานะงานแล้ว");
  }

  function subgoalsOf(title: string) {
    return [
      { id: 1, title: `กำหนดผลลัพธ์ที่ต้องส่งของ "${title}"`, done: true },
      { id: 2, title: "แตกงานเป็น task ย่อยไม่เกิน 45 นาที", done: true },
      { id: 3, title: "ล็อกเวลาทำในตารางงาน", done: false },
      { id: 4, title: "จด blocker หลังทำเสร็จ", done: false },
    ];
  }

  return (
    <AppShell title="งานและเป้าหมาย" subtitle="รวม backlog งานที่ต้องทำ ความคืบหน้า และ task ย่อยที่ใช้จด work log">
      <div className="grid gap-5">
        {list.map((goal, index) => (
          <Card key={goal.id} tone={index === 0 && !goal.paused ? "yellow" : "light"} className={goal.paused ? "opacity-60" : ""}>
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono uppercase tracking-widest opacity-70">งานชุดที่ {index + 1}</div>
                  <h3 className="mt-1 font-display text-2xl font-bold">{goal.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>{goal.done}/{goal.sub} task เสร็จ</Pill>
                    <Pill>{goal.paused ? "พักไว้ก่อน" : "กำลังทำ"}</Pill>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-4xl font-bold">{goal.progress}%</div>
                  <div className="text-xs text-muted-foreground">progress</div>
                </div>
              </div>
              <div className="mt-5 h-2.5 rounded-full border-2 border-ink bg-cream">
                <div className="h-full rounded-full bg-ink" style={{ width: `${goal.progress}%` }} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <SubgoalsDialog
                  title={goal.title}
                  subgoals={subgoalsOf(goal.title)}
                  trigger={
                    <button className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-semibold shadow-brutal-sm">
                      ดู task ย่อย
                    </button>
                  }
                />
                <button onClick={() => togglePause(goal.id)} className="rounded-md border-2 border-ink bg-card px-4 py-2 text-sm font-medium">
                  {goal.paused ? "กลับมาทำ" : "พักไว้ก่อน"}
                </button>
              </div>
            </div>
          </Card>
        ))}
        <Card>
          <div className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-display text-lg font-bold">ตอนนี้มี {active.length} งานหลักที่กำลังเดิน</div>
              <p className="text-sm text-muted-foreground">เพิ่มงานใหม่ได้ทันที แล้วค่อยแตกเป็น task ย่อยก่อนลงตาราง</p>
            </div>
            <AddGoalDialog
              onCreate={addGoal}
              trigger={
                <button className="rounded-md border-2 border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-brutal-sm">
                  + เพิ่มงานใหม่
                </button>
              }
            />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
