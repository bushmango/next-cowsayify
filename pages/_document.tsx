import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { googleAnalytics } from '../common/google-analytics/googleAnalytics-sidecar'

export const Favicon = () => {
  return (
    <>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      ></link>
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      ></link>
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      ></link>
    </>
  )
}

export const GoogleAnalyticsTags = () => {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <link rel='manifest' href='/site.webmanifest'></link>
      <script async src={googleAnalytics.getScriptSrc()} />
      <script
        dangerouslySetInnerHTML={{
          __html: googleAnalytics.getScriptTag(),
        }}
      />
    </>
  )
}

export const GoogleFonts = () => {
  return (
    <>
      <link
        href='https://fonts.googleapis.com/css?family=Nunito&display=swap'
        rel='stylesheet'
      ></link>
      <link rel='preconnect' href='https://fonts.googleapis.com'></link>
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      ></link>
      <link
        href='https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap'
        rel='stylesheet'
      ></link>
    </>
  )
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html className='h-full bg-gray-100'>
        <Head>
          <Favicon />
          <GoogleAnalyticsTags />
          <GoogleFonts />
        </Head>
        <body className='h-full'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
