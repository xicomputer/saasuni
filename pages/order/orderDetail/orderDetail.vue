<template>
    <view>
        <store-close v-if="isClose"></store-close>
        <view class="orderDetail">
            <!-- 订单头部 -->
            <view class="head3" v-if="orderState === 3">
                <view class="head-left">
                    <image src="/static/pages/img/order/wait.png" class="head-wait" />
                    <view class="head-text">{{ orderStateList[orderState].state }}</view>
                </view>
                <view class="head-right">
                    <image src="/static/pages/img/order/delivery.png" class="head-icon" />
                </view>
            </view>
            <view class="head" v-else>
                <view class="head-left">
                    <image src="/static/pages/img/order/wait.png" class="head-wait" />
                </view>
                <view class="head-right">
                    <view class="head-info">
                        <view class="head-text">{{ orderStateList[orderState].state }}</view>
                        <view class="head-prompt" v-if="orderState != 0">{{ orderStateList[orderState].prompt }}</view>
                        <!-- 倒计时 -->
                        <van-count-down
                            class="control-count-down head-prompt"
                            v-if="orderState == 0"
                            :time="citInfo.endTime"
                            format="剩余mm分钟ss秒自动取消"
                            @finish="countDownOver"
                        />
                        <view class="head-prompt" v-if="orderState === 1">并退款给您</view>
                    </view>
                    <view class="head-delivery">
                        <image src="/static/pages/img/order/delivery.png" class="head-icon" />
                    </view>
                </view>
            </view>
            <!-- 退款状态 -->
            <view class="return" v-if="orderState > 4">
                <view class="return-state">
                    {{ returnStateList[orderState - 5].state }}
                    <view class="return-money" v-if="orderState === 8">￥{{ citInfo.totalPrice }}</view>
                </view>
                <view class="return-prompt">
                    <view class="return-tip" v-if="returnStateList[orderState - 5].prompt"></view>
                    <view class="return-text">
                        {{ returnStateList[orderState - 5].prompt }}
                        <view class="return-money" v-if="orderState === 8">￥{{ citInfo.totalPrice }}</view>
                    </view>
                </view>
                <view v-if="orderState === 7">
                    <view class="return-tips">
                        <view class="return-tips-item" v-for="(item, index) in prompts" :key="index">
                            <view class="return-tip"></view>

                            <view class="return-text">
                                {{ item }}
                            </view>
                        </view>
                    </view>
                    <view class="return-btn" @tap="logistics">
                        <view class="return-btn-box">
                            <view class="return-btn-up">我已寄出</view>
                            <view class="return-btn-down">点击填写物流单号</view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 退款信息 -->
            <view class="return-info" v-if="orderState > 4">
                <view class="return-info-title">退款信息</view>
                <view class="return-info-goods" v-if="!refundInfo.list.length">
                    <view class="return-info-left">
                        <image :src="citInfo.thumbnail" mode="aspectFill" class="return-info-logo" />
                    </view>
                    <view class="return-info-right">
                        <view class="return-info-name">{{ citInfo.commodityName }}</view>
                        <view class="return-info-spec">规格：{{ citInfo.itemText }}</view>
                        <view class="return-info-num">数量：{{ citInfo.amount }}</view>
                        <view class="return-info-price">￥{{ citInfo.actualMoney }}</view>
                    </view>
                </view>
                <view class="return-info-goods" v-if="refundInfo.list.length" v-for="(item, index) in refundInfo.list" :key="index">
                    <view class="return-info-left">
                        <image :src="item.thumbnail" mode="aspectFill" class="return-info-logo" />
                    </view>

                    <view class="return-info-right">
                        <view class="return-info-name">{{ item.commodityName }}</view>
                        <view class="return-info-spec">规格：{{ item.itemText }}</view>
                        <view class="return-info-num">数量：{{ item.amount }}</view>
                        <view class="return-info-price">￥{{ item.actualMoney }}</view>
                    </view>
                </view>
                <view class="return-info-desc">
                    <view class="return-info-desc-item">退款原因：{{ refundInfo.list.length ? refundInfo.refundReason : citInfo.refundReason }}</view>
                    <view class="return-info-desc-item">退款金额：￥{{ refundInfo.list.length ? refundInfo.totalPrice : citInfo.totalPrice }}</view>
                    <view class="return-info-desc-item">申请时间：{{ refundInfo.list.length ? refundInfo.applyRefundTime : citInfo.applyRefundTime }}</view>
                </view>
            </view>
            <!-- 购买的商品 -->
            <view class="goods" v-if="orderState < 4">
                <!-- 商家 -->
                <view class="goods-shop">
                    <image :src="cartShop.headImage" mode="aspectFill" class="shop-logo" />
                    <view class="shop-title">{{ cartShop.appName }}</view>
                    <image src="/static/pages/img/back-icon.png" class="shop-enter" />
                </view>
                <view class="goods-list">
                    <view class="goods-item" v-for="(items, index) in citInfo.commList" :key="index">
                        <view class="goods-left">
                            <image :src="items.thumbnail" mode="aspectFill" class="goods-logo" />
                        </view>

                        <view class="goods-right">
                            <view class="goods-info">
                                <view class="goods-name">{{ items.commodityName }}</view>
                                <view class="goods-spec">规格：{{ items.itemText }}</view>
                                <view class="goods-num">数量：{{ items.amount }}</view>
                                <view class="goods-price">
                                    ￥{{ items.actualMoney }}
                                    <view v-if="orderState === 3" style="display: flex">
                                        <text v-if="items.refundState != 5 && items.refundState != 0">退款中</text>
                                        <text v-if="items.refundState == 5">已退款</text>
                                        <!-- <view class="goods-btn" style="margin-right:20rpx" catchtap="comment" data-index="{{index}}" wx:if="{{items.refundState==0&&items.singleEvaluate==0}}">评价几句</view> -->
                                        <navigator
                                            class="goods-btn"
                                            v-if="items.refundState == 0 && !citInfo.isSettle && citInfo.isSupportRefund == 1"
                                            :url="'../applyReturn/applyReturn?uniqueId=' + citInfo.uniqueId + '&selfUniqueId=' + items.uniqueId"
                                        >
                                            申请退货
                                        </navigator>
                                    </view>
                                </view>
                            </view>
                            <view class="goods-labels" v-if="orderState !== 3">
                                <view class="labels-item" v-for="(item, index1) in items.labeList" :key="index1">
                                    <view class="label">{{ item }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 地址 -->
            <view class="address" v-if="orderState < 4">
                <view class="address-left">
                    <image src="/static/pages/img/order/addr.png" class="address-img" />
                </view>
                <view class="address-right">
                    <view class="address-up">
                        <view class="address-info">
                            <view class="address-name">{{ citInfo.shipping.contacts }}</view>
                            <view class="address-tel">{{ citInfo.shipping.contactWay }}</view>
                        </view>
                        <!-- <view class="address-btn" wx:if="{{orderState===0}}">
                    <view class="address-update">修改</view>
                </view> -->
                    </view>
                    <view class="address-down">
                        地址：{{ citInfo.shipping.provincesName }}{{ citInfo.shipping.cityName }}{{ citInfo.shipping.areaName }}{{ citInfo.shipping.address }}
                    </view>
                </view>
            </view>
            <!-- 订单信息 -->
            <view class="info" v-if="orderState < 5">
                <view class="info-item info-flex">
                    <view class="info-orderNo">
                        <view class="info-label">订单编号</view>
                        ：
                        {{ citInfo.orderNumber }}
                    </view>
                    <view class="info-btn" @tap="copy">
                        <view class="info-copy">复制</view>
                    </view>
                </view>
                <view class="info-item" v-if="orderState !== 4">
                    <view class="info-label">支付方式</view>
                    ： 微信支付
                </view>
                <view class="info-item" v-if="orderState !== 4">
                    <view class="info-label">下单时间</view>
                    ：
                    {{ citInfo.orderTime }}
                </view>
                <view class="info-item" v-if="orderState !== 4">
                    <view class="info-label">留言</view>
                    ：
                    <text style="width: 0; flex: 1; flex-wrap: wrap; word-wrap: break-word">{{ citInfo.message ? citInfo.message : '您没有任何留言哦' }}</text>
                </view>
                <view class="info-item" v-if="orderState === 4">
                    <view class="info-label">申请时间</view>
                    ：
                    {{ citInfo.applyRefundTime }}
                </view>
                <view class="info-item" v-if="orderState === 4">
                    <view class="info-label">退款金额</view>
                    ： ￥{{ citInfo.totalPrice }}
                </view>
                <view class="info-item" v-if="orderState === 4">
                    <view class="info-label">退款原因</view>
                    ：
                    {{ citInfo.refundReason }}
                </view>
            </view>
            <!-- 订单统计 -->
            <view class="total" v-if="orderState < 4">
                <view class="total-item">
                    <view class="total-label">商品总额</view>
                    <view class="total-number">￥{{ citInfo.totalPrice }}</view>
                </view>
                <view class="total-item">
                    <view class="total-label">运费</view>
                    <view class="total-number">￥{{ citInfo.freight }}</view>
                </view>
                <view class="total-item">
                    <view class="total-label">商品优惠</view>
                    <view class="total-number">￥{{ citInfo.sumDeduct }}</view>
                </view>
            </view>
            <!-- 物流 -->
            <view class="logistics" v-if="(orderState === 2 || orderState === 3) && citInfo.expressNo">
                <view class="logistics-item">快递公司：{{ citInfo.expressCompany }}</view>
                <view class="logistics-line"></view>
                <view class="logistics-item" style="display: flex; align-items: center; justify-content: space-between">
                    快递单号：{{ citInfo.expressNo }}
                    <view class="info-copy" @tap="copyTd">复制</view>
                </view>
            </view>
            <!-- 底部填充 -->
            <view class="bottom-fill" v-if="orderState < 4"></view>
            <!-- 底部按钮 -->
            <view class="bottom">
                <navigator class="bottom-item" :url="'../contact/contact?logoPic=' + citInfo.logoPic + '&marchantId=' + citInfo.marchantId + '&marchantName=' + citInfo.nickName">
                    <view class="bottom-btn">联系卖家</view>
                </navigator>
                <!-- <view class="bottom-item" wx:if="{{orderState>=3}}">
            <view class="bottom-btn">电话联系</view>
        </view> -->
                <view class="bottom-item" v-if="(orderState == 5 || orderState == 6 || orderState == 7) && citInfo.chargebackCount == 0" @tap="cancelRefund">
                    <view class="bottom-btn">撤销申请</view>
                </view>
                <view class="bottom-item" v-if="orderState === 0" @tap="updateCityOrder" :data-uniqueId="citInfo.uniqueId" data-id="3" :data-marchantId="citInfo.marchantId">
                    <view class="bottom-btn">取消订单</view>
                </view>
                <view class="bottom-item" v-if="citInfo.orderState == 0" @tap="payOrder" :data-item="citInfo">
                    <view class="bottom-btn bottom-active">支付订单</view>
                </view>
                <view class="bottom-item" v-if="orderState === 1 && citInfo.chargebackAllCount == 0" @tap="refund">
                    <view class="bottom-btn">申请退款</view>
                </view>
                <view class="bottom-item" v-if="orderState === 1" @tap="updateCityOrder" :data-uniqueId="citInfo.uniqueId" data-id="2" :data-marchantId="citInfo.marchantId">
                    <view class="bottom-btn bottom-active">提醒发货</view>
                </view>
                <view class="bottom-item" v-if="orderState === 2 && citInfo.expressNo" @tap="checkWl">
                    <view class="bottom-btn">查看物流</view>
                </view>
                <view class="bottom-item" v-if="orderState === 2">
                    <view class="bottom-btn bottom-active" @tap="getOrderGoods" :data-uniqueId="citInfo.uniqueId" data-id="4" :data-marchantId="citInfo.marchantId">确认收货</view>
                </view>
                <view class="bottom-item" v-if="orderState === 3 && citInfo.commList[0].tempSpecId" @tap="rebuy">
                    <view class="bottom-btn">再来一单</view>
                </view>
                <!-- <view class="bottom-item" wx:if="{{orderState===3}}">
            <navigator class="bottom-btn bottom-active" url="../applyReturn/applyReturn?uniqueId={{citInfo.uniqueId}}">一键退货</navigator>
        </view> -->
                <!-- <view class="bottom-item" wx:if="{{orderState===4}}">
            <view class="bottom-btn bottom-active">申请投诉</view>
        </view> -->
            </view>
            <!-- 退款原因 -->
            <van-popup :show="reasonBox" @close="refundOnClose" round position="bottom" class="reasonBox">
                <view class="reason-title">退款原因</view>
                <view class="reason-content">
                    <radio-group @change="radioChange">
                        <label class="reason-item" v-for="(item, index) in refundReasonList" :key="item.name">
                            <view class="reason-name">{{ item.name }}</view>

                            <radio :value="item.name" :checked="item.checked" color="#101010" />
                        </label>
                    </radio-group>
                    <textarea
                        :value="refundReason"
                        maxlength="50"
                        placeholder-style="color: #CCCCCC;"
                        placeholder="输入你的退款原因"
                        @focus="inputFocus"
                        @input="inputContent"
                        class="reason-textarea"
                    ></textarea>
                    <view class="reason-btn" @tap="confirmCancel">立即提交</view>
                </view>
            </van-popup>
            <!-- 填写物流单号 -->
            <van-popup :show="logisticsBox" round @close="logisticsOnClose">
                <view class="logisticsBox">
                    <view class="logistics-item">
                        <view class="logistics-label">快递公司</view>
                        <input class="logistics-input" @input="inputDeliveryCompany" maxlength="10" placeholder="请选择快递公司" />
                    </view>
                    <view class="logistics-item">
                        <view class="logistics-label">快递单号</view>
                        <input class="logistics-input" type="number" maxlength="20" :value="deliveryNumber" @input="inputDeliveryNumber" placeholder="请选择快递单号" />
                    </view>
                    <view class="logistics-btn" @tap="wroteDelivery">提交</view>
                </view>
            </van-popup>
        </view>
        <!-- 收货 -->
        <van-overlay v-show="isTake">
            <view class="istake-container">
                <image
                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E6%88%91%E7%9A%84_%E6%94%B6%E8%B4%A7%E5%9B%BE%E7%89%87.png"
                    class="istake-img"
                ></image>
                <view class="istake-content">
                    <view>请选择收货方式：</view>
                    <view>1、确认无误收货：如果需要退货,需要自行和商家协商处理。</view>
                    <view>2、仅收货：支持7天内退货。</view>
                    <view class="is-read-content" @tap="read">
                        <image :src="isCheck ? '/pages/img/order/is_comfirm_taked.png' : '/pages/img/order/is_comfirm_take.png'" class="is-read-img"></image>
                        <text>我已知悉（默认不选中，需要勾选后才能收货）</text>
                    </view>
                </view>
                <view class="istake-bottom">
                    <view class="istake-btn" @tap="confirmTake" data-type="1">确认无误收货</view>
                    <view class="istake-btn" @tap="confirmTake" data-type="0">仅收货</view>
                </view>
            </view>
            <image src="/static/pages/img/order/order_close.png" class="close-take" @tap="cancelTake"></image>
        </van-overlay>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanIcon from './@vant/weapp/icon/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import storeClose from '@/pages/Component/storeClose/index';
// import vanOverlay from './@vant/weapp/overlay/index';
// pages/order/orderDetail/orderDetail.js
const time = require('../../../utils/util');

const app = getApp();
export default {
    components: {
        // vanPopup,
        // vanIcon,
        // vanCountDown,
        storeClose,
        // vanOverlay
    },
    data() {
        return {
            /**
             * orderState:
             *  0待付款，1待发货，2待收货,3已完成(头部样式)
             *  4退款中
             *  5商家处理中,6商家已拒绝，7买家同意，8退货成功，9买家发货
             */
            isClose: false,

            // 是否关店
            orderState: 0,

            orderStateList: [
                //订单状态
                {
                    state: '等待您付款',
                    prompt: '剩余14分钟59秒自动取消'
                },
                {
                    state: '等待商家发货',
                    prompt: '2天内商家未发货订单自动取消'
                },
                {
                    state: '等待您收货',
                    prompt: '签收后三天内未收货将自动确认收货'
                },
                {
                    state: '您的订单已完成',
                    prompt: ''
                },
                {
                    state: '退款申请中',
                    prompt: '商家会在1个工作日内给你退款'
                },
                {
                    state: '请等待商家处理',
                    prompt: '将会在24小时内处理'
                },
                {
                    state: '卖家已拒绝，您需要处理',
                    prompt: '请与商家进行沟通'
                },
                {
                    state: '请退货并填写物流信息',
                    prompt: '请在两天内处理,超时自动取消'
                },
                {
                    state: '退款成功',
                    prompt: '您已成功退款'
                },
                {
                    state: '已填写物流信息',
                    prompt: '将会在三天内处理，如超时平台将默认商家自动确认收货'
                }
            ],

            returnStateList: [
                //退货状态
                {
                    state: '您已成功发起退款申请，请耐心等待商家处理。',
                    prompt: '商家同意或者超时未处理你系统将退款给您。'
                },
                {
                    state: '拒绝原因：货物已被损坏',
                    prompt: '商家已拒绝您的退货申请。'
                },
                {
                    state: '商家已同意退货申请，请尽早发货',
                    prompt: ''
                },
                {
                    state: '退款总金额',
                    prompt: '退回微信'
                },
                {
                    state: '您已填写物流单号，请耐心等待',
                    prompt: '商家同意或者超时未处理系统将退款给你'
                }
            ],

            prompts: ['未与商家协商一致，请勿使用到付或平邮，以免商家拒签货物', '交易的钱款还在平台中间账户，确保你资金安全', '请填写真实物流信息，逾期未填写，退货申请将撤销'],

            refundReasonList: [
                //退款原因
                {
                    name: '不喜欢/不想要了'
                },
                {
                    name: '未按时发货'
                },
                {
                    name: '发票的问题'
                },
                {
                    name: '收货地址填错了'
                },
                {
                    name: '其他'
                }
            ],

            reasonBox: false,
            isSubmit: false,
            logisticsBox: false,
            topList: [],
            refundState: 0,

            citInfo: {
                endTime: '',
                totalPrice: '',
                thumbnail: '',
                commodityName: '',
                itemText: '',
                amount: '',
                actualMoney: '',
                refundReason: '',
                applyRefundTime: '',
                commList: [],
                isSettle: '',
                isSupportRefund: 0,
                uniqueId: '',

                shipping: {
                    contacts: '',
                    contactWay: '',
                    provincesName: '',
                    cityName: '',
                    areaName: '',
                    address: ''
                },

                message: false,
                freight: '',
                sumDeduct: '',
                expressNo: '',
                expressCompany: '',
                logoPic: '',
                marchantId: '',
                nickName: '',
                chargebackCount: 0,
                orderState: 0,
                chargebackAllCount: 0
            },

            refundInfo: {
                list: [],
                refundReason: '',
                totalPrice: '',
                applyRefundTime: ''
            },

            deliveryRefund: false,
            showCancel: false,
            deliveryCompany: '',
            deliveryNumber: '',
            message: '',
            len: 0,
            uniqueId: '',
            reason: '',
            payState: false,

            // 是否付款
            isTake: false,

            isCheck: false,

            cartShop: {
                headImage: '',
                appName: ''
            },

            takeData: {},
            useStore: true,
            clone_options: '',
            state: '',
            prompt: '',
            tempSpecId: '',
            refundReason: '',
						_options:null
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
				console.log(options,'options');
				this._options = options
				if (this._options.deliveryRefund == 5) {
				    this.setData({
				        deliveryRefund: true
				    });
				}
				
				this.setData({
				    uniqueId: this._options.deliveryUniqueId
				});
				
				if (this._options.state) {
				    this.refundDetails(this._options.uniqueId);
				}
				
				this.queryCity(this._options.uniqueId);
        this.setData({
            cartShop: { ...app.globalData.setInfo }
        });
        this.setData({
            clone_options: options
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
        // 拒绝退款
        refund() {
            this.setData({
                reasonBox: true
            });
        },

        // 取消拒绝退款
        refundOnClose() {
            this.setData({
                reasonBox: false
            });
        },

        // 填写物流信息
        logistics() {
            this.setData({
                logisticsBox: true
            });
        },

        // 取消填写物流信息
        logisticsOnClose() {
            this.setData({
                logisticsBox: false
            });
        },

        // 选择拒绝原因
        radioChange(e) {
            const refundReasonList = this.refundReasonList;

            for (let i = 0, len = refundReasonList.length; i < len; ++i) {
                refundReasonList[i].checked = refundReasonList[i].name === e.detail.value;
            }

            this.setData({
                refundReasonList
            });
        },

        // 评论
        comment(e) {
            let index = e.currentTarget.dataset.index;
            let goodsData = this.citInfo.commList[index];
            let citInfo = this.citInfo;
            app.globalData.marchantId = citInfo.marchantId;
            //商家id
            app.globalData.commodityId = goodsData.commodityId; //商品id
            app.globalData.commodityLogo = goodsData.thumbnail; //商品图片

            app.globalData.commodityName = goodsData.commodityName; //商品名称

            app.globalData.orderUniqueId = goodsData.uniqueId; //订单uid

            uni.navigateTo({
                url: '../postGoodsComment/postGoodsComment'
            });
        },

        // 选择其他
        inputFocus() {
            console.log('focus');
            const refundReasonList = this.refundReasonList;

            for (let i = 0, len = refundReasonList.length; i < len; ++i) {
                refundReasonList[i].checked = refundReasonList[i].name == '其他';
            }

            this.setData({
                refundReasonList
            });
        },

        // 查看物流
        checkWl() {
            uni.navigateTo({
                url: '../logistics/logistics?wlNumber=' + this.citInfo.expressNo + '&wlCompany=' + this.citInfo.expressCompany + '&orderNumber=' + this.citInfo.orderNumber
            });
        },

        queryCity(uniqueId) {
            let data = {
                uniqueId: uniqueId
            };

            if (!this.deliveryRefund) {
                //配送订单
                app.globalData.sjrequest('/order/queryCityInfo', data).then((res) => {
                    if (res.data.code == 200) {
                        var timestamp = Date.parse(new Date());

                        if (res.data.data.arrivalTime) {
                            res.data.data.arrivalTime = time.formatTimeSec(res.data.data.arrivalTime);
                        }

                        if (res.data.data.orderTime) {
                            res.data.data.orderTime = time.formatTimeSec(res.data.data.orderTime);
                        }

                        res.data.data.endTime = res.data.data.endTime * 1000 - timestamp + 5000;
                        console.log(res.data.data.endTime);
                        this.setData({
                            citInfo: res.data.data
                        });

                        if (res.data.data.refundState == 0) {
                            if (res.data.data.orderState < 4) {
                                this.setData({
                                    orderState: res.data.data.orderState
                                });
                                console.log(this.orderState);
                            }
                        }

                        if (res.data.data.refundState == 1) {
                            this.setData({
                                orderState: 5
                            });
                        }

                        if (res.data.data.refundState == 2) {
                            this.setData({
                                orderState: 7
                            });
                        }

                        if (res.data.data.refundState == 3) {
                            this.returnStateList[1].state = '拒绝原因:' + res.data.data.rejectReason;
                            this.setData({
                                orderState: 6,
                                returnStateList: this.returnStateList
                            });
                        }

                        if (res.data.data.refundState == 4) {
                            this.setData({
                                orderState: 9
                            });
                        }

                        if (res.data.data.refundState == 5) {
                            this.setData({
                                orderState: 8
                            });
                        }

                        if (res.data.data.orderState == 4) {
                            this.setData({
                                orderState: 3
                            });
                        }
                    }
                });
            }

            if (this.deliveryRefund) {
                let data = {
                    uniqueId: this.uniqueId
                };
                app.globalData.sjrequest('/order/chargebackDetails', data).then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data.applyRefundTime) {
                            res.data.data.applyRefundTime = time.formatTimeSec(res.data.data.applyRefundTime);
                        }

                        console.log(res.data.data);
                        this.setData({
                            citInfo: res.data.data
                        });

                        if (res.data.data.refundState == 1) {
                            this.setData({
                                orderState: 5
                            });
                        }

                        if (res.data.data.refundState == 2) {
                            this.setData({
                                orderState: 7
                            });
                        }

                        if (res.data.data.refundState == 3) {
                            this.returnStateList[1].state = '拒绝原因:' + res.data.data.refundReason;
                            this.setData({
                                orderState: 6,
                                returnStateList: this.returnStateList
                            });
                        }

                        if (res.data.data.refundState == 4) {
                            this.setData({
                                orderState: 9
                            });
                        }

                        if (res.data.data.refundState == 5) {
                            this.setData({
                                orderState: 8
                            });
                        }
                    }
                });
            }
        },

        showPopup() {
            this.setData({
                showCancel: true
            });
        },

        // 输入事件
        inputContent(e) {
            this.setData({
                message: e.detail.value,
                len: e.detail.value.length
            });
        },

        inputDeliveryCompany(e) {
            this.setData({
                deliveryCompany: e.detail.value
            });
        },

        inputDeliveryNumber(e) {
            let value = this.validateNumber(e.detail.value);
            this.setData({
                deliveryNumber: parseInt(value)
            });
        },

        // 校验只能输入数字
        validateNumber(val) {
            return val.replace(/^(0+)|[^\d]+/g, '');
        },

        wroteDelivery() {
            var that = this;

            if (this.deliveryCompany == '') {
                uni.showToast({
                    title: '请输入快递公司',
                    icon: 'none'
                });
                return;
            }

            if (this.deliveryNumber == '') {
                uni.showToast({
                    title: '请输入快递单号',
                    icon: 'none'
                });
                return;
            }

            let data = {
                uniqueId: this.uniqueId,
                tExpressCompany: this.deliveryCompany,
                tExpressNo: this.deliveryNumber
            };
            app.globalData.sjrequest('/order/chargeback', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        logisticsBox: false
                    });
                    that.queryCity(that.uniqueId);
                }
            });
        },

        //确认退款
        confirmCancel() {
            this.refundReasonList.forEach((item) => {
                if (item.checked) {
                    this.setData({
                        reason: item.name
                    });
                }
            });

            if (this.reason == '其他') {
                if (this.message == '') {
                    uni.showToast({
                        title: '请输入退款原因',
                        icon: 'none'
                    });
                    this.setData({
                        reason: ''
                    });
                    return;
                } else {
                    this.setData({
                        reason: this.message
                    });
                }
            }

            if (this.reason == '') {
                uni.showToast({
                    title: '请选择退款原因',
                    icon: 'none'
                });
                return;
            }

            let that = this;
            let data = {
                uniqueId: this.citInfo.uniqueId,
                reason: this.reason,
                orderId: this.citInfo.orderId
            };
            console.log(data);
            var token = uni.getStorageSync('token');
            let appid = uni.getStorageSync('appid');
            let data2s = {
                authorizerAppid: appid,
                sceneType: 3
            };
            app.globalData.mb2request('/subTemplate/listPriTemplateId', data2s).then((res) => {
                let tempData = res.data.data;
                uni.requestSubscribeMessage({
                    tmplIds: tempData,
                    success: function (res) {
                        let data3s = {
                            status: 1,
                            marchantId: that.citInfo.marchantId,
                            templateIds: tempData,
                            appId: appid,
                            targetId: that.citInfo.orderId,
                            targetType: 4
                        };
                        app.globalData.sjrequest('/basic/addsubscription', data3s).then((res) => {});
                    },
                    complete: function () {
                        app.globalData.sjrequest1('/order/ezchargeback', data, token).then((res) => {
                            if (res.data.code == 200) {
                                uni.showToast({
                                    title: '申请成功,等待商家同意',
                                    icon: 'none',
                                    duration: 1000
                                });
                                setTimeout(function () {
                                    uni.redirectTo({
                                        url: `/pages/order/orderList/orderList?activeTab=2&marchantId=${that.citInfo.marchantId}&tabsItem=4`
                                    });
                                }, 1000);
                            }
                        });
                    }
                });
            });
        },

        copy() {
            uni.setClipboardData({
                data: this.citInfo.orderNumber,
                success: function () {
                    uni.showToast({
                        title: '复制成功',
                        icon: 'none'
                    });
                }
            });
        },

        copyTd() {
            uni.setClipboardData({
                data: this.citInfo.expressNo,
                success: function () {
                    uni.showToast({
                        title: '复制成功',
                        icon: 'none'
                    });
                }
            });
        },

        onClose() {
            this.setData({
                showCancel: false
            });
        },

        // 再来一单
        rebuy() {
            let that = this;
            let data = {
                marchantId: this.citInfo.marchantId,
                commoditys: [],
                orderType: this.citInfo.orderType,
                shppingId: this.citInfo.shipping.id
            };
            this.citInfo.commList.forEach((el) => {
                data.commoditys.push({
                    commodityId: el.commodityId,
                    tempSpecId: el.tempSpecId,
                    amount: el.amount
                });
            });
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest1('/order/onekeyAboutOrder', data, token).then((res) => {
                if (res.data.code === 200) {
                    // 更新 store 数据
                    app.globalData.store.setState({
                        submitObj: JSON.stringify(res.data.data)
                    });
                    uni.navigateTo({
                        url: '/pages/order/submitOrder/submitOrder?personnel=' + (that.citInfo.saleUniqueId || 0)
                    });
                } else if (res.data.code == 338) {
                    this.setData({
                        isClose: true
                    });
                }
            });
        },

        // 撤销申请
        cancelRefund() {
            let that = this;
            uni.showModal({
                title: '撤销退货申请',
                content: '是否要撤销退货申请，撤销后将无法再次申请退货',
                showCancel: true,
                //是否显示取消按钮
                cancelText: '否',
                //默认是“取消”
                confirmText: '是',
                //默认是“确定”
                success: function (res) {
                    if (res.cancel) {
                        //点击取消,默认隐藏弹框
                    } else {
                        //点击确定
                        let data = {
                            orderCommodityId: that.citInfo.orderCommodityId,
                            orderId: that.citInfo.orderId
                        };
                        app.globalData.sjrequest('/order/cancelChargeback', data).then((res) => {
                            if (res.data.code == 200) {
                                uni.showToast({
                                    title: '撤销退款成功',
                                    icon: 'none',
                                    success: function () {
                                        uni.navigateBack({
                                            delta: 0
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        },

        // 配送订单操作
        updateCityOrder(e) {
            console.log(e);
            var that = this;
            var ev = e.currentTarget.dataset;
            let data = {
                uniqueId: ev.uniqueid,
                orderState: ev.id,
                marchantId: ev.marchantid
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

                case 5:
                    text = '确认删除订单吗？';
                    notice = '删除成功';
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
                                    uni.navigateBack({
                                        delta: 0
                                    });
                                }
                            });
                        } else if (sm.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            }

            if (ev.id == 2) {
                app.globalData.sjrequest('/order/updateCityOrder', data).then((res) => {
                    if (res.data.code == 200) {
                        uni.showToast({
                            title: '已提醒商家',
                            icon: 'none'
                        });
                    } else if (res.data.code == 309) {
                        uni.showToast({
                            title: '您已经提醒过了，一天只能提醒一次哦!',
                            icon: 'none'
                        });
                    }
                });
            }
        },

        //倒计时结束
        countDownOver() {
            if (this.payState) {
                return;
            }

            let data = {
                uniqueId: this.citInfo.uniqueId,
                orderState: 3,
                marchantId: this.citInfo.marchantId
            };
            app.globalData.sjrequest('/order/updateCityOrder', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '已自动为您取消订单',
                        icon: 'none',
                        duration: 2000,
                        success: function () {
                            setTimeout(function () {
                                uni.navigateBack({
                                    delta: 0
                                });
                            }, 2000);
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
                let merchantId = uni.getStorageSync('merchantId');
                let appid = uni.getStorageSync('appid');
                let data = {
                    uniqueId: item.uniqueId,
                    paymentWay: 2,
                    actualMoney: item.actualMoney,
                    marchantId: merchantId,
                    appid: appid,
                    orderNumber: item.orderNumber,
                    body: item.nickName,
                    payPlatform: 'JSAPI'
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
                                that.setData({
                                    payState: true
                                });
                                uni.showToast({
                                    title: '支付成功',
                                    duration: 1000
                                });
                                setTimeout(function () {
                                    uni.navigateBack({
                                        delta: 0
                                    });
                                }, 1000);
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

        read() {
            this.setData({
                isCheck: !this.isCheck
            });
        },

        // 收货弹框
        getOrderGoods(e) {
            let el = e.currentTarget.dataset;
            let data = {
                uniqueId: el.uniqueid,
                orderState: el.id,
                marchantId: el.marchantid
            };
            this.setData({
                isTake: true,
                takeData: data
            });
        },

        // 取消收货
        cancelTake() {
            this.setData({
                isTake: false,
                isCheck: false
            });
        },

        // 确认收货
        confirmTake(e) {
            if (!this.isCheck) {
                uni.showToast({
                    title: '请先勾选我已知悉',
                    icon: 'none'
                });
                return;
            }

            let type = e.currentTarget.dataset.type;
            let data = this.takeData;
            data.receivingType = type;
            this.cancelTake();
            app.globalData.sjrequest('/order/updateCityOrder', data).then((res) => {
                if (res.data.code == 200) {
                    uni.navigateBack({
                        delta: 0
                    });
                }
            });
        },

        refundDetails(uniqueId) {
            let data = {
                uniqueId: uniqueId
            };
            app.globalData.sjrequest('/order/refundDetails', data).then((res) => {
                if (res.data.code == 200) {
                    if (res.data.data.applyRefundTime) {
                        res.data.data.applyRefundTime = time.formatTimeSec(res.data.data.applyRefundTime);
                    }

                    this.setData({
                        refundInfo: res.data.data,
                        orderState: 5
                    });
                }
            });
        }
    },
    watch: {
        _options: {
            handler: function (newVal, oldVal) {
                this.clone_options = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.orderDetail {
    min-height: 100vh;
    background: #f2f2f2;
}
.orderDetail .head3 {
    background: #333333;
    padding: 30rpx 60rpx 30rpx 40rpx;
    display: flex;
    justify-content: space-between;
}
.orderDetail .head3 .head-left {
    display: flex;
    align-items: center;
}
.orderDetail .head3 .head-left .head-wait {
    width: 28rpx;
    height: 28rpx;
}
.orderDetail .head3 .head-left .head-text {
    font-size: 32rpx;
    color: #ffffff;
    padding-left: 20rpx;
}
.orderDetail .head3 .head-right .head-icon {
    width: 106rpx;
    height: 98rpx;
}
.orderDetail .head {
    background: #333333;
    padding: 30rpx 60rpx 30rpx 40rpx;
    display: flex;
}
.orderDetail .head .head-left .head-wait {
    width: 28rpx;
    height: 28rpx;
}
.orderDetail .head .head-right {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.orderDetail .head .head-right .head-info {
    padding-left: 20rpx;
}
.orderDetail .head .head-right .head-info .head-text {
    font-size: 32rpx;
    color: #ffffff;
}
.orderDetail .head .head-right .head-info .head-prompt {
    font-size: 28rpx;
    color: #ffffff;
    margin-top: 20rpx;
}
.orderDetail .head .head-right .head-delivery .head-icon {
    width: 106rpx;
    height: 98rpx;
}
.orderDetail .return {
    margin: 20rpx 30rpx 0 30rpx;
    padding: 0 20rpx;
    background: #ffffff;
    border-radius: 20rpx;
    font-weight: 500;
    line-height: 80rpx;
}
.orderDetail .return .return-state {
    font-size: 28rpx;
    color: #333333;
    border-bottom: solid 1rpx #ececec;
    display: flex;
    justify-content: space-between;
}
.orderDetail .return .return-state .return-money {
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
}
.orderDetail .return .return-prompt {
    font-size: 24rpx;
    color: #999999;
    display: flex;
    align-items: center;
}
.orderDetail .return .return-prompt .return-tip {
    width: 8rpx;
    height: 8rpx;
    background: #cccccc;
    border-radius: 50%;
}
.orderDetail .return .return-prompt .return-text {
    padding-left: 20rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.orderDetail .return .return-prompt .return-text .return-money {
    font-size: 28rpx;
    font-weight: 500;
    color: #ec1919;
}
.orderDetail .return .return-address {
    padding: 30rpx 0;
    display: flex;
}
.orderDetail .return .return-address .return-left .return-icon {
    width: 26rpx;
    height: 30rpx;
}
.orderDetail .return .return-address .return-right {
    padding-left: 30rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: #333333;
}
.orderDetail .return .return-address .return-right .return-userInfo {
    line-height: 40rpx;
}
.orderDetail .return .return-address .return-right .return-userInfo .return-nickname {
    padding: 0 30rpx;
}
.orderDetail .return .return-address .return-right .return-userInfo .return-tel {
    color: #999999;
}
.orderDetail .return .return-address .return-right .return-addressDetail {
    line-height: 30rpx;
}
.orderDetail .return .return-tips {
    line-height: 30rpx;
}
.orderDetail .return .return-tips .return-tips-item {
    display: flex;
    align-items: baseline;
    margin-top: 20rpx;
}
.orderDetail .return .return-tips .return-tips-item .return-tip {
    width: 8rpx;
    height: 8rpx;
    background: #cccccc;
    border-radius: 50%;
}
.orderDetail .return .return-tips .return-tips-item .return-text {
    padding-left: 20rpx;
    font-size: 24rpx;
    color: #999999;
}
.orderDetail .return .return-btn {
    padding: 30rpx 0;
    display: flex;
    text-align: center;
    justify-content: flex-end;
}
.orderDetail .return .return-btn .return-btn-box {
    padding: 20rpx;
    border: 1rpx solid #cccccc;
    border-radius: 30rpx;
    font-weight: 500;
    color: #666666;
    line-height: 38rpx;
}
.orderDetail .return .return-btn .return-btn-box .return-btn-up {
    font-size: 28rpx;
}
.orderDetail .return .return-btn .return-btn-box .return-btn-down {
    font-size: 24rpx;
}
.orderDetail .return-info {
    margin: 20rpx 30rpx 0 30rpx;
    padding: 30rpx 20rpx;
    background: #ffffff;
    border-radius: 20rpx;
}
.orderDetail .return-info .return-info-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
}
.orderDetail .return-info .return-info-goods {
    margin-top: 30rpx;
    display: flex;
}
.orderDetail .return-info .return-info-goods .return-info-left .return-info-logo {
    width: 170rpx;
    height: 170rpx;
    border-radius: 20rpx;
}
.orderDetail .return-info .return-info-goods .return-info-right {
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.orderDetail .return-info .return-info-goods .return-info-right .return-info-name {
    font-size: 26rpx;
    font-weight: 400;
    line-height: 38rpx;
    color: #333333;
    width: 440rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.orderDetail .return-info .return-info-goods .return-info-right .return-info-spec {
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}
.orderDetail .return-info .return-info-goods .return-info-right .return-info-num {
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}
.orderDetail .return-info .return-info-goods .return-info-right .return-info-price {
    width: 498rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: #ec1919;
}
.orderDetail .return-info .return-info-desc {
    font-size: 24rpx;
    font-weight: 500;
    color: #999999;
}
.orderDetail .return-info .return-info-desc .return-info-desc-item {
    margin-top: 20rpx;
}
.orderDetail .goods {
    padding-left: 30rpx;
    box-sizing: border-box;
    background: #ffffff;
    font-weight: 400;
}
.orderDetail .goods .goods-shop {
    height: 80rpx;
    display: flex;
    align-items: center;
}
.orderDetail .goods .goods-shop .shop-logo {
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
}
.orderDetail .goods .goods-shop .shop-title {
    padding: 0 10rpx 0 6rpx;
    height: 40px;
    line-height: 40px;
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
}
.orderDetail .goods .goods-shop .shop-enter {
    width: 10rpx;
    height: 20rpx;
}
.orderDetail .goods .goods-list .goods-item {
    display: flex;
    padding-bottom: 40rpx;
}
.orderDetail .goods .goods-list .goods-item .goods-left .goods-logo {
    width: 170rpx;
    height: 170rpx;
    border-radius: 20rpx;
}
.orderDetail .goods .goods-list .goods-item .goods-right {
    padding-left: 20rpx;
}
.orderDetail .goods .goods-list .goods-item .goods-right .goods-info {
    height: 170rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.orderDetail .goods .goods-list .goods-item .goods-right .goods-info .goods-name {
    font-size: 26rpx;
    font-weight: 400;
    line-height: 38rpx;
    color: #333333;
    width: 440rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.orderDetail .goods .goods-list .goods-item .goods-right .goods-info .goods-spec {
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}
.orderDetail .goods .goods-list .goods-item .goods-right .goods-info .goods-num {
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}
.orderDetail .goods .goods-list .goods-item .goods-right .goods-info .goods-price {
    width: 498rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: #ec1919;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.orderDetail .goods .goods-list .goods-item .goods-right .goods-info .goods-price .goods-btn {
    padding: 4rpx 12rpx;
    border: 2rpx solid #999999;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: #999999;
}
.orderDetail .goods .goods-list .goods-item .goods-right .goods-labels {
    margin-top: 10rpx;
    display: flex;
}
.orderDetail .goods .goods-list .goods-item .goods-right .goods-labels .labels-item .label {
    border: 1rpx solid #ec1919;
    border-radius: 15px;
    padding: 4rpx 12rpx;
    font-size: 18rpx;
    color: #ec1919;
    margin-right: 14rpx;
}
.orderDetail .address {
    margin-top: 2rpx;
    padding: 40rpx 30rpx;
    background: #ffffff;
    display: flex;
}
.orderDetail .address .address-left {
    padding-right: 20rpx;
}
.orderDetail .address .address-left .address-img {
    width: 28rpx;
    height: 28rpx;
}
.orderDetail .address .address-right .address-up {
    width: 644rpx;
    display: flex;
    justify-content: space-between;
}
.orderDetail .address .address-right .address-up .address-info {
    display: flex;
    align-items: center;
}
.orderDetail .address .address-right .address-up .address-info .address-name {
    padding: 0 10rpx 0 0;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    color: #333333;
}
.orderDetail .address .address-right .address-up .address-info .address-tel {
    font-size: 24rpx;
    font-weight: bold;
    line-height: 32rpx;
    color: #333333;
}
.orderDetail .address .address-right .address-up .address-btn .address-update {
    padding: 4rpx 20rpx;
    border: 2rpx solid #ea4158;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: #ea4158;
}
.orderDetail .address .address-right .address-down {
    margin-top: 24rpx;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    color: #333333;
}
.orderDetail .info {
    margin-top: 20rpx;
    padding: 40rpx 30rpx;
    background: #ffffff;
}
.orderDetail .info .info-flex {
    display: flex;
    justify-content: space-between;
}
.orderDetail .info .info-item {
    font-size: 28rpx;
    font-weight: 400;
    margin-top: 20rpx;
    color: #999999;
    display: flex;
}
.orderDetail .info .info-item .info-orderNo {
    display: flex;
}
.orderDetail .info .info-item .info-label {
    width: 120rpx;
    padding-right: 10rpx;
    text-align-last: justify;
    text-align: justify;
    text-justify: distribute-all-lines;
}
.info-copy {
    padding: 4rpx 20rpx;
    border: 2rpx solid #ea4158;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: #ea4158;
}
.orderDetail .total {
    margin-top: 2rpx;
    padding: 20rpx 30rpx 20rpx 30rpx;
    background: #ffffff;
}
.orderDetail .total .total-item {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #333333;
}
.orderDetail .total .total-item .total-label {
    font-weight: bold;
}
.orderDetail .total .total-item .total-number {
    font-weight: 400;
}
.orderDetail .logistics {
    margin-top: 20rpx;
    background: #ffffff;
}
.orderDetail .logistics .logistics-line {
    height: 2rpx;
    background: #f2f2f2;
}
.orderDetail .logistics .logistics-item {
    padding: 0 30rpx;
    box-sizing: border-box;
    height: 90rpx;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 90rpx;
    color: #333333;
}
.orderDetail .bottom-fill {
    height: 100rpx;
}
.orderDetail .bottom {
    width: 100%;
    height: 100rpx;
    background: #ffffff;
    box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
}
.orderDetail .bottom .bottom-item {
    margin: auto 36rpx auto 0;
}
.orderDetail .bottom .bottom-item .bottom-btn {
    padding: 10rpx 26rpx;
    border-radius: 30rpx;
    font-size: 28rrpx;
    font-weight: 400;
    line-height: 42rpx;
    color: #999999;
    border: 1rpx solid #999999;
}
.orderDetail .bottom .bottom-item .bottom-active {
    color: #ec1919;
    border: 1rpx solid #ec1919;
}
.orderDetail .reasonBox .reason-title {
    font-size: 36rpx;
    font-weight: bold;
    line-height: 50rpx;
    color: #333333;
    text-align: center;
    margin: 30rpx auto;
}
.orderDetail .reasonBox .reason-content {
    padding: 0 40rpx;
}
.orderDetail .reasonBox .reason-content .reason-item {
    height: 80rpx;
    border-bottom: 2rpx solid #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.orderDetail .reasonBox .reason-content .reason-item .reason-name {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
}
.orderDetail .reasonBox .reason-content .reason-textarea {
    width: 100%;
    height: 138rpx;
    border: 1rpx solid #cccccc;
    padding: 10rpx;
    box-sizing: border-box;
    color: #333;
}
.orderDetail .reasonBox .reason-content .reason-btn {
    margin: 40rpx 0;
    width: 100%;
    height: 100rpx;
    background: #101010;
    box-shadow: 0rpx 10rpx 20rpx rgba(0, 0, 0, 0.16);
    border-radius: 100rpx;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 100rpx;
    text-align: center;
    color: #ffffff;
}
.orderDetail .logisticsBox {
    padding: 40rpx 50rpx;
}
.orderDetail .logisticsBox .logistics-item .logistics-label {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 38rpx;
    margin: 30rpx 0;
}
.orderDetail .logisticsBox .logistics-item .logistics-input {
    font-size: 28rpx;
    font-weight: 500;
    color: #999999;
    border-bottom: solid 1rpx #ececec;
    padding-bottom: 20rpx;
}
.orderDetail .logisticsBox .logistics-btn {
    width: 500rpx;
    height: 90rpx;
    background: #101010;
    border-radius: 44rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 90rpx;
    text-align: center;
    margin-top: 40rpx;
}
.van-count-down {
    width: 100%;
    height: 100%;
    color: #fff !important;
    line-height: 60rpx !important;
    font-size: 24rpx !important;
    font-family: PingFang SC;
    font-weight: 400;
}
/* 收货 */
.istake-container {
    width: 628rpx;
    height: 704rpx;
    background: #fff;
    border-radius: 30rpx;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.istake-img {
    width: 100%;
    height: 364rpx;
    vertical-align: middle;
}
.istake-content {
    width: 100%;
    height: 238rpx;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 34rpx;
    color: #333333;
}
.is-read-content {
    width: 100%;
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
    display: flex;
    padding: 20rpx;
}
.is-read-img {
    width: 28rpx;
    height: 28rpx;
    margin-right: 16rpx;
}
.istake-bottom {
    width: 100%;
    height: 102rpx;
    border-top: 2rpx solid #f4f4f4;
    box-sizing: border-box;
    display: flex;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
}
.istake-btn {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 2rpx solid #f4f4f4;
    box-sizing: border-box;
}
.close-take {
    width: 40rpx;
    height: 40rpx;
    position: fixed;
    bottom: 14%;
    left: 50%;
    transform: translateX(-50%);
}
</style>
