import { useBooksContext } from '../../context/BooksContext';
import { IBook } from '../../types/interfaces';
interface BookProps {
  book: IBook;
  isLastBook: boolean;
};

const Book = ({
  book,
  isLastBook
}: BookProps) => {
  const { lastBookRef } = useBooksContext();
  const authors = book.authors?.join(', ') || '';

  if (isLastBook) {
    return (
      <div className='book' ref={lastBookRef}>
        <p className='title'><cite>{book.title}</cite></p>
        <p className='author'>by {authors}</p> 
      </div>
    );
  }
  
  return (
    <div className='book'>
      <p className='title'><cite>{book.title}</cite></p>
      <p className='authors'>by {authors}</p> 
    </div>
  )
}

export default Book;
