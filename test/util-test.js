/**
 * 测试模块
 */
const electron = require('electron')
const path = require('path')
const url = require('url')

module.exports = {
  //=== 2. 近期文档和dock自定义
  setDock(app) {
    const RecentDocument = require('../util-main/recentDocument');
    RecentDocument.add('/Users/dengzhirong/Desktop/work.type') // 打开近期文档
    // RecentDocument.clear() // 清空近期文档
    RecentDocument.setMenu([ // 设置dock菜单
      {label: 'New Window', click () { console.log('New Window') }},
      {label: 'New Window with Settings',
        submenu: [
          {label: 'Basic'},
          {label: 'Pro'}
        ]
      },
      {label: 'New Command...'}
    ]);
  },

  // === 3. 文件拖拽
  dragFileOutside(app) {
    const { ipcMain } = electron
    ipcMain.on('ondragstart', (event, filePath) => {
      console.log(`filePath: ${filePath}`)
      event.sender.startDrag({
        file: filePath,
        icon: path.join(__dirname, '../static/images/icon-clock.png')
      })
    })
  },

  // 下载文件到本地（note: 未测试）
  downloadFile(app, mainWindow) {
    mainWindow && mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
      let savePath = path.join(__dirname, './tmp/download.html');
      item.setSavePath(savePath)
      console.log(233);

      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          console.log('下载已中断，但可以恢复')
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('下载已暂停')
          } else {
            console.log(`Received bytes: ${item.getReceivedBytes()}`)
          }
        }
      })
      item.once('done', (event, state) => {
        if (state === 'completed') {
          console.log('下载成功')
        } else {
          console.log(`下载失败: ${state}`)
        }
      })
    })
  },

};





