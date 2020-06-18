import { getWxMPApi, postWxMPApi } from './token'

/**
 * 获取微信菜单
 */
const getMenu = () => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info`
    getWxMPApi(url).then((resData) => {
      if (resData.errcode > 0){
        console.log(resData.errmsg)
        return reject('调用失败') 
      } 
      return resolve(resData.selfmenu_info)
    }).catch((err) => {
      console.error('getMenuList 调用失败', err)
      return reject('调用失败')
    });
  })
}

/**
 * 创建菜单
 * @param data 菜单数据
 */
const createMenu = (data: object) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create`
    postWxMPApi(url, { data }).then((resData) => {
      if(resData.errcode === 0) {
        resolve('成功')
      } else {
        console.log('createMenuListFail', resData.errmsg)
        reject('创建失败')
      }
    }).catch((err) => {
      console.error('createMenuList 调用失败', err)
      return reject('调用失败')
    });
  })
}

/**
 * 删除菜单
 */
const delMenu = () => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete`
    getWxMPApi(url).then((resData) => {
      if(resData.errcode === 0) {
        resolve('成功')
      } else {
        console.log('deleteMenuListFail', resData.errmsg)
        reject('删除失败')
      }
    }).catch((err) => {
      console.error('deleteMenuList 调用失败', err)
      return reject('调用失败')
    });
  })
}

/**
 * 创建个性化菜单
 * @param data 个性化菜单
 */
const createPersonalMenu = (data: object) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/addconditional`
    postWxMPApi(url, data).then((resData) => {
      console.log('createPersonalMenu', resData)
      if(resData.errcode === 0) {
        resolve(resData)
      } else {
        reject('创建失败')
      }
    }).catch((err) => {
      console.error('createPersonalMenu', err)
      return reject('调用失败')
    });
  })
}

/**
 * 删除个性化菜单
 * @param menuid 菜单ID
 */
const delPersonalMenu = (menuid: string) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delconditional`
    postWxMPApi(url, { menuid }).then((resData) => {
      console.log('delPersonalMenu', resData)
      if(resData.errcode === 0) {
        resolve(resData)
      } else {
        reject('创建失败')
      }
    }).catch((err) => {
      console.error('delPersonalMenu', err)
      return reject('调用失败')
    });
  })
}

/**
 * 测试个性化菜单匹配结果
 * @param user_id 可以是粉丝的OpenID，也可以是粉丝的微信号
 */
const testPersonalMenu = (user_id: string) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/trymatch`
    postWxMPApi(url, { user_id }).then((resData) => {
      console.log('testPersonalMenu', resData)
      if(resData.errcode === 0) {
        resolve(resData)
      } else {
        reject('创建失败')
      }
    }).catch((err) => {
      console.error('testPersonalMenu', err)
      return reject('调用失败')
    });
  })
}

/**
 * 查询自定义菜单的结构
 */
const getPersonalMenu = () => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/get`
    getWxMPApi(url).then((resData) => {
      if(resData.errcode === 0) {
        resolve('成功')
      } else {
        console.log('deleteMenuListFail', resData.errmsg)
        reject('删除失败')
      }
    }).catch((err) => {
      console.error('deleteMenuList 调用失败', err)
      return reject('调用失败')
    });
  })
}



/**
 * 自定义菜单
 * 详情: https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
 * 个性化菜单
 * 详情: https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Personalized_menu_interface.html
 * 查询和删除使用默认普通查询接口
 */
export {
  createMenu,
  delMenu,
  getMenu,
  createPersonalMenu,
  delPersonalMenu,
  testPersonalMenu,
  getPersonalMenu
}