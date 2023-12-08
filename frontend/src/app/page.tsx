import Container from '@/components/Container';
import Card from '@/components/cards/Card';

import { getCardData } from '@/api/cardData.api';

export default async function Home() {
  const cardData = await getCardData();

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {cardData?.map((card) => <Card key={card.activity_id} data={card} />)}
      </div>
    </Container>
  );
}
