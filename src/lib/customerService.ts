import { getWxMPApi, postWxMPApi } from './token'

// 客服号查询
const getKFList = () => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/customservice/getkflist`
    getWxMPApi(url).then((resData) => {
      return resolve(resData)
    }).catch((err) => {
      console.error('getKFList 调用失败')
      return reject('调用失败')
    });
  })
}

// 以客服号发送消息
const sendKFMsg = (OpenID: string, KFAccount: string) => {
  return new Promise(async (resolve, reject) => {
    const jsonData = JSON.stringify({
      "touser": OpenID,
      "msgtype":"text",
      "text":
      {
        "content":"正在连入人工客服"
      },
      "customservice":
      {
        "kf_account": KFAccount
      }
    })
    const url = `https://api.weixin.qq.com/cgi-bin/message/custom/send`
    postWxMPApi(url, jsonData).then((resData) => {
      console.log(resData)
      return resolve(resData)
    }).catch((err) => {
      console.error('sendKFMsg 调用失败', err)
      return reject('调用失败')
    });
  })
}

/**
 * 添加客服
 * kf_account	完整客服帐号，格式为：帐号前缀@公众号微信号，帐号前缀最多10个字符，必须是英文、数字字符或者下划线，后缀为公众号微信号，长度不超过30个字符
 * nickname	客服昵称，最长16个字
*/ 
const addKF = (kf_account: string, nickname: string) => {
  return new Promise(async (resolve, reject) => {
    const jsonData = JSON.stringify({
      kf_account,
      nickname
    })
    const url = `https://api.weixin.qq.com/customservice/kfaccount/add`
    postWxMPApi(url, jsonData).then((resData) => {
      console.log(resData)
      return resolve(JSON.stringify(resData))
    }).catch((err) => {
      console.error('addKF 调用失败', err)
      return reject('调用失败')
    });
  })
}

/**
 * 邀请绑定客服帐号
 * kf_account	完整客服帐号，格式为：帐号前缀@公众号微信号
 * invite_wx	接收绑定邀请的客服微信号
 * 
*/
const bindKF = (kf_account: string, invite_wx: string) => {
  return new Promise(async (resolve, reject) => {
    const jsonData = JSON.stringify({
      kf_account,
      invite_wx
    })
    const url = `https://api.weixin.qq.com/customservice/kfaccount/inviteworker`
    postWxMPApi(url, jsonData).then((resData) => {
      console.log(resData)
      return resolve(JSON.stringify(resData))
    }).catch((err) => {
      console.error('addKF 调用失败', err)
      return reject('调用失败')
    });
  })
}

export {
  getKFList,
  sendKFMsg,
  addKF,
  bindKF,
}