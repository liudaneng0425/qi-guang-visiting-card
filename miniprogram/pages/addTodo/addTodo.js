// pages/addTodo/addTodo.js
const db = wx.cloud.database();
const todos = db.collection('todos');
Page({

  onSubmit: function(event) {
   console.log(event.detail.value.title)
   todos.add({
     data:{
       title:event.detail.value.title
     }
   }).then(res => {
     console.log(res)
     wx.showToast({
       title: '成功',
       icon: 'success'
     })
   })
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