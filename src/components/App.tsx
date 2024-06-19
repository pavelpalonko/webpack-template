import { useState } from "react";

import styles from "./App.module.scss";

export function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((prev) => prev + 1);

  return (
    <>
      <div>Hello React and webpack!</div>

      <button className={styles.button} onClick={handleIncrement}>
        inc <span>+++</span>
      </button>

      <div>count: {count}</div>
    </>
  );
}
