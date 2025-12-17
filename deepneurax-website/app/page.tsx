import { fetchAPI, getStrapiMedia } from '@/lib/strapi/client'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MetricsCounter from '@/components/MetricsCounter'
import ServicesGrid from '@/components/ServicesGrid'
import ProductCarousel from '@/components/ProductCarousel'
import WhyChooseUsSection from '@/components/WhyChooseUsSection'
import CaseStudiesScroll from '@/components/CaseStudiesScroll'
import { TestimonialsSection } from '@/components/blocks/testimonials-with-marquee'
import BlogGrid from '@/components/BlogGrid'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

const transformMedia = (media: any) => {
  const dataNode = Array.isArray(media?.data) ? media.data[0] : media?.data ?? media
  const url = dataNode?.attributes?.url ?? dataNode?.url
  return url ? { asset: { url: getStrapiMedia(url) } } : null
}

const normalizeEntity = <T,>(entity: any): T | null => {
  if (!entity) return null
  const attributes = entity.attributes ?? entity
  return { id: entity.id, ...attributes } as T
}

const normalizeCollection = <T,>(collection: any[] | undefined) =>
  (collection ?? [])
    .map(item => normalizeEntity<T>(item))
    .filter(Boolean) as T[]

async function getPageData() {
  try {
    const [
      heroData,
      servicesData,
      productsData,
      featuresData,
      whyChooseUsData,
      metricsData,
      caseStudiesData,
      testimonialsData,
      blogPostsData,
      ctaData,
      footerData
    ] = await Promise.all([
      fetchAPI('/hero', { populate: '*' }, { revalidate: 120 }).catch(() => ({ data: null })),
      fetchAPI('/services', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/products', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/features', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/why-choose-us', { populate: { items: { populate: '*' } } }, { revalidate: 120 }).catch(() => ({ data: null })),
      fetchAPI('/metrics', { populate: '*', sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
      fetchAPI('/case-studies', { populate: { backgroundImage: { populate: '*' } }, sort: 'order:asc' }, { revalidate: 120 }).catch(() => ({ data: [] })),
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
            const videoNode = video?.attributes ?? video
            const videoAsset = transformMedia(videoNode?.video)
            return {
              video: videoAsset?.asset?.url ? { url: videoAsset.asset.url } : null,
              videoUrl: videoNode?.videoUrl,
              thumbnail: transformMedia(videoNode?.thumbnail),
              duration: videoNode?.duration || 10,
            }
          }),
        }
      : null

    const services = normalizeCollection<any>(servicesData?.data).map(service => ({
      ...service,
      image: transformMedia(service.image),
    }))

    const products = normalizeCollection<any>(productsData?.data).map(product => ({
      ...product,
      image: transformMedia(product.image),
    }))

    const features = normalizeCollection<any>(featuresData?.data).map(feature => ({
      ...feature,
      image: transformMedia(feature.image),
    }))

    const whyChooseUsEntity = normalizeEntity<any>(whyChooseUsData?.data)
    const whyChooseUs = whyChooseUsEntity
      ? {
          sectionTitle: whyChooseUsEntity.sectionTitle || 'Why Choose Us',
          sectionDescription:
            whyChooseUsEntity.sectionDescription ||
            'We deliver exceptional results through innovation, expertise, and dedication',
          items: (whyChooseUsEntity.items ?? [])
            .map((item: any) => {
              const node = item?.attributes ?? item
              const image = transformMedia(node.image)
              return {
                image: image?.asset?.url || 'https://picsum.photos/900/900?grayscale',
                link: node.link || '#',
                title: node.title,
                description: node.description,
                order: node.order || 0,
              }
            })
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)),
        }
      : null

    const metrics = normalizeCollection<any>(metricsData?.data)

    const caseStudies = normalizeCollection<any>(caseStudiesData?.data)
      .map(study => ({
        ...study,
        backgroundImage: transformMedia(study.backgroundImage),
        bulletPoints: Array.isArray(study.bulletPoints) ? study.bulletPoints : [],
      }))
      .filter((study: any) => study.isActive !== false)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))

    const testimonials = normalizeCollection<any>(testimonialsData?.data).map(testimonial => ({
      ...testimonial,
      avatar: transformMedia(testimonial.avatar),
    }))

    const blogPosts = normalizeCollection<any>(blogPostsData?.data).map(post => ({
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

    return {
      hero,
      services,
      products,
      features,
      whyChooseUs,
      metrics,
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
      
      {data.metrics && data.metrics.length > 0 && (
        <MetricsCounter metrics={data.metrics} />
      )}
      
      {/* Core Services – sticky heading only */}
      {data.services && (
        <ServicesGrid services={data.services} />
      )}
      
      {data.products && data.products.length > 0 && (
        <ProductCarousel products={data.products} />
      )}
      
      {data.whyChooseUs && data.whyChooseUs.items && data.whyChooseUs.items.length > 0 ? (
        <WhyChooseUsSection
          sectionTitle={data.whyChooseUs.sectionTitle}
          sectionDescription={data.whyChooseUs.sectionDescription}
          items={data.whyChooseUs.items}
        />
      ) : (
        <section id="why-choose-us" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                Content not yet published. Please add content in Strapi admin at Settings → Why Choose Us
              </p>
              <div className="bg-gray-100 p-8 rounded-lg max-w-2xl mx-auto">
                <p className="text-sm text-gray-600">
                  To display this section:
                </p>
                <ol className="text-left mt-4 space-y-2 text-sm text-gray-700">
                  <li>1. Go to Strapi Admin → Content Manager → Why Choose Us</li>
                  <li>2. Fill in Section Title and Description</li>
                  <li>3. Add items with images, titles, and descriptions</li>
                  <li>4. Click Publish</li>
                  <li>5. Go to Settings → Roles → Public → Enable 'find' for Why-choose-us</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {data.caseStudies && data.caseStudies.length > 0 && (
        <CaseStudiesScroll caseStudies={data.caseStudies} />
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
          products={data.products || []} 
        />
      )}
    </div>
  )
}
