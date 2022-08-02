<template>
    <view>
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
                <view class="order-item" v-for="(item, index) in dataList" :key="index">
                    <view class="me-fx-row me-fx-sb-c">
                        <text>订单号:{{ item.orderNumber }}</text>
                        <text class="status-text">{{ item.orderStateText }}</text>
                    </view>

                    <view class="me-fx-row goods-info">
                        <image :src="item.bannerImgUrls[0]" class="goods-img"></image>
                        <view class="me-fx-1 me-fx-col me-fx-sb right-info">
                            <view>
                                <view class="me-full-text goods-name">{{ item.commodityName }}</view>
                                <text class="specification">规格:{{ item.skuName }}</text>
                            </view>
                            <view class="me-fx-row me-fx-sb-c">
                                <text>x{{ item.amount }}</text>
                                <text class="payment-amount">实付：￥{{ item.actualMoney }}</text>
                            </view>
                        </view>
                    </view>

                    <view class="order-info" v-if="item.showDetail">
                        <view>退货单号:{{ item.activityOrderRefundResponse.refundNo }}</view>
                        <view>退款金额:¥{{ item.activityOrderRefundResponse.refundMoney }}</view>
                        <view>申请退货时间:{{ item.activityOrderRefundResponse.createTime }}</view>
                        <view>退货理由:{{ item.activityOrderRefundResponse.refundReason }}</view>

                        <view v-if="item.activityOrderRefundResponse.refundStatus == 4">
                            {{ item.activityOrderRefundResponse.expressCompany }}:{{ item.activityOrderRefundResponse.expressNumber }}
                        </view>

                        <view v-if="item.activityOrderRefundResponse.refundStatus == 3">
                            <view>商家拒绝时间:2021-07-12 16:21</view>
                            <view>拒绝理由:{{ item.activityOrderRefundResponse.refuseReason }}</view>
                        </view>
                    </view>

                    <view class="me-fx-row me-fx-end-c item-footer">
                        <button class="btn detail-btn" :data-index="index" @tap="handleShowDetail">
                            订单详情
                            <image src="/static/pages/group_booking/imgs/right-jiantou.png" :class="showDetail ? 'up-opint' : 'down-opint'"></image>
                        </button>
                        <button class="btn contact-btn" @tap="contactMerchant">联系商家</button>
                        <button class="btn contact-btn" v-if="item.activityOrderRefundResponse.refundStatus == 4" :data-item="item" @tap="jumpLogistics">查看物流</button>
                        <button class="btn confirm-btn" v-if="item.activityOrderRefundResponse.refundStatus == 2" :data-item="item" @tap="openSalesReturnPopup">确认退货</button>
                    </view>
                </view>
            </view>
            <view v-else class="me-fx-col me-fx-c-c list-empty-box">
                <text>暂无数据</text>
            </view>
        </view>

        <!-- 退货时填写快递信息弹窗 -->
        <van-popup :show="showCourierPopup" :round="true" @click-overlay="closePopup" :close-on-click-overlay="true" custom-style="border-radius:22rpx">
            <view class="courier-info-popup">
                <view class="me-fx-row me-fx-start-c ipt-item">
                    <text>物流公司</text>
                    <input class="ipt" type="text" placeholder="请输入物流公司" v-model="expressCompany" />
                </view>
                <view class="me-fx-row me-fx-start-c ipt-item">
                    <text>物流订单</text>
                    <input class="ipt" type="text" placeholder="请输入快递单号" v-model="expressNumber" />
                    <image src="/static/pages/group_booking/imgs/sao-ma.png" class="sao-ma-img" @tap="scanCode"></image>
                </view>
                <view class="me-fx-row me-fx-c-c">
                    <button class="btn cancel-btn" @tap="closePopup">取消</button>
                    <button class="btn confirm-btn" @tap="confrimSalesReturn">确认发货</button>
                </view>
            </view>
        </van-popup>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// pages/seckill/refund-order/refund-order.js
let app = getApp();
export default {
    components: {
        // vanPopup
    },
    data() {
        return {
            currentStatus: 'all',

            topTabList: [
                {
                    status: 'all',
                    name: '全部',
                    count: 0
                },
                {
                    status: 1,
                    name: '申请中',
                    count: 0
                },
                {
                    status: 2,
                    name: '已同意',
                    count: 0
                },
                {
                    status: 4,
                    name: '退货中',
                    count: 0
                },
                {
                    status: 5,
                    name: '已退款',
                    count: 0
                },
                {
                    status: 3,
                    name: '已拒绝',
                    count: 0
                }
            ],

            showCourierPopup: false,

            //弹窗显示状态
            handleOrder: {},

            //操作订单项
            expressCompany: '',

            //快递公司
            expressNumber: '',

            //快递单号
            dataList: [],

            //列表数据
            storeData: {
                tabDataall: {
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
                },
                tabData5: {
                    stopReq: false,
                    pageNum: 1,
                    list: []
                }
            },

            pageSize: 10,
            merchantId: '',
            showCancelWhy: false,
            whyNum: '',
            showDetail: false
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
            this.getOrderList();
        }
    },
    methods: {
        closePopup() {
            //关闭弹窗
            this.setData({
                showCourierPopup: false
            });
        },

        openWhyList() {
            //打开取消订单原因列表选择弹窗
            this.setData({
                showCancelWhy: true
            });
        },

        cancelOrder() {
            //确认取消订单
            this.setData({
                showCancelWhy: false
            });
        },

        jumpLogistics(e) {
            var orderItem = e.currentTarget.dataset.item;
            var refundInfo = orderItem.activityOrderRefundResponse;
            var { orderNumber, expressCompany, expressNumber } = refundInfo;

            if (expressCompany && expressNumber) {
                var query = `wlNumber=${expressNumber}&wlCompany=${expressCompany}&orderNumber=${orderNumber}`;
                uni.navigateTo({
                    url: '/pages/order/logistics/logistics?' + query
                });
            }
        },

        handleShowDetail(e) {
            //显示/隐藏详情
            var index = e.currentTarget.dataset.index;
            var dataList = this.dataList;
            var orderItem = dataList[index];
            orderItem.showDetail = !orderItem.showDetail;
            this.setData({
                dataList
            });
        },

        refreshData() {
            var state = this.currentStatus;
            var storeData = this.storeData;
            var nowTabData = storeData['tabData' + state];
            nowTabData.pageNum = 1;
            nowTabData.stopReq = false;
            this.getOrderList();
            this.getCount();
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

        _getStateText(state) {
            var stateText = '';

            switch (state) {
                case 1:
                    stateText = '申请中';
                    break;

                case 5:
                    stateText = '已退款';
                    break;

                case 3:
                    stateText = '已拒绝';
                    break;

                case 2:
                    stateText = '已同意';
                    break;

                case 4:
                    stateText = '退货中';
                    break;
            }

            return stateText;
        },

        getOrderList() {
            var { pageSize, merchantId, currentStatus, storeData } = this;
            var reqData = {
                pageSize: pageSize,
                merchantId: merchantId,
                isQueryRefundOrder: true,
                templateTag: 'TTPT'
            };
            var nowTabData = {};
            nowTabData = storeData['tabData' + currentStatus];

            if (typeof currentStatus == 'string' && currentStatus.includes('_')) {
                reqData.refundStatusList = currentStatus.split('_');
            } else {
                if (currentStatus !== 'all') {
                    reqData.refundStatus = currentStatus;
                }
            }

            reqData.currentPage = nowTabData.pageNum; //页码

            app.globalData.sjrequest1('/activityOrderBusiness/activityOrderPageList', reqData).then((res) => {
                uni.stopPullDownRefresh();

                if (res.statusCode == 200 && res.data.code === 0) {
                    var data = res.data.data;
                    var list = data ? data.list : [];
                    nowTabData.stopReq = list.length != pageSize;
                    list.forEach((item) => {
                        item.showDetail = false;
                        item.orderStateText = this._getStateText(item.activityOrderRefundResponse.refundStatus);
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

        openSalesReturnPopup(e) {
            var orderItem = e.currentTarget.dataset.item;
            var query = orderItem.activityOrderRefundResponse;
            query = JSON.stringify(query);
            query = encodeURIComponent(query);
            uni.navigateTo({
                url: '/pages/seckill/confirm-refund/confirm-refund?query=' + query,
                events: {
                    uploadData: () => {
                        this.refreshData();
                    }
                }
            });
        },

        confrimSalesReturn(e) {
            //确认退货
            var { expressCompany, expressNumber } = this;

            if (!expressCompany) {
                return uni.showToast({
                    title: '请填入物流公司',
                    icon: 'none'
                });
            }

            if (!expressNumber) {
                return uni.showToast({
                    title: '请填入物流单号',
                    icon: 'none'
                });
            }

            this.setData({
                showCourierPopup: false
            });
            var orderItem = this.handleOrder;
            app.globalData
                .sjrequest1('/activityOrderBusiness/userConfirmRefund', {
                    orderNumber: orderItem.orderNumber,
                    expressCompany,
                    //快递公司
                    expressNumber //快递单号
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '已确认',
                            icon: 'none'
                        });
                    }
                });
        },

        scanCode() {
            //扫码
            uni.scanCode({
                success: (res) => {
                    var result = res.result;
                    this.setData({
                        expressNumber: result
                    });
                },
                fail: (err) => {
                    console.log('扫码失败：', err);
                }
            });
        },

        getCount() {
            //获取订单数量
            var topTabList = this.topTabList;
            app.globalData
                .sjrequest1('/activityOrderBusiness/orderCount', {
                    merchantId: this.merchantId,
                    isQueryRefundOrder: true,
                    templateTag: 'JSMS'
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        topTabList.forEach((item) => {
                            var countItem = data.find((temp) => temp.refundStatus == item.status);

                            if (countItem) {
                                if ([1, 2, 4].includes(item.status)) {
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
    padding: 20rpx;
    box-sizing: border-box;
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
    background-color: #f4f4f4;
}

.order-list .goods-info .goods-img {
    width: 156rpx;
    height: 156rpx;
    border-radius: 8rpx;
    background-color: #ccc;
}

.order-list .goods-info .right-info {
    padding: 10rpx 16rpx;
    box-sizing: border-box;
    height: 156rpx;
}

.order-list .goods-info .goods-name {
    color: #0f0f0f;
}

.order-list .goods-info .specification {
    font-size: 24rpx;
    color: #acacac;
}

.order-list .order-info {
    padding-top: 20rpx;
    border-top: 2rpx solid #e5e5e5;
    font-size: 24rpx;
    color: #666;
    margin-top: 20rpx;
    line-height: 45rpx;
}

.order-list .order-item .payment-amount {
    font-size: 32rpx;
    color: #eb1918;
    font-weight: 800;
    padding-bottom: 22rpx;
}

.order-list .order-item .item-footer {
    height: 100rpx;
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
}

.order-list .item-footer .btn:after {
    border: 0;
}

.order-list .item-footer .detail-btn {
    border: 2rpx solid #999;
    color: #999;
    background-color: #fff;
}

.order-list .item-footer .detail-btn .up-opint {
    width: 14rpx;
    height: 22rpx;
    transform: rotate(-90deg);
    position: relative;
    bottom: 1px;
}

.order-list .item-footer .detail-btn .down-opint {
    width: 14rpx;
    height: 22rpx;
    transform: rotate(90deg);
    position: relative;
    bottom: 1px;
}

.order-list .item-footer .contact-btn {
    color: #fff;
    background-color: #1577ff;
}

.order-list .item-footer .confirm-btn {
    background: linear-gradient(180deg, #f2180c 0%, #ea2610 100%);
    box-shadow: 0px 6px 12px rgba(235, 35, 15, 0.17);
    color: #fff;
}

.list-empty-box {
    height: 500rpx;
    font-size: 30rpx;
    color: #999;
}

/* 取消订单原因弹窗 */
.courier-info-popup {
    background-color: #fff;
    width: 618rpx;
    font-size: 30rpx;
    padding: 30rpx;
    box-sizing: border-box;
    font-weight: bold;
}

.courier-info-popup .ipt-item {
    margin-bottom: 50rpx;
}

.courier-info-popup .ipt {
    width: 336rpx;
    border-bottom: 1rpx solid #acacac;
    margin-left: 20rpx;
    padding: 0 10rpx;
    box-sizing: border-box;
    font-size: 24rpx;
}

.courier-info-popup .sao-ma-img {
    width: 36rpx;
    height: 36rpx;
    margin-left: 20rpx;
}

.courier-info-popup .btn {
    width: 212rpx;
    height: 60rpx;
    margin: 0 15rpx;
    padding: 0;
    line-height: 60rpx;
    font-size: 26rpx;
    border-radius: 30rpx;
    background-color: transparent;
}

.courier-info-popup .btn:after {
    border: 0;
}

.courier-info-popup .cancel-btn {
    color: #1577ff;
    border: 2rpx solid #1577ff;
}

.courier-info-popup .confirm-btn {
    color: #fff;
    background-color: #f2180c;
}
</style>
