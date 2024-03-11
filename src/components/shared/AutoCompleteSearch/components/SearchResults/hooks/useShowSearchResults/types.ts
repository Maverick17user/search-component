import { SearchResponseData } from "../../../../../../../services/search/types";

export interface IUseShowSearchResults {
  results: SearchResponseData[];
  maxAmountOfSearchValuesToShow: number;
}
