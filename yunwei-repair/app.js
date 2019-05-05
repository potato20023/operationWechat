const { $Toast, } = require('./assets/dist/base/index');

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 监测版本跟新
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好的,是否要更新',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    // 判断网络状况
    wx.getNetworkType({
      success: function (res) {

        if (res.networkType == 'none') {
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      },
    })
   




    // 监听网络状态
    wx.onNetworkStatusChange(function (res) {
      // res => {isConnected: true, networkType: "2g"}
      console.log(res)
      // 业务模块
    })
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
    appPath: 'http://192.168.18.114:7001'
    // appPath: 'http://192.168.17.146:7001'
  }
})