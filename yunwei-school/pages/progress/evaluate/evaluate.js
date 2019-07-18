// pages/progress/evaluate/evaluate.js
const app = getApp()
const { $Toast, $Message} = require('../../../static/dist/base/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',     // 工单id
    workerId:'',  // 维修员id
    value1:0,    // 服务态度分
    value2:0,    // 服务时效分
  },

  // 服务态度打分
  change1(e){
    let index = e.detail.index
    this.setData({
      value1:index
    })
  },

  // 服务时效打分
  change2(e) {
    let index = e.detail.index
    this.setData({
      value2: index
    })
  },

  // 校验评论字数
  checkNum(e) {
    let length = e.detail.cursor
    if (length > 49) {
      $Message({
        content: '不能超过50个字符',
        type: 'warning',
        duration: 2
      })
    }
  },

  // 提交评论
  evaluateSubmit(e){
    let $this = this;
    let textValue = e.detail.value.textValue
    let data = {}
    data.serviceAttr = $this.data.value1;   // 服务态度分
    data.requireSpeed = $this.data.value2;  // 服务时效分
    data.totalScore = ($this.data.value1 + $this.data.value2) / 2  ;
    data.description = textValue; // 文字评论
    data.workerId = parseInt($this.data.workerId) ;
    if(!data.serviceAttr || !data.requireSpeed){
      $Toast({
        content:'请打分'
      })
    }else{
      app.ajaxF({
        url: '/api/wx/evaluate/' + $this.data.id,
        method: 'post',
        data: data,
        success(res) {
          $Toast({
            content:'成功'
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },2000)
        }
      })  
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this;
    console.log(options)
    let id = options.id   // 工单id
    let workerId = options.workerId  // 维修员id
    $this.setData({
      id:id,
      workerId: workerId
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