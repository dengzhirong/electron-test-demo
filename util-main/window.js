/**
 * 窗口相关的工具集
 * ref: https://github.com/electron/electron/blob/master/docs/api/browser-window.md
 */

const _ = require('lodash')
const path = require('path')
const url = require('url')
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow

module.exports = {
  // 新建窗口
  createWindow(options) {
    options = _.extend({
      width: 800,
      height: 600,
      pathname: '',
      protocol: 'file:',
      slashes: true,
      urlOpts: {},
      showDevTools: false, // 是否显示开发者工具
      webPreferences: {
        webviewTag: false,
        nodeIntegration: false
      },
    }, options)
    // console.log(options)
    let {
      width, height, showDevTools,
      pathname, protocol, slashes, urlOpts,
      onClose, onOpen
    } = options
    let window = null

    return {
      window,

      // 新建窗口
      create: () => {
        window = new BrowserWindow(options);
        window.loadURL(url.format( _.extend({
          pathname, protocol, slashes
        }, urlOpts) ))
        window.show();
        onOpen && onOpen(window);
    
        showDevTools && window.webContents.openDevTools()
    
        window.on('closed', function () {
          onClose && onClose(window)
          window = null // 关闭浏览器，则清空缓存
        })
      },

    }
  },

}