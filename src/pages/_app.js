import {DrinkProvider} from '../../context/drinkContext';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <DrinkProvider>
    <Component {...pageProps} />;  
    </DrinkProvider>
  )
}
