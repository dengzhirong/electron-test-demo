const path = require('path')
const fs = require('fs')
const electron = require('electron')
const _ = require('lodash')
const { ipcRenderer } = electron;

//==== 1. 拖拽文件
document.getElementById('drag').ondragstart = (event) => {
  event && event.preventDefault();
  ipcRenderer.send('ondragstart', path.join(__dirname, 'index.html') )
}

//==== 2. h5通知
(() => {
  // let myNotification = new Notification('测试标题', {
  //   body: '测试通知'
  // })
  // myNotification.onclick = () => {
  //   alert('通知已被点击')
  // };
})();

//==== 3. 检查是否离线
(() => {
  const NetUtil = require('./util-render/net')
  // console.time('render-net');
  return NetUtil.checkOffline((online) => {
    // console.timeEnd('render-net');
    // window.alert(`online: ${online}`);
  })
})();

//==== 4. 拖拽文件到应用
(() => {
  const holder = document.getElementById('holder')
  const holderTips = document.getElementById('holder-tips')
  holder.ondragover = () => {
    return false;
  }
  holder.ondragleave = holder.ondragend = () => {
    return false;
  }
  holder.ondrop = (e) => {
    e && e.preventDefault()
    let filesStr = '文件路径： <br>';
    for (let f of e.dataTransfer.files) {
      let stat = fs.lstatSync(f.path);
      let isDirectory = stat.isDirectory();
      filesStr += `${f.path}${isDirectory ? '/' : ''}<br>`;
      if(isDirectory) { // 如果是目录，则递归循环文件名
        filesStr += logAllFilesInDir(f.path) || '';
      }
    }
    holderTips.innerHTML = filesStr;
    return false;
  }
})();

// 递归打印所有文件
function logAllFilesInDir(filePath) {
  let resultStr = '';
  _logAllFilesInDir(filePath, 1, resultStr);

  function _logAllFilesInDir(filePath, excuTimes = 1) {
    let stats = fs.lstatSync(filePath);
    let isDir = stats.isDirectory();
    let isFile = stats.isFile();
    if(isDir) {
      let files = fs.readdirSync(filePath);
      files.forEach(function(filename) {
        let _stats = fs.lstatSync(path.join(filePath, filename));
        let _isDir = _stats.isDirectory();
        resultStr += '    ' + _.repeat('----', excuTimes) + ' '
          + filename 
          + `${_isDir ? '/' : ''}<br>`;
        let _innerFile = path.join(filePath, filename);
        let _stat = fs.lstatSync(_innerFile);
        _isDir && _logAllFilesInDir(_innerFile, ++excuTimes);
      });
    }
  }
  return resultStr;
}

