import { SearchResponseData } from "../../../../../services/search/types";

export interface ISearchResultComponent<TResult extends SearchResponseData> {
  result: TResult;
}
export type TSearchResultComponent = React.FC<
  ISearchResultComponent<SearchResponseData>
>;

export type SearchFieldCodeName = string;

export interface ISearchResults {
  searchFieldCodeName: string;
  searchValueWhichCausedApiCall: string;
  isSearchInputEmpty: boolean;
  isSearchInputValueLargeEnough: boolean;
  results: SearchResponseData[];
  SearchResultComponent: TSearchResultComponent;
  isNoResultMessageVisible: boolean;
  maxAmountOfRecentSearchValuesToMemorize?: number;
  maxAmountOfSearchValuesToShow?: number;
  showRecentSearchValues?: boolean;
  recentSearchesTitle?: string;
}
