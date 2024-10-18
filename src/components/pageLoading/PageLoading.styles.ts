import { keyframes, styled } from '@mui/material/styles';

const cubeGridScaleDelay = keyframes`
  0%, 70%, 100% {
    transform: scale3D(1, 1, 1);
  }
  35% {
    transform: scale3D(0, 0, 1);
  }
`;

export const ContentLoading = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const CubeGrid = styled('div')({
  width: '50px',
  height: '50px',
});

export const Cube = styled('div')({
  width: '33%',
  height: '33%',
  backgroundColor: '#00beff',
  float: 'left',
  animation: `${cubeGridScaleDelay} 1.5s infinite ease-in-out`,
});
