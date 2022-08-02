<template>
    <view>
        <view class="confirm-order-page-root">
            <view class="me-fx-col me-fx-c top-address">
                <radio-group @change="radioChange">
                    <view class="me-fx-row me-fx-sb-c">
                        <label class="me-fx-row me-fx-start-c way-list" v-for="(item, index) in radioList" :key="index">
                            <radio :value="item.value" class="radio-elem" />

                            <view>{{ item.name }}</view>
                        </label>
                    </view>
                </radio-group>

                <!-- 物流、同城 -->
                <block v-if="orderTemplate == 1 || orderTemplate == 2">
                    <view class="me-fx-row me-fx-sb-c address-empty-box" v-if="!fullAddress" @tap="jumpAddressList">
                        <text class="sel-address-msg">请选择收货地址</text>
                        <image src="/static/pages/businessActivity/imgs/right-jiantou.png" class="right-jantou-img"></image>
                    </view>
                    <view class="me-fx-row me-fx-sb-c" v-else>
                        <image src="/static/pages/businessActivity/imgs/location-icon.png" class="location-img"></image>
                        <view class="me-fx-1 center-content">
                            <view>
                                <text class="user-name">{{ userShipping.contacts }}</text>
                                <text class="user-phone">{{ userShipping.contactWay }}</text>
                            </view>
                            <view class="address-text">{{ fullAddress }}</view>
                        </view>
                        <image src="/static/pages/businessActivity/imgs/pen-icon.png" class="pen-icon" @tap="jumpAddressList"></image>
                    </view>
                </block>

                <!-- 预订 -->
                <block v-if="orderTemplate == 3">
                    <view class="merchant-address">商家地址：{{ merchantAddress }}</view>
                    <view v-if="showBookTime" class="book-time" @tap="openSelDateTime">{{ showBookTime }}</view>
                    <view v-else class="book-time" @tap="openSelDateTime">请选择预订时间</view>
                </block>
            </view>

            <view class="goods-info">
                <view class="me-fx-row me-fx-sb">
                    <image :src="skuInfo.imageUrl" class="goods-img"></image>
                    <view class="me-fx-1 me-fx-col me-fx-sb">
                        <view class="goods-name">{{ goodsName }}</view>
                        <view class="me-fx-row me-fx-sb-c">
                            <text class="specification">规格：{{ skuInfo.skuName }}</text>
                            <text class="price">¥{{ skuInfo.livePrice }}</text>
                        </view>
                        <!-- <view class='me-fx-row me-fx-end'>
                    <add-subtract-num def-count='{{buyCount}}' bind:change='countChange'></add-subtract-num>
                </view> -->
                    </view>
                </view>
            </view>

            <view class="attr-list">
                <view class="me-fx-row me-fx-sb-c attr-item">
                    <text class="attr-name">总金额</text>
                    <text class="amount">¥{{ totalAmount }}</text>
                </view>
                <view class="me-fx-row me-fx-sb-c attr-item">
                    <text class="attr-name">总运费</text>
                    <text>包邮</text>
                </view>
                <view class="me-fx-row me-fx-sb-c attr-item">
                    <text class="attr-name">支付方式</text>
                    <text>微信</text>
                </view>
            </view>

            <view class="leave-message">
                <view>给商家留言</view>
                <textarea maxlength="30" :value="message" placeholder="30字以内" @input="messageChange" class="textarea"></textarea>
            </view>

            <view class="me-fx-row me-fx-sb-c floot-settlement">
                <view>
                    实付:
                    <text class="settlement-amount">¥{{ totalAmount }}</text>
                </view>
                <button class="settlement-btn" @tap="settlement">结算</button>
            </view>
        </view>

        <view v-if="showDateTime" class="me-fx-col me-fx-end datetime-picker-box">
            <van-datetime-picker
                type="datetime"
                :value="currentDate"
                :min-date="minDate"
                @input="onInput"
                @confirm="confirmDateTime"
                @cancel="cancelSelDateTime"
                title="选择日期时间"
            />
        </view>
    </view>
</template>

<script>
import addSubtractNum from '@/pages/Component/add-subtract-num/add-subtract-num';
// import vanDatetimePicker from './@vant/weapp/datetime-picker/index';
let app = getApp();
export default {
    components: {
        addSubtractNum,
        // vanDatetimePicker
    },
    data() {
        return {
            message: '',
            //留言
            totalAmount: 0,
            buyCount: 1,
            goodsName: '',
            activityId: '',
            //活动id
            commodityId: '',
            //商品id
            shareUserId: '',
            //分享用户id
            skuInfo: {
                imageUrl: '',
                skuName: '',
                livePrice: ''
            },
            //规格信息
            userShipping: {
                contacts: '',
                contactWay: ''
            },
            //地址信息
            fullAddress: '',
            //完整收货地址
            appid: '',
            merchantId: '',
            merchantAddress: '',
            //商家地址
            orderType: '',
            //商家支持的配送方式
            arriveTime: '',
            //预订时间
            orderTemplate: '',
            //订单模板 1.物流 2.同城 3.预订
            showDateTime: false,
            radioList: [],
            //配送方式列表
            minDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            showBookTime: '',
            isLocal: false //与商家是否在同一个城市
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var query = options.query || '';
        query = decodeURIComponent(query);
        query = JSON.parse(query);
        this.joinRadioList(query.orderType);
        var livePrice = query.skuInfo.livePrice;
        var buyCount = query.buyCount;
        var totalAmount = this.computedTotalAmount(livePrice, buyCount);
        var fullAddress = this.joinAddress(query.userShipping);
        this.setData({ ...query, totalAmount, fullAddress });
    },
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
                        this.getMerchantInfo();
                    }
                );
            }
        });
        uni.getStorage({
            key: 'appid',
            success: (res) => {
                this.setData({
                    appid: res.data
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
        jumpAddressList() {
            //跳转收货地址列表
            app.globalData.store.setState({
                from: 'submitOrder'
            });
            uni.navigateTo({
                url: '/pages/Address/AddressList/AddressList',
                events: {
                    addressChange: (data) => {
                        var shipping = data.shipping;
                        var fullAddress = this.joinAddress(shipping);
                        this.setData(
                            {
                                userShipping: shipping,
                                fullAddress
                            },
                            () => {
                                this.checkLocal(); //校验同城地址
                            }
                        );
                    }
                }
            });
        },

        checkLocal() {
            //校验同城地址
            var userShipping = this.userShipping;
            var merchantAddress = this.merchantAddress;
            var { provincesName, cityName, areaName } = userShipping;
            var res1 = merchantAddress.includes(provincesName);
            var res2 = merchantAddress.includes(cityName);
            var isLocal = res1 && res2;
            this.setData({
                isLocal
            });
        },

        joinRadioList(orderTemplate) {
            //组合配送方式列表
            orderTemplate = orderTemplate || '';
            var list = [
                {
                    name: '物流发货',
                    value: 1
                },
                {
                    name: '同城配送',
                    value: 2
                },
                {
                    name: '预定自取',
                    value: 3
                }
            ];
            var radioList = [];
            list.forEach((item) => {
                var bool = orderTemplate.includes(item.value);

                if (bool) {
                    radioList.push(item);
                }
            });
            this.setData({
                radioList
            });
        },

        radioChange(e) {
            var value = e.detail.value;
            this.setData({
                orderTemplate: value
            });
        },

        openSelDateTime() {
            var minDate = new Date().getTime();
            this.setData({
                showDateTime: true,
                minDate
            });
        },

        confirmDateTime(e) {
            //确定选择日期时间
            var detail = e.detail;
            var date = new Date(detail);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;

            if (month < 10) {
                month = '0' + month;
            }

            var dayNum = date.getDate();

            if (dayNum < 10) {
                dayNum = '0' + dayNum;
            }

            var hour = date.getHours();

            if (hour < 10) {
                hour = '0' + hour;
            }

            var minute = date.getMinutes();

            if (minute < 10) {
                minute = '0' + minute;
            }

            var showBookTime = `${year}年${month}月${dayNum}日${hour}时${minute}分`;
            var arriveTime = `${year}-${month}-${dayNum} ${hour}:${minute}:00`;
            this.setData({
                currentDate: detail,
                showBookTime,
                showDateTime: false,
                arriveTime
            });
        },

        cancelSelDateTime() {
            this.setData({
                showDateTime: false
            });
        },

        getMerchantInfo() {
            var data = {
                id: this.merchantId
            };
            app.globalData.sjrequest('/marchant/queryMarchantInfo', data).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    var merchantAddress = data.entirelyAddress;
                    this.setData(
                        {
                            merchantAddress
                        },
                        () => {
                            this.checkLocal(); //校验同城地址
                        }
                    );
                }
            });
        },

        settlement() {
            //结算
            if (this.activation) {
                return;
            }

            this.activation = true;
            setTimeout(() => {
                this.activation = null;
            }, 1500);
            var { userShipping, skuInfo, buyCount, merchantId, arriveTime, message, activityId, shareUserId, appid, commodityId, orderTemplate, isLocal } = this;

            if (!orderTemplate) {
                return uni.showToast({
                    title: '请选择配送方式',
                    icon: 'none'
                });
            }

            var reqData = {
                commodityId,
                //商品id,
                appId: appid,
                //appid
                merchantId: merchantId,
                //商家id
                activityId,
                //活动id
                amount: buyCount,
                //购买数量
                message,
                //用户留言
                skuId: skuInfo.skuId,
                //商品规格id
                orderType: orderTemplate //配送方式
            };

            if (shareUserId) {
                reqData.shareUserId = shareUserId;
            } //分享者id

            if (orderTemplate != 3 && !userShipping.id) {
                //除了预订 其他配送方式需要校验地址
                return uni.showToast({
                    title: '你还未添加收货地址',
                    icon: 'none'
                });
            } else {
                reqData.userHippingId = userShipping.id;
            }

            if (orderTemplate == 3) {
                //预订需要添加预订时间
                if (arriveTime) {
                    reqData.arriveTime = arriveTime;
                } else {
                    return uni.showToast({
                        title: '请选择预订时间',
                        icon: 'none'
                    });
                }
            }

            if (orderTemplate == 2 && !isLocal) {
                return uni.showToast({
                    title: '您的收货地址不在同城范围内',
                    icon: 'none'
                });
            }

            uni.showLoading({
                title: '生成订单',
                mask: true
            });
            app.globalData.sjrequest1('/activityOrderBusiness/wxPay', reqData).then((res) => {
                uni.hideLoading();

                if (res.statusCode == 200 && res.data.code == 0) {
                    var data = res.data.data;
                    var orderNumber = data.orderNo;
                    uni.requestPayment({
                        ...data,
                        success: (res) => {
                            const eventChannel = this.getOpenerEventChannel();
                            eventChannel.emit('uploadData');
                            uni.setStorage({
                                key: 'orderTemplate_key',
                                data: orderTemplate,
                                success: () => {}
                            });
                            this.subscribeMsg(orderNumber, () => {
                                uni.navigateBack();
                            });
                        }
                    });
                }
            });
        },

        subscribeMsg(orderNum, callback) {
            var appid = this.appid;

            if (appid) {
                return app.globalData
                    .sjrequest1('/subTemplate/listPriTemplateId', {
                        authorizerAppid: appid,
                        sceneTypes: [1, 3, 7]
                    })
                    .then((res) => {
                        if (res.statusCode == 200 && res.data.code == 200) {
                            return res.data.data;
                        }
                    })
                    .then((tempids) => {
                        uni.requestSubscribeMessage({
                            tmplIds: tempids,
                            success: (res) => {
                                if (res[tempids[0]] === 'accept') {
                                    app.globalData
                                        .sjrequest1('/subscription/add', [
                                            {
                                                marchantid: this.merchantId,
                                                appid: this.appid,
                                                templateid: tempids[0],
                                                targetid: orderNum,
                                                targettype: 6,
                                                status: 1
                                            },
                                            {
                                                marchantid: this.merchantId,
                                                appid: this.appid,
                                                templateid: tempids[1],
                                                targetid: this.activityId,
                                                targettype: 2,
                                                status: 1
                                            },
                                            {
                                                marchantid: this.merchantId,
                                                appid: this.appid,
                                                templateid: tempids[2],
                                                targetid: this.activityId,
                                                targettype: 2,
                                                status: 1
                                            }
                                        ])
                                        .then((res) => {
                                            if (res.statusCode == 200 && res.data.code == 0) {
                                                uni.showToast({
                                                    title: '订阅成功',
                                                    icon: 'none'
                                                });
                                            }
                                        });
                                }
                            },
                            complete: (res) => {
                                callback();
                            }
                        });
                    });
            }
        },

        countChange(e) {
            //购买数量改变
            var buyCount = e.detail.value;
            var totalAmount = this.totalAmount;
            var livePrice = this.skuInfo.livePrice;
            totalAmount = buyCount * livePrice;
            totalAmount = totalAmount.toFixed(2);
            totalAmount = Number(totalAmount);
            this.setData({
                buyCount,
                totalAmount
            });
        },

        computedTotalAmount(price, count) {
            //计算总金额
            var totalNum = price * count;
            totalNum = totalNum.toFixed(2);
            return Number(totalNum);
        },

        joinAddress(shipping) {
            //拼接收货地址
            var { provincesName, cityName, areaName, address } = shipping;
            return provincesName + cityName + areaName + address;
        },

        messageChange(e) {
            //输入留言
            var value = e.detail.value;
            this.setData({
                message: value
            });
        },

        onInput() {
            console.log('占位：函数 onInput 未声明');
        }
    }
};
</script>
<style>
page {
    background-color: #f1f1f1;
}

.confirm-order-page-root {
    padding-bottom: 140rpx;
}

/* 头部地址 */
.top-address {
    margin: 10rpx 0 20rpx;
    background-color: #fff;
    padding: 10rpx 30rpx;
    box-sizing: border-box;
    min-height: 128rpx;
    border-radius: 16rpx;
}
.top-address .way-list {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
}
.top-address .radio-elem {
    transform: scale(0.7);
}
.top-address .sel-address-msg {
    font-size: 28rpx;
    color: #acacac;
}
.top-address .right-jantou-img {
    width: 18rpx;
    height: 32rpx;
}
.top-address .pen-icon {
    width: 36rpx;
    height: 36rpx;
}
.top-address .location-img {
    width: 56rpx;
    height: 56rpx;
}
.top-address .center-content {
    margin: 0 20rpx;
}
.top-address .user-name {
    font-size: 28rpx;
    color: #000;
    font-weight: bold;
}
.top-address .user-phone {
    font-size: 24rpx;
    color: #acacac;
    margin-left: 16rpx;
}
.top-address .address-text {
    font-size: 24rpx;
    color: #0f0f0f;
}

.top-address .merchant-address {
    font-size: 28rpx;
    color: #333;
}
.top-address .book-time {
    font-size: 28rpx;
    color: #acacac;
    height: 70rpx;
    display: flex;
    align-items: center;
}

/* 商品信息 */
.goods-info {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
    width: 730rpx;
    margin: 0 auto;
}
.goods-info .goods-img {
    width: 220rpx;
    height: 220rpx;
    border-radius: 8rpx;
    background-color: #ccc;
    margin-right: 30rpx;
}
.goods-info .goods-name {
    font-size: 26rpx;
    color: #0f0f0f;
    font-weight: bold;
}
.goods-info .specification {
    font-size: 18rpx;
    color: #999;
    background-color: #e7e7e7;
    padding: 3rpx 10rpx;
    border-radius: 8rpx;
}
.goods-info .price {
    font-size: 30rpx;
    color: #eb1918;
    font-weight: bold;
}

/* 属性列表 */
.attr-list {
    background-color: #fff;
    width: 730rpx;
    margin: 20rpx auto;
    border-radius: 20rpx;
    padding: 10rpx 30rpx;
    box-sizing: border-box;
    font-size: 26rpx;
    font-weight: bold;
}
.attr-list .attr-item {
    height: 82rpx;
}
.attr-list .attr-item:not(:last-child) {
    border-bottom: 1rpx solid #e5e5e5;
}
.attr-list .attr-name {
    font-size: 30rpx;
    color: #000;
}
.attr-list .amount {
    color: #eb1918;
}
.attr-list .right-jiantou-img {
    width: 16rpx;
    height: 30rpx;
}

/* 留言 */
.leave-message {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    font-weight: bold;
    width: 730rpx;
    margin: 0 auto 10rpx;
}
.leave-message .textarea {
    width: 590rpx;
    height: 162rpx;
    font-size: 24rpx;
    margin-top: 20rpx;
}

/* 底部结算 */
.floot-settlement {
    background-color: #fff;
    font-size: 28rpx;
    color: #333;
    height: 132rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    z-index: 100;
}
.floot-settlement .settlement-amount {
    color: #eb1918;
}
.floot-settlement .settlement-btn {
    width: 180rpx;
    height: 88rpx;
    border-radius: 44rpx;
    background: linear-gradient(180deg, #f2180c 0%, #ea2610 100%);
    box-shadow: 0px 6px 12px rgba(235, 35, 15, 0.1);
    font-size: 30rpx;
    color: #fff;
    margin: 0;
    padding: 0;
    line-height: 88rpx;
    text-align: center;
}

.datetime-picker-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 500;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
