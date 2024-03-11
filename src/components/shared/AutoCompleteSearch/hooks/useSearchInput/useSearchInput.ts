import { useState, useCallback, ChangeEvent } from "react";
import debounce from "../../../../../helpers/debounce";
import { IUseSearchInput } from "./type";
import { SEARCH_VALUE_LENGTH_TO_TRIGGER_SEARCH } from "./const";

/** Hook encapsulates logic, related to shared `<AutoCompleteSearch />` component usage */
const useSearchInput = ({
  debounceTimeInMs = 750,
  requestSearch,
  cleanUpSearchResults,
  setLastSearchValueWhichCausedApiCall,
}: IUseSearchInput) => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const search = (newSearchValue: string) => {
    setLastSearchValueWhichCausedApiCall(newSearchValue);
    requestSearch(newSearchValue);
  };

  const fetchSuggestions = useCallback(debounce(search, debounceTimeInMs), []);

  const handleSearchInputValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchValue = event.target.value;

    setSearchInputValue(newSearchValue);

    cleanUpSearchResults();

    if (newSearchValue.length >= SEARCH_VALUE_LENGTH_TO_TRIGGER_SEARCH) {
      fetchSuggestions(newSearchValue);
    }
  };

  return {
    searchInputValue,
    handleSearchInputValueChange,
  };
};

export default useSearchInput;
