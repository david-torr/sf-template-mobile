export type FixtureStatus = 'upcoming' | 'live' | 'result'

export interface Fixture {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  date: string
  time: string
  competition: string
  status: FixtureStatus
}

export const mockFixtures: Fixture[] = [
  {
    id: '1',
    homeTeam: 'Sporting KC',
    awayTeam: 'Minnesota United',
    homeScore: 3,
    awayScore: 1,
    date: '2026-03-14',
    time: '19:30',
    competition: 'MLS',
    status: 'result',
  },
  {
    id: '2',
    homeTeam: 'Portland Timbers',
    awayTeam: 'Sporting KC',
    homeScore: 1,
    awayScore: 1,
    date: '2026-03-08',
    time: '17:00',
    competition: 'MLS',
    status: 'result',
  },
  {
    id: '3',
    homeTeam: 'Sporting KC',
    awayTeam: 'LA Galaxy',
    homeScore: 2,
    awayScore: 2,
    date: '2026-03-17',
    time: '20:00',
    competition: 'MLS',
    status: 'live',
  },
  {
    id: '4',
    homeTeam: 'Sporting KC',
    awayTeam: 'Colorado Rapids',
    homeScore: null,
    awayScore: null,
    date: '2026-03-22',
    time: '19:30',
    competition: 'MLS',
    status: 'upcoming',
  },
  {
    id: '5',
    homeTeam: 'Austin FC',
    awayTeam: 'Sporting KC',
    homeScore: null,
    awayScore: null,
    date: '2026-03-28',
    time: '20:30',
    competition: 'MLS',
    status: 'upcoming',
  },
  {
    id: '6',
    homeTeam: 'Sporting KC',
    awayTeam: 'Real Salt Lake',
    homeScore: null,
    awayScore: null,
    date: '2026-04-04',
    time: '19:30',
    competition: 'MLS',
    status: 'upcoming',
  },
]
