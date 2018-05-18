const _  =require('lodash')
const electron = require('electron')
const { BrowserWindow, app } = electron

const path = require('path')
const url = require('url')

//=== 1. 创建主窗口
const { createWindow } = require('./util-main/window')
let IndexWindowInstance = createWindow({
  width: 1200, height: 800, 
  // titleBarStyle: 'hidden',
  // simpleFullscreen: true,
  // opacity: .4,
  // backgroundColor: '#ffff00',
  // resizable: false,
  
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  webPreferences: {
    nodeIntegration: true
  },

  // pathname: '//baidu.com',
  // protocol: 'https:',
  // webPreferences: {
  //   nodeIntegration: false
  // },

  showDevTools: true,
  onClose: () => {},
  onOpen: (window) => {
    window.show();

    // test: macOS中，command+Click标题，将会出现文件路径弹窗
    // window.setRepresentedFilename( path.join(__dirname, 'index.html') )
    // window.setDocumentEdited(true)
  },
})

app.on('ready', IndexWindowInstance.create)


// 挂载测试组件
const UtilTest = require('./test/util-test');
_.each(UtilTest, (fn, index) => {
  fn && typeof fn == 'function' && fn(app, IndexWindowInstance.window);
});


// 挂载中间件
const middlewires = require('./middleware')
middlewires.mount(app, IndexWindowInstance);



