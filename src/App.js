import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { ContextProvider } from './context/contextProvider';
// ----------------------------------------------------------------------


export default function App() {
  return (
  <HelmetProvider>
      <ContextProvider>

      <BrowserRouter>

        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />




        </ThemeProvider>
      </BrowserRouter>
      </ContextProvider>

    </HelmetProvider>
          
   
  );
}
