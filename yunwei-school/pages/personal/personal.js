// pages/personal/personal.js
let app = getApp()
const {$Toast} = require("../../static/dist/base/index.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    headUrl:''
  },

  // 退出
  signOut() {
    wx.showModal({
      title: '提示',
      content: '是否确认退出登录',
      success(res){
        if(res.confirm){
          app.globalData.userInfo = {}
          wx.clearStorage()
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  // 点击图片查看大图
  previewImage(){

  },
  // 修改头像
  updateHeadImg(){
    let $this = this
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success: function(res1) {
        if(res1.tempFilePaths){
            wx.compressImage({
              src: res1.tempFilePaths[0],
              quality:80,
              success(res2){
                console.log(res2.tempFilePath)
                if(res2.tempFilePath){
                  wx.uploadFile({
                    url: app.globalData.URL + '/api/wx/uploadHeader',
                    filePath: res2.tempFilePath,
                    name: 'file',
                    success(res3){
                      console.log(JSON.parse(res3.data).data.url)
                      let url3 = JSON.parse(res3.data).data.url
                      let data = $this.data.user
                      data.avatar = url3
                      app.ajaxF({
                        url: '/api/wx/updateTeacher/' + data.id,
                        method: 'post',
                        data: data,
                        success(res) {
                          console.log('更新成功')
                          wx.showToast({
                            title: '修改成功',
                            duration:2000,
                            icon:'none'
                          })
                          setTimeout(() => {
                            wx.redirectTo({
                              url: '/pages/personal/personal'
                            })
                          }, 500)   
                          wx.setStorage({
                            key: 'user',
                            data: data
                          })
                          app.globalData.userInfo = data
                          $this.data.user = data
                        }
                      })
                    }
                  })
                }
              },
              fail(res){
                $Toast({
                  content:'压缩失败',
                  type:'warning'
                })
              }
            })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this;
    $this.setData({
      user:app.globalData.userInfo,
      headUrl: app.globalData.URL + '/public/user/school3.png'
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
    let $this = this;
    $this.setData({
      user: app.globalData.userInfo,
      headUrl: app.globalData.URL + '/public/user/school3.png'
    })
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