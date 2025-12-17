'use client'

import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Trophy, Users, Briefcase, TrendingUp, Star, Award, Target, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Metric {
  label: string
  value: number
  suffix?: string
  icon?: string
  sectionBackgroundColor?: string
  cardBackgroundColor?: string
  borderColor?: string
  numberColor?: string
  labelColor?: string
  sectionTitleColor?: string
  sectionSubtitleColor?: string
  decorativeElementsColor?: string
}

// Map metric labels to icons
const getMetricIcon = (label: string, icon?: string) => {
  const labelLower = label.toLowerCase()
  if (icon === '🏆' || labelLower.includes('success') || labelLower.includes('rate')) return Trophy
  if (icon === '👥' || labelLower.includes('client') || labelLower.includes('user')) return Users
  if (icon === '💼' || labelLower.includes('project')) return Briefcase
  if (icon === '📈' || labelLower.includes('growth')) return TrendingUp
  if (icon === '⭐' || labelLower.includes('rating') || labelLower.includes('satisfaction')) return Star
  if (labelLower.includes('award')) return Award
  if (labelLower.includes('target') || labelLower.includes('goal')) return Target
  return Zap
}

// Animated background blob component
const AnimatedBlob = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen blur-3xl opacity-20"
    animate={{
      x: [0, 100, -100, 0],
      y: [0, -100, 100, 0],
      scale: [1, 1.1, 0.9, 1],
    }}
    transition={{
      duration: 20 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
)

export default function MetricsCounter({ metrics }: { metrics: Metric[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoverSeed, setHoverSeed] = useState<Record<number, number>>({})
  const sectionRef = useRef<HTMLDivElement>(null)

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.metrics-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.metrics-header', start: 'top 85%' }
        }
      )

      // Cards stagger animation
      gsap.fromTo('.metric-card',
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.metrics-grid', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden bg-gradient-to-b from-[#3b82f6] via-[#1d4ed8] to-[#0b1d4f]"
    >
      {/* Dynamic animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900/20 to-blue-950/40"></div>
        
        {/* Animated geometric blobs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen blur-3xl opacity-15"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute top-40 right-20 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen blur-3xl opacity-10"
          animate={{
            x: [0, -80, 100, 0],
            y: [0, 60, -80, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-32 left-1/3 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen blur-3xl opacity-12"
          animate={{
            x: [0, 50, -100, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        ></motion.div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with animation */}
        <div className="metrics-header text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/50 text-blue-300 text-sm font-semibold">
              ✨ Our Achievements
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight"
            style={{ fontFamily: "'Geom', sans-serif", fontWeight: 800 }}
          >
            Impact in Numbers
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto text-slate-300 leading-relaxed"
            style={{ fontFamily: "'Geom', sans-serif" }}
          >
            Delivering measurable results that drive growth for our clients worldwide
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoverSeed(prev => ({ ...prev, [index]: Date.now() }))}
              className="metric-card group relative text-center p-5 md:p-6 rounded-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
            >
              {/* Clean white card with neutral depth */}
              <div className="absolute inset-0 bg-white rounded-2xl border border-neutral-200 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)] group-hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.28)] transition-all duration-300"></div>

              <div className="relative z-10">
                {/* Static Icon */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center shadow-[0_10px_24px_-18px_rgba(0,0,0,0.35)]">
                    {React.createElement(getMetricIcon(metric.label, metric.icon), {
                      size: 32,
                      className: "text-black",
                      strokeWidth: 2
                    })}
                  </div>
                </div>

                {/* Counter Number */}
                <div 
                  className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 text-neutral-900 tracking-tight leading-tight"
                  style={{ fontFamily: "'Geom', sans-serif", fontWeight: 900 }}
                >
                  {isVisible ? (
                    <>
                      <CountUp 
                        key={`${metric.label}-${hoverSeed[index] ?? 'base'}`}
                        end={metric.value} 
                        duration={2.5} 
                        separator="," 
                      />
                      {metric.suffix}
                    </>
                  ) : (
                    '0'
                  )}
                </div>

                {/* Label */}
                <div 
                  className="text-base md:text-lg font-bold tracking-wide uppercase text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300"
                  style={{ fontFamily: "'Geom', sans-serif", letterSpacing: '0.05em' }}
                >
                  {metric.label}
                </div>

                {/* Animated underline */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-neutral-900 rounded-full w-0 group-hover:w-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-16 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}
