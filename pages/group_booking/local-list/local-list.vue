<template>
    <view>
        <!-- pages/group_booking/local-list/local-list.wxml -->

        <view>
            <view class="top-tab">
                <scroll-view :scroll-x="true" class="top-tab-list-scroll">
                    <view class="me-fx-row tab-list-box">
                        <view
                            :class="'me-fx-col me-fx-sb-c tab-item ' + (item.status == currentStatus ? 'sel-item' : '')"
                            @tap="switchStatus"
                            :data-status="item.status"
                            v-for="(item, index) in topTabList"
                            :key="index"
                        >
                            <text class="me-fx-1 tab-item-name">{{ item.name }}</text>

                            <view class="unline-box"></view>

                            <text v-if="item.count" class="count-num">{{ item.count }}</text>
                        </view>
                    </view>
                </scroll-view>
            </view>

            <view class="order-list" v-if="dataList.length">
                <view class="order-item" :data-item="item" v-for="(item, index) in dataList" :key="index">
                    <view class="me-fx-row me-fx-sb-c">
                        <text>订单号:{{ item.orderNumber }}</text>
                        <text class="status-text">{{ item.orderStateText }}</text>
                    </view>

                    <view class="me-fx-row goods-info">
                        <image :src="item.bannerImgUrls[0]" class="goods-img"></image>
                        <view class="me-fx-1 me-fx-col me-fx-sb">
                            <view>
                                <view class="me-full-text goods-name">{{ item.commodityName }}</view>
                                <text class="specification">规格:{{ item.skuName }}</text>
                            </view>
                            <view class="me-fx-row me-fx-sb-c">
                                <text>￥{{ item.price }}</text>
                                <text>x{{ item.amount }}</text>
                            </view>
                        </view>
                    </view>

                    <view class="me-fx-row me-fx-end payment-amount">
                        <text>实付：￥{{ item.actualMoney }}</text>
                    </view>

                    <view class="order-show-info">
                        <view>下单时间：{{ item.orderTime }}</view>
                        <view>联系人：{{ item.shippingInfo.contacts }} {{ item.shippingInfo.contactsWay }}</view>
                        <view>收货地址：{{ item.userAddress }}</view>
                        <view>留言：{{ item.message || '没有留言' }}</view>
                    </view>

                    <view class="me-fx-row me-fx-end-c item-footer">
                        <van-count-down
                            :time="item.downTimes"
                            :use-slot="true"
                            :auto-start="true"
                            @finish="finishFun($event, { index })"
                            @change="changeFun($event, { index })"
                            :data-index="index"
                            v-if="item.orderState === 0 && item.isDelete != 1"
                        >
                            <view class="me-fx-row me-fx-start-c down-content" v-if="item.downTimes > 0">
                                <image src="/static/pages/img/shizhong.png" class="shi-zhong-icon"></image>
                                <text>支付剩余：{{ item.downTimeObj.minutes }}分{{ item.downTimeObj.seconds }}秒</text>
                            </view>
                            <view v-else class="down-content">待付款订单已过期</view>
                        </van-count-down>

                        <button
                            class="btn blue-btn"
                            v-if="item.orderState == 1 || item.orderState == 2 || item.orderState == 4"
                            :data-item="item"
                            @tap.stop.prevent="contactMerchant"
                        >
                            联系商家
                        </button>

                        <button class="btn blue-btn" v-if="item.isDelete == 1 || item.orderState == 3 || item.orderState == 0" :data-item="item" @tap.stop.prevent="delOrder">
                            删除订单
                        </button>
                        <!-- <button class='btn blue-btn' data-item='{{item}}' catchtap='openWhyList' wx:if='{{item.orderState==0 && item.isDelete!=1}}'>取消订单</button> -->

                        <!-- <button class='btn red-btn' data-item='{{item}}' catchtap='openWhyList' wx:if='{{(item.orderState==4 || item.orderState==1) && item.isEnd!=1 }}'>{{item.activityOrderRefundResponse?'查看售后':'申请退款'}}</button> -->

                        <button class="btn red-btn" v-if="item.orderState == 0 && item.isDelete != 1" :data-item="item" @tap.stop.prevent="goPay">去支付</button>
                        <!-- <button class='btn yellow-btn' wx:if='{{item.orderState==1}}' data-item='{{item}}' catchtap='remindDelivery'>提醒发货</button> -->
                        <button class="btn yellow-btn" v-if="item.orderState == 2" :data-item="item" @tap.stop.prevent="confirmDelivery">确认收货</button>
                        <!-- <button class='btn last-btn' wx:if='{{item.orderState==4}}' data-item='{{item}}'  catchtap='jumpEvaluate'>去评价</button> -->
                        <button class="btn yellow-btn" v-if="item.isDelete == 1 || item.orderState == 3" :data-item="item" @tap.stop.prevent="jumpGoodsDetail">再次拼单</button>
                    </view>
                </view>
            </view>
            <view v-else class="me-fx-col me-fx-c-c list-empty-box">
                <text>暂无数据</text>
            </view>
        </view>

        <!-- 取消订单原因弹窗 -->
        <van-popup :show="showCancelWhy" :round="true" @click-overlay="closePopup" :close-on-click-overlay="true" position="bottom" custom-style="border-radius:24rpx 24rpx 0 0;">
            <view class="cancel-why-content">
                <view class="me-fx-row me-fx-sb-c top-box">
                    <text class="cancel-btn" @tap="closePopup">取消</text>
                    <text class="title-text">{{ popupTitle }}</text>
                    <text class="confirm-btn" @tap="popupConfrimHandle">确认</text>
                </view>
                <view class="radio-list">
                    <view class="me-fx-row me-fx-start-c why-item" @tap="selectWhy" :data-whynum="item.whyNum" v-for="(item, index) in whyList" :key="index">
                        <view :class="'radio-box ' + (item.whyNum == whyNum ? 'checked-radio' : '')"></view>

                        <text>{{ item.content }}</text>
                    </view>
                    <textarea class="why-textarea" :value="reasonText" @input="textareaChange"></textarea>
                </view>
            </view>
        </van-popup>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// pages/group_booking/local-list/local-list.js
let app = getApp();
export default {
    components: {
        // vanPopup,
        // vanCountDown
    },
    data() {
        return {
            currentStatus: 0,

            topTabList: [
                {
                    status: 0,
                    name: '待付款',
                    count: 0
                },
                {
                    status: 1,
                    name: '待接单',
                    count: 0
                },
                {
                    status: 2,
                    name: '待收货',
                    count: 0
                },
                {
                    status: 4,
                    name: '已完成',
                    count: 0
                }
            ],

            showCancelWhy: false,

            //弹窗显示状态
            whyNum: 0,

            //取消原因序号
            popupTitle: '',

            //理由弹窗标题
            reasonText: '',

            //理由
            whyList: [
                {
                    content: '信息填写错误',
                    whyNum: 1
                },
                {
                    content: '不想买了',
                    whyNum: 2
                },
                {
                    content: '卖家问题',
                    whyNum: 3
                },
                {
                    content: '其他',
                    whyNum: -1,
                    msgText: ''
                }
            ],

            dataList: [],

            //列表数据
            storeData: {
                tabDataall: {
                    stopReq: false,
                    pageNum: 1,
                    list: []
                },
                tabData0: {
                    stopReq: false,
                    pageNum: 1,
                    list: []
                },
                tabData1: {
                    stopReq: false,
                    pageNum: 1,
                    list: []
                },
                tabData2: {
                    stopReq: false,
                    pageNum: 1,
                    list: []
                },
                tabData3: {
                    stopReq: false,
                    pageNum: 1,
                    list: []
                },
                tabData4: {
                    stopReq: false,
                    pageNum: 1,
                    list: []
                }
            },

            merchantId: '',

            //商家id
            operateOrder: {},

            //操作订单
            pageSize: 10,

            appId: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var status = options.status;

        if (status !== undefined) {
            this.setData({
                currentStatus: status
            });
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        uni.getStorage({
            key: 'appid',
            success: (res) => {
                this.setData({
                    appId: res.data
                });
            }
        });
        uni.getStorage({
            key: 'merchantId',
            success: (res) => {
                this.setData(
                    {
                        merchantId: res.data
                    },
                    () => {
                        this.getOrderList();
                        this.getCount();
                    }
                );
            }
        });
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
    onPullDownRefresh: function () {
        this.refreshData();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var state = this.currentStatus;
        var storeData = this.storeData;
        var nowTabData = storeData['tabData' + state];

        if (!nowTabData.stopReq) {
            nowTabData.pageNum++;
            this.setData(
                {
                    storeData
                },
                () => {
                    this.getOrderList();
                }
            );
        }
    },
    methods: {
        refreshData() {
            //刷新列表数据
            var state = this.currentStatus;
            var storeData = this.storeData;
            var nowTabData = storeData['tabData' + state];
            nowTabData.pageNum = 1;
            nowTabData.stopReq = false;
            this.setData(
                {
                    storeData
                },
                () => {
                    this.getOrderList();
                }
            );
        },

        jumpDetail(e) {
            //跳转订单详情
            var orderItem = e.currentTarget.dataset.item;
            var queryStr = `orderNum=${orderItem.orderNumber}&state=${orderItem.orderState}`;
            uni.navigateTo({
                url: '/pages/group_booking/order-detail/order-detail?' + queryStr,
                events: {
                    uploadOrderList: () => {
                        this.refreshData();
                        this.getCount();
                    }
                }
            });
        },

        jumpGoodsDetail(e) {
            //重新购买时 跳转活动商品详情
            var orderItem = e.currentTarget.dataset.item;
            uni.navigateTo({
                url: '/pages/group_booking/detail/detail?activityId=' + orderItem.activityId
            });
        },

        jumpEvaluate(e) {
            //跳转评价页面
            var orderItem = e.currentTarget.dataset.item;
            app.globalData.marchantId = orderItem.marchantId; //商家id

            app.globalData.commodityId = orderItem.commodityId; //商品id

            app.globalData.commodityLogo = orderItem.imageUrl; //商品图片

            app.globalData.commodityName = orderItem.commodityName; //商品名称

            app.globalData.orderUniqueId = orderItem.orderNumber; //订单uid

            uni.navigateTo({
                url: '/pages/order/postGoodsComment/postGoodsComment'
            });
        },

        closePopup() {
            //关闭弹窗
            this.setData({
                showCancelWhy: false
            });
        },

        openWhyList(e) {
            //打开取消订单原因列表选择弹窗
            var orderItem = e.currentTarget.dataset.item;
            var orderState = orderItem.orderState;

            if (orderItem.activityOrderRefundResponse) {
                //申请了退款
                uni.navigateTo({
                    url: '/pages/group_booking/refund-order/refund-order'
                });
            } else {
                var popupTitle = orderState === 0 ? '选择取消理由' : '选择退款理由';
                this.setData({
                    showCancelWhy: true,
                    popupTitle,
                    operateOrder: orderItem
                });
            }
        },

        popupConfrimHandle() {
            //确认取消订单
            var whyList = this.whyList;
            var whyNum = this.whyNum;
            var whyItem = whyList.find((item) => item.whyNum == whyNum) || {};
            var reasonText = whyNum == -1 ? this.reasonText : whyItem.content;

            if (!reasonText) {
                return uni.showToast({
                    title: '请选择原因',
                    icon: 'none'
                });
            }

            var operateOrder = this.operateOrder;
            var dataList = this.dataList;
            var index = dataList.findIndex((item) => item.orderNumber == operateOrder.orderNumber);
            var storeData = this.storeData;
            var status = operateOrder.orderState;
            var reqUrl = '';

            switch (status) {
                case 0:
                    reqUrl = '/activityOrderBusiness/cancelOrder';
                    break;
                //取消订单

                case 1:
                    reqUrl = '/activityOrderBusiness/beforeSendCommodityRefund';
                    break;
                //待发货退款

                case 4:
                    reqUrl = '/activityOrderBusiness/afterSendCommodityRefund';
                    break;
                //收货后退款
            }

            this.setData({
                showCancelWhy: false
            });
            app.globalData
                .sjrequest1(reqUrl, {
                    orderNumber: operateOrder.orderNumber,
                    refundReason: reasonText //原因
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '操作成功',
                            icon: 'none'
                        });
                        this.refreshData();
                        this.getCount(); //更新数量标识
                    }
                });
        },

        remindDelivery(e) {
            //提醒发货
            var orderItem = e.currentTarget.dataset.item;
            app.globalData
                .sjrequest1('/activityOrderBusiness/sendDeliverySms', {
                    orderNumber: orderItem.orderNumber
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '已提醒',
                            icon: 'none'
                        });
                    }
                });
        },

        goPay(e) {
            //待支付订单 去支付
            if (this.activation) {
                return;
            }

            this.activation = true;
            setTimeout(() => {
                this.activation = null;
            }, 1500);
            var orderItem = e.currentTarget.dataset.item;
            var { merchantId, appId } = this;
            var dataList = this.dataList;
            var index = dataList.findIndex((item) => item.orderNumber == orderItem.orderNumber);
            var storeData = this.storeData;
            uni.showLoading({
                title: '请求支付',
                mask: true
            });
            app.globalData
                .sjrequest1('/activityOrderBusiness/wxPay', {
                    orderNumber: orderItem.orderNumber,
                    merchantId,
                    appId
                })
                .then((res) => {
                    uni.hideLoading();

                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        uni.requestPayment({
                            ...data,
                            success: (res) => {
                                var tempArr = dataList.splice(index, 1);
                                tempArr[0].orderState = 1;
                                storeData.tabData1.list.unshift(...tempArr);
                                this.setData({
                                    dataList,
                                    storeData
                                });
                                this.getCount(); //更新数量标识

                                var query = {
                                    orderNum: data.orderNo,
                                    goodsName: orderItem.commodityName,
                                    skuName: orderItem.skuName,
                                    buyCount: orderItem.amount
                                };
                                var queryStr = JSON.stringify(query);
                                queryStr = 'query=' + encodeURIComponent(queryStr);
                                uni.navigateTo({
                                    url: '/pages/group_booking/pay-success/pay-success?' + queryStr
                                });
                            }
                        });
                    }
                });
        },

        confirmDelivery(e) {
            //确认收货
            var orderItem = e.currentTarget.dataset.item;
            var dataList = this.dataList;
            var index = dataList.findIndex((item) => item.orderNumber == orderItem.orderNumber);
            var storeData = this.storeData;
            app.globalData
                .sjrequest1('/activityOrderBusiness/confirmOrder', {
                    orderNumber: orderItem.orderNumber
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '已收货',
                            icon: 'none'
                        });
                        var tempArr = dataList.splice(index, 1);
                        tempArr[0].orderState = 4;
                        storeData.tabData4.list.unshift(...tempArr);
                        this.setData({
                            dataList,
                            storeData
                        });
                        this.getCount(); //更新数量标识
                    }
                });
        },

        contactMerchant(e) {
            //联系商家
            uni.getStorage({
                key: 'zl_userInfo',
                success: (res) => {
                    var data = res.data;

                    if (data.statusCode == 200 && data.data.code == 200) {
                        var info = data.data.data;
                        var appName = info.setInfo.appName;
                        var headImage = info.setInfo.headImage;
                        uni.navigateTo({
                            url: `/pages/order/contact/contact?logoPic=${headImage}&marchantId=${this.merchantId}&marchantName=${appName}`
                        });
                    }
                }
            });
        },

        delOrder(e) {
            //删除订单
            var orderItem = e.currentTarget.dataset.item;
            var dataList = this.dataList;
            var index = dataList.findIndex((item) => item.orderNumber == orderItem.orderNumber); // activityOrderBusiness/deleteOrder

            app.globalData
                .sjrequest1('/activityOrderBusiness/cancelOrder', {
                    orderNumber: orderItem.orderNumber
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '已删除',
                            icon: 'none'
                        });
                        dataList.splice(index, 1);
                        this.setData({
                            dataList
                        });
                    }
                });
        },

        switchStatus(e) {
            //切换顶部导航状态
            var status = e.currentTarget.dataset.status;
            var currentStatus = this.currentStatus;

            if (currentStatus != status) {
                this.setData(
                    {
                        currentStatus: status
                    },
                    () => {
                        var storeData = this.storeData;
                        var list = storeData['tabData' + status].list;

                        if (list.length == 0) {
                            this.getOrderList();
                        } else {
                            this.setData({
                                dataList: list
                            });
                        }
                    }
                );
            }
        },

        selectWhy(e) {
            var whyNum = e.currentTarget.dataset.whynum;

            if (this.whyNum != whyNum) {
                this.setData({
                    whyNum
                });
            }
        },

        textareaChange(e) {
            //输入框内容改变
            var value = e.detail.value;
            this.setData({
                reasonText: value
            });
        },

        _getStateText(state, isDelete) {
            var stateText = '';

            switch (state) {
                case 0:
                    stateText = '待付款';
                    break;

                case 1:
                    stateText = '待接单';
                    break;

                case 2:
                    stateText = '待收货';
                    break;

                case 4:
                    stateText = '已完成';
                    break;
            }

            return stateText;
        },

        _joinUserAddress(shippingInfo) {
            //拼接用户地址
            var { provincesName, cityName, areaName, address } = shippingInfo;
            return provincesName + cityName + areaName + address;
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        getOrderList() {
            var { pageSize, merchantId, currentStatus, storeData } = this;
            var reqData = {
                pageSize: pageSize,
                merchantId: merchantId,
                isQueryRefundOrder: false,
                templateTag: 'TTPT',
                orderType: '2'
            };
            var nowTabData = {};
            nowTabData = storeData['tabData' + currentStatus];

            if (currentStatus !== 'all') {
                reqData.orderState = currentStatus;
            }

            if (currentStatus == 3) {
                //查退款订单
                reqData.isQueryRefundOrder = true;
                reqData.refundStatus = 5;
            }

            reqData.currentPage = nowTabData.pageNum; //页码

            app.globalData.sjrequest1('/activityOrderBusiness/activityOrderPageList', reqData).then((res) => {
                uni.stopPullDownRefresh();

                if (res.statusCode == 200 && res.data.code === 0) {
                    var data = res.data.data;
                    var list = data ? data.list : [];
                    nowTabData.stopReq = list.length != pageSize;
                    list.forEach((item) => {
                        if (item.orderState === 0) {
                            var totalBuyTimes = 15 * 60 * 1000;

                            var orderTimes = this._parseDate(item.orderTime, 'number');

                            var nowTimes = new Date().getTime();
                            var diffTimes = nowTimes - orderTimes; //时间差毫秒数

                            var remaining = totalBuyTimes - diffTimes; //剩余时间

                            item.downTimes = remaining;
                            item.downTimeObj = {
                                minutes: '',
                                seconds: ''
                            };
                        }

                        item.shippingInfo = JSON.parse(item.shippingAddress || '{}');
                        item.userAddress = this._joinUserAddress(item.shippingInfo);
                        item.orderStateText = this._getStateText(item.orderState, item.isDelete);
                    });

                    if (nowTabData.pageNum == 1) {
                        nowTabData.list = list;
                    } else {
                        nowTabData.list.push(...list);
                    }

                    this.setData({
                        dataList: nowTabData.list
                    });
                }
            });
        },

        finishFun(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //倒计时完成
            var index = e.currentTarget.dataset.index;
            var dataList = this.dataList;
            dataList[index].downTimes = 0;
        },

        changeFun(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //倒计时改变
            var index = e.currentTarget.dataset.index;
            var detail = e.detail;

            for (var key in detail) {
                var value = detail[key];

                if (value < 10) {
                    detail[key] = '0' + value;
                } else {
                    detail[key] = value;
                }
            }

            var dataList = this.dataList;
            dataList[index].downTimeObj = detail;
            this.setData({
                dataList
            });
        },

        getCount() {
            //获取订单数量
            var topTabList = this.topTabList;
            app.globalData
                .sjrequest1('/activityOrderBusiness/orderCount', {
                    merchantId: this.merchantId,
                    isQueryRefundOrder: false,
                    templateTag: 'TTPT',
                    orderType: '2'
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        topTabList.forEach((item) => {
                            var countItem = data.find((temp) => temp.orderState == item.status);

                            if (countItem) {
                                if (!(item.status == 4 || item.status == 3)) {
                                    item.count = countItem.total;
                                }
                            } else {
                                item.count = 0;
                            }
                        });
                        this.setData({
                            topTabList
                        });
                    }
                });
        }
    }
};
</script>
<style>
/* pages/group_booking/local-list/local-list.wxss */

page {
    background-color: #f7f7f7;
}

.top-tab {
    height: 88rpx;
}

.top-tab-list-scroll {
    font-size: 28rpx;
    background-color: #fff;
    color: #333;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88rpx;
    z-index: 100;
}

.top-tab-list-scroll .tab-item {
    flex-shrink: 0;
    height: 88rpx;
    flex: 1;
    position: relative;
    align-items: center;
}

.top-tab-list-scroll .tab-item .count-num {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    background-color: #eb1918;
    font-size: 20rpx;
    padding: 3rpx 12rpx;
    border-radius: 20rpx;
}

.top-tab-list-scroll .tab-item .tab-item-name {
    line-height: 84rpx;
}

.top-tab-list-scroll .tab-item .unline-box {
    width: 56rpx;
    height: 6rpx;
    border-radius: 2rpx;
    background-color: transparent;
}

.top-tab-list-scroll .sel-item {
    color: #eb1918;
}

.top-tab-list-scroll .sel-item .unline-box {
    background-color: #eb1918;
}

/* 列表数据 */
.order-list {
    box-sizing: border-box;
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #666;
}

.order-list .order-item {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 16px;
    padding: 20rpx;
    box-sizing: border-box;
    margin-bottom: 36rpx;
}

.order-list .order-item .status-text {
    font-size: 26rpx;
    border-bottom: 4rpx solid #eb1918;
}

.order-list .order-item .goods-info {
    margin-top: 22rpx;
}

.order-list .goods-info .goods-img {
    width: 156rpx;
    height: 156rpx;
    margin-right: 16rpx;
    background-color: #ccc;
    border-radius: 8rpx;
}

.order-list .goods-info .goods-name {
    color: #0f0f0f;
}

.order-list .goods-info .specification {
    font-size: 24rpx;
    color: #acacac;
}

.order-list .goods-info .now-price {
    font-size: 40rpx;
    color: #eb1918;
    font-weight: bold;
}

.order-list .goods-info .old-price {
    text-decoration: line-through;
}

.order-list .order-item .payment-amount {
    font-size: 32rpx;
    color: #eb1918;
    padding-bottom: 22rpx;
    font-weight: 800;
    margin-top: 16rpx;
    border-bottom: 1rpx solid #e5e5e5;
}

.order-list .order-item .order-show-info {
    border-bottom: 1rpx solid #e5e5e5;
    padding: 15rpx;
}

.order-list .order-item .item-footer {
    height: 100rpx;
    font-size: 22rpx;
}

.order-list .item-footer .shi-zhong-icon {
    width: 25rpx;
    height: 25rpx;
    margin-right: 5rpx;
}

.order-list .item-footer .down-content {
    font-size: 22rpx;
}

.order-list .item-footer .btn {
    width: 180rpx;
    height: 60rpx;
    border-radius: 30rpx;
    font-size: 26rpx;
    margin: 0 0 0 15rpx;
    padding: 0;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
}

.order-list .item-footer .btn:after {
    border: 0;
}

.order-list .item-footer .red-btn {
    background-color: #fe4f4f;
}

.order-list .item-footer .blue-btn {
    background-color: #1577ff;
}

.order-list .item-footer .yellow-btn {
    background-color: #ffbb38;
}

.list-empty-box {
    height: 500rpx;
    font-size: 30rpx;
    color: #999;
}

/* 取消订单原因弹窗 */
.cancel-why-content {
    background-color: #fff;
    width: 710rpx;
    padding: 30rpx;
    box-sizing: border-box;
    font-size: 30rpx;
}

.cancel-why-content .top-box {
    font-weight: bold;
    font-size: 30rpx;
}

.cancel-why-content .top-box .cancel-btn {
    color: #acacac;
}

.cancel-why-content .top-box .title-text {
    color: #000;
}

.cancel-why-content .top-box .confirm-btn {
    color: #1577ff;
}

.cancel-why-content .radio-list {
    margin-top: 80rpx;
}

.cancel-why-content .radio-list .why-item:not(:first-child) {
    margin-top: 20rpx;
}

.cancel-why-content .radio-list .radio-box {
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background-color: #fff;
    border: 2rpx solid #707070;
    margin-right: 30rpx;
    box-sizing: border-box;
}

.cancel-why-content .radio-list .checked-radio {
    border-width: 10rpx;
    border-color: #1577ff;
}

.cancel-why-content .radio-list .why-textarea {
    width: 534rpx;
    height: 242rpx;
    margin: 20rpx 0 0 50rpx;
    border: 1rpx solid #acacac;
    border-radius: 16rpx;
    padding: 15rpx;
    box-sizing: border-box;
    font-size: 22rpx;
}
</style>
