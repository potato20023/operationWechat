// pages/device/writeDevice/writeDevice.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // deviceId:'',   // 设备编号
  },

  formSubmit(e){
    console.log(e)
    let deviceId = e.detail.value.deviceId   // 设备编号
    if(deviceId){
        // 获取设备详情
      app.ajaxF({
        url: '/api/wx/device/' + deviceId + '/edit',
        method: 'get',
        success(res) {
          if (res.data) {
            let deviceStatus = res.data.deviceStatus
            let schoolId = res.data.schoolId
            // console.log(schoolId)
            // 没有报修过,又是本校老师
            if (deviceStatus != 1){
              wx.showToast({
                title: '本设备已报修过',
                duration:2000
              })
            } else if (schoolId != app.globalData.userInfo.schoolId){
              wx.showToast({
                title: '非本校管理员',
                duration: 2000
              })
            }else{
              wx.navigateTo({
                url: '/pages/scanCode/scanCode?deviceId=' + deviceId
              })
            }
          }
        },
        fail(res){
          cosnole.log(res)
        }
      })
    }else{
      wx.showToast({
        title: '请先输入编号',
        duration:2000
      })
    }

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