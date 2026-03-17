import type { Article } from '../constants/mock/news'
import type { Fixture } from '../constants/mock/fixtures'

const STRAPI_URL   = process.env.EXPO_PUBLIC_STRAPI_URL
const STRAPI_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN

// ── Core fetch helper ─────────────────────────────────────────────────────────
// Returns json.data on success, null on any error (network, non-2xx, missing URL)

async function fetchStrapi<T>(endpoint: string): Promise<T | null> {
  try {
    if (!STRAPI_URL) return null
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

// ── Strapi v5 response shapes ─────────────────────────────────────────────────
// Strapi v5 returns flat objects (no nested `attributes`).
// Adjust field names here to match your actual content-type field names.

type StrapiArticle = {
  id: number | string
  title: string
  excerpt?: string
  category?: string
  publishedAt?: string
  cover?: { url: string } | null
}

type StrapiFixture = {
  id: number | string
  homeTeam: string
  awayTeam: string
  homeScore?: number | null
  awayScore?: number | null
  date: string
  time: string
  competition: string
  status: 'upcoming' | 'live' | 'result'
}

// ── Public data fetchers ──────────────────────────────────────────────────────
// Each returns a typed array on success, or null so callers can fall back to
// mock data without showing an error to the user.

export async function getArticles(): Promise<Article[] | null> {
  const data = await fetchStrapi<StrapiArticle[]>('articles?populate=*')
  if (!data?.length) return null
  return data.map(item => ({
    id:       String(item.id),
    title:    item.title ?? '',
    excerpt:  item.excerpt ?? '',
    category: item.category ?? '',
    date:     item.publishedAt ? item.publishedAt.slice(0, 10) : '',
    imageUrl: item.cover?.url ?? '',
  }))
}

export async function getFixtures(): Promise<Fixture[] | null> {
  const data = await fetchStrapi<StrapiFixture[]>('fixtures?populate=*')
  if (!data?.length) return null
  return data.map(item => ({
    id:          String(item.id),
    homeTeam:    item.homeTeam,
    awayTeam:    item.awayTeam,
    homeScore:   item.homeScore ?? null,
    awayScore:   item.awayScore ?? null,
    date:        item.date,
    time:        item.time,
    competition: item.competition,
    status:      item.status,
  }))
}

export async function getPlayers(): Promise<null> {
  // Placeholder — wire up when a Players content-type exists in Strapi
  return null
}
