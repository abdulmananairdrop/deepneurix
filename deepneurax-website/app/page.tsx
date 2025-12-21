import ImageSphereSection from './ImageSphereSection';
import { fetchAPI } from '@/lib/strapi/client';
import { normalizeEntity, normalizeCollection, transformMedia } from '@/lib/strapi/utils';
import BlogGrid from '@/components/BlogGrid';
import CaseStudiesScroll from '@/components/CaseStudiesScroll';
import CoreServicesSection from '@/components/CoreServicesSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MetricsCounter from '@/components/MetricsCounter';
import ProductCarousel from '@/components/ProductCarousel';
import ScrollMorphHero from '@/components/ui/scroll-morph-hero';
import { TestimonialsSection } from '@/components/blocks/testimonials-with-marquee';

async function getPageData() {
  try {
    const [
      heroData,
      servicesData,
      productsData,
      sphereShowcaseData,
      metricsData,
      aboutUsData,
      featuresSectionData,
      caseStudiesSectionData,
      caseStudiesData,
      testimonialsData,
      blogPostsData,
      ctaData,
      footerData
    ] = await Promise.all([
      fetchAPI('/hero', { populate: '*' }, { revalidate: 120 }).catch(() => ({ data: null })),
      fetchAPI('/services', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/products', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/sphere-showcase', { populate: { items: { populate: 'image' } } }, { revalidate: 120 }).catch(() => ({ data: null })),
      fetchAPI('/metrics', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/about-us', { populate: { coreValues: '*' } }, { revalidate: 120 }).catch(() => ({ data: null })),
      fetchAPI('/features-section', { populate: ['images'] }, { revalidate: 120 }).catch((err) => {
        console.error('Failed to fetch features-section:', err);
        return { data: null };
      }),
      fetchAPI('/case-studies-section', { populate: '*' }, { revalidate: 120 }).catch(() => ({ data: null })),
      fetchAPI('/case-studies', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/testimonials', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/blog-posts', { populate: '*', sort: 'publishedAt:desc', pagination: { limit: 6 } }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/cta', { populate: '*' }, { revalidate: 120 }).catch(() => ({ data: null })),
      fetchAPI('/footer', { populate: '*' }, { revalidate: 120 }).catch(() => ({ data: null }))
    ])

    const heroEntity = normalizeEntity<any>(heroData?.data)
    const hero = heroEntity
      ? {
          ...heroEntity,
          backgroundImage: transformMedia(heroEntity.backgroundImage),
          backgroundVideos: (heroEntity.backgroundVideos ?? []).map((video: any) => {
            const videoNode = normalizeEntity<any>(video)
            return {
              video: transformMedia(videoNode?.video)?.asset?.url || null,
              videoUrl: videoNode?.videoUrl,
              thumbnail: transformMedia(videoNode?.thumbnail),
              duration: videoNode?.duration || 10,
            }
          }),
        }
      : null

    const services = normalizeCollection<any>(servicesData).map(service => ({
      ...service,
      image: transformMedia(service.image),
    }))

    const products = normalizeCollection<any>(productsData).map(product => ({
      ...product,
      image: transformMedia(product.image),
    }))

    const sphereShowcaseEntity = normalizeEntity<any>(sphereShowcaseData?.data)
    const sphereShowcase = sphereShowcaseEntity
      ? {
          sectionTitle: sphereShowcaseEntity.sectionTitle || 'Explore Our Features',
          sectionDescription:
            sphereShowcaseEntity.sectionDescription ||
            'We deliver exceptional results through innovation, expertise, and dedication',
          items: (sphereShowcaseEntity.items ?? [])
            .map((item: any) => {
              const node = normalizeEntity<any>(item)
              return {
                id: item.id || node?.id,
                image: transformMedia(node?.image)?.asset?.url,
                link: node?.link || '#',
                title: node?.title,
                description: node?.description,
                order: node?.order || 0,
              }
            })
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)),
        }
      : null

    const metrics = normalizeCollection<any>(metricsData)

    const caseStudies = normalizeCollection<any>(caseStudiesData)
      .map(study => ({
        ...study,
        description: study.description || '',
        backgroundImage: transformMedia(study.backgroundImage),
        bulletPoints: Array.isArray(study.bulletPoints) ? study.bulletPoints : [],
      }))
      .filter((study: any) => study.isActive !== false)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))

    const testimonials = normalizeCollection<any>(testimonialsData).map(testimonial => ({
      ...testimonial,
      avatar: transformMedia(testimonial.avatar),
    }))

    const blogPosts = normalizeCollection<any>(blogPostsData).map(post => ({
      ...post,
      coverImage: transformMedia(post.coverImage),
    }))

    const cta = normalizeEntity<any>(ctaData?.data)

    const footerEntity = normalizeEntity<any>(footerData?.data)
    const footer = footerEntity
      ? {
          ...footerEntity,
          siteLogo: transformMedia(footerEntity.siteLogo),
          siteLogoLight: transformMedia(footerEntity.siteLogoLight),
        }
      : null

    // About Us Section (Who We Are + Core Values)
    const aboutUsEntity = normalizeEntity<any>(aboutUsData?.data)
    const aboutUs = aboutUsEntity
      ? {
          whoWeAreHeading: aboutUsEntity.whoWeAreHeading || 'Who We Are',
          whoWeAreDescription: aboutUsEntity.whoWeAreDescription || '',
          coreValuesHeading: aboutUsEntity.coreValuesHeading || 'Our Core Values',
          coreValues: (aboutUsEntity.coreValues ?? []).map((item: any) => {
            const node = normalizeEntity<any>(item)
            return {
              title: node?.title,
              description: node?.description,
              icon: node?.icon,
            }
          }),
        }
      : null

    const featuresSectionEntity = normalizeEntity<any>(featuresSectionData?.data);
    const scrollMorphHeroData = featuresSectionEntity ? {
        introHeading: featuresSectionEntity.introHeading,
        introSubheading: featuresSectionEntity.introSubheading,
        sectionTitle: featuresSectionEntity.sectionTitle,
        sectionDescription: featuresSectionEntity.sectionDescription,
        images: normalizeCollection<any>(featuresSectionEntity.images).map((img: any) => ({
            url: transformMedia(img)?.asset?.url
        })).filter(img => img.url)
    } : null;

    const caseStudiesSectionEntity = normalizeEntity<any>(caseStudiesSectionData?.data);
    const caseStudiesSection = caseStudiesSectionEntity ? {
        title: caseStudiesSectionEntity.title || 'Case Studies',
        description: caseStudiesSectionEntity.description || ''
    } : null;

    return {
      hero,
      services,
      products,
      sphereShowcase,
      metrics,
      aboutUs,
      scrollMorphHeroData,
      caseStudiesSection,
      caseStudies,
      testimonials,
      blogPosts,
      cta,
      footer,
    }
  } catch (error) {
    console.error('Error fetching data from Strapi:', error)
    return null
  }
}

export default async function Home() {
  const data = await getPageData()

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-8">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-4xl">∆N</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to DeepNeurax
            </h1>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚀 Setup Required
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              To get started, you need to configure your Strapi CMS backend:
            </p>
            
            <div className="text-left space-y-4 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">1.</span>
                <div>
                  <p className="text-gray-900 font-semibold">Setup Strapi Backend</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Install and run Strapi locally or use a hosted instance
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">2.</span>
                <div>
                  <p className="text-gray-900 font-semibold">Update .env.local</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Add your Strapi URL and API token to the .env.local file
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">3.</span>
                <div>
                  <p className="text-gray-900 font-semibold">Create Content Types</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Setup your content types in Strapi admin panel
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">4.</span>
                <div>
                  <p className="text-gray-900 font-semibold">Restart the server</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Stop and restart npm run dev
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">
            📚 Need help? Check the <span className="text-blue-600 font-semibold">SETUP_GUIDE.md</span> file in your project folder
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <Header 
        logo={data.footer?.siteLogo}
        logoLight={data.footer?.siteLogoLight}
        siteName={data.footer?.siteName}
      />
      
      {data.hero && <HeroSection data={data.hero} />}
      
      {/* Enhanced Metrics Section (Who We Are + Core Values + Metrics) */}
      {data.aboutUs && data.metrics && data.metrics.length > 0 && (
        <MetricsCounter 
          metrics={data.metrics}
          metricsSection={data.aboutUs}
        />
      )}
      
      {/* Core Services replaced with ExpandOnHover interactive cards using backend data */}

      {data.services && data.services.length > 0 && (
        <CoreServicesSection services={data.services} />
      )}
      
      {data.products && data.products.length > 0 && (
        <ProductCarousel products={data.products} />
      )}
      
      <ScrollMorphHero data={data.scrollMorphHeroData || undefined} />
      
      {data.sphereShowcase && data.sphereShowcase.items && data.sphereShowcase.items.length > 0 && (
        <ImageSphereSection data={data.sphereShowcase} />
      )}
      
      {data.caseStudies && data.caseStudies.length > 0 && (
        <CaseStudiesScroll 
          caseStudies={data.caseStudies} 
          sectionData={data.caseStudiesSection || { title: 'Case Studies', description: '' }} 
        />
      )}
      
      {data.testimonials && data.testimonials.length > 0 && (() => {
        const mapped = data.testimonials
          .map((t: any) => {
            const source = t.attributes ?? t
            const avatarUrl = source.avatar?.asset?.url || source.avatar?.url || ''

            return {
              author: {
                name: source.author || source.name || source.title || 'Customer',
                handle: source.handle || source.role || '',
                avatar: avatarUrl,
              },
              text: source.text || source.quote || source.description || '',
              href: source.href || source.link,
            }
          })
          .filter((t: any) => t.text)

        return (
          <TestimonialsSection
            title="Trusted by developers worldwide"
            description="Join thousands of developers who are already building the future with our AI platform"
            testimonials={mapped}
          />
        )
      })()}
      
      {data.blogPosts && data.blogPosts.length > 0 && (
        <BlogGrid posts={data.blogPosts} />
      )}
      
      {data.cta && <CtaSection data={data.cta} />}
      
      {data.footer && (
        <Footer 
          data={data.footer} 
          services={data.services || []} 
        />
      )}
    </div>
  )
}
