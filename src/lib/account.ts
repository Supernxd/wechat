import { postWxMPApi } from './token'
import { Account } from '../utils/wxApi'
import { wxResult } from '../utils/common'

// 二维码类型
enum actionName { 
  QR_SCENE = 'QR_SCENE', // 为临时的整型参数值
  QR_STR_SCENE = 'QR_STR_SCENE', // 为临时的字符串参数值
  QR_LIMIT_SCENE = 'QR_LIMIT_SCENE', //永久的整型参数值
  QR_LIMIT_STR_SCENE = 'QR_LIMIT_STR_SCENE' //永久的字符串参数值
}
interface actionInfo {
  scene_id?: number,
  scene_str?: string
}
// 微信账号管理 -----------------------------------
/**
 * 每次创建二维码ticket需要提供一个开发者自行设定的参数（scene_id）
 * @param action_name 二维码类型
 * @param action_info 二维码详细信息 scene_id	场景值ID，临时二维码时为32位非0整型，永久二 维码时最大值为100000（目前参数只支持1--100000）scene_str	场景值ID（字符串形式的ID），字符串类型，长度限制为1到64
 * @param expire_seconds 	该二维码有效时间，以秒为单位。 最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒
 * @returns ticket	获取的二维码ticket，凭借此ticket可以在有效时间内换取二维码。
  expire_seconds	该二维码有效时间，以秒为单位。 最大不超过2592000（即30天）。
  url	二维码图片解析后的地址，开发者可根据该地址自行生成需要的二维码图片
 */
const createQRCode = (action_name: actionName, action_info: string | number, expire_seconds?: number): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    let scene: actionInfo = {}
    if(typeof action_info === 'number') {
      scene.scene_id = action_info
    } else {
      scene.scene_str = action_info
    }
    postWxMPApi(Account.createQRCodeApi, {
      action_name, 
      action_info: {scene},
      expire_seconds,
    }).then(resData => {
      return resolve({success: true, msg: '成功', data: resData})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 将一条长链接转成短链接
 * @param long_url 长连接
 * @returns data: 短连接
 */
const shorturl = (long_url: string): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    postWxMPApi(Account.shorturlApi, {
      action: 'long2short',
      long_url
    }).then(resData => {
      return resolve({success: true, msg: '成功', data: resData.short_url})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

// TODO 未测试
// 用ticket换取图片并没有实现
// 微信账号管理
// 文档 https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html
export default {
  createQRCode,
  shorturl
}