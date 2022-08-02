<template>
    <!-- pages/Order/Order.wxml -->
    <!-- <web-view src="https://xssj.letterbook.cn/?active={{active}}#/orderList"></web-view> -->
    <view class="order">
        <view class="tabs">
            <van-tabs :active="tabsitem" @change="onChange" sticky color="#EB5E32" line-width="22">
                <view :src="item" v-for="(item, index) in tabsList" :key="index">
                    <van-tab :title="item.name">
                        <view class="order-list-container">
                            <!-- 商品列表 -->
                            <view class="order-content" :data-uniqueid="item.uniqueId" v-if="item.orderCommodity.length != 0" v-for="(item, index1) in orderList" :key="index1">
                                <!-- 店铺名称、商品状态 -->

                                <view class="order-title">
                                    <view class="store-content">
                                        <image :src="item.logoPic" class="store_icon" style="border-radius: 50%" />
                                        <view class="store-name-content">
                                            <view class="store-name">{{ item.nickName }}</view>
                                            <!-- <image src="../../img/jinru.png" class="jinru" /> -->
                                        </view>
                                    </view>
                                    <view class="order-status">
                                        <van-count-down
                                            v-if="tabsitem == 0"
                                            :time="item.endTime"
                                            format="待支付 mm:ss"
                                            @finish="countDownOver($event, { uniqueid: item.uniqueId, marchantId: item.marchantId })"
                                            :data-uniqueid="item.uniqueId"
                                            :data-marchantId="item.marchantId"
                                        />
                                        <view v-if="tabsitem == 1">待接单</view>
                                        <view v-if="tabsitem == 2">待收货</view>
                                        <view v-if="tabsitem == 3">已完成</view>
                                        <view v-if="tabsitem == 4">已退款</view>
                                    </view>
                                </view>

                                <!-- 商品主体 商品图片 名称 价格 数量 -->

                                <view class="order-id">
                                    订单号:{{ item.orderNumber }}
                                    <image @tap="copyOrder" class="copy_img" src="/static/pages/static/copy.png" :data-order="item.orderNumber"></image>
                                </view>

                                <view class="goods-content" v-for="(items, key) in item.orderCommodity" :key="items.key">
                                    <van-image :src="items.thumbnail" width="77px" height="77px" fit="cover" radius="10rpx;"></van-image>

                                    <view class="goods-item">
                                        <view class="goods-name">{{ items.commodityName }}</view>
                                        <view class="spec-content">
                                            <view class="spec-container">规格：{{ items.tempSpecName }}</view>
                                        </view>
                                        <view class="goods_price_content">
                                            <view class="goods_price">￥{{ items.paymentMoney }}</view>
                                            <!-- <view class="comment-btn" catchtap="comment" wx:if="{{tabsList[tabsitem].name==='已完成'&&items.singleEvaluate===0}}" data-orderIdx="{{index}}" data-goodsIdx="{{key}}">评价几句</view> -->
                                        </view>
                                    </view>
                                </view>

                                <!-- 商品总价格、总数量 -->

                                <view class="goods-total">
                                    <view class="total-span">
                                        <view class="sale_money" v-if="item.paymentMoney != item.actualMoney">
                                            <text>总价：￥{{ item.paymentMoney }}，</text>
                                            <text>优惠价：￥{{ item.paymentMoney - item.actualMoney }}</text>
                                        </view>
                                        <text>实付款：￥{{ item.actualMoney }}</text>
                                    </view>
                                </view>

                                <!-- 下单时间 人数 餐桌号 -->

                                <view class="goods-time-box">
                                    <view class="item-box flex-style">
                                        <view style="display: flex">
                                            <view>下单时间：</view>
                                            <view>{{ item.orderTime }}</view>
                                        </view>
                                        <view v-if="item.autoVerification" class="is-auto">自动结算</view>
                                    </view>
                                    <view class="item-box">
                                        <view>收货地址：</view>
                                        <view>
                                            {{ item.shippingAddress.provincesName }}{{ item.shippingAddress.provincesName }}{{ item.shippingAddress.areaName
                                            }}{{ item.shippingAddress.address }}
                                        </view>
                                    </view>
                                    <view class="item-box" v-if="item.expressCompany">
                                        <view>快递公司：</view>
                                        <view>{{ item.expressCompany }}</view>
                                    </view>
                                    <view class="item-box" v-if="item.expressNo">
                                        <view>快递单号：</view>
                                        <view>{{ item.expressNo }}</view>
                                    </view>
                                    <view class="item-box" v-if="item.refundReason">
                                        <view>拒绝原因：</view>
                                        <view>{{ item.refundReason }}</view>
                                    </view>
                                    <view class="item-box">
                                        <view style="white-space: nowrap">留言：</view>
                                        <view>{{ item.message ? item.message : '你没有任何留言~' }}</view>
                                    </view>
                                </view>

                                <!-- 底部订单操作按钮 -->

                                <view class="order-footer">
                                    <view class="btn-content-box">
                                        <navigator
                                            class="do-btn cancel-btn other_btn"
                                            :url="'/pages/order/contact/contact?logoPic=' + item.logoPic + '&marchantId=' + item.marchantId + '&marchantName=' + item.nickName"
                                        >
                                            联系卖家
                                        </navigator>
                                        <view
                                            class="do-btn cancel-btn other_btn"
                                            v-if="tabsList[tabsitem].name === '待付款'"
                                            @tap.stop.prevent="updateCityOrder"
                                            :data-uniqueId="item.uniqueId"
                                            data-id="3"
                                            :data-marchantId="item.marchantId"
                                        >
                                            取消订单
                                        </view>
                                        <view class="do-btn submit-btn" v-if="tabsList[tabsitem].name === '待付款'" @tap.stop.prevent="payOrder" :data-item="item">支付订单</view>
                                        <view class="do-btn cancel-btn other_btn" v-if="tabsitem == 1" @tap.stop.prevent="refundApply" :data-uniqueId="item.uniqueId">
                                            申请退款
                                        </view>
                                        <view
                                            class="do-btn submit-btn"
                                            v-if="tabsList[tabsitem].name === '待收货'"
                                            @tap.stop.prevent="updateCityOrder"
                                            :data-uniqueId="item.uniqueId"
                                            data-id="4"
                                            :data-marchantId="item.marchantId"
                                        >
                                            确认收货
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <to-bottom v-if="toBottom" />
                    </van-tab>
                </view>
            </van-tabs>
        </view>
    </view>
</template>

<script>
// import vanTab from './@vant/weapp/tab/index';
// import vanTabs from './@vant/weapp/tabs/index';
// import vanImage from './@vant/weapp/image/index';
import toBottom from '../../Component/toBottom/index';
// import vanPopup from './@vant/weapp/popup/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// pages/Order/Order.js
const time = require('../../../utils/util');

const app = getApp();
export default {
    components: {
        // vanTab,
        // vanTabs,
        // vanImage,
        toBottom,
        // vanPopup,
        // vanCountDown
    },
    data() {
        return {
            // active: 0
            pageCurr: 1,

            pageSize: 10,
            toBottom: false,
            isSubmit: false,
            tabsList: [],

            tabList: [
                {
                    name: '待付款'
                },
                {
                    name: '待接单'
                },
                {
                    name: '待收货'
                },
                {
                    name: '已完成'
                },
                {
                    name: '已退款'
                }
            ],

            tabsitem: 0,
            marchantId: 0,
            orderList: [],
            name: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.tabsitem) {
            this.setData({
                tabsitem: parseInt(options.tabsitem)
            });
        }

        if (options.marchantId) {
            this.setData({
                marchantId: parseInt(options.marchantId)
            });
        }

        this.setData({
            // 防止触发onChange事件
            tabsList: this.tabList
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getParam();
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
    onReachBottom: function () {
        if (this.toBottom == false) {
            this.getOrderList();
        }
    },
    methods: {
        // 获取页面参数
        getParam() {
            this.clearData();
            this.getOrderList();
        },

        //切换订单状态
        onChange(e) {
            this.clearData();
            var index = e.detail.index;
            this.setData({
                tabsitem: index
            });
            this.clearData();
            this.getOrderList();
        },

        //清空数据
        clearData() {
            this.setData({
                pageCurr: 1,
                orderList: [],
                toBottom: false
            });
        },

        // 配送订单操作
        updateCityOrder(e) {
            var that = this;
            var ev = e.currentTarget.dataset;
            let data = {
                uniqueId: ev.uniqueid,
                orderState: ev.id,
                marchantId: ev.marchantid,
                orderType: 2
            };
            var text;
            var notice;
            switch (parseInt(ev.id)) {
                case 3:
                    text = '确认取消订单吗？';
                    notice = '取消成功';
                    break;

                case 4:
                    text = '确认收货吗？';
                    notice = '已确认收货';
                    break;
            }

            if (ev.id != 2) {
                uni.showModal({
                    title: '提示',
                    content: text,
                    success: function (sm) {
                        if (sm.confirm) {
                            // 用户点击了确定 可以调用删除方法了
                            app.globalData.sjrequest('/order/updateCityOrder', data).then((res) => {
                                if (res.data.code == 200) {
                                    uni.showToast({
                                        title: notice,
                                        duration: 1000
                                    });
                                    setTimeout((res) => {
                                        that.clearData();
                                        that.getOrderList();
                                    }, 1000);
                                }
                            });
                        } else if (sm.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            }
        },

        // 申请退款
        refundApply(e) {
            var that = this;
            var ev = e.currentTarget.dataset;
            let data = {
                uniqueId: ev.uniqueid,
                applet: 2,
                payPlatform: 'JSAPI'
            };
            uni.showModal({
                title: '提示',
                content: '确认申请退款吗？',
                success: function (sm) {
                    if (sm.confirm) {
                        // 用户点击了确定 可以调用删除方法了
                        app.globalData.sjrequest('/order/operateCityRefund', data).then((res) => {
                            if (res.data.code == 200) {
                                uni.showToast({
                                    title: '退款成功',
                                    duration: 2000
                                });
                                setTimeout((res) => {
                                    that.setData({
                                        tabsitem: 4
                                    });
                                    that.clearData();
                                    that.getOrderList();
                                }, 2000);
                            }
                        });
                    } else if (sm.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },

        //倒计时结束
        countDownOver(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let that = this;
            console.log(e.currentTarget.dataset);
            let data = {
                uniqueId: e.currentTarget.dataset.uniqueid,
                orderState: 3,
                marchantId: e.currentTarget.dataset.marchantid
            };
            app.globalData.sjrequest('/order/updateCityOrder', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '已自动为您取消订单',
                        icon: 'none',
                        duration: 2000,
                        success: function () {
                            that.setData({
                                tabsitem: 4
                            });
                            that.getParam();
                        }
                    });
                }
            });
        },

        // 支付订单
        payOrder(e) {
            if (!this.isSubmit) {
                // 防止多次点击
                this.setData({
                    isSubmit: true
                });
                var item = e.currentTarget.dataset.item;
                var that = this;
                console.log(item);
                let merchantId = uni.getStorageSync('merchantId');
                let appid = uni.getStorageSync('appid');
                let data = {
                    marchantId: merchantId,
                    appid: appid,
                    uniqueId: item.uniqueId,
                    paymentWay: 2,
                    actualMoney: item.actualMoney,
                    orderNumber: item.orderNumber,
                    body: item.nickName,
                    payPlatform: 'JSAPI',
                    orderType: 2
                };
                app.globalData.sjrequest('/order/paymentOrder', data).then((res) => {
                    if (res.data.code == 200) {
                        uni.requestPayment({
                            appId: res.data.data.appId,
                            nonceStr: res.data.data.nonceStr,
                            // 支付签名随机串，不长于 32 位
                            package: res.data.data.package,
                            // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType: res.data.data.signType,
                            // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            timeStamp: res.data.data.timeStamp,
                            // 支付签名时间戳，
                            paySign: res.data.data.paySign,
                            // 支付签名
                            success: function (res) {
                                that.clearData();
                                that.getOrderList();
                                that.setData({
                                    isSubmit: false
                                });
                            },
                            fail: function (res) {
                                uni.showToast({
                                    title: '支付失败',
                                    icon: 'none'
                                });
                                that.setData({
                                    isSubmit: false
                                });
                            }
                        });
                    }
                });
            }
        },

        // 评论
        comment(e) {
            let orderIdx = e.currentTarget.dataset.orderidx;
            let goodsIdx = e.currentTarget.dataset.goodsidx;
            let goodsData = this.orderList[orderIdx].orderCommodity[goodsIdx];
            let orderList = this.orderList[orderIdx];
            app.globalData.marchantId = orderList.marchantId;
            //商家id
            app.globalData.commodityId = goodsData.commodityId; //商品id
            app.globalData.commodityLogo = goodsData.thumbnail; //商品图片

            app.globalData.commodityName = goodsData.commodityName; //商品名称

            app.globalData.orderUniqueId = goodsData.uniqueId; //订单uid

            uni.navigateTo({
                url: '/pages/order/postGoodsComment/postGoodsComment'
            });
        },

        getOrderList() {
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            let data = {
                pageCurr: this.pageCurr,
                pageSize: this.pageSize,
                orderType: 2
            };

            if (this.marchantId) {
                data.marchantId = this.marchantId;
            }

            if (this.tabsitem == 0) {
                data.orderState = 0;
            } else if (this.tabsitem == 1) {
                data.orderState = 7;
            } else if (this.tabsitem == 2) {
                data.orderState = 2;
            } else if (this.tabsitem == 3) {
                data.orderState = 4;
            } else if (this.tabsitem == 4) {
                data.orderState = 3;
            }

            app.globalData.sjrequest('/order/queryWintookOrder', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    var timestamp = Date.parse(new Date());

                    if (res.data.data.length < this.pageSize) {
                        this.setData({
                            toBottom: true
                        });
                    }

                    res.data.data.forEach((item) => {
                        item.orderTime = time.formatTimeSec(item.orderTime, 'Y-M-D h:m:s');
                        item.endTime = item.endTime * 1000 - timestamp;

                        if (item.shippingAddress) {
                            item.shippingAddress = JSON.parse(item.shippingAddress);
                        }
                    });
                    this.setData({
                        orderList: res.data.data.concat(this.orderList),
                        pageCurr: this.pageCurr + 1
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        copyOrder(e) {
            var order = e.currentTarget.dataset.order;
            uni.setClipboardData({
                data: order,

                success(res) {
                    uni.showToast({
                        title: '复制成功'
                    });
                }
            });
        }
        /**
         * 用户点击右上角分享
         */
    }
};
</script>
<style>
/* pages/Order/Order.wxss */
.order {
    min-height: 100vh;
    background: #f9f9f9;
}
.order .tabs .order-list-container {
    /* padding: 0 20rpx;
  box-sizing: border-box; */
}
.order .tabs .order-list-container .order-content {
    width: 100%;
    background: rgba(229, 228, 229, 0.1);
    box-shadow: 0rpx 6rpx 10rpx rgba(66, 41, 41, 0.1);
    /* border-radius: 20rpx; */
    margin-top: 20rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #fff;
}
.order .tabs .order-list-container .order-content .order-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #ececec;
}
.order-id {
    padding: 20rpx 0;
    box-sizing: border-box;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.order .tabs .order-list-container .order-content .order-title .order-status {
    height: 40rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #eb5e32;
    opacity: 1;
}
.order .tabs .order-list-container .order-content .store-content {
    display: flex;
    height: 80rpx;
    align-items: center;
}
.order .tabs .order-list-container .order-content .store-content .store_icon {
    width: 34.16rpx;
    height: 32.44rpx;
}
.order .tabs .order-list-container .order-content .store-content .store-name-content {
    display: flex;
    align-items: center;
}
.order .tabs .order-list-container .order-content .store-content .store-name-content .store-name {
    height: 40rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 42rpx;
    color: #333;
    opacity: 1;
    margin-left: 10rpx;
    max-width: 400rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
}
.order .tabs .order-list-container .order-content .store-content .store-name-content .jinru {
    width: 10rpx;
    height: 20rpx;
    margin-left: 14rpx;
}
.order .tabs .order-list-container .order-content .goods-content {
    width: 100%;
    display: flex;
}
.order .tabs .order-list-container .order-content .goods-content /deep/ .van-image .van-image__img {
    border-radius: 10rpx;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item {
    width: 0;
    flex: 1;
    height: 154rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20rpx;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .goods-name {
    width: 100%;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333;
    line-height: 38rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: break-word;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .spec-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: space-between;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .spec-content .spec-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999;
    opacity: 1;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .spec-content .refund {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f74c54;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .goods_price_content {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .goods_price_content .goods_price {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ec1919;
}
.comment-btn {
    width: 120rpx;
    height: 40rpx;
    border: 1rpx solid #cccccc;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .goods_price_content .goods_num {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999;
}
.order .tabs .order-list-container .order-content .goods-total {
    width: 100%;
    text-align: right;
    /* padding: 0 42rpx; */
    /* box-sizing: border-box; */
    border-bottom: 1rpx solid #cecece;
    padding-bottom: 20rpx;
}
.order .tabs .order-list-container .order-content .goods-total .total-span {
    height: 24rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    display: flex;
    justify-content: flex-end;
}
.order .tabs .order-list-container .order-content .goods-time-box {
    width: 100%;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-between; */
}
.order .tabs .order-list-container .order-content .goods-time-box .item-box {
    display: flex;
    align-items: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333;
    line-height: 24rpx;
    padding: 15rpx 0;
}
.flex-style {
    justify-content: space-between;
}
.is-auto {
    width: 116rpx;
    height: 34rpx;
    background: #efefef;
    border-radius: 17rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.order .tabs .order-list-container .order-content .order-footer {
    margin-top: 20rpx;
}
.order .tabs .order-list-container .order-content .order-footer .btn-content-box {
    width: 100%;
    text-align: right;
    padding-right: 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 20rpx;
}
.order .tabs .order-list-container .order-content .order-footer .do-btn {
    width: 170rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    border-radius: 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
}
.order .tabs .order-list-container .order-content .order-footer .cancel-btn {
    color: #999;
    border: 1rpx solid #cccccc;
    opacity: 1;
}
.order .tabs .order-list-container .order-content .order-footer .other_btn {
    margin-right: 18rpx;
}
.order .tabs .order-list-container .order-content .order-footer .submit-btn {
    border: 1rpx solid #ed5757;
    color: #ed5757;
}
.QR-top {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    background: #f9f9f9;
    border-radius: 8px 8px 0px 0px;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
}
.click-number {
    text-align: center;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #bbbbbb;
}
.clicked-number {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #333333;
    letter-spacing: 20rpx;
    text-align: center;
}
.van-count-down {
    color: #eb5e32 !important;
}
.copy_img {
    width: 40rpx;
    height: 40rpx;
}
.sale_money {
    padding-right: 10rpx;
    color: #999999;
}
</style>
