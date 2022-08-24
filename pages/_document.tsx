import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { googleAnalytics } from '../common/google-analytics/googleAnalytics-sidecar'

export default class MyDocument extends Document {
  render() {
    return (
      <Html className='h-full bg-gray-100'>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={googleAnalytics.getScriptSrc()} />
          <script
            dangerouslySetInnerHTML={{
              __html: googleAnalytics.getScriptTag(),
            }}
          />
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
        </Head>
        <body className='h-full'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
