// School/pages/schoolIndex/schoolIndex.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    headUrl:'',     // 默认头像路径
    num:{}
  },

  // 报修事件
  toRepair: function () {
    wx.showActionSheet({
      itemList: ['扫码报修', '设备报修'],
      success(res) {
        console.log(res.tapIndex)
        if(res.tapIndex === 0) {
          wx:wx.showModal({
            title:'提示',
            content: '扫码报修功能暂未开启',
            success(res){
              console.log(res)
            }
          })
        } else if(res.tapIndex === 1) {
          wx:wx.navigateTo({
            url: '/pages/repair/repair',
            success: function(res) {
              console.log(res)
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  // 报修进度
  progress: function () {
    wx.navigateTo({
      url: '/pages/repairList/repairList'  
    })
  },

  // 学习交流
  toStudy() {
    wx.navigateTo({
      url: "/pages/study/study",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

 
  // 个人中心
  personal(){
    wx.navigateTo({
      url: '/pages/personal/personal',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this
    $this.setData({
      user:app.globalData.userInfo,
      headUrl: app.globalData.URL + '/public/user/school3.png'
    })
    app.ajaxF({
      url:'/api/wx/test',
      method:'get',
      success:function(res){
        console.log(res)
      }
    })
    app.ajaxF({
      url:'/api/wx/teacherOrder',
      method:'get',
      data:{
        userId:$this.data.user.id
      },
      success(res){
        console.log(res)
        $this.setData({
          num:res.data
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
    ifLogin:{
      wx.getStorage({
        key: 'username',
        success: function (res) {
          console.log(res.data)

        },

      })
    }
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