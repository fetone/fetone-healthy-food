const {getNewsDetail} = require('../../api/index')

Page({

  data: {
    newsDetail: {}
  },

  onLoad: function (options) {
    wx.showNavigationBarLoading()
    // 请求资讯详情数据
    getNewsDetail(options.id)
    .then((res) => {
      this.setData({
        newsDetail: res[0]
      })
      wx.hideNavigationBarLoading()
      wx.setNavigationBarTitle({
        title: res[0].title
      })
    })
  },

  
})