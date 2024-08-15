// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import {DrinkProvider} from '../../context/drinkContext';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <DrinkProvider>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
      </DrinkProvider>
    </SessionProvider>
  );
}

export default MyApp;
