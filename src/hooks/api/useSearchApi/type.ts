import { Dispatch, SetStateAction } from "react";
import Services from "../../../services";

type SearchServiceFunctionNames = keyof typeof Services.Search;

export type SetLastSearchValueWhichCausedApiCall = Dispatch<
  SetStateAction<string>
>;

export type SearchServiceFunctions =
  (typeof Services.Search)[SearchServiceFunctionNames];
