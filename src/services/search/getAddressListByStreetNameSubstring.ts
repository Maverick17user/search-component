import { AddressDetails } from "../../types";

const getAddressListByStreetNameSubstring = async (
  streetNameSubstring: string,
  cacheStrategy: RequestCache = "force-cache"
): Promise<AddressDetails[]> => {
  try {
    const response = await fetch(`/search/${streetNameSubstring}`, {
      method: "GET",
      mode: "no-cors",
      cache: cacheStrategy,
    });

    if (!response.ok) {
      throw new Error();
    }

    const addresses: AddressDetails[] = await response.json();

    return addresses;
  } catch (error) {
    console.error(error);
    alert(
      "Something went wrong with search request! Please, contact our support: maksim.yepifanau.2000@gmail.com"
    );
    return [];
  }
};

export default getAddressListByStreetNameSubstring;
