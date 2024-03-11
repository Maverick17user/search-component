import { ISearchResultComponent } from "../shared/AutoCompleteSearch/components/SearchResults/types";
import AddressDetails from "../../types/AddressDetails";

export interface IAddressSearchResult
  extends ISearchResultComponent<AddressDetails> {}
