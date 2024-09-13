import {useEffect, useState} from "react";
import useDebounce from "./useDebounce";

const useSearchBar = (onUpdateSearchTerm) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounce = useDebounce({text: searchTerm, delay: 500});

  useEffect(() => {
    if (debounce?.length > 0) {
      onUpdateSearchTerm(debounce);
    }
  }, [debounce]);

  return {
    searchTerm,
    setSearchTerm,
  };
};

export default useSearchBar;
