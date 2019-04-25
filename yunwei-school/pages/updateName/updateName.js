// pages/updateName/updateName.js
let app = getApp()
const { $Toast, $Message } = require('../../static/dist/base/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    name:''
  },

  // 修改名字
  formSubmit(e){
    console.log(e)
    if (!(/^[\u4E00-\u9FA5]{2,4}$/.test(e.detail.value.name))) {
      // 验证姓名（2-4位汉字） 
      if (e.detail.value.name == '') {
        $Toast({
          content: '姓名不能为空',
          type: 'warning'
        })
      } else {
        $Toast({
          content: '请输入2-4位汉字',
          type: 'warning'
        })
      }
    }else{
      let data = this.data.user
      data.name = e.detail.value.name
      // console.log(data)
      app.ajaxF({
        url:'/api/wx/updateTeacher/' + data.id,
        method:'post',
        data:data,
        success(res){
          // console.log(res)
          $Toast({
            content: '修改成功',
            type: 'success'
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/personal/personal'
            })
          },500)   
          wx.setStorage({
            key: 'user',
            data: data
          })
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
      user:app.globalData.userInfo,
      name:app.globalData.userInfo.name
    })
    console.log($this.data.user)
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