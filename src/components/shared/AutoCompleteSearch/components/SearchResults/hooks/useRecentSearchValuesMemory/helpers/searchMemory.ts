import { Dispatch, SetStateAction } from "react";
import SearchMemoryHandlersContext from "./searchMemoryHandlersContext";

const checkIsAvailable = () => {
  return typeof localStorage === "object";
};

const getSearchStorageMemorizedValues = (searchFieldCodeName: string) => {
  const stringifiedSearchValues =
    localStorage.getItem(searchFieldCodeName) || "[]";

  const recentlySearchedValues: string[] = JSON.parse(stringifiedSearchValues);

  return { recentlySearchedValues };
};

const getSearchStorageHandlers = (
  searchFieldCodeName: string,
  setMemorizedSearchedValues: Dispatch<SetStateAction<string[]>>
) => {
  const searchMemoryHandlers = SearchMemoryHandlersContext(
    searchFieldCodeName,
    setMemorizedSearchedValues
  );

  return {
    searchMemoryHandlers,
  };
};

const SearchMemory = {
  checkIsAvailable,
  getSearchStorageMemorizedValues,
  getSearchStorageHandlers,
};

export default SearchMemory;
