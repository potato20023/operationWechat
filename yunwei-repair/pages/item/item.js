// pages/item/item.js
const app = getApp();
const utils = require('../../utils/util.js')
const { $Toast } = require('../../assets/dist/base/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    equipmentId: '',
    schoolId: '',
    remark: [],
    faultDesc: '',
    tagId: '',
    userId: '',
    status: '',
    createTime: '',
    picture: [],
    updateTime: '',
    workerId: '',
    workername: '',
    awatar: '',
    name: '',
    type: '',
    xxmc: '',
    userName: '',
    phone: '',
    xxdz:'',
    b:""
  },
  // 获取工单详情
  getOrder() {
    const $this = this
    app.ajax({
      url: '/api/wx/workerOrder/' + $this.data.id + '/edit',
      method: 'get',
      callback: function(res) {
        if (res.data) {
          let data = res.data;
          let arr = data.remark;
          console.log(data)
          arr.forEach(item => {
            item.updateTime = utils.formatTime(item.updateTime),
              item.filelist = JSON.parse(item.filelist)
          });
          let data1 = arr.filter(item => {
            return item.orderStatus == 3
          })
          $this.setData({
            equipmentId: data.equipmentId,
            schoolId: data.schoolId,
            remark: arr,
            faultDesc: data.faultDesc,
            tagId: data.tagId,
            userId: data.userId,
            status: data.status,
            createTime: data.createTime,
            picture: JSON.parse(data.picture),
            updateTime: data.updateTime,
            workerId: data.workerId,
            workername: data.workername,
            awatar: data.awatar,
            name: data.name,
            type: data.type,
            xxmc: data.xxmc,
            userName: data.userName,
            phone: data.phone,
            xxdz: data.xxdz,
            b: data1[0] ? data1[0]:''
          })
        }
      }
    })
  },
  // 更新工单状态请求
 updateOrder(status){
   const $this = this
   app.ajax({
     url: '/api/wx/workerOrder/' + $this.data.id,
     method:'put',
     data:{
       status:status,
       workerId:$this.data.workerId
     },
     callback:(res)=>{
      wx.showToast({
        title:'操作成功',
        icon:'success'
      })
       setTimeout(() => {
         wx.hideToast()
         wx.switchTab({
           url: "/pages/list/list",
           fail:(res)=>{
             console.log(res)
           }
         })
       }, 1000);
     }
   })
 },
  // 维修人员 接单
  setOrder(){
    let status = '2';
    this.updateOrder(status);
  },
  // 维修人员取消接单
  cancelOrder(){
    let status = '0';
    this.updateOrder(status);
  },
  // 维修人员完成维修
  endOrder(){
    // let status = '3';
    // this.updateOrder(status);
    wx.navigateTo({
      url: "/pages/end/end?id="+this.data.id+"&workerId="+this.data.workerId,
      fail:function(res){
        console.log(res)
      }
    })
  },
  // 点击预览大图
  previewImg(e){
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.picture.map(item=>{
        return item.slice(0,-11)
    });
    console.log(imgArr)
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      id
    } = options;
    this.setData({
      id: id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getOrder()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})