module.exports = 
	function(url, data={}, method='GET') {
		return new Promise((resolve, reject) => {
			wx.showLoading({
				title: '数据加载中',
			})
			wx.request({
				url,
				data,
				method,
				success: (res) => {
					if (res.statusCode !== 200) {
						return wx.showToast({
							title: "数据加载失败"
						})
					}
					wx.hideLoading()
					resolve(res.data)
				},
				fail: (err) => {
					wx.hideLoading()
					wx.showToast({
						title: "请求接口失败"
					})
					reject(err)
				}
			})
		})
	}
