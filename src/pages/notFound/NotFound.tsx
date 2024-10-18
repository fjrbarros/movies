import { errorPage, homePath } from "@constants";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import imageError from "../../assets/error.webp";
import {
  Button,
  Image,
  ImageContainer,
  TextContainer,
  Wrapper,
} from "./NotFound.styles";

export const NotFound = () => {
  const { code, title, description, button } = errorPage;
  const navigate = useNavigate();

  return (
    <Wrapper>
      <TextContainer>
        <Typography color="white" variant="h3" align="center">
          {code}
        </Typography>
        <Typography color="white" variant="h5" align="center">
          {title}
        </Typography>
        <Typography color="white" variant="body2" align="center">
          {description}
        </Typography>
        <Button variant="outlined" onClick={() => navigate(homePath)}>
          {button}
        </Button>
      </TextContainer>

      <ImageContainer>
        <Image src={imageError} alt={title} />
      </ImageContainer>
    </Wrapper>
  );
};
