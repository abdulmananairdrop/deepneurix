'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface CtaData {
  title: string
  subtitle?: string
  buttonText: string
  buttonLink: string
}

export default function CtaSection({ data }: { data: CtaData }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 80%',
        }
      })

      tl.fromTo('.cta-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.cta-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.cta-button',
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-100 via-white to-cyan-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="cta-content max-w-4xl mx-auto text-center">
          <h2 className="cta-title text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>

          {data.subtitle && (
            <p className="cta-subtitle text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          )}

          <Link href={data.buttonLink} className="cta-button btn-primary inline-flex items-center gap-2 text-lg px-12 py-5">
            {data.buttonText}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
