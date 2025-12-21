import { getStrapiMedia } from './client'

export const transformMedia = (media: any) => {
  if (!media) return null
  const dataNode = Array.isArray(media.data) ? media.data[0] : (media.data ?? media)
  const url = dataNode?.attributes?.url ?? dataNode?.url
  return url ? { asset: { url: getStrapiMedia(url) } } : null
}

export const normalizeEntity = <T,>(entity: any): T | null => {
  if (!entity) return null
  const attributes = entity.attributes ?? entity
  return { id: entity.id, ...attributes } as T
}

export const normalizeCollection = <T,>(collection: any[] | { data: any[] } | undefined): T[] => {
  const items = Array.isArray(collection) ? collection : collection?.data ?? []
  return items
    .map(item => normalizeEntity<T>(item))
    .filter(Boolean) as T[]
}
