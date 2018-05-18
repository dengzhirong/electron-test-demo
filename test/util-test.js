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
  
};





