import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#624ad7',
    },
    secondary: {
      main: '#a3a3a3',
      contrastText: '#fff',
    },
    info: {
      main: '#4a95d7',
      contrastText: '#fff',
    },
  },
});

export default theme;
