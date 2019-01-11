/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
/**
 * 获取地址栏参数
 */
export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

/**
 * 补0
 */
export const islength = (num) => {
  if (Number(num) < 10) {
    return '0' + num
  } else {
    return num
  }
}

/**
 * 表单校验
 */
export const rule = {
  alert: function (mess) {
    store.state.alertMessage = mess
    store.state.showAlert = true
  },
  empty: function (str, mess) {//不能为空
    if (str == '') {
      toast(mess)
      return false
    } else {
      return true
    }
  },
  childName: function (str) {//不能为空
    if (str.length < 2) {
      toast('真实姓名不能少于两个字')
      return false
    } else {
      return true
    }
  },
  phone: function (str) {//手机号校验
    var myReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!myReg.test(str)) {
      toast('手机号码有误')
      return false
    } else {
      return true
    }
  },
  idcard: function (str) {//身份证校验
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(str)) {
      toast('身份证号填写有误');
      return false
    }
    else {
      return true
    }
  },
  verpassword: function (passa, passb, mess) {//验证密码是否相同
    if (passa != passb) {
      toast(mess)
      return false
    }
    else {
      return true
    }
  },
  strlength: function (str, mess) {//验证str长度
    if (str.length < 8 || str.length > 20) {
      toast(mess)
      return false
    }
    else {
      return true
    }
  },
  maxlength: function (str, mess) {//限制str长度
    if (str.length > 20) {
      toast(mess)
      return false
    }
    else {
      return true
    }
  },
  cipher: function (str, mess) {//字母和数字组成
    var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (!reg.test(str)) {
      toast(mess);
      return false
    }
    return true
  },
  requenum: function (str, mess) {//字母和数字组成
    var reg = new RegExp(/^\d*$/);
    if (!reg.test(str)) {
      toast(mess);
      return false
    }
    return true
  }

}


export const overscroll = els => {
  for (var i = 0; i < els.length; ++i) {
    var el = els[i];
    el.addEventListener('touchstart', function () {
      var top = this.scrollTop
        , totalScroll = this.scrollHeight
        , currentScroll = top + this.offsetHeight;
      if (top === 0) {
        this.scrollTop = 1;
      } else if (currentScroll === totalScroll) {
        this.scrollTop = top - 1;
      }
    });
    el.addEventListener('touchmove', function (evt) {
      if (this.offsetHeight < this.scrollHeight)
        evt._isScroller = true;
    });
  }
};//禁止body的滚动事件
document.body.addEventListener('touchmove', function (evt) {
  let have = false
  if (evt.path) {
    evt.path.forEach(item => {
      if (item.id == 'editorElem') {
        have = true
      }
    })
  }
  console.log(have)
  if (!evt._isScroller) {
    evt.preventDefault();
  }
});
//给class为.scroll的元素加上自定义的滚动事件
//overscroll(document.querySelectorAll('.scroll'));


Array.prototype.remove = function (val) {//删除数组指定的某个元素
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};


Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,  //month
    "d+": this.getDate(),     //day
    "h+": this.getHours(),    //hour
    "m+": this.getMinutes(),  //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds() //millisecond
  }
  var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(w+)/.test(format)) {
    format = format.replace(RegExp.$1, week[this.getDay()]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

Date.prototype.add = function (part, value) {
  value *= 1;
  if (isNaN(value)) {
    value = 0;
  }
  switch (part) {
    case "y":
      this.setFullYear(this.getFullYear() + value);
      break;
    case "m":
      this.setMonth(this.getMonth() + value);
      break;
    case "d":
      this.setDate(this.getDate() + value);
      break;
    case "h":
      this.setHours(this.getHours() + value);
      break;
    case "n":
      this.setMinutes(this.getMinutes() + value);
      break;
    case "s":
      this.setSeconds(this.getSeconds() + value);
      break;
    default:

  }
  return this
}

//alert(new Date().add("m", -1).format('yyyy-MM-dd hh:mm:ss'));

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = (el, callback) => {
  let requestFram;
  let oldScrollTop;

  document.addEventListener('scroll', () => {
    showBackFun();
  }, false)
  document.addEventListener('touchstart', () => {
    showBackFun();
  }, {passive: true})

  document.addEventListener('touchmove', () => {
    showBackFun();
  }, {passive: true})

  document.addEventListener('touchend', () => {
    oldScrollTop = el.getPosition().top;
    moveEnd();
  }, {passive: true})

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (el.getPosition().top != oldScrollTop) {
        oldScrollTop = el.getPosition().top;
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
      }
      showBackFun();
    })
  }

  //判断是否达到目标点
  const showBackFun = () => {
    if (el.getPosition().top > 500) {
      callback(true);
    } else {
      callback(false);
    }
  }
}


export const toast = (msg = '', time = 1500) => {
  var toast = document.createElement('div')
  toast.className = 'common-toast common-toast-show'
  toast.innerHTML = msg
  document.body.appendChild(toast)
  toast.style.display = 'block'
  toast.style.margin = `-${toast.offsetHeight / 2}px 0 0 -${toast.offsetWidth / 2}px`
  var timer = setTimeout(() => {
    toast.className = 'common-toast common-toast-hide'
    clearTimeout(timer)
    var timer2 = setTimeout(() => {
      document.body.removeChild(toast)
      clearTimeout(timer2)
    }, 200)
  }, time)
}
export const message = (msg = '', type = 'success', time = 1500) => {
  const toast = document.createElement('div');
  toast.className = 'common-message common-message-show' + ' common-message-' + type;
  toast.innerHTML = `<i class="common-message-icon iconfont icon-${type}"></i>` + msg;
  document.body.appendChild(toast);
  toast.style.display = 'block';
  const timer = setTimeout(() => {
    toast.className = 'common-message common-message-hide' + ' common-message-' + type;
    clearTimeout(timer);
    const timer2 = setTimeout(() => {
      document.body.removeChild(toast);
      clearTimeout(timer2)
    }, 200)
  }, time)
};

const digitsRE = /(\d{3})(?=\d)/g

export function currency(value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}


/**
 * 检查是否为Emoji
 */
export const isEmoji = name => {
  if (escape(name).toLocaleLowerCase().match(/(\%\ue[0-9a-f]{3})|(\%\ud[0-9a-f]{3})/)) {
    return true
  } else {
    return false
  }
}


export const tounicode = str => {
  var res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
}

export const tohanzi = str => {
  if (str == '') return '';
  str = str.split("\\u");
  var cstr = '';
  for (var i = 0; i < str.length; i++) {
    cstr += String.fromCharCode(parseInt(str[i], 16).toString(10));
  }
  return cstr;
}


export const isIOS = () => {
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}

export const phoneRule = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;//11位的电话号码
export const phoneRule2 = /(^(\d{3,4}-)?\d{7,8})$|((^(\d{3,4})?\d{7,8})$)|(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/;//8位固话+11位的电话号码
export const phoneRule3 = /(^([0-9]+(-?)[0-9]+)+)$/;//不限位数，只限制数字加-的电话号码 110等电话也可以输入
export const chinese = /^[\u4E00-\u9FA5]+$/;
export const number = /(^[1-9]([0-9]+)$)|(^[1-9]?$)/;
export const number0 = /(^[1-9]([0-9]+)$)|(^(0){1}$)|(^[1-9]?$)/;
export const price = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
export const areaRule = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
export const email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export const bankCode = /^([1-9]{1})(\d{14}|\d{18})$/;
export const http = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#][^\u4E00-\u9FA5]*[\w\-\@?^=%&\/~\+#][^\u4E00-\u9FA5])?/;
export const numberCode = /^(\w)+$/;
export const noChinese = /[^\u4E00-\u9FA5]+$/g;
export const contractCode = /^[\w\-_]+$/;

/**
 *用JSON.parse()转译字符串的判断
 * @param str
 * @returns {*}
 */
export const strParse = (str) => {
  switch (str) {
    case undefined:
    case 'undefined':
      return undefined;
    case null:
    case  'null':
      return null;
    case '':
      return '';
    default:
      try {
        return str ? JSON.parse(str) : '';
      } catch (err) {
        return '';
      }
  }
};
/**
 * 得到数据属性
 */
export const getType = val => {
  if (!val) return;
  return typeof val
}
