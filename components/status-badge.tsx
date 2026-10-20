import { Badge } from "@/components/ui/badge"
import {
  agentStatusLabel,
  statusLabel,
  type AgentStatus,
  type TaskStatus,
} from "@/lib/data"
import { cn } from "@/lib/utils"

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "capitalize",
        status === "in_progress" && "bg-violet-100 text-violet-700",
        status === "review" && "bg-amber-100 text-amber-800",
        status === "queued" && "bg-slate-100 text-slate-600",
        status === "done" && "bg-emerald-100 text-emerald-800",
      )}
    >
      {statusLabel[status]}
    </Badge>
  )
}

export function AgentStatusBadge({ status }: { status: AgentStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        status === "working" && "bg-violet-100 text-violet-700",
        status === "available" && "bg-emerald-100 text-emerald-800",
        status === "paused" && "bg-slate-100 text-slate-600",
      )}
    >
      <span
        className={cn(
          "mr-1 inline-block size-1.5 rounded-full",
          status === "working" && "bg-violet-500",
          status === "available" && "bg-emerald-500",
          status === "paused" && "bg-slate-400",
        )}
      />
      {agentStatusLabel[status]}
    </Badge>
  )
}
