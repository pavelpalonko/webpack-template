import { Suspense, lazy } from "react";

import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import lod from "lodash";

import { App } from "./components/App";

// simple load page
// import Shop from "./pages/Shop";
// import About from "./pages/About";

// lazy load page
const LazyShop = lazy(() => import("./pages/Shop"));
const LazyAbout = lazy(() => import("./pages/About"));

const root = document.getElementById("root");

// console.log(lod);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          // <About />

          <Suspense fallback="load...">
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          // <Shop />

          <Suspense fallback="load...">
            <LazyShop />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(root).render(<RouterProvider router={router} />);
