import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppShell, Card, Pill } from "@/components/AppShell";
import { insights, todayTasks, user as seedUser, workLogs } from "@/lib/mock";
import { getSheetUrl, setSheetUrl, useUser } from "@/lib/api";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "แดชบอร์ด · WorkLog" }] }),
  component: Home,
});

type WorkLog = (typeof workLogs)[number];

const profileStorageKey = "worklog-profile";
const logsStorageKey = "worklog-logs";
const tasksStorageKey = "worklog-tasks";

function Home() {
  const profile = useUser();
  const [tasks, setTasks] = useState(() => {
    const saved = window.localStorage.getItem(tasksStorageKey);
    if (saved && saved !== "undefined") {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return todayTasks;
  });
  const [logs, setLogs] = useState<WorkLog[]>(() => {
    const saved = window.localStorage.getItem(logsStorageKey);
    if (saved && saved !== "undefined") {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return workLogs;
  });
  const [editingLogId, setEditingLogId] = useState<number | null>(null);
  const [form, setForm] = useState({
    task: "",
    project: "WorkLog MVP",
    date: new Date().toISOString().split('T')[0],
    startTime: "09:00",
    endTime: "10:00",
    note: "",
  });
  const [sheetUrlInput, setSheetUrlInput] = useState(getSheetUrl());



  useEffect(() => {
    window.localStorage.setItem(logsStorageKey, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    window.localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleAddGoal = (e: any) => {
      const g = e.detail;
      if (g.horizon === "วันนี้") {
        setTasks((cur) => [
          { id: Date.now(), title: g.title, time: "ยังไม่ระบุเวลา", goal: "งานใหม่", done: false },
          ...cur,
        ]);
      }
    };
    window.addEventListener("add-goal", handleAddGoal);
    return () => window.removeEventListener("add-goal", handleAddGoal);
  }, []);

  const doneCount = tasks.filter((task) => task.done).length;

  function toggleTask(id: number) {
    setTasks((cur) =>
      cur.map((task) => {
        if (task.id !== id) return task;
        const done = !task.done;
        toast(done ? "บันทึกว่างานเสร็จแล้ว" : "เปิดงานกลับมาแล้ว");
        return { ...task, done };
      }),
    );
  }

  function addOrUpdateLog(e: React.FormEvent) {
    e.preventDefault();
    if (!form.task.trim()) {
      toast.error("กรอกสิ่งที่ทำก่อนนะ");
      return;
    }

    const logDateObj = new Date(form.date);
    const thaiDate = new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }).format(logDateObj);

    if (editingLogId) {
      setLogs((cur) =>
        cur.map((log) =>
          log.id === editingLogId
            ? { ...log, project: form.project, task: form.task.trim(), duration: `${form.startTime} - ${form.endTime}`, note: form.note.trim(), date: thaiDate, rawDate: form.date }
            : log,
        ),
      );
      setEditingLogId(null);
      toast.success("แก้ไข work log แล้ว");
    } else {
      setLogs((cur) => [
        {
          id: Date.now(),
          date: thaiDate,
          rawDate: form.date,
          project: form.project,
          task: form.task.trim(),
          duration: `${form.startTime} - ${form.endTime}`,
          status: "เสร็จแล้ว",
          mood: "บันทึกใหม่",
          note: form.note.trim() || "ยังไม่ได้เพิ่มรายละเอียด",
        },
        ...cur,
      ]);
      toast.success("เพิ่ม work log แล้ว");
    }

    setForm((cur) => ({ ...cur, task: "", note: "" }));
  }

  function editLog(log: WorkLog) {
    setEditingLogId(log.id);
    const timeParts = log.duration ? log.duration.split(" - ") : [];
    setForm({
      task: log.task,
      project: log.project,
      date: log.rawDate || new Date().toISOString().split('T')[0],
      startTime: timeParts[0] || "09:00",
      endTime: timeParts[1] || "10:00",
      note: log.note,
    });
  }

  function deleteLog(id: number) {
    setLogs((cur) => cur.filter((log) => log.id !== id));
    if (editingLogId === id) setEditingLogId(null);
    toast("ลบ work log แล้ว");
  }

  return (
    <AppShell title={`สวัสดี ${profile.name}`} subtitle="จดสิ่งที่ทำวันนี้ วางแผนงานถัดไป และแก้ไขข้อมูลเองได้จากหน้านี้">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card tone="yellow" className="lg:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>เป้าหมายหลักสัปดาห์นี้</span>
              <Link to="/app/goals" className="underline underline-offset-2">
                ดูงานทั้งหมด
              </Link>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">{profile.goal}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Metric label="ความคืบหน้า" value={`${profile.goalProgress}%`} />
              <Metric label="งานวันนี้" value={`${doneCount}/${tasks.length}`} />
              <Metric label="จดต่อเนื่อง" value={`${profile.streak} วัน`} />
            </div>
            <div className="mt-5 h-2.5 rounded-full border-2 border-ink bg-cream">
              <div className="h-full rounded-full bg-ink" style={{ width: `${profile.goalProgress}%` }} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold">ข้อมูลของฉัน</h3>
            <div className="mt-4 space-y-3">
              <input
                value={profile.name}
                onChange={(e) => setProfile((cur) => ({ ...cur, name: e.target.value }))}
                className="w-full rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                aria-label="ชื่อ"
              />
              <input
                value={profile.role}
                onChange={(e) => setProfile((cur) => ({ ...cur, role: e.target.value }))}
                className="w-full rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                aria-label="ตำแหน่ง"
              />
              <textarea
                value={profile.goal}
                onChange={(e) => setProfile((cur) => ({ ...cur, goal: e.target.value }))}
                rows={3}
                className="w-full rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                aria-label="เป้าหมาย"
              />
            </div>
            <div className="mt-5 pt-4 border-t-2 border-ink/10">
              <h4 className="text-sm font-bold mb-2">เชื่อมต่อ Google Sheets</h4>
              <div className="flex gap-2">
                <input
                  value={sheetUrlInput}
                  onChange={(e) => setSheetUrlInput(e.target.value)}
                  placeholder="วางลิงก์ Google Apps Script ที่นี่"
                  className="flex-1 rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                />
                <button
                  onClick={() => {
                    setSheetUrl(sheetUrlInput);
                    toast.success("บันทึกการเชื่อมต่อแล้ว (กำลังรีโหลด...)");
                    setTimeout(() => window.location.reload(), 1000);
                  }}
                  className="rounded-md border-2 border-ink bg-ink px-3 py-2 text-sm font-semibold text-cream shadow-brutal-sm"
                >
                  บันทึก
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">ข้อมูลนี้จะจำไว้ใน browser เครื่องนี้</p>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-bold">งานวันนี้</h3>
              <span className="text-xs text-muted-foreground">30 มิ.ย. 2026</span>
            </div>
            <div className="mt-5 divide-y-2 divide-dashed divide-ink/15">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4 py-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-ink ${
                      task.done ? "bg-ink text-cream" : "bg-cream"
                    }`}
                    aria-label="toggle task"
                  >
                    {task.done && "✓"}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium ${task.done ? "line-through opacity-50" : ""}`}>{task.title}</div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Pill>{task.goal}</Pill>
                      <Pill>{task.time}</Pill>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.success(`เริ่มจับเวลา: ${task.title}`)}
                    className="rounded-md border-2 border-ink bg-yellow px-3 py-1.5 text-xs font-semibold shadow-brutal-sm"
                  >
                    เริ่ม
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <form onSubmit={addOrUpdateLog} className="p-6">
            <h3 className="font-display text-xl font-bold">{editingLogId ? "แก้ไข Work Log" : "จด Work Log"}</h3>
            <div className="mt-4 space-y-3">
              <input
                value={form.task}
                onChange={(e) => setForm((cur) => ({ ...cur, task: e.target.value }))}
                placeholder="วันนี้ทำอะไรไป?"
                className="w-full rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((cur) => ({ ...cur, date: e.target.value }))}
                  className="rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                  title="วันที่บันทึก"
                />
                <input
                  value={form.project}
                  onChange={(e) => setForm((cur) => ({ ...cur, project: e.target.value }))}
                  className="rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                  placeholder="ชื่อโปรเจกต์"
                />
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm((cur) => ({ ...cur, startTime: e.target.value }))}
                  className="rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                  title="เวลาเริ่มต้น"
                />
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm((cur) => ({ ...cur, endTime: e.target.value }))}
                  className="rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
                  title="เวลาสิ้นสุด"
                />
              </div>
              <textarea
                value={form.note}
                onChange={(e) => setForm((cur) => ({ ...cur, note: e.target.value }))}
                rows={4}
                placeholder="ปัญหา / สิ่งที่เรียนรู้ / next step"
                className="w-full rounded-md border-2 border-ink bg-cream px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow"
              />
            </div>
            <button className="mt-4 w-full rounded-md border-2 border-ink bg-ink py-2.5 text-sm font-semibold text-cream shadow-brutal-sm">
              {editingLogId ? "บันทึกการแก้ไข" : "บันทึก Log"}
            </button>
          </form>
        </Card>

        <Card className="lg:col-span-3">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">บันทึกล่าสุด</h3>
              <Link to="/app/growth" className="text-sm font-medium underline underline-offset-2">
                ดูสรุปผลงาน
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {logs.slice(0, 6).map((log) => (
                <div key={log.id} className="rounded-lg border-2 border-ink bg-cream p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground">{log.date}</div>
                      <div className="mt-1 font-display text-base font-bold leading-tight">{log.task}</div>
                    </div>
                    <Pill tone={log.status === "เสร็จแล้ว" ? "yellow" : "light"}>{log.status}</Pill>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>{log.project}</Pill>
                    <Pill>{log.duration}</Pill>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{log.note}</p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => editLog(log)} className="rounded-md border-2 border-ink bg-card px-3 py-1.5 text-xs font-semibold">
                      แก้ไข
                    </button>
                    <button onClick={() => deleteLog(log.id)} className="rounded-md border-2 border-ink bg-card px-3 py-1.5 text-xs font-semibold">
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card tone="ink" className="lg:col-span-3">
          <div className="p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-yellow">Insight</div>
            {insights.length > 0 ? (
              <>
                <p className="mt-3 font-display text-lg font-semibold leading-snug">{insights[0].text}</p>
                <div className="mt-4 text-xs text-cream/60">{insights[0].time}</div>
              </>
            ) : (
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-cream/60">ยังไม่มีข้อมูล Insight (เพิ่มข้อมูลเพื่อรับการวิเคราะห์)</p>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border-2 border-ink bg-cream px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}
