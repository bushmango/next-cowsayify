// see: https://github.com/zeit/next.js/blob/canary/examples/with-google-analytics/lib/gtag.js
// see: https://developers.google.com/analytics/devguides/collection/gtagjs
import Router from 'next/router'
import { browser } from '../browser/browser-sidecar'

const noop = () => {}

export const GA_TRACKING_ID =
  process.env.GA_TRACKING_ID || 'ga-tracking-id-not-set'

export const getGtag = () => {
  if (browser.windowExists) {
    return (browser.getWindow() as any).gtag || noop
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  getGtag()('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (options: {
  action: string
  category: string
  label: string
  value: any
}) => {
  getGtag()('event', options.action, {
    event_category: options.category,
    event_label: options.label,
    value: options.value,
  })
}

export const installRouteTracker = () => {
  Router.events.on('routeChangeComplete', (url) => pageview(url))
}

export const getScriptSrc = () => {
  return `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
}
export const getScriptTag = () => {
  return `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_TRACKING_ID}', {
    page_path: window.location.pathname,
  });
`
}
