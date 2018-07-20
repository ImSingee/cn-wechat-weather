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
    bgColor: '#ffffff'
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
        let now = result.now

        let temp = now.temp
        let weather = now.weather
        let weatherZh = weatherMap[weather]

        let bgColor = weatherColorMap[weather]

        console.log(temp, weather, weatherZh)

        this.setData({
          nowTemp: temp,
          nowWeather: weather,
          nowWeatherZh: weatherZh,
          bgColor: bgColor
        })
        console.log(weatherColorMap[weather])
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: bgColor,
        })
        wx.setBackgroundColor({
          backgroundColor: bgColor,
          backgroundColorTop: bgColor,
          backgroundColorBottom: '#ffffff'
        })
      },
      complete: res => {
        callback && callback()
      }
    })
  }
})