import { BrowserRouter } from 'react-router-dom';
import { useDetectAdBlock } from "adblock-detect-react";
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux'
import { getDoc , doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { ContextProvider, useContextProvider } from './context/contextProvider';
import { store } from './store/index'
import { AdblockStop } from './components/ad-block-page';
import { db } from './firebase.setting';





// ----------------------------------------------------------------------











// -----------------------------------------------------------------------



export default function App() {
  const adBlockDetected = useDetectAdBlock();
  const [settings_,setSettings] = useState({});
  const [data, setData] = useState(null);

   useEffect(()=>{
    getDoc(doc(db,"settings","KKQZhEF5avQQN7RwbcZA")).then((e)=>{setSettings(e.data())}).catch((e)=>console.log(e))

    console.log(settings_);

   },[])

  console.log("%c\n\n███╗   ███╗ ██╗   ██╗ ██████╗\n████╗ ████║ ██║   ██║   ██╔═╝\n██╔████╔██║ ██║   ██║   ██║\n██║╚██╔╝██║ ██║   ██║   ██║\n██║ ╚═╝ ██║ ╚██████╔╝ ██████╗\n╚═╝     ╚═╝  ╚═════╝  ╚═════╝\n\nTip: BY YOUNES ZAHFOUF AFTER THIS MAKE SHURE HIRE ME !.\n", "font-family:monospace;color:#1976d2;font-size:12px;")
  console.log('%cYOUNES ZAHFOUF', 'font-size: 24px; color: blue; font-weight: bold; text-decoration: underline;');


  if (adBlockDetected && settings_.adblock ) {

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
