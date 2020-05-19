import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { googleAnalytics } from '../common/google-analytics/googleAnalytics-sidecar'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={googleAnalytics.getScriptSrc()} />
          <script
            dangerouslySetInnerHTML={{
              __html: googleAnalytics.getScriptTag(),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
