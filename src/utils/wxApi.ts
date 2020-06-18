export namespace User {
  export const createTagApi = 'https://api.weixin.qq.com/cgi-bin/tags/create'
  export const getTagsApi = 'https://api.weixin.qq.com/cgi-bin/tags/get'
  export const updateTagApi = 'https://api.weixin.qq.com/cgi-bin/tags/update'
  export const delTagApi = 'https://api.weixin.qq.com/cgi-bin/tags/delete'  
  export const getOpenIDByTagApi = 'https://api.weixin.qq.com/cgi-bin/user/tag/get'
  export const setUserTagApi = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging'
  export const cancelUserTagApi = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging'
  export const getUserTagsApi = 'https://api.weixin.qq.com/cgi-bin/tags/getidlist'
  export const updateUserRemarkApi = 'https://api.weixin.qq.com/cgi-bin/user/info/updateremark'
  export const getUserInfoApi = 'https://api.weixin.qq.com/cgi-bin/user/info'
  export const getUserInfoListApi = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget'
  export const getUserListAPi = 'https://api.weixin.qq.com/cgi-bin/user/get'
  export const getBackListApi = 'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist'
  export const batchBlackListApi = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist'
  export const cancelBlackListApi = ' https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist'
}

export namespace Account {
  export const createQRCodeApi = 'https://api.weixin.qq.com/cgi-bin/qrcode/create' 
  export const shorturlApi = 'https://api.weixin.qq.com/cgi-bin/shorturl'
}