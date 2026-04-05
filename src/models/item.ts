export interface Item {
  id: number;
  name: string;
  description: string;
}

export type ItemInput = Omit<Item, 'id'>;
