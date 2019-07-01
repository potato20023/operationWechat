// pages/study/studyList/studyList.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list1:[],
    list2:[],
    src:'',
  },

  // 下载
  down(e){
    console.log(e)
    let url = e.target.dataset.url
    // 下载文件
    // wx.downloadFile({
    //   url:app.globalData.URL + url,
    //   // url:'http://192.168.17.146:7001/public/admin/file/56c7fd843551285eda8d069465334a02.docx',
    //   success(res){
    //     console.log(res)
    //     let openUrl = res.tempFilePath
    //     // 下载后打开文件
    //     wx.openDocument({
    //       filePath: openUrl,
    //       success(res){
    //         // wx.showToast({
    //         //   title: '打开成功',
    //         //   icon: 'success',
    //         //   duration: 2000
    //         // })
    //       }
    //     })
        
    //   }
    // })
  },

  // 获取列表
  getList(){
    let $this = this;

    app.ajaxF({
      url: '/api/wx/getFile',
      method: 'get',
      success(res) {
        if (res.data) {
          $this.setData({
            list1: res.data.result1,
            list2: res.data.result2
          })
          // $this.data.list1.map(item=>{
          //   item.src = '/static/img/' + item.suffix + '.png'
          // })
          // $this.data.list2.map(item => {
          //   item.src = '/static/img/' + item.suffix + '.png'
          // })
          // console.log($this.data.list1)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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