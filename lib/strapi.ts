import type { Article } from '../constants/mock/news'
import type { Fixture } from '../constants/mock/fixtures'
import type { Player } from '../constants/mock/players'

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

// ── Public data fetchers ──────────────────────────────────────────────────────
// Strapi v4 wraps all field values inside an `attributes` object.
// Media relations are nested: field.data.attributes.url

export async function getArticles(): Promise<Article[] | null> {
  const data = await fetchStrapi<any[]>('articles?populate=*')
  if (!data?.length) return null
  return data.map((item: any) => ({
    id:       String(item.id),
    title:    item.attributes.title,
    excerpt:  item.attributes.excerpt ?? '',
    category: item.attributes.category ?? 'NEWS',
    date:     item.attributes.publishedAt?.split('T')[0] ?? '',
    imageUrl: item.attributes.cover?.data?.attributes?.url
      ? `${STRAPI_URL}${item.attributes.cover.data.attributes.url}`
      : `https://picsum.photos/seed/${item.id}/800/450`,
  }))
}

export async function getFixtures(): Promise<Fixture[] | null> {
  const data = await fetchStrapi<any[]>('fixtures?populate=*')
  if (!data?.length) return null
  return data.map((item: any) => ({
    id:          String(item.id),
    homeTeam:    item.attributes.homeTeam,
    awayTeam:    item.attributes.awayTeam,
    homeScore:   item.attributes.homeScore ?? null,
    awayScore:   item.attributes.awayScore ?? null,
    date:        item.attributes.date ?? '',
    time:        item.attributes.time ?? '',
    competition: item.attributes.competition ?? '',
    status:      item.attributes.status ?? 'upcoming',
  }))
}

export async function getPlayers(): Promise<Player[] | null> {
  const data = await fetchStrapi<any[]>('players?populate=*')
  if (!data?.length) return null
  return data.map((item: any) => ({
    id:          String(item.id),
    name:        item.attributes.name,
    number:      item.attributes.number ?? 0,
    position:    item.attributes.position ?? 'MID',
    nationality: item.attributes.nationality ?? '',
    imageUrl:    item.attributes.photo?.data?.attributes?.url
      ? `${STRAPI_URL}${item.attributes.photo.data.attributes.url}`
      : `https://picsum.photos/seed/player${item.id}/200/200`,
  }))
}
