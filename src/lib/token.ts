import { get, post } from '../utils/rp'

interface Token {
  accessToken: string,
  timeStamp: number
}

let token: Token = {
  accessToken: '34_vDJNvr9MI4S6XhMb8Det_tyXh0Fv54pnE5Mm8B-3zHyCW_Tdxfg2VgcH4Uvyk3NOFdcwIPN8ohgj5BbcAQkIA1GQ7-LZ_oHknqs_5SFhQkDSoYvmhIz1yktbHhyA0aIyyrCgOhIdp7fnGHfyPYKhAFALUG',
  timeStamp: 1592392488788
}

export const getToken = () : Promise<Token> => {
  return new Promise((resolve, reject) => {
    if(!token.accessToken || !token.timeStamp || token.timeStamp < new Date().getTime()){
      const url: string = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${'wx0410f5beb4c5eec3'}&secret=${'b3ea4c2c1a45c16a91a2ab2262ce5806'}`
      get(url).then((resData) => {
        token.accessToken = resData.access_token
        token.timeStamp = Number(resData.expires_in) * 1000 + Number(new Date().getTime())
        console.log('重新获取token', token)
        return resolve(token)
      }).catch((err) => {
        console.error(err)
        return reject('调用失败')
      });
    }else{
      resolve(token)
    }
  })
}

const makeUrl = (url: string, token: string, query?: object): string => {
  let param = `?access_token=${token}`
  if(query) {
    for (const [key, value] of Object.entries(query)) {
      param += `&${key}=${value}`
    }
  }
  return url + param
}

export const postWxMPApi = async (url: string, data: object | string, query?: object, config?: object) => {
  try {
    let token = await getToken()
    const wxUrl = makeUrl(url, token.accessToken, query)
    return post(wxUrl, data, config)
  } catch (error) {
    throw error 
  }
}

export const getWxMPApi = async (url: string, query?: object, config?: object) => {
  try {
    let token = await getToken()
    const wxUrl = makeUrl(url, token.accessToken, query)
    return get(wxUrl, config)
  } catch (error) {
    throw error 
  }
}
