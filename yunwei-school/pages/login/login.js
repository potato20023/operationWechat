// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },


  // 登录
  loginSubmit: function (e) {
    console.log(e)
    var $this = this
    var tests = e.detail.value
    if (!(/^[0-9]{11}$/.test(tests.phone))) {
      // 验证账号（3-10位字母，数字）
      if(tests.phone == ''){
        wx.showToast({
          title: '请输入手机号',
          duration: 2000,
          icon: 'none'
        })
      }else {
        wx.showToast({
          title: '手机号错误',
          duration: 2000,
          icon: 'none'
        });
      }
      
      return false;
    } else if (!(/^[a-zA-Z0-9_]{6,10}$/.test(tests.password))) {
      // 验证密码（6-10位字母，数字）
      if(tests.password == '') {
        wx.showToast({
          title: '请输入密码',
          duration: 2000,
          icon:none
        })
      } else {
        wx.showToast({
          title: '密码错误',
          duration: 2000,
          icon: 'none'
        });
      }
      
      return false;
    } else {
      // console.log(1111)
      app.ajaxF({
        url:'/api/wx/login',
        method:'post',
        data:tests,
        success:function(res){
          console.log(res)
          console.log(2222)
          wx.redirectTo({
            url: '/pages/schoolIndex/schoolIndex'
          })
          wx.setStorage({
            key: 'user',
            data: res.data.result
          })
          wx.setStorage({
            key: 'token',
            data: res.data.token
          })
          app.globalData.userInfo = res.data.result
          console.log(app.globalData.userInfo)
        },
        fail(res){
          // console.log(333)
          // console.log(res)
        },
        
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