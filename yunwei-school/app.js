//app.js
const {$Toast} = require('./static/dist/base/index.js')
App({
  onLaunch: function() {
  
  const $this = this;
  wx.getStorage({
    key: 'token',
    success: function(res) {
      $this.globalData.token = res.data;
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
  })

  wx.getStorage({
    key: 'userInfo',
    success: function(res) {
      $this.globalData.userInfo = res.data
    },
  })

  },
  // 全局ajax请求
  ajaxF({
    url,
    method,
    data,
    success,
    isLoading
  }) {
    const $this = this;
    if (isLoading || isLoading == undefined) {
      wx.showLoading({
        title: '加载中...',
      })
    }
    wx.request({
      header: {
        'content-type': 'application/json', // 默认值
        'token': this.globalData.token
      },
      url: this.globalData.URL + '' + url,
      method,
      data,
      success: function(res) {
        if (res.data.code == 1) {
          success(res.data);
        } else if (res.data.code == 99) {
          wx.removeStorage({
            key: 'token',
            success: function(res) {
               wx.redirectTo({
                 url: '/pages/login/login',
              })
            },
          })
        } else {
          if (res.data.message) {
            $Toast({
              content:res.data.message
            })
          }
        }
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: '网络可能出错，请稍后再试',
          success: function(res) {
            if (res.confirm) {
              console.log('sure')
            } else {
              console.log('cancel')
            }
          }
        })
      },
      complete: function(res) {
        if (isLoading || isLoading == undefined) {
           wx.hideLoading()
        }
      }
    })
  },


  onLoad: function(options) {
    ifLogin: {
      wx.getStorage({
        key: 'username',
        success: function(res) {
          console.log(res)
        },
      })
    }
  },


  // 登录注册正则验证



  globalData: {
    userInfo: {},
    // URL: "http://192.168.17.146:7001",
    URL:"https://apiwxd.club",
    token:'' 
  }
})
