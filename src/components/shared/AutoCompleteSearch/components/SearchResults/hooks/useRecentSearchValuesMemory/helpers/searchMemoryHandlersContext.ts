/* eslint-disable @typescript-eslint/no-unused-vars */

import { Dispatch, SetStateAction } from "react";
import { DEFAULT_MAX_AMOUNT_OF_RECENT_SEARCHES } from "../../../components/RecentSearchValues/const";

const SearchMemoryHandlersContext = (
  searchFieldCodeName: string,
  setMemorizedSearchedValues: Dispatch<SetStateAction<string[]>>
) => {
  const handlers = {
    putFirstSearchValue: (newSearchValue: string) => {
      const values = [newSearchValue];
      localStorage.setItem(searchFieldCodeName, JSON.stringify(values));
      setMemorizedSearchedValues(values);
    },
    removeFirstSearchValue: (recentlySearchedValues: string[]) => {
      const [_removedItem, ...notRemovedItems] = recentlySearchedValues;
      return notRemovedItems;
    },
    putNewSearchValueAtTheEnd: (
      newSearchValue: string,
      recentlySearchedValues: string[]
    ) => {
      const values = [...recentlySearchedValues, newSearchValue];
      localStorage.setItem(
        searchFieldCodeName,
        JSON.stringify([...recentlySearchedValues, newSearchValue])
      );
      setMemorizedSearchedValues(values);
    },
    update: (
      newSearchValue: string,
      recentlySearchedValues: string[],
      maxAmountOfRecentSearchValuesToShow: number = DEFAULT_MAX_AMOUNT_OF_RECENT_SEARCHES
    ) => {
      if (recentlySearchedValues.includes(newSearchValue)) {
        return;
      }

      if (recentlySearchedValues.length < maxAmountOfRecentSearchValuesToShow) {
        handlers.putNewSearchValueAtTheEnd(
          newSearchValue,
          recentlySearchedValues
        );
        return;
      }

      const recentlySearchedValuesWithFreeSlot =
        handlers.removeFirstSearchValue(recentlySearchedValues);

      const updatedRecentSearchValues = [
        ...recentlySearchedValuesWithFreeSlot,
        newSearchValue,
      ];

      const values =
        updatedRecentSearchValues.length > 1
          ? // Making sure user will see unique search values
            [...new Set(updatedRecentSearchValues)]
          : updatedRecentSearchValues;

      localStorage.setItem(searchFieldCodeName, JSON.stringify(values));
      setMemorizedSearchedValues(values);
    },
  };

  return handlers;
};

export default SearchMemoryHandlersContext;
