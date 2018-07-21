// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    futureWeathers: [],
    city: '广州市'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let city = options.city
    console.log(city)
    this.setData({
      city
    })
    this.getFuture()
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
    this.getFuture( () => {
      wx.stopPullDownRefresh()
    })
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
  
  },
  getFuture(callback){
    wx.request({
      url: 'http://test-miniprogram.com/api/weather/future',
      data: {
        city: this.data.city,
        time: +new Date()
      },
      success: res => {
        let result = res.data.result
        
        let date = new Date()

        for (let i in result) {
          if (i !== '0') {
            date.setDate(date.getDate() + 1)
          }
          
          result[i].date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          result[i].day = `星期${{
            0: '日',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
          }[date.getDay()]}`
        }

        console.log(result)
        this.setData({
          futureWeathers: result
        })
      },
      error: res => {
        console.warn(res)
      },
      complete: res => {
        callback && callback()
      }
    })
  }
})