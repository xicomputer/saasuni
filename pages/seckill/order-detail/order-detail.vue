<template>
    <view>
        <view>
            <view class="me-fx-row me-fx-sb-c top-box" v-if="orderInfo.isDelete == 1 || orderInfo.orderState == 3">
                <image src="/static/pages/seckill/imgs/yqx.png" class="adorn-img"></image>
                <!-- <view class='me-fx-1 cancel-title'>交易已取消</view> -->
                <view class="me-fx-1 cancel-title">已退款订单</view>
            </view>
            <view v-else class="me-fx-row top-box">
                <view class="me-fx-1">
                    <view class="me-fx-row me-fx-start-c">
                        <text class="col-line"></text>
                        <text class="title-text">{{ topTitle }}</text>
                    </view>

                    <view v-if="orderState == 4" class="sub-title">您可以对该商品进行评价</view>
                    <block v-if="orderState == 2">
                        <van-count-down :time="downTimes" :use-slot="true" :auto-start="true" @finish="finishFun" @change="changeFun">
                            <view class="sub-title">
                                <text>剩余</text>
                                <text v-if="downTimeObj.days !== '00'">{{ downTimeObj.days }}天</text>
                                <text>{{ downTimeObj.hours }}小时{{ downTimeObj.minutes }}分钟{{ downTimeObj.seconds }}秒自动确认收货</text>
                            </view>
                        </van-count-down>
                    </block>
                    <view v-if="orderState == 1" class="sub-title">预计支付成功后48小时内发货</view>
                    <block v-if="orderState == 0">
                        <view class="sub-title" v-if="isOverdue">待支付订单已过期</view>
                        <van-count-down :time="downTimes" :use-slot="true" :auto-start="true" @finish="finishFun" @change="changeFun" wx:else>
                            <view class="sub-title">剩余{{ downTimeObj.minutes }}分钟{{ downTimeObj.seconds }}秒自动取消</view>
                        </van-count-down>
                    </block>
                </view>
                <image :src="adornUrl" class="adorn-img"></image>
            </view>

            <block v-if="orderInfo.isDelete != 1">
                <!-- 物流 -->
                <view class="me-fx-row me-fx-sb-c logistics-info" @tap="jumpLogisticsShow" v-if="orderInfo.expressNo">
                    <image src="/static/pages/seckill/imgs/wl.png" class="wl-icon-img"></image>
                    <view class="me-fx-1 info-content">
                        <view class="describe-msg">{{ nowLogisticsItem.status }}</view>
                        <view class="time-str">{{ nowLogisticsItem.time }}</view>
                    </view>
                    <image src="/static/pages/seckill/imgs/right-jiantou.png" class="jiantou-img"></image>
                </view>

                <!-- 地址 -->
                <view class="me-fx-row me-fx-sb-c address-info">
                    <block v-if="fullAddress">
                        <image src="/static/pages/seckill/imgs/location-icon.png" class="location-img"></image>
                        <view class="me-fx-1">
                            <view>
                                <text class="user-name">{{ shippingAddress.contacts }}</text>
                                <text class="user-phone">{{ shippingAddress.contactWay }}</text>
                            </view>
                            <view>{{ fullAddress }}</view>
                        </view>
                    </block>
                    <block v-else>
                        <text class="address-empty-title">请选择收货地址</text>
                        <image src="/static/pages/seckill/imgs/right-jiantou.png" class="jiantou-img"></image>
                    </block>
                </view>
            </block>

            <!-- 商品信息 -->
            <view class="goods-info">
                <view class="me-fx-row info-content">
                    <image :src="orderInfo.bannerImgUrls[0]" class="goods-img"></image>
                    <view class="me-fx-1 me-fx-col me-fx-sb right-info">
                        <view class="me-full-text goods-name">{{ orderInfo.commodityName }}</view>
                        <view class="goods-specification">规格:{{ orderInfo.skuName }}</view>
                        <view class="me-fx-row me-fx-start-c" v-if="orderInfo.isDelete == 1">
                            <text class="price-str">¥{{ orderInfo.livePrice }}</text>
                            <text class="old-price">¥{{ orderInfo.price }}</text>
                        </view>
                        <view class="me-fx-row me-fx-sb-end" v-else>
                            <text class="price-str">¥{{ orderInfo.livePrice }}</text>
                            <text class="count-num">x{{ orderInfo.amount }}</text>
                        </view>
                    </view>
                </view>
                <view class="me-fx-row me-fx-sb-c summary" v-if="orderInfo.isDelete != 1">
                    <view></view>
                    <view>
                        <text>共{{ orderInfo.amount }}件商品，合计:</text>
                        <text class="summary-amount">¥{{ orderInfo.actualMoney }}</text>
                    </view>
                </view>
            </view>

            <block v-if="orderInfo.isDelete == 1">
                <view class="cancel-order-info">
                    <view>下单时间:{{ orderInfo.orderTime }}</view>
                    <view>支付方式:微信支付</view>
                    <view>
                        留言:
                        <text class="leave-msg">{{ orderInfo.message || '您没有任何留言哦' }}</text>
                    </view>
                </view>
            </block>
            <block v-else>
                <!-- 订单信息 -->
                <view class="order-info">
                    <view>订单号:{{ orderInfo.orderNumber }}</view>
                    <view>下单时间:{{ orderInfo.orderTime }}</view>
                </view>

                <!-- 费用信息 -->
                <view class="cost-info">
                    <view class="me-fx-row me-fx-sb-c cost-itme">
                        <text>总金额</text>
                        <text class="amount-str red-text">¥{{ orderInfo.actualMoney }}</text>
                    </view>
                    <view class="me-fx-row me-fx-sb-c cost-itme">
                        <text>总运费</text>
                        <text class="amount-str">包邮</text>
                    </view>
                    <view class="me-fx-row me-fx-sb-c cost-itme">
                        <text>实际支付</text>
                        <text class="amount-str red-text">¥{{ orderInfo.actualMoney }}</text>
                    </view>
                </view>

                <!-- 支付方式 -->
                <view class="me-fx-row me-fx-sb-c pay-way">
                    <text>支付方式</text>
                    <text>微信</text>
                </view>

                <!-- 留言 -->
                <view class="leave-msg-box">
                    <view>留言</view>
                    <view class="leave-textarea">{{ orderInfo.message || '您没有任何留言哦' }}</view>
                </view>
            </block>

            <!-- 底部按钮 -->
            <view class="me-fx-row me-fx-end-c footer-btns">
                <!-- <button class='btn hollow-btn' wx:if='{{orderState==0 && orderInfo.isDelete!=1}}' bindtap='openWhyList' data-type='1'>取消订单</button> -->
                <button class="btn hollow-btn" v-if="orderState == 1 || orderState == 2 || orderState == 4" @tap="contactMerchant">联系商家</button>
                <!-- <button class='btn hollow-btn' wx:if='{{orderState==1 || orderState==4}}' bindtap='openWhyList' >申请退款</button> -->
                <button class="btn hollow-btn" @tap.stop.prevent="openWhyList" v-if="(orderState == 4 || orderState == 1) && orderInfo.isEnd != 1" data-type="2">
                    {{ orderInfo.activityOrderRefundResponse ? '查看售后' : '申请退款' }}
                </button>
                <button class="btn hollow-btn" v-if="orderInfo.isDelete == 1 || orderInfo.orderState == 0 || orderInfo.orderState == 3" @tap="delOrder">删除订单</button>

                <button class="btn solid-btn" v-if="orderState == 0 && orderInfo.isDelete != 1" @tap="goPay">去支付</button>
                <button class="btn solid-btn" v-if="orderState == 2" @tap="confirmDelivery">确认收货</button>
                <button class="btn solid-btn" v-if="orderState == 4" @tap="jumpEvaluate">去评价</button>
                <button class="btn solid-btn" v-if="orderInfo.isDelete == 1 || orderInfo.orderState == 3" @tap="jumpGoodsDetail">重新购买</button>
                <button class="btn solid-btn" v-if="orderState == 1" @tap="remindDelivery">提醒发货</button>
            </view>
        </view>

        <!-- 取消订单原因弹窗 -->
        <van-popup :show="showCancelWhy" :round="true" @click-overlay="closePopup" :close-on-click-overlay="true" position="bottom" custom-style="border-radius:24rpx 24rpx 0 0;">
            <view class="cancel-why-content">
                <view class="me-fx-row me-fx-sb-c top-box">
                    <text class="cancel-btn" @tap="closePopup">取消</text>
                    <text class="title-text">{{ whyPopupTitle }}</text>
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
// pages/seckill/order-detail/order-detail.js
let app = getApp();
export default {
    components: {
        // vanPopup,
        // vanCountDown
    },
    data() {
        return {
            appId: '',
            orderState: '',
            adornUrl: '/static/pages/seckill/imgs/dfh.png',
            topTitle: '',

            //头部标题
            showCancelWhy: false,

            //弹窗显示状态
            whyNum: 0,

            //取消原因序号
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
                    whyNum: -1
                }
            ],

            whyType: 1,

            //原因类型 1取消订单 2退款
            whyPopupTitle: '',

            //原因弹窗标题
            reasonText: '',

            //理由
            orderInfo: {
                isDelete: 0,
                orderState: 0,
                expressNo: '',
                bannerImgUrls: '',
                commodityName: '',
                skuName: '',
                livePrice: '',
                price: '',
                amount: '',
                actualMoney: '',
                orderTime: '',
                message: '',
                orderNumber: '',
                isEnd: 0,
                activityOrderRefundResponse: false
            },

            //订单信息
            logisticsInfo: {},

            //物流信息
            nowLogisticsItem: {
                status: '',
                time: ''
            },

            //物流最新节点信息
            shippingAddress: {
                contacts: '',
                contactWay: ''
            },

            //地址信息
            fullAddress: '',

            //完整收货地址
            isOverdue: false,

            //待支付订单是否过期
            downTimeObj: {
                minutes: '',
                seconds: '',
                days: '',
                hours: ''
            },

            //剩余自动确认收货天数
            residueDay: 3,

            dataList: '',
            userShipping: '',
            downTimes: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var orderNum = options.orderNum;
        var orderState = options.state;

        if (orderNum) {
            this.orderNum = orderNum;
            this.getOrderDetailInfo();
        }

        if (orderState) {
            this.setPageTitle(orderState);
            this.setData({
                orderState
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
        setPageTitle(state) {
            var navTitle = '';
            var topTitle = '';
            var adornUrl = '';
            //设置页码标题
            switch (Number(state)) {
                case 0:
                    navTitle = '待付款';
                    topTitle = '等待您的付款';
                    adornUrl = '/static/pages/seckill/imgs/dfk.png';
                    break;

                case 1:
                    navTitle = '待发货';
                    topTitle = '等待商家发货';
                    adornUrl = '/static/pages/seckill/imgs/dfh.png';
                    break;

                case 2:
                    navTitle = '待收货';
                    topTitle = '等待您收货';
                    adornUrl = '/static/pages/seckill/imgs/dsh.png';
                    break;

                case 3:
                    navTitle = '已取消';
                    adornUrl = '/static/pages/seckill/imgs/yqx.png';
                    break;

                case 4:
                    navTitle = '已完成';
                    topTitle = '买家已确认收货';
                    adornUrl = '/static/pages/seckill/imgs/ywc.png';
                    break;
            }

            uni.setNavigationBarTitle({
                title: navTitle
            });
            this.setData({
                topTitle,
                adornUrl
            });
        },

        jumpLogisticsShow() {
            //跳转物流信息展示
            var logisticsInfo = this.logisticsInfo;
            var query = `wlNumber=${logisticsInfo.number}&wlCompany=${logisticsInfo.expName}&orderNumber=${logisticsInfo.orderNumber}`;
            uni.navigateTo({
                url: '/pages/order/logistics/logistics?' + query
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
            var type = e.currentTarget.dataset.type;
            var orderItem = this.orderInfo;

            if (orderItem.activityOrderRefundResponse) {
                //申请了退款
                uni.navigateTo({
                    url: '/pages/seckill/refund-order/refund-order'
                });
            } else {
                var title = type == 0 ? '选择取消理由' : '选择退款原因';
                this.setData({
                    showCancelWhy: true,
                    whyType: type,
                    whyPopupTitle: title
                });
            }
        },

        selectWhy(e) {
            //选择理由
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

        popupConfrimHandle() {
            //原因弹窗确认操作
            var whyType = this.whyType;
            var whyNum = this.whyNum;
            var whyList = this.whyList;
            var whyItem = whyList.find((item) => item.whyNum == whyNum) || {};
            var reasonText = whyNum == -1 ? this.reasonText : whyItem.content;

            if (whyType == 1) {
                this.cancelOrder(reasonText);
            } else if (whyType == 2) {
                this.applyRefund(reasonText);
            }
        },

        cancelOrder(reasonText) {
            //确认取消订单
            if (!reasonText) {
                return uni.showToast({
                    title: '请选择原因',
                    icon: 'none'
                });
            }

            this.setData({
                showCancelWhy: false
            });
            app.globalData
                .sjrequest1('/activityOrderBusiness/cancelOrder', {
                    orderNumber: this.orderNum,
                    refundReason: reasonText //退款原因
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '操作成功',
                            icon: 'none'
                        });
                        dataList.splice(index, 1);
                        this.setData({
                            dataList
                        });
                        const eventChannel = this.getOpenerEventChannel();
                        eventChannel.emit('uploadOrderList');
                        uni.navigateBack();
                    }
                });
        },

        applyRefund(reasonText) {
            //确认申请退款
            var state = this.orderInfo.orderState;
            var reqUrl = '';

            switch (state) {
                case 1:
                    reqUrl = '/activityOrderBusiness/beforeSendCommodityRefund';
                    break;
                //待发货退款

                case 4:
                    reqUrl = '/activityOrderBusiness/afterSendCommodityRefund';
                    break;
                //收货后退款
            }

            app.globalData
                .sjrequest1(reqUrl, {
                    orderNumber: this.orderNum,
                    refundReason: reasonText //退款原因
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '操作成功',
                            icon: 'none'
                        });
                    }
                });
        },

        jumpAddressList() {
            //跳转收货地址列表
            if (this.fullAddress) {
                return;
            }

            app.globalData.store.setState({
                from: 'submitOrder'
            });
            uni.navigateTo({
                url: '/pages/Address/AddressList/AddressList',
                events: {
                    addressChange: (data) => {
                        var shipping = data.shipping;
                        var fullAddress = this.joinAddress(shipping);
                        this.setData({
                            userShipping: shipping,
                            fullAddress
                        });
                    }
                }
            });
        },

        getLogisticsInfo() {
            //获取物流信息
            app.globalData
                .sjrequest1('/activityOrderBusiness/queryLogisticsDetails', {
                    expressNumber: this.orderInfo.expressNo,
                    orderNumber: this.orderInfo.orderNumber
                })
                .then((res) => {
                    console.log('物流信息：', res);

                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        var info = JSON.parse(data);
                        var nowLogisticsItem = info.result.list[0];
                        this.setData({
                            logisticsInfo: info.result,
                            nowLogisticsItem
                        });
                    }
                });
        },

        joinAddress(shipping) {
            //拼接收货地址
            var { provincesName, cityName, areaName, address } = shipping;
            return provincesName + cityName + areaName + address;
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        getOrderDetailInfo() {
            app.globalData
                .sjrequest1('/activityOrderBusiness/detailOrder', {
                    orderNumber: this.orderNum
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        var shippingAddress = JSON.parse(data.shippingAddress);
                        var fullAddress = this.joinAddress(shippingAddress);

                        if (data.orderState === 0) {
                            var totalBuyTimes = 15 * 60 * 1000;

                            var orderTimes = this._parseDate(data.orderTime, 'number');

                            var nowTimes = new Date().getTime();
                            var diffTimes = nowTimes - orderTimes; //时间差毫秒数

                            var downTimes = totalBuyTimes - diffTimes; //剩余时间

                            var isOverdue = downTimes <= 0;
                            this.setData({
                                isOverdue,
                                downTimes
                            });
                        } else if (data.orderState === 2) {
                            var nowTimes = new Date().getTime();

                            var deliveryTimes = this._parseDate(data.deliveryTime, 'number');

                            var diffTimes = deliveryTimes - nowTimes;
                            this.setData({
                                downTimes: diffTimes
                            });
                        }

                        this.setData(
                            {
                                orderInfo: data,
                                shippingAddress,
                                fullAddress
                            },
                            () => {
                                if (data.expressNo) {
                                    this.getLogisticsInfo();
                                }
                            }
                        );
                        this.computedSurplus(data.deliveryTime); //计算剩余收货时间
                    }
                });
        },

        computedSurplus(deliveryTime) {
            if (deliveryTime) {
                var totalTimes = 3 * 86400000;
                var nowTimes = new Date().getTime();

                var deliveryTimes = this._parseDate(deliveryTime, 'number');

                var downTimes = totalTimes - (nowTimes - deliveryTimes);
                this.setData({
                    downTimes
                });
            }
        },

        finishFun() {
            //倒计时完成
            this.setData({
                isOverdue: true
            });
        },

        changeFun(e) {
            //倒计时改变
            var detail = e.detail;

            for (var key in detail) {
                var value = detail[key];

                if (value < 10) {
                    detail[key] = '0' + value;
                } else {
                    detail[key] = value;
                }
            }

            this.setData({
                downTimeObj: detail
            });
        },

        remindDelivery() {
            //提醒发货
            var orderInfo = this.orderInfo;
            app.globalData
                .sjrequest1('/activityOrderBusiness/sendDeliverySms', {
                    orderNumber: orderInfo.orderNumber
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '已提醒',
                            icon: 'none'
                        });
                    } else {
                        uni.showToast({
                            title: res.data.info || '已提醒',
                            icon: 'none'
                        });
                    }
                });
        },

        goPay() {
            //待支付订单 去支付
            if (this.activation) {
                return;
            }

            this.activation = true;
            setTimeout(() => {
                this.activation = null;
            }, 1500);
            var orderInfo = this.orderInfo;
            var { appId } = this;
            uni.showLoading({
                title: '请求支付',
                mask: true
            });
            app.globalData
                .sjrequest1('/activityOrderBusiness/wxPay', {
                    orderNumber: orderInfo.orderNumber,
                    merchantId: orderInfo.marchantId,
                    appId
                })
                .then((res) => {
                    uni.hideLoading();

                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        uni.requestPayment({
                            ...data,
                            success: (res) => {
                                var query = {
                                    orderNum: data.orderNo,
                                    goodsName: orderInfo.commodityName,
                                    skuName: orderInfo.skuName,
                                    buyCount: orderInfo.amount
                                };
                                var queryStr = JSON.stringify(query);
                                queryStr = 'query=' + encodeURIComponent(queryStr);
                                uni.navigateTo({
                                    url: '/pages/seckill/pay-success/pay-success?' + queryStr
                                });
                            }
                        });
                    }
                });
        },

        jumpGoodsDetail() {
            //重新购买时 跳转活动商品详情
            var orderInfo = this.orderInfo;
            uni.navigateTo({
                url: '/pages/seckill/detail/detail?activityId=' + orderInfo.activityId
            });
        },

        jumpEvaluate() {
            //跳转评价页面
            var orderInfo = this.orderInfo;
            app.globalData.marchantId = orderInfo.marchantId; //商家id

            app.globalData.commodityId = orderInfo.commodityId; //商品id

            app.globalData.commodityLogo = orderInfo.imageUrl; //商品图片

            app.globalData.commodityName = orderInfo.commodityName; //商品名称

            app.globalData.orderUniqueId = orderInfo.orderNumber; //订单uid

            uni.navigateTo({
                url: '/pages/order/postGoodsComment/postGoodsComment'
            });
        },

        confirmDelivery() {
            //确认收货
            var orderInfo = this.orderInfo;
            app.globalData
                .sjrequest1('/activityOrderBusiness/confirmOrder', {
                    orderNumber: orderInfo.orderNumber
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '已收货',
                            icon: 'none'
                        });
                        const eventChannel = this.getOpenerEventChannel();
                        eventChannel.emit('uploadOrderList');
                        uni.navigateBack();
                    }
                });
        },

        delOrder() {
            //删除订单
            var orderInfo = this.orderInfo; // activityOrderBusiness/deleteOrder

            app.globalData
                .sjrequest1('/activityOrderBusiness/cancelOrder', {
                    orderNumber: orderInfo.orderNumber
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '已删除',
                            icon: 'none'
                        });
                    }
                });
        },

        contactMerchant() {
            //联系商家
            uni.getStorage({
                key: 'zl_userInfo',
                success: (res) => {
                    var data = res.data;

                    if (data.statusCode == 200 && data.data.code == 200) {
                        var info = data.data.data;
                        var appName = info.setInfo.appName;
                        var headImage = info.setInfo.headImage;
                        var merchantId = this.orderInfo.marchantId;
                        uni.navigateTo({
                            url: `/pages/order/contact/contact?logoPic=${headImage}&marchantId=${merchantId}&marchantName=${appName}`
                        });
                    }
                }
            });
        }
    }
};
</script>
<style>
page {
    background-color: #f1f1f1;
}

/* 头部信息 */
.top-box {
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    margin: 10rpx 0 20rpx;
    color: #ff7e28;
}
.top-box .col-line {
    width: 8rpx;
    height: 34rpx;
    margin-right: 20rpx;
    background-color: #ff7e28;
    border-radius: 4rpx;
}
.top-box .cancel-title {
    margin-left: 28rpx;
    font-size: 36rpx;
    font-weight: bold;
}
.top-box .title-text {
    font-size: 28rpx;
    font-weight: bold;
}
.top-box .sub-title {
    font-size: 24rpx;
    margin-top: 22rpx;
}
.top-box .adorn-img {
    width: 236rpx;
    height: 142rpx;
}

/* 物流信息 */
.logistics-info {
    background-color: #fff;
    padding: 30rpx;
    box-sizing: border-box;
    margin-bottom: 10rpx;
}
.logistics-info .info-content {
    margin: 0 30rpx;
}
.logistics-info .info-content .describe-msg {
    font-size: 28rpx;
    color: #000;
    font-weight: bold;
}
.logistics-info .time-str {
    font-size: 24rpx;
    color: #0f0f0f;
    margin-top: 10rpx;
}
.logistics-info .wl-icon-img {
    width: 56rpx;
    height: 56rpx;
}
.logistics-info .jiantou-img {
    width: 20rpx;
    height: 34rpx;
}

/* 地址信息 */
.address-info {
    background-color: #fff;
    font-size: 24rpx;
    color: #0f0f0f;
    padding: 10rpx 30rpx;
    box-sizing: border-box;
    height: 138rpx;
    margin-bottom: 10rpx;
}
.address-info .location-img {
    width: 56rpx;
    height: 56rpx;
    margin-right: 28rpx;
}
.address-info .user-name {
    font-size: 28rpx;
    color: #000;
    font-weight: bold;
}
.address-info .user-phone {
    color: #acacac;
}

.address-info .address-empty-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #acacac;
}
.address-info .jiantou-img {
    width: 20rpx;
    height: 34rpx;
}

/* 商品信息 */
.goods-info {
    background-color: #fff;
    padding: 20rpx;
    box-sizing: border-box;
    margin-bottom: 10rpx;
}
.goods-info .info-content {
    border-bottom: 2rpx solid #e5e5e5;
    padding-bottom: 20rpx;
    margin-bottom: 20rpx;
}
.goods-info .info-content .goods-img {
    width: 156rpx;
    height: 156rpx;
    background-color: #ccc;
    border-radius: 8rpx;
    margin-right: 16rpx;
}
.goods-info .info-content .goods-name {
    font-size: 28rpx;
    color: #0f0f0f;
}
.goods-info .info-content .goods-specification {
    color: #acacac;
    font-size: 24rpx;
}
.goods-info .info-content .price-str {
    font-size: 40rpx;
    color: #eb1918;
    font-weight: bold;
}
.goods-info .info-content .old-price {
    font-size: 22rpx;
    color: #acacac;
    margin-left: 20rpx;
    text-decoration: line-through;
}
.goods-info .info-content .count-num {
    font-size: 30rpx;
    color: #333;
}

.goods-info .summary {
    font-size: 24rpx;
    color: #acacac;
}
.goods-info .summary .summary-amount {
    color: #eb1918;
    font-size: 28rpx;
    font-weight: 800;
    margin-left: 20rpx;
}

/* 订单信息 */
.order-info {
    background-color: #fff;
    font-size: 26rpx;
    color: #999;
    padding: 20rpx;
    box-sizing: border-box;
    margin-bottom: 10rpx;
    line-height: 45rpx;
}

/* 取消订单的订单信息 */
.cancel-order-info {
    background-color: #fff;
    border-radius: 8rpx;
    font-size: 26rpx;
    color: #000;
    line-height: 50rpx;
    padding: 22rpx 30rpx;
    box-sizing: border-box;
}
.cancel-order-info .leave-msg {
    color: #999;
}

/* 费用信息 */
.cost-info {
    background-color: #fff;
    font-size: 28rpx;
    color: #000;
    padding: 0 30rpx;
    box-sizing: border-box;
    margin-bottom: 10rpx;
}
.cost-info .cost-itme {
    height: 82rpx;
}
.cost-info .amount-str {
    font-size: 26rpx;
    font-weight: 800;
}
.cost-info .red-text {
    color: #eb1918;
}
.cost-info .cost-itme:not(:last-child) {
    border-bottom: 1rpx solid #e5e5e5;
}

/* 支付方式 */
.pay-way {
    background-color: #fff;
    font-size: 28rpx;
    color: #333;
    padding: 22rpx 30rpx;
    box-sizing: border-box;
    border-radius: 8rpx;
    margin-bottom: 10rpx;
}

/* 留言 */
.leave-msg-box {
    background-color: #fff;
    font-size: 28rpx;
    color: #000;
    padding: 22rpx 30rpx;
    box-sizing: border-box;
    border-radius: 8rpx;
    margin-bottom: 200rpx;
}
.leave-msg-box .leave-textarea {
    width: 640rpx;
    height: 90rpx;
    margin-top: 20rpx;
    font-size: 24rpx;
}

/* 底部按钮 */
.footer-btns {
    background-color: #fff;
    height: 132rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
}
.footer-btns .btn {
    width: 180rpx;
    height: 60rpx;
    border-radius: 30rpx;
    margin: 0;
    font-size: 26rpx;
    padding: 0;
    line-height: 60rpx;
    background-color: transparent;
}
.footer-btns .btn:after {
    border: 0;
}
.footer-btns .hollow-btn {
    color: #999;
    border: 2rpx solid #999;
    margin-right: 20rpx;
}
.footer-btns .solid-btn {
    background: linear-gradient(180deg, #f2180c 0%, #ea2610 100%);
    box-shadow: 0px 6px 12px rgba(235, 35, 15, 0.17);
    color: #fff;
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
