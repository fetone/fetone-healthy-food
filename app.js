//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch() {
    wx.getSetting({
      success: (res) => {  
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res) => {
              this.globalData.userInfo = res.userInfo
              // 解决由于异步获取不到数据的问题
              if(this.userInfoReadyCallBack){
                this.userInfoReadyCallBack(res.userInfo)
              }
            },
          })
        }
      },
    })
  }
})