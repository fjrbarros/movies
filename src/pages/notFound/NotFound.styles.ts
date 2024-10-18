import { styled } from '@mui/material';
import MuiButton from '@mui/material/Button';

export const Wrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#000000',
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

export const TextContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '90%',
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    padding: theme.spacing(2),
    borderRadius: '30px',
  },
}));

export const Button = styled(MuiButton)({
  width: '100%',
  maxWidth: '150px',
  color: '#ffffff',
  borderColor: '#ffffff',
  marginTop: '5px',
});

export const ImageContainer = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
}));

export const Image = styled('img')(({ theme }) => ({
  width: '70%',
  borderRadius: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    objectFit: 'cover',
    borderRadius: 'unset',
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: '65%',
  },
}));
