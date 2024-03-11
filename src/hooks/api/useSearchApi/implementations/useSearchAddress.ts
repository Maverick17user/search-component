import Services from "../../../../services";
import { AddressDetails } from "../../../../types";
import useSearchApi from "../useSearchApi";

const useSearchAddress = () => {
  return useSearchApi<AddressDetails>(
    Services.Search.getAddressListByStreetNameSubstring
  );
};

export default useSearchAddress;
