const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: 12,
    nowWeather: 'sunny',
    nowWeatherZh: '晴天',
    bgColor: '#ffffff',
    futureWeathers: []
  },
  onLoad() {
    this.getNow()
  },
  onPullDownRefresh(){
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res => {
        let result = res.data.result

        console.log(result)

        this.setNow(result)
        this.setHourlyWeather(result)
      },
      complete: res => {
        callback && callback()
      }
    })
  },
  setNow(result) {
    let now = result.now
    console.log(now)

    let temp = now.temp
    let weather = now.weather
    let weatherZh = weatherMap[weather]

    let bgColor = weatherColorMap[weather]

    this.setData({
      nowTemp: temp,
      nowWeather: weather,
      nowWeatherZh: weatherZh,
      bgColor: bgColor
    })

    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: bgColor,
    })
    // wx.setBackgroundColor({
    //   backgroundColor: bgColor,
    //   backgroundColorTop: bgColor,
    //   backgroundColorBottom: '#ffffff'
    // })
  },
  setHourlyWeather(result) {
    let nowHour = new Date().getHours()
    let future = result.forecast
    for (let i in future) {
      future[i].time = (i * 3 + nowHour) % 24 + '时'
    }
    future[0].time = '现在'
    console.log(future)

    this.setData({
      futureWeathers: future
    })
  }
})