const {getHotCity, getLocationCity} = require('../../api/index')
Page({

  data: {
    hotCitys: []
  },

  onLoad: function (options) {
    // 请求热门城市
    getHotCity()
    .then(res => {
      this.setData({
        hotCitys: res.data
      })
    })
  },

  // 跳转到食疗坊界面
  goFood(city) {
    wx.setStorageSync('city', city)
    wx.reLaunch({
      url: '../food/food',
    })
  },
 
  // 传递定位城市
  posCurrentCity() {
    wx.getLocation({
      success: res => {
        getLocationCity({
          latitude: res.latitude,
          longitude: res.longitude
        })  
        .then(data => {
          const city = data.result.address_component.city
          this.goFood(city)
        })  
      }
    })
  },

  // 传递热门城市
  posHotCity(e) {
    this.goFood(e.currentTarget.dataset.city)
  }
})