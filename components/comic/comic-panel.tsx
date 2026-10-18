import { cn } from '@/lib/utils'

type ComicPanelProps = {
  id: string
  issue: string
  caption: string
  active?: boolean
  className?: string
  children: React.ReactNode
}

export function ComicPanel({ id, issue, caption, active, className, children }: ComicPanelProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-caption`}
      className={cn(
        'relative flex min-h-0 flex-1 flex-col overflow-hidden border-4 border-ink shadow-comic transition-transform duration-300',
        active && 'lg:-translate-y-1 lg:shadow-[8px_10px_0_0_#111111]',
        className,
      )}
    >
      <div className="absolute top-0 left-0 z-20 flex items-stretch border-r-4 border-b-4 border-ink bg-hero-yellow">
        <span className="flex items-center bg-ink px-2 font-display text-sm tracking-wider text-hero-yellow">
          {issue}
        </span>
        <h2
          id={`${id}-caption`}
          className="px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase"
        >
          {caption}
        </h2>
      </div>
      {children}
    </section>
  )
}
