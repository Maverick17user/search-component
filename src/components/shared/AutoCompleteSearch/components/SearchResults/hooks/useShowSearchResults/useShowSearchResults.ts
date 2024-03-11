import { useState, useMemo, useEffect } from "react";
import { IUseShowSearchResults } from "./types";

const useShowSearchResults = ({
  results,
  maxAmountOfSearchValuesToShow,
}: IUseShowSearchResults) => {
  const [showAllSearchResults, setShowAllSearchResults] =
    useState<boolean>(false);

  const showAll = () => {
    setShowAllSearchResults(true);
  };

  const isSearchResultsAmountTooBig =
    results.length > maxAmountOfSearchValuesToShow;

  /**
   * TODO: Migrate to `Array.toSliced()` method usage, when TS will support it well.
   *
   * Motivation: `Array.toSliced()` -based code will be more declarative and readable.
   *
   * Issue: #999
   */
  const { visibleSearchResults, hiddenSearchResults } = useMemo(() => {
    if (isSearchResultsAmountTooBig) {
      const resultsCopy = results;
      const visibleSearchResults = resultsCopy.slice(
        0,
        maxAmountOfSearchValuesToShow
      );
      const hiddenSearchResults = resultsCopy.slice(
        maxAmountOfSearchValuesToShow
      );

      return {
        visibleSearchResults,
        hiddenSearchResults,
      };
    }
    return { visibleSearchResults: results, hiddenSearchResults: [] };
  }, [results, maxAmountOfSearchValuesToShow, isSearchResultsAmountTooBig]);

  useEffect(() => {
    setShowAllSearchResults(false);
  }, [results]);

  return {
    showAllSearchResults,
    visibleSearchResults,
    hiddenSearchResults,
    isSearchResultsAmountTooBig,
    showAll,
  };
};

export default useShowSearchResults;
