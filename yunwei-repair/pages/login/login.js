// pages/login/login.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },
  // 提交表单数据
  submitForm(e){
    // console.log(e)
    let $this = this;
    if(!e.detail.value.username){
      wx:wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      })
    }else if(!e.detail.value.password){
      wx: wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: app.globalData.appPath + '/api/wx/loging', //仅为示例，并非真实的接口地址
        method: 'post',
        data: e.detail.value,
        header: {
          'content-type': 'application/json',// 默认值
          'token': app.globalData.token
        },
        success: (res) => {
          if (res.data.code == 1) {
            wx.setStorage({
              key: 'token',
              data: res.data.token,
            });
            wx.setStorage({
              key: 'userInfo',
              data: res.data.result,
            });
            wx.reLaunch({
              url: '/pages/index/index',
            })
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
    }
    




    // app.ajax({
    //   url:'/api/wx/loging',
    //   method:'post',
    //   data:e.detail.value,
    //   callback(res){
    //     console.log(res)
    //     wx.setStorage({
    //       key: 'token',
    //       data: res.data.token,
    //     });
    //     wx.setStorage({
    //       key: 'userInfo',
    //       data: res.data.result,
    //     });
    //     wx.reLaunch({
    //       url: '/pages/index/index',
    //     })
    //   }
    // })
  },
  //
  setUsername(e){
    let {detail} = e.detail;
    this.setData({
      username:detail.value
    })
  },
  setPassword(e){
    let { detail } = e.detail;
    this.setData({
      password: detail.value
    })
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