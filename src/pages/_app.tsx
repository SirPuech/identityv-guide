import React from 'react';
import type { AppProps } from 'next/app';
import { LangProvider } from '../context/LangContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LangProvider>
      <Component {...pageProps} />
    </LangProvider>
  );
}
