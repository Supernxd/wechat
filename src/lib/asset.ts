const fs = require('fs')
import { getWxMPApi, postWxMPApi } from './token'

/**
 * 根据MIMETYPE返回类型
 * @param {object} file 
 * 图片（image）: 2M，支持PNG\JPEG\JPG\GIF格式
 * 语音（voice）：2M，播放长度不超过60s，支持AMR\MP3格式
 * 视频（video）：10MB，支持MP4格式
 * 缩略图（thumb）：64KB，支持JPG格式
 */
const fileCheck = (file) => {
  let type = ''
  switch (file.type){
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif': type = 'image'; break;
    case 'audio/AMR':
    case 'audio/mpeg': type = 'voice'; break;
    case 'video/mp4': type = 'video'; break;
  }
  return type
}

// TODO 是否需要保存临时素材
// hguo9NurHFcvQ_O4RNyeVvdUCRvFmseuRZ-MHJ8iLChkYZv5MWFjmlwWmENZ5DvH
const addTemplateMaterial = (file: any, type?: string) => {
  return new Promise(async (resolve, reject) => {
    if(!type)
      type = fileCheck(file)
    if(type === '') return reject('请上传正确的文件')
    const url = `https://api.weixin.qq.com/cgi-bin/media/upload`
    const formData = {
      media: {
        value: fs.createReadStream(file.path),
        options: {
            filename: file.name,
            contentType: file.type
        }
      }
    }
    postWxMPApi(url, formData, {type}).then((resData) => {
      // media_id:"hguo9NurHFcvQ_O4RNyeVvdUCRvFmseuRZ-MHJ8iLChkYZv5MWFjmlwWmENZ5DvH"
      // type:"image"
      return resolve(resData)
    }).catch((err) => {
      console.error('addTemplateMaterial 调用失败')
      return reject('调用失败')
    });
  })
}

const getTemplateMaterial = (mediaId: string) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/media/get`
    getWxMPApi(url, {media_id: mediaId}).then((resData) => {
      // TODO 上传不同的类型返回的数据不同
      console.log(resData)
      return resolve(resData)
    }).catch((err) => {
      console.error('getTemplateMaterial 调用失败')
      return reject('调用失败')
    });
  })
}

// 新增永久素材
const addMaterial = (file: any, type?: string) => {
  return new Promise(async (resolve, reject) => {
    if(!type)
      type = fileCheck(file)
    if(type === '') return reject('类型查询失败')
    const url = `https://api.weixin.qq.com/cgi-bin/material/add_material`
    const formData = {
      media: {
        value: fs.createReadStream(file.path),
        options: {
            filename: file.name,
            contentType: file.type
        }
      }
    }
    postWxMPApi(url, formData, {type}).then((resData) => {
      //  media_id:"SNaNvBlSLSnjFAYStpZ7OcQqKRooI0HEXq_nmqhz2DY"
      // url:"http://mmbiz.qpic.cn/mmbiz_png/RsyiamTXjRP6YqRhd3TnQF1wqhyR5vlef58w183uDGMHBGDaJwzticobLSiamUIMnkt2H5k2e05wK2lEVlc94FgWQ/0?wx_fmt=png"
      return resolve(resData)
    }).catch((err) => {
      console.error('addTemplateMaterial 调用失败')
      return reject('调用失败')
    });
  }) 
}

// 获取永久素材
const getMaterial = (mediaId: string) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/material/get_material`
    const body = {
      "media_id":mediaId
    }
    postWxMPApi(url, body).then((resData) => {
      // TODO 上传不同的类型返回的数据不同
      console.log(resData)
      return resolve(resData)
    }).catch((err) => {
      console.error('getTemplateMaterial 调用失败')
      return reject('调用失败')
    });
  })
}

// 删除永久素材
const delMaterial = (mediaId: string) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/material/del_material`
    const body = {
      "media_id":mediaId
    }
    postWxMPApi(url, body).then((resData) => {
      if(resData.errcode === 0) 
        return resolve('成功')
      else
        return reject(resData.errmsg)
    }).catch((err) => {
      console.error('getTemplateMaterial 调用失败')
      return reject('调用失败')
    });
  })
}

export {
  addTemplateMaterial,
  getTemplateMaterial,
  addMaterial,
  getMaterial,
  delMaterial,
}