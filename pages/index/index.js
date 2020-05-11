const {getSwiper, getNewsList} = require('../../api/index')

Page({
  data: {
    swiperIndex: 0,
    swiperImgs: [],
    newsList: []
  },

  // 轮播图播放事件
  changeImg(e) {
    this.setData({
      // 修改轮播图索引
      swiperIndex: e.detail.current
    })
  },

  onLoad() {
    // 获取轮播图数据
    getSwiper()
    .then((res) => {
      this.setData({
        swiperImgs: res.data
      })
    }),

    // 获取资讯数据
    getNewsList()
    .then(res => {
      this.setData({
        newsList: res.data
      })
    })
  }
})