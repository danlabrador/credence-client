import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import MyProvider from './MyProvider.jsx';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: { main: '#4208de' },
    secondary: { main: blue[400] },
    tertiary: { main: '#4a2d6e' },

    credentialCard: {
      backgroundColor: blue[100]
    },

    teal: {
      main: blue[200]
    },

    texts: {
      primary: { 500: '#000' },
      main: '#000',
      white: 'white'
    }
  },

  others: {
    dividerLine: '#222'
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
