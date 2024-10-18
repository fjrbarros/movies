import { PageLoading } from "@components";
import { homePath, moviesPath, notFoundPath } from "@constants";
import { QueryClientProvider, ThemeProvider } from "@providers";
import { type ComponentType, Suspense } from "react";
import { Home, Movies, NotFound } from "./lazyPages";

interface IPages {
  path: string;
  component: ComponentType;
}

const pages: IPages[] = [
  { path: homePath, component: Home },
  { path: moviesPath, component: Movies },
  { path: notFoundPath, component: NotFound },
];

export const routersConfig = pages.map(({ path, component: Component }) => ({
  path,
  element: (
    <Suspense fallback={<PageLoading />}>
      <QueryClientProvider>
        <ThemeProvider>
          <Component />
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  ),
}));
