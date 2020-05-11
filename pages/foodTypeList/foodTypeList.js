const {getFoodsTypeList} = require('../../api/index')
Page({

  data: {
    foodsList: []
  },

  onLoad: function (options) {
    // 请求产品分类数据
    getFoodsTypeList(options.type)
    .then(res => {
      this.setData({
        foodsList: res.data
      })
    })
  },

  // 跳转商品详情
  goGoodsDetail(e) {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + e.currentTarget.dataset.goodsid,
    })
  }
})