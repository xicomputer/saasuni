<template>
    <view>
        <view>
            <!-- 自定义tabs -->
            <van-sticky v-if="storeId == 0" style="display: none">
                <view class="tabs-custom" v-if="businessModelTake">
                    <view class="tabs-item" :style="'color:' + (orderType == 1 ? '#EB5E32' : '#333')" @tap="onChange" data-type="1" v-if="haveLogistics">
                        物流配送
                        <view class="active-state" v-if="orderType == 1"></view>
                    </view>
                    <view class="tabs-item" :style="'color:' + (orderType == 2 ? '#EB5E32' : '#333')" @tap="onChange" data-type="2" v-if="haveToCity">
                        同城配送
                        <view class="active-state" v-if="orderType == 2"></view>
                    </view>
                    <view class="tabs-item" :style="'color:' + (orderType == 3 ? '#EB5E32' : '#333')" @tap="onChange" data-type="3" v-if="haveToStore">
                        在线预订
                        <view class="active-state" v-if="orderType == 3"></view>
                    </view>
                </view>
            </van-sticky>
            <!-- 商家配送头部信息 -->
            <view class="ps_head" v-if="!(orderType != 1 && orderType != 2)">
                <view class="ps_head_box" @tap="selectAddreee">
                    <view class="ps_head_left" v-if="!submitObj.shipping">暂未获取到收货地址</view>
                    <view class="ps_head_left" v-else>
                        <view class="ps_head_left_item">{{ submitObj.shipping.provincesName }}{{ submitObj.shipping.cityName }}{{ submitObj.shipping.areaName }}</view>
                        <view class="ps_head_left_item_addressDetail">
                            {{ submitObj.shipping.provincesName }}{{ submitObj.shipping.cityName }}{{ submitObj.shipping.areaName }}{{ submitObj.shipping.address }}
                        </view>
                        <view class="ps_head_left_item">
                            <text>{{ submitObj.shipping.contacts }}</text>
                            <text style="padding-left: 10rpx"></text>
                        </view>
                    </view>
                    <image class="ps_head_right" src="/static/pages/img/my/enter.png" />
                </view>
                <image class="ps_head_image" src="/static/pages/img/order/address-border.png" />
            </view>
            <!-- 门店团购头部信息 -->
            <view class="zq_head" v-if="orderType == 3">
                <view class="zq_head_box">
                    <view class="zq_head_title">
                        <text style="font-weight: bold">{{ submitObj.marchantName }}</text>
                        <view @tap="addCopy">
                            <image src="/static/pages/img/order/copy.png" />
                            复制地址
                        </view>
                    </view>
                    <view @tap="selectAddress" class="zq_head_content">
                        <view class="zq_head_content_title" style="white-space: nowrap">商家地址</view>
                        <view class="zq_head_content_desc">
                            <view class="zq_head_content_desc_address">{{ selectedAress.address }}</view>
                            <image class="imgEnter" src="/static/pages/img/my/enter.png" />
                        </view>
                    </view>
                    <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                        <view class="zq_head_content">
                            <view class="zq_head_content_title">
                                <text>团购时间</text>
                                <text style="color: red">(只支持门店团购/自取)</text>
                            </view>
                            <view class="zq_head_content_desc">
                                <text :style="'display:' + showTimeText">
                                    {{ multiArray[0][multiIndex[0]] }}{{ multiArray[1][multiIndex[1]] && multiArray[1][multiIndex[1]] + ':00' }}
                                </text>
                                <text style="color: #666666" :style="'display:' + showTime + ';white-space:nowrap'">请选择消费时间</text>
                                <image :style="'display:' + showTime + ';'" src="/static/pages/img/my/enter.png" />
                            </view>
                        </view>
                    </picker>
                    <view class="zq_head_content">
                        <view class="zq_head_content_title">预留手机</view>
                        <input @blur="bindconfirmIphone" class="zq_head_content_desc" maxlength="11" :value="iphoneValue" />
                    </view>
                </view>
                <image class="ps_head_image" src="/static/pages/img/order/address-border.png" />
            </view>
            <!-- 商品信息 -->
            <view class="goods_box">
                <navigator :url="'/pages/shopHome/home/home?marchantId=' + submitObj.marchantId" class="goods_shop">
                    <image class="goods_shop_image" :src="cartShop.headImage" />
                    <view class="goods_shop_text">{{ cartShop.appName }}</view>
                </navigator>
                <view class="goods">
                    <view class="goods_item" v-for="(item, index) in submitObj.commList" :key="item.commodityId">
                        <image class="goods_left" :src="item.thumbnail" />

                        <view class="goods_right">
                            <view class="goods_title">{{ item.commodityName }}</view>
                            <view class="goods_spec">规格：{{ item.itemText }}</view>
                            <view class="goods_price">
                                <view class="goods_money">￥{{ item.lowPrice }}</view>
                                <view class="goods_number">
                                    <view class="goods_number_item" @tap="editNumber" :data-num="-1" :data-index="index">-</view>
                                    <view class="goods_number_item">{{ item.amount }}</view>
                                    <view class="goods_number_item" @tap="editNumber" :data-num="1" :data-index="index">+</view>
                                </view>
                            </view>
                            <view class="goods_tips">
                                <view class="goods_tips_item" v-for="(tipItem, index1) in item.labelsList" :key="index1">
                                    {{ tipItem }}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 商品金额、退款、配送方式、优惠 -->
            <view class="desc-list">
                <!-- <view class="item">
            <view class="title">商品金额</view>
            <view class="desc desc-active-price">￥{{submitObj.subtotals}}</view>
        </view> -->
                <!-- 退款、配送方式只有商家配送才有 -->
                <block v-if="orderType == 1 || orderType == 2">
                    <!-- <view class="item" wx:if="{{orderType==1}}">
                <view class="title">退款</view>
                <view class="desc desc-active">{{submitObj.isSupportRefund?'七天无理由退货':'不支持退款'}}</view>
            </view> -->
                    <view class="item">
                        <view class="title">运费</view>
                        <view class="desc desc-active">{{ submitObj.totalFreightmoney }}</view>
                    </view>
                </block>
                <view class="item" @tap="showSaleFun">
                    <view class="title">
                        优惠
                        <text class="sale_money" v-if="deduct">省{{ deduct }}元：优惠券</text>
                    </view>
                    <!-- {{selectedSaleText}} -->
                    <view class="desc">
                        <view class="text2" v-if="deduct">-￥{{ deduct }}元</view>
                        <view class="text" v-else>{{ selectedSaleText }}</view>
                        <image class="img" src="/static/pages/img/my/enter.png" />
                    </view>
                </view>
            </view>
            <!-- 支付方式、发票、留言 -->
            <view class="desc-list">
                <view class="item">
                    <view class="title">支付方式</view>
                    <view class="desc">
                        <view class="text">微信支付</view>
                        <image class="img" src="/static/pages/img/my/enter.png" />
                    </view>
                </view>
                <view class="item">
                    <view class="title">发票</view>
                    <view class="desc" @tap="selectInvoice">
                        <view class="text" v-if="!submitObj.invoice">不开发票</view>
                        <view class="text" v-else>{{ submitObj.invoice.companyName }}</view>
                        <image class="img" src="/static/pages/img/my/enter.png" />
                    </view>
                </view>
                <view class="item">
                    <view class="title">留言</view>
                    <input class="input" :value="message" maxlength="50" @input="bindMessage" placeholder="50字内" />
                </view>
            </view>
            <!-- 消息订阅 -->
            <view class="subscription-box">
                <view class="subscription">
                    <view class="subscription-title">微信消息订阅（如果取消订阅，将通过系统消息通知）</view>
                    <view class="subscription-descBox">
                        <view class="subscription-desc">订阅商品及物流动态（含消息推送，下单通知，发货通知等）便于您及时跟踪商品动态</view>
                    </view>
                </view>
            </view>
            <view style="height: 160rpx; background: #f2f2f2"></view>
            <!-- 底部 -->
            <view class="footer">
                <view class="footer_total">
                    <view class="footer-top-box">
                        <view class="footer_total_text">
                            <text style="font-size: 32rpx">￥</text>
                            {{ submitObj.totalSum }}
                        </view>
                    </view>
                    <view class="footer-top-bottom" v-if="submitObj.discountscx > 0 || submitObj.discountshy || submitObj.totalCouponsmoney > 0">
                        <view class="footer-top-bottom-item" v-if="submitObj.discountscx > 0">促销优惠￥{{ submitObj.discountscx }}</view>
                        <view class="footer-top-bottom-item" v-if="submitObj.discountshy > 0">会员优惠￥{{ submitObj.discountshy }}</view>
                        <view class="footer-top-bottom-item" v-if="submitObj.totalCouponsmoney > 0">优惠券优惠￥{{ submitObj.totalCouponsmoney }}</view>
                    </view>
                </view>
                <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                    <view class="zq_head_content">
                        <view class="zq_head_content_desc" style="font-size: 22rpx">
                            <text :style="'display:' + showTimeText">
                                {{ multiArray[0][multiIndex[0]] }}{{ multiArray[1][multiIndex[1]] && multiArray[1][multiIndex[1]] + ':00' }}
                            </text>
                            <text style="color: #666666; font-size: 22rpx; width: 120rpx" :style="'display:' + showTime + ';white-space:nowrap'">请选择消费时间</text>
                            <image :style="'display:' + showTime + ';'" src="/static/pages/img/my/enter.png" />
                        </view>
                    </view>
                </picker>
                <image class="footer_btn_image" @tap="tjdd" src="/static/pages/img/my/tjddbtn.png" />
            </view>
        </view>
        <!-- 绑定手机号 -->
        <!-- <van-popup show="{{ showTel }}" bind:close="closeTel" round closeable>
    <view class="bind-tel-container">
        <image style="width:225rpx;height:237rpx;margin-top:110rpx" src="https://xssj.letterbook.cn/applet/images/ipone.png"></image>
        <view class="bind-tel-text">请先绑定手机号，方便及时获取订单消息!</view>
        <view class="bind-btn-box">
            <button class="bind-btn" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">立即绑定</button>
        </view>
    </view>
</van-popup> -->
        <!-- 优惠券 -->
        <van-popup :show="showSale" @close="closeSale" round closeable position="bottom">
            <view class="sale-box">
                <view class="sale-title">优惠券</view>
                <view class="sale-type-box">
                    <view @tap="canUse" :class="active == 0 ? 'sale-type-title-active sale-type-title' : 'sale-type-title'">
                        可用优惠券({{ submitObj.usableCouponsList.length }})
                    </view>
                    <view @tap="nocanUse" :class="active == 1 ? 'sale-type-title-active sale-type-title' : 'sale-type-title'">
                        不可用优惠券({{ submitObj.unusableCouponsList.length }})
                    </view>
                </view>
                <scroll-view v-if="active == 0" :scroll-y="true" class="scroll-box">
                    <view class="sale-list">
                        <view
                            class="sale-item"
                            @tap="selectSale"
                            :data-index="index"
                            style="background-image: url(https://xssj.letterbook.cn/applet/images/sale_bg_sub.png); background-size: 100% 173rpx; background-repeat: no-repeat"
                            v-for="(item, index) in submitObj.usableCouponsList"
                            :key="index"
                        >
                            <view class="coupon-left">
                                <view>￥{{ item.deduct }}</view>
                                <view style="font-size: 24rpx; margin-left: 18rpx">满{{ item.confine }}元使用</view>
                            </view>

                            <view class="coupon-right">
                                <view class="coupon-title">{{ item.couponName }}</view>
                                <view class="coupon-time">截止日期：{{ item.endTime }}</view>
                                <view class="coupon-state">可使用</view>
                            </view>
                        </view>
                        <!-- 没数据 -->
                        <view class="no-coupon-use" v-if="submitObj.usableCouponsList.length == 0">
                            <image style="width: 100%; height: 440rpx" src="/static/pages/img/no_notice.png"></image>
                            暂无可用优惠券
                        </view>
                    </view>
                </scroll-view>
                <scroll-view v-if="active == 1" :scroll-y="true" class="scroll-box">
                    <view class="sale-list">
                        <view
                            class="sale-item"
                            @tap="selectSale"
                            :data-index="index"
                            style="
                                background-image: url(https://xssj.letterbook.cn/applet/images/sale_bg_sub.png);
                                background-size: 100% 173rpx;
                                background-repeat: no-repeat;
                                filter: grayscale(100%);
                            "
                            v-for="(item, index) in submitObj.unusableCouponsList"
                            :key="index"
                        >
                            <view class="coupon-left">
                                <view>￥{{ item.deduct }}</view>
                                <view style="font-size: 24rpx; margin-left: 18rpx">满{{ item.confine }}元使用</view>
                            </view>

                            <view class="coupon-right">
                                <view class="coupon-title">{{ item.couponName }}</view>
                                <view class="coupon-time">截止日期：{{ item.endTime }}</view>
                                <view class="coupon-state">{{ item.isemploy == 1 ? '未达到满减条件' : '已过期' }}</view>
                            </view>

                            <image v-if="item.isemploy == 3" class="yhq-img" src="/static/pages/img/order/yhq_overtime.png"></image>
                        </view>

                        <!-- 没数据 -->
                        <view class="no-coupon-use" v-if="submitObj.unusableCouponsList.length == 0">
                            <image style="width: 100%; height: 440rpx" src="/static/pages/img/no_notice.png"></image>
                            暂无不可用优惠券
                        </view>
                    </view>
                </scroll-view>
            </view>
        </van-popup>
        <!-- 自取地址 -->
        <van-popup :show="showAddressList" @close="closeAddressList" round closeable position="bottom">
            <view class="address-list-pop">
                <view class="address-item" @tap="comfirmAddress" :data-idx="index" v-for="(item, index) in addressList" :key="index">
                    <view class="store-name">{{ item.shopName }}</view>

                    <view class="contact-container">
                        <view class="contact-name">联系人:{{ item.contact }}</view>
                        <view class="contact-tel">{{ item.contactWay }}</view>
                    </view>

                    <view class="address-box">
                        <image class="addressIcon" src="/static/pages/img/order/addressIcon.png"></image>
                        {{ item.address }}
                    </view>
                </view>
            </view>
        </van-popup>
        <view class="bg_nocity" v-if="nocityFlag" @tap="closeBgNocity">
            <image class="nocity_img" src="/static/pages/order/imgs/noCity.png"></image>
            <image class="nocity_close_img" src="/static/pages/static/close.png"></image>
        </view>
    </view>
</template>

<script>
// import vanOverlay from './@vant/weapp/overlay/index';
// import vanPopup from './@vant/weapp/popup/index';
// import vanTab from './@vant/weapp/tab/index';
// import vanTabs from './@vant/weapp/tabs/index';
// import vanPicker from './@vant/weapp/picker/index';
// import vanSticky from './@vant/weapp/sticky/index';
// import vanActionSheet from './@vant/weapp/action-sheet/index';
// pages/order/submitOrder/submitOrder.js
const time = require('../../../utils/util');

const app = getApp();
export default {
    components: {
        // vanOverlay,
        // vanPopup,
        // vanTab,
        // vanTabs,
        // vanPicker,
        // vanSticky,
        // vanActionSheet
    },
    data() {
        return {
            showTel: false,

            // 手机
            showSale: false,

            //优惠
            submitObj: {
                shipping: {
                    provincesName: '',
                    cityName: '',
                    areaName: '',
                    address: '',
                    contacts: ''
                },

                marchantName: '',
                marchantId: '',
                commList: [],
                totalFreightmoney: '',

                invoice: {
                    companyName: ''
                },

                discountscx: 0,
                discountshy: '',
                totalCouponsmoney: 0,
                usableCouponsList: [],
                unusableCouponsList: []
            },

            active: 0,
            personnel: 0,
            agentUserId: '',
            haveToStore: false,

            // 有门店团购
            haveLogistics: false,

            // 有物流配送
            haveToCity: false,

            // 有同城配送
            salesUserId: 0,

            arrivalsTime: '选择时间',

            // 到店时间
            contacts: '',

            // 联系人
            contactWay: '',

            // 手机号
            message: '',

            // 留言,
            selectedSaleText: '未使用优惠券',

            couponsId: 0,

            //优惠id
            optionsList: {},

            show: false,
            minDate: new Date(2010, 0, 1).getTime(),
            maxDate: new Date(2010, 0, 31).getTime(),
            orderType: 1,

            // 1 物流配送  2同城配送  3门店团购
            columnsTake: [],

            timeTake: '',
            multiArray: [[''], ['']],
            multiIndex: [0, 0, 0],
            todayList: [],
            normalList: [],
            date: '',
            index: 0,
            showTime: 'block',
            showTimeText: 'none',
            businessModelTake: false,

            //  tab是否显示
            iphoneValue: null,

            openingTime: '',
            multiArrayNow: '',
            addressList: [],

            // 自取收货地址列表
            showAddressList: false,

            selectedAress: {
                address: ''
            },

            // 选中的地址,
            AddresInfo: {},

            storeId: 0,

            cartShop: {
                headImage: '',
                appName: ''
            },

            nocityFlag: false,
            deduct: 0,
            useStore: true,
            TimeID: -1,
            TimeShow: false,
            time: '',
            region: '',
            tipItem: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            cartShop: { ...app.globalData.setInfo }
        });
        this.setData({
            optionsList: options
        });
        let userInfo = uni.getStorageSync('zl_userInfo');
        this.setData({
            storeId: options.storeId,
            orderType: options.orderType ? options.orderType : '1'
        });
        let phone = userInfo.data.data.phoneNumber;

        if (phone == undefined) {
            this.setData({
                showTel: true
            });
        }

        this.setData({
            personnel: options.personnel,
            agentUserId: options.agentUserId,
            salesUserId: options.salesUserId
        });
        let { submitObj } = app.globalData.store.getState();

        if (submitObj) {
            submitObj = JSON.parse(submitObj);

            if (submitObj.shipping == null) {
                let that = this; // wx.chooseAddress({
                //   success (res) {
                //     let data = {address:res.detailInfo,contacts:res.userName,contactWay:res.telNumber,provincesName:res.provinceName,cityName:res.cityName,areaId:res.postalCode,areaName:res.countyName,isDefault:1
                //     }
                //     wx.showLoading({ title: '保存中', mask: true });
                //     app.sjrequest('/commodity/addShipping',data).then(res=>{
                //       let shiping={...data,id:res.data.data.id}
                //       submitObj.shipping = shiping
                //       that.setData({ submitObj:submitObj })
                //       wx.hideLoading()
                //     })
                //   }
                // })
            }

            if (submitObj.phoneNumber) {
                this.setData({
                    iphoneValue: submitObj.phoneNumber
                });
            }

            submitObj.businessModel.sort();

            if (submitObj.businessModel.length > 1) {
                // 有tabbar栏
                this.setData({
                    businessModelTake: true // orderType:submitObj.businessModel[0]
                });
            } else {
            }

            if (submitObj.businessModel.indexOf('3') != -1) {
                // 门店团购
                this.setData({
                    haveToStore: true,
                    addressList: submitObj.mustaddressList,
                    selectedAress: submitObj.mustaddressList ? submitObj.mustaddressList[0] : ''
                });
            }

            if (submitObj.businessModel.indexOf('1') != -1) {
                // 物流配送
                this.setData({
                    haveLogistics: true
                });
            }

            if (submitObj.businessModel.indexOf('2') != -1) {
                // 同城配送
                this.setData({
                    haveToCity: true
                });
            }

            if (submitObj.unusableCouponsList.length) {
                submitObj.unusableCouponsList.forEach((item) => {
                    item.endTime = time.formatTimeSec(item.endTime);
                });
            }

            if (submitObj.usableCouponsList.length) {
                submitObj.usableCouponsList.forEach((item) => {
                    item.endTime = time.formatTimeSec(item.endTime);
                });
            }

            let data = this.multiArray;
            let cstart = submitObj.openingTime ? parseInt(submitObj.openingTime.substr(0, 2)) : '08';
            let cend = submitObj.closingTime ? parseInt(submitObj.closingTime.substr(0, 2)) : '20';
            let cstart2 = app.globalData.formatTime(new Date(), '小时') - 1 + 2;
            console.log(cstart, cend, cstart2);
            data[1] = this.get7day('小时', {
                // 选择时间在开店时间和关店时间内
                start: cstart,
                end: cend - 0 || 24
            });
            console.log(data, data[1]);
            this.setData({
                normalList: data[1]
            });

            if (cstart2 < cstart) {
                // 现在时间小于开店时间
                data[0] = this.get7day(1);
                this.TimeShow = true;
            } else if (cstart2 < cend) {
                // 现在时间在营业时间
                data[0] = this.get7day(1);
                data[1] = this.get7day('小时', {
                    start: cstart2 || 8,
                    end: cend - 0 || 24
                });
            } else if (cstart2 >= cend) {
                // 现在时间大于关店时间
                data[0] = this.get7day(1);
                data[0].shift();
            } //data[2] = this.get7day('分')

            this.setData({
                todayList: data[1],
                multiArray: data,
                multiArrayNow: JSON.stringify(data),
                submitObj,
                openingTime: cstart
            }); //console.log(this.data.submitObj)
            // 1 配送消费 2 店内消费 3 预定

            let title = '填写订单';
            uni.setNavigationBarTitle({
                title: title
            });
        }

        if (submitObj.usableCouponsList.length) {
            let res = submitObj.usableCouponsList.sort((a, b) => {
                return b.deduct - a.deduct;
            });
            this.setData({
                selectedSaleText: res[0].couponName,
                couponsId: res[0].id,
                deduct: res[0].deduct
            });
            this.changeNum(res[0].id);
        }
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
    methods: {
        addCopy() {
            let address = this.selectedAress.address;
            uni.setClipboardData({
                data: address,

                success(res) {
                    uni.getClipboardData({
                        success(resc) {
                            console.log(resc.data); // data
                        }
                    });
                }
            });
        },

        get7day(t, obj) {
            if (t == '小时') {
                let { start, end } = obj;
                let time = [];
                end = end || 24;
                start = start || 0;

                for (let i = start; i <= end; i++) {
                    let s = i;

                    if (i == 24) {
                        s = 0;
                    }

                    if (i < 10 && i != 0) {
                        s = '0' + i;
                    }

                    time.push('' + s);
                }

                return time;
            }

            if (t == '分') {
                let time = [];

                for (let i = 0; i < 60; i++) {
                    let s = i;

                    if (i < 10) {
                        s = '0' + i;
                    }

                    time.push('' + s);
                }

                return time;
            }

            if (t == 1) {
                let day = [];
                let j = 0;

                for (let i = 0; i < 7; i++) {
                    let ts = new Date().getTime() + (i + j) * 24 * 3600 * 1000;
                    ts = app.globalData.formatTime(new Date(ts), '月');
                    day.push(ts.split(' ')[0] + '日');
                }

                return day;
            }
        },

        bindMultiPickerChange: function (e) {
            this.setData({
                multiIndex: e.detail.value,
                showTime: 'none',
                showTimeText: 'inline-table'
            });
        },

        bindMultiPickerColumnChange(e) {
            console.log('----');
            console.log(e);

            if (e.detail.column == 0 && e.detail.value == 0) {
                this.multiArray[1] = this.todayList;
                this.setData({
                    multiArray: this.multiArray
                });
            } else if (e.detail.column == 0 && e.detail.value > 0) {
                this.multiArray[1] = this.normalList;
                this.setData({
                    multiArray: this.multiArray
                });
            }
        },

        bindDateChange: function (e) {
            this.setData({
                date: e.detail.value
            });
        },

        bindTimeChange: function (e) {
            this.setData({
                time: e.detail.value
            });
        },

        bindRegionChange: function (e) {
            this.setData({
                region: e.detail.value
            });
        },

        onChange(e) {
            this.setData({
                orderType: e.currentTarget.dataset.type
            });
            this.changeNum();

            if (uni.pageScrollTo) {
                uni.pageScrollTo({
                    scrollTop: 0
                });
            }
        },

        onSelectTake(event) {
            console.log(event.detail);
            this.setData({
                timeTake: event.detail.name
            });
        },

        onDisplay() {
            this.setData({
                show: true
            });
        },

        onClose() {
            this.setData({
                show: false
            });
        },

        // 编辑数量
        editNumber(e) {
            const { num, index } = e.currentTarget.dataset;
            let { submitObj } = this;

            if (submitObj.commList[index].amount == 1 && num === -1) {
                uni.showToast({
                    title: '数量不能小于1',
                    icon: 'none'
                });
                return;
            }

            submitObj.commList[index].amount += num;
            this.setData({
                submitObj
            });
            this.changeNum();
        },

        changeNum(e) {
            let that = this;
            let submitObj = this.submitObj;
            let commList = this.submitObj.commList;
            let commoditys = [];
            commList.forEach((item) => {
                commoditys.push({
                    commodityId: item.commodityId,
                    tempSpecId: item.tempSpecId,
                    amount: item.amount
                });
            });
            let cshppingId = 0;
            console.log(this.orderType);

            if (this.orderType != 3) {
                cshppingId = (submitObj.shipping && submitObj.shipping.id) || (submitObj.shipping && submitObj.shipping.shippingId);
            }

            let data = {
                marchantId: this.submitObj.marchantId,
                shppingId: cshppingId,
                orderType: this.orderType,
                commoditys
            };
            console.log(this.submitObj);

            if (e) {
                data.couponsId = e;
            } else {
                this.setData({
                    selectedSaleText: '未使用优惠券'
                });
            }

            console.log(data);
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest1('/order/onekeyAboutOrder', data, token).then((res) => {
                if (res.data.code === 200) {
                    // 更新 store 数据
                    app.globalData.store.setState({
                        submitObj: JSON.stringify(res.data.data)
                    });

                    if (res.data.data.unusableCouponsList.length) {
                        res.data.data.unusableCouponsList.forEach((item) => {
                            item.endTime = time.formatTimeSec(item.endTime);
                        });
                    }

                    if (res.data.data.usableCouponsList.length) {
                        res.data.data.usableCouponsList.forEach((item) => {
                            item.endTime = time.formatTimeSec(item.endTime);
                        });
                    }

                    this.setData({
                        submitObj: res.data.data
                    });
                }
            });
        },

        // 获取当前时间
        getCurrentDate() {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;

            if (m < 10) {
                m = '0' + m;
            } else {
                m = m;
            }

            var d = date.getDate();

            if (d < 10) {
                d = '0' + d;
            } else {
                d = d;
            }

            var h = date.getHours();

            if (h < 10) {
                h = '0' + h;
            } else {
                h = h;
            }

            var minute = date.getMinutes();
            var second = date.getSeconds();

            if (minute < 10) {
                minute = '0' + minute;
            } else {
                minute = minute;
            }

            if (second < 10) {
                second = '0' + second;
            } else {
                second = second;
            }

            return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;
        },

        // 到店时间
        handleDateChange(e) {
            // console.log(e)
            this.setData({
                arrivalsTime: e.detail.dateString
            });
        },

        // 联系人
        bindContacts(e) {
            this.setData({
                contacts: e.detail.value.trim()
            });
        },

        canUse() {
            this.setData({
                active: 0
            });
        },

        nocanUse() {
            this.setData({
                active: 1
            });
        },

        // 手机号
        bindContactWay(e) {
            this.setData({
                contactWay: e.detail.value.trim()
            });
        },

        getPhoneNumber: function (e) {
            let that = this;

            if (e.detail.errMsg == 'getPhoneNumber:ok') {
                //校验是否过期
                uni.checkSession({
                    success: function () {
                        // session_key 未过期，并且在本生命周期一直有效
                        that.gettel(e); //获取手机号
                    }
                });
            } else {
                uni.showModal({
                    title: '提示',
                    content: '需同意授权才可获取手机号码'
                });
            }
        },

        gettel: function (e) {
            let that = this;
            let iv = e.detail.iv;
            let encryptedData = e.detail.encryptedData;
            let sessionkey = uni.getStorageSync('sessionkey');
            let token = uni.getStorageSync('token');
            let appid = uni.getStorageSync('appid');
            let openid = uni.getStorageSync('openId1');
            let data = {
                appid: appid,
                openid: openid,
                iv: iv,
                encryptedData: encryptedData
            };
            app.globalData.sjrequest('/thirdWxLogin/deciphering', data).then((res) => {
                let userInfo = uni.getStorageSync('zl_userInfo');
                userInfo.data.data.phoneNumber = res.data;
                uni.setStorageSync('zl_userInfo', userInfo); // console.log(res,"3333333"); //手机号在这里面哦

                that.setData({
                    showTel: false
                });

                if (res.data.code == 200) {
                    uni.showToast({
                        title: '绑定成功',
                        icon: 'none'
                    });
                } else {
                    uni.showToast({
                        title: '绑定成功',
                        icon: res.data.msg
                    });
                }
            });
        },

        closeTel() {
            this.setData({
                showTel: false
            });
        },

        closeSale() {
            this.setData({
                showSale: false
            });
        },

        // 留言
        bindMessage(e) {
            this.setData({
                message: e.detail.value.trim()
            });
        },

        // 跳转收货地址
        selectAddreee() {
            app.globalData.store.setState({
                from: 'submitOrder'
            });
            uni.navigateTo({
                url: '/pages/Address/AddressList/AddressList'
            });
        },

        // 跳转发票列表
        selectInvoice() {
            app.globalData.store.setState({
                from: 'submitOrder'
            });
            uni.navigateTo({
                url: '/pages/Invoice/InvoiceList/InvoiceList'
            });
        },

        //优惠券
        showSaleFun() {
            if (!this.submitObj.usableCouponsList.length && !this.submitObj.unusableCouponsList.length) {
                uni.showToast({
                    title: '暂无优惠',
                    icon: 'none'
                });
                return;
            }

            if (!this.submitObj.shipping && this.orderType != 3) {
                uni.showToast({
                    title: '请先选择地址',
                    icon: 'none'
                });
                return;
            }

            this.setData({
                showSale: true
            });
        },

        selectSale(e) {
            if (this.active) {
                return;
            }

            let index = e.currentTarget.dataset.index;
            this.setData({
                selectedSaleText: this.submitObj.usableCouponsList[index].couponName,
                couponsId: this.submitObj.usableCouponsList[index].id,
                deduct: this.submitObj.usableCouponsList[index].deduct,
                showSale: false
            }); // console.log(this.data.selectedSaleText)

            this.changeNum(this.submitObj.usableCouponsList[index].id);
        },

        // 提交订单
        tjdd: function () {
            if (this.emitSub) {
                return;
            }

            this.emitSub = true;
            setTimeout(() => {
                this.emitSub = false;
            }, 3000);
            var that = this;
            var rold = this;

            if (that.orderType != 3) {
                if (!that.submitObj.shipping) {
                    that.selectAddreee();
                    that.TimeID = -1;
                    return;
                }

                let soj = that.submitObj;
                let provinces = soj.entirelyAddress.indexOf(soj.shipping.provincesName);
                let city = soj.entirelyAddress.indexOf(soj.shipping.cityName);

                if (that.orderType == 2 && (provinces == -1 || city == -1)) {
                    that.setData({
                        nocityFlag: true
                    });
                    that.TimeID = -1;
                    return;
                }
            }

            let postFn = '/order/submitReserveOrder';
            const parmas = {
                marchantId: that.submitObj.marchantId,
                paymentWay: 2,
                message: that.message,
                commoditys: [],
                orderType: that.orderType
            };
            that.submitObj.commList.forEach((el) => {
                if (that.salesUserId != 0) {
                    parmas.commoditys.push({
                        commodityId: el.commodityId,
                        tempSpecId: el.tempSpecId,
                        amount: el.amount,
                        salesUserId: parseInt(that.salesUserId)
                    });
                } else {
                    parmas.commoditys.push({
                        commodityId: el.commodityId,
                        tempSpecId: el.tempSpecId,
                        amount: el.amount
                    });
                }
            });

            if (!!that.submitObj.invoice) {
                //选择了发票
                parmas.invoice = {};
                parmas.invoice.companyName = that.submitObj.invoice.companyName;
                parmas.invoice.companyDp = that.submitObj.invoice.companyDp;
                parmas.invoice.email = that.submitObj.invoice.email;
            }

            postFn = '/order/submitCityOrder';

            if (that.couponsId > 0) {
                parmas.couponsId = that.couponsId;
            }

            if (that.orderType != 3) {
                parmas.shippingId = that.submitObj.shipping.shippingId || that.submitObj.shipping.id;
            }

            if (that.submitObj.commList[0].skuId) {
                // 秒杀
                postFn = '/seckill/submitOrder';
                parmas.commoditys.forEach((item, index) => {
                    item.tempSpecId = that.submitObj.commList[index].skuId;
                });
            } // 使用社交token

            uni.showLoading({
                title: '加载中...'
            });
            const token = uni.getStorageSync('token');

            if (that.personnel != 0) {
                parmas.saleUniqueId = that.personnel;
            }

            if (that.agentUserId != '') {
                parmas.agentUserId = that.agentUserId;
            }

            if (that.orderType == 3) {
                let submitObj = that.submitObj;

                if (submitObj.shipping) {
                    parmas.reservedPhone = that.iphoneValue;
                }

                parmas.shippingId = 0;
                let date = that.multiArray;
                let ide = that.multiIndex;
                let str = date[0][ide[0]] + date[1][ide[1]];
                let strd = new Date().getFullYear() + '/' + str.replace('月', '/');
                parmas.arrivalsTime = strd.replace('日', ' ');
                parmas.shippingAddress = JSON.stringify({
                    shopName: that.selectedAress.shopName,
                    contact: that.selectedAress.contact,
                    contactWay: that.selectedAress.contactWay,
                    address: that.selectedAress.address
                });

                if (that.showTime !== 'none') {
                    uni.showToast({
                        title: '请选择自取时间',
                        icon: 'none',
                        duration: 2000,
                        success: (res) => {
                            that.TimeID = -1;
                        }
                    });
                    return false;
                }

                let iphoneValue = that.iphoneValue;

                if (!iphoneValue) {
                    uni.showToast({
                        title: '请输入手机号码',
                        icon: 'none',
                        duration: 2000,
                        success: (res) => {
                            that.TimeID = -1;
                        }
                    });
                    return false;
                }
            }

            app.globalData.sjrequest1(postFn, parmas, token).then((res) => {
                uni.hideLoading();

                if (res.data.code === 200) {
                    let merchantId = uni.getStorageSync('merchantId');
                    let appid = uni.getStorageSync('appid');
                    let orderNumber = res.data.data.orderNumber;
                    var postData = {
                        marchantId: merchantId,
                        appid: appid,
                        time_expire: res.data.data.time_expire,
                        uniqueId: res.data.data.uniqueId,
                        orderNumber: orderNumber,
                        payPlatform: 'JSAPI',
                        paymentWay: 2,
                        body: that.submitObj.marchantName
                    };

                    if (parmas.orderType) {
                        postData.orderType = parmas.orderType;
                    }

                    app.globalData.sjrequest('/order/paymentOrder', postData, token).then((res1) => {
                        if (res1.data.code === 200) {
                            app.globalData.store.setState({
                                from: 'submitOrder'
                            });
                            var that = that;
                            uni.showLoading({
                                title: '请稍等...'
                            });
                            uni.requestPayment({
                                appId: res1.data.data.appId,
                                nonceStr: res1.data.data.nonceStr,
                                // 支付签名随机串，不长于 32 位
                                package: res1.data.data.package,
                                // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                signType: res1.data.data.signType,
                                // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                timeStamp: res1.data.data.timeStamp,
                                // 支付签名时间戳，
                                paySign: res1.data.data.paySign,
                                // 支付签名
                                success: function (wxres) {
                                    uni.hideLoading();
                                    let appid = uni.getStorageSync('appid');
                                    let data = {
                                        authorizerAppid: appid,
                                        sceneTypes: [1, 2, 3]
                                    };
                                    app.globalData.mb2request('/subTemplate/listPriTemplateId', data).then((res) => {
                                        let tempData = res.data.data;
                                        uni.requestSubscribeMessage({
                                            tmplIds: res.data.data,
                                            success: function (res) {
                                                uni.getSetting({
                                                    withSubscriptions: true,

                                                    success(res) {
                                                        var isSettingFlag = false;
                                                        var subStatus = 1;

                                                        if (res.subscriptionsSetting.itemSettings) {
                                                            for (let key in res.subscriptionsSetting.itemSettings) {
                                                                if (tempData.indexOf(key) > -1) {
                                                                    isSettingFlag = true;
                                                                    break;
                                                                }
                                                            }
                                                        }

                                                        if (isSettingFlag) {
                                                            subStatus = 2;
                                                        }

                                                        let subData = [
                                                            {
                                                                status: subStatus,
                                                                appId: appid,
                                                                targettype: 4,
                                                                marchantid: rold.submitObj.marchantId,
                                                                templateid: tempData[0],
                                                                targetid: orderNumber
                                                            },
                                                            {
                                                                status: subStatus,
                                                                appId: appid,
                                                                targettype: 4,
                                                                marchantid: rold.submitObj.marchantId,
                                                                templateid: tempData[1],
                                                                targetId: orderNumber
                                                            },
                                                            {
                                                                status: subStatus,
                                                                appId: appid,
                                                                targettype: 4,
                                                                marchantid: rold.submitObj.marchantId,
                                                                templateid: tempData[2],
                                                                targetId: orderNumber
                                                            }
                                                        ];
                                                        app.globalData.sjrequest1('/subscription/add', subData).then((res) => {});
                                                    }
                                                });
                                            },
                                            complete: function (res) {
                                                if (parmas.orderType == 3) {
                                                    uni.redirectTo({
                                                        url: `/pages/order/orderListTake/orderListTake?tabsitem=1`
                                                    });
                                                } else if (parmas.orderType == 2) {
                                                    uni.redirectTo({
                                                        url: `/pages/order/orderListCity/orderListCity?tabsitem=1`
                                                    });
                                                } else {
                                                    uni.redirectTo({
                                                        url: `/pages/order/orderDetail/orderDetail?uniqueId=${postData.uniqueId}`
                                                    });
                                                }
                                            }
                                        });
                                    });
                                },
                                fail: function (wxres) {
                                    uni.showToast({
                                        title: '支付失败',
                                        icon: 'none'
                                    });

                                    if (parmas.orderType == 3) {
                                        uni.redirectTo({
                                            url: `/pages/order/orderListTake/orderListTake`
                                        });
                                    } else if (parmas.orderType == 2) {
                                        uni.redirectTo({
                                            url: `/pages/order/orderListCity/orderListCity`
                                        });
                                    } else {
                                        uni.redirectTo({
                                            url: `/pages/order/orderDetail/orderDetail?uniqueId=${postData.uniqueId}`
                                        });
                                    }
                                }
                            });
                        }
                    });
                } else if (res.data.code == 325) {
                    that.setData({
                        showTel: true
                    });
                } else if (res.data.code == 600) {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        bindconfirmIphone(e) {
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证手机号的正则表达式

            if (!reg.test(e.detail.value)) {
                this.setData({
                    iphoneValue: ''
                });
            } else {
                this.setData({
                    iphoneValue: e.detail.value
                });
            }
        },

        // 选择收货地址
        selectAddress() {
            this.setData({
                showAddressList: true
            }); // wx.showLoading({
            //   title: '加载中',
            // })
            // let data = {
            //   marchantId:this.data.submitObj.marchantId
            // }
            // app.sjrequest('/marchant/queryMustaddressList',data).then(res=>{
            //   if(res.data.code == 200){
            //     wx.hideLoading()
            //     this.setData({
            //       showAddressList:true,
            //       addressList:res.data.data
            //     })
            //   }else{
            //     wx.showToast({
            //       title: res.data.msg,
            //       icon: 'none'
            //     })
            //   }
            // })
        },

        // 关闭自取地址
        closeAddressList() {
            this.setData({
                showAddressList: false
            });
        },

        // 确认收货地址
        comfirmAddress(e) {
            let idx = e.currentTarget.dataset.idx;
            this.setData({
                selectedAress: this.addressList[idx],
                showAddressList: false
            });
        },

        getAddress() {},

        closeBgNocity() {
            this.setData({
                nocityFlag: false
            });
        }
    }
};
</script>
<style>
/* pages/order/submitOrder/submitOrder.wxss */
/* 自定义导航 */
.tabs-custom {
    width: 100%;
    height: 68rpx;
    background: #fff;
    border-top: 12rpx solid #f2f2f2;
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #eee;
}
.tabs-item {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333;
    position: relative;
}
.active-state {
    width: 40rpx;
    height: 8rpx;
    background-color: #eb5e32;
    border-radius: 8rpx;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
.tabs-item-active {
    color: #eb5e32;
}
/* 商家配送头部信息 */
.ps_head {
    background: #f2f2f2;
    padding-top: 20rpx;
    box-sizing: border-box;
}

.ps_head_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background: #ffffff;
    padding: 40rpx 30rpx;
}

.ps_head_left {
    padding-left: 20rpx;
    font-size: 26rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: #666666;
}

.ps_head_left_item {
    font-size: 26rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: #666666;
}

.ps_head_left_item_addressDetail {
    margin: 20rpx 20rpx 20rpx 0;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: #333333;
}

.ps_head_right {
    width: 14rpx;
    height: 26rpx;
}

.ps_head_image {
    width: 100%;
    height: 6rpx;
    display: flex;
}

/* 门店团购头部信息 */
.zq_head {
    background: #f2f2f2;
    padding-top: 20rpx;
    box-sizing: border-box;
}

.zq_head_box {
    padding: 20rpx 30rpx;
    background: #ffffff;
}

.zq_head_title {
    font-size: 30rpx;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.zq_head_title image {
    width: 24rpx;
    height: 24rpx;
    margin-right: 10rpx;
    color: #666666;
    font-size: 24rpx;
}

.zq_head_content {
    height: 90rpx;
    border-bottom: 1rpx solid #ececec;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.zq_head_content_title {
    font-weight: bold;
    font-size: 26rpx;
    white-space: nowrap;
}

.zq_head_content_desc {
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.zq_head_content_desc_address {
    color: #333333;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.zq_head_content image {
    width: 16rpx;
    height: 24rpx;
    margin-left: 10rpx;
}

/* 商品信息 */
.goods_box {
    padding-top: 20rpx;
    background: #f2f2f2;
}

.goods_shop {
    padding-left: 30rpx;
    height: 80rpx;
    background: #ffffff;
    display: flex;
    align-items: center;
}

.goods_shop_image {
    width: 54rpx;
    height: 54rpx;
    border-radius: 50%;
}

.goods_shop_text {
    margin: 0 10rpx 0 6rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #333333;
}

.goods-box .marchant .enter {
    width: 10rpx;
    height: 20rpx;
}

.goods_item {
    height: 194rpx;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #ececec;
    background: #ffffff;
    padding: 0 30rpx;
}

.goods_left {
    width: 154rpx;
    height: 154rpx;
    border-radius: 10rpx;
}

.goods_right {
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 154rpx;
    width: 0;
    flex: 1;
}

.goods_title {
    width: 100%;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
}

.goods_spec {
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.goods_price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.goods_money {
    color: #ec1919;
}

.goods_number {
    display: flex;
    align-items: center;
}

.goods_number_item {
    height: 34rpx;
    width: 62rpx;
    background: #e4e4e4;
    line-height: 34rpx;
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #333333;
    margin-left: 10rpx;
}

.goods_tips {
    display: flex;
}

.goods_tips_item {
    padding: 0rpx 5rpx;
    border: 1rpx solid #ec1919;
    font-size: 16rpx;
    font-weight: 400;
    color: #ec1919;
    margin-right: 14rpx;
    white-space: nowrap;
}

/* 列表信息 */
.desc-list {
    padding-top: 20rpx;
    background: #f2f2f2;
}

.desc-list .item {
    height: 90rpx;
    background: #ffffff;
    border-bottom: 1rpx solid #ececec;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.desc-list .item .title {
    flex: 1;
    display: flex;
    align-items: center;
    height: 90rpx;
    font-size: 26rpx;
    font-weight: bold;
    line-height: 36rpx;
    color: #333333;
}

.desc-list .item .desc {
    flex: 1;
    height: 90rpx;
    color: #666666;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 26rpx;
}

.desc-list .item .desc-active {
    color: #333333;
}
.desc-active-price {
    color: red !important;
    font-size: 32rpx !important;
    font-weight: bold;
}
.desc-list .item .desc .text {
    margin-right: 8rpx;
}

.desc-list .item .desc .img {
    width: 16rpx;
    height: 24rpx;
    object-fit: cover;
}

.desc-list .item .input {
    flex: 5;
    height: 90rpx;
    text-align: right;
}

/* 订阅 */
.subscription-box {
    background: #f2f2f2;
    padding-top: 20rpx;
    box-sizing: border-box;
}
.subscription {
    background: #ffffff;
    padding: 20rpx 30rpx;
}

.subscription-title {
    font-size: 20rpx;
    font-weight: bold;
    line-height: 36rpx;
    color: #333333;
}

.subscription-descBox {
    margin-top: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.subscription-desc {
    width: 625rpx;
    font-size: 18rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: #666666;
}

.subscription-enter {
    width: 8rpx;
    height: 14rpx;
}

/* 底部栏 */
.footer {
    width: 100%;
    height: 140rpx;
    background: #ffffff;
    box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
    opacity: 1;
    padding: 0 40rpx;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer_total {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.footer-top-box {
    display: flex;
    align-items: baseline;
}
.footer_total_text {
    font-size: 52rpx;
    font-weight: bold;
    color: #ec1919;
}
.footer_total_text-orgin {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #999999;
    text-decoration: line-through;
    margin-left: 20rpx;
}
.footer-top-bottom {
    display: flex;
    align-items: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #666666;
}
.footer-top-bottom-item:first-child {
    margin-left: 0;
}
.footer-top-bottom-item {
    margin-left: 30rpx;
}

.footer_btn_image {
    width: 200rpx;
    height: 80rpx;
}

/* 绑定手机号  */
.bind-tel-container {
    width: 600rpx;
    height: 640rpx;
    text-align: center;
}

.bind-tel-text {
    height: 28rpx;
    font-size: 28rpx;
    font-family: SourceHanSansCN;
    font-weight: bold;
    color: #343434;
    line-height: 30rpx;
    margin: 57rpx 0 42rpx;
}

.bind-btn-box {
    width: 382rpx;
    margin: 0 auto;
}

.bind-btn {
    height: 88rpx;
    background: linear-gradient(0deg, #f06436 0%, #eeac78 100%);
    border-radius: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 优惠 */
.sale-box {
    width: 100%;
    padding: 0 35rpx;
    box-sizing: border-box;
}

.sale-title {
    height: 50rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #333333;
    text-align: center;
    padding-top: 44rpx;
}

.sale-type-box {
    width: 100%;
    display: flex;
    height: 80rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
}

.sale-type-title {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sale-type-title-active:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 8rpx;
    width: 25%;
    background-color: #ce1e0b;
    transform: translateX(-50%);
}

.no-coupon-use {
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    color: #bbb;
}

.sale-type-title-active {
    position: relative;
}

.scroll-box {
    width: 100%;
    height: 680rpx;
}

.sale-list {
    width: 100%;
    padding: 35rpx 0;
    box-sizing: border-box;
    border-top: 2rpx solid rgba(226, 226, 226, 1);
}

.sale-item {
    width: 100%;
    height: 173rpx;
    display: flex;
    margin-bottom: 30rpx;
    position: relative;
}

.sale-list .sale-item:last-child {
    margin-bottom: 0;
}

.coupon-left {
    width: 35%;
    height: 100%;
    font-size: 41rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 0;
    box-sizing: border-box;
}

.coupon-right {
    width: 0;
    flex: 1;
    padding: 27rpx 10rpx 23rpx 20rpx;
    box-sizing: border-box;
}

.coupon-title {
    height: 28rpx;
    font-size: 28rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
}

.coupon-time {
    height: 24rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    margin: 20rpx 0;
}

.coupon-state {
    height: 24rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #cd9535;
}

.yhq-img {
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    top: 50%;
    right: 20rpx;
    transform: translateY(-50%);
}

.tab-active-class {
    color: red !important;
}

.item-entirelyAddress {
    width: 70%;
    margin-left: 30rpx;
    font-size: 28rpx;
    border-top: 0;
    margin-top: 10rpx;
    margin-right: 10rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: right;
}

.takeTitle {
    font-size: 30rpx;
    font-weight: 400;
}

.submitOrderTake {
    padding: 12rpx 0 120rpx 0;
    box-sizing: border-box;
}

.addressIcon {
    width: 20rpx;
    height: 24rpx;
    margin-right: 10rpx;
}

.takeTitleDes {
    float: right;
    color: #666666;
    font-size: 24rpx;
}

.addCopy {
    width: 24rpx;
    height: 24rpx;
    margin-right: 10rpx;
}

.takeTitleText {
    font-weight: bold;
}

.van-tabs__content {
    overflow: hidden;
    background: #ccc;
}

.sectionPicker {
    font-size: 26rpx;
    border-bottom: 1px solid #ececec;
    font-weight: bold;
    padding: 20rpx 0;
}

/* 自取地址 */
.address-list-pop {
    width: 100%;
    min-height: 40vh;
    padding: 30rpx;
    box-sizing: border-box;
}

.address-item {
    width: 100%;
    border-bottom: 2rpx solid #ececec;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
}

.store-name {
    width: 100%;
    font-size: 32rpx;
    color: #101010;
    height: 40rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.contact-container {
    width: 100%;
    height: 34rpx;
    display: flex;
    margin: 20rpx 0;
}

.contact-name {
    font-size: 24rpx;
    color: #939393;
    line-height: 34rpx;
}

.contact-tel {
    font-size: 24rpx;
    color: #939393;
    line-height: 34rpx;
    margin-left: 20rpx;
}

.address-box {
    width: 100%;
    color: #c8c8c8;
    font-size: 24rpx;
}
.bg_nocity {
    height: 100vh;
    position: fixed;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.nocity_img {
    width: 570rpx;
    height: 570rpx;
}
.nocity_close_img {
    margin-top: 70rpx;
    width: 48rpx;
    height: 48rpx;
}
.sale_money {
    padding-left: 20rpx;
    font-size: 24rpx;
    color: #999999;
    font-weight: normal;
}
.text2 {
    color: #ff4e00;
    padding-right: 20rpx;
}
</style>
