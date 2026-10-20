import Link from "next/link";
import { AgentPortrait } from "@/components/agent-portrait";
import { AgentStatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { agents } from "@/lib/data";

export default function EmployeesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl pt-4">
      <h1 className="text-2xl font-semibold tracking-tight">AI Employees</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your specialized team. Open anyone to see what they’re working on.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <Link key={agent.slug} href={`/employees/${agent.slug}`}>
            <Card className="h-full gap-0 rounded-2xl py-0 shadow-[0_8px_30px_rgba(90,100,160,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(90,100,160,0.12)]">
              <CardContent className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <AgentPortrait
                    seed={agent.seed}
                    bg={agent.bg}
                    name={agent.name}
                    size={64}
                  />
                  <AgentStatusBadge status={agent.status} />
                </div>
                <p className="mt-4 text-lg font-semibold">{agent.name}</p>
                <p className="text-sm text-muted-foreground">{agent.role}</p>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {agent.bio}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {agent.tasksThisWeek} tasks this week · {agent.department}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
