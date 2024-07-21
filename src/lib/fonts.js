// lib/fonts.ts
import { Playfair_Display } from 'next/font/google'

const playfair_display = Playfair_Display({
  weight: '500',
  subsets: ['latin']
})

export const fonts = {
  playfair_display
}