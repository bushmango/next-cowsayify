import fetch from 'isomorphic-unfetch'

import {
  createError,
  createRequesting,
  createSuccess,
  IApiRequestState,
} from './apiRequestState'
import _ from 'lodash'
import { browser } from '../browser/browser-sidecar'
import { log } from '../log/log'

export async function post<T>(
  url: string,
  data?: any,
  onProgress?: (r: IApiRequestState<T>) => void,
) {
  return request<T>('POST', url, data, onProgress)
}

let doFetch = async (url: string, options: any) => {
  let result = await fetch(url, options)
  return result
}

let _getDefaultParams = () => {
  return {}
}
export const setGetDefaultParams = (getDefaultParams: () => any) => {
  _getDefaultParams = getDefaultParams
}

export async function request<T extends {}>(
  method: string,
  url: string,
  data?: any,
  onProgress?: (r: IApiRequestState<T>) => void,
) {
  if (!url.startsWith('/api/')) {
    throw new Error(`url must start with /api/ ${url}`)
  }

  // Covert to gateway
  let path = url
  url = '/api/gateway?path' + path

  if (!browser.documentExists) {
    // Server
    const host = process.env.FETCH_SERVER_HOST
    url = host + url
    console.log('server-fetch', url)
  } else {
    log('fetch', url)
  }

  let r = createRequesting<T>()
  if (onProgress) {
    onProgress(r)
  }

  data = _.assign({}, _getDefaultParams() || {}, data, { path })
  try {
    let result = await doFetch(url, {
      method,
      body: method === 'POST' ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (result.ok) {
      let json = await result.json()

      if (json.error || json.isError) {
        r = createError<T>(r, json.error)
        if (onProgress) {
          onProgress(r)
        }
      } else {
        r = createSuccess<T>(r, json)
        if (onProgress) {
          onProgress(r)
        }
      }
      return r
    } else {
      r = createError<T>(r, {
        isError: true,
        error: result.status,
        text: result.statusText,
        errorType: 'server-request',
      })
      if (onProgress) {
        onProgress(r)
      }
      return r
    }
  } catch (err) {
    r = createError<T>(r, err)
    if (onProgress) {
      onProgress(r)
    }
    return r
  }
}

export async function getFile<T>(url: string, data: any) {
  return request<T>('GETFILE', url, data, () => {})
}
