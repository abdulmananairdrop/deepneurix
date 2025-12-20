import { fetchAPI } from './client'

export async function fetchMetricsSection() {
  return fetchAPI('/metrics-section', { populate: { coreValues: '*' } }, { revalidate: 120 })
}
