import { useSearchAddress } from "./hooks/api";
import { AutoCompleteSearch } from "./components/shared";
import { AddressSearchResult } from "./components/AddressSearchResult";
import styles from "./SearchPreview.module.css";
import "./global.css";

const SEARCH_DEBOUNCE_TIME_IN_MS = 1000 as const;
const MAX_SEARCH_RESULTS_LIMIT = 8 as const;
const MAX_SEARCH_RESULTS_TO_MEMO = 8 as const;

const SearchPreview = () => {
  const {
    isSearching,
    searchResults,
    searchValueWhichCausedApiCall,
    fetchSearchResults,
    cleanUpSearchResults,
    setLastSearchValueWhichCausedApiCall,
  } = useSearchAddress();

  return (
    <main className={styles.preview}>
      <h1>Search for norwegian address</h1>
      <AutoCompleteSearch
        label="Search for address 🔍"
        placeholder="Type in any street name"
        name="addressSearch"
        searchFieldCodeName="addressSearch"
        showRecentSearchValues
        isSearching={isSearching}
        searchResults={searchResults}
        debounceTimeInMs={SEARCH_DEBOUNCE_TIME_IN_MS}
        requestSearch={fetchSearchResults}
        cleanUpSearchResults={cleanUpSearchResults}
        searchValueWhichCausedApiCall={searchValueWhichCausedApiCall}
        maxAmountOfSearchValuesToShow={MAX_SEARCH_RESULTS_LIMIT}
        maxAmountOfRecentSearchValuesToMemorize={MAX_SEARCH_RESULTS_TO_MEMO}
        SearchResultComponent={AddressSearchResult}
        setLastSearchValueWhichCausedApiCall={
          setLastSearchValueWhichCausedApiCall
        }
      />
    </main>
  );
};

export default SearchPreview;
