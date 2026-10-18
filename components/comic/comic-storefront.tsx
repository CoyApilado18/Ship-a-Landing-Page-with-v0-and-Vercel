'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { product } from '@/lib/product'
import { HeroPanel } from './hero-panel'
import { ProductPanel } from './product-panel'
import { CheckoutPanel } from './checkout-panel'

const steps = [
  { id: 'hero', label: 'Origin' },
  { id: 'product', label: 'Gear' },
  { id: 'checkout', label: 'Showdown' },
] as const

type Step = (typeof steps)[number]['id']

export function ComicStorefront() {
  const [step, setStep] = useState<Step>('hero')
  const [colorId, setColorId] = useState(product.colors[0].id)
  const [quantity, setQuantity] = useState(1)
  const colorName = product.colors.find((color) => color.id === colorId)?.name ?? ''

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-ink p-2 sm:p-3">
      <header className="flex shrink-0 items-center justify-between gap-3 border-4 border-ink bg-white px-3 py-1.5">
        <p className="flex items-baseline gap-2">
          <span className="bg-hero-red px-2 font-display text-2xl tracking-wider text-white [text-shadow:2px_2px_0_#111]">
            SONIC
          </span>
          <span className="hidden text-[10px] font-bold tracking-widest uppercase sm:inline">
            Heroic sound for builders
          </span>
        </p>

        <nav aria-label="Story steps">
          <ol className="flex items-center gap-1">
            {steps.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setStep(item.id)}
                  aria-current={step === item.id ? 'step' : undefined}
                  className={cn(
                    'border-2 border-ink px-2 py-0.5 font-display text-sm tracking-wider transition-colors',
                    step === item.id ? 'bg-hero-yellow shadow-comic-sm' : 'bg-white hover:bg-hero-yellow/40',
                  )}
                >
                  <span aria-hidden>{index + 1}.</span> {item.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <p className="hidden font-display text-sm tracking-wider md:block">Vol. 1 · No. 2026</p>
      </header>

      <main className="mt-3 grid min-h-0 flex-1 grid-cols-1 grid-rows-1 gap-3 lg:grid-cols-[1.05fr_1fr_1fr]">
        <div className={cn('min-h-0 flex-col lg:flex', step === 'hero' ? 'flex' : 'hidden')}>
          <HeroPanel active={step === 'hero'} onExplore={() => setStep('product')} />
        </div>
        <div className={cn('min-h-0 flex-col lg:flex', step === 'product' ? 'flex' : 'hidden')}>
          <ProductPanel
            active={step === 'product'}
            colorId={colorId}
            quantity={quantity}
            onColorChange={setColorId}
            onQuantityChange={setQuantity}
            onBuyNow={() => setStep('checkout')}
          />
        </div>
        <div className={cn('min-h-0 flex-col lg:flex', step === 'checkout' ? 'flex' : 'hidden')}>
          <CheckoutPanel
            active={step === 'checkout'}
            colorName={colorName}
            quantity={quantity}
            onReset={() => {
              setQuantity(1)
              setStep('hero')
            }}
          />
        </div>
      </main>
    </div>
  )
}
