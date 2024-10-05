import React, { createContext, useState } from 'react';

type SearchContextType = {
  query: result | null;
  setQuery: (data: result | null) => void;
};

type result = {
  count: number;
  result: Array<{
    description: string;
    displaySymbol: string;
  }>;
}

export const SearchContext = createContext<SearchContextType>({
  query: null,
  setQuery: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState<result | null>(null);

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
