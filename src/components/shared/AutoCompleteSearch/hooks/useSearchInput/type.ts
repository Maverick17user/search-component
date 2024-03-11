import { SetLastSearchValueWhichCausedApiCall } from "../../../../../hooks/api";

export interface IUseSearchInput {
  debounceTimeInMs?: number;
  requestSearch: (newSearchValue: string) => void;
  cleanUpSearchResults: () => void;
  setLastSearchValueWhichCausedApiCall: SetLastSearchValueWhichCausedApiCall;
}
