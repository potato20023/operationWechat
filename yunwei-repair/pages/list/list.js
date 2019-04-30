// pages/list/list.js
const utils = require('../../utils/util.js')
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '1',
    workerId: '',
    list:[],
    offset:1,
    endPage:false
  },
  // tab 切换
  tabChange({detail}){
    this.setData({
      status: detail.key,
      list:[],
      offset:1,
      endPage: false
    });
    this.getList()
  },

  getList(){
    const $this = this;
    app.ajax({
      url:'/api/wx/workerOrder',
      method:'get',
      data:{
        workerId:$this.data.workerId,
        status: $this.data.status,
        offset: $this.data.offset
      },
      callback:function(res){
        let data = res.data.rows?res.data.rows:[];
        console.log(data)
        if(data.length==0){
         $this.setData({
           endPage:true
         })
        }
        data.forEach(item=>{
          item.createTime = utils.formatTime(item.createTime)
        })
        $this.setData({
          list: $this.data.list.concat(data)
        })
      }
    })
  },
  // 跳转到详情页面
  linkToContent(e){
    let id = e.currentTarget.id
    let status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '/pages/item/item?id='+id+'&status='+status,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let userInfo = wx.getStorageSync('userInfo');
   this.setData({
      workerId:userInfo.jobNumber,
      list:[]
   });
    this.getList()
    if(this.data.list.length == 0){
      console.log('没有数据')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      list: [],
      endPage:false,
      offset:1
    })
    this.getList();
  
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
    this.getList(this.data.status)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.endPage)
    if (! this.data.endPage){
      this.setData({
        offset: this.data.offset + 1
      })
      this.getList()
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})