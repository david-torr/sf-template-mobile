export type Position = 'GK' | 'DEF' | 'MID' | 'FWD'

export interface Player {
  id: string
  name: string
  number: number
  position: Position
  nationality: string
  imageUrl: string
}

export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Tim Melia',
    number: 29,
    position: 'GK',
    nationality: 'USA',
    imageUrl: 'https://picsum.photos/seed/player1/200/200',
  },
  {
    id: '2',
    name: 'Roberto Leyva',
    number: 5,
    position: 'DEF',
    nationality: 'Mexico',
    imageUrl: 'https://picsum.photos/seed/player2/200/200',
  },
  {
    id: '3',
    name: 'Andreu Fontàs',
    number: 3,
    position: 'DEF',
    nationality: 'Spain',
    imageUrl: 'https://picsum.photos/seed/player3/200/200',
  },
  {
    id: '4',
    name: 'Gadi Kinda',
    number: 10,
    position: 'MID',
    nationality: 'Israel',
    imageUrl: 'https://picsum.photos/seed/player4/200/200',
  },
  {
    id: '5',
    name: 'Roger Espinoza',
    number: 27,
    position: 'MID',
    nationality: 'Honduras',
    imageUrl: 'https://picsum.photos/seed/player5/200/200',
  },
  {
    id: '6',
    name: 'Remi Walter',
    number: 6,
    position: 'MID',
    nationality: 'France',
    imageUrl: 'https://picsum.photos/seed/player6/200/200',
  },
  {
    id: '7',
    name: 'Dániel Sallói',
    number: 20,
    position: 'FWD',
    nationality: 'Hungary',
    imageUrl: 'https://picsum.photos/seed/player7/200/200',
  },
  {
    id: '8',
    name: 'Alan Pulido',
    number: 9,
    position: 'FWD',
    nationality: 'Mexico',
    imageUrl: 'https://picsum.photos/seed/player8/200/200',
  },
]
