// pages/register/register.js


const app = getApp()
const { $Toast, $Message } = require('../../static/dist/base/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: [],
    schoolid: '',
    school: ''
  },

  // 搜索学校
  searchSchool: function (e) {
    console.log(e)
    let $this = this
    let search = e.detail.value
    if(search){
      app.ajaxF({
        url: '/api/wx/schoolList',
        method: 'get',
        data: {
          keyword: search
        },
        success: function (res) {
          console.log(res)
          $this.setData({
            schoolList: res.data
          })
        }
      })
    }else{
      $this.setData({
        schoolList: [],
        schoolid: ''
      })
    }
    
  },
  // 选择学校
  chooseSchool: function (e) {
    this.setData({
      schoolid:e.target.dataset.id,
      school:e.target.dataset.content,
      schoolList: []
    })
  },
  // registerSubmit: function (e) {
  //   console.log(e.detail.value)
  //   console.log(this.schoolid)
  //   e.detail.value.school = this.schoolid
  //   console.log(e.detail.value)
  // },


  toLogin() {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },

  registerSubmit: function (e) {
    let $this = this;
    let tests = e.detail.value
    // 验证学校
    if (!tests.schoolId) {
      $Toast({
        content:'请选择学校',
        type:'warning'
      })
    } else if (!(/^[\u4E00-\u9FA5]{2,4}$/.test(tests.name))) {
      // 验证姓名（2-4位汉字） 
      if(tests.name == ''){
        $Toast({
          content: '姓名不能为空',
          type: 'warning'
        })
      } else{
        $Toast({
          content: '请输入2-4位汉字',
          type: 'warning'
        })
      }
    }else if(!(/^[0-9]{11}$/.test(tests.phone))){
      // 验证电话
      if(tests.phone == ''){
        $Toast({
          content:'电话不能为空',
          type:'warning'
        })
      }else{
        $Toast({
          content:'请输入11位的数字',
          type:'warning'
        })
      }
    } else if (!(/^[a-zA-Z0-9_]{6,10}$/.test(tests.username))) {
      // 验证账号（6-10位字母，数字）
      
      if(tests.username == ''){
        $Toast({
          content: '账号不能为空',
          type: 'warning'
        })
      } else{
        $Toast({
          content: '请输入6-10位的字母和数字作为账号',
          type: 'warning'
        })
      }
    } else if (!(/^[a-zA-Z0-9_]{6,10}$/.test(tests.password))) {
      // 验证密码（6-10位字母，数字）
      if (tests.password == '') {
        $Toast({
          content: '密码不能为空',
          type: 'warning'
        })
      } else {
        $Toast({
          content: '请输入6-10位的字母和数字作为密码',
          type: 'warning'
        })
      }
    } else if(tests.password != tests.password1){
      $Toast({
        content: '请输入相同的密码',
        type: 'warning'
      })
    } else {
      tests.schoolId = $this.data.schoolid;
      delete tests.password1;
      app.ajaxF({
        url: '/api/wx/register',
        method: 'post',
        data: tests,
        success: function (res) {
          console.log(res)
          $Message({
            content:'注册成功',
            type:'success',
            duration:2
          })
          setTimeout($this.toLogin,2000)
         
          
        }
      })
    }
    
    console.log(tests)
    
    
    
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
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