// pages/login/login.js
var app = getApp();
const { $Toast } = require('../../static/dist/base/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },


  // 登录
  loginSubmit: function (e) {
    // console.log(e)
    var $this = this
    var tests = e.detail.value
    // var tests = {phone:15838373750,password:123456}
    if (!(/^[0-9]{11}$/.test(tests.phone))) {
      // 验证账号（3-10位字母，数字）
      if(tests.phone == ''){
        $Toast({
          content:'请输入手机号'
        })
      }else {
        $Toast({
          content: '手机号错误'
        })
      }
      
      return false;
    } else if (!(/^[a-zA-Z0-9_]{6,10}$/.test(tests.password))) {
      // 验证密码（6-10位字母，数字）
      console.log(111)
      if(tests.password == '') {
        $Toast({
          content: '请输入密码'
        })
      } else {
        $Toast({
          content: '密码错误'
        })
      }
      
      return false;
    } else {
      // console.log(1111)
      // wx.request({
      //   header: {
      //     'content-type': 'application/json', // 默认值
      //     'token': app.globalData.token
      //   },
      //   url: app.globalData.URL + '/api/wx/login',
      //   method:'post',
      //   data:tests,
      //   success: function (res) {
      //     if (res.data.code == 1) {
      //       console.log(res)
      //       wx.reLaunch({
      //         url: '/pages/index/index'
      //       })
      //       wx.setStorage({
      //         key: 'userInfo',
      //         data: res.data.data.result
      //       })
      //       wx.setStorage({
      //         key: 'token',
      //         data: res.data.data.token
      //       })
      //       app.globalData.userInfo = res.data.data.result
      //       app.globalData.token = res.data.data.token
      //     } else if (res.data.code == 99) {
      //       wx.removeStorage({
      //         key: 'token',
      //         success: function (res) {
      //           wx.redirectTo({
      //             url: '/pages/login/login',
      //           })
      //         },
      //       })
      //     } else {
      //       if (res.data.message) {
      //         $Toast({
      //           content: res.data.message
      //         })
      //       }
      //     }
      //   },
      //   fail: function (res) {
      //     wx.showModal({
      //       title: '提示',
      //       content: '网络可能出错，请稍后再试',
      //       success: function (res) {
      //         if (res.confirm) {
      //           console.log('sure')
      //         } else {
      //           console.log('cancel')
      //         }
      //       }
      //     })
      //   },
      //   complete: function (res) {
      //     // if (isLoading || isLoading == undefined) {
      //     //   wx.hideLoading()
      //     // }
      //   }
      // })




      app.ajaxF({
        url:'/api/wx/login',
        method:'post',
        data:tests,
        success:function(res){
          wx.reLaunch({
            url: '/pages/index/index'
          })
          wx.setStorage({
            key: 'userInfo',
            data: res.data.result
          })
          wx.setStorage({
            key: 'token',
            data: res.data.token
          })
          app.globalData.userInfo = res.data.result
          app.globalData.token = res.data.token
        },
        fail(res){
          // console.log(333)
          // console.log(res)
        },
        
      })
      
    }
    
  },
 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})