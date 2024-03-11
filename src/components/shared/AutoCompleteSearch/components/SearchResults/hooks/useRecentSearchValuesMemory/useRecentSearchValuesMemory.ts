import { useEffect, useState } from "react";
import { SearchMemory } from "./helpers";
import { IUseRecentSearchValuesMemory } from "./types";
import { DEFAULT_MAX_AMOUNT_OF_RECENT_SEARCHES } from "../../components/RecentSearchValues/const";
import { SEARCH_VALUE_LENGTH_TO_TRIGGER_SEARCH } from "../../../../hooks/useSearchInput/const";

/**
 * **This hook handles search memory updates in order to show recently searched values by the user.**
 *
 * Uses in combination with `<RecentSearchValues />` component
 */
const useRecentSearchValuesMemory = ({
  searchFieldCodeName,
  searchValueWhichCausedApiCall,
  showRecentSearchValues = true,
  maxAmountOfRecentSearchValuesToMemorize = DEFAULT_MAX_AMOUNT_OF_RECENT_SEARCHES,
}: IUseRecentSearchValuesMemory) => {
  const [memorizedSearchedValues, setMemorizedSearchedValues] = useState<
    string[]
  >([]);

  // Initialize "previously searched" list fill-out
  useEffect(() => {
    if (showRecentSearchValues) {
      const isSearchMemoryAvailable = SearchMemory.checkIsAvailable();
      if (isSearchMemoryAvailable) {
        const { recentlySearchedValues } =
          SearchMemory.getSearchStorageMemorizedValues(searchFieldCodeName);

        setMemorizedSearchedValues(recentlySearchedValues);
      }
    }
  }, []);

  useEffect(() => {
    if (
      showRecentSearchValues &&
      searchValueWhichCausedApiCall &&
      searchValueWhichCausedApiCall.length >=
        SEARCH_VALUE_LENGTH_TO_TRIGGER_SEARCH
    ) {
      const isSearchMemoryAvailable = SearchMemory.checkIsAvailable();

      if (isSearchMemoryAvailable) {
        const { recentlySearchedValues } =
          SearchMemory.getSearchStorageMemorizedValues(searchFieldCodeName);

        const { searchMemoryHandlers } = SearchMemory.getSearchStorageHandlers(
          searchFieldCodeName,
          setMemorizedSearchedValues
        );

        const trimmedSearchValueWhichCausedApiCall =
          searchValueWhichCausedApiCall.trim();

        if (recentlySearchedValues.length > 0) {
          searchMemoryHandlers.update(
            trimmedSearchValueWhichCausedApiCall,
            recentlySearchedValues,
            maxAmountOfRecentSearchValuesToMemorize
          );
          return;
        }

        searchMemoryHandlers.putFirstSearchValue(
          trimmedSearchValueWhichCausedApiCall
        );
        return;
      }

      console.error("Search memory not defined!");
    }
  }, [searchValueWhichCausedApiCall]);

  return {
    memorizedSearchedValues,
  };
};

export default useRecentSearchValuesMemory;
