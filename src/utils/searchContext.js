import { useContext, createContext } from 'react';

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);
