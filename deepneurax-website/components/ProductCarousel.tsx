'use client'

import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Boxes, Cpu, Network, Sparkles, Layers, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Product {
  name: string
  icon?: string
  image?: {
    asset: {
      url: string
    }
  }
  description: string
  link?: string
  cardBackgroundColor?: string
  borderColor?: string
  titleColor?: string
  textColor?: string
}

// Map product names/icons to Lucide icons
const getProductIcon = (name: string, icon?: string) => {
  const nameLower = name.toLowerCase()
  if (icon === '📦' || nameLower.includes('platform')) return Boxes
  if (icon === '⚙️' || nameLower.includes('automl') || nameLower.includes('suite')) return Cpu
  if (icon === '📊' || nameLower.includes('viz') || nameLower.includes('analytics')) return Network
  if (nameLower.includes('ai')) return Sparkles
  return Layers
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.products-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.products-header', start: 'top 85%' }
        }
      )

      // Carousel container animation
      gsap.fromTo('.products-carousel',
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.products-carousel', start: 'top 80%' }
        }
      )

      // Navigation animation
      gsap.fromTo('.products-nav',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.products-nav', start: 'top 95%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [products.length])

  const getPosition = (index: number) => {
    const total = products.length
    let diff = index - activeIndex
    
    // Create infinite loop effect
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    
    const absPos = Math.abs(diff)
    
    // Horizontal positioning
    const x = diff * 420
    
    // Scale based on distance from center
    const scale = absPos === 0 ? 1.1 : absPos === 1 ? 0.9 : 0.75
    
    // Z-depth for 3D effect
    const z = absPos === 0 ? 0 : absPos === 1 ? -100 : -200
    
    // Opacity
    const opacity = absPos === 0 ? 1 : absPos === 1 ? 0.8 : absPos === 2 ? 0.6 : 0.3
    
    // Slight rotation for depth
    const rotateY = diff * 12

    return { x, z, scale, opacity, rotateY }
  }

  return (
    <section ref={sectionRef} id="products" className="py-32 bg-gradient-to-b from-gray-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="products-header text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Innovative solutions designed to accelerate your digital transformation
          </p>
        </div>

        {/* 3D Horizontal Carousel */}
        <div className="products-carousel relative h-[650px] flex items-center justify-center" style={{ perspective: '2000px' }}>
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {products.map((product, index) => {
              const position = getPosition(index)
              const isActive = index === activeIndex

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    x: position.x,
                    z: position.z,
                    scale: position.scale,
                    opacity: position.opacity,
                    rotateY: position.rotateY,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <div
                    className={`relative p-8 rounded-3xl border-2 backdrop-blur-sm transition-all duration-500 ${
                      isActive ? 'shadow-2xl border-blue-500' : 'shadow-lg'
                    }`}
                    style={{
                      width: '400px',
                      minHeight: '500px',
                      backgroundColor: product.cardBackgroundColor || 'rgba(255, 255, 255, 0.98)',
                      borderColor: product.borderColor || (isActive ? '#3b82f6' : '#e5e7eb'),
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    {/* Product Image or Icon */}
                    <div className="mb-6">
                      {product.image?.asset?.url ? (
                        <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={product.image.asset.url}
                            alt={product.name}
                            fill
                            sizes="400px"
                            className={`object-cover transition-transform duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}
                            priority={isActive}
                          />
                        </div>
                      ) : (
                        <motion.div 
                          className="flex items-center justify-center h-56"
                          animate={isActive ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1.1, 1],
                          } : {}}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                            {React.createElement(getProductIcon(product.name, product.icon), {
                              size: 64,
                              className: "text-white",
                              strokeWidth: 1.5
                            })}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3
                      className={`text-2xl font-bold mb-4 text-center transition-all duration-300 ${
                        isActive ? 'text-3xl' : ''
                      }`}
                      style={{ color: product.titleColor || '#111827' }}
                    >
                      {product.name}
                    </h3>

                    {/* Product Description */}
                    <p
                      className="text-center leading-relaxed mb-6 line-clamp-3"
                      style={{ color: product.textColor || '#6b7280' }}
                    >
                      {product.description}
                    </p>

                    {/* Explore Link */}
                    {product.link && isActive && (
                      <Link href={product.link} className="btn-primary flex items-center justify-center gap-2">
                        Explore Product
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="products-nav flex justify-center items-center gap-6 mt-16">
          {/* Previous Button */}
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + products.length) % products.length)}
            className="p-4 rounded-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
            aria-label="Previous product"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-3">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 h-3 bg-blue-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % products.length)}
            className="p-4 rounded-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
            aria-label="Next product"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
