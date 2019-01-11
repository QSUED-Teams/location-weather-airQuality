import axios from 'axios'
import {mainUrl, ssoUrl} from "../config/env";
import * as mobile from "../config/mUtils";

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let channelId = sessionStorage.getItem('channelId');
  let adminAccount = sessionStorage.getItem('adminAccount');
  let allSessionId = sessionStorage.getItem('allSessionId');
  let permissionId = sessionStorage.getItem('permissionId');
  // if (!channelId || !adminAccount || !allSessionId || !permissionId) {
  //   location.href = localStorage.getItem('channelChannelUrl') ? localStorage.getItem('channelChannelUrl') : localStorage.getItem('channelUrl');
  // }
  config.headers['channelId'] = channelId;
  config.headers['adminAccount'] = adminAccount;
  config.headers['allSessionId'] = allSessionId;
  config.headers['permissionId'] = permissionId;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  if (response.data.code == 2) {
    // alert('登录超时，请重新登录！');
    let channelChannelUrl = localStorage.getItem('channelChannelUrl') ? localStorage.getItem('channelChannelUrl') : localStorage.getItem('channelUrl');
    channelChannelUrl = JSON.parse(JSON.stringify(channelChannelUrl));
    if (channelChannelUrl) {
      sessionStorage.clear();
      location.href = channelChannelUrl;
      localStorage.clear();
    } else {
      let url = mobile.getQueryString('channelChannelUrl');
      let formUrl = mobile.getQueryString('fromUrl');
      if (url) {
        sessionStorage.clear();
        location.href = decodeURIComponent(url);
        localStorage.clear();
      } else if (formUrl) {
        sessionStorage.clear();
        location.href = decodeURIComponent(formUrl);
        localStorage.clear();
      }
    }
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
});


var districtAll = (level, keyword) => axios.get(`http://restapi.amap.com/v3/config/district?subdistrict=1&extensions=all&key=9d4f5c2078ba12cb9d9d09c4e81c95d0&s=rsv3&output=json&level=${level}&keywords=${keyword}&platform=JS`)

var city = (code) => axios.get(`../../static/mapdata/geometryCouties/${code}.json`)

var district = (code) => axios.get(`../../static/mapdata/geometryProvince/${code}.json`)

var china = (code) => axios.get(`../../static/mapdata/china.json`)

/**
 * 接待记录分析(group by——月份)
 * @param session
 * @param buildIds
 * @return
 * @throws Exception
 */
let findReceptionByMonth = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'api/Screen/findReceptionByMonth', {params: params});

/**
 * 每个季度的成单数
 * @param session
 * @param buildIds
 * @return
 * @throws Exception
 */
let findContractSuccess = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'api/Screen/findContractSuccess', {params: params});

/**
 * 最新款项确收
 参数名  必选  类型  说明
 buildIds  否  string  楼宇ids
 */
let latestPayData = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/latestPayData', {params: params});

/*
 * 本月成本费用占比
 */

let costData = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'api/Screen/costData', {params: params});

/*
* 房源租赁情况分析和本月招商客户分析和历史入驻率
*/

let bossKanban = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'api/Screen/bossKanban', {params: params});

/*
 * 入驻企业行业分析
 * 参数名	必选	类型	说明
type	是	int	类型 1—企业 2—商户
buildIds	否	string	楼宇ids
 */

let enterCompanyData = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/enterCompanyData', {params: params});

/*
 * 合同到期监控
 * 参数名	必选	类型	说明
buildIds	否	string	楼宇Ids
 */

let contractExpires = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/contractExpires', {params: params});

/*
 * 楼宇入住率
 * 参数名	必选	类型	说明
buildIds	否	string	楼宇ids
 */

let buildEnterData = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/buildEnterData', {params: params});

/*
 * 获取渠道id
 */

let getChannelIdByChannelId = (params) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'api/Screen/getChannelIdByChannelId', {params: params});

/**
 新增大屏接口
 参数名  必选  类型  说明
 dataScreenName  是  string  数据大屏名
 dataMouldId  是  Long  数据模板Id
 dataMouldPositionX  是  int  数据模板在操作面板上X轴的位置
 dataMouldPositionY  是  int  数据模板在操作面板上Y轴的位置
 */
const addDataScreen = (data) => axios.post((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/addDataScreen', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 编辑数据大屏接口
 参数名  必选  类型  说明
 dataScreenName  是  string  数据大屏名
 dataMouldId  是  Long  数据模板Id
 dataMouldPositionX  是  int  数据模板在操作面板上X轴的位置
 dataMouldPositionY  是  int  数据模板在操作面板上Y轴的位置
 */
const updateDateScreen = (data) => axios.post((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/updateDateScreen', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 获取数据模板列表接口
 */
const dataMouldList = () => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/dataMouldList');

/**
 数据模板展示详情
 参数名  必选  类型  说明
 dataScreenId  是  long  数据大屏Id
 */
const dataScreenDetail = (dataScreenId) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/dataScreenDetail', {params: {dataScreenId: dataScreenId}});

/**
 新媒体运营分析接口
 */
const parkMediaCount = () => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/parkMediaCount');

/**
 热门活动分析接口
 */
const hotActivity = () => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/hotActivity');

/**
 注册用户分析
 */
const registerUser = () => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/registerUser');

/**
 水电成本支出接口
 */
const waterAndEleCost = () => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/waterAndEleCost');

/**
 水电收入分析接口
 */
const waterAndEleInCome = () => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/waterAndEleInCome');

/**
 房源租赁情况分析
 */
const houseData = () => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/houseData');

/**
 每月租户和面积成交分析
 参数名  必选  类型  说明
 buildIds  否  string  楼宇Ids
 */
const dealRentData = (buildIds) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/dealRentData', {params: {buildIds: buildIds ? buildIds : ''}});

/**
 园区楼宇数据分析
 参数名  必选  类型  说明
 buildIds  否  string  楼宇Ids
 */
const buildData = (buildIds) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/buildData', {params: {buildIds: buildIds ? buildIds : ''}});

/**
 本月招商行业分析
 参数名  必选  类型  说明
 buildIds  否  string  楼宇ids
 */
const attrTypeCompany = (type, buildIds) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/attrTypeCompany', {
  params: {
    type: type,
    buildIds: buildIds ? buildIds : ''
  }
});

/**
 本月招商客户分析
 参数名  必选  类型  说明
 buildIds  否  string  楼宇ids
 */
const attrType = (buildIds) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/attrType', {
  params: {
    buildIds: buildIds ? buildIds : ''
  }
});

/**
 招商员业绩分析
 参数名  必选  类型  说明
 type  是  int  0月 1季
 buildIds  否  string  楼宇ids
 */
const performanceData = (type, buildIds) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/performanceData', {
  params: {
    type: type,
    buildIds: buildIds ? buildIds : ''
  }
});

/**
 招商需求面积分析
 */
const selectAttrTotalData = (type, buildIds) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/selectAttrTotalData');

/**
 客户来访次数分析
 参数名  必选  类型  说明
 type  是  int  0月 1季
 buildIds  否  string  楼宇ids
 */
const findReceptionByTimes = (type, buildIds) => axios.get((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/findReceptionByTimes', {
  params: {
    type: type,
    buildIds: buildIds ? buildIds : ''
  }
});

/**
 数据大屏列表
 */
const dataScreenList = () => axios.post((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'data/dataScreenList');
/**
 * 获取渠道logo
 * url
 * @returns
 */
// let getChannelIdByChannelUrl = (url) => axios.get(mainUrl + 'mp/channel/getChannelIdByChannelUrl', {params: {url: url}});
let getChannelIdByChannelUrl = (url) => axios.get(`${mainUrl}back/channel/getChannelIdByChannelUrl?url=${url}`);

/**
 * 个人中心接口
 */
let adminDetail = () => axios.get(`${(localStorage.getItem('channelChannelUrl') ? localStorage.getItem('channelChannelUrl') : '')}channel/admin/adminDetail`);
/**
 * 获取渠道地址
 * url
 * @returns
 */
// let getChannelIdByChannelUrl = (url) => axios.get(mainUrl + 'mp/channel/getChannelIdByChannelUrl', {params: {url: url}});
let getChannelIdByUrl = (url) => axios.get(`${mainUrl}back/channel/getChannelIdByUrl?url=${url}`);

/**
 *登陆获取权限
 * adminAccount
 * channelId
 * @returns
 */
let login = (adminAccount, channelId) => axios.post((localStorage.getItem('backUrl') ? localStorage.getItem('backUrl') : '') + 'version3/admin/login', `adminAccount=${adminAccount}&channelId=${channelId}`);

/**
 * 获取空气质量
 * url
 * @returns
 */
// let getChannelIdByChannelUrl = (url) => axios.get(mainUrl + 'mp/channel/getChannelIdByChannelUrl', {params: {url: url}});
let getAirQuality = (bounds) => axios.get(`mapq/bounds/?bounds=${bounds}&inc=placeholders&k=_2Y2EvHR92GVocMydDSBRWXmpjeEQ9PStTFkYzZQ==&_=1547002148943`);

export {
  district, city, china, getAirQuality, districtAll, findReceptionByMonth, findContractSuccess, costData, bossKanban, login,
  getChannelIdByChannelId,
  addDataScreen, updateDateScreen, dataMouldList, dataScreenDetail, adminDetail, getChannelIdByUrl,
  parkMediaCount, hotActivity, registerUser, waterAndEleCost, waterAndEleInCome, houseData, enterCompanyData,
  dealRentData, buildData, buildEnterData, latestPayData, attrTypeCompany, attrType, performanceData,
  selectAttrTotalData, findReceptionByTimes, contractExpires, dataScreenList, getChannelIdByChannelUrl, //数据大屏
}
