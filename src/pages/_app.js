import React from 'react'; // Add this line
import { DrinkProvider } from '../../context/drinkContext';
import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { fonts } from '../lib/fonts'

export default function App({ Component, pageProps }) {
  return (
    <DrinkProvider>
    <ChakraProvider resetCSS>
    <Component {...pageProps} />
    </ChakraProvider>
    </DrinkProvider>
  );
}
