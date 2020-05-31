//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    bannerList: [{
        image_url:"https://6c64-ldn-j9pfs-1302233442.tcb.qcloud.la/sun1.jpg",
        id:1
      },
      {
        image_url:"https://6c64-ldn-j9pfs-1302233442.tcb.qcloud.la/sun2.jpg",
        id:2
      },
      {
        image_url:"https://6c64-ldn-j9pfs-1302233442.tcb.qcloud.la/sun3.jpg",
        id:3
      },
      {
        image_url:"https://6c64-ldn-j9pfs-1302233442.tcb.qcloud.la/sun4.jpg",
        id:4
      },
      {
        image_url:"https://6c64-ldn-j9pfs-1302233442.tcb.qcloud.la/sun5.jpg",
        id:5
      },            
    ]
  },
  pageData: {
    locationObj:{}
  },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  onSubmit:function(){

  },
  chooseLocation:function(e){
      wx.chooseLocation({
        complete: (res) => {
          console.log(res)
          let locationObj = {
            latitude: res.latitude,
            longitude: res.longitude,
            name: res.name,
            address: res.address
          }
          this.pageData.locationObj=locationObj
          console.log(this.pageData.locationObj)
        },
      })
  }, 
  viewLocation:function(){
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      name: this.data.task.location.name,
      address: this.data.task.location.address
    })
  },
  onClick:function() {
    console.log("Button was click.")
    wx.cloud.getTempFileURL({
      fileList:['cloud://ldn-j9pfs.6c64-ldn-j9pfs-1302233442/sun1.jpg',
      'cloud://ldn-j9pfs.6c64-ldn-j9pfs-1302233442/sun2.jpg',
      'cloud://ldn-j9pfs.6c64-ldn-j9pfs-1302233442/sun3.jpg',
      'cloud://ldn-j9pfs.6c64-ldn-j9pfs-1302233442/sun4.jpg',
      'cloud://ldn-j9pfs.6c64-ldn-j9pfs-1302233442/sun5.jpg'],
      success: res => {
        bannerImageList: res.fileList.tempFileURL
        console.log(res.fileList)
        console.log("bannerImageList")
        console.log(bannerImageList)
      }
    })
  }
})
