'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { MenuItem } from '@/components/ui/InfiniteMenu'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Dynamically import heavy WebGL component with no SSR to reduce initial bundle
const InfiniteMenu = dynamic(() => import('@/components/ui/InfiniteMenu'), {
  ssr: false,
})

interface WhyChooseUsSectionProps {
  sectionTitle?: string
  sectionDescription?: string
  items: MenuItem[]
}

export default function WhyChooseUsSection({ sectionTitle, sectionDescription, items }: WhyChooseUsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.why-choose-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.why-choose-header', start: 'top 85%' }
        }
      )

      // Canvas container animation
      gsap.fromTo('.why-choose-canvas',
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.why-choose-canvas', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [mounted])

  return (
    <section ref={sectionRef} id="why-choose-us" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 mb-8">
        <div className="why-choose-header text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {sectionTitle || 'Why Choose Us'}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {sectionDescription || 'Discover what makes us the right choice for your business'}
          </p>
        </div>
      </div>
      <div className="why-choose-canvas relative rounded-2xl overflow-hidden mx-4 lg:mx-8 shadow-2xl border border-gray-200" style={{ height: '600px' }}>
        {mounted ? (
          <InfiniteMenu items={items} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-500">Loading interactive experience...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
