"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import {
  Bell,
  Brain,
  ChevronDown,
  ClipboardList,
  Home,
  ListTodo,
  Menu,
  Plus,
  Puzzle,
  Search,
  Settings,
  Trash2,
  Users,
  Wallet,
  Workflow,
} from "lucide-react"
import { agents, recentChats, workspace } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/automations", label: "Automations", icon: Workflow },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/employees", label: "AI Employees", icon: Users },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function SidebarBody({
  onNavigate,
  query,
  onQuery,
}: {
  onNavigate?: () => void
  query: string
  onQuery: (value: string) => void
}) {
  const pathname = usePathname()
  const filteredChats = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return recentChats
    return recentChats.filter(
      (chat) =>
        chat.title.toLowerCase().includes(q) ||
        chat.agent.toLowerCase().includes(q),
    )
  }, [query])
  const filteredAgents = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(q) ||
        agent.role.toLowerCase().includes(q) ||
        agent.department.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-3 pt-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl px-1.5 py-1 text-left hover:bg-white/70"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-xs font-semibold text-white">
                A
              </span>
              <span className="text-sm font-semibold text-foreground">
                {workspace.name}
              </span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Workspace settings</DropdownMenuItem>
            <DropdownMenuItem>Switch workspace</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <Bell className="size-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="px-3 pt-4">
        <Button
          asChild
          className="h-10 w-full justify-start gap-2 rounded-full border border-violet-200 bg-white text-primary shadow-none hover:bg-white hover:text-primary"
        >
          <Link href="/" onClick={onNavigate}>
            <Plus className="size-4" />
            New chat
          </Link>
        </Button>
      </div>

      <nav className="mt-4 space-y-0.5 px-3">
        {nav.map((item) => {
          const Icon = item.icon
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors",
                active
                  ? "bg-white text-primary shadow-sm"
                  : "hover:bg-white/60",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <p className="mt-6 px-6 text-[11px] font-medium tracking-wide text-muted-foreground/80 uppercase">
        Workspace
      </p>
      <div className="mt-1 space-y-0.5 px-3">
        <Link
          href="/employees"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-sidebar-foreground hover:bg-white/60"
        >
          <Brain className="size-4" />
          Brain AI
        </Link>
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-sidebar-foreground hover:bg-white/60"
        >
          <Puzzle className="size-4" />
          Integrations
        </button>
      </div>

      <div className="mt-4 px-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search..."
            className="h-9 rounded-full border-transparent bg-white pl-9 shadow-none"
          />
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-auto px-3 pb-3">
        {query.trim() ? (
          <div className="space-y-3">
            {filteredAgents.length > 0 && (
              <div>
                <p className="px-2 pb-1 text-[11px] text-muted-foreground">
                  Employees
                </p>
                {filteredAgents.map((agent) => (
                  <Link
                    key={agent.slug}
                    href={`/employees/${agent.slug}`}
                    onClick={onNavigate}
                    className="block rounded-xl px-3 py-2 text-sm hover:bg-white"
                  >
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>
                  </Link>
                ))}
              </div>
            )}
            {filteredChats.length > 0 && (
              <div>
                <p className="px-2 pb-1 text-[11px] text-muted-foreground">
                  Chats
                </p>
                {filteredChats.map((chat) => (
                  <Link
                    key={chat.id}
                    href={chat.href}
                    onClick={onNavigate}
                    className="block rounded-xl px-3 py-2 text-sm hover:bg-white"
                  >
                    {chat.title}
                  </Link>
                ))}
              </div>
            )}
            {filteredAgents.length === 0 && filteredChats.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No matches
              </p>
            )}
          </div>
        ) : (
          <div>
            {recentChats.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No recent chats
              </p>
            ) : (
              <>
                <p className="px-2 pb-1 text-[11px] text-muted-foreground">
                  Recent chats
                </p>
                {recentChats.map((chat) => (
                  <Link
                    key={chat.id}
                    href={chat.href}
                    onClick={onNavigate}
                    className="block rounded-xl px-3 py-2 text-sm hover:bg-white"
                  >
                    <p className="truncate font-medium">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">{chat.agent}</p>
                  </Link>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <Separator className="bg-white/70" />
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Help">
            <span className="text-muted-foreground">?</span>
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Settings">
            <Settings className="size-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Trash">
            <Trash2 className="size-4 text-muted-foreground" />
          </Button>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Notes">
          <ClipboardList className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="hidden w-[240px] shrink-0 lg:flex lg:flex-col">
        <SidebarBody query={query} onQuery={setQuery} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col p-2 sm:p-3">
        <div className="flex min-h-[calc(100dvh-1rem)] flex-col rounded-[28px] bg-canvas sm:min-h-[calc(100dvh-1.5rem)]">
          <header className="flex items-center justify-between px-4 pt-4 lg:justify-end lg:px-8">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-sidebar p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <SidebarBody
                  query={query}
                  onQuery={setQuery}
                  onNavigate={() => setOpen(false)}
                />
              </SheetContent>
            </Sheet>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
            >
              <Wallet className="size-3.5 text-primary" />
              {workspace.creditsUsed} / {workspace.creditsTotal}
            </button>
          </header>
          <div className="flex flex-1 flex-col px-4 pb-8 lg:px-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
