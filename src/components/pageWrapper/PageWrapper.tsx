import { useModules } from "@hooks";
import type { IModule } from "@types";
import { type PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../appHeader/AppHeader";
import { Drawer } from "../drawer/Drawer";
import { MainPage } from "../mainPage/MainPage";

interface PageWrapperProps extends PropsWithChildren {
  pageTitle?: string;
}

export const PageWrapper = ({ children, pageTitle }: PageWrapperProps) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { modules } = useModules();

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClickDrawerItem = (module: IModule) => {
    navigate(module.uri);
  };

  return (
    <>
      <AppHeader
        openDrawer={drawerOpen}
        handleOpenDrawer={handleToggleDrawer}
        title={pageTitle}
      />
      <Drawer
        openDrawer={drawerOpen}
        drawerItems={modules}
        handleCloseDrawer={handleToggleDrawer}
        onClickDrawerItem={handleClickDrawerItem}
      />
      <MainPage openDrawer={drawerOpen}>{children}</MainPage>
    </>
  );
};
