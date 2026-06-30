import { Link, useRouterState } from "@tanstack/react-router";
import { goals as seedGoals, todayTasks } from "@/lib/mock";
import type { ReactNode } from "react";
import { ClipboardList, LayoutDashboard, Search, Target, CalendarDays, BarChart3 } from "lucide-react";
import { Mascot } from "./Mascot";
import { user as mockUser } from "@/lib/mock";
import { fetchUser, useUser } from "@/lib/api";
import { useState, useEffect } from "react";
import { LogoMark } from "./Logo";
import { AddGoalDialog, SearchDialog } from "./dialogs";

const nav = [
  { to: "/app", label: "แดชบอร์ด", icon: LayoutDashboard },
  { to: "/app/goals", label: "งานและเป้าหมาย", icon: Target },
  { to: "/app/calendar", label: "ตารางงาน", icon: CalendarDays },
  { to: "/app/growth", label: "สรุปผลงาน", icon: BarChart3 },
];

export function AppShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useUser();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r-2 border-ink bg-sidebar text-sidebar-foreground md:flex">
          <Link to="/" className="flex items-center gap-2.5 border-b-2 border-sidebar-border px-6 py-5">
            <LogoMark size={36} />
            <span className="font-display text-xl font-bold tracking-tight">
              Work<span className="text-yellow">Log</span>
            </span>
          </Link>

          <div className="border-b-2 border-sidebar-border px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-sidebar-accent p-1">
                <Mascot size={48} />
              </div>
              <div>
                <div className="text-sm font-semibold">{user.mascotName}</div>
                <div className="text-xs text-sidebar-foreground/60">จดต่อเนื่อง {user.streak} วัน</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {nav.map((item) => {
              const active = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
                      ? "bg-yellow text-ink"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t-2 border-sidebar-border px-6 py-4">
            <div className="text-xs text-sidebar-foreground/60">ผู้ใช้งาน</div>
            <div className="mt-0.5 text-sm font-semibold">{user.name}</div>
            <div className="text-xs text-sidebar-foreground/60">{user.role}</div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink bg-cream/95 px-6 py-5 backdrop-blur md:px-10 md:py-7">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">
              <SearchDialog
                trigger={
                  <button className="inline-flex items-center gap-2 rounded-md border-2 border-ink bg-card px-3 py-2 text-sm font-medium shadow-brutal-sm transition-transform hover:-translate-y-0.5">
                    <Search className="h-4 w-4" />
                    ค้นหา
                  </button>
                }
              />
              <AddGoalDialog
                onCreate={(goal) => {
                  // Save to goals
                  const goalsKey = "worklog-goals";
                  const savedGoals = window.localStorage.getItem(goalsKey);
                  const currentGoals = savedGoals ? JSON.parse(savedGoals) : seedGoals.map(g => ({...g, paused: false}));
                  currentGoals.push({ id: Date.now(), title: goal.title, progress: 0, sub: 3, done: 0, color: "ink", paused: false });
                  window.localStorage.setItem(goalsKey, JSON.stringify(currentGoals));

                  // Save to tasks if today
                  if (goal.horizon === "วันนี้") {
                    const tasksKey = "worklog-tasks";
                    const savedTasks = window.localStorage.getItem(tasksKey);
                    const currentTasks = savedTasks ? JSON.parse(savedTasks) : todayTasks;
                    currentTasks.unshift({ id: Date.now(), title: goal.title, time: "ยังไม่ระบุเวลา", goal: "งานใหม่", done: false });
                    window.localStorage.setItem(tasksKey, JSON.stringify(currentTasks));
                  }

                  // Dispatch event for currently mounted components to update their React state
                  window.dispatchEvent(new CustomEvent("add-goal", { detail: goal }));
                }}
                trigger={
                  <button className="inline-flex items-center gap-2 rounded-md border-2 border-ink bg-yellow px-3 py-2 text-sm font-semibold shadow-brutal-sm transition-transform hover:-translate-y-0.5">
                    <ClipboardList className="h-4 w-4" />
                    เพิ่มงาน
                  </button>
                }
              />
            </div>
          </header>
          <div className="px-6 py-8 md:px-10 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function Card({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "yellow" | "ink";
}) {
  const tones = {
    light: "bg-card text-ink",
    yellow: "bg-yellow text-ink",
    ink: "bg-ink text-cream",
  };
  return <div className={`rounded-lg border-2 border-ink ${tones[tone]} shadow-brutal-sm ${className}`}>{children}</div>;
}

export function Pill({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "yellow" | "ink" }) {
  const tones = {
    light: "bg-cream text-ink border-ink",
    yellow: "bg-yellow text-ink border-ink",
    ink: "bg-ink text-cream border-ink",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
