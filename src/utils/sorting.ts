import type { Offer } from '../types/offer';
import type { SortingOption } from '../types/sorting';

const SORT_COMPARATORS: Record<SortingOption, (first: Offer, second: Offer) => number> = {
  popular: () => 0,
  'price-low-to-high': (first, second) => first.price - second.price,
  'price-high-to-low': (first, second) => second.price - first.price,
  'top-rated-first': (first, second) => second.rating - first.rating,
};

export const sortOffers = (offers: Offer[], sorting: SortingOption): Offer[] =>
  [...offers].sort(SORT_COMPARATORS[sorting]);
