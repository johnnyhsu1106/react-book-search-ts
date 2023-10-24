import { useEffect, useState } from 'react'
import { IBook, IBookData } from '../types/interfaces';



const API_ENDPOINT = 'https://openlibrary.org/search.json';

const useBooksSearch = (query: string, pageNumber: number) => {
  const [books, setBooks] =  useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setBooks([]);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async (): Promise<void> => {  
      setIsLoading(true);
      setIsError(false);
      
      try {
        const res = await fetch(
          `${API_ENDPOINT}?q=${query}&page=${pageNumber}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error('Invalid HTTPs Request');
        }
        const data = await res.json();

        setHasMore(data?.docs.length > 0);
        setBooks((prevBooks) => {
          const newBooks = data?.docs.map((doc: IBookData): IBook => { return { title: doc.title, authors: doc.author_name }});
          return [...prevBooks, ...newBooks];
        });

      } catch (err) {
        if (err instanceof Error) {  
          if (err.name === 'AbortError') {
            return;
          }
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();

    return () => {
      controller.abort() 
    }
  }, [query, pageNumber]);

  return { books, isLoading, isError, hasMore };
};

export default useBooksSearch;