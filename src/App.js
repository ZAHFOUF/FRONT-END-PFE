import { BrowserRouter } from 'react-router-dom';
import { useDetectAdBlock } from "adblock-detect-react";
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
import { AdblockStop } from './components/ad-block-page';
import { settings } from './_mock/user';





// ----------------------------------------------------------------------











// -----------------------------------------------------------------------



export default function App() {
  const adBlockDetected = useDetectAdBlock();

  if (adBlockDetected && settings.adblock ) {

     return(
      <>
       <AdblockStop />
      </>
       
     )
    
  }

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
