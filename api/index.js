const network = require('./network')
const base_url = 'http://iwenwiki.com:3002'

module.exports = {
  // 获取首页轮播图
  getSwiper: () => network(base_url + '/api/banner'),
  // 获取资讯列表
  getNewsList: () => network(base_url + '/api/indexlist'),
  // 获取资讯详情
  getNewsDetail: (id) => network(base_url + '/api/indexlist/detail?id=' + id),
  // 获取食疗坊列表
  getFoodsList: (data) => network(base_url + '/api/foods/list', data),
  // 获取产品分类列表
  getFoodsTypeList: (type) => network(base_url + '/api/foods/list/type?type=' + type),
  // 获取热门城市
  getHotCity: () => network(base_url + '/api/hot/city'),
  // 获取定位城市
  getLocationCity: (data) => network(base_url + '/api/lbs/location', data),
  // 获取食疗坊搜索内容
  getFoodsSearch: (data) => network(base_url + '/api/foods/select', data),
  // 获取食疗坊商品详情数据
  getGoodsDetail: (id) => network(base_url + '/api/foods/list/detail?id=' + id),
  // 获取购物车数据
  getCartsList: () => network(base_url + '/api/cart/list'),
  // 加入购物车 name pic num info price
  getAddCartsList: (data) => network(base_url + '/api/cart/add', data),
  // 删除购物车
  getDelCartsList: (id) => network(base_url + '/api/cart/delete?id=' + id),
  // 修改购物车数据
  updateCartsList: (data) => network(base_url + '/api/cart/update', data)
}