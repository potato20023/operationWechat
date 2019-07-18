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
        setTimeout(() => {
          $this.websocket();
        }, 2000)
      },
    })

    console.log('app')
    
  
    
  },

  websocket(){
    let $this = this;
    const socket = io(this.globalData.appPath + '/wx');
    const workerId = this.globalData.token;
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
        if($this.globalData.token){
          wx.navigateTo({
            url: '/pages/showModel/showModel?length=' + length + '&back=true',
            success(res) {
              console.log('跳转了')
            }
          })
        }
        

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
    // appPath: 'http://192.168.17.146:7001',
    appPath:"https://apiwxd.club",
    token:''
  }
})