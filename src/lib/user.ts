import { getWxMPApi, postWxMPApi } from './token'
import { User } from '../utils/wxApi'
import { wxResult } from '../utils/common'

/**
 * 用户管理
 * 文档: https://developers.weixin.qq.com/doc/offiaccount/User_Management/User_Tag_Management.html
 */

interface userList {
  openid: string
  lang?: string
}

// 标签管理 --------------------------------
/**
 * 创建标签
 * @param name 标签名（30个字符以内）
 * @return data: {id, name}
 */
export const createTag = (name: string): Promise<wxResult> => {
  return new Promise(async (resolve, reject) => {
    const data = {
      tag: { name }
    }
    postWxMPApi(User.createTagApi, data).then(resData => {
      return resolve({success: true, msg: '成功', data: resData.tag})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 获取已创建标签
 * @returns data: {tags: []}
 */
export const getTag = (): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {

    getWxMPApi(User.getTagsApi).then(resData => {
      return resolve({success: true, msg: '成功', data: resData})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 编辑标签
 * @param id 标签id，由微信分配
 * @param name 标签名
 */
export const updateTag = (id: number, name: string): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    const data = {
      tag: { id, name }
    }
    postWxMPApi(User.updateTagApi, data).then(resData => {
      return resolve({success: true, msg: '成功'})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 删除标签
 * @param id 标签id，由微信分配
 */
export const delTag = (id: number): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    const data = {
      tag: { id }
    }
    postWxMPApi(User.delTagApi, data).then(resData => {
      return resolve({success: true, msg: '成功'})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 获取标签下粉丝列表 多次调用全部获取
 * @param tagid 
 * @returns data: {list:[] openid列表}
 */
export const getUserByTag = (tagid: number): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    let userList = []
    const getList = (next_openid: string = '') => {
      let data = {
        tagid,
        next_openid
      }
      postWxMPApi(User.getOpenIDByTagApi, data).then(resData => {
        const { count, data, next_openid} = resData
        if(count > 0) {
          userList = userList.concat(data.openid)
          getList(next_openid)
        } else {
          return resolve({success: true, msg: '成功', data: {list: userList}}) 
        }
      }).catch(err => {
        return reject({success: false, msg: err.message || err})
      })
    }
    getList()
  })
} 

/**
 * 批量为用户打标签 标签功能目前支持公众号为用户打上最多20个标签。
 * @param openid_list openID列表 不能超过50个
 * @param tagid 标签id
 */
export const batchTag = (openid_list: Array<string>, tagid: string): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    postWxMPApi(User.setUserTagApi, {openid_list, tagid}).then(resData => {
      return resolve({success: true, msg: '成功'})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 批量为用户取消标签
 * @param openid_list openID列表 不能超过50个
 * @param tagid 标签id
 */
export const batchUnTag = (openid_list: Array<string>, tagid: string): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    postWxMPApi(User.cancelUserTagApi, {openid_list, tagid}).then(resData => {
      return resolve({success: true, msg: '成功'})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 获取用户身上的标签列表
 * @param openid 用户openid
 * @returns data: [] tags列表
 */
export const getUserTags = (openid: string): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    postWxMPApi(User.getUserTagsApi, {openid}).then(resData => {
      return resolve({success: true, msg: '成功', data: resData.tagid_list})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 对指定用户设置备注名，该接口暂时开放给微信认证的服务号
 * @param openid 用户标识
 * @param remark 新的备注名，长度必须小于30字符
 */
export const updateUserRemark = (openid: string, remark: string): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    postWxMPApi(User.updateUserRemarkApi, {openid, remark}).then(resData => {
      return resolve({success: true, msg: '成功'})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  }) 
}

/**
 * 获取用户基本信息（包括UnionID机制）
 * @param openid 用户标识
 * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
 * @returns data: {} 用户信息
 */ 
export const getUserInfo = (openid: string, lang: string = 'zh_CN'): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    getWxMPApi(User.getUserInfoApi, {openid, lang}).then(resData => {
      return resolve({success: true, msg: '成功', data: resData})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 批量获取用户基本信息 最多支持一次拉取100条
 * @param user_list 需要来去用户列表
 * @returns data: user_info_list 用户信息列表
 */
export const getUserInfoList = (user_list: Array<userList>): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    postWxMPApi(User.getUserInfoListApi, {user_list}).then(resData => {
      return resolve({success: true, msg: '成功', data: resData.user_info_list})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  }) 
}

/**
 * 获取帐号的关注者列表，一次拉取调用最多拉取10000个关注者的OpenID
 * @param next_openid 第一个拉取的OPENID，不填默认从头开始拉取
 * @returns data: {total: 总数, list: 用户openid列表}
 */
export const getUserList = (next_openid: string = ''): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    let userList = []
    const getList = (next_openid: string) => {
      getWxMPApi(User.getUserListAPi, {next_openid}).then(resData => {
        const { total, data, next_openid} = resData
        if(next_openid) {
          userList = userList.concat(data.openid)
          getList(next_openid)
        } else {
          return resolve({success: true, msg: '成功', data: {list: userList, total}}) 
        }
      }).catch(err => {
        return reject({success: false, msg: err.message || err})
      });
    }
    getList(next_openid)  
  })
}

// 黑名单管理--------------------------
/**
 * 获取公众号的黑名单列表 该接口每次调用最多可拉取 10000 个OpenID
 * @param begin_openid 当 begin_openid 为空时，默认从开头拉取。
 * @returns data: {total: 总数, list: 用户openid列表}
 */
export const getBlackList = (begin_openid: string = ''): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    let userList = []
    const getList = (begin_openid: string) => {
      postWxMPApi(User.getBackListApi, {begin_openid}).then(resData => {
        const { total, data, next_openid} = resData
        if(next_openid) {
          userList = userList.concat(data.openid)
          getList(next_openid)
        } else {
          return resolve({success: true, msg: '成功', data: {list: userList, total}}) 
        }
      }).catch(err => {
        return reject({success: false, msg: err.message || err})
      });
    }
    getList(begin_openid)
  })
}

/**
 * 拉黑用户
 * @param openid_list 需要拉入黑名单的用户的openid，一次拉黑最多允许20个
 */
export const batchBlackList = (openid_list: Array<string>): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    postWxMPApi(User.batchBlackListApi, {openid_list}).then(resData => {
      return resolve({success: true, msg: '成功'})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

/**
 * 取消拉黑用户
 * @param openid_list 
 */
export const cancelBlackList = (openid_list: Array<string>): Promise<wxResult>  => {
  return new Promise(async (resolve, reject) => {
    postWxMPApi(User.cancelBlackListApi, {openid_list}).then(resData => {
      return resolve({success: true, msg: '成功'})
    }).catch(err => {
      return reject({success: false, msg: err.message || err})
    });
  })
}

