// pages/my/my.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avator:'',
    phone:'',
    name:'',
    address:'',
    phone:''
  },

  // 退出
  signOut(){
    wx.showModal({
      title: '提示',
      content: '是否确认退出登录',
      success(res){
        if(res.confirm){
          app.globalData.userInfo = null;
          wx.clearStorage()
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const $this = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        let data = res.data;
        $this.getUserInfo(data.jobNumber);
        $this.setData({
          name:data.name,
          address: data.address,
          jobNumber: data.jobNumber,
          avator: app.globalData.appPath + '/public/user/morentoux.png'
        })
      },
    })

  },
  getUserInfo(id){
    const $this = this
    app.ajax({
      url: '/api/wx/userg/'+id,
      method:'get',
      callback:function(res){
        let data = res.data;
        $this.setData({
          phone:data.phone
        })
      }
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