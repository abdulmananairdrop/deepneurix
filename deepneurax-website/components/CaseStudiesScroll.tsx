'use client'

import { useRef, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface CaseStudy {
  id: number
  title: string
  description?: string
  bulletPoints?: (string | { text?: string | null })[]
  backgroundImage?: {
    asset?: { url: string }
    url?: string
  } | null
  link?: string
}

interface SectionData {
  title: string
  description: string
}

export default function CaseStudiesScroll({ 
  caseStudies, 
  sectionData 
}: { 
  caseStudies: CaseStudy[], 
  sectionData: SectionData 
}) {
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const normalized = useMemo(() => {
    return caseStudies.map(study => {
      let bgUrl = ''
      const bg = study.backgroundImage
      if (bg) {
        if (typeof bg === 'string') bgUrl = bg
        else if (bg.asset?.url) bgUrl = bg.asset.url
        else if (bg.url) bgUrl = bg.url
      }
      
      return {
        ...study,
        bulletPoints: Array.isArray(study.bulletPoints)
          ? study.bulletPoints
              .map(bp => (typeof bp === 'string' ? bp : bp?.text || ''))
              .filter(Boolean) as string[]
          : [],
        backgroundUrl: bgUrl,
      }
    })
  }, [caseStudies])

  useEffect(() => {
    if (!mounted || !mainContainerRef.current || !titleRef.current || !descriptionRef.current) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.cs-card-stack')
      
      // Initial States
      gsap.set(titleRef.current, {
        fontSize: '12vw',
        position: 'fixed',
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        textAlign: 'center',
        width: '100vw',
        zIndex: 100,
        opacity: 1
      })

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 30,
        position: 'fixed',
        left: '10%',
        top: '40%',
        width: '35vw',
        zIndex: 90
      })

      gsap.set(cards, {
        opacity: 0,
        x: 100,
        scale: 0.9,
        filter: 'blur(10px)',
        pointerEvents: 'none'
      })

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'top top',
          end: `+=${(normalized.length + 1) * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })

      // 1. Title Move: Center -> Left
      tl.to(titleRef.current, {
        fontSize: '3.5rem',
        left: '10%',
        top: '20%',
        xPercent: 0,
        yPercent: 0,
        textAlign: 'left',
        width: '35vw',
        duration: 2,
        ease: 'power2.inOut'
      })

      // 2. Description Fade In
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1
      }, '-=0.5')

      // 3. Cards Sequential Display
      cards.forEach((card, i) => {
        const cardTl = gsap.timeline()
        
        if (i > 0) {
          // Fade out previous
          cardTl.to(cards[i-1], {
            opacity: 0,
            x: -50,
            scale: 0.95,
            filter: 'blur(10px)',
            duration: 1,
            pointerEvents: 'none'
          })
        }

        // Fade in current
        cardTl.to(card, {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          pointerEvents: 'auto'
        }, i === 0 ? '-=0.5' : '<')

        // Hold frame
        cardTl.to({}, { duration: 1.5 })

        tl.add(cardTl)
      })

    }, mainContainerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [mounted, normalized])

  if (!normalized.length) return null

  return (
    <section 
      ref={mainContainerRef} 
      className="relative w-full h-screen bg-[#050b1f] text-white overflow-hidden"
    >
      <div className="container mx-auto px-10 h-full flex relative">
        
        {/* TEXT CONTENT (STICKY VIA GSAP FIXED) */}
        <div className="w-[45%] h-full relative z-[100] pointer-events-none">
          <h2 
            ref={titleRef}
            className="font-black tracking-tighter leading-none uppercase pointer-events-auto"
            style={{ fontFamily: "'Geom', sans-serif" }}
          >
            {sectionData.title}
          </h2>
          
          <div ref={descriptionRef} className="pointer-events-auto">
            <p className="text-blue-100/60 text-xl leading-relaxed">
              {sectionData.description}
            </p>
            <div className="mt-8 flex gap-2">
               <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
               <div className="w-4 h-1 bg-blue-600/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* CARDS AREA */}
        <div className="w-[55%] h-full relative flex items-center justify-center z-10">
          {normalized.map((study, index) => (
            <div 
              key={study.id} 
              className="cs-card-stack absolute inset-0 flex items-center justify-center p-10"
            >
              <div className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                {/* Image Section */}
                <div className="relative h-[280px] w-full">
                  {study.backgroundUrl ? (
                    <Image
                      src={study.backgroundUrl}
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b1f] via-transparent to-transparent" />
                  
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-black tracking-widest rounded-full uppercase">
                    Case Study {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-10">
                  <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Geom', sans-serif" }}>
                    {study.title}
                  </h3>

                  {study.description && (
                    <p className="text-blue-100/70 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {study.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {study.bulletPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-100/80 text-xs font-medium">{point}</span>
                      </div>
                    ))}
                  </div>

                  {study.link && (
                    <a 
                      href={study.link}
                      className="group/btn relative inline-flex items-center gap-3 px-8 py-3.5 bg-white text-blue-950 font-black text-xs rounded-xl overflow-hidden transition-all"
                    >
                      <span className="relative z-10 uppercase tracking-wider">Explore Details</span>
                      <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      <div className="absolute inset-0 bg-blue-50 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atmospheric Effects */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-600/[0.03] rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}