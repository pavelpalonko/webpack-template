import { useState } from "react";

import styles from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";

export function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((prev) => prev + 1);

  return (
    <>
      <div className={styles.navbar}>
        <Link to={"/about"}>About</Link>
        <Link to={"/shop"}>Shop</Link>
      </div>

      <div>Hello React and webpack!</div>

      <button className={styles.button} onClick={handleIncrement}>
        inc <span>+++</span>
      </button>

      <div>count: {count}</div>

      <Outlet />
    </>
  );
}
