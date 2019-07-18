// pages/showModel/showModel.js
const app = getApp()
const io = require('../../utils/weapp.socket.io.js')
const socket = io(app.globalData.appPath + '/wx');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',  // 工单id
    length:0,   // 几条待接工单
    back:true
  },

  // 稍后处理
  back(){
    if (this.data.back == 'true') {
      wx.navigateBack({
        delta: 1
      })
    }else if(this.data.back == 'false'){
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
    
    socket.emit('wx',{
      workerId:app.globalData.token,
      sureOrder: true
    })
    // console.log('稍后处理')
  },

  // 查看详情
  toDetail(){
    
    wx.reLaunch({
      url: '/pages/list/list'
    })
    socket.emit('wx', {
      workerId: app.globalData.token,
      sureOrder: true
    })
    // console.log('查看详情')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      length:options.length,
      back:options.back
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