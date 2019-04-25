// pages/repair/repair.js
const app = getApp()
const {$Toast} = require('../../static/dist/base/index.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList:{},     // 故障标签列表
    equipmentList:[],  // 设备列表
    arrList:[],
    index:'',
    equipmentValue:'',  // 设备名
    equipmentId:'',      // 设备id
    tagId:'',    // 故障标签id
    describeValue:'',   // 故障描述
    imgUrls:[],
    count:4,     // 可以选择上传图片的数量
    user:{}
  },

  
    // 选择设备类型
  bindPickerChange(e){
    // console.log(e)
    let $this = this
    $this.setData({
      index: e.detail.value,
      equipmentId: $this.data.equipmentList[e.detail.value].id
    })
  },
  // 选择故障标签
  tagChoose(e){
    let $this = this
    $this.setData({
      tagId: e.currentTarget.id
    })
  },

  // 选择照片
  chooseImage: function () {
    let $this = this
    $this.setData({
      count:4-$this.data.imgUrls.length
    })
    if($this.data.imgUrls.length<4){
      wx.chooseImage({
        count: $this.data.count,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // console.log(res)
          // 压缩图片
          res.tempFilePaths.forEach(item => {
            wx.compressImage({
              src: item,
              quality: 80,
              success(res) {
                wx.uploadFile({
                  url: app.globalData.URL + '/api/wx/upload',
                  filePath: res.tempFilePath,
                  name: 'file',
                  success: function (res) {
                    $this.setData({
                      imgUrls: $this.data.imgUrls.concat(JSON.parse(res.data).data.link)
                    })
                    console.log($this.data.imgUrls)
                  },
                  fail(res) {
                    $Toast({
                      content:'上传失败',
                      type:'warning'
                    })
                  }
                })
              },
              fail(res) {
                console.log(res)
                $Toast({
                  content:'压缩失败',
                  type:'warning'
                })
              }
            })
          })

        },
        fail: function (res) { 
          $Toast({
            content: '选择失败',
            type: 'warning'
          })
        },
        complete: function (res) { },
      })
    } else{
      $Toast({
        content:'最多只能上传4张图片',
        type:'warning'
      })
    }
  },

  // 点击图片预览大图
  previewImage(index){
    let $this = this;
    let imgList = $this.data.imgUrls.map(item=>{
      return item.slice(0,-11)
    })
    wx.previewImage({
      urls: imgList,            // 预览的图片路径数组
      current: imgList[index]   // 当前预览的图片
    })
  },

  // 提交报修信息
  repairSubmit: function (e) {
    let $this = this
    let tests = {}
    tests.equipmentId = $this.data.equipmentId
    tests.tagId = $this.data.tagId
    tests.schoolId = $this.data.user.schoolId
    tests.userId = $this.data.user.id
    tests.picture = $this.data.imgUrls
    tests.faultDesc = e.detail.value.faultDesc
    console.log(tests)
    if (!tests.equipmentId){
      $Toast({
        content:'请选择设备类型',
        type:'warning'
      })
      console.log('请选择设备类型')
    } else if (!tests.faultDesc){
      $Toast({
        content:'请输入故障描述',
        type:'warning'
      })
    } else if (!tests.tagId){
      $Toast({
        content:'请选择故障标签',
        type:'warning'
      })
    }else if ($this.data.id) {
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

    // console.log($this.data.user)
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

    app.ajaxF({
      url: '/api/wx/typeEquipment',
      method: 'get',
      success: function (res) {
        if(res.data){
          let arr = []
          res.data.forEach(item => {
            arr.push(item.type)
          })
          console.log(arr)
          $this.setData({
            equipmentList: res.data,
            arrList: arr
          })
        }
        
      }
    })

    // 故障标签
    bindTag:{
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