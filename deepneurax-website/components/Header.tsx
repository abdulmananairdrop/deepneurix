'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'

interface HeaderProps {
  logo?: {
    asset?: {
      url: string
    }
  }
  logoLight?: {
    asset?: {
      url: string
    }
  }
  siteName?: string
}

export default function Header({ logo, logoLight, siteName }: HeaderProps = {}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setScrolled(window.scrollY > heroHeight * 0.15)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slide down
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )

      // Logo fade in
      gsap.fromTo(logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      )

      // Nav items stagger
      if (navItemsRef.current) {
        const navItems = navItemsRef.current.querySelectorAll('.nav-item')
        gsap.fromTo(navItems,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.4, ease: 'power2.out' }
        )
      }

      // CTA slide in
      gsap.fromTo(ctaRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      )
    })

    return () => ctx.revert()
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
        const items = mobileMenuRef.current.querySelectorAll('.mobile-nav-item')
        gsap.fromTo(items,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1, ease: 'power2.out' }
        )
      } else {
        gsap.to(mobileMenuRef.current,
          { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }
        )
      }
    }
  }, [mobileMenuOpen])

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Blog', href: '#blog' },
    { label: 'About', href: '#about' },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed z-50 left-0 right-0 top-0 transition-[background,padding,box-shadow,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled
            ? 'bg-white/90 backdrop-blur-xl py-3 shadow-lg shadow-black/5 rounded-2xl border border-gray-100 left-4 right-4 top-4'
            : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent py-5 border-transparent'}
        `}
        style={{
          maxWidth: scrolled ? 'calc(100% - 32px)' : '100%',
          margin: scrolled ? '0 auto' : undefined,
          transition: 'background 0.5s cubic-bezier(0.4,0,0.2,1), padding 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.5s cubic-bezier(0.4,0,0.2,1), backdrop-filter 0.5s cubic-bezier(0.4,0,0.2,1)'
        }}
      >
        <nav className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div ref={logoRef} className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                {(logo || logoLight) ? (
                  <div className="relative h-10 w-auto transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={scrolled ? (logo?.asset?.url || logoLight?.asset?.url || '') : (logoLight?.asset?.url || logo?.asset?.url || '')}
                      alt={siteName || 'Site Logo'}
                      width={120}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <span className="text-white font-bold text-xl">∆N</span>
                    </div>
                    <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${
                      scrolled ? 'text-gray-900' : 'text-white'
                    }`}>
                      {siteName || 'DeepNeurax'}
                    </span>
                  </div>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div ref={navItemsRef} className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-item relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    scrolled
                      ? 'text-gray-600 hover:text-blue-600'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Underline effect */}
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    scrolled ? 'bg-blue-600' : 'bg-white'
                  }`} />
                  {/* Background hover */}
                  <span className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 ${
                    scrolled ? 'bg-blue-50' : 'bg-white/10'
                  }`} />
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div ref={ctaRef} className="hidden md:flex">
              <Link href="/contact">
                <button
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${
                    scrolled
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40'
                      : 'bg-white text-gray-900 shadow-lg hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    Contact Us
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
                scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`md:hidden overflow-hidden ${
              scrolled ? 'border-gray-100' : 'border-white/10'
            }`}
            style={{ height: 0, opacity: 0 }}
          >
            <div className={`flex flex-col space-y-1 pt-4 mt-4 border-t ${
              scrolled ? 'border-gray-100' : 'border-white/10'
            }`}>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`mobile-nav-item block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                    scrolled
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-item pt-2">
                <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
