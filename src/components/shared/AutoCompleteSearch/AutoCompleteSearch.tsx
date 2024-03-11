import { memo, useId } from "react";
import { IAutoCompleteSearch } from "./types";
import { useSearchInput } from "./hooks";
import { SearchResults } from "./components";
import {
  DEFAULT_MAX_AMOUNT_OF_RECENT_SEARCHES,
  DEFAULT_MAX_AMOUNT_OF_SEARCHES,
} from "./components/SearchResults/components/RecentSearchValues/const";
import styles from "./AutoCompleteSearch.module.css";
import { SEARCH_VALUE_LENGTH_TO_TRIGGER_SEARCH } from "./hooks/useSearchInput/const";

/**
 * **Reusable search field component**
 *
 *
 * @example
 *
 * <AutoCompleteSearch
 *  label="Search for address"
 *  placeholder="Type in any street name"
 *  name="addressSearch"
 *  searchFieldCodeName="addressSearch"
 *  showRecentSearchValues
 *  isSearching={isSearching}
 *  searchResults={searchResults}
 *  debounceTimeInMs={SEARCH_DEBOUNCE_TIME_IN_MS}
 *  requestSearch={fetchSearchResults}
 *  cleanUpSearchResults={cleanUpSearchResults}
 *  searchValueWhichCausedApiCall={searchValueWhichCausedApiCall}
 *  maxAmountOfSearchValuesToShow={8}
 *  maxAmountOfRecentSearchValuesToMemorize={8}
 *  SearchResultComponent={AddressSearchResult}
 *  setLastSearchValueWhichCausedApiCall={
 *    setLastSearchValueWhichCausedApiCall
 *  }
 * />
 */
const AutoCompleteSearch = memo(
  ({
    label,
    name,
    placeholder,
    debounceTimeInMs,
    autoComplete = "off",
    searchValueWhichCausedApiCall = "",
    maxAmountOfSearchValuesToShow = DEFAULT_MAX_AMOUNT_OF_SEARCHES,
    maxAmountOfRecentSearchValuesToMemorize = DEFAULT_MAX_AMOUNT_OF_RECENT_SEARCHES,
    autoFocus = true,
    isSearching = false,
    showRecentSearchValues = true,
    searchResults = [],
    searchFieldCodeName,
    requestSearch,
    cleanUpSearchResults,
    setLastSearchValueWhichCausedApiCall,
    SearchResultComponent,
  }: IAutoCompleteSearch) => {
    const searchFieldUniqueId = useId();
    const { searchInputValue, handleSearchInputValueChange } = useSearchInput({
      debounceTimeInMs,
      requestSearch,
      cleanUpSearchResults,
      setLastSearchValueWhichCausedApiCall,
    });

    return (
      <div role="search" className={styles.autoCompleteSearch}>
        <label
          htmlFor={searchFieldUniqueId}
          className={styles.autoCompleteSearch__label}
        >
          {label}
        </label>
        <input
          type="search"
          autoFocus={autoFocus}
          name={name}
          id={searchFieldUniqueId}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={searchInputValue}
          className={styles.autoCompleteSearch__control}
          onChange={handleSearchInputValueChange}
        />
        {isSearching && (
          <span
            role="status"
            className={styles.autoCompleteSearch__searchLoadStatus}
          >
            Searching ...
          </span>
        )}
        <SearchResults
          isSearchInputEmpty={searchInputValue === ""}
          isSearchInputValueLargeEnough={
            searchInputValue.length >= SEARCH_VALUE_LENGTH_TO_TRIGGER_SEARCH
          }
          isNoResultMessageVisible={
            searchValueWhichCausedApiCall === searchInputValue
          }
          showRecentSearchValues={showRecentSearchValues}
          searchFieldCodeName={searchFieldCodeName}
          results={searchResults}
          searchValueWhichCausedApiCall={searchValueWhichCausedApiCall}
          SearchResultComponent={SearchResultComponent}
          maxAmountOfSearchValuesToShow={maxAmountOfSearchValuesToShow}
          maxAmountOfRecentSearchValuesToMemorize={
            maxAmountOfRecentSearchValuesToMemorize
          }
        />
      </div>
    );
  }
);

export default AutoCompleteSearch;
