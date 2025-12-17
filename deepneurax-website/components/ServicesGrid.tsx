'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ParticlesBackground from './ui/ParticlesBackground'
import Image from 'next/image'
import { Rocket, Code, Paintbrush, Brain, TrendingUp, Database, Eye, Target, Zap, Shield, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Service {
  title: string
  icon?: string
  description: string
  link?: string
  cardBackgroundColor?: string
  borderColor?: string
  titleColor?: string
  textColor?: string
  image?: {
    asset: {
      url: string
    }
  }
}

// Map icon names to Lucide components
const iconMap: Record<string, any> = {
  '🧠': Brain,
  '🤖': Brain,
  '📊': TrendingUp,
  '🎯': Target,
  '👁️': Eye,
  '⚡': Zap,
  '🛡️': Shield,
  '👥': Users,
  '💾': Database,
}

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-header', start: 'top 85%' }
        }
      )

      // Main content card animation
      gsap.fromTo('.services-card',
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-card', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // GSAP image transitions (crossfade with vertical slide, no lag)
  useEffect(() => {
    if (!imageRefs.current) return;
    const total = imageRefs.current.length;
    imageRefs.current.forEach((img, idx) => {
      if (!img) return;
      gsap.set(img, { willChange: 'opacity,transform' });
    });
    // Animate out previous, then in new
    imageRefs.current.forEach((img, idx) => {
      if (!img) return;
      if (idx === currentFeature) {
        gsap.to(img, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', pointerEvents: 'auto', zIndex: 2 });
      } else {
        gsap.to(img, { opacity: 0, y: 40, duration: 0.5, ease: 'power2.in', pointerEvents: 'none', zIndex: 1 });
      }
    });
  }, [currentFeature]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % Math.max(services.length, 1))
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, services.length])

  // Build feature list from backend services
  const features = (services.length ? services : []).map((svc, idx) => ({
    step: `Step ${idx + 1}`,
    title: svc.title || `Service ${idx + 1}`,
    content: svc.description || '',
    icon: svc.icon && iconMap[svc.icon] ? iconMap[svc.icon] : Rocket,
    image: svc.image?.asset?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
  }))

  const safeFeatures = features.length > 0 ? features : [
    {
      step: 'Step 1',
      title: 'Build Faster',
      content: 'Create your MVP in record time with our pre-built blocks and components.',
      icon: Rocket,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
    },
    {
      step: 'Step 2',
      title: 'Customize Easily',
      content: 'Tailor every component to your needs with our intuitive design system and flexible architecture.',
      icon: Paintbrush,
      image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop',
    },
    {
      step: 'Step 3',
      title: 'Deploy Confidently',
      content: 'Launch your product with confidence using our optimized, responsive, and accessible components.',
      icon: Code,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    },
  ]

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden py-14 md:py-18 bg-gradient-to-b from-white to-blue-50/60">
      {/* Interactive dots background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>
      <div className="container relative z-10 mx-auto px-5 md:px-6">
        <div className="services-header text-center mb-6 md:mb-8 lg:mb-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-3">
            Core Services
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive solutions to transform your business with cutting-edge technology
          </p>
        </div>

        <div className={'services-card relative z-10 p-6 md:p-10 bg-white rounded-2xl shadow-lg border border-gray-100'}>
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
              <div className="order-2 space-y-6 md:order-1">
                {safeFeatures.map((feature, index) => {
                  const IconComp = feature.icon || Rocket
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-6 md:gap-8"
                      initial={{ opacity: 0.3, x: -20 }}
                      animate={{
                        opacity: index === currentFeature ? 1 : 0.3,
                        x: 0,
                        scale: index === currentFeature ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                      onMouseEnter={() => { setCurrentFeature(index); setProgress(0); }}
                    >
                      <motion.div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14',
                          index === currentFeature
                            ? 'border-blue-500 bg-blue-50 text-blue-600 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                            : 'border-gray-200 bg-gray-100 text-gray-500'
                        )}
                      >
                        <IconComp className="h-6 w-6" />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-xl font-semibold md:text-2xl text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base">
                          {feature.content}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div
                className={cn(
                  'relative order-1 h-[220px] overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-b from-white to-blue-50 md:order-2 md:h-[320px] lg:h-[420px]'
                )}
              >
                {safeFeatures.map((feature, index) => (
                  <div
                    key={index}
                    ref={el => (imageRefs.current[index] = el)}
                    className="absolute inset-0 overflow-hidden rounded-xl"
                    style={{ opacity: 0, zIndex: 1, pointerEvents: 'none' }}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
