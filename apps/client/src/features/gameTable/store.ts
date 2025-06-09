import { atom } from 'nanostores';

export type ZoneType =
  | '_system'
  | 'handTop'
  | 'deckTop'
  | 'graveyardTop'
  | 'questsTop'
  | 'sideboardTop'
  | 'handBottom'
  | 'deckBottom'
  | 'graveyardBottom'
  | 'questsBottom'
  | 'sideboardBottom'
  | 'gameZone';


export type OwnerType =
  | 'top'
  | 'bottom';

export type CardType =
  | 'card'
  | 'coin';

export interface IGameTableCard {
  id: string;
  owner: OwnerType;
  type: CardType;
  zone: ZoneType;
  x: number;
  y: number;
  width: number;
  height: number;
  setNumber: number;
  cardNumber: number;
  isActive: boolean;
  isClosed: boolean;
  isFaceDown: boolean;
  counterRed: number;
  counterGreen: number;
  counterWhite: number;
  counterBlack: number;
}

export type IGameTableCards = Record<ZoneType, IGameTableCard[]>;

export interface IGameTableStore extends IGameTableCards {
  activeZoneTop: ZoneType;
  activeZoneBottom: ZoneType;
  activeZoneMenu: ZoneType | null;
  gameZoneRef: HTMLDivElement | null;
  activeGameTableCard: IGameTableCard | null;
  isDragging: boolean;
}

export const initialState: IGameTableStore = {
  activeZoneTop: 'handTop',
  activeZoneBottom: 'handBottom',
  activeZoneMenu: null,

  gameZoneRef: null,
  activeGameTableCard: null,

  isDragging: false,

  _system: [],
  handTop: [],
  deckTop: [],
  graveyardTop: [],
  questsTop: [],
  sideboardTop: [],

  handBottom: [],
  deckBottom: [],
  graveyardBottom: [],
  questsBottom: [],
  sideboardBottom: [],

  gameZone: [],
};

export const $gameTableStore = atom<IGameTableStore>(initialState);
