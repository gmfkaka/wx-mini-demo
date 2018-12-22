// pages/detail/detail.js
let datas = require('../../datas/list-data.js')
let appDatas = getApp();
//console.log(appDatas)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false,
    isMusicPlay:false
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

    //监听播放播放
    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        isMusicPlay:true
      })
      //修改appdata中的数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;
    })

    //判断是否在播放 
    if(appDatas.data.isPlay && appDatas.data.pageIndex === index){
      this.setData({
        isMusicPlay: true
      })
    }

    //监听音乐暂停
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isMusicPlay: false
      })
      appDatas.data.isPlay = false;
    })
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
   
  },

  // 音乐播放
  handleMusicPlay(){
    console.log("rinima")
    let isMusicPlay = !this.isMusicPlay;
    this.setData({
      isMusicPlay
    })
    // 控制音乐播放
    if(isMusicPlay){
      let {dataUrl,title} = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,title
      })
    }else{
      wx.stopBackgroundAudio();
    }
  },

  // 分享
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈','分享到微博','分享到qq空间'
      ],
    })
  }

})