<template>
    <!-- pages/shopHome/column/column.wxml -->
    <view class="goods-list">
        <view class="me-fx-col list-container2">
            <view class="me-fx-row goods2" @tap="goshop" :data-id="item.commodityId" :data-name="item.commodityName" v-for="(item, index) in recommends" :key="index">
                <image :src="item.thumbnail" class="goods2-img"></image>

                <view class="goods2-info me-fx-1 me-fx-col me-fx-sb">
                    <view>
                        <view class="describe-text">{{ item.commodityName }}</view>
                        <view class="describe-desc">{{ item.description }}</view>
                    </view>
                    <view class="me-fx-row me-fx-start-c me-fx-sb">
                        <view class="price-box">
                            ￥
                            <text class="price-num">{{ item.lowPrice }}</text>
                        </view>
                        <view class="btn_cart11 me-fx-row me-fx-start-c">
                            <image class="cart-img2" src="/static/pages/static/cart11.png"></image>
                            <text>{{ btnTitle }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- <view class="share-box me-fx-col me-fx-c-c"  bindtap="{{detailData.subscribe?'':'showDingYue'}}">
        <image src="{{detailData.subscribe?'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/shop-dingyue-not.png':'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/shop-dingyue-Ok.png'}}" class="goods-share-icon" />
        <text>{{detailData.subscribe?'已通知':'商品变更通知'}}</text>
    </view> -->
    </view>
</template>

<script>
// pages/shopHome/column/column.js
const app = getApp();
export default {
    data() {
        return {
            classId: '',
            marchantId: '',
            recommends: [],
            pageNum: 1,

            // 当前页
            pageSize: 10,

            // 每页大小
            stopReq: false,

            //阻止请求分页数据状态
            //主推业务 1物流 2同城 3预订
            mainOrderType: '',

            btnTitle: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (options.title) {
            uni.setNavigationBarTitle({
                title: options.title
            });
        }

        this.setBtnTitle(options.mainOrderType);
        this.setData(
            {
                classId: options.id,
                marchantId: options.marchantId,
                mainOrderType: options.mainOrderType || ''
            },
            () => {
                if (this.classId) {
                    this.getClassShop();
                } else {
                    this.queryRecommendList();
                }
            }
        );
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
        this.openRefresh = true;
        this.setData(
            {
                pageNum: 1,
                stopReq: false
            },
            () => {
                if (this.classId) {
                    this.getClassShop();
                } else {
                    this.queryRecommendList();
                }
            }
        );
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.stopReq) {
            this.setData(
                {
                    pageNum: ++this.pageNum
                },
                () => {
                    if (this.classId) {
                        this.getClassShop();
                    } else {
                        this.queryRecommendList();
                    }
                }
            );
        }
    },
    methods: {
        goshop(e) {
            const { name, id } = e.currentTarget.dataset;
            var mainOrderType = this.mainOrderType;
            var url = '/pages/Index/GoodsDetails/GoodsDetails?id=' + id;

            if (mainOrderType == 2 || mainOrderType == 3) {
                if (mainOrderType == 2) {
                    url += `&city=1`;
                } //同城

                if (mainOrderType == 3) {
                    url += `&reserve=1`;
                } //预订
            }

            uni.navigateTo({
                url
            });
        },

        setBtnTitle(mainOrderType) {
            //设置按钮文本
            var btnTitle = '';

            switch (Number(mainOrderType)) {
                case 1:
                    btnTitle = '全国发货';
                    break;

                case 2:
                    btnTitle = '同城配送';
                    break;

                case 3:
                    btnTitle = '门店团购';
                    break;
            }

            this.setData({
                btnTitle
            });
        },

        // 商家推荐商品
        queryRecommendList() {
            var data = {
                marchantId: this.marchantId,
                pageSize: this.pageSize,
                pageCurr: this.pageNum
            };
            var mainOrderType = this.mainOrderType;

            if (mainOrderType) {
                data.orderTemplate = mainOrderType;
            }

            app.globalData.sjrequest('/commodity/queryCommodityList', data).then((res) => {
                if (res.data.code == 200) {
                    if (this.openRefresh) {
                        uni.stopPullDownRefresh();
                        this.openRefresh = null;
                    }

                    var result = res.data.data || [];
                    var recommends = this.recommends;
                    var stopReq = result.length !== this.pageSize;

                    if (this.pageNum == 1) {
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

        getClassShop() {
            let data = {
                marchantId: this.marchantId,
                classifyId: this.classId,
                pageCurr: this.pageNum,
                pageSize: this.pageSize
            };
            app.globalData.sjrequest('/commodity/queryCommodityList', data).then((res) => {
                if (this.openRefresh) {
                    uni.stopPullDownRefresh();
                    this.openRefresh = null;
                }

                if (res.data.code == 200) {
                    let result = res.data.data;
                    var recommends = this.recommends;
                    var stopReq = result.length !== this.pageSize;

                    if (this.pageNum == 1) {
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

        showDingYue() {
            var that = this;
            let appid = uni.getStorageSync('appid');
            let data = {
                authorizerAppid: appid,
                sceneTypes: [5, 6]
            };
            app.globalData.mb2request('/subTemplate/listPriTemplateId', data).then((res) => {
                let tempData = res.data.data;
                uni.requestSubscribeMessage({
                    tmplIds: tempData,
                    success: function (res) {
                        uni.getSetting({
                            withSubscriptions: true,

                            success(res) {
                                let data3s = {
                                    status: 1,
                                    marchantId: that.marchantId,
                                    templateIds: tempData,
                                    appId: appid
                                };
                                var isSettingFlag = false;

                                if (res.subscriptionsSetting.itemSettings) {
                                    for (let key in res.subscriptionsSetting.itemSettings) {
                                        if (tempData.indexOf(key) > -1) {
                                            isSettingFlag = true;
                                            break;
                                        }
                                    }
                                }

                                if (isSettingFlag) {
                                    data3s.status = 2;
                                }

                                app.globalData.sjrequest('/basic/addsubscription', data3s).then((res) => {
                                    uni.showToast({
                                        title: '订阅消息成功'
                                    });
                                });
                            }
                        });
                    },

                    fail(e) {
                        console.log(e);
                        uni.showToast({
                            title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
                            icon: 'none'
                        });
                    }
                });
            });
        },

        /**
         * 用户点击右上角分享
         */
        getDingYue() {}
    }
};
</script>
<style>
@import '../../../styles/me_common.css';

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
    min-height: 100vh;
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
    padding-top: 20rpx;
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
.share-box {
    position: fixed;
    right: 20rpx;
    bottom: 50rpx;
    background: #fff;
    padding: 0rpx 6rpx;
    border-radius: 20rpx;
}
.share-box > image {
    width: 40rpx;
    height: 40rpx;
    flex-shrink: 0;
    padding-top: 10rpx;
}
.share-box > text {
    font-size: 26rpx;
    font-weight: bold;
}
</style>
