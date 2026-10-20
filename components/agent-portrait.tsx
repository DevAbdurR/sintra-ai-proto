import { cn } from "@/lib/utils"

type AgentPortraitProps = {
  seed: string
  bg: string
  name: string
  size?: number
  className?: string
}

export function AgentPortrait({
  seed,
  bg,
  name,
  size = 80,
  className,
}: AgentPortraitProps) {
  const src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}&radius=50`

  return (
    <span
      className={cn(
        "inline-flex overflow-hidden rounded-full bg-white shadow-[0_8px_24px_rgba(80,88,140,0.12)] ring-4 ring-white",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="size-full object-cover"
      />
    </span>
  )
}
