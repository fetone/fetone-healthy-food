const {productCategory} = require('../../utils/data')
const {getFoodsList} = require('../../api/index')
Page({

  data: {
    location: '北京',
    productCategory,
    foodsList: [],
    pageIndex: 1,
    isShow: false,
    isShowNone: false
  },

   // 获取商品列表
  getFoods(pageIndex) {
    getFoodsList({
      city: this.data.location,
      page: pageIndex
    })
    .then(res => {
      if(res.status === 200) {
        this.setData({
          foodsList: [...this.data.foodsList, ...res.data.result]
        })
      }else{ // 显示底线
        if(this.data.foodsList.length === 0){
          this.setData({
            isShowNone: true,
            isShow: false
          })
        }else{
          this.setData({
            isShow: true
          })
        }
      }
    })
  },

  onLoad: function (options) {
    // 判断本地有没有city缓存数据
    const city = wx.getStorageSync('city')
    if (city){
      this.setData({
        location: city
      })
    }

    this.getFoods(1)
  },

  // 下拉加载
  onReachBottom() {
    this.data.pageIndex++
    this.getFoods(this.data.pageIndex)
  },

  // 跳转搜索页面
  goSearch() {
    wx.navigateTo({
      url: '../search/search?city=' + this.data.location,
    })
  },

  // 跳转分类列表页面
  goFoodTypeList(e) {
    wx.navigateTo({
      url: '../foodTypeList/foodTypeList?type=' + e.currentTarget.dataset.type,
    })
  },

  // 跳转定位页面
  goSelectCity() {
    wx.navigateTo({
      url: '../selectCity/selectCity',
    })
  },

  // 跳转商品详情
  goGoodsDetail(e) {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + e.currentTarget.dataset.goodsid,
    })
  }
})