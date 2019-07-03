// pages/device/deviceList/deviceList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    typeId:0
  },

  // 设备详情
  toDetail(e){
    let deviceId = e.currentTarget.id
    if(deviceId){
      wx.navigateTo({
        url: '/pages/device/deviceDetail/deviceDetail?deviceId=' + deviceId + '&fromWhere=1' 
      })
    }
  },

  getList(){
    // 获取设备列表
    let $this = this;
    app.ajaxF({
      url: '/api/wx/device',
      method: 'get',
      data: {
        equipmentId: $this.data.typeId,
        schoolId: app.globalData.userInfo.schoolId
      },
      success(res) {
        if (res.data) {
          // console.log(res.data)
          $this.setData({
            list: res.data
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
    
    if(options.typeId){
      $this.setData({
        typeId:options.typeId
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
    this.getList();
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