const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBtn: true,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        isShowBtn: false, 
        userInfo: app.globalData.userInfo
      })
    }else{
      // 解决异步问题, 在app中定义一个函数接收参数
      app.userInfoReadyCallBack = res => {
        this.setData({
          isShowBtn: false, 
          userInfo: res 
        })
      }
    }
  },
  
  // 点击授权
  getUserInfo(e) {
    this.setData({
      isShowBtn: false,
      userInfo: e.detail.userInfo
    })
  }
})