import {DrinkProvider} from '../../context/drinkContext';
import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

export default function App({ Component, pageProps }) {
  return (
    <DrinkProvider>
    <ChakraProvider>
    <Component {...pageProps} />
    </ChakraProvider>
    </DrinkProvider>
  )
}
