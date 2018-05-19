const electron = require('electron')

module.exports = {
  mount(app, mainWindow) {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    app.on('activate', function () {
      // 重启应用
      // app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
      // app.exit(0)

      if (mainWindow && mainWindow.window === null) {
        // mainWindow.create()
      }
    })

    // 所有窗口关闭时退出应用
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  },
};

