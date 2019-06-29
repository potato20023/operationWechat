// School/pages/proDetail/proDetail.js
const app = getApp()
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifOver: true,
    id: '',    // 维修单id
    info: {},  // 维修单详情
    num: '',  // 维修编号
    day: '',  // 处理时长
    user: wx.getStorageSync('user'),
    disabled: '',
    verticalList:[],   // 进度条信息
  },

  // 点击完成维修
  switchChange: function (e) {
    var $this = this;
    if (!this.data.disabled){
      return false
    }
    console.log(e.detail.value)
    wx.showModal({
      title: '提示',
      content: '您是否确认维修已完成？',
      success(res) {
        if (res.confirm) {
          app.ajaxF({
            url: '/api/wx/order/' + $this.data.id,
            method: 'put',
            data: {
              status: 3,
              workerId: $this.data.info.remark.workerId
            },
            success(res) {
              wx.reLaunch({
                url: '/pages/schoolIndex/schoolIndex'
              })
            },
            fail(res) {
              $this.setData({
                ifOver: false
              })
            }
          })
        } else if (res.cancel) {
          $this.setData({
            ifOver: false
          })
        }
      }
    })
  },
  // 点击图片查看大图
  previewImage(e){
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let $this = this
    let imgList = $this.data.info.picture
    let imageList = imgList.map(item=>{
      return  item.slice(0,-11)
    })
    wx.previewImage({
      current: imageList[index],   // 当前显示图片的http路径
      urls: imageList             // 需要预览的图片的http路径
    })
  },
  // 拨打电话
  callPhone(e){
    console.log(e)
    let phone = e.target.dataset.phone.toString()
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this
    // wx.getStorage({
    //   key: 'user',
    //   success: function(res) {
    //     $this.data.user = res.data
    //   },
    // })
    // console.log(options)
    $this.setData({
      id: options.id
    })
    // 获取详情
    app.ajaxF({
      url: '/api/wx/order/' + options.id,
      method: 'get',
      success: function (res) {
        // console.log(res)
        let day = utils.formatDay(res.data.updateTime, res.data.createTime)
        res.data.picture = JSON.parse(res.data.picture)
        res.data.createTime = utils.formatTime(res.data.createTime)
        res.data.remark.forEach(function (item, index, list) {
          if (res.data.status == item.orderStatus) {
            res.data.remark = item
          }
        })

        $this.setData({
          info: res.data,
          ifOver: res.data.status == 3,
          disabled: res.data.status == 2,
          day: day
        })
        // console.log($this.data.ifOver)
      }
    })

    // 获取维修进度条信息
    app.ajaxF({
      url:'/api/wx/getOrderStatus/' + options.id,
      method:'get',
      success(res){        
        res.data.map(item=>{
          item.updateTime = utils.formatTime(item.updateTime)
        })
        $this.setData({
          verticalList: res.data
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