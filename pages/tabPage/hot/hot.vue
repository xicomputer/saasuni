<template>
    <!-- pages/tabPage/hot/hot.wxml -->
    <view class="hot-page-container">
        <no-data v-if="!leftList.length" text="暂无热卖视频哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img8.png"></no-data>
        <view class="me-fx-row me-fx-sb" v-if="leftList.length">
            <view class="me-fx-col">
                <view class="video-item" @tap="toVideoPlay" :data-videoid="item.id" v-for="(item, index) in leftList" :key="index">
                    <image class="video-img" :src="item.coverUrl"></image>

                    <view class="item-bottom-box">
                        <view class="me-fx-row me-fx-start-c">
                            <image class="item-daizhi-img" src="/static/image/tabpage/daizhi.png"></image>
                            <text class="title-text">{{ item.commodityName }}</text>
                        </view>
                        <view class="me-full-text introduce-text">产品介绍：{{ item.description }}</view>
                    </view>
                </view>
            </view>
            <view class="me-fx-col">
                <view class="video-item" @tap="toVideoPlay" :data-videoid="item.id" v-for="(item, index) in rightList" :key="index">
                    <image class="video-img" :src="item.coverUrl"></image>

                    <view class="item-bottom-box">
                        <view class="me-fx-row me-fx-start-c">
                            <image class="item-daizhi-img" src="/static/image/tabpage/daizhi.png"></image>
                            <text class="title-text">{{ item.commodityName }}</text>
                        </view>
                        <view class="me-full-text introduce-text">产品介绍：{{ item.description }}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// pages/tabPage/hot/hot.js
const app = getApp();
export default {
    components: {
        noData
    },
    data() {
        return {
            list: [],
            leftList: [],
            rightList: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getVideoList();
    },
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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        getVideoList() {
            app.globalData.sjrequest('/commodity/queryVideoCommodityList').then((res) => {
                console.log('列表数据：', res);

                if (res && res.data.data) {
                    var list = res.data.data;
                    var leftList = this.leftList;
                    var rightList = this.rightList;

                    for (var i = 0; i < list.length; i++) {
                        if (i % 2 == 0) {
                            leftList.push(list[i]);
                        } else {
                            rightList.push(list[i]);
                        }
                    }

                    this.setData({
                        leftList,
                        rightList,
                        list
                    });
                }
            });
        },

        toVideoPlay(e) {
            var id = e.currentTarget.dataset.videoid;
            var list = this.list;
            var firstItem = {};
            list.forEach((item, index) => {
                if (item.id == id) {
                    firstItem = list.splice(index, 1);
                }
            });
            list.unshift(firstItem[0]);
            uni.setStorageSync('videolist_key', this.list);
            uni.navigateTo({
                url: '/pages/videoPlay/videoPlayList/videoPlayList'
            });
        }
    }
};
</script>
<style>
/* pages/tabPage/hot/hot.wxss */
Page {
    background-color: #f8f8f8;
}

.hot-page-container {
    padding: 20rpx;
    box-sizing: border-box;
}

.video-item {
    position: relative;
}
.video-item:not(:first-child) {
    margin-top: 20rpx;
}

.video-img {
    width: 344rpx;
    height: 540rpx;
    background-color: #ccc;
    border-radius: 16rpx;
}

.item-bottom-box {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 20rpx;
    box-sizing: border-box;
    width: 100%;
    color: #fff;
}
.item-bottom-box .item-daizhi-img {
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx;
}
.item-bottom-box .title-text {
    font-size: 24rpx;
    font-weight: bold;
}
.item-bottom-box .introduce-text {
    font-size: 20rpx;
}
</style>
