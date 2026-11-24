import { useState } from 'react';
import { SORTING_LABELS, SORTING_OPTIONS } from '../../const';
import type { SortingOption } from '../../types/sorting';

type SortingProps = {
  currentSorting: SortingOption;
  onSortingChange: (sorting: SortingOption) => void;
};

function Sorting({ currentSorting, onSortingChange }: SortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const optionsClassName = isOpen
    ? 'places__options places__options--custom places__options--opened'
    : 'places__options places__options--custom';

  const handleSortingTypeClick = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const handleOptionClick = (sorting: SortingOption) => {
    onSortingChange(sorting);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortingTypeClick}
      >
        {SORTING_LABELS[currentSorting]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={optionsClassName}>
        {SORTING_OPTIONS.map((sorting) => {
          const optionClassName = sorting === currentSorting
            ? 'places__option places__option--active'
            : 'places__option';

          return (
            <li
              className={optionClassName}
              tabIndex={0}
              key={sorting}
              onClick={() => handleOptionClick(sorting)}
            >
              {SORTING_LABELS[sorting]}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default Sorting;
