import type { CardData } from '@/types/card.type';
import { url } from '@/lib/axios';

export const getCardData = async () => {
  const response = await fetch(`${url}/activity`, { cache: 'no-cache' });
  const data = (await response.json()) as CardData[];
  return data;
};
