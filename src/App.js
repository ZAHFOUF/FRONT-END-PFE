import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux'

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { ContextProvider } from './context/contextProvider';
import { store } from './store/index'





// ----------------------------------------------------------------------











// -----------------------------------------------------------------------



export default function App() {
  return (
  <HelmetProvider>
          <Provider store={store}>

      <ContextProvider>

      <BrowserRouter>

        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />




        </ThemeProvider>
      </BrowserRouter>
      </ContextProvider>
      </Provider>

    </HelmetProvider>
          
   
  );
}
