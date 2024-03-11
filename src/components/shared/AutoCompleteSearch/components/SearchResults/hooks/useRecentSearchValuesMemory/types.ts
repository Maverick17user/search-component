export interface IUseRecentSearchValuesMemory {
  searchFieldCodeName: string;
  searchValueWhichCausedApiCall: string;
  showRecentSearchValues?: boolean;
  maxAmountOfRecentSearchValuesToMemorize?: number;
}
