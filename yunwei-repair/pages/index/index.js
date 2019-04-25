// pages/index/index.js
const app = getApp()
const utils = require('../../utils/util.js')
// 获取地理位置
const getLocation = function ($this) {
  // 获取地理位置
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      // console.log(res)
    },
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    address:'',
    workId:'',
    list:[],
    count:0,
    offset:1,
    endPage:false,
    headUrl:''  // 默认头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      name:userInfo.name,
      address:userInfo.address,
      workId:userInfo.jobNumber,
      headUrl: app.globalData.appPath + '/public/user/morentoux.png'
    })
  },
  // 获取展示工单
  getOrderList(){
    const $this = this;
    app.ajax({
      url:'/api/wx/workerOrder',
      method:'get',
      data:{
        status:1,
        workerId: $this.data.workId,
        offset: $this.data.offset
      },
      callback:function(res){
        let data = res.data.rows;
        if(data.length==0){
          $this.setData({
            endPage:true
          })
        }
        data.forEach(item=>{
          item.createTime = utils.formatTime(item.createTime)
        })
        $this.setData({
          list:$this.data.list.concat(data),
          count:res.data.count
        })
      }
    })
  },
  // 跳转到详情页面
  linkToContent(e) {
    let id = e.currentTarget.id
    let status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '/pages/item/item?id=' + id + '&status=' + status,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOrderList();
    const $this = this;
    wx.getSetting({
      success:function(res){
        if (res.authSetting['scope.userLocation'] == undefined && res.authSetting['scope.userLocation'] != true){
          getLocation($this)
        }else{
          getLocation($this)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      list: [],
      offset:1,
      endPage:false
    })
    this.getOrderList();
    
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
   wx.startPullDownRefresh({
     success:function(){
       console.log('dd')
     }
   })
    //wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(! this.data.endPage){
      this.setData({
        offset: this.data.offset + 1
      })
      this.getOrderList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})