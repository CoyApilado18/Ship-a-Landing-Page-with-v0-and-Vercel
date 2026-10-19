import Image from 'next/image'
import { ArrowRight, Zap } from 'lucide-react'
import { ComicPanel } from './comic-panel'

type HeroPanelProps = {
  active: boolean
  onExplore: () => void
}

export function HeroPanel({ active, onExplore }: HeroPanelProps) {
  return (
    <ComicPanel id="hero" issue="#1" caption="Meanwhile, in Startup City..." active={active} className="bg-hero-red text-white">
      <div aria-hidden className="speed-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="halftone-light pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-12 pb-5">
        <p className="w-fit -rotate-2 border-2 border-ink bg-white px-2 py-0.5 text-[11px] font-bold tracking-widest text-ink uppercase shadow-comic-sm">
          Series A of awesome
        </p>

        <h1 className="mt-3 font-display text-5xl leading-[0.9] tracking-wide text-hero-yellow [text-shadow:3px_3px_0_#111,-1px_-1px_0_#111,1px_-1px_0_#111,-1px_1px_0_#111] xl:text-6xl">
          Welcome to My Store
        </h1>

        <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center">
          <div className="relative aspect-square h-full max-h-full overflow-hidden rounded-full border-4 border-ink bg-paper shadow-comic">
            <Image
              src="/images/hero.png"
              alt="Comic hero flying while holding SONIC-1 headphones"
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover"
            />
          </div>

          <div className="absolute top-2 right-0 max-w-[10rem] rotate-3 rounded-2xl border-[3px] border-ink bg-white px-3 py-2 text-xs font-bold text-ink shadow-comic-sm after:absolute after:-bottom-3 after:left-5 after:h-4 after:w-4 after:rotate-45 after:border-r-[3px] after:border-b-[3px] after:border-ink after:bg-white">
            {"Focus mode: ACTIVATED. Bugs don't stand a chance!"}
          </div>

          <div
            aria-hidden
            className="burst absolute bottom-1 left-0 flex size-20 items-center justify-center bg-hero-yellow font-display text-2xl text-ink"
          >
            POW!
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onExplore}
            className="group flex items-center gap-2 border-[3px] border-ink bg-hero-yellow px-4 py-2 font-display text-xl tracking-wider text-ink shadow-comic-sm transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Suit up
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </button>
          <p className="flex items-center gap-1 text-xs font-bold">
            <Zap className="size-4 fill-hero-yellow text-hero-yellow" aria-hidden />
            Free next-day delivery
          </p>
        </div>
      </div>
    </ComicPanel>
  )
}
