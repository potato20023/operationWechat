// pages/updateName/updateName.js
let app = getApp()
const { $Toast, $Message } = require('../../static/dist/base/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    phone: ''
  },

  // 修改电话
  formSubmit(e) {
    let $this = this
    console.log(e)
    if (!(/^[0-9]{11}$/.test(e.detail.value.phone))) {
      // 验证电话
      if (e.detail.value.phone == '') {
        wx.showToast({
          title: '电话不能为空',
          duration: 2000,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '请输入11位的数字',
          duration: 2000,
          icon: 'none'
        })
      }
    }else if(e.detail.value.phone == $this.data.phone){
      wx.showToast({
        title: '请先修改信息',
        duration:2000,
        icon:'none'
      })
    }else{
      let data = this.data.user
      data.phone = e.detail.value.phone
      console.log(data)
      app.ajaxF({
        url: '/api/wx/updateTeacher/' + data.id,
        method: 'post',
        data: data,
        success(res) {
          // console.log(res)
          wx.showToast({
            title: '修改成功',
            duration: 2000,
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta:1
            })
          },500)   
          wx.setStorage({
            key: 'user',
            data: data
          })
          app.globalData.user = data
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
      user: app.globalData.userInfo,
      phone: app.globalData.userInfo.phone
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