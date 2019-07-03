//app.js
const {$Toast} = require('assets/dist/base/index.js')
const io = require('utils/weapp.socket.io.js')

App({
  onLaunch: function () {
    
    // 判断token 是否存在
    const $this = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res)
        $this.globalData.token = res.data;
        wx.reLaunch({
          url: '/pages/index/index',
        })
      },
    })

    this.websocket();
    
  },

  websocket() {
    let $this = this
    const socket = io($this.globalData.appPath)
    socket.on('connect', function () {
      console.log('connected')
    })

    // 发送数据
    socket.emit('chat', {
      workerId: '101002'
    })

    // 接收消息
    socket.on('101002', res => {
      console.log('received news: ', res)
      if(res.length>0){
        this.voice();   // 音效
        this.vibrateLong();  //震动
        wx.navigateTo({
          url: '/pages/showModel/showModel?id=' + res[0],
          success: function(res) {
            console.log('跳转成功')
          }
        })
      }
    })

    // 监听连接错误
    socket.on('error', err=>{
      console.log(err)
    })
  },

  // 音效
  voice() {
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

  },

  // 震动 400ms
  vibrateLong() {
    wx.vibrateLong({
      success(res) {
        console.log('震动long' + res)
      }
    })
  },

  // 震动 15ms
  vibrateShort() {
    wx.vibrateShort({
      success: function (res) {
        console.log('震动short' + res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 微信请求的封装
  ajax: function ({ url, method, data, loading, callback }) {
    if (loading || loading == undefined) {
      wx.showLoading({
        title: '加载中...',
      });
    }
    wx.request({
      url: this.globalData.appPath + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',// 默认值
        'token': this.globalData.token
      },
      success: (res) => {
        if (res.data.code == 1) {
          callback(res.data);
        } else {
          if (res.data.message) {
            $Toast({
              content: res.data.message
            })
          }
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '网络可能出错了，请稍后重试',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function (res) {
        if (loading || loading == undefined) {
          wx.hideLoading();
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // appPath:'http://192.168.17.190:7001'
    // appPath: 'http://192.168.18.114:7001'
    // appPath: "http://112.124.203.17:7001"
    appPath: 'http://192.168.17.146:7001'
  }
})