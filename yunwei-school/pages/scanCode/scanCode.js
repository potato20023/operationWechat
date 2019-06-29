// pages/repair/repair.js
const app = getApp()
const { $Message } = require('../../static/dist/base/index.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList: {},     // 故障标签列表
    arrList: [],
    index: '',   // 已选择的设备类型索引
    deviceId:'',  // 设备id
    id:'',   // 工单id
    deviceInfo:{},   // 设备详情
    // orderInfo:{},   // 工单详情
    // equipmentId:'', //设备类型id
    // type:'',     // 设备类型
    // school:'',    // 学校
    tagId: '',    // 故障标签id
    describeValue: '',   // 故障描述
    imgUrl: [],   // 选择的图片
    imgUrls: [],  // 上传的图片
    count: 3,     // 可以选择上传图片的数量
    user: {},
  },

  // 查看更多详情
  toMore(){
    wx.navigateTo({
      url: '/pages/device/deviceDetail/deviceDetail?deviceId=' + this.data.deviceId + '&fromWhere=0' 
    })
  },
  // 校验故障描述字数
  checkNum(e) {
    let length = e.detail.cursor
    // console.log(e)
    if (length > 49) {
      $Message({
        content:'不能超过50个字符',
        type:'warning',
        duration:2
      })
    }
  },


  // 选择故障标签
  tagChoose(e) {
    let $this = this
    $this.setData({
      tagId: e.currentTarget.id
    })
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
                  url: app.globalData.URL + '/api/wx/upload',
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
                      icon: 'none',
                      duration: 1000
                    })
                  }
                })
              },
              fail(res) {
                console.log(res)
                wx.showToast({
                  title: '压缩失败',
                  icon:'none',
                  duration:1000
                })
              }
            })
          })

        },
        fail: function (res) {
          wx.showToast({
            title: '选择失败',
            icon: 'none',
            duration: 1000
          })
        },
        complete: function (res) { },
      })
    } else {
      wx.showToast({
        title: '最多只能上传3张图片',
        icon: 'none',
        duration: 1000
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
  // 提交报修信息
  repairSubmit: function (e) {
    let $this = this
    let tests = {}
    tests.deviceId = $this.data.deviceId
    tests.equipmentId = $this.data.equipmentId
    tests.tagId = $this.data.tagId
    tests.schoolId = $this.data.user.schoolId
    tests.userId = $this.data.user.id
    tests.picture = $this.data.imgUrls
    tests.faultDesc = e.detail.value.faultDesc
    console.log(tests)
    if (!tests.faultDesc) {
      wx.showToast({
        title: '请输入故障描述',
        duration: 2000,
        icon: 'none'
      })
    } else if (!tests.tagId) {
      wx.showToast({
        title: '请选择故障标签',
        duration: 2000,
        icon: 'none'
      })
    } else if ($this.data.imgUrl.length > 0 && ($this.data.imgUrl.length != $this.data.imgUrls.length)) {
      wx.showToast({
        title: '图片上传中...',
        duration: 2000,
        icon: 'none'
      })
    } else if ($this.data.id) {
      app.ajaxF({
        url: '/api/wx/order/' + $this.data.id,
        method: 'put',
        data: tests,
        success: function (res) {
          // console.log(res)
          wx.showToast({
            title: '成功',
            icon:'success',
            duration:2000
          })
          setTimeout(()=>{
            wx.navigateBack({
                delta: 1
              })
          },1000)
        }
      })
    } else {
      app.ajaxF({
        url: '/api/wx/order',
        method: 'post',
        data: tests,
        success: function (res) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this
    // let id = options.id
    console.log(options)
    $this.setData({
      user: app.globalData.userInfo,
      id : options.id?options.id:'',  // 工单id
      deviceId: options.deviceId,   // 设备id
    })

   
      app.ajaxF({
        url: '/api/wx/device/' + $this.data.deviceId + '/edit',
        method: 'get',
        success(res) {
          if (res.data) {
            $this.setData({
              deviceInfo:res.data,    // 设备详情
              equipmentId: res.data.equipmentId,
            })
          }
        }
      })
    

    // 故障标签
    bindTag: {
      let $this = this
      app.ajaxF({
        url: '/api/wx/tagType',
        method: 'get',
        success: function (res) {
          // console.log(res)
          $this.setData({
            tagList: res.data
          })
        }
      })
    }
  
   // 编辑时获取工单报修信息
    if ($this.data.id) {
      app.ajaxF({
        url: '/api/wx/order/' + $this.data.id,
        method: 'get',
        success: function (res) {
          console.log(res)
          res.data.picture = JSON.parse(res.data.picture)
          $this.setData({
            // id: $this.data.id,
            tagId: res.data.tagId,
            tagValue: res.data.tagName,
            equipmentValue: res.data.typeName,
            equipmentId: res.data.equipmentId,
            describeValue: res.data.faultDesc,
            imgUrl: res.data.picture,
            imgUrls: res.data.picture,
            // orderInfo: res.data
          })
          $this.data.arrList.forEach((item, index) => {
            if (item == $this.data.equipmentValue) {
              $this.setData({
                index: index
              })
            }
          })
        }
      })
    }



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