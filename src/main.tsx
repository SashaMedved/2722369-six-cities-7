import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CitiesList from './component/cities-list/cities-list';
import OffersList from './component/offersList/OffersList';
import Map from './component/map/Map';
import Sorting from './component/sorting/sorting';
import { CITIES, CITY_NAMES, DEFAULT_SORTING } from './const';
import { changeCity } from './store/action';
import { sortOffers } from './utils/sorting';
import type { CityName } from './types/offer';
import type { SortingOption } from './types/sorting';
import type { State } from './types/state';

function Main(): JSX.Element {
  const city = useSelector((state: State) => state.city);
  const offers = useSelector((state: State) => state.offers);
  const dispatch = useDispatch();

  const [currentSorting, setCurrentSorting] = useState<SortingOption>(DEFAULT_SORTING);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const cityOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
    [offers, city],
  );

  const sortedOffers = useMemo(
    () => sortOffers(cityOffers, currentSorting),
    [cityOffers, currentSorting],
  );

  const handleCityChange = (newCity: CityName) => {
    dispatch(changeCity(newCity));
  };

  const handleSortingChange = (sorting: SortingOption) => {
    setCurrentSorting(sorting);
  };

  const handleCardHover = (id: string | null) => {
    setActiveOfferId(id);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITY_NAMES}
              currentCity={city}
              onCityChange={handleCityChange}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
              <Sorting
                currentSorting={currentSorting}
                onSortingChange={handleSortingChange}
              />
              <OffersList
                offers={sortedOffers}
                activeOfferId={activeOfferId}
                onCardHover={handleCardHover}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={CITIES[city]} offers={sortedOffers} activeOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
