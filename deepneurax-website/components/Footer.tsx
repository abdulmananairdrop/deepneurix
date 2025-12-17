'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FooterData {
  siteLogo?: { asset?: { url: string } }
  siteLogoLight?: { asset?: { url: string } }
  siteName?: string
  companyDescription?: string
  socialLinks?: Array<{
    platform: string
    url: string
    icon?: string
  }>
  contactEmail?: string
  contactPhone?: string
  address?: string
  copyrightText: string
}

interface FooterProps {
  data: FooterData
  services: Array<{ title: string; link?: string }>
  products: Array<{ name: string; link?: string }>
}

export default function Footer({ data, services, products }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer columns stagger animation
      gsap.fromTo('.footer-col',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.footer-grid', start: 'top 90%' }
        }
      )

      // Bottom bar animation
      gsap.fromTo('.footer-bottom',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%' }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="footer-grid grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="footer-col">
            <Link href="/" className="flex items-center space-x-3 mb-4 group w-fit">
              {(data.siteLogoLight || data.siteLogo) ? (
                <div className="relative h-10 w-auto">
                  <Image
                    src={data.siteLogoLight?.asset?.url || data.siteLogo?.asset?.url || ''}
                    alt={data.siteName || 'Site Logo'}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">∆N</span>
                  </div>
                  <span className="text-white font-bold text-xl">{data.siteName || 'DeepNeurax'}</span>
                </>
              )}
            </Link>
            
            {data.companyDescription && (
              <p className="text-white/70 mb-6 leading-relaxed">
                {data.companyDescription}
              </p>
            )}

            {data.socialLinks && data.socialLinks.length > 0 && (
              <div className="flex gap-4">
                {data.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.platform}
                  >
                    {social.icon || '🔗'}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service, index) => (
                <li key={index}>
                  {service.link ? (
                    <Link
                      href={service.link}
                      className="text-white/70 hover:text-blue-400 transition-colors duration-300"
                    >
                      {service.title}
                    </Link>
                  ) : (
                    <span className="text-white/70">{service.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h3 className="text-white font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              {products.slice(0, 6).map((product, index) => (
                <li key={index}>
                  {product.link ? (
                    <Link
                      href={product.link}
                      className="text-white/70 hover:text-blue-400 transition-colors duration-300"
                    >
                      {product.name}
                    </Link>
                  ) : (
                    <span className="text-white/70">{product.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {data.contactEmail && (
                <li>
                  <a
                    href={`mailto:${data.contactEmail}`}
                    className="text-white/70 hover:text-blue-400 transition-colors duration-300 flex items-start gap-2"
                  >
                    <span>📧</span>
                    <span>{data.contactEmail}</span>
                  </a>
                </li>
              )}
              {data.contactPhone && (
                <li>
                  <a
                    href={`tel:${data.contactPhone}`}
                    className="text-white/70 hover:text-blue-400 transition-colors duration-300 flex items-start gap-2"
                  >
                    <span>📞</span>
                    <span>{data.contactPhone}</span>
                  </a>
                </li>
              )}
              {data.address && (
                <li className="text-white/70 flex items-start gap-2">
                  <span>📍</span>
                  <span>{data.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              {data.copyrightText}
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-blue-400 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-blue-400 text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
