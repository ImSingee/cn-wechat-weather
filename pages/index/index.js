Page({
  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success(res) {
        let result = res.data.result
        let now = result.now

        let temp = now.temp
        let weather = now.weather

        console.log(temp, weather)
      }
    })
  }
})