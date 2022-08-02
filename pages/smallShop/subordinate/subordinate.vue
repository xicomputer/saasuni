<template>
    <!-- <view wx:if="{{shopName == ''}}" class="noData">
  <image src="/pages/img/no_notice.png" class="noData-img"></image>
  <view class="noMore-data">您还没有下级哦~~</view>
</view> -->
    <view class="subordinate">
        <!-- <van-search
      value="{{ value }}"
      placeholder="请输入用户名称"
      use-action-slot
      shape="round"
      bind:change="onChange"
      bind:search="onSearch"
    >
      <view slot="action" bind:tap="onClick">搜索</view>
    </van-search> -->
        <!-- <view class="subordinate-searchText">{{shopName}}</view> -->
        <!-- <image src="/pages/img/subordinate.png" class="subordinate-searchImg"></image> -->
        <!-- </input> -->
        <view :class="'subordinate-dropDown ' + (isShowShop ? (shopList.length == 0 ? 'isShow' : '') : 'isShow')">
            <view class="subordinate-dropDown-item" @tap="changeShop" :data-index="index" v-for="(item, index) in shopList" :key="index">
                <image :src="item.logoPic" class="subordinate-dropDown-item-image"></image>

                <view class="subordinate-dropDown-item-text">{{ item.nickName }}</view>
            </view>
        </view>
        <view v-if="subordinateList.length == 0" class="noData">
            <image src="/static/pages/img/no_notice.png" class="noData-img"></image>
            <view class="noMore-data">您在该商家没有下级哦~~</view>
        </view>
        <view v-else class="subordinate-list">
            <view class="subordinate-list-item" v-for="(item, index) in subordinateList" :key="index">
                <image :src="item.headimgurl" class="subordinate-list-item-img"></image>

                <view class="subordinate-list-item-info">
                    <view class="subordinate-list-item-info-item">
                        <view class="subordinate-list-item-info-item-name">{{ item.nickname }}</view>
                        <view class="subordinate-list-item-infoBox">
                            <view class="subordinate-list-item-info-item-time">收藏时间</view>
                            <view class="subordinate-list-item-info-item-time">{{ item.addTime }}</view>
                        </view>
                        <!-- <view class="subordinate-list-item-info-item-price">+￥{{item.earnings}}</view> -->
                    </view>
                    <!-- <view class="subordinate-list-item-info-item">
       
          <view class="subordinate-list-item-info-item-text">佣金收益</view>
        </view> -->
                </view>
            </view>
            <view class="noMore-data">-没有更多了-</view>
        </view>
    </view>
</template>

<script>
// import vanSearch from './@vant/weapp/search/index';
// pages/subordinate/subordinate.js
const app = getApp();
export default {
    components: {
        // vanSearch
    },
    data() {
        return {
            isShowShop: false,
            shopList: [],
            subordinateList: [],
            shopName: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSubordinateList();
    },
    // 切换商家
    // changeShop(e){
    //   // let {marchantid,personnel} = e.currentTarget.dataset
    //   let {index} = e.currentTarget.dataset
    //   let {marchantId,nickName,personnel} = this.data.shopList[index]
    //   this.setData({
    //     shopName: nickName
    //   })
    //   this.getSubordinateList(marchantId,personnel)
    //   this.isShowShopList()
    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    // onShareAppMessage: function () {
    // }
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        // 是否显示商家列表
        // isShowShopList(){
        //   this.setData({
        //     isShowShop: !this.data.isShowShop
        //   })
        // },
        // 获得商家列表
        // getShopList(){
        //   const fxToken = wx.getStorageSync('fxToken')
        //   const data ={
        //     type: 1,
        //     pageCurr: 1,
        //     pageSize: 20
        //   }
        //   app.fxrequest('/sales/querySalesMarchantList', data, fxToken).then(res => { //使用
        //     if(res.data.code==200){
        //       if(res.data.data.length==0){
        //         wx.showToast({
        //           title: '您还没有下级',
        //           icon: 'none'
        //         })
        //       }else{
        //         this.getSubordinateList(res.data.data[0].marchantId,res.data.data[0].personnel)
        //         this.setData({
        //           shopList: res.data.data,
        //           shopName: res.data.data[0].nickName
        //         })
        //       }
        //     }
        //   })
        // },
        // 获得下级列表
        getSubordinateList() {
            // const fxToken = wx.getStorageSync('fxToken')
            // const data ={
            //   storeId: wx.getStorageSync('storeId'),
            // }
            // app.fxrequest('/sales/querySubordinateList', data, fxToken).then(res => { //使用
            //   if(res.data.code==200){
            //     res.data.data.forEach(item => {
            //       if(item.addTime){
            //         //item.addTime = time.formatNowDate(new Date(item.addTime),1)
            //         let y = new Date().getFullYear()
            //         item.addTime = `${y}-${item.addTime}`
            //       }
            //     });
            //     this.setData({
            //       subordinateList: res.data.data
            //     })
            //   }
            // })
        },

        changeShop() {
            console.log('占位：函数 changeShop 未声明');
        }
    }
};
</script>
<style>
.subordinate {
}
.subordinate-searchBox {
    width: 690rpx;
    height: 82rpx;
    background: #f3f3f3;
    border-radius: 41rpx;
    margin: 0 auto;
    padding: 0 35rpx 0 50rpx;
    box-sizing: border-box;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-between; */
    /* position: relative; */
    z-index: 2;
}
.subordinate-searchText {
    font-size: 28rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #999999;
    line-height: 120rpx;
}
.subordinate-searchImg {
    width: 25rpx;
    height: 14rpx;
}
.subordinate-dropDown {
    width: 690rpx;
    background: #dfdfdf;
    border-radius: 10rpx;
    padding: 46rpx 0 35rpx;
    position: absolute;
    left: 30rpx;
    top: 41rpx;
    z-index: 1;
}
.subordinate-dropDown-item {
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #bbbbbb;
    margin: 0 36rpx;
    height: 139rpx;
}
.subordinate-dropDown-item-image {
    width: 92rpx;
    height: 92rpx;
    border-radius: 50%;
}
.subordinate-dropDown-item-text {
    font-size: 28rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    margin-left: 25rpx;
}
.subordinate-list {
}
.subordinate-list-item {
    margin: 0 30rpx;
    padding: 50rpx 0;
    display: flex;
    border-bottom: #dfdfdf 1rpx solid;
}
.subordinate-list-item:nth-last-child(2),
.subordinate-dropDown-item:last-child {
    border-bottom: none;
}
.subordinate-list-item-img {
    width: 92rpx;
    height: 92rpx;
    border-radius: 50%;
}
.subordinate-list-item-info {
    width: 0;
    flex: 1;
    margin-left: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.subordinate-list-item-infoBox {
    height: 60rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.subordinate-list-item-info-item {
    width: 100%;
    height: 92rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.subordinate-list-item-info-item-name {
    font-size: 28rpx;
    color: #333333;
}
.subordinate-list-item-info-item-price {
    font-size: 24rpx;
    color: #f41515;
}
.subordinate-list-item-info-item-time {
    line-height: 24rpx;
    font-size: 24rpx;
    color: #999999;
}
.subordinate-list-item-info-item-text {
    font-size: 24rpx;
    color: #333333;
}
.isShow {
    display: none;
}
.noData {
    text-align: center;
    margin-top: 200rpx;
}
.noData-img {
    width: 632rpx;
    height: 369rpx;
}
.noMore-data {
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #999999;
    text-align: center;
    margin-top: 20rpx;
}
</style>
