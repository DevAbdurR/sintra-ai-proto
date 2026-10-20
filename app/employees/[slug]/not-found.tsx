import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AgentNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center pt-20 text-center">
      <h1 className="text-2xl font-semibold">Employee not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        That AI employee isn’t on this team.
      </p>
      <Button asChild className="mt-6 rounded-full">
        <Link href="/employees">Back to team</Link>
      </Button>
    </div>
  );
}
