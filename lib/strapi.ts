const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_URL ?? ''
const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN ?? ''

export async function fetchStrapi<T = unknown>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}/api/${endpoint}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    },
  })
  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} (${url})`)
  }
  const json = await res.json()
  return json?.data ?? json
}

// Stub data fetchers — swap for real Strapi calls when backend is ready

export async function getArticles(): Promise<unknown[]> {
  return []
}

export async function getFixtures(): Promise<unknown[]> {
  return []
}

export async function getPlayers(): Promise<unknown[]> {
  return []
}
