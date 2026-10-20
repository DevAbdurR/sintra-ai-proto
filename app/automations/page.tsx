import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { automations } from "@/lib/data";

export default function AutomationsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl pt-4">
      <h1 className="text-2xl font-semibold tracking-tight">Automations</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Recurring work your employees run without being asked.
      </p>
      <div className="mt-8 space-y-3">
        {automations.map((item) => (
          <Card key={item.id} className="gap-0 rounded-2xl py-0 shadow-sm">
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.owner} · {item.schedule}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Last run {item.lastRun}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={
                  item.status === "On"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                }
              >
                {item.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
