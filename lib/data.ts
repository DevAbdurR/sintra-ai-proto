export type TaskStatus = "queued" | "in_progress" | "review" | "done"

export type AgentStatus = "working" | "available" | "paused"

export type ActivityItem = {
  id: string
  time: string
  title: string
  detail: string
}

export type AgentTask = {
  id: string
  title: string
  status: TaskStatus
  due: string
  output: string
}

export type Agent = {
  slug: string
  name: string
  role: string
  department: string
  bio: string
  status: AgentStatus
  seed: string
  bg: string
  featured?: boolean
  featuredCopy?: string
  skills: string[]
  tasksThisWeek: number
  completed: number
  creditsUsed: number
  activity: ActivityItem[]
  tasks: AgentTask[]
}

export const workspace = {
  name: "Arrow",
  plan: "Growth",
  creditsUsed: 230,
  creditsTotal: 250,
}

export const agents: Agent[] = [
  {
    slug: "bookkeeper",
    name: "Bookkeeper",
    role: "Business Bookkeeper",
    department: "Finance",
    bio: "Keeps the books current, flags unusual spend, and prepares weekly cash summaries for the owner.",
    status: "working",
    seed: "Bookkeeper",
    bg: "b6e3f4",
    skills: ["Invoicing", "Expense review", "Cash summary"],
    tasksThisWeek: 11,
    completed: 84,
    creditsUsed: 42,
    activity: [
      {
        id: "bk-a1",
        time: "12 min ago",
        title: "Reconciled Stripe payouts",
        detail: "Matched 14 payments to invoices. One $240 charge needs your review.",
      },
      {
        id: "bk-a2",
        time: "2h ago",
        title: "Sent overdue reminders",
        detail: "Emailed 3 clients with invoices 8–21 days past due.",
      },
    ],
    tasks: [
      {
        id: "bk-t1",
        title: "Weekly cash snapshot",
        status: "in_progress",
        due: "Today 5:00 PM",
        output: "Drafting owner-ready summary from bank + Stripe.",
      },
      {
        id: "bk-t2",
        title: "Flag duplicate software charges",
        status: "queued",
        due: "Tomorrow",
        output: "Waiting on last statement import.",
      },
    ],
  },
  {
    slug: "buddy",
    name: "Buddy",
    role: "Business Development",
    department: "Sales",
    bio: "Research accounts, draft outreach, and keep the pipeline moving without sounding like a bot.",
    status: "available",
    seed: "Buddy",
    bg: "c0aede",
    skills: ["Outbound", "Follow-ups", "CRM notes"],
    tasksThisWeek: 17,
    completed: 126,
    creditsUsed: 61,
    activity: [
      {
        id: "bd-a1",
        time: "28 min ago",
        title: "Prepared 8 warm intros",
        detail: "Personalized notes for clinics that booked a demo last quarter.",
      },
    ],
    tasks: [
      {
        id: "bd-t1",
        title: "Follow up with Northwind",
        status: "review",
        due: "Today",
        output: "Draft reply ready — waiting for your send.",
      },
    ],
  },
  {
    slug: "soshie",
    name: "Soshie",
    role: "Social Media",
    department: "Marketing",
    bio: "Plans the calendar, writes captions, and turns product photos into posts that actually sound like you.",
    status: "working",
    seed: "Soshie",
    bg: "ffd5dc",
    skills: ["Captions", "Content calendar", "Community replies"],
    tasksThisWeek: 22,
    completed: 201,
    creditsUsed: 73,
    activity: [
      {
        id: "so-a1",
        time: "8 min ago",
        title: "Queued Thursday Reels",
        detail: "3 clips from this week’s product shoot, captions in brand voice.",
      },
      {
        id: "so-a2",
        time: "Yesterday",
        title: "Replied to 14 comments",
        detail: "Answered sizing questions; flagged 2 for you.",
      },
    ],
    tasks: [
      {
        id: "so-t1",
        title: "Weekend story series",
        status: "in_progress",
        due: "Fri 3:00 PM",
        output: "Writing 5-frame sequence from new arrivals.",
      },
      {
        id: "so-t2",
        title: "Repurpose blog into carousel",
        status: "queued",
        due: "Mon",
        output: "Source article: Spring restock guide.",
      },
    ],
  },
  {
    slug: "comet",
    name: "Comet",
    role: "Web Builder",
    department: "Product",
    bio: "Ships landing pages, form tweaks, and simple site updates so campaigns don’t wait on a developer.",
    status: "available",
    seed: "Comet",
    bg: "ffdfbf",
    skills: ["Landing pages", "Copy layout", "Forms"],
    tasksThisWeek: 6,
    completed: 41,
    creditsUsed: 19,
    activity: [
      {
        id: "co-a1",
        time: "1h ago",
        title: "Updated spring campaign page",
        detail: "Hero, offer block, and mobile spacing.",
      },
    ],
    tasks: [
      {
        id: "co-t1",
        title: "Add waitlist form to homepage",
        status: "review",
        due: "Today",
        output: "Preview ready. Needs your publish.",
      },
    ],
  },
  {
    slug: "cassie",
    name: "Cassie",
    role: "Customer Support",
    department: "Support",
    bio: "Handles inbox, refunds, and FAQs with a calm tone, and only escalates the messy stuff.",
    status: "working",
    seed: "Cassie",
    bg: "d1d4f9",
    skills: ["Inbox", "Refunds", "Help articles"],
    tasksThisWeek: 31,
    completed: 412,
    creditsUsed: 38,
    activity: [
      {
        id: "ca-a1",
        time: "4 min ago",
        title: "Closed 9 tickets",
        detail: "Shipping delays and size exchanges. 2 escalated.",
      },
    ],
    tasks: [
      {
        id: "ca-t1",
        title: "Draft shipping delay template",
        status: "in_progress",
        due: "Today 4:00 PM",
        output: "Tone pass in progress.",
      },
    ],
  },
  {
    slug: "marco",
    name: "Marco",
    role: "Sales",
    department: "Sales",
    bio: "Writes culturally-calibrated B2B cold outreach, follow-up sequences, and replies that feel human.",
    status: "available",
    seed: "Marco",
    bg: "c0aede",
    featured: true,
    featuredCopy:
      "Writes culturally-calibrated B2B cold outreach, follow-up sequences, and replies…",
    skills: ["Cold email", "Sequences", "Replies"],
    tasksThisWeek: 9,
    completed: 67,
    creditsUsed: 24,
    activity: [
      {
        id: "ma-a1",
        time: "3h ago",
        title: "Built 12-email sequence",
        detail: "For mid-market ops leads in the Midwest.",
      },
    ],
    tasks: [
      {
        id: "ma-t1",
        title: "Rewrite opener for clinics",
        status: "queued",
        due: "Wed",
        output: "Waiting on last campaign stats.",
      },
    ],
  },
  {
    slug: "reqi",
    name: "Reqi",
    role: "Operations",
    department: "Operations",
    bio: "Converts messy inputs — meeting notes, Slack threads, feedback — into clear next steps.",
    status: "working",
    seed: "Reqi",
    bg: "b6e3f4",
    featured: true,
    featuredCopy:
      "Converts messy inputs — meeting notes, Slack threads, feedback, brain…",
    skills: ["Notes", "Action lists", "SOPs"],
    tasksThisWeek: 14,
    completed: 93,
    creditsUsed: 33,
    activity: [
      {
        id: "re-a1",
        time: "40 min ago",
        title: "Turned standup into tasks",
        detail: "Assigned 6 follow-ups across Soshie and Cassie.",
      },
    ],
    tasks: [
      {
        id: "re-t1",
        title: "Clean last week’s vendor notes",
        status: "in_progress",
        due: "Today",
        output: "Clustering decisions vs. parking lot.",
      },
    ],
  },
  {
    slug: "lumi",
    name: "Lumi",
    role: "marketing",
    department: "Marketing",
    bio: "Creates actual Reels and Facebook videos from product photos — scenes, hooks, and on-screen text.",
    status: "available",
    seed: "Lumi",
    bg: "ffd5dc",
    featured: true,
    featuredCopy:
      "Creates actual Reels and Facebook videos from product photos — scenes,…",
    skills: ["Reels", "Hooks", "Video scripts"],
    tasksThisWeek: 5,
    completed: 38,
    creditsUsed: 28,
    activity: [
      {
        id: "lu-a1",
        time: "Yesterday",
        title: "Cut 4 product Reels",
        detail: "Used Tuesday’s photo drop. Hooks A/B ready.",
      },
    ],
    tasks: [
      {
        id: "lu-t1",
        title: "Friday drop teaser",
        status: "queued",
        due: "Thu",
        output: "Need 3 stills from the navy set.",
      },
    ],
  },
]

export const teamPreviewSlugs = [
  "bookkeeper",
  "buddy",
  "soshie",
  "comet",
  "cassie",
]

export const recentChats = [
  {
    id: "c1",
    title: "Weekend social calendar",
    agent: "Soshie",
    href: "/employees/soshie",
  },
  {
    id: "c2",
    title: "Overdue invoices",
    agent: "Bookkeeper",
    href: "/employees/bookkeeper",
  },
  {
    id: "c3",
    title: "Support tone check",
    agent: "Cassie",
    href: "/employees/cassie",
  },
]

export const automations = [
  {
    id: "au1",
    name: "Monday content pack",
    owner: "Soshie",
    schedule: "Every Mon 8:00 AM",
    status: "On",
    lastRun: "2 days ago",
  },
  {
    id: "au2",
    name: "Invoice chase",
    owner: "Bookkeeper",
    schedule: "Weekdays 9:30 AM",
    status: "On",
    lastRun: "Today",
  },
  {
    id: "au3",
    name: "Weekly ops digest",
    owner: "Reqi",
    schedule: "Fri 4:00 PM",
    status: "Paused",
    lastRun: "Last week",
  },
]

export function getAgent(slug: string) {
  return agents.find((agent) => agent.slug === slug)
}

export function allTasks() {
  return agents.flatMap((agent) =>
    agent.tasks.map((task) => ({
      ...task,
      agentName: agent.name,
      agentSlug: agent.slug,
      department: agent.department,
    })),
  )
}

export const statusLabel: Record<TaskStatus, string> = {
  queued: "Queued",
  in_progress: "In progress",
  review: "Needs you",
  done: "Done",
}

export const agentStatusLabel: Record<AgentStatus, string> = {
  working: "Working",
  available: "Available",
  paused: "Paused",
}
