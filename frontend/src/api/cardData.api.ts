import type { CardData } from '@/types/card.type';
import { url } from '@/lib/axios';

export const getCardData = async () => {
  const response = await fetch(`${url}/activity`, { next: { revalidate: 60 } });
  const data = (await response.json()) as CardData[];
  return data;
};
