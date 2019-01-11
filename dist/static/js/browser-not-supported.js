window._browserIsNotSupported = true;
console.log('ie')
if(window.attachEvent){
  window.attachEvent('onload', function(){
    /*var lowestSupportedIEVersion = 10;
    if(window.LOWEST_IE_VERSION != undefined){
      lowestSupportedIEVersion = window.LOWEST_IE_VERSION;
    }*/
    var el = document.createElement('div');
      elStyle = el.style,
      docBody = document.getElementsByTagName('body')[0],
      htmlBody = document.getElementsByTagName('html')[0],
      htmlBody.style.height = '100%';
      docBody.style.height = '100%';
      docBody.style.overflow = 'hidden';
      boxStyle = 'margin: 0 auto;width: 820px;padding-top: 80px;';
      topimgStyle = 'margin: 0 auto;width: 720px;height: auto;';
      titStyle = 'text-align: center;font-size: 28px;color: #666;margin-top: 60px;margin-bottom: 40px;';
      pStyle = 'font-size: 16px;color: #666;line-height: 36px;';
      bottomimgStyle = 'position: absolute;left: 0;bottom:0;width: 100%;height: auto;';
      linkStyle = 'line-height: 36px; font-size: 16px;color: #0066FF;text-decoration: underline;';
      el.innerHTML =
        '<div style="' + boxStyle + '">'+
          '<div style="' + topimgStyle + '">' +
            '<img src="http://public.hzqisheng.cn/ie/ietop.png">' +
          '</div>' +
          '<h4 style="' + titStyle + '">温馨提示</h4>' +
          '<p style="' + pStyle + '">经系统检测，您的浏览器版本过低，为更好地使用本平台，建议您安装更新版本的浏览器。请下载使用 '+
            '<a href="https://www.google.cn/chrome/" target="_blank" style="' + linkStyle + '">Chrome（谷歌浏览器）</a>' +
            '或者' +
            '<a href="https://browser.360.cn/se/" target="_blank" style="' + linkStyle + '">360（360安全浏览器）</a>' +
            '，或者升级您的IE浏览器至' +
            '<a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank" style="' + linkStyle + '">IE10版本</a>' +
            '以上。感谢您的配合与谅解。' +
          '</p>' +
        '</div>' +
        '<div style="' + bottomimgStyle + '">' +
          '<img src="http://public.hzqisheng.cn/ie/iebottom.png">' +
        '</div>'
    elStyle.position = 'relative';
    elStyle.width = '100%';
    elStyle.height = '100%';
    elStyle.overflow = 'hidden';
    elStyle.backgroundColor = '#fff';
    docBody.innerHTML = '';
    docBody.appendChild(el);
  });
}



