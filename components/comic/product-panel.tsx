import Image from 'next/image'
import { Minus, Plus, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MAX_QUANTITY, formatPrice, product } from '@/lib/product'
import { ComicPanel } from './comic-panel'

type ProductPanelProps = {
  active: boolean
  colorId: string
  quantity: number
  onColorChange: (id: string) => void
  onQuantityChange: (quantity: number) => void
  onBuyNow: () => void
}

export function ProductPanel({
  active,
  colorId,
  quantity,
  onColorChange,
  onQuantityChange,
  onBuyNow,
}: ProductPanelProps) {
  const selectedColor = product.colors.find((color) => color.id === colorId) ?? product.colors[0]

  return (
    <ComicPanel id="product" issue="#2" caption="Introducing the gear" active={active} className="bg-paper">
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-12 pb-5">
        <div className="relative min-h-0 flex-1 overflow-hidden border-[3px] border-ink bg-paper">
          <Image
            src={product.image}
            alt={`${product.name} wireless headphones in ${selectedColor.name}`}
            fill
            sizes="(min-width: 1024px) 30vw, 80vw"
            className="object-cover"
          />
          <div className="burst absolute -top-1 -right-1 flex size-20 rotate-12 flex-col items-center justify-center bg-hero-red text-center font-display leading-none text-white">
            <span className="text-[10px] tracking-wider">only</span>
            <span className="text-xl">{formatPrice(product.price).replace('.00', '')}</span>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <h3 className="font-display text-4xl leading-none tracking-wider">{product.name}</h3>
            <p className="text-xs font-medium text-ink/70">{product.tagline}</p>
          </div>
          <p className="flex shrink-0 items-center gap-1 text-xs font-bold">
            <Star className="size-4 fill-hero-yellow text-ink" aria-hidden />
            {product.rating}
            <span className="font-medium text-ink/60">({product.reviews.toLocaleString()})</span>
          </p>
        </div>

        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Features">
          {product.features.map((feature) => (
            <li key={feature} className="border-2 border-ink bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase">
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-between gap-3">
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Color</legend>
            {product.colors.map((color) => (
              <label key={color.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={color.id}
                  checked={colorId === color.id}
                  onChange={() => onColorChange(color.id)}
                  className="peer sr-only"
                />
                <span className="sr-only">{color.name}</span>
                <span
                  aria-hidden
                  className={cn(
                    'block size-7 rounded-full border-[3px] border-ink transition-transform peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink',
                    colorId === color.id ? 'scale-110 shadow-comic-sm' : 'opacity-80 hover:scale-105',
                  )}
                  style={{ backgroundColor: color.swatch }}
                />
              </label>
            ))}
            <span className="text-xs font-bold uppercase">{selectedColor.name}</span>
          </fieldset>

          <div className="flex items-center border-[3px] border-ink bg-white">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => onQuantityChange(quantity - 1)}
              className="flex size-8 items-center justify-center hover:bg-hero-yellow disabled:opacity-30"
            >
              <Minus className="size-4" aria-hidden />
            </button>
            <output aria-live="polite" aria-label="Quantity" className="w-7 text-center font-display text-lg">
              {quantity}
            </output>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantity >= MAX_QUANTITY}
              onClick={() => onQuantityChange(quantity + 1)}
              className="flex size-8 items-center justify-center hover:bg-hero-yellow disabled:opacity-30"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onBuyNow}
          className="mt-3 w-full border-[3px] border-ink bg-hero-red py-2 font-display text-2xl tracking-widest text-white shadow-comic-sm transition-transform [text-shadow:2px_2px_0_#111] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Buy now! {formatPrice(product.price * quantity)}
        </button>
      </div>
    </ComicPanel>
  )
}
