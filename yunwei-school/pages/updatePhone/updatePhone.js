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
        $Toast({
          content:'电话不能为空'
        })
      } else {
        $Toast({
          content:'请输入11位的数字'
        })
      }
    }else if(e.detail.value.phone == $this.data.phone){
      $Toast({
        content:'请先修改信息'
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
          $Toast({
            content:'修改成功'
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