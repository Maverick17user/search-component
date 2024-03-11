import { useCallback, useState } from "react";
import { SearchResponseData } from "../../../services/search/types";
import { SearchServiceFunctions } from "./type";

/**
 * **Reusable hook, to handle any search services**
 *
 * Uses in combination with shared `<AutoCompleteSearch />` component
 *
 * @example
 *
 * const useSearchSomething = () => {
 *   return useSearchApi<SomeResponseDataStructure>(
 *     Services.Search.getSomething
 *   );
 * };
 */
const useSearchApi = <TSearchResult extends SearchResponseData>(
  /** Function, which triggers search API call */
  searchServiceFn: SearchServiceFunctions,
  cacheStrategy: RequestCache = "force-cache"
) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<TSearchResult[]>([]);
  const [
    lastSearchValueWhichCausedApiCall,
    setLastSearchValueWhichCausedApiCall,
  ] = useState<string>("");

  const cleanUpSearchResults = useCallback(() => {
    if (searchResults.length) {
      setSearchResults([]);
    }
  }, [searchResults]);

  const fetchSearchResults = useCallback(
    async (searchValue: string) => {
      if (searchValue) {
        setIsSearching(true);

        const searchResults = await searchServiceFn(searchValue, cacheStrategy);

        setSearchResults(searchResults as TSearchResult[]);
        setIsSearching(false);
        return;
      }

      cleanUpSearchResults();
    },
    [cacheStrategy, cleanUpSearchResults, searchServiceFn]
  );

  return {
    isSearching,
    searchResults,
    searchValueWhichCausedApiCall: lastSearchValueWhichCausedApiCall,
    fetchSearchResults,
    cleanUpSearchResults,
    setLastSearchValueWhichCausedApiCall,
  };
};

export default useSearchApi;
