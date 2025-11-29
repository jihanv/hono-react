import { useEffect, useState } from "react";
import type { AppType } from "../../server/index";
import { hc, type InferResponseType } from "hono/client"

const client = hc<AppType>("/")

function App() {
  const [books, setBooks] = useState<InferResponseType<typeof client.api.books.$get>>([]);
  const [count, setCount] = useState(0)
  useEffect(() => {
    const fetchBooks = async () => {
      // const response = await fetch("api/books");
      // const data = await response.json();
      const response = await client.api.books.$get()
      const data = await response.json()
      setBooks(data);
    };
    fetchBooks();
  });

  return (
    <>
      <div className="p-20">
        <h1 className="flex justify-center text-4xl m-4">Book List</h1>
        <ul className="list bg-base-200 rounded-box shadow-md">
          {books.map((book) => (
            <li key={book.id} className="list-row">{book.title} by {book.author}</li>
          ))}
        </ul>
        <div className="flex justify-end">
          <button
            className="btn btn-primary mt-4"
            onClick={() => {
              setCount((prev) => prev + 1)
            }}>
            Click me! {count}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
