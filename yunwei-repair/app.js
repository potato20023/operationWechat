//app.js
App({
  onLaunch: function () {
    
    // 判断token 是否存在
    let token = wx.getStorageSync('token');
    if(!token){
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }else{
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  },
  // 微信请求的封装
  ajax: function ({ url, method, data, loading, callback }) {
    // if (loading || loading == undefined) {
    //   wx.showLoading({
    //     title: '加载中...',
    //   });
    // }
    wx.request({
      url: this.globalData.appPath + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',// 默认值
        'token': this.globalData.token
      },
      success: (res) => {
        if (res.data.code == 1) {
          callback(res.data);
        } else {
          if (res.data.message) {
            wx.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000
            })
          }
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '网络可能出错了，请稍后重试',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function (res) {
        // if (loading || loading == undefined) {
        //   wx.hideLoading();
        // }
      }
    })
  },
  globalData: {
    userInfo: null,
    // appPath:'http://192.168.17.190:7001'
    // appPath: 'http://192.168.18.114:7001'
    appPath: "http://112.124.203.17:7001"
    // appPath: 'http://192.168.17.146:7001'
  }
})