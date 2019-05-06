// pages/repairList/repairList.js
const app = getApp()
const util = require('../../utils/util.js')
const { $Toast, $Message } = require('../../static/dist/base/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},    // 用户信息
    current: 1,  // 导航
    list1: [],    // 已完成列表
    list2: [],
    visible2: false,  //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle: true,
    offset:1,        // 页数
    ifAllList:false,   // 是否已经加载全部数据
    ifReachBottom:false,   // 是否是上拉动作
    clientXstart:0,     // 开始滑动时的坐标(X)
    clientXend:0        // 结束滑动时的坐标(X)
  },
  
  // 获取工单列表
  getList(e) {
    let $this = this
    let status = ''
    if(e == 2){
      status = 3
    }
    app.ajaxF({
      url: '/api/wx/userg',
      data: {
        userId: $this.data.user.id,
        status: status,
        offset: $this.data.offset
      },
      success(res) {
        // console.log(res)
        let list = []
        if (res.data.rows.length > 0){
          list = res.data.rows;
          list.forEach(function (item, index, list) {
            item.createTime = util.formatTime(item.createTime)
          })
          if($this.data.offset > 1){
            if (e != 2) {
              $this.setData({
                list1: $this.data.list1.concat(list)
              })
            } else {
              $this.setData({
                list2: $this.data.list2.concat(list)
              })
            }
          }else{
            if (e != 2) {
              $this.setData({
                list1: list
            })
            } else {
              $this.setData({
                list2: list
              })
            }
          }
        } else if ($this.data.ifReachBottom){
          $this.setData({
            ifAllList:true
          })
          // console.log('已加载全部')
        }
      }
    })
  },

  // 导航切换
  
  handleChange({ detail }) {
    let $this = this;
    console.log(detail)
    $this.setData({
      current: detail.key,
      offset:1,
      ifAllList:false,
      ifReachBottom:false
    })
    this.getList(detail.key)
  },

  // 查看详情
  toDetail(e) {
    let id = e.currentTarget.id
    let $this = this
    if ($this.data.toggle){
      wx.navigateTo({
        url: '/pages/repairDetail/repairDetail?id=' + id
      })
    }else{
      $this.setData({
        toggle:true
      })
    }
    console.log('查看详情' + $this.data.toggle)
    
  },

  // 左滑(待派单)
  Start(e){
    let $this = this
    if($this.data.toggle){
      $this.setData({
        clientXstart: e.changedTouches[0].clientX
      })
    }else{
      $this.setData({
        toggle: true
      })
    }
    
  },
  // 滑动结束(待派单)
  End(e){
    let $this = this
    $this.setData({
      clientXend: e.changedTouches[0].clientX
    })
    if($this.data.clientXstart - $this.data.clientXend > 50){
      $this.setData({
        toggle:false
      })
    }
    console.log('滑动结束'+$this.data.toggle)
  },
  
  // 编辑
  Edit(e){
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/repair/repair?id=' + id
    })
  },

  //删除
  Delete(e){
    let $this = this
    let id = e.currentTarget.id
    wx.showModal({
      title: '提示',
      content: '确定删除本条工单吗？',
      success(res){
        if (res.confirm) {
          // console.log('用户点击确定')
          app.ajaxF({
            url: '/api/wx/order/' + id,
            method:'delete',
            success(res) {
              $Message({
                content: '删除成功',
                type: 'success',
                duration: 1
              })
              setTimeout(()=>{
                wx.redirectTo({
                  url: '/pages/repairList/repairList'
                })
              },1000)
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this
    let list1 = []
    let list2 = []
    $this.setData({
      user: app.globalData.userInfo,
      offset:1,
      toggle:true
    })
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
    this.getList(this.data.current)
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
    this.getList(this.data.current)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let $this = this
    if(!$this.data.ifAllList){
      $this.setData({
        offset: $this.data.offset + 1,
        ifReachBottom:true
      })
      $this.getList($this.data.current)
      console.log(111)
    }
    
    console.log('到底l')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})