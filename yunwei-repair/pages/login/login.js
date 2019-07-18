// pages/login/login.js
const app = getApp();
const {$Toast}  = require('../../assets/dist/base/index.js')
const io = require('../../utils/weapp.socket.io.js');
const socket = io(app.globalData.appPath + '/wx')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },
  // 提交表单数据
  submitForm(e){
    // console.log(e)
    let $this = this;
    if(!e.detail.value.username){
      $Toast({
        content:'请输入用户名'
      })
    }else if(!e.detail.value.password){
      $Toast({
        content:'请输入密码'
      })
    }else{
      
      app.ajax({
        url:'/api/wx/loging',
        method:'post',
        data:e.detail.value,
        callback(res){
          // console.log(res)
          wx.setStorage({
            key: 'token',
            data: res.data.token,
          });
          wx.setStorage({
            key: 'userInfo',
            data: res.data.result,
          });
          wx.reLaunch({
            url: '/pages/index/index',
          })
          app.globalData.token = res.data.token;
          app.globalData.userInfo = res.data.result;
          $this.websocket();
        }
      })

    }
  },

  websocket() {
    const socket = io(app.globalData.appPath + '/wx');
    const workerId = app.globalData.token;
    socket.on('connect', _ => {
      console.log('connect')
      // $Toast({
      //   content: 'socket 通信建立'
      // })
    })
    socket.on('online', res => {
      // console.log(res)
    })
    socket.on('disconnect', _ => {
      // $Toast({
      //   content: 'socket 通信断开'
      // })
    })

    socket.emit('wx', {
      workerId: workerId,
      sureOrder: false
    })
    socket.on(workerId, res => {
      // console.log(res)
      let result = JSON.parse(res);

      let length = result.length
      if (length > 0) {
        console.log(length)
        if(app.globalData.token){
          wx.reLaunch({
            url: '/pages/showModel/showModel?length=' + length + '&back=false',
            success(res) {
              console.log('跳转了')
            }
          })

          // 音效
          const innerAudioContext = wx.createInnerAudioContext()
          innerAudioContext.autoplay = true  // 是否自动开始播放，默认为 false
          innerAudioContext.loop = false  // 是否循环播放，默认为 false

          innerAudioContext.src = '/assets/voice/voice1.mp3';  // 音频资源的地址
          innerAudioContext.onPlay(() => {  // 监听音频播放事件
            // console.log('开始播放')
          })

          innerAudioContext.onError((res) => { // 监听音频播放错误事件
            console.log(res.errMsg)
            console.log(res.errCode)
          })


          // 震动
          wx.vibrateShort({
            success: function (res) {
              // console.log('震动short' + res)
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        // wx.showModal({
        //   title: '提示',
        //   content: '你有'+result.length+'条消息',
        //   success:(res)=>{
        //     if(res.confirm){
        //       socket.emit('wx',{
        //         workerId: workerId,
        //         sureOrder: true
        //       })
        //     }else{ 
        //       console.log('cancel')
        //     }
        //   }
        // })
        }
        

        
      }
    })
  },


  //
  setUsername(e){
    let {detail} = e.detail;
    this.setData({
      username:detail.value
    })
  },
  setPassword(e){
    let { detail } = e.detail;
    this.setData({
      password: detail.value
    })
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