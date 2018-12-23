// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isShow:false
  },

  // 点击跳转到list页面
  handlerClick(){
    wx.switchTab({
      url: '/pages/list/list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },

  getUserInfo() {
    // 判断用户是否授权了
    wx.getSetting({
      success: (data) => {
        //console.log(data)
        if (data.authSetting['scope.userInfo']) {
          // 用户已经授权
          this.setData({
            isShow: false
          })
        } else {
          //用户未授权
          this.setData({
            isShow: true
          })
        }
      }
    })

    // 获取用户登录信息
    wx.getUserInfo({
      success: (data) => {
        //console.log(data)
        //更新用户信息
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log('获取用户数据失败')
      }
    })
  },

  handleUserInfo(data){
    //console.log(data)
    // 判断用户是否点击允许
    if(data.detail.rawData){
      //点击允许
      this.getUserInfo()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  fn1:function(){
    console.log("done")
  }
})