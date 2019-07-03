// pages/device/deviceType/deviceType.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[]
  },

  toDeviceList(e){
    let typeId = e.currentTarget.id   // 设备类型id
    if(typeId){
      wx.navigateTo({
        url: '/pages/device/deviceList/deviceList?typeId=' + typeId,
      })
    }
    
  },

  getList(){
    // 获取学校设备类型列表
    let $this = this
    app.ajaxF({
      url: '/api/wx/getSchoolEqu',
      method: 'get',
      data: {
        schoolId: app.globalData.userInfo.schoolId
      },
      success(res) {
        if (res.data) {
          $this.setData({
            typeList: res.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getList()
    
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