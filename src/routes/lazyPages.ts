import { lazy } from "react";

const Home = lazy(() =>
  import("@pages").then((module) => ({ default: module.Home })),
);
const Movies = lazy(() =>
  import("@pages").then((module) => ({ default: module.Movies })),
);
const NotFound = lazy(() =>
  import("@pages").then((module) => ({ default: module.NotFound })),
);

export { Home, Movies, NotFound };
