const env = process.env.NODE_ENV
const version = process.env.VERSION

// todo 测试专用记得更新
const DEV = {
  api: 'http://social-shopping-api.jerryf.cn',
  image: 'https://img.jerryf.cn/defaults',
  upload: 'http://social-shopping-api.jerryf.cn',
  outLink: 'https://fresh-h5.jkweixin.net' // 外部h5链接
}

const TEST = {
  api: 'https://social-shopping-api.jkweixin.net',
  image: 'https://img.jkweixin.net/defaults',
  upload: 'https://social-shopping-api.jkweixin.net',
  outLink: 'https://fresh-h5.jkweixin.net'
}

const PROD = {
  api: 'https://social-shopping-api.jkweixin.com/' + version,
  image: 'https://img.jkweixin.com/defaults',
  upload: 'https://social-shopping-api.jkweixin.com/' + version,
  outLink: 'https://fresh-h5.jkweixin.com'
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV

export const ERR_OK = 0
export const TIME_OUT = 10000
export const ERR_NO = -404
export const TOKEN_OUT = 10000 // token 失效
