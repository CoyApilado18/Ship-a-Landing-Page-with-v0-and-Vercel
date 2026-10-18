export type ProductColor = {
  id: string
  name: string
  swatch: string
}

export const product = {
  name: 'SONIC-1',
  tagline: 'Noise-cancelling headphones with superpowers',
  price: 249,
  rating: 4.9,
  reviews: 2048,
  image: '/images/headphones.png',
  features: ['60h battery', 'Adaptive ANC', 'Spatial audio', 'USB-C fast charge'],
  colors: [
    { id: 'crimson', name: 'Crimson', swatch: '#e62429' },
    { id: 'cobalt', name: 'Cobalt', swatch: '#1d5fd1' },
    { id: 'gold', name: 'Gold', swatch: '#ffd400' },
  ] satisfies ProductColor[],
}

export const TAX_RATE = 0.08
export const MAX_QUANTITY = 5

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
