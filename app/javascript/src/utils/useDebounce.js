import { useEffect, useState } from "react";

const useDebounce = searchInput => {
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return debouncedSearchInput;
};

export default useDebounce;
