import { Paper, styled } from "@mui/material";
import type { PropsWithChildren } from "react";
import { Input } from "./Input";
import { SubTitle } from "./SubTitle";
import { Title } from "./Title";

const Card = styled(Paper)(({ theme }) => ({
  padding: "20px",
  width: "calc(50% - 20px)",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const BaseCard = ({ children }: PropsWithChildren) => {
  return <Card elevation={2}>{children}</Card>;
};

BaseCard.Title = Title;
BaseCard.SubTitle = SubTitle;
BaseCard.Input = Input;
