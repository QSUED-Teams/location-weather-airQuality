import axios from 'axios'


/**
 * 获取空气质量
 * url
 * @returns
 */
/*let getAirQuality = (bounds) => axios.get(`https://api.waqi.info/mapq/bounds/?bounds=${bounds}&inc=placeholders&k=_2Y2EvHR92GVocMydDSBRWXmpjeEQ9PStTFkYzZQ==&_=1547002148943`);*/

let getAirQuality = (id) => axios.get(`http://api.help.bj.cn/apis/aqi?id=${id}`);

export {
  getAirQuality
}
