// pages/end/end.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    workerId:'',
    status:'3',
    filelist:[],
    imgUrl:[],
    remark:''
  },
  // 上传文件
 uploadFile(){
   const $this = this;
   wx.chooseImage({
     count:3,
     success: function(res) {
       let tempFilePaths = res.tempFilePaths;
       $this.setData({
         imgUrl:$this.data.imgUrl.concat(res.tempFilePaths)
       })
       tempFilePaths.forEach((item,index)=>{
         wx.uploadFile({
           url: app.globalData.appPath + '/api/wx/upload',
           filePath: tempFilePaths[index],
           name: 'file',
           success: function (res) {
             let data = JSON.parse(res.data);
             if (data.code == 1) {
               $this.setData({
                 filelist: $this.data.filelist.concat(data.data.link)
               })
             } else {
               wx.showToast({
                 title: '上传失败',
                 type: 'error'
               })
             }
           }
         })
       })
     },
   })
 },
  // 表单提交
  submitData(){
    const $this =this;
    $this.data.filelist = JSON.stringify($this.data.filelist)
    app.ajax({
      url: '/api/wx/workerOrder/' + $this.data.id,
      method:'put',
      data:$this.data,
      callback:function(res){
        wx.switchTab({
          url: '/pages/list/list',
          fail:function(res){
             console.log(res)
          }
        })
      }
    })
  },
  // 备注内容
  setRemark({detail}){
    console.log(detail)
    this.setData({
      remark:detail.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      workerId:options.workerId
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