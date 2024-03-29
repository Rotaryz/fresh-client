import {corp} from '@utils/saas'
const env = process.env
const version = process.versions

const DEV = {
  api: 'http://social-shopping-api.jerryf.cn/social-shopping' + version,
  marketApi: 'http://market-api.jkweixin.jerryf.cn/market' + version,
  image: 'https://img.jkweixin.net/defaults',
  upload: 'http://social-shopping-api.jerryf.cn/social-shopping' + version,
  outLink: 'wss://fresh-h5.jkweixin.net', // 外部h5链接
  websocket: 'wss://wss.jerryf.cn/',
  webview: 'https://fresh-h5.jkweixin.net',
  defaultId: corp.defaultId
}

const TEST = {
  api: 'https://social-shopping-api.jkweixin.net/social-shopping' + version,
  marketApi: 'https://market-api.jkweixin.net/market' + version,
  image: 'https://img.jkweixin.net/defaults',
  upload: 'https://social-shopping-api.jkweixin.net/social-shopping' + version,
  outLink: 'https://fresh-h5.jkweixin.net',
  websocket: 'wss://wss.jkweixin.net',
  webview: 'https://fresh-h5.jkweixin.net',
  defaultId: corp.defaultId
}

const PROD = {
  api: 'https://social-shopping-api.jkweixin.com/social-shopping' + version,
  marketApi: 'https://market-api.jkweixin.com/market' + version,
  image: 'https://img.jkweixin.com/defaults',
  upload: 'https://social-shopping-api.jkweixin.com/social-shopping' + version,
  outLink: 'https://fresh-h5.jkweixin.com',
  websocket: 'wss://wss.jkweixin.com',
  webview: 'https://fresh-h5.jkweixin.com',
  defaultId: corp.defaultId
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV

export const ERR_OK = 0
export const TIME_OUT = 10000
export const ERR_NO = -404
export const TOKEN_OUT = 10000 // token 失效
