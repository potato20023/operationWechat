
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    headUrl: '',     // 默认头像路径
    num: {}
  },

  // 报修事件
  toRepair: function () {
    // wx.navigateTo({
    //   url: '/pages/device/writeDevice/writeDevice'
    // })

    wx.scanCode({
      success(res){
        // console.log(res.result)
        let deviceId = res.result
        if (deviceId){
          // 获取设备详情
          app.ajaxF({
            url: '/api/wx/device/' + deviceId + '/edit',
            method: 'get',
            success(res) {
              if (res.data) {
                let deviceStatus = res.data.deviceStatus
                let schoolId = res.data.schoolId
                console.log(schoolId)
                // 没有报修过,又是本校老师
                if (deviceStatus != 1){
                  wx.showToast({
                    title: '本设备已报修过',
                    icon: 'none',
                    duration:2000
                  })
                } else if (schoolId != app.globalData.userInfo.schoolId){
                  wx.showToast({
                    title: '非本校管理员',
                    icon: 'none',
                    duration: 2000
                  })
                }else{
                  wx.navigateTo({
                    url: '/pages/scanCode/scanCode?deviceId=' + deviceId
                  })
                }
              }
            }
          })
        }

      },
      fail(res){
        wx.navigateTo({
          url: '/pages/device/writeDevice/writeDevice'
        })
      }
    })

  },
  
  // 报修进度
  progress: function () {
    wx.navigateTo({
      url: '/pages/repairList/repairList'
    })
  },

  // 我的设备
  toEquipment(){
    wx.navigateTo({
      url:'/pages/device/deviceType/deviceType'
    })
  },

  // 学习交流
  toStudy() {
    wx.navigateTo({
      url: "/pages/study/studyList/studyList"
    })
  },


  // 个人中心
  personal() {
    wx.navigateTo({
      url: '/pages/personal/personal',
    })
  },

  // 首页报修进度显示
  indexNum() {
    let $this = this
    app.ajaxF({
      url: '/api/wx/teacherOrder',
      method: 'get',
      data: {
        userId: $this.data.user.id
      },
      success(res) {
        $this.setData({
          num: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this
    $this.setData({
      user: app.globalData.userInfo,
      headUrl: app.globalData.URL + '/public/user/school3.png'
    })
    $this.indexNum()
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
    let $this = this
    $this.setData({
      user: app.globalData.userInfo,
      headUrl: app.globalData.URL + '/public/user/school3.png'
    })
    $this.indexNum()
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