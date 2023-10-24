import { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';
import useBooksSearch from '../hooks/useBookSearch';
import { IBook } from '../types/interfaces';

interface IBooksContext {
  query: string;
  books: Array<IBook>;
  pageNumber: number;
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  lastBookRef: (node: HTMLDivElement | null) => void;
  handleBooksSearch: (inputValue: string) => void;
  handleSearchClear: () => void;
};

interface BookProviderProps {
  children: ReactNode;
};

const BooksContext = createContext<IBooksContext | null>(null);

const useBooksContext = () => {
  const booksContext = useContext(BooksContext);
  
  if (booksContext === null) {
    throw new Error('useBookContext must be used within BookProvider');
  }
  return booksContext;
};


const BooksProvider = ({ children }: BookProviderProps) => {
  const [query, setQuery] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { 
    books, 
    isLoading, 
    isError, 
    hasMore
  } = useBooksSearch(query, pageNumber);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookRef = useCallback((node: HTMLDivElement | null): void => {
    if (isLoading) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => {
          return prevPageNumber + 1;
        });
      }
    });

    if (node) {
      observer.current.observe(node)
    }

  }, [isLoading, hasMore]);


  const handleBooksSearch = (inputValue: string): void => {
    setQuery(inputValue);
    setPageNumber(1);
  };

  const handleSearchClear = (): void => {
    setQuery('');
  };

  const value = {
    query,
    books,
    pageNumber,
    isLoading,
    isError,
    hasMore,
    lastBookRef,
    handleBooksSearch,
    handleSearchClear
  };
  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  )
}

export { useBooksContext, BooksProvider };
