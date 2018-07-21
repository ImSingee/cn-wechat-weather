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

const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

Page({
  data: {
    nowTemp: 12,
    nowWeather: 'sunny',
    nowWeatherZh: '晴天',
    bgColor: '#ffffff',
    futureWeathers: [],
    todayTemp: {
      minTemp: 10,
      maxTemp: 20
    },
    todayDate: '2018-07-20',
    city: '广州市'
  },
  onLoad() {
    this.qqmapsdk = new QQMapWX({
      key: 'YR2BZ-FKTCO-TBMWY-S2SGM-V3JDK-ANF6Y'
    })
    this.onTapGetLocation()
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
        city: this.data.city
      },
      success: res => {
        let result = res.data.result

        console.log(result)

        this.setNow(result)
        this.setHourlyWeather(result)
        this.setToday(result)
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
  },
  setToday(result) {
    let today = result.today
    let date = new Date()
    let todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    this.setData({
      todayTemp: today,
      todayDate
    })
  },
  onTapDayWeather() {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  onTapGetLocation() {
    wx.getLocation({
      success: res => {
        console.log(res)
        this.qqmapsdk.reverseGeocoder({
          location: res,
          success: res => {
            let cityRes = res
            console.log(cityRes)
            let city = res.result.address_component.city
            console.log(city)
            this.setData({
              city
            })
            this.getNow()
          }
        })
      },
      fail: res => {
        wx.showModal({
          title: '权限被拒绝',
          content: '需要位置权限才能获取当前位置',
          showCancel: false
        })
      }
    })
  }
})