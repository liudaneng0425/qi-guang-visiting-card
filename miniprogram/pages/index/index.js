//index.js
const app = getApp()

const db = wx.cloud.database();
// const todos = db.collection('todos');
const ad_banner = db.collection('compay_ad_banner');
Page({
  data: {
    companyInfo: {
      name: "中山启光光伏工程有限公司",
      map_addrress: "广东省中山市齐东新村新五巷8号",
      map_latitude: 22.520057,
      map_longitude: 113.416247,
      worktime: "7 X 24 小时",
      telephone: "13715601666"
    },
    bannerArray: [{id:0,image_url:"",link:""}],
  },

  onLoad: function() {
    ad_banner.get().then( res=> {
      console.log(res)
      this.setData({
        bannerArray: res.data
      })
      console.log(this.data.bannerArray)
    })    
  },

  viewLocation:function(){
    const latitude = this.data.companyInfo.map_latitude
    const longitude = this.data.companyInfo.map_longitude
    const name = this.data.companyInfo.name
    const address = this.data.companyInfo.map_address
    console.log(this.data.companyInfo.map_latitude)
    wx.openLocation({
      latitude,
      longitude,
      name,
      address
    })
  },

  callPhone:function(){
    const phoneNumber = this.data.companyInfo.telephone
    wx.makePhoneCall({
      phoneNumber
    })
  },


})
