export interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  imageUrl: string
}

export const mockNews: Article[] = [
  {
    id: '1',
    title: 'Match Preview: SKC vs LA Galaxy',
    excerpt: "Everything you need to know ahead of Saturday's clash.",
    category: 'PREVIEW',
    date: '2026-03-18',
    imageUrl: 'https://picsum.photos/seed/news1/800/450',
  },
  {
    id: '2',
    title: 'Jovelic Scores Hat-Trick in Training',
    excerpt: 'The forward is in fine form ahead of the weekend.',
    category: 'TRAINING',
    date: '2026-03-17',
    imageUrl: 'https://picsum.photos/seed/news2/800/450',
  },
  {
    id: '3',
    title: 'New Kit Revealed for 2026 Season',
    excerpt: 'The club has unveiled its stunning new home and away kits.',
    category: 'CLUB NEWS',
    date: '2026-03-16',
    imageUrl: 'https://picsum.photos/seed/news3/800/450',
  },
  {
    id: '4',
    title: 'Academy Graduate Signs First Pro Deal',
    excerpt: 'Promising teenager pens three-year contract with the club.',
    category: 'TRANSFERS',
    date: '2026-03-15',
    imageUrl: 'https://picsum.photos/seed/news4/800/450',
  },
  {
    id: '5',
    title: 'Match Report: SKC 3-1 Minnesota United',
    excerpt: "Three goals and a clean sheet — what a night at Children's Mercy Park.",
    category: 'MATCH REPORT',
    date: '2026-03-14',
    imageUrl: 'https://picsum.photos/seed/news5/800/450',
  },
]
