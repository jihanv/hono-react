import { useEffect, useState } from "react";
type Book = {
  id: number;
  title: string;
  author: string;
};
function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("api/books");
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  });

  return (
    <>
      <div>
        <h1>Book List</h1>
        <ul>
          {books.map((book: Book) => (
            <li key={book.id}>{book.title} by {book.author}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
