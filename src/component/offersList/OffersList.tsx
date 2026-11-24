import { useState } from 'react';
import PlaceCard from '../placeCard/PlaceCard';
import type { PlaceCardVariant } from '../placeCard/PlaceCard';
import type { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  variant?: PlaceCardVariant;
  listClassName?: string;
  activeOfferId?: string | null;
  onCardHover?: (id: string | null) => void;
};

function OffersList({
  offers,
  variant = 'cities',
  listClassName = 'cities__places-list places__list tabs__content',
  activeOfferId,
  onCardHover,
}: OffersListProps): JSX.Element {
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  const currentActiveOfferId = activeOfferId === undefined ? hoveredOfferId : activeOfferId;

  const handleCardHover = (id: string | null) => {
    setHoveredOfferId(id);
    onCardHover?.(id);
  };

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={variant}
          isActive={offer.id === currentActiveOfferId}
          onCardHover={handleCardHover}
        />
      ))}
    </div>
  );
}

export default OffersList;
