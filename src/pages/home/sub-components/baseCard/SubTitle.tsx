import {
  Typography as MuiTypography,
  type TypographyProps,
  styled,
} from "@mui/material";

interface ISubTitleProps extends TypographyProps {
  label: string;
}

const Typography = styled(MuiTypography)(({ theme }) => ({
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

export const SubTitle = ({
  label,
  variant = "h6",
  fontWeight = "normal",
  ...rest
}: ISubTitleProps) => {
  return (
    <Typography
      color="textSecondary"
      fontWeight={fontWeight}
      variant={variant}
      {...rest}
    >
      {label}
    </Typography>
  );
};
