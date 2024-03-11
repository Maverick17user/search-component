import { memo } from "react";
import { ISearchResults } from "./types";
import { NorResultsFound, RecentSearchValues } from "./components";
import {
  DEFAULT_MAX_AMOUNT_OF_RECENT_SEARCHES,
  DEFAULT_MAX_AMOUNT_OF_SEARCHES,
} from "./components/RecentSearchValues/const";
import { useShowSearchResults, useRecentSearchValuesMemory } from "./hooks";
import { ShowAllButton } from "./components";

const SearchResults = memo(
  ({
    results = [],
    recentSearchesTitle,
    showRecentSearchValues = true,
    isNoResultMessageVisible,
    isSearchInputEmpty,
    isSearchInputValueLargeEnough,
    searchValueWhichCausedApiCall,
    searchFieldCodeName,
    SearchResultComponent,
    maxAmountOfSearchValuesToShow = DEFAULT_MAX_AMOUNT_OF_SEARCHES,
    maxAmountOfRecentSearchValuesToMemorize = DEFAULT_MAX_AMOUNT_OF_RECENT_SEARCHES,
  }: ISearchResults) => {
    const {
      showAllSearchResults,
      visibleSearchResults,
      hiddenSearchResults,
      isSearchResultsAmountTooBig,
      showAll,
    } = useShowSearchResults({
      results,
      maxAmountOfSearchValuesToShow,
    });

    const { memorizedSearchedValues } = useRecentSearchValuesMemory({
      showRecentSearchValues,
      searchFieldCodeName,
      searchValueWhichCausedApiCall,
      maxAmountOfRecentSearchValuesToMemorize,
    });

    const isShowAllButtonVisible =
      isSearchResultsAmountTooBig && !showAllSearchResults;

    const isShowRecentSearches =
      isSearchInputEmpty && showRecentSearchValues && memorizedSearchedValues;

    return (
      <section aria-description="Search results area">
        {isShowRecentSearches && (
          <RecentSearchValues
            title={recentSearchesTitle}
            memorizedSearchedValues={memorizedSearchedValues}
          />
        )}
        {isSearchInputValueLargeEnough && (
          <>
            <ol aria-description="Search results">
              {visibleSearchResults.length ? (
                <>
                  {visibleSearchResults.map((result, index) => (
                    <SearchResultComponent key={index} result={result} />
                  ))}
                  {showAllSearchResults &&
                    hiddenSearchResults.map((result, index) => (
                      <SearchResultComponent key={index} result={result} />
                    ))}
                </>
              ) : (
                isNoResultMessageVisible && <NorResultsFound />
              )}
            </ol>
            {isShowAllButtonVisible && <ShowAllButton showAll={showAll} />}
          </>
        )}
      </section>
    );
  }
);

export default SearchResults;
