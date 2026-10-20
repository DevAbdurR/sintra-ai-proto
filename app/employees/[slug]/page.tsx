import { notFound } from "next/navigation";
import { AgentWorkspace } from "@/components/agent-workspace";
import { agents, getAgent } from "@/lib/data";

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export default async function AgentPage({
  params,
}: PageProps<"/employees/[slug]">) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();
  return <AgentWorkspace agent={agent} />;
}
