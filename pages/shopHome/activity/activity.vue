<template>
    <!-- pages/shopHome/activity/activity.wxml -->
    <!-- pages/shopHome/components/componentsPage/activity/activity.wxml -->
    <!-- 活动 -->
    <view class="activity-container">
        <!-- 喊价 -->
        <view class="activity-container-type" v-if="auctionList.length">
            <view class="activity-container-top">
                <text>喊价商品进行中</text>
                <navigator class="activity-container-top-right" :url="'/pages/activity/pmhd/list/list?merchantId=' + marchantId">查看更多>></navigator>
            </view>
            <view class="activity-container-goods-box">
                <block v-for="(item, index) in auctionList" :key="index">
                    <navigator :url="'/pages/activity/pmhd/details/details?auctionId=' + item.auctionId" class="activity-container-item">
                        <image :src="item.logoImg" mode="aspectFill" style="width: 100%; height: 320rpx; position: relative">
                            <!-- 预约人数 -->
                            <view class="subscribe-box" v-if="item.status == 1">预约人数:{{ item.reserveNumber || 0 }}</view>
                            <!-- 起步价 -->
                            <view class="subscribe-box" v-if="item.status == 2" style="background: linear-gradient(180deg, #fa5151 0%, #ff0000 100%)">
                                起歩价:{{ item.xsAuctionItem.startingPrice || 0 }}
                            </view>
                        </image>
                        <view class="activity-container-item-content">
                            <!-- 开喊时间 -->
                            <view class="paimai-time" @finish="getAuctionList" v-if="item.status == 1" style="background: #07c160">
                                <van-count-down :time="item.startTime" format="开喊时间: DD天HH:mm:ss"></van-count-down>
                            </view>
                            <!-- 距喊品结束 -->
                            <view class="paimai-time" @finish="getAuctionList" v-if="item.status == 2">
                                <van-count-down :time="item.endTime1" format="距离喊价结束:DD天HH:mm:ss"></van-count-down>
                            </view>
                            <!-- 已结束 -->
                            <view class="paimai-time" v-if="item.status == 3" style="background: #999">已结束 {{ item.endTime }}</view>
                            <view class="activity-container-item-name">{{ item.xsAuctionItem.auctionItemName }}</view>
                            <view class="activity-container-item-explain">{{ item.xsAuctionItem.description }}</view>
                            <view class="activity-container-bottom">
                                <view class="activity-container-price">
                                    <text style="font-size: 24rpx">{{ item.auctionPrice ? (item.status == 3 ? '成交价' : '当前价') : '起步价' }}：￥</text>
                                    {{ item.auctionPrice || item.xsAuctionItem.startingPrice || 0 }}
                                </view>
                                <view v-if="item.status == 3" class="activity-container-btn" style="background: #999999">已结束</view>
                                <view v-else class="activity-container-btn">参与</view>
                            </view>
                        </view>
                    </navigator>
                </block>
            </view>
        </view>

        <!-- 促销 -->
        <view class="activity-container-type" v-if="saleGoodsList.length">
            <view class="activity-container-top">
                <text>促销商品进行中</text>
                <navigator class="activity-container-top-right" :url="'/pages/Index/saleList/saleList?marchantId=' + marchantId + '&orderType=' + orderType">查看更多>></navigator>
            </view>
            <view class="sale-container-goods-box">
                <navigator
                    class="sale-container-item"
                    :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&sid=' + item.tempSpecId"
                    v-for="(item, index) in saleGoodsList"
                    :key="index"
                >
                    <image :src="item.thumbnail" mode="aspectFill" style="width: 200rpx; height: 200rpx; border-radius: 20rpx"></image>

                    <view class="sale-container-item-content">
                        <view class="sale-container-top">
                            <view class="sale-container-item-name">{{ item.commodityName }}</view>
                            <view class="sale-container-item-explain">{{ item.description }}</view>
                        </view>
                        <view class="sale-container-bottom">
                            <view class="sale-container-price">
                                <text style="font-size: 24rpx">￥</text>
                                {{ item.activityType == 1 ? item.lowPrice : item.originalPrice }}
                            </view>
                            <view class="sale-container-btn" @tap.stop.prevent="goBuy" :data-item="item">购买</view>
                        </view>
                    </view>
                </navigator>
            </view>
        </view>
        <no-data v-if="!saleGoodsList.length && !auctionList.length" text="暂无活动" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img1.png"></no-data>
    </view>
</template>

<script>
// pages/shopHome/activity/activity.js
const app = getApp();
export default {
    data() {
        return {
            marchantId: null,
            auctionList: [],
            saleGoodsList: [],
            orderType: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let ids = uni.getStorageSync('merchantId');
        this.setData({
            marchantId: ids
        });
        this.getAuctionList();
        this.getCategoryGoodsList();
    },
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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 获得拍卖列表
        getAuctionList() {
            const params = {
                pageNum: 1,
                pageSize: 4,
                merchantId: this.marchantId
            };
            app.globalData.request.auctionRequest('/auction/list', params).then((res) => {
                if (res.data.code == 200) {
                    const result = res.data.data;
                    result.forEach((item) => {
                        item.startTime = new Date(item.startTime.replace(/-/g, '/')).getTime() - new Date().getTime();
                        item.endTime1 = new Date(item.endTime.replace(/-/g, '/')).getTime() - new Date().getTime();
                    });
                    this.setData({
                        auctionList: result
                    });
                }
            });
        },

        // 活动
        getCategoryGoodsList() {
            var data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/queryPromotionList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        saleGoodsList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        goBuy() {
            console.log('占位：函数 goBuy 未声明');
        }
    }
};
</script>
<style>
/* pages/shopHome/activity/activity.wxss */
/* 活动 */
.activity-container {
    width: 100%;
    min-height: 100vh;
    padding: 20rpx 20rpx 120rpx;
    box-sizing: border-box;
    background-color: #ffff;
}

.activity-container-type {
    width: 100%;
}
.activity-container-top {
    width: 100%;
    height: 56rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;
    position: relative;
}
.subscribe-box {
    width: fit-content;
    height: 44rpx;
    background: #07c160;
    border-radius: 20rpx 0rpx 20rpx 0rpx;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8rpx;
    box-sizing: border-box;
}
.activity-container-top-right {
    font-weight: 400;
    font-size: 20rpx;
    position: absolute;
    right: 10rpx;
    top: 50%;
    transform: translateY(-50%);
}
.activity-container-goods-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20rpx;
}
.activity-container-item {
    width: 340rpx;
    border-radius: 20rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 20rpx;
}
.activity-container-item-content {
    width: 100%;
    padding: 4rpx 10rpx 22rpx;
    box-sizing: border-box;
}
.paimai-time {
    width: 100%;
    height: 48rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.activity-container-item-name {
    width: 100%;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #000000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.activity-container-item-explain {
    width: 100%;
    max-height: 56px;
    margin: 4rpx 0 8rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.activity-container-bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.activity-container-price {
    flex: 1;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ff0000;
}
.activity-container-btn {
    width: 80rpx;
    height: 40rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
/* 促销 */
.sale-container-goods-box {
    width: 100%;
}
.sale-container-item {
    width: 100%;
    height: 240rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx #f8f8f8;
    border-radius: 20rpx;
    margin-top: 16rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
}
.sale-container-item-content {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.sale-container-top {
    width: 100%;
    overflow: hidden;
}
.sale-container-item-name {
    width: 450rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #000000;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 12rpx;
}
.sale-container-item-explain {
    height: 56rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.sale-container-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.sale-container-price {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ff0000;
}
.sale-container-btn {
    width: 80rpx;
    height: 40rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 8rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
