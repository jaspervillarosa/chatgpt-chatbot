import React from 'react';
import Head from 'next/head';
import { Poppins } from '@next/font/google';

import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '@/styles/globals.css';
import '@/styles/general.scss';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Head>
      <title> ChatGPT Chatbot </title>
        <meta name="description" content="ChatGPT Chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ChatGPT Chatbot" />
        <meta property="og:description" content="ChatGPT Chatbot" /> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={poppins.className}>
        <Component {...pageProps} />
      </div>
    </React.StrictMode>
  )
}
