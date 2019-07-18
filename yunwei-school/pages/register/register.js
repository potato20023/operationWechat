// pages/register/register.js
const app = getApp()
const {$Toast} = require('../../static/dist/base/index.js')
function getFun(fn, time){
  return function (con) {
    let $this = this;
    let _con = con;
    clearTimeout(fn.time)
    fn.time = setTimeout(function () {
      fn.call($this, _con)
    }, time)
  }
}
function ajaxFun(data){
  let $this = this
  app.ajaxF({
    url: '/api/wx/schoolList',
    method: 'get',
    data: {
      keyword: data.value
    },
    success: function (res) {
      data.tar.setData({
        schoolList: res.data
      })
    }
  })
}

const getFunDe = getFun(ajaxFun,1000)


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
    getFunDe({value:e.detail.value,tar:this})
  },
  // 选择学校
  chooseSchool: function (e) {
    this.setData({
      schoolid:e.target.dataset.id,
      school:e.target.dataset.content,
      schoolList: []
    })
  },
  toLogin() {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },

  registerSubmit: function (e) {
    let $this = this;
    let tests = e.detail.value
    // tests.schoolId = $this.data.schoolid;
    // 验证学校
    console.log(tests.schoolId)
    console.log($this.data.schoolid)
    if ($this.data.schoolid == '') {
      // console.log(tests.schoolId)
      if (tests.schoolId == ''){
        $Toast({
          content:'请选择学校'
        })
      }else{
        $Toast({
          content:'请输入正确的学校名'
        })
      }
    } else if (!(/^[\u4E00-\u9FA5]{2,4}$/.test(tests.name))) {
      // 验证姓名（2-4位汉字） 
      if(tests.name == ''){
        $Toast({
          content:'姓名不能为空'
        })
      } else{
        $Toast({
          content:'请输入2-4位汉字'
        })
      }
    }else if(!(/^[0-9]{11}$/.test(tests.phone))){
      // 验证电话
      if(tests.phone == ''){
        $Toast({
          content:'电话不能为空'
        })
      }else{
        $Toast({
          content:'请输入11位的数字'
        })
      }
    } else if (!(/^[a-zA-Z0-9_]{6,10}$/.test(tests.password))) {
      // 验证密码（6-10位字母，数字）
      if (tests.password == '') {
        $Toast({
          content:'密码不能为空'
        })
      } else {
        $Toast({
          content:'请输入6-10位的字母和数字作为密码'
        })
      }
    } else if(tests.password != tests.password1){
      $Toast({
        content:'请输入相同的密码'
      })
    } else {
      tests.schoolId = $this.data.schoolid;
      delete tests.password1;

      // wx.request({
      //   header: {
      //     'content-type': 'application/json', // 默认值
      //     'token': app.globalData.token
      //   },
      //   url: app.globalData.URL + '/api/wx/register',
      //   method:'post',
      //   data: tests,
      //   success: function (res) {
      //     if (res.data.code == 1) {
      //       $Toast({
      //         content:'注册成功'
      //       })
      //       setTimeout($this.toLogin,2000)
      //     } else if (res.data.code == 99) {
      //       wx.removeStorage({
      //         key: 'token',
      //         success: function (res) {
      //           wx.redirectTo({
      //             url: '/pages/login/login',
      //           })
      //         },
      //       })
      //     } else {
      //       if (res.data.message) {
      //         $Toast({
      //           content:res.data.message
      //         })
      //       }
      //     }
      //   },
      //   fail: function (res) {
      //     wx.showModal({
      //       title: '提示',
      //       content: '网络可能出错，请稍后再试',
      //       success: function (res) {
      //         if (res.confirm) {
      //           console.log('sure')
      //         } else {
      //           console.log('cancel')
      //         }
      //       }
      //     })
      //   },
      //   complete: function (res) {
      //     // if (isLoading || isLoading == undefined) {
      //     //   wx.hideLoading()
      //     // }
      //   }
      // })


      app.ajaxF({
        url: '/api/wx/register',
        method: 'post',
        data: tests,
        success: function (res) {
          $Toast({
            content:'注册成功'
          })
          setTimeout($this.toLogin,2000)
        }
      })
      
    }
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