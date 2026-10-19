import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  { name: 'Maya R.', role: 'Founder, Shipfast', rating: 5, quote: 'Shipped three features in one sitting. These are my secret weapon.' },
  { name: 'Devon K.', role: 'Staff Engineer', rating: 5, quote: 'The ANC silences the open office like a force field.' },
  { name: 'Priya S.', role: 'Product Designer', rating: 4, quote: 'Comfy for 10-hour sprints, and the battery outlasts me.' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          className={cn('size-3.5 text-ink', index < rating ? 'fill-hero-yellow' : 'fill-transparent opacity-30')}
        />
      ))}
    </p>
  )
}

export function TestimonialsStrip() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mt-3 flex shrink-0 items-stretch gap-3 border-4 border-ink bg-white p-2"
    >
      <h2
        id="testimonials-heading"
        className="flex shrink-0 -rotate-2 items-center bg-hero-yellow px-2 font-display text-lg leading-none tracking-wider shadow-comic-sm"
      >
        Fan mail!
      </h2>
      <ul className="grid min-w-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li
            key={testimonial.name}
            className={cn('min-w-0 border-2 border-ink bg-paper px-2.5 py-1.5', index > 0 && 'hidden md:block')}
          >
            <div className="flex items-center justify-between gap-2">
              <StarRating rating={testimonial.rating} />
              <p className="truncate text-[10px] font-bold uppercase">
                {testimonial.name} <span className="font-medium text-ink/60">· {testimonial.role}</span>
              </p>
            </div>
            <blockquote className="mt-0.5 truncate text-xs font-medium">{`"${testimonial.quote}"`}</blockquote>
          </li>
        ))}
      </ul>
    </section>
  )
}
