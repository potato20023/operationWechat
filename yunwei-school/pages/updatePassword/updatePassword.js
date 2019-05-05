// pages/updatePassword/updatePassword.js
let app = getApp()
const { $Toast, $Message } = require('../../static/dist/base/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },
  formSubmit(e){
    if (!(/^[a-zA-Z0-9_]{6,10}$/.test(e.detail.value.oldPassword))) {
      // 验证密码（6-10位字母，数字）
      if (e.detail.value.oldPassword == '') {
        wx.showToast({
          title: '原密码不能为空',
          duration:2000,
          icon:'none'
        })
      } else {
        wx.showToast({
          title: '请输入6-10位的字母和数字作为密码',
          duration: 2000,
          icon: 'none'
        })
      }
    } else if (!(/^[a-zA-Z0-9_]{6,10}$/.test(e.detail.value.newPassword1))) {
      // 验证密码（6-10位字母，数字）
      if (e.detail.value.newPassword1 == '') {
        wx.showToast({
          title: '密码不能为空',
          duration: 2000,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '请输入6-10位的字母和数字作为新密码',
          duration: 2000,
          icon: 'none'
        })
      }
    } else if (e.detail.value.newPassword1 != e.detail.value.newPassword2){
      wx.showToast({
        title: '请输入一样的密码',
        duration: 2000,
        icon: 'none'
      })
    }  else {
      let $this = this;
      let data = $this.data.user
      data.password = e.detail.value.oldPassword
      data.newPassword = e.detail.value.newPassword1
      // console.log(data)
      app.ajaxF({
        url: '/api/wx/updateTeacher/' + data.id,
        method: 'post',
        data: data,
        success(res) {
          wx.showToast({
            title: '修改成功',
            duration: 2000,
            icon: 'none'
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },500)         
        }
      })
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this;
    $this.setData({
      user:app.globalData.userInfo
    })
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