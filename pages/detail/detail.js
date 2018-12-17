// pages/detail/detail.js
let datas = require('../../datas/list-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    // 获取参数下标
    let index = options.index;
    // 更新detailObj的状态值
    this.setData({
      detailObj:datas.list_data[index],
      index
    })

    //是否收藏
    let detailStorage = wx.getStorageSync('isCollected');
    console.log(detailStorage);

    if(!detailStorage){
      //缓存中初始化空对象
      wx.setStorageSync('isCollected', {})
    }

    if(detailStorage[index]){
      this.setData({
        isCollected:true
      })
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
  // 收藏
  handleCollection(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    })
    //提示用户
    let title = isCollected?'收藏成功':'取消收藏'
    wx.showToast({
      title,
      icon:'success'
    })
    //缓存数据到本地
    //let obj = {};
    wx.getStorage({
      key: 'isCollected',
      success: (datas) =>{
        console.log(datas)
        let obj = datas.data
        obj[this.data.index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('succ')
          }
        })
      },
    })
   
  }
})