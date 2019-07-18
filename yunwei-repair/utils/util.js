const formatTime = e => {
  let date = new Date(e)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// // 音效
//  voice{
//   const innerAudioContext = wx.createInnerAudioContext()
//   innerAudioContext.autoplay = true  // 是否自动开始播放，默认为 false
//   innerAudioContext.loop = false  // 是否循环播放，默认为 false

//   innerAudioContext.src = '/assets/voice/voice1.mp3';  // 音频资源的地址
//   innerAudioContext.onPlay(() => {  // 监听音频播放事件
//     // console.log('开始播放')
//   })

//   innerAudioContext.onError((res) => { // 监听音频播放错误事件
//     console.log(res.errMsg)
//     console.log(res.errCode)
//   })

// }

// // 震动 400ms
// vibrateLong() {
//   wx.vibrateLong({
//     success(res) {
//       console.log('震动long' + res)
//     }
//   })
// },

module.exports = {
  formatTime: formatTime
}
