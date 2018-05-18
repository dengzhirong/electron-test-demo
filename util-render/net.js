/**
 * 网络检查相关的工具集
 * ref: null
 */
const IsOnline = require('is-online');

module.exports = {
  // 检查网络是否离线
  checkOffline(cb) {
    if(window.navigator.onLine) {
      return IsOnline().then(online => {
        cb && cb(online);
      });
    }
    else {
      cb && cb(false);
    }
  },

};