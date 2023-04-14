export const metadata = {
  title: 'Home - Arvault',
  description: 'An AR publishing platform for the future',
}

import Hero from '@/components/hero'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      
      <Zigzag />
      <Testimonials />
    </>
  )
}
