import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { HeaderGeneric } from '../components';

import { Element } from '../interfaces';

import { AuthProvider } from '../context';

import 'react-slideshow-image/dist/styles.css';
import '../styles/globals.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps, session }: any) {
  return (
    <>
      <HeaderGeneric />
      <AppState session={session}>
        <Component {...pageProps} />
      </AppState>
    </>
  );
}

export default MyApp;

interface Props {
  children: Element;
  session: any;
}

export const AppState = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{
          'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        }}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>{children}</AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
};
