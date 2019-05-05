//app.js
App({
  onLaunch: function() {
  
  const $this = this;
  wx.getStorage({
    key: 'token',
    success: function(res) {
      console.log(res)
      $this.globalData.token = res.data;
      wx.reLaunch({
        url: '/pages/schoolIndex/schoolIndex',
      })
    },
  })

  wx.getStorage({
    key: 'user',
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
    // if (isLoading || isLoading == undefined) {
    //   wx.showLoading({
    //     title: '加载中...',
    //   })
    // }
    wx.request({
      header: {
        'content-type': 'application/json', // 默认值
        'token': this.globalData.token
      },
      url: this.globalData.URL + '' + url,
      method,
      data,
      success: function(res) {
        // console.log(res)
        if (res.data.code == 1) {
          success(res.data);
          $this.globalData.token = res.data.data.token
        } else if (res.data.code == 99) {
          wx.removeStorage({
            key: 'token',
            success: function(res) {
               wx.redirectTo({
                 url: 'pages/login/login',
              })
            },
          })
        } else {
          if (res.data.message) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
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
        // if (isLoading || isLoading == undefined) {
        //    wx.hideLoading()
        // }
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
    URL: "http://192.168.18.114:7001",
    // URL: "http://192.168.17.190:7001",
    // URL: "http://192.168.17.146:7001",
    token:'' 
  }
})
