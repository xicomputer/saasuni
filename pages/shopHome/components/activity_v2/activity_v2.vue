<template>
    <!-- 活动列表组件 -->

    <view class="activity-list">
        <!-- <view class='me-fx-row me-fx-c-c top-msg'>商家为你推荐好货，支持全国发货</view>
    <view class='item-box' wx:for='{{activityList}}' wx:key='index' bindtap="aciveUrl"  data-url="{{item.linkUrl}}">
        <view class='me-fx-col me-fx-start-c'>
            <image src='{{item.imgUrl}}' class='activity-img'></image>
            <view class='me-fx-row me-fx-sb-c item-floor'>
                <view>
                    <view class='title-text'>{{item.name}}</view>
                 <view class='time-str'>2021·07·03-2021·08·03</view> 
                </view>
                <text class='to-view-btn'>立即查看</text>
            </view>
        </view>
    </view> -->
        <view class="activity-content">
            <view class="activity-top-bg me-fx-row me-fx-c-c" v-if="commentList2s.length > 0">
                <view class="activity-header me-fx-row me-fx-start-c me-fx-sb">
                    <!-- <text class="me-full-text addName">{{commentList2s[0].content}}</text> -->
                    <swiper style="height: 70rpx; width: 100%" :class="'notice-box ' + noticeBox + ' '" vertical autoplay circular easing-function="easeInOutCubic">
                        <swiper-item :class="'me-fx-row me-fx-start-c notice-content ' + contentBox" v-for="(item, index) in commentList2s" :key="index">
                            <text class="me-full-text addName">{{ item.content }}</text>
                        </swiper-item>
                    </swiper>
                    <view style="flex-shrink: 0">
                        <text class="check-btn" @tap="showDingyue">活动订阅</text>
                        <text class="check-btn" @tap="aciveUrl" data-url="/pages/shopHome/dynamic/dynamic">立即查看</text>
                    </view>
                </view>
            </view>

            <!-- <view class="me-fx-row me-fx-c-c" wx:if="{{codeInfo.length>0}}">
            <swiper style="height:200rpx;width:710rpx;" autoplay="true" interval="3000" duration="1000">
            <swiper-item wx:for="{{codeInfo}}" wx:key='index' circular>
            <view class="my_code" >
                <image class="code_img" src="../../../static/code_bg.png"></image>
                <view class="me-fx-row code_content">
                    <view class="code_left">
                    <view class="code_left_name me-full-text">{{item.wechatgroupname}}</view>
                    <view class="code_left_desc me-full-text">{{item.describes?item.describes:""}}</view>
                    </view>
                    <view class="me-fx-1 me-fx-row me-fx-c-c">
                    <view class="me-fx-col">
                        <image class="code_right_img"  data-src="{{item.wechatgroupqrcode}}"  bindtap="goimg" src="{{item.wechatgroupqrcode}}"></image>
                        <text class="code_right_btn" bindtap='saveImg' data-src="{{item.wechatgroupqrcode}}">保存二维码</text>
                    </view>
                    <text class="code_right_text">点击长按识别</text>
                    </view>
                </view>
            </view>
            </swiper-item>
        </swiper> 
        </view> -->
            <!-- 秒杀 促销 -->
            <view class="activity-sale activity-info" v-if="activityInfo.promotionStatus && saleGoodsListClone.length" @tap="aciveUrl" data-url="/pages/Index/saleList/saleList">
                <view class="me-fx-row me-fx-start-c sale-info">
                    <view class="sale-left me-fx-col me-fx-c-c">
                        <image class="sale-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/clock2.gif"></image>
                        <image class="time-colck-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/time-colck-item.png"></image>
                    </view>
                    <view class="me-fx-row me-fx-start-c me-fx-1" style="margin-right: 10rpx; justify-content: space-around">
                        <block v-for="(item, index) in saleGoodsListClone" :key="index">
                            <view v-if="index < 3" class="me-fx-col me-fx-c-c">
                                <view class="sale-box me-fx-c-c me-fx-col">
                                    <view class="sale-box-info">
                                        <image class="sale-pro-img" :src="item.thumbnail"></image>
                                        <view class="me-fx-row sale-money me-fx-start-c">
                                            <text class="sale-price">￥{{ item.lowPrice }}</text>
                                        </view>
                                    </view>
                                    <image class="time-colck-actImg" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/time-colck-active.png"></image>
                                    <van-count-down v-if="item.remainingTime" :data-index="index" use-slot @change="onChange($event, { index })" :time="item.remainingTime * 1000">
                                        <view class="activity-container-content-count-down">
                                            <text v-if="item.timeData.days > 0">{{ item.timeData.days }}天</text>
                                            <text>{{ item.timeData.hours }}:</text>
                                            <text>{{ item.timeData.minutes }}:</text>
                                            <text>{{ item.timeData.seconds }}</text>
                                        </view>
                                    </van-count-down>
                                </view>
                            </view>
                        </block>
                    </view>
                </view>
            </view>
            <!-- 积分 -->
            <view class="activity-jifen activity-info" v-if="activityInfo.integralSettingStatus" @tap="aciveUrl" data-url="/pages/Index/integral/integral">
                <view class="me-fx-row me-fx-start-c me-fx-sb">
                    <image class="jifen-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/jifen-active.png"></image>
                    <view class="jifen-time me-fx-row me-fx-start-c">
                        <text>距结束还剩：</text>
                        <van-count-down use-slot @change="changeJfTime($event, { index })" :data-index="index" :time="signData.countDownTime">
                            <view class="list_item_jifen">
                                <text v-if="JifentimeData.days != 0">{{ JifentimeData.days }}</text>
                                <text v-if="JifentimeData.days != 0">天</text>
                                <text class="time-box">{{ JifentimeData.hours < 10 ? '0' + JifentimeData.hours : JifentimeData.hours }}</text>
                                <text>:</text>
                                <text class="time-box">{{ JifentimeData.minutes < 10 ? '0' + JifentimeData.minutes : JifentimeData.minutes }}</text>
                                <text>:</text>
                                <text class="time-box">{{ JifentimeData.seconds < 10 ? '0' + JifentimeData.seconds : JifentimeData.seconds }}</text>
                            </view>
                        </van-count-down>
                    </view>
                </view>
                <view class="me-fx-row me-fx-start-c jfen-num-info">
                    <view class="sale-left me-fx-col me-fx-c-c">
                        <image class="sale-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/jifen.gif"></image>
                        <text class="text2">当前积分:</text>
                        <text class="text3">{{ jifenNum }}</text>
                    </view>
                    <!-- <view class="me-fx-row sale-right me-fx-start-c me-fx-1" >
                    <block wx:if="{{index < 3}}"  wx:for="{{exchangeGoodsList}}" wx:key="index" >
                        <view class="me-fx-col me-fx-c-c" >
                            <view class="jifen-box me-fx-c-c me-fx-col">
                                <image class="jifen-pro-img" src="{{item.imageUuid}}"></image>
                                <text class="jifen-pro-num me-full-text">{{item.score}}积分</text>
                            </view>
                        </view>
                    </block>
                </view> -->
                    <view class="me-fx-col me-fx-sb jf-list2">
                        <text class="title-item-jf">当前参与用户</text>
                        <view class="integral-member-list">
                            <image :src="item.headimgurl" class="integral-member-img" v-for="(item, index) in signData.signinUserList" :key="index"></image>
                        </view>
                        <text class="title-item-jf">当前任务</text>
                        <view class="jf-btns me-fx-row me-fx-sb">
                            <text>签到</text>
                            <text>去分享</text>
                            <text>去购买</text>
                            <text>去邀请</text>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 喊价 -->
            <view class="activity-hanjia activity-info" v-if="activityInfo.hasActive" @tap="aciveUrl" data-url="/pages/activity/pmhd/list/list">
                <view class="me-fx-row me-fx-start-c sale-info">
                    <view class="sale-left me-fx-col me-fx-c-c">
                        <image class="sale-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/hanjia.gif"></image>
                        <text>喊价</text>
                        <text class="text2">当前有:</text>
                        <text class="text3">{{ auctionNum }}</text>
                        <text class="text2">商品正在喊价</text>
                    </view>
                    <view class="me-fx-row sale-right me-fx-start-c me-fx-1">
                        <block v-for="(item, index) in auctionListClone" :key="index">
                            <view v-if="index < 2" class="me-fx-col me-fx-c-c">
                                <view class="hanjia-box me-fx-c-c me-fx-col">
                                    <image mode="aspectFill" class="hanjia-pro-img" :src="item.logoImg"></image>
                                </view>
                                <view class="timess">剩余时间</view>
                                <block v-if="item.status != '3'">
                                    <van-count-down use-slot @change="changeTime($event, { index })" :data-index="index" :time="item.timeMinutes">
                                        <view class="list_item_onLookers">
                                            <text v-if="item.timeData.days != 0">{{ item.timeData.days }}</text>
                                            <text v-if="item.timeData.days != 0">天</text>
                                            <text>{{ item.timeData.hours < 10 ? '0' + item.timeData.hours : item.timeData.hours }}</text>
                                            <text>:</text>
                                            <text>{{ item.timeData.minutes < 10 ? '0' + item.timeData.minutes : item.timeData.minutes }}</text>
                                            <text>:</text>
                                            <text>{{ item.timeData.seconds < 10 ? '0' + item.timeData.seconds : item.timeData.seconds }}</text>
                                        </view>
                                    </van-count-down>
                                </block>
                            </view>
                        </block>
                    </view>
                </view>
            </view>
            <!-- 优惠券 -->
            <view class="activity-Coupons activity-info" v-if="saleCanListClone.length > 0">
                <view class="me-fx-row me-fx-start-c sale-info">
                    <view class="sale-left me-fx-col me-fx-c-c">
                        <image class="sale-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/activity-juan.png"></image>
                        <text>优惠券</text>
                    </view>
                    <view class="me-fx-row sale-right me-fx-start-c me-fx-1">
                        <block v-if="index < 2" v-for="(item, index) in saleCanListClone" :key="index">
                            <view
                                class="activity-Coupons-list me-fx-row"
                                style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static//Coupons-act-bg.png)"
                            >
                                <view class="me-fx-col me-fx-c-c Coupons-list-left">
                                    <text class="Coupons-left-text1">{{ item.deduct }}</text>
                                    <text class="Coupons-left-text2">满{{ item.confine }}可用</text>
                                </view>
                                <text class="Coupons-list-right me-fx-row me-fx-c-c">优惠券</text>
                            </view>
                        </block>
                    </view>
                </view>
                <view class="me-fx-row activity-Coupons-bottom me-fx-start-c">
                    <text class="Coupons-bottom-text">您有优惠券尚未领取</text>
                    <text class="activity-Coupons-btn" @tap="showSaleFun">立即领取</text>
                </view>
            </view>

            <!-- 推三反一活动 -->
            <swiper indicator-dots indicator-color="#E4E4E4" indicator-active-color="#FFBB38" autoplay circular class="recommend-activity-swiper" v-if="willList.length">
                <swiper-item class="recommend-activity-swiper-item" v-for="(item, index) in willList" :key="index">
                    <navigator
                        :url="'/pages/businessActivity/activityShop/activityShop?activityId=' + item.activityId"
                        hover-class="none"
                        class="activity-info recommend-activity"
                        v-if="item"
                    >
                        <view class="me-fx-row">
                            <image mode="aspectFill" class="recommend-activity-goods" :src="item.detailImgUrls[0]"></image>
                            <view class="me-fx-1 goods-info">
                                <view class="me-full-text goods-name">{{ item.commodityName }}</view>
                                <view class="me-full-text goods-description">{{ item.description }}</view>
                                <view class="goods-price">
                                    <text>最高可赚:</text>
                                    <text class="goods-price-num">{{ item.commodityPrice }}元</text>
                                </view>
                            </view>
                        </view>
                        <view class="me-fx-row me-fx-sb-c down-count-box">
                            <view class="me-fx-row me-fx-c-c remaining-times">
                                距结束：
                                <van-count-down :time="item.diffTimes" :data-index="index" :auto-start="true" :use-slot="true" @change="recommendTimeChange($event, { index })">
                                    <view class="me-fx-row me-fx-c-c time-str">
                                        <view class="adorn-box">{{ item.times.days }}</view>
                                        天
                                        <view class="adorn-box">{{ item.times.hours }}</view>
                                        时
                                        <view class="adorn-box">{{ item.times.minutes }}</view>
                                        分
                                        <view class="adorn-box">{{ item.times.seconds }}</view>
                                        秒
                                    </view>
                                </van-count-down>
                            </view>
                            <text class="activity-title">{{ item.templateName || '邀三退一' }}</text>
                        </view>
                    </navigator>
                </swiper-item>
            </swiper>
        </view>

        <van-popup :show="showSale" @close="closeSale" round closeable position="bottom">
            <view class="sale-box-pop">
                <view class="sale-title">优惠券</view>
                <scroll-view :scroll-y="true" class="scroll-box">
                    <view class="sale-list">
                        <view
                            class="sale-item"
                            @tap="selectSale"
                            :data-index="index"
                            style="background-image: url(https://xssj.letterbook.cn/applet/images/sale_bg_sub.png); background-size: 100% 173rpx; background-repeat: no-repeat"
                            v-for="(item, index) in saleCanListClone"
                            :key="index"
                        >
                            <view class="coupon-left">
                                <view>￥{{ item.deduct }}</view>
                                <view style="font-size: 24rpx; margin-left: 18rpx">满{{ item.confine }}元使用</view>
                            </view>

                            <view class="coupon-right">
                                <view class="coupon-title">{{ item.couponName }}</view>
                                <view class="coupon-time">截止日期：{{ item.endTime }}</view>
                                <view class="coupon-state">{{ item.isDraw == 1 ? '已领取' : '未领取' }}</view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
                <view @tap="receiveSale" v-if="!receivedSale" class="sale-receive-btn">立即领取</view>
                <view @tap="receivedSaleFun" v-if="receivedSale" class="sale-receive-btn received">已领取</view>
            </view>
        </van-popup>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
let app = getApp();
export default {
    components: {
        // vanPopup,
        // vanCountDown
    },
    data() {
        return {
            showSale: false,

            //是否领取了优惠券
            receivedSale: false,

            //优惠状态
            saleState: '无优惠',

            saleCanListClone: [],
            timeData: {},

            JifentimeData: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            },

            /*  推三反一数据  */
            recommendAty: null,

            //进行中的活动
            recommendTimes: {},

            willList: [],

            /*-------end--------*/ noticeBox: '',
            contentBox: '',
            saleGoodsListClone: '',
            auctionListClone: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        marchantId: {
            type: String,
            default: ''
        },
        tempId: {
            type: [String, Number],
            default: 1
        },
        shopList: {
            type: Array,
            default: () => []
        },
        hotelList: {
            type: Array,
            default: () => []
        },
        activityInfo: {
            type: Object
        },
        activityList: {
            type: Array
        },
        codeInfo: {
            type: Array
        },
        saleGoodsList: {
            type: Array
        },
        exchangeGoodsList: {
            type: Array
        },
        jifenNum: {
            type: [String, Number]
        },
        saleCanList: {
            type: Array
        },
        auctionList: {
            type: Array
        },
        appName: {
            type: String
        },
        activityInfo: {
            type: Object
        },
        auctionNum: {
            type: [String, Number]
        },
        commentList2s: {
            type: Array
        },
        signData: {
            type: Object
        }
    },
    beforeMount: function () {
        // this.recommendedActivity();
        this.getWillActivity();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onChange(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            const { index } = e.currentTarget.dataset;
            this.saleGoodsList[index].timeData = e.detail;
            this.setData({
                saleGoodsListClone: this.saleGoodsList
            });
        },

        changeTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            const { index } = e.currentTarget.dataset;
            this.auctionList[index].timeData = e.detail;
            this.setData({
                auctionListClone: this.auctionList
            });
        },

        changeJfTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            this.JifentimeData = e.detail;
            this.setData({
                JifentimeData: this.JifentimeData
            });
        },

        saveImg(e) {
            let img = e.currentTarget.dataset.src;
            console.log(img, '34');
            uni.downloadFile({
                url: img,

                success(e) {
                    uni.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,

                        success() {
                            uni.showToast({
                                title: '保存成功',
                                icon: 'none'
                            });
                        }
                    });
                },

                fail(e) {
                    console.log(e);
                }
            });
        },

        aciveUrl(e) {
            let url = e.currentTarget.dataset.url;
            let marchantId = this.marchantId;
            uni.navigateTo({
                url: url + '?marchantId=' + marchantId
            });
        },

        goimg(e) {
            let src = e.currentTarget.dataset.src;
            uni.previewImage({
                urls: [src]
            });
        },

        // 优惠弹框
        showSaleFun() {
            if (this.saleCanList.length) {
                this.setData({
                    showSale: true
                });
            } else {
                uni.showToast({
                    title: '暂无优惠',
                    icon: 'none'
                });
            }
        },

        closeSale() {
            this.setData({
                showSale: false
            });
        },

        receiveSale() {
            if (this.receivedSale) {
                uni.showToast({
                    title: '已领取优惠券',
                    icon: none
                });
                return;
            }

            var data = {
                couponsIds: []
            };
            this.saleCanList.forEach((item) => {
                data.couponsIds.push(item.id);
            });
            data.couponsIds = data.couponsIds.toString();
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest('/coupons/getCoupons', data, token).then((res) => {
                if (res.data.code == 200) {
                    this.saleCanList.forEach((item) => {
                        item.isDraw = 1;
                    });
                    this.$emit('reCoupons');
                    this.setData({
                        showSale: false,
                        saleState: '已领券',
                        receivedSale: true,
                        saleCanListClone: this.saleCanList
                    });
                    uni.showToast({
                        title: '领取成功',
                        icon: 'none'
                    });
                }
            });
        },

        receivedSaleFun() {
            uni.showToast({
                title: '已经领取过了',
                icon: 'none'
            });
            this.setData({
                showSale: false
            });
        },

        aciveUrl(e) {
            let url = e.currentTarget.dataset.url;
            let marchantId = this.marchantId;
            uni.navigateTo({
                url: url + '?marchantId=' + marchantId
            });
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        // 推三反一活动
        recommendedActivity() {
            app.globalData
                .sjrequest1('/activityBusiness/selectOne', {
                    merchantId: this.marchantId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0 && res.data.data) {
                        var data = res.data.data;

                        var endTime = this._parseDate(data.endTime, 'number');

                        var nowTime = new Date().getTime();
                        var diffTimes = endTime - nowTime;
                        data.diffTimes = diffTimes;
                        var joinUser = data.activityFinanceResponses;

                        if (joinUser) {
                            data.joinUser = joinUser[0];
                        } else {
                            data.joinUser = [];
                        }

                        this.setData({
                            recommendAty: data
                        });
                    }
                });
        },

        //查询活动列表
        getWillActivity() {
            app.globalData
                .sjrequest1('/activityBusiness/pageList', {
                    pageSize: 10,
                    currentPage: 1,
                    merchantId: this.marchantId // "state": 2
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0 && res.data.data) {
                        var list = res.data.data.list;
                        list.forEach((item) => {
                            var endTime = this._parseDate(item.endTime, 'number');

                            var nowTime = new Date().getTime();
                            var diffTimes = endTime - nowTime;
                            item.diffTimes = diffTimes;
                            item.times = {
                                days: 0,
                                hours: 0,
                                minutes: 0,
                                seconds: 0
                            };
                        });
                        this.setData({
                            willList: [...list]
                        });
                    }
                });
        },

        recommendTimeChange(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var times = e.detail;
            var index = e.currentTarget.dataset.index;
            var willList = this.willList;

            if (times.hours < 10) {
                times.hours = '0' + times.hours;
            }

            if (times.minutes < 10) {
                times.minutes = '0' + times.minutes;
            }

            if (times.seconds < 10) {
                times.seconds = '0' + times.seconds;
            }

            willList[index].times = times;
            this.setData({
                willList: willList
            });
        },

        showDingyue() {
            var that = this;
            let appid = uni.getStorageSync('appid');
            let data = {
                authorizerAppid: appid,
                sceneType: 7
            };
            app.globalData.mb2request('/subTemplate/listPriTemplateId', data).then((res) => {
                let tempData = res.data.data;
                uni.requestSubscribeMessage({
                    tmplIds: tempData,
                    success: function (res) {
                        uni.getSetting({
                            withSubscriptions: true,
                            success: (result) => {
                                uni.showToast({
                                    title: '订阅消息成功'
                                });
                                let data = {
                                    status: 1,
                                    marchantId: that.marchantId,
                                    templateIds: tempData,
                                    appId: appid,
                                    targetType: 2
                                };
                                app.globalData.sjrequest('/basic/addsubscription', data).then((res) => {
                                    if (res.data.code == 200) {
                                    } else {
                                        uni.showToast({
                                            title: res.data.msg,
                                            icon: 'none'
                                        });
                                    }
                                });
                            }
                        });
                    },

                    fail(e) {
                        uni.showToast({
                            title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
                            icon: 'none'
                        });
                    }
                });
            });
        },

        selectSale() {
            console.log('占位：函数 selectSale 未声明');
        }
    },
    watch: {
        saleGoodsList: {
            handler: function (newVal, oldVal) {
                this.saleGoodsListClone = newVal;
            },

            immediate: true,
            deep: true
        },

        auctionList: {
            handler: function (newVal, oldVal) {
                this.auctionListClone = newVal;
            },

            immediate: true,
            deep: true
        },

        saleCanList: {
            handler: function (newVal, oldVal) {
                this.saleCanListClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';

page {
    background-color: #f9f9f9;
}

.top-msg {
    height: 100rpx;
    font-size: 18rpx;
    color: #121212;
}

.item-box {
    background-color: #fff;
    width: 710rpx;
    margin: 0 auto 10rpx;
    border-radius: 16rpx;
    padding: 0 10rpx 10rpx;
    box-sizing: border-box;
}
.item-box .activity-img {
    width: 690rpx;
    height: 236rpx;
    background-color: #ccc;
    border-radius: 20rpx;
}
.item-box .item-floor {
    width: 100%;
    margin-top: 18rpx;
}
.item-box .title-text {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
}
.item-box .time-str {
    font-size: 20rpx;
    color: #333;
}
.item-box .to-view-btn {
    width: 216rpx;
    height: 56rpx;
    border-radius: 28rpx;
    background-color: #ff4545;
    color: #fff;
    text-align: center;
    line-height: 56rpx;
    font-size: 20rpx;
}

.activity-content {
    position: relative;
    padding: 0rpx 0rpx 20rpx;
}
.activity-top-bg {
    height: 100rpx;
    width: 100%;
}
.activity-header {
    background-color: #fff;
    border-radius: 36rpx;
    height: 70rpx;
    padding: 0rpx 20rpx;
    width: 100%;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.13);
}
.addName {
    font-size: 26rpx;
    color: #000;
}
.check-btn {
    background-color: #ffbb38;
    color: #fff;
    font-size: 22rpx;
    border-radius: 22rpx;
    width: 144rpx;
    height: 44rpx;
    text-align: center;
    line-height: 44rpx;
    padding: 10rpx 25rpx;
}
.check-btn:first-child {
    margin-right: 20rpx;
}
.swiper-wxcode {
    background-color: #fff;
    height: 218rpx;
    margin: 0rpx 20rpx;
    border-radius: 16rpx;
}
.my_code {
    position: relative;
    height: 218rpx;
    width: 710rpx;
}
.code_img {
    height: 218rpx;
    width: 710rpx;
    position: absolute;
    top: 0;
    z-index: 9;
}
.code_content {
    z-index: 99;
    position: relative;
    height: 100%;
}
.code_left {
    width: 420rpx;
    margin: 20rpx;
    flex-shrink: 0;
}
.code_left_name {
    font-weight: bold;
    font-size: 38rpx;
    color: #333;
    text-align: center;
}
.code_left_desc {
    font-size: 26rpx;
    color: #8c8c8c;
    -webkit-line-clamp: 3;
}
.code_right_img {
    width: 120rpx;
    height: 120rpx;
    background-color: #e4e4e4;
}
.code_right_btn {
    border: 1px solid #000000;
    border-radius: 8rpx;
    background-color: #000;
    color: #fff;
    font-size: 20rpx;
    font-weight: bold;
    text-align: center;
    margin-top: 10rpx;
}
.code_right_text {
    width: 20rpx;
    font-size: 18rpx;
    color: #999999;
    margin-left: 20rpx;
}
.code-img-text {
    font-size: 20rpx;
    color: #8c8c8c;
}
.activity-info {
    margin: 20rpx;
    border-radius: 16rpx;
    height: 310rpx;
    background-color: #fff;
}
/* 促销 */
.activity-sale {
    border: 4px solid #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.13);
}
.sale-info {
    height: 100%;
}
.sale-left {
    width: 160rpx;
    font-size: 28rpx;
    font-weight: bold;
    flex-shrink: 0;
}
.sale-img {
    width: 100rpx;
    height: 100rpx;
    margin-bottom: 20rpx;
}
.sale-right {
    margin-right: 20rpx;
    justify-content: space-around;
}
.sale-box {
    width: 160rpx;
    height: 260rpx;
    border-radius: 20rpx;
    background-color: #f8f8f8;
    margin-bottom: 10rpx;
}
.sale-box-info {
    position: relative;
    width: 140rpx;
    height: 140rpx;
}
.sale-pro-img {
    width: 140rpx;
    height: 140rpx;
}
.sale-text {
    position: absolute;
    left: 0rpx;
    width: 92rpx;
    height: 30rpx;
    font-size: 20rpx;
    line-height: 30rpx;
    text-align: center;
    background-color: #ec0702;
    border-top-right-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
    color: #fff;
    bottom: 20rpx;
}
.sale-money {
    color: #ff4545;
    position: absolute;
    bottom: 0rpx;
    background: rgba(0, 0, 0, 0.5);
}
.sale-symbol {
    font-size: 26rpx;
    padding-right: 3rpx;
}
.sale-price {
    font-size: 30rpx;
    font-weight: bold;
}
.activity-container-content-count-down {
    font-size: 24rpx;
}
.time-colck-img {
    width: 106rpx;
    height: 106rpx;
}
.time-colck-actImg {
    width: 160rpx;
    height: 36rpx;
    padding: 15rpx 0rpx;
}
/* 积分 */
.activity-jifen {
    border: 4px solid #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.13);
    padding: 10rpx;
}
.text2 {
    color: #8c8c8c;
    font-size: 24rpx;
}
.text3 {
    color: #ffbb38;
}
.jifen-box {
    border: 4rpx solid #ffbb38;
    width: 154rpx;
    height: 228rpx;
    border-radius: 14rpx;
}
.jifen-pro-num {
    color: #ffbb38;
    font-size: 28rpx;
    font-weight: bold;
}
.jifen-pro-img {
    width: 134rpx;
    height: 134rpx;
    margin-bottom: 10rpx;
}
.jifen-img {
    width: 316rpx;
    height: 54rpx;
}
.jifen-time {
    color: #fdaa18;
    font-size: 22rpx;
}
.list_item_jifen {
    color: #fdaa18;
    font-size: 22rpx;
}
.time-box {
    margin: 0rpx 5rpx;
    background-color: #fdaa18;
    color: #fff;
    border-radius: 8rpx;
    padding: 5rpx;
}
.jfen-num-info {
    height: 255rpx;
}
.integral-member-img {
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
    margin-right: 8rpx;
    flex-shrink: 0;
}
.title-item-jf {
    font-size: 22rpx;
    font-weight: bold;
}
.jf-list2 {
    height: 200rpx;
}
.integral-member-list {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 510rpx;
    overflow-x: scroll;
}
.jf-btns > text {
    background-color: #fdaa18;
    font-size: 24rpx;
    padding: 5rpx 20rpx;
    color: #fff;
    border-radius: 8rpx;
}
/* 优惠券 */
.activity-Coupons {
    border: 4px solid #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.13);
    position: relative;
}
.activity-Coupons-list {
    width: 246rpx;
    height: 120rpx;
    background-size: 100% 100%;
}
.Coupons-list-left {
    color: #ffffff;
    width: 140rpx;
}
.Coupons-list-right {
    color: #83b3f5;
    font-weight: bold;
    font-size: 28rpx;
    width: 106rpx;
}
.Coupons-left-text1 {
    font-size: 28rpx;
}
.Coupons-left-text2 {
    font-size: 20rpx;
}
.activity-Coupons-bottom {
    position: absolute;
    right: 20rpx;
    bottom: 10rpx;
}
.Coupons-bottom-text {
    font-size: 24rpx;
    color: #8c8c8c;
    padding-right: 10rpx;
}
.activity-Coupons-btn {
    background-color: #1577ff;
    border-radius: 24rpx;
    width: 140rpx;
    height: 48rpx;
    text-align: center;
    line-height: 48rpx;
    color: #ffff;
    font-size: 22rpx;
}

/* 喊价 */
.activity-hanjia {
    border: 4px solid #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.13);
    height: 370rpx;
}
.hanjia-box {
    width: 226rpx;
    height: 226rpx;
    position: relative;
    border-radius: 20rpx;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.13);
    margin-bottom: 10rpx;
}
.hanjia-pro-img {
    width: 200rpx;
    height: 200rpx;
}
.timess {
    color: #8c8c8c;
    font-size: 26rpx;
}

/* 优惠券 */
/* 优惠 */
.sale-box-pop {
    width: 100%;
    /* height: 600rpx; */
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
.scroll-box {
    width: 100%;
    max-height: 680rpx;
}
.sale-list {
    width: 100%;
    padding: 35rpx 30rpx;
    box-sizing: border-box;
    border-top: 2rpx solid rgba(226, 226, 226, 1);
}
.sale-item {
    width: 100%;
    height: 173rpx;
    display: flex;
    margin-bottom: 30rpx;
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
.sale-receive-btn {
    width: 80%;
    height: 100rpx;
    border-radius: 50rpx;
    background-color: #f78f23;
    color: #fff;
    font-size: 40rpx;
    margin: 20rpx auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.received {
    background-color: #ccc;
}
.butt {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: -1;
    z-index: 9999;
}
.miaosha {
    font-size: 22rpx;
    color: #ff1c1c;
}

/* 推三反一活动 */
.recommend-activity-swiper {
    height: 320rpx;
}
.recommend-activity-swiper-item {
    width: 710rpx;
    margin: 0 auto;
    height: 100%;
}
.recommend-activity {
    height: auto;
    padding: 20rpx;
    height: 100%;
    box-sizing: border-box;
    font-size: 26rpx;
}
.recommend-activity .recommend-activity-goods {
    width: 168rpx;
    height: 168rpx;
    background-color: #ccc;
}
.recommend-activity .goods-info {
    margin-left: 16rpx;
}
.recommend-activity .goods-info .goods-name {
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
}
.recommend-activity .goods-info .goods-description {
    font-size: 24rpx;
    color: #999;
}
.recommend-activity .goods-info .goods-price {
    color: #ffbb38;
}
.recommend-activity .goods-info .goods-price-num {
    font-size: 40rpx;
    font-weight: bold;
}

.recommend-activity .down-count-box {
    margin-top: 20rpx;
}
.recommend-activity .remaining-times {
    font-size: 24rpx;
    color: #eb1918;
    font-weight: bold;
}
.recommend-activity .remaining-times .time-str {
    font-size: 24rpx;
    color: #eb1918;
}
.recommend-activity .remaining-times .adorn-box {
    border-radius: 6rpx;
    margin: 0 5rpx;
    background-color: #eb1918;
    width: 36rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    color: #fff;
}

.recommend-activity .activity-title {
    padding: 4rpx 20rpx;
    border-radius: 12rpx;
    background-color: #1577ff;
    color: #fff;
}
</style>
