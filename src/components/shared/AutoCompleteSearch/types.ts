import type { TSearchResultComponent } from "./components";
import { SearchResponseData } from "../../../services/search/types";
import { SetLastSearchValueWhichCausedApiCall } from "../../../hooks/api";

type ReactInput = React.InputHTMLAttributes<HTMLInputElement>;

export interface IAutoCompleteSearch {
  /**
   * **Unique** name, used to link search component with recent search values memory
   *
   * Note: **Please, don't use id-randomizers or `React.useId()` to create it.**
   *
   * @example
   *
   * // ... props
   * searchFieldCodeName="addressSearch"
   * // ... props
   */
  searchFieldCodeName: string;
  label: string;
  debounceTimeInMs: number;
  name: ReactInput["name"];
  placeholder?: ReactInput["autoComplete"];
  autoComplete?: ReactInput["autoComplete"];
  autoFocus?: ReactInput["autoFocus"];
  isSearching: boolean;
  showRecentSearchValues?: boolean;
  maxAmountOfRecentSearchValuesToMemorize?: number;
  maxAmountOfSearchValuesToShow?: number;
  searchResults: SearchResponseData[];
  searchValueWhichCausedApiCall: string;
  requestSearch: (searchValue: string) => void;
  cleanUpSearchResults: () => void;
  setLastSearchValueWhichCausedApiCall: SetLastSearchValueWhichCausedApiCall;
  SearchResultComponent: TSearchResultComponent;
}
