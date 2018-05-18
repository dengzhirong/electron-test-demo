//==== 1. 拖拽文件
document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault();
  const ipcRenderer = require('electron').ipcRenderer;
  const path = require('path')
  ipcRenderer.send('ondragstart', path.join(__dirname, 'index.html') )
}

//==== 2. h5通知
/* let myNotification = new Notification('测试标题', {
  body: '测试通知'
})
myNotification.onclick = () => {
  alert('通知已被点击')
}; */

//==== 3. 检查是否离线
(() => {
  const NetUtil = require('./util-render/net')
  console.time('render-net');
  return NetUtil.checkOffline((online) => {
    console.timeEnd('render-net');
    window.alert(`online: ${online}`);
  })
})();