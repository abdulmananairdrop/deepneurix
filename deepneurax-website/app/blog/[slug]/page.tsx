import { fetchAPI } from '@/lib/strapi/client'
import { normalizeEntity, normalizeCollection, transformMedia } from '@/lib/strapi/utils'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

interface BlogPost {
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  coverImage?: {
    asset: {
      url: string
    }
  }
  tags?: string[]
  content?: string
  author?: string
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetchAPI('/blog-posts', {
      filters: { slug: { $eq: slug } },
      populate: '*',
      pagination: { limit: 1 }
    })

    const postEntity = response?.data?.[0]
    if (!postEntity) return null

    const post = normalizeEntity<any>(postEntity)
    if (!post) return null

    return {
      title: post.title,
      slug: post.slug,
      publishedAt: post.publishedAt,
      excerpt: post.excerpt,
      coverImage: transformMedia(post.coverImage) || undefined,
      tags: post.tags,
      content: post.content,
      author: post.author
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function getLayoutData() {
  try {
    const [footerData, servicesData, productsData] = await Promise.all([
      fetchAPI('/footer', { populate: '*' }),
      fetchAPI('/services', { sort: 'order:asc' }),
      fetchAPI('/products', { sort: 'order:asc' })
    ])

    const footerEntity = normalizeEntity<any>(footerData?.data)
    const footer = footerEntity ? {
      ...footerEntity,
      siteLogo: transformMedia(footerEntity.siteLogo),
      siteLogoLight: transformMedia(footerEntity.siteLogoLight),
    } : null

    return {
      footer,
      services: normalizeCollection<any>(servicesData),
      products: normalizeCollection<any>(productsData)
    }
  } catch (error) {
    console.error('Error fetching layout data:', error)
    return { footer: null, services: [], products: [] }
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, layoutData] = await Promise.all([
    getBlogPost(slug),
    getLayoutData()
  ])

  if (!post) {
    notFound()
  }

  const { footer, services, products } = layoutData

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-white min-h-screen">
      <Header 
        logo={footer?.siteLogo}
        logoLight={footer?.siteLogoLight}
        siteName={footer?.siteName}
      />

      {/* Hero Section with Cover Image */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-gray-600 mb-8">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              {post.author && (
                <>
                  <span>•</span>
                  <span>By {post.author}</span>
                </>
              )}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>


      {/* Cover Image */}
      {post.coverImage?.asset?.url && (
        <section className="container mx-auto px-6 -mt-8 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.coverImage.asset.url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg prose-blue max-w-none">
            {post.content && (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-gray-600">
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
                      {children}
                    </ol>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            )}
          </article>

          {/* Back to Blog Link */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {footer && (
        <Footer data={footer} services={services} />
      )}
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const response = await fetchAPI('/blog-posts', { fields: ['slug'] })
    const posts = normalizeCollection<any>(response)

    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
