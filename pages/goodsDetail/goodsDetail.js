const {getGoodsDetail, getAddCartsList} = require('../../api/index')
Page({

  data: {
    goodsDetailData: {}
  },

  onLoad: function (options) {
    // 请求商品详情数据
    getGoodsDetail(options.id)
    .then(res => {
      this.setData({
        goodsDetailData: res.data[0]
      })
    })
  },

  // 加入购物车
  addCart() {
    const {name, pic, description, price} = this.data.goodsDetailData
    getAddCartsList({
      name,
      pic,
      num: 1,
      info: description,
      price
    })
    .then(res => {
      if(res.status === 200){
        wx.showToast({
          title: '添加成功',
          icon: 'none'
        })
      }
    })
  },

  // 跳转购物车页面
  goCart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  }
})