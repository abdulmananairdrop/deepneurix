'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type CaseStudyBullet = string | { text?: string | null }

interface CaseStudy {
  id: number
  title: string
  bulletPoints?: CaseStudyBullet[]
  backgroundImage?: {
    asset?: {
      url: string
    }
    url?: string
  } | null
}

export default function CaseStudiesScroll({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const normalized = useMemo(() => {
    return caseStudies.map(study => {
      // Extract URL from various possible structures
      let bgUrl = ''
      const bg = study.backgroundImage
      if (bg) {
        if (typeof bg === 'string') {
          bgUrl = bg
        } else if (bg.asset?.url) {
          bgUrl = bg.asset.url
        } else if (bg.url) {
          bgUrl = bg.url
        }
      }
      
      return {
        ...study,
        bulletPoints: Array.isArray(study.bulletPoints)
          ? study.bulletPoints
              .map(bp => (typeof bp === 'string' ? bp : bp?.text || ''))
              .filter((text): text is string => Boolean(text))
          : [],
        backgroundUrl: bgUrl,
      }
    })
  }, [caseStudies])

  useEffect(() => {
    if (!mounted || !normalized.length || !containerRef.current) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${normalized.length * 1500}`,
          scrub: 1,
          pin: true,
        },
      })

      normalized.forEach((study, index) => {
        const isFirst = index === 0
        const nextExists = index < normalized.length - 1

        if (!isFirst) {
          timeline.to(`.cs-bg-${index}`, { opacity: 1, duration: 0.5 })
          timeline.to(`.cs-content-${index}`, { opacity: 1, y: 0, duration: 0.5 }, '<')
        }

        timeline.call(() => setActiveIndex(index))

        study.bulletPoints.forEach((_, bulletIndex) => {
          timeline.to(`.cs-bullet-${index}-${bulletIndex}`, { opacity: 1, y: 0, duration: 0.3 })
          timeline.to(`.cs-progress-${index}-${bulletIndex}`, { scaleX: 1, duration: 0.5 })
        })

        if (nextExists) {
          timeline.to(`.cs-content-${index}`, { opacity: 0, y: -30, duration: 0.5 })
          timeline.to(`.cs-bg-${index}`, { opacity: 0, duration: 0.5 }, '<0.2')
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [mounted, normalized])

  if (!caseStudies.length) {
    return null
  }

  return (
    <section
      ref={containerRef}
      id="case-studies"
      className="relative w-full h-screen overflow-hidden bg-gray-900 text-white"
    >
      {/* Background Images */}
      {normalized.map((study, index) => (
        <div
          key={`bg-${study.id || index}`}
          className={`cs-bg-${index} absolute inset-0 w-full h-full`}
          style={{ opacity: index === 0 ? 1 : 0 }}
        >
          {study.backgroundUrl ? (
            <Image
              src={study.backgroundUrl}
              alt={study.title}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900" />
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {normalized.map((study, index) => (
          <div
            key={`content-${study.id || index}`}
            className={`cs-content-${index} absolute inset-0 flex flex-col items-center justify-center px-6 text-center`}
            style={{ 
              opacity: index === 0 ? 1 : 0,
              transform: index === 0 ? 'translateY(0)' : 'translateY(40px)'
            }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 max-w-4xl">
              {study.title}
            </h2>

            <div className="w-full max-w-2xl space-y-6">
              {study.bulletPoints.length > 0 ? (
                study.bulletPoints.map((point, bulletIndex) => (
                  <div
                    key={bulletIndex}
                    className={`cs-bullet-${index}-${bulletIndex}`}
                    style={{ opacity: 0, transform: 'translateY(20px)' }}
                  >
                    <p className="text-lg md:text-xl font-light mb-2">
                      {point}
                    </p>
                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <div
                        className={`cs-progress-${index}-${bulletIndex} h-full bg-blue-500 origin-left`}
                        style={{ transform: 'scaleX(0)' }}
                      />
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline indicator */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
        <ul className="flex flex-col gap-4">
          {normalized.map((_, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className={`text-xs font-mono ${index === activeIndex ? 'text-white' : 'text-white/40'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-white/30'}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
