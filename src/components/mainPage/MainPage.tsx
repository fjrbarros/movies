import type { PropsWithChildren } from "react";
import { Main } from "./MainPage.styles";

interface MainPageProps extends PropsWithChildren {
  openDrawer: boolean;
}

export const MainPage = ({ children, openDrawer }: MainPageProps) => (
  <Main open={openDrawer}>{children}</Main>
);
