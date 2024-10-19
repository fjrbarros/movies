import {
  Typography as MuiTypography,
  type TypographyProps,
  styled,
} from "@mui/material";

interface ITitleProps extends TypographyProps {
  label: string;
}

const Typography = styled(MuiTypography)(({ theme }) => ({
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

export const Title = ({
  label,
  variant = "h5",
  color = "textPrimary",
  fontWeight = "medium",
  ...rest
}: ITitleProps) => {
  return (
    <Typography
      color={color}
      variant={variant}
      fontWeight={fontWeight}
      {...rest}
    >
      {label}
    </Typography>
  );
};
