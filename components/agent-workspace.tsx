"use client"

import { useMemo, useState, type ReactNode } from "react"
import { AgentPortrait } from "@/components/agent-portrait"
import { AgentStatusBadge, TaskStatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Agent, AgentTask } from "@/lib/data"

export function AgentWorkspace({ agent }: { agent: Agent }) {
  const [tasks, setTasks] = useState<AgentTask[]>(agent.tasks)
  const [title, setTitle] = useState("")
  const [note, setNote] = useState<string | null>(null)

  const openCount = useMemo(
    () => tasks.filter((task) => task.status !== "done").length,
    [tasks],
  )

  function assign() {
    const next = title.trim()
    if (!next) return
    setTasks((current) => [
      {
        id: `local-${Date.now()}`,
        title: next,
        status: "queued",
        due: "Today",
        output: "Waiting in queue.",
      },
      ...current,
    ])
    setTitle("")
    setNote(`Assigned to ${agent.name}.`)
  }

  return (
    <div className="mx-auto w-full max-w-4xl pt-4">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <AgentPortrait
          seed={agent.seed}
          bg={agent.bg}
          name={agent.name}
          size={92}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{agent.name}</h1>
            <AgentStatusBadge status={agent.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {agent.role} · {agent.department}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
            {agent.bio}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="Open tasks" value={String(openCount)} />
        <Stat label="Done this month" value={String(agent.completed)} />
        <Stat
          label="Credits used"
          value={`${agent.creditsUsed}`}
          extra={
            <Progress
              value={Math.min(100, agent.creditsUsed)}
              className="mt-3 h-1.5"
            />
          }
        />
      </div>

      <form
        className="mt-6 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          assign()
        }}
      >
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={`Ask ${agent.name} to take something on…`}
          className="h-11 rounded-full bg-white"
        />
        <Button type="submit" className="h-11 rounded-full px-6">
          Assign task
        </Button>
      </form>
      {note ? <p className="mt-2 text-sm text-primary">{note}</p> : null}

      <Tabs defaultValue="activity" className="mt-8">
        <TabsList className="rounded-full bg-white">
          <TabsTrigger value="activity" className="rounded-full">
            Activity
          </TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-full">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="about" className="rounded-full">
            About
          </TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="mt-4 space-y-3">
          {agent.activity.map((item) => (
            <Card key={item.id} className="gap-0 rounded-2xl py-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{item.time}</p>
                <p className="mt-1 font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="tasks" className="mt-4 space-y-3">
          {tasks.map((task) => (
            <Card key={task.id} className="gap-0 rounded-2xl py-0 shadow-sm">
              <CardContent className="flex items-start justify-between gap-4 p-4">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{task.output}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Due {task.due}</p>
                </div>
                <TaskStatusBadge status={task.status} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="about" className="mt-4">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Skills
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {agent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-violet-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {agent.name} works inside {agent.department.toLowerCase()} and
                reports progress here. Nothing is sent outside this prototype.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Stat({
  label,
  value,
  extra,
}: {
  label: string
  value: string
  extra?: ReactNode
}) {
  return (
    <Card className="gap-0 rounded-2xl py-0 shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
        {extra}
      </CardContent>
    </Card>
  )
}
