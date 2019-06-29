// pages/end/end.js
const app =getApp()
const {$Toast}  = require('../../assets/dist/base/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    workerId:'',
    deviceId:'',   // 设备id
    status:'3',
    filelist:[],
    imgUrl:[],
    imgUrls:[],
    remark:'',
    count:3
  },

  // 选择照片
  chooseImage: function () {
    let $this = this
    $this.setData({
      count: 3 - $this.data.imgUrl.length
    })
    if ($this.data.imgUrl.length < 3) {
      wx.chooseImage({
        count: $this.data.count,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // console.log(res)
          // 压缩图片
          $this.setData({
            imgUrl: $this.data.imgUrl.concat(res.tempFilePaths)
          })
          res.tempFilePaths.forEach(item => {
            console.log(item)
            wx.compressImage({
              src: item,
              quality: 80,
              success(res) {
                console.log(res.tempFilePath)
                wx.uploadFile({
                  url: app.globalData.appPath + '/api/wx/upload',
                  filePath: res.tempFilePath,
                  name: 'file',
                  success: function (res) {
                    $this.setData({
                      imgUrls: $this.data.imgUrls.concat(JSON.parse(res.data).data.link),
                      hidden: 'false'
                    })
                    console.log($this.data.imgUrls)
                  },
                  fail(res) {
                    wx.showToast({
                      title: '上传失败',
                      duration:2000,
                      icon:'none'
                    })
                  }
                })
              },
              fail(res) {
                // console.log(res)
                wx.showToast({
                  title: '压缩失败',
                  duration:2000,
                  icon:'none'
                })
              }
            })
          })

        },
        fail: function (res) {
          wx.showToast({
            title: '选择失败',
            duration:2000,
            icon:'none'
          })
        },
        complete: function (res) { },
      })
    } else {
      wx.showToast({
        title: '最多只能上传3张图片',
        duration: 2000,
        icon: 'none'
      })
    }
  },

  // 点击图片预览大图
  previewImage(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    let $this = this;
    let imgList = $this.data.imgUrls.map(item => {
      return item.slice(0, -11)
    })
    wx.previewImage({
      urls: imgList,            // 预览的图片路径数组
      current: imgList[index]   // 当前预览的图片
    })
  },
  // 删除图片
  deleteImg(e) {
    console.log(e)
    let $this = this
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '是否删除此照片',
      success(res) {
        if (res.confirm) {
          $this.data.imgUrl.splice(index, 1);
          $this.data.imgUrls.splice(index, 1)
          console.log($this.data.imgUrl)
          $this.setData({
            imgUrl: $this.data.imgUrl,
            imgUrls: $this.data.imgUrls
          })
        }
      }
    })
  },
  // 表单提交
  submitData(){
    const $this = this;
    let datas = {}
    datas.filelist = JSON.stringify($this.data.imgUrls)
    datas.id = $this.data.id
    datas.workerId = $this.data.workerId
    datas.remark = $this.data.remark
    datas.status = $this.data.status
    datas.deviceId = $this.data.deviceId
    app.ajax({
      url: '/api/wx/workerOrder/' + $this.data.id,
      method: 'put',
      data: datas,
      callback: function (res) {
        wx.switchTab({
          url: '/pages/list/list',
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  // 备注内容
  setRemark({detail}){
    console.log(detail)
    let length = detail.detail.cursor
    this.setData({
      remark:detail.detail.value
    });
    if(length > 99){
      $Toast({
        content:'不能超过100个字符',
        type:'warning'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      workerId:options.workerId,
      deviceId:options.deviceId
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