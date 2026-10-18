'use client'

import { useState } from 'react'
import { CreditCard, Lock, RotateCcw } from 'lucide-react'
import { TAX_RATE, formatPrice, product } from '@/lib/product'
import { ComicPanel } from './comic-panel'

type CheckoutPanelProps = {
  active: boolean
  colorName: string
  quantity: number
  onReset: () => void
}

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

const inputClass =
  'w-full border-[3px] border-ink bg-white px-2.5 py-1.5 text-sm font-medium text-ink placeholder:text-ink/40 focus:bg-hero-yellow/20 focus:outline-none focus-visible:shadow-comic-sm'

const labelClass = 'mb-0.5 block text-[10px] font-bold tracking-widest uppercase'

export function CheckoutPanel({ active, colorName, quantity, onReset }: CheckoutPanelProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)

  const subtotal = product.price * quantity
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setOrderId(`SNC-${Math.floor(100000 + Math.random() * 900000)}`)
  }

  function handleReset() {
    setOrderId(null)
    setCardNumber('')
    setExpiry('')
    onReset()
  }

  return (
    <ComicPanel id="checkout" issue="#3" caption="The final showdown" active={active} className="bg-hero-yellow">
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-40" />

      {orderId ? (
        <div role="status" className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-5 pt-12 pb-5 text-center">
          <div className="burst flex size-60 animate-comic-pop items-center justify-center bg-hero-red">
            <span className="font-display text-4xl tracking-wide text-hero-yellow [text-shadow:3px_3px_0_#111]">
              Ka-ching!
            </span>
          </div>
          <div className="border-[3px] border-ink bg-white px-4 py-3 shadow-comic-sm">
            <p className="font-display text-2xl tracking-wider">Order confirmed</p>
            <p className="text-xs font-medium text-ink/70">
              {quantity} × {product.name} ({colorName}) · {formatPrice(total)}
            </p>
            <p className="mt-1 font-mono text-xs font-bold">#{orderId}</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 border-[3px] border-ink bg-hero-blue px-4 py-1.5 font-display text-lg tracking-wider text-white shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <RotateCcw className="size-4" aria-hidden />
            Start a new issue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-12 pb-5">
          <div className="border-[3px] border-ink bg-white p-3 shadow-comic-sm">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>
                {quantity} × {product.name}{' '}
                <span className="font-medium text-ink/60">({colorName})</span>
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <dl className="mt-1.5 space-y-0.5 border-t-2 border-dashed border-ink/30 pt-1.5 text-xs">
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="font-bold text-hero-blue">FREE</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax (8%)</dt>
                <dd>{formatPrice(tax)}</dd>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <dt className="font-display text-lg tracking-wider">Total</dt>
                <dd className="font-display text-2xl tracking-wide text-hero-red">{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="peter@startup.io" className={inputClass} />
            </div>
            <div>
              <label htmlFor="name" className={labelClass}>Name on card</label>
              <input id="name" name="name" required autoComplete="cc-name" placeholder="Peter Parker" className={inputClass} />
            </div>
            <div>
              <label htmlFor="card" className={labelClass}>Card number</label>
              <div className="relative">
                <input
                  id="card"
                  name="card"
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  pattern="(\d{4} ){3}\d{4}"
                  title="Enter a 16-digit card number"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                  className={`${inputClass} pr-9`}
                />
                <CreditCard className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2" aria-hidden />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="expiry" className={labelClass}>Expiry</label>
                <input
                  id="expiry"
                  name="expiry"
                  required
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  pattern="(0[1-9]|1[0-2])\/\d{2}"
                  title="Use MM/YY"
                  value={expiry}
                  onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cvc" className={labelClass}>CVC</label>
                <input
                  id="cvc"
                  name="cvc"
                  required
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  pattern="\d{3,4}"
                  maxLength={4}
                  title="3 or 4 digits"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button
              type="submit"
              className="w-full border-[3px] border-ink bg-ink py-2 font-display text-2xl tracking-widest text-hero-yellow shadow-[3px_3px_0_0_#e62429] transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-hero-red"
            >
              Pay {formatPrice(total)}
            </button>
            <p className="mt-1.5 flex items-center justify-center gap-1 text-[10px] font-bold tracking-wider uppercase">
              <Lock className="size-3" aria-hidden />
              Demo checkout — no real payment is processed
            </p>
          </div>
        </form>
      )}
    </ComicPanel>
  )
}
