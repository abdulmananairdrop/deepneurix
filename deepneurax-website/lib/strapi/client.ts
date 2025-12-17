import qs from 'qs'
import { strapiUrl, strapiToken } from './env'

type FetchAPIOptions = RequestInit & {
  revalidate?: number
  next?: { revalidate?: number }
}

export async function fetchAPI(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: FetchAPIOptions = {}
) {
  const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true })
  const requestUrl = `${strapiUrl}/api${path}${queryString ? `?${queryString}` : ''}`

  const { revalidate = 60, headers, next, ...rest } = options

  try {
    const response = await fetch(requestUrl, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
        ...(headers || {}),
      },
      // Next.js ISR cache hint; ignored outside the Next runtime
      next: next ?? { revalidate },
    })

    if (!response.ok) {
      const bodyText = await response.text().catch(() => '')
      const isNotFound = response.status === 404

      // Return body (or null) for 404s instead of throwing to let callers gracefully fallback
      if (isNotFound) {
        try {
          return JSON.parse(bodyText || '{"data":null}')
        } catch (err) {
          return { data: null, error: bodyText || 'Not Found' }
        }
      }

      const errorMessage = `Strapi request failed: ${response.status} ${response.statusText} ${bodyText}`
      console.error(errorMessage)
      throw new Error(errorMessage)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching from Strapi:', error)
    throw error
  }
}

export function getStrapiURL(path = '') {
  return `${strapiUrl}${path}`
}

export function getStrapiMedia(url: string | null | undefined) {
  if (!url) {
    return null
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith('http') || url.startsWith('//')) {
    return url
  }

  // Otherwise prepend the Strapi URL
  return `${strapiUrl}${url}`
}

export const client = {
  fetch: fetchAPI,
  getURL: getStrapiURL,
  getMedia: getStrapiMedia,
}
