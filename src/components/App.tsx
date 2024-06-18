import { useState } from "react";

import "./App.css";

export function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((prev) => prev + 1);

  return (
    <>
      <div>Hello React and webpack!</div>
      <button onClick={handleIncrement}>inc!</button>
      <div>count: {count}</div>
    </>
  );
}
