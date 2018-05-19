const _  =require('lodash')
const electron = require('electron')
const { app, BrowserWindow, Tray } = electron

const path = require('path')
const url = require('url')
//=== 1. 创建主窗口
const { createWindow } = require('./util-main/window')
let IndexWindow = null;
let IndexWindowInstance = null;
// const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize // 窗口大小充满工作区
IndexWindowInstance = createWindow({
  // width, height, 
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

  // 测试外链
  // pathname: '//baidu.com',
  // protocol: 'https:',
  // webPreferences: {
  //   nodeIntegration: false
  // },

  // dock图标不能使用png，windows下是.ico，macOS下是 .icns。尺寸至少256*256
  icon: path.join(__dirname, './static/images/icon-clock.png'),

  onClose: () => {},
  onOpen: (window) => {
    IndexWindow = window;
    window.show();
    // test: macOS中，command+Click标题，将会出现文件路径弹窗
    // window.setRepresentedFilename( path.join(__dirname, 'index.html') )
    // window.setDocumentEdited(true)
  },
});

// 创建子窗口（新窗口）
// let child = new BrowserWindow({parent:IndexWindow})
// child.show();

// 创建模态窗口（原窗口上方的弹窗）
// let child = new BrowserWindow({parent:IndexWindow,modal:true,show:false})
// child.loadURL('https://github.com')
// child.show()

const { Menu } = electron;
let appIcon = null;
app.on('ready', () => {
  IndexWindowInstance.create(); // 创建主页面
  IndexWindow.setProgressBar(0.5); // 设置dock图标的进度条

  // 修改任务栏测试图标和菜单
  appIcon = new Tray(path.join(__dirname, './static/images/icon-clock.png'))
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  appIcon.setTitle('hello world')
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);

  IndexWindow.webContents.openDevTools(); // 打开开发者工具

  // 创建全局快捷键
  // const { globalShortcut } = electron
  // globalShortcut.register('CommandOrControl+X', () => {
  //   console.log('CommandOrControl+X is pressed')
  // })

  // 挂载测试组件
  const UtilTest = require('./test/util-test');
  _.each(UtilTest, (fn, index) => {
    fn && typeof fn == 'function' && fn(app, IndexWindow);
  });

  // 挂载中间件
  const middlewires = require('./middleware')
  middlewires.mount(app, IndexWindowInstance);
})



