import { homePageName, homePath, moviesPageName, moviesPath } from "@constants";
import type { IModule } from "@types";
import { useMemo } from "react";
import { type To, useLocation } from "react-router-dom";

export const useModules = () => {
  const { pathname } = useLocation();

  const modules: IModule[] = useMemo(() => {
    const isSelected = (uri: To) => pathname === uri;

    return [
      {
        id: "home-page",
        icon: "Home",
        title: homePageName,
        uri: homePath,
        isSelected: isSelected(homePath),
      },
      {
        id: "movies-page",
        icon: "LocalMovies",
        title: moviesPageName,
        uri: moviesPath,
        isSelected: isSelected(moviesPath),
      },
    ];
  }, [pathname]);

  return { modules };
};
