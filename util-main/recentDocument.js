/**
 * dock的任务菜单自定义的工具集
 * ref: https://github.com/amhoho/electron-cn-docs/blob/master/tutorial/desktop-environment-integration.md
 */

const { app, Menu } = require('electron')
const config = require('../config')

module.exports = {
  // 将文件添加到最近文档
  add() {
    app.addRecentDocument('/Users/dengzhirong/Desktop/work.type')
  },

  // 清空近期文档
  clear() {
    app.clearRecentDocuments()
  },

  // 设置dock菜单(macOS)
  _setMenu_MacOS(menus = []) {
    /* menus = [
      {label: 'New Window', click () { console.log('New Window') }},
      {label: 'New Window with Settings',
        submenu: [
          {label: 'Basic'},
          {label: 'Pro'}
        ]
      },
      {label: 'New Command...'}
    ]; */
    const dockMenu = Menu.buildFromTemplate(menus)
    app.dock.setMenu(dockMenu)
  },

  // 设置dock菜单（windows）
  _setMenuInWindows(menus) {
    // TODO: 未测试，慎用
    app.setUserTasks([
      {
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: '新窗口',
        description: '创建新窗口'
      }
    ])
  },

  // 设置dock菜单
  setMenu(menus) {
    if(config.isMacOS) {
      this._setMenu_MacOS(menus);
    } else if(config.isWindows) {
      this._setMenuInWindows(menus);
    }
  },

}
