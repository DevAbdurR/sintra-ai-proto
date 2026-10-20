"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TaskStatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { allTasks, statusLabel, type TaskStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters: Array<{ id: "all" | TaskStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "in_progress", label: statusLabel.in_progress },
  { id: "review", label: statusLabel.review },
  { id: "queued", label: statusLabel.queued },
  { id: "done", label: statusLabel.done },
];

export default function TasksPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const tasks = useMemo(() => {
    const list = allTasks();
    if (filter === "all") return list;
    return list.filter((task) => task.status === filter);
  }, [filter]);

  return (
    <div className="mx-auto w-full max-w-4xl pt-4">
      <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Work currently on your employees’ desks.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm",
              filter === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-white text-muted-foreground ring-1 ring-violet-100",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <p className="rounded-2xl bg-white px-4 py-10 text-center text-sm text-muted-foreground">
            Nothing in this column.
          </p>
        ) : (
          tasks.map((task) => (
            <Link key={task.id} href={`/employees/${task.agentSlug}`}>
              <Card className="gap-0 rounded-2xl py-0 shadow-sm hover:shadow-md">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {task.output}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {task.agentName} · Due {task.due}
                    </p>
                  </div>
                  <TaskStatusBadge status={task.status} />
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
