"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowRight,
  AtSign,
  Clapperboard,
  FileText,
  ImageIcon,
  Mic,
  Paperclip,
  Presentation,
  Send,
  Smile,
  Sparkles,
  X,
} from "lucide-react"
import { AgentPortrait } from "@/components/agent-portrait"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { agents, teamPreviewSlugs } from "@/lib/data"
import { cn } from "@/lib/utils"

const prompts = [
  {
    label: "Create a video",
    icon: Clapperboard,
    fresh: true,
    text: "Create a 20-second product Reel from this week’s photo drop.",
  },
  {
    label: "Generate image",
    icon: ImageIcon,
    text: "Generate a clean product still for the homepage banner.",
  },
  {
    label: "Build presentation",
    icon: Presentation,
    text: "Build a 6-slide weekly business review for the team.",
  },
  {
    label: "Create a post",
    icon: FileText,
    text: "Write an Instagram post announcing Friday’s restock.",
  },
  {
    label: "Write email",
    icon: AtSign,
    text: "Draft a polite follow-up to last week’s unpaid invoices.",
  },
]

export function HomeDashboard() {
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState<string | null>(null)
  const [showFeatured, setShowFeatured] = useState(true)
  const team = useMemo(
    () =>
      teamPreviewSlugs
        .map((slug) => agents.find((agent) => agent.slug === slug))
        .filter(Boolean),
    [],
  )
  const featured = agents.filter((agent) => agent.featured)

  function send() {
    const next = message.trim()
    if (!next) return
    setSent(next)
    setMessage("")
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center pt-6 sm:pt-10">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-[#2b2f45] sm:text-4xl">
          We meet again!
        </h1>

        <div className="mt-10 flex w-full items-start justify-center gap-4 overflow-x-auto pb-2 sm:gap-8">
          {team.map((agent) => (
            <Link
              key={agent!.slug}
              href={`/employees/${agent!.slug}`}
              className="flex w-[88px] shrink-0 flex-col items-center text-center"
            >
              <AgentPortrait
                seed={agent!.seed}
                bg={agent!.bg}
                name={agent!.name}
                size={76}
              />
              <p className="mt-3 text-sm font-medium text-foreground">
                {agent!.name}
              </p>
              <p className="text-[11px] leading-tight text-muted-foreground">
                {agent!.role}
              </p>
            </Link>
          ))}
          <Link
            href="/employees"
            className="flex w-[88px] shrink-0 flex-col items-center text-center"
          >
            <span className="flex size-[76px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(80,88,140,0.12)] ring-4 ring-white">
              <ArrowRight className="size-5 text-muted-foreground" />
            </span>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              View all
            </p>
          </Link>
        </div>

        <div className="mt-10 w-full rounded-[28px] border border-white bg-white p-4 shadow-[0_16px_40px_rgba(90,100,160,0.08)] sm:p-5">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                send()
              }
            }}
            rows={2}
            placeholder="Send a message"
            className="w-full resize-none bg-transparent text-base outline-none placeholder:text-muted-foreground/80"
          />
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" aria-label="Attach">
                <Paperclip className="size-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Emoji">
                <Smile className="size-4 text-muted-foreground" />
              </Button>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                className="hidden rounded-full text-muted-foreground sm:inline-flex"
              >
                <Sparkles className="size-3.5" />
                Smart
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Voice">
                <Mic className="size-4 text-muted-foreground" />
              </Button>
              <Button
                size="icon-sm"
                className="rounded-full"
                onClick={send}
                disabled={!message.trim()}
                aria-label="Send"
              >
                <Send className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {sent && (
          <div className="mt-4 w-full rounded-2xl border border-violet-100 bg-white px-4 py-3 text-sm shadow-sm">
            <p className="text-xs font-medium text-primary">Assigned to your team</p>
            <p className="mt-1 text-foreground">{sent}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Soshie picked this up. Open her board to follow the work.
            </p>
            <Button asChild variant="link" className="h-auto px-0">
              <Link href="/employees/soshie">View Soshie</Link>
            </Button>
          </div>
        )}

        <div className="mt-5 flex w-full gap-2 overflow-x-auto pb-1">
          {prompts.map((prompt) => {
            const Icon = prompt.icon
            return (
              <button
                key={prompt.label}
                type="button"
                onClick={() => setMessage(prompt.text)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border border-violet-100/80 bg-white px-3.5 py-2 text-sm text-foreground shadow-sm hover:border-violet-200",
                )}
              >
                <Icon className="size-4 text-muted-foreground" />
                {prompt.label}
                {prompt.fresh ? (
                  <Badge className="bg-[#ece6ff] text-[10px] text-primary">
                    New
                  </Badge>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      {showFeatured && (
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-foreground">
              Featured AI Employees to extend your team
            </h2>
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-7 rounded-full bg-white text-xs"
              >
                <Link href="/employees">Browse all</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Dismiss featured"
                onClick={() => setShowFeatured(false)}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((agent) => (
              <Link key={agent.slug} href={`/employees/${agent.slug}`}>
                <Card className="h-full gap-0 rounded-2xl border-violet-50 py-0 shadow-[0_8px_30px_rgba(90,100,160,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(90,100,160,0.12)]">
                  <CardContent className="flex h-full flex-col p-5">
                    <p className="text-xs text-muted-foreground">
                      {agent.department}
                    </p>
                    <p className="mt-1 text-lg font-semibold">{agent.name}</p>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {agent.featuredCopy}
                    </p>
                    <div className="mt-6 flex justify-end">
                      <AgentPortrait
                        seed={agent.seed}
                        bg={agent.bg}
                        name={agent.name}
                        size={56}
                        className="ring-0 shadow-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
