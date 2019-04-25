// School/pages/repairDetail/repairDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentList: [],   // 设备列表
    equipmentValue: '',   // 设备名称，在输入框中显示的设备名称
    equipmentId: '',     // 设备id
    tagList: [],       // 故障标签列表
    tagValue: '',      // 选择的故障名称
    tagId: '',         // 故障id
    describeValue: '',  // 故障描述
    imgUrl: [],          // 上传的图片列表
    imgUrls: [],
    id: '',   // 报修单id
    info: {},   // 报修单详情
    user: {}    // 用户信息
  },

  // 选择设备
  bindInput: function () {
    var $this = this;
    app.ajaxF({
      url: '/api/wx/typeEquipment',
      method: 'get',
      success: function (res) {
        console.log(res.data)
        $this.setData({
          equipmentList: res.data
        })
      }
    })

  },
  chooseEqu: function (e) {
    console.log(e.target.dataset)
    var id = e.target.dataset.id;
    var type = e.target.dataset.type;
    var $this = this;
    // console.log(id)
    $this.setData({
      equipmentValue: type,
      equipmentId: id,
      equipmentList: []
    })

  },

  // 故障标签
  bindTag: function () {
    let $this = this
    app.ajaxF({
      url: '/api/wx/tagType',
      method: 'get',
      success: function (res) {
        console.log(res)
        $this.setData({
          tagList: res.data
        })
      }
    })
  },
  chooseTag: function (e) {
    let $this = this
    let id = e.target.dataset.id
    let name = e.target.dataset.name
    $this.setData({
      tagValue: name,
      tagId: id,
      tagList: []
    })
  },

  // 选择照片
  chooseImage: function () {
    var $this = this
    wx.chooseImage({
      count: 3,
      sizeType: [],
      sourceType: [],
      success: function (res) {
        console.log(res)
        $this.setData({
          imgUrl: $this.data.imgUrl.concat(res.tempFilePaths)
        })
        let img = res.tempFilePaths
        img.forEach(function (item, index, img) {
          wx.uploadFile({
            url: app.globalData.URL + '/api/wx/upload',
            filePath: res.tempFilePaths[index],
            name: 'file',
            success: function (res) {
              // console.log(res.data)
              // console.log(JSON.parse(res.data))
              $this.setData({
                imgUrls: $this.data.imgUrls.concat(JSON.parse(res.data).data.link)
              })
            }
          })
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })


  },
  // 提交报修信息
  repairSubmit: function (e) {
    let $this = this
    let tests = e.detail.value
    tests.equipmentId = $this.data.equipmentId
    tests.tagId = $this.data.tagId
    tests.schoolId = $this.data.user.schoolId
    tests.userId = $this.data.user.id
    tests.picture = $this.data.imgUrls
    console.log(tests)
    if ($this.data.id) {
      app.ajaxF({
        url: '/api/wx/order/' + $this.data.id,
        method: 'put',
        data: tests,
        success: function (res) {
          console.log(res)
          wx.redirectTo({
            url: '/pages/repairSuccess/repairSucess'
          })
        }
      })
    } else {
      app.ajaxF({
        url: '/api/wx/order',
        method: 'post',
        data: tests,
        success: function (res) {
          console.log(res)
          wx.reLaunch({
            url: '/pages/repairSuccess/repairSucess'
          })
        }
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let $this = this
    let id = options.id
    // console.log(id)
    $this.setData({
      user: app.globalData.userInfo
    })

    console.log($this.data.user)
    if (id) {
      app.ajaxF({
        url: '/api/wx/order/' + id,
        method: 'get',
        success: function (res) {
          console.log(res)
          res.data.picture = JSON.parse(res.data.picture)
          $this.setData({
            id: id,
            tagId: res.data.tagId,
            tagValue: res.data.tagName,
            equipmentValue: res.data.typeName,
            equipmentId: res.data.equipmentId,
            describeValue: res.data.faultDesc,
            imgUrl: res.data.picture,
            imgUrls: res.data.picture,
            info: res.data
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