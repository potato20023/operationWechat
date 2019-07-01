// pages/device/deviceDetail/deviceDetail.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    fromWhere: 1,     // 1:从设备类型列表点击进入详情   0:从报修处点击查看详情
    numGColor:'',   // 健康值颜色, 5次以内绿色, 5-10次橙色,10次以上红色
    deviceId:''   // 设备id
  },


  // 查看报修详情
  seeRepair(e){
    console.log(e)
    let deviceId = e.currentTarget.id
    let $this = this
    if (deviceId) {
      wx.navigateTo({
        url: '/pages/repairDetail/repairDetail?id=' + deviceId + '&fromWhere=2'
      })
    }
  },

  // 点击报修
  toRepair(e){
    let deviceId = e.currentTarget.id
    if(deviceId){
      wx.navigateTo({
        url: '/pages/scanCode/scanCode?deviceId=' + deviceId
      })
    }
  },

  // 获取设备详情
  getList() {
    let $this = this
    app.ajaxF({
      url: '/api/wx/device/' + $this.data.deviceId + '/edit',
      method: 'get',
      success(res) {
        if (res.data) {
          res.data.factoryTime = util.formatdata(res.data.factoryTime)
          res.data.overTime = util.formatdata(res.data.overTime)
          $this.setData({
            list: res.data,
            numGColor: res.data.numG <= 5 ? 'green' : res.data.numG <= 10 ? 'orange' : 'red'
          })
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this
    
    if(options.deviceId){
      $this.setData({
        fromWhere: options.fromWhere,
        deviceId: options.deviceId
      })
      // $this.getList()
    }
    
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
    this.getList()
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
    $this.getList();
    wx.stopPullDownRefresh();
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