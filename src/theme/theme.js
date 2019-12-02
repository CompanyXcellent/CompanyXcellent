import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2a475e',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#cadce7',
      main: '#c7d5e0',
      // dark: '#6b7b85',
      // contrastText: '#000000',
    },
    status: {
      danger: 'red',
    },
  }
  // typography: {
  //   h1: 
  // }
});

theme = responsiveFontSizes(theme);

export default theme;