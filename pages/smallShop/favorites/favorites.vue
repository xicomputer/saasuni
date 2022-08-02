<template>
    <view class="favorites">
        <view class="favorites-list" v-if="favoriteList.length">
            <navigator :url="'../myShop/myShop?storeId=' + item.id" class="favorites-list-item" v-for="(item, index) in favoriteList" :key="index">
                <view class="favorites-list-item-left">
                    <image :src="item.headImgUrl" class="favorites-list-item-left-logo"></image>
                    <view class="favorites-list-item-left-info">
                        <view class="favorites-list-item-left-info-name">{{ item.nickName }}</view>
                        <view class="favorites-list-item-left-info-desc">
                            <view class="favorites-list-item-left-info-desc-text">人缘口碑</view>
                            <view class="favorites-list-item-left-info-desc-starList">
                                <image
                                    src="/static/pages/img/smallShop/star_b.png"
                                    class="favorites-list-item-left-info-desc-starItem"
                                    v-for="(item, index1) in item.excellent"
                                    :key="index1"
                                ></image>
                            </view>
                        </view>
                        <view class="favorites-list-item-left-info-desc">
                            <view class="favorites-list-item-left-info-desc-text">颜值指数</view>
                            <view class="favorites-list-item-left-info-desc-starList">
                                <image
                                    src="/static/pages/img/smallShop/star_b.png"
                                    class="favorites-list-item-left-info-desc-starItem"
                                    v-for="(item, index1) in item.score"
                                    :key="index1"
                                ></image>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="favorites-list-item-right" :data-storeId="item.salesUserId" :data-idx="index">
                    <view class="favorites-list-item-right-uptext">支持他</view>
                    <image src="/static/pages/img/smallShop/liked.png" class="favorites-list-item-right-image"></image>
                    <view class="favorites-list-item-right-downtext">{{ item.praise }}</view>
                </view>
            </navigator>
        </view>
        <no-data text="您还没有收藏小店哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img4.png" v-else></no-data>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// pages/smallShop/favorites.js
const app = getApp();
export default {
    components: {
        noData
    },
    data() {
        return {
            favoriteList: [] // 收藏列表
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getParams();
    },
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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        // 获取页面参数
        getParams() {
            uni.showLoading({
                title: '加载中'
            });
            this.getFavoriteList();
        },

        // 获取收藏列表
        getFavoriteList() {
            const res = app.globalData.sjrequest('/sales/queryFavoriteList').then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        favoriteList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
            return res;
        }
    }
};
</script>
<style>
.favorites {
    min-height: 100vh;
    background: #f9f9f9;
}
.favorites-list {
    padding: 20rpx 30rpx 0;
}
.favorites-list-item {
    margin-top: 20rpx;
    padding: 30rpx;
    background: #ffffff;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
}
.favorites-list-item:first-child {
    margin-top: 0rpx;
}
.favorites-list-item-left {
    display: flex;
    align-items: center;
}
.favorites-list-item-left-logo {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
}
.favorites-list-item-left-info {
    margin-left: 30rpx;
}
.favorites-list-item-left-info-name {
    font-size: 32rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    margin-bottom: 10rpx;
}
.favorites-list-item-left-info-desc {
    display: flex;
    align-items: center;
}
.favorites-list-item-left-info-desc-text {
    font-size: 20rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    margin-right: 7rpx;
}
.favorites-list-item-left-info-desc-starList {
    display: flex;
    align-items: center;
}
.favorites-list-item-left-info-desc-starItem {
    margin-right: 5rpx;
    width: 17rpx;
    height: 17rpx;
}

.favorites-list-item-right {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.favorites-list-item-right-uptext {
    font-size: 13rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #666666;
}
.favorites-list-item-right-image {
    width: 28rpx;
    height: 28rpx;
    margin: 5rpx 0;
}
.favorites-list-item-right-downtext {
    font-size: 13rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #999999;
}
.index-content-content-noData {
    padding-top: 100rpx;
    text-align: center;
}
.index-content-content-noData-image {
    width: 326rpx;
    height: 278rpx;
}
.index-content-content-noData-text {
    font-size: 24rpx;
    color: #999999;
    text-align: center;
    margin-top: 40rpx;
}
</style>
