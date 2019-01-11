/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgCode： 图片验证码地址
 *
 */
let baseUrl;
let routerMode;
let imgCode;
let mainUrl;
let ssoUrl;

if (process.env.NODE_ENV == 'development') {
  baseUrl = '';
  routerMode = 'hash'
  imgCode = 'http://hpweb.qisheng.me/api/code'
} else {
  baseUrl = '';
  routerMode = 'hash'
  imgCode = '/api/code'
    mainUrl = 'http://test-user-center.test176.cn/'//测式网
    ssoUrl = 'http://test-user-center.test176.cn/'//测式网
  //mainUrl = 'http://user-center.zhihuipk.com/'; //正式网
  //ssoUrl = 'http://user-center.zhihuipk.com/'//正式网
}

export {
  baseUrl,
  routerMode,
  imgCode,
  mainUrl,
  ssoUrl,
}
