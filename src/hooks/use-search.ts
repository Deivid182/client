import { useContext } from "react";
import { SearchContext, type SearchContextType } from "../context/search-context";

export const useSearch = () => {
  return useContext(SearchContext) as SearchContextType
}