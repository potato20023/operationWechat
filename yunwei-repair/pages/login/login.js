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
  submitForm(){
    let $this = this;
    app.ajax({
      url:'/api/wx/loging',
      method:'post',
      data:$this.data,
      callback(res){
        console.log(res)
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
      }
    })
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