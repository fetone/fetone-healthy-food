const {getCartsList, getDelCartsList, updateCartsList} = require('../../api/index')
Page({

  data: {
    cartList: [],
    activeIndex: -1,
    beginX: 0,
    beginY: 0,
    totalPrice: '0.00',
    isPay: false,
    isChooseAll: false
  },

  onLoad: function (options) {
    
  },

  onShow() {
    this.reqCartList()
    this.setData({
      totalPrice: '0.00',
      isPay: false,
      isChooseAll: false
    })
  },

  // 请求购物车数据
  reqCartList() {
    getCartsList()
    .then(res => {
      let list = res.data.result
      this.setData({
        cartList: list
      })

      if(this.data.isChooseAll){
        list.forEach(item => {
          item.isSelected = true
        })
        this.setData({
          cartList: list
        })
        this.countTotalPrice()
      }
    })
  },

  // 删除购物车数据
  delCart(e) {
    const id = e.currentTarget.dataset.id
    getDelCartsList(id)
    .then(() => {
      this.reqCartList()
      wx.showToast({
        title: '删除成功',
        icon: 'none'
      })
      this.setData({
        activeIndex: -1
      })
    })
  },

  // 监听触摸点击事件
  moveStart(e) {
   this.setData({
     beginX: e.touches[0].clientX,
     beginY: e.touches[0].clientY,
     activeIndex: -1
   })
  },

  // 监听触摸移动事件
  moveLeft(e) {
    let targetX = e.touches[0].clientX
    let targetY = e.touches[0].clientY
    if(targetX - this.data.beginX < -20 && targetY - this.data.beginY < 10) {
      this.setData({
        activeIndex: e.currentTarget.dataset.index
      })
    }
  },

  // 监听 选择按钮点击事件
  chooseHandle(e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.cartList
    // 给点击元素的isSelected取反
    list[index].isSelected = !list[index].isSelected
    // 重新设置给data中
    this.setData({
      cartList: list
    })
    // 计算总价
    this.countTotalPrice()
  },

   // 全选
  chooseAll() {
    let list = this.data.cartList
    // 遍历给每个选项全选或不全选
    list.forEach(item => {
      item.isSelected = !this.data.isChooseAll
    })
    this.setData({
      cartList: list,
      isChooseAll: !this.data.isChooseAll
    })
    // 计算总价
    this.countTotalPrice()
  },

  // 计算总价格
  countTotalPrice() {
    let total = 0
    let count = 0 // 计算选中的个数
    // 找到选中的, 遍历计算总价
    this.data.cartList.forEach(item => {
      if(item.isSelected){
        total += parseFloat(item.price * item.num)
        count++
      }
    })
    total = total.toFixed(2)
    this.setData({
      totalPrice: total,
      isPay: count !== 0,  // 判断有没有选中的
      isChooseAll: count === this.data.cartList.length //判断是否全部选中
    })
  },

  // ++ 或 --
  handleCount(e){
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    let list = this.data.cartList
    let num = list[index].num
    // 判断是增加还是减少
    type === "add" ? num++ : num--
    if(num < 1){
      wx.showToast({
        title: '数量不能少于1',
        icon: 'none'
      })
      return
    }
    // 发送请求
    updateCartsList({
      id: list[index].id,
      num
    })
    .then(res => {
      if(res.status === 200){
        // 修改data中选项的数量
        list[index].num = num
        this.setData({
          cartList: list
        })
        // 计算总价
        if(this.data.isPay){
          this.countTotalPrice()
        }
      }
    })
  }
})