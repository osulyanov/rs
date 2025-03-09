import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import ThemeLayout from '@components/theme-layout';
import Header from '@components/header';
import { store } from '@components/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeLayout>
        <Header />
        <Component {...pageProps} />
      </ThemeLayout>
    </Provider>
  );
}
