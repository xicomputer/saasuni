<template>
    <!-- pages/shopHome/CityList/CityList.wxml -->
    <view class="CityList">
        <view class="top-container">
            <view class="goods-scroll">
                <view class="me-fx-col list-container2">
                    <view class="me-fx-row goods2" :data-id="item.commodityId" @tap="toDetails" v-for="(item, index) in recommends" :key="index">
                        <image :src="item.thumbnail" class="goods2-img"></image>

                        <view class="goods2-info me-fx-1 me-fx-col me-fx-sb">
                            <view>
                                <view class="describe-text">{{ item.commodityName }}</view>
                                <view class="describe-desc">{{ item.description }}</view>
                            </view>
                            <view class="me-fx-row me-fx-start-c me-fx-sb">
                                <view class="price-box">
                                    ￥
                                    <text class="price-num">{{ item.originalPrice }}</text>
                                </view>
                                <view class="btn_cart11 me-fx-row me-fx-start-c">
                                    <image class="cart-img2" src="/static/pages/static/cart11.png"></image>
                                    <text>{{ listType == '3' ? '门店团购' : listType == '2' ? '同城配送' : '全国发货' }}</text>
                                </view>
                                <!-- <view class="btn_cart11 me-fx-row me-fx-c-c" wx:else>
                            <text>参考价</text>
                        </view> -->
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/shopHome/CityList/CityList.js
const app = getApp();
export default {
    data() {
        return {
            listType: '',
            //1.物流 2.同城 3.预订
            marchantId: '',
            recommends: [],
            pageCurr: 1,
            pageSize: 10,
            orderTemplate: '',
            orderSwitch: null,
            stopReq: false //阻止请求状态
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let orderSwitch = uni.getStorageSync('orderSwitch');
        this.setData({
            listType: options.listType,
            marchantId: options.marchantId,
            orderSwitch: orderSwitch
        });

        if (options.listType == 3) {
            this.setData({
                orderTemplate: '3'
            });
            uni.setNavigationBarTitle({
                title: '本店可(预订商品)'
            });
        }

        if (options.listType == 2) {
            this.setData({
                orderTemplate: '2'
            });
            uni.setNavigationBarTitle({
                title: '本店可(同城配送商品)'
            });
        }

        if (options.listType == 1) {
            this.setData({
                orderTemplate: '1'
            });
            uni.setNavigationBarTitle({
                title: '本店可(物流商品)'
            });
        }

        this.queryRecommendList();
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
    /* 分享朋友 */
    onShareAppMessage() {},
    /* 分享朋友圈 */
    onShareTimeline() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData(
            {
                pageCurr: 1,
                stopReq: false
            },
            () => {
                this.queryRecommendList();
            }
        );
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.stopReq) {
            var pageCurr = this.pageCurr;
            pageCurr++;
            this.setData(
                {
                    pageCurr
                },
                () => {
                    this.queryRecommendList();
                }
            );
        }
    },
    methods: {
        queryRecommendList() {
            var data = {
                marchantId: this.marchantId,
                pageSize: this.pageSize,
                pageCurr: this.pageCurr,
                orderTemplate: this.orderTemplate
            };
            app.globalData.sjrequest('/commodity/queryCommodityList', data).then((res) => {
                uni.stopPullDownRefresh();

                if (res.data.code == 200) {
                    var result = res.data.data;
                    var stopReq = result.length !== this.pageSize;
                    var recommends = this.recommends;

                    if (this.pageCurr == 1) {
                        recommends = result;
                    } else {
                        recommends.push(...result);
                    }

                    this.setData({
                        recommends,
                        stopReq
                    });
                }
            });
        },

        toDetails(e) {
            var id = e.currentTarget.dataset.id;
            var listType = this.listType;
            let type = '';

            if (listType == 3) {
                type = '&reserve=1';
            }

            if (listType == 2) {
                type = '&city=1';
            }

            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + id + type
            });
        }
    }
};
</script>
<style>
@import '../../../styles/me_common.css';

page {
    background-color: #f8f8f8;
}
.top-container {
    padding: 0 30rpx;
    box-sizing: border-box;
}
.top-container .top-search-container {
    height: 80rpx;
}
.top-container .top-search {
    padding: 0 18rpx;
    box-sizing: border-box;
    background-color: #f7f7f7;
    width: 532rpx;
    height: 52rpx;
    font-size: 22rpx;
    color: #a0a0a0;
    border-radius: 26rpx;
}
.top-search .search-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 15rpx;
}
.top-container .notice-btn {
    padding: 0 15rpx;
    margin: 0;
    background-color: #fe4f4f;
    font-size: 24rpx;
    border-radius: 26rpx;
    color: #fff;
    line-height: 52rpx;
    height: 52rpx;
}

.top-container .top-tab-list {
    font-size: 28rpx;
    color: #333;
    height: 80rpx;
}
.top-container .top-tab-item {
    flex: 1;
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
}
.top-container .sel-tab-item {
    font-size: 32rpx;
    color: #fe4f4f;
}

/* 商品列表 */
.goods-list {
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #f7f7f7;
}
.goods-list .goods-scroll {
    height: calc(100vh - 100rpx);
}
.goods-list .list-container {
    flex-wrap: wrap;
    padding: 30rpx 0;
}
.goods-item {
    border-radius: 20rpx;
    overflow: hidden;
    width: 336rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    flex-shrink: 0;
}
.goods-item .goods-img {
    width: 336rpx;
    height: 336rpx;
    background-color: #ccc;
}
.goods-item .goods-info {
    padding: 12rpx;
    box-sizing: border-box;
    font-size: 28rpx;
}
.describe-text {
    font-size: 32rpx;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.describe-desc {
    font-size: 28rpx;
    color: #999999;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
}
.price-box {
    font-size: 28rpx;
    color: #fe4f4f;
    font-weight: bold;
}
.price-num {
    font-size: 36rpx;
}
.cart-img {
    width: 84rpx;
    height: 84rpx;
}
.cart-img2 {
    width: 30rpx;
    height: 30rpx;
    margin-right: 5rpx;
}
.btn_cart11 {
    background-color: #fe4f4f;
    width: 150rpx;
    border-radius: 10rpx;
    padding: 5rpx 5rpx;
}
.btn_cart11 > text {
    color: #fff;
    font-size: 26rpx;
}

.goods2-info {
    padding: 20rpx;
}
.list-container2 {
    margin-top: 20rpx;
}
.goods2 {
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
}
.goods2-img {
    width: 240rpx;
    height: 240rpx;
    border-radius: 20rpx;
}
</style>
