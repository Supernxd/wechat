import { getWxMPApi, postWxMPApi } from './token'

/**
 * 
 */
const getTemplateList = () => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/template/get_all_private_template`
    getWxMPApi(url).then((resData) => {
      return resolve(resData)
    }).catch((err) => {
      console.error('getTemplateList 调用失败', err)
      return reject('调用失败')
    });
  })
}

/**
 * 
 * @param {string} openId 
 * @param {string} templateId 
 * @param {Object} fillData eg: first: {value, ?color}
 */
const sendTemplateMsg = (openId, templateId, fillData) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send`
    const body = JSON.stringify({
      touser: openId,
      template_id: templateId,
      data: fillData,
    })
    postWxMPApi(url, body).then((resData) => {
      if (resData.errcode === 0){
        return resolve(resData)
      }
      return reject(resData.errmsg)
    }).catch((err) => {
      console.error('sendTemplateMsg 调用失败', err)
      return reject('调用失败')
    });
  })
}

export { 
  getTemplateList,
  sendTemplateMsg,
}
