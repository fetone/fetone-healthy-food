const {getFoodsSearch} = require('../../api/index')
const {throttle} = require('../../utils/util')
Page({

  data: {
    foodsList: [],
    city: '',
    hasData: true
  },

  onLoad: function (options) {
    this.setData({
      city: options.city
    })
  },

  // 监听input请求数据
  searchGoods: throttle(function(e){
    this.setData({
      foodsList: []
    })
    if(!e.detail.value){
      this.setData({
        hasData: true
      })
      return
    }
    getFoodsSearch({
      name: e.detail.value,
      city: this.data.city
    })
    .then(res => {
      if(res.status === 200){
        this.setData({
          foodsList: res.data,
          hasData: true
        })
      }else{
        this.setData({
          hasData: false
        })
      }
    })
  })
})