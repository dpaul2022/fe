import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AllRoutes from './routes/all-routes';
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
           <AllRoutes />
    </ThemeProvider>
  );
}

export default App;


// Component renders
// When state changes
// or When the prop change
// useRef, useMemo, useState, useCallback, useEffect