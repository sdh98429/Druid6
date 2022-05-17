import { createTheme } from '@mui/material/styles';

import { indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: indigo[900],
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default theme;
