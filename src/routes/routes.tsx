import { type ComponentType, Suspense } from "react";
import { Home, Movies, NotFound } from "./lazyPages";

interface IPages {
  path: string;
  component: ComponentType;
}

const homePath = "/";
const moviesPath = "/movies";
const notFoundPath = "*";

const pages: IPages[] = [
  { path: homePath, component: Home },
  { path: moviesPath, component: Movies },
  { path: notFoundPath, component: NotFound },
];

export const routersConfig = pages.map(({ path, component: Component }) => ({
  path,
  element: (
    <Suspense fallback={"Loading..."}>
      <Component />
    </Suspense>
  ),
}));
