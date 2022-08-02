<template>
    <view>
        <!-- 海报生成组件 -->
        <canvas-synthetic
            class="synthetic"
            canvas-id="canvas_goods"
            :canvas-width="548"
            :canvas-height="856"
            canvas-bgcolor="#fff"
            :imgs="imgs"
            @generateComplete="getCompleteImg"
            :texts="texts"
            :showline="false"
            :rect-info="rectInfo"
        ></canvas-synthetic>

        <view class="detail-page">
            <view class="top-banner">
                <swiper class="banner-swiper" @change="swiperChange" :circular="true">
                    <swiper-item v-if="activityInfo.videoUrl" class="swiper-item">
                        <video id="swiperVideo" :src="activityInfo.videoUrl" class="banner-img" :poster="activityInfo.videoCover"></video>
                    </swiper-item>
                    <swiper-item class="swiper-item" v-for="(item, index) in activityInfo.bannerImgUrls" :key="index">
                        <view class="swiper-content">
                            <image :src="item" class="banner-img"></image>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="count-text-box">{{ currentBanner + 1 }}/{{ activityInfo.bannerImgUrls ? activityInfo.bannerImgUrls.length : 0 }}</view>
            </view>

            <view class="base-info">
                <view class="me-fx-row price-down-count">
                    <view class="me-fx-1 me-fx-row me-fx-start-c price-box">
                        <image src="/static/pages/seckill/imgs/xsqg-img.png" class="seckill-logo-img"></image>
                        <view class="now-price">
                            <text>￥</text>
                            <text class="price-num">{{ activityInfo.lowPrice }}</text>
                            <text class="old-price">¥{{ activityInfo.price }}</text>
                        </view>
                    </view>
                    <view class="beautify-box">
                        <view class="box1"></view>
                        <view class="box2"></view>
                    </view>
                    <view class="me-fx-col me-fx-c-c down-count">
                        <text>距{{ activityInfo.state == 1 ? '开始' : '结束' }}还剩</text>
                        <van-count-down :time="downTimes" :use-slot="true" :auto-start="true" @finish="activityEnd" @change="changeFun">
                            <view class="me-fx-row me-fx-c-c time-row">
                                <view class="me-fx-row" v-if="downTimeObj.days !== '00'">
                                    <text class="count-num">{{ downTimeObj.days }}</text>
                                    天
                                </view>
                                <text class="count-num">{{ downTimeObj.hours }}</text>
                                :
                                <text class="count-num">{{ downTimeObj.minutes }}</text>
                                :
                                <text class="count-num">{{ downTimeObj.seconds }}</text>
                            </view>
                        </van-count-down>
                    </view>
                </view>
                <view class="me-fx-row me-fx-start-c labels-container">
                    <text class="label-text2" v-if="activityInfo.limitBuyCount != -1">每人限购{{ activityInfo.limitBuyCount }}件</text>
                    <text class="remaining-count" v-if="activityInfo.residueCommodityCount != -1">剩余:{{ activityInfo.residueCommodityTotalCount }}</text>
                </view>
                <view class="me-fx-row me-fx-sb-c base-info-bottom">
                    <view class="me-full-text me-full-line2 goods-name">{{ activityInfo.commodityName }}</view>
                    <view class="me-fx-row me-fx-c-c share-box" @tap="openShare">
                        <image src="/static/pages/seckill/imgs/wx.png" class="wx-img"></image>
                        <text>分享</text>
                    </view>
                </view>
            </view>

            <view class="attr-info">
                <!-- <view class='me-fx-row me-fx-start-c info-item'>
            <text class='attr-title'>运费</text>
            <image src='../imgs/che.png' class='che-img'></image>
            <text class='label1-text'>包邮</text>
        </view> -->

                <view class="me-fx-row me-fx-start-c info-item" v-for="(item, index) in activityInfo.orderTypeArr" :key="index">
                    <text class="attr-title">{{ item == 1 ? '物流发货' : item == 2 ? '同城配送' : '预订自取' }}</text>

                    <view class="me-fx-row me-fx-start-c">
                        <text class="label-text2">购买</text>
                        <view class="connect-line"></view>
                        <text class="label-text2">{{ item == 1 ? '接单发货' : item == 2 ? '配送' : '门店团购' }}</text>
                        <view class="connect-line"></view>
                        <text class="label-text2">{{ item == 1 ? '收货完成' : '完成' }}</text>
                    </view>
                </view>

                <view class="me-fx-row me-fx-start-c info-item">
                    <text class="attr-title">保障</text>
                    <view class="me-fx-1 content-str">放心购·材质保障·假一罚十</view>
                    <image src="/static/pages/seckill/imgs/point-adorn.png" class="point-adorn-img"></image>
                </view>
            </view>

            <view class="explain-info">
                <view class="me-fx-row me-fx-start-c block-title-box">
                    <text class="col-line"></text>
                    <text>活动规则</text>
                </view>
                <view class="explain-text">
                    <view>1.活动有效期</view>
                    <view>秒杀有效期由商家设置本商品在该场活动中持续时间。</view>
                    <view>2.秒杀成功</view>
                    <view>在有效期内完成支付即为成功。</view>
                    <view>3.秒杀失败</view>
                    <view>活动结束后，未完成支付的订单即为失败。</view>
                    <view>4.退货说明</view>
                    <view>活动商品如有保质期、品质、假冒伪劣问题请及时保留证据进行线上协商退货。</view>
                    <view>5.限购规则</view>
                    <view>商家如设置每人购买次数，达到限制后，将无法再次购买</view>
                </view>
            </view>

            <view class="detail-imgs">
                <view class="me-fx-row me-fx-start-c block-title-box">
                    <text class="col-line"></text>
                    <text>商品详情</text>
                </view>
                <view>
                    <image :src="item" class="detail-img" mode="widthFix" v-for="(item, index) in activityInfo.detailImgUrls" :key="index"></image>
                </view>
            </view>

            <view class="me-fx-row me-fx-sb-c floot-container">
                <view class="me-fx-row me-fx-start-c service">
                    <view class="me-fx-col me-fx-c-c link-item" @tap="jumpChat">
                        <image src="/static/pages/seckill/imgs/msg-img.png" class="icon-img"></image>
                        <text>客服</text>
                    </view>
                    <view class="me-fx-col me-fx-c-c link-item" @tap="jumpShop">
                        <image src="/static/pages/seckill/imgs/shop-img.png" class="icon-img"></image>
                        <text>店铺</text>
                    </view>
                    <view class="me-fx-col me-fx-c-c link-item" @tap="jumpMS">
                        <image src="/static/pages/seckill/imgs/dingdan.png" class="icon-img"></image>
                        <text>订单</text>
                    </view>
                </view>

                <bottom class="handel-btn disable-btn" v-if="activityInfo.residueCommodityTotalCount == 0">商品已售罄</bottom>
                <bottom v-else class="handel-btn" @tap.native="handleFlootBtn">立即抢购</bottom>

                <button v-if="!loginInfo.userPhone" class="get-phone-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @tap.stop.prevent="getPhoneNumber"></button>
            </view>
        </view>

        <!-- 选择规格弹窗 -->
        <van-popup
            :show="showSelSpecification"
            position="bottom"
            :close-on-click-overlay="true"
            @click-overlay="closePopup($event, { attrname: 'showSelSpecification' })"
            @close="closePopup($event, { attrname: 'showSelSpecification' })"
            :closeable="true"
            data-attrname="showSelSpecification"
        >
            <view class="sel-specification-popup">
                <view class="me-fx-row me-fx-sb-c goods-base-info">
                    <image class="goods-img" :src="currentSku.imageUrl"></image>
                    <view class="me-fx-1 me-fx-col me-fx-sb right-info">
                        <view class="price-text">¥{{ currentSku.livePrice }}</view>
                        <view class="me-fx-row me-fx-sb-c">
                            <view class="me-full-text me-full-line2">{{ activityInfo.commodityName }}</view>
                            <view>库存：{{ currentSku.residueCommoditySkuCount }}</view>
                        </view>
                    </view>
                </view>
                <view class="specification-list">
                    <view class="title-text">规格分类</view>
                    <view class="me-fx-row">
                        <block v-for="(item, index) in skuList" :key="index">
                            <text :class="'specification-item ' + (goodsSkuId == item.skuId ? 'sel-item' : '')" :data-skuitem="item" @tap="selGoodsSku">{{ item.skuName }}</text>
                        </block>
                    </view>
                </view>
                <view class="me-fx-row me-fx-sb-c buy-count">
                    <view class="me-fx-row me-fx-start-end">
                        <text class="title-text">购买数量</text>
                        <text class="msg-text" v-if="activityInfo.limitBuyCount != -1">此商品限购{{ activityInfo.limitBuyCount }}件</text>
                    </view>
                    <add-subtract-num @change="countChange" @minusCount="minusCount" :desabled="isCountDesabled"></add-subtract-num>
                </view>
                <button class="down-order-btn" @tap="jumpConfirmOrder">确认</button>
            </view>
        </van-popup>

        <!-- 分享弹窗 -->
        <van-popup :show="showShare" position="bottom" :close-on-click-overlay="true" @click-overlay="showShareFun($event, { attrname: 'showShare' })" data-attrname="showShare">
            <view class="share-content-popup">
                <view class="me-fx-row me-fx-sa-c">
                    <button class="me-fx-col me-fx-c-c share-btn" open-type="share">
                        <image src="/static/pages/seckill/imgs/wx-logo.png" class="share-img"></image>
                        <text>分享至微信</text>
                    </button>
                    <view class="me-fx-col me-fx-c-c" @tap="createPosters">
                        <image src="/static/pages/seckill/imgs/save-img.png" class="share-img"></image>
                        <text>保存海报</text>
                    </view>
                </view>
                <button class="cancel-btn" @tap="closePopup" data-attrname="showShare">取消</button>
            </view>
        </van-popup>

        <!-- 海报展示弹窗 -->
        <view v-if="showPoster" class="poster-popup" @tap="closePosterPopup">
            <image class="poster-img" :src="testimgUrl"></image>
            <view class="me-fx-row me-fx-c-c footer-save">
                <button class="save-btn" @tap.stop.prevent="savePoster">保存海报</button>
            </view>
        </view>

        <!-- 限购弹窗 -->
        <van-popup
            :show="showPurchasing"
            position="center"
            :close-on-click-overlay="true"
            @click-overlay="closePopup($event, { attrname: 'showPurchasing' })"
            data-attrname="showPurchasing"
            custom-style="border-radius:22rpx;"
        >
            <view class="me-fx-col me-fx-c-c purchasing-content">
                <view class="title-text">超过限购件数</view>
                <view class="msg-text">该商品限购{{ activityInfo.limitBuyCount }}件，已达购买总上限，</view>
                <view class="msg-text">请修改购买数量</view>
                <view class="me-fx-row goods-info">
                    <image :src="currentSku.imageUrl" class="goods-img"></image>
                    <view class="me-fx-1 me-fx-col me-fx-sb">
                        <view class="goods-name">{{ activityInfo.commodityName }}</view>
                        <view class="me-fx-row me-fx-sb-c">
                            <text class="price">¥{{ currentSku.livePrice }}</text>
                            <text class="count">x{{ buyCount }}</text>
                        </view>
                    </view>
                </view>
                <button class="zd-btn" @tap="closePopup" data-attrname="showPurchasing">我知道了</button>
            </view>
        </van-popup>

        <van-popup :show="isEnd" :close-on-click-overlay="true" custom-style="border-radius:28rpx;" @click-overlay="hideEndPopup">
            <view class="me-fx-col me-fx-c-c activity-end-popup-content">
                <view class="title-text">秒杀活动已结束</view>
                <view class="goods-name">{{ activityInfo.commodityName }}</view>
                <image class="activity-end-img" src="/static/pages/seckill/imgs/activity_end_img.png"></image>
                <!-- <button class='popup-btn' bindtap='jumpJoinUserList'>查看推荐订单</button> -->
            </view>
        </van-popup>

        <!-- 授权组件 -->
        <auth-get-info></auth-get-info>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
import addSubtractNum from '@/pages/Component/add-subtract-num/add-subtract-num';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import canvasSynthetic from '../components/canvas_synthetic/canvas_synthetic';
import authGetInfo from '../../Component/auth-get-info/auth-get-info';
let app = getApp();
export default {
    components: {
        // vanPopup,
        addSubtractNum,
        // vanCountDown,
        canvasSynthetic,
        authGetInfo
    },
    data() {
        return {
            showShare: false,

            //显示分享弹窗状态
            showSelSpecification: false,

            //选择规格弹窗显示状态
            currentBanner: 0,

            //当前banner
            isCountDesabled: false,

            //禁止改变数量状态
            buyCount: 1,

            //购买数量
            skuList: [],

            //规格列表
            currentSku: {
                imageUrl: '',
                livePrice: '',
                residueCommoditySkuCount: ''
            },

            //当前选中规格
            goodsSkuId: '',

            //选择的商品规格id
            isEnd: false,

            //活动结束状态
            activityInfo: {
                //活动信息
                detailImgUrls: [],

                videoUrl: '',
                videoCover: '',
                bannerImgUrls: [],
                lowPrice: '',
                price: '',
                state: 0,
                limitBuyCount: '',
                residueCommodityCount: '',
                residueCommodityTotalCount: '',
                commodityName: '',
                orderTypeArr: []
            },

            downTimes: 0,

            downTimeObj: {
                days: '',
                hours: '',
                minutes: '',
                seconds: ''
            },

            showPoster: false,

            //海报弹展示状态
            showPurchasing: false,

            //限购弹窗状态
            imgs: [
                {
                    src: '',
                    width: 508,
                    height: 508,
                    x: 20,
                    y: 90
                },
                {
                    src: '',
                    width: 190,
                    height: 190,
                    x: 338,
                    y: 618
                }
            ],

            rectInfo: [22, 756, 146, 52, 26, '#FFBB38'],

            texts: [
                {
                    content: '商家名称商家名称',
                    color: '#616161',
                    size: 28,
                    x: 274,
                    y: 30,
                    center: true
                },
                {
                    content: '秒杀价:',
                    color: '#1577FF',
                    size: 37,
                    x: 24,
                    y: 676
                },
                {
                    content: '1759',
                    color: '#1577FF',
                    size: 50,
                    x: 146,
                    y: 668
                },
                {
                    content: '原价:2500',
                    color: '#fff',
                    size: 26,
                    x: 95,
                    y: 764,
                    isDelLine: true,
                    center: true
                },
                {
                    content: '立即扫码参与秒杀',
                    color: '#616161',
                    size: 18,
                    x: 362,
                    y: 816
                }
            ],

            testimgUrl: '',

            //生成的海报地址
            loginInfo: {
                userPhone: ''
            },

            //登录时返回的信息
            shareUrl: '/pages/seckill/detail/detail',

            //分享地址
            //挂载授权组件状态
            mountAuthGetInfo: false,

            showAllUser: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var scene = options.scene;
        app.globalData.globalEvent.$on('loginComplete', () => {
            if (scene) {
                //扫码进入
                this.getCodeParams(scene);
            } else {
                this.initData(options);
            }
        });
        app.globalData.globalEvent.$on('loginReject', () => {
            this.initData(options);
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.synthetic = this.$mp.page.selectComponent('.synthetic');
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
    onShareAppMessage: function () {
        return {
            title: this.loginInfo.nickName + '邀请你参与秒杀活动',
            path: this.shareUrl,
            imageUrl: this.activityInfo.bannerImgUrls[0]
        };
    },
    /* 分享朋友圈 */
    onShareTimeline() {
        return {
            title: this.loginInfo.nickName + '邀请你参与秒杀活动',
            imageUrl: this.activityInfo.bannerImgUrls[0]
        };
    },
    methods: {
        getCodeParams(id) {
            //扫码进入该页面
            let data = {
                id
            };
            app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    var scene = JSON.parse(data.scene);
                    this.initData(scene);
                }
            });
        },

        initData(options) {
            var activityId = options.activityId;
            var shareUserId = options.shareUserId;

            if (activityId) {
                this.activityId = activityId;
            }

            if (shareUserId) {
                this.shareUserId = shareUserId;
            }

            uni.getStorage({
                key: 'zl_userInfo',
                success: (res) => {
                    var data = res.data || {};
                    var info = data.data.data || {};
                    var userId = info.userId;
                    var loginInfo = {
                        userId,
                        openId: info.setInfo.openId,
                        appId: info.setInfo.appId,
                        nickName: info.nickname,
                        marchantLogic: info.setInfo.headImage,
                        marchantName: info.setInfo.appName,
                        merchantId: info.setInfo.merchantId,
                        userPhone: info.phoneNumber
                    };
                    var shareUrl = this.shareUrl + '?activityId=' + activityId + '&shareUserId=' + userId;
                    this.codeInfo = data;
                    this.setData({
                        loginInfo,
                        shareUrl
                    });
                    this.getCodeImg(); //获取小程序码图
                }
            });
            this.getDetailInfo(); //获取详情数据
        },

        getCodeImg() {
            var appid = this.loginInfo.appId;
            var shareUrl = this.shareUrl;
            app.globalData
                .sjrequest1('/activityBusiness/createQr', {
                    page: shareUrl,
                    appId: appid
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var imgs = this.imgs;
                        var data = res.data.data;
                        imgs[1].src = data;
                        this.setData({
                            imgs
                        });
                    }
                });
        },

        swiperChange(e) {
            //banner图改变时
            var current = e.detail.current;
            this.setData({
                currentBanner: current
            });
            var videoUrl = this.activityInfo.videoUrl;

            if (videoUrl) {
                var videoContext = uni.createVideoContext('swiperVideo');

                if (current == 0) {
                    // videoContext.play();
                } else {
                    videoContext.pause();
                }
            }
        },

        jumpMS() {
            uni.navigateTo({
                url: '/pages/seckill/order-classify/order-classify'
            });
        },

        jumpConfirmOrder() {
            //跳转确认订单
            var { buyCount, currentSku, activityInfo } = this;
            var limitBuyCount = activityInfo.limitBuyCount;
            var skuCount = currentSku.residueCommoditySkuCount;

            if (buyCount > limitBuyCount && limitBuyCount !== -1) {
                return uni.showToast({
                    title: '你还剩' + limitBuyCount + '次限购数量',
                    icon: 'none'
                });
            }

            if (buyCount > skuCount && skuCount !== -1) {
                return uni.showToast({
                    title: '您购买的数量超出了库存数',
                    icon: 'none'
                });
            }

            var query = {
                buyCount,
                skuInfo: currentSku,
                goodsName: activityInfo.commodityName,
                userShipping: activityInfo.userShipping || {},
                shareUserId: this.shareUserId || '',
                activityId: this.activityId,
                commodityId: activityInfo.commodityId,
                limitBuyCount,
                orderType: activityInfo.orderTemplate
            };
            var queryStr = JSON.stringify(query);
            queryStr = 'query=' + encodeURIComponent(queryStr);
            this.setData({
                showSelSpecification: false
            });
            uni.navigateTo({
                url: '/pages/seckill/confirm-order/confirm-order?' + queryStr,
                events: {
                    uploadData: () => {
                        this.getDetailInfo();
                    }
                }
            });
        },

        jumpShop() {
            uni.navigateTo({
                url: '/pages/shopHome/home/home'
            });
        },

        jumpChat() {
            var { marchantLogic, marchantName, merchantId } = this.loginInfo;
            uni.navigateTo({
                url: `/pages/order/contact/contact?logoPic=${marchantLogic}&marchantId=${merchantId}&marchantName=${marchantName}`
            });
        },

        viewAll() {
            //查看全部发起平团用户
            this.setData({
                showAllUser: true
            });
        },

        openShare() {
            //打开分享
            this.setData({
                showShare: true
            });
        },

        closePopup(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //关闭弹窗
            var attrname = e.currentTarget.dataset.attrname;
            this[e.currentTarget.dataset.attrname] = false;
        },

        finishFun() {
            //倒计时完成
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

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        getDetailInfo() {
            //获取详情信息
            app.globalData
                .sjrequest1('/activityBusiness/activityDetail', {
                    activityId: this.activityId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var nowTime = new Date().getTime();
                        var data = res.data.data;

                        if (data.state == 1) {
                            //活动未开始
                            var startTime = this._parseDate(data.startTime, 'number');

                            var diffTime = startTime - nowTime;
                        } else {
                            var endTime = this._parseDate(data.endTime, 'number');

                            var diffTime = endTime - nowTime;
                            var isEnd = diffTime <= 0;

                            if (isEnd) {
                                this.activityEnd();
                            }
                        }

                        var currentSku = data.activityCommoditySkuList.find((item) => item.isDefault == 1);
                        currentSku || (currentSku = data.activityCommoditySkuList[0]);
                        data.price = currentSku.price;
                        data.lowPrice = currentSku.livePrice;
                        data.orderTypeArr = data.orderTemplate.split(',');
                        this.setData({
                            currentSku,
                            activityInfo: data,
                            currentSku,
                            skuList: data.activityCommoditySkuList,
                            goodsSkuId: currentSku.skuId,
                            downTimes: diffTime // isCountDesabled:data.residueBuyCount==1,
                        });
                        this.fillCanvasData(data); //填充绘制海报时所需数据
                    }
                });
        },

        hideEndPopup() {
            //隐藏活动结束弹出层
            this.setData({
                isEnd: false
            });
        },

        activityEnd() {
            //显示活动结束弹出并返回首页
            var activityInfo = this.activityInfo;

            if (activityInfo.state == 1) {
                //活动未开始时的倒计时结束
                var nowTime = new Date().getTime();

                var endTime = this._parseDate(activityInfo.endTime, 'number');

                var diffTime = endTime - nowTime;
                activityInfo.state = 2;
                this.setData({
                    downTimes: diffTime,
                    activityInfo
                });
            } else {
                this.setData({
                    isEnd: true
                });
                var activityShop = 'pages/shopHome/home/home';
                var pages = getCurrentPages();
                var len = pages.length;
                var delta = -1;
                var isHas = false;

                for (var i = len - 1; i >= 0; i--) {
                    var item = pages[i];
                    delta++;

                    if (item.route == activityShop) {
                        isHas = true;
                        break;
                    }
                }

                setTimeout(() => {
                    if (isHas) {
                        uni.navigateBack({
                            delta
                        });
                    } else {
                        uni.redirectTo({
                            url: '/' + activityShop
                        });
                    }
                }, 3000);
            }
        },

        fillCanvasData(data) {
            var imgs = this.imgs;
            var texts = this.texts;
            var skuItem1 = data.activityCommoditySkuList[0];
            imgs[0].src = data.bannerImgUrls[0]; //skuItem1.imageUrl;//商品图

            texts[0].content = this.loginInfo.marchantName; //商家名称

            texts[2].content = skuItem1.livePrice; //秒杀价

            texts[3].content = '原价:' + skuItem1.price; //原价

            this.setData({
                imgs,
                texts
            });
        },

        selGoodsSku(e) {
            //选择规格
            var skuitem = e.currentTarget.dataset.skuitem;
            var skuId = skuitem.skuId;
            this.setData({
                goodsSkuId: skuId,
                currentSku: skuitem
            });
        },

        handleFlootBtn() {
            var activityInfo = this.activityInfo;
            var residueBuyCount = this.activityInfo.residueBuyCount;

            if (residueBuyCount == 0) {
                //当前用户购买次数用完
                this.setData({
                    showPurchasing: true
                });
            } else {
                if (activityInfo.state == 1) {
                    uni.showToast({
                        title: '活动还未开始',
                        icon: 'none'
                    });
                } else {
                    this.setData({
                        showSelSpecification: true
                    });
                }
            }
        },

        minusCount() {
            if (this.isCountDesabled) {
                this.setData({
                    isCountDesabled: false
                });
            }
        },

        countChange(e) {
            //购买数量改变
            var buyCount = e.detail.value;
            var currentSku = this.currentSku;

            if (buyCount > currentSku.residueCommoditySkuCount) {
                this.setData({
                    isCountDesabled: true
                });
                return uni.showToast({
                    title: '购买数量超出库存数量',
                    icon: 'none'
                });
            }

            this.setData({
                buyCount
            });
        },

        createPosters() {
            //创建海报
            this.setData({
                showShare: false,
                showPoster: true
            });
            var testimgUrl = this.testimgUrl;

            if (!testimgUrl) {
                this.synthetic.startSyntheticImg();
            }
        },

        closePosterPopup() {
            //关闭海报展示弹窗
            this.setData({
                showPoster: false
            });
        },

        getCompleteImg(event) {
            //获取生成的海报地址
            var { url } = event.detail;
            this.setData({
                testimgUrl: url
            });
        },

        savePoster() {
            //保存海报
            this.synthetic.saveImg();
        },

        getPhoneNumber(e) {
            var detail = e.detail;
            var { appId, openId } = this.loginInfo;

            if (detail.iv) {
                var { iv, encryptedData } = detail;
                app.globalData
                    .sjrequest('/thirdWxLogin/deciphering', {
                        appid: appId,
                        openid: openId,
                        iv,
                        encryptedData
                    })
                    .then((res) => {
                        if (res.statusCode == 200 && res.data.code == 200) {
                            var codeInfo = this.codeInfo;
                            var phone = res.data.data.phoneNumber;
                            var loginInfo = this.loginInfo;
                            loginInfo.userPhone = phone;
                            this.setData({
                                loginInfo
                            });

                            if (codeInfo && codeInfo.data && codeInfo.data.data) {
                                var resData = codeInfo.data.data;
                                resData.phoneNumber = phone;
                                uni.setStorage({
                                    key: 'zl_userInfo',
                                    data: resData
                                });
                            }
                        }
                    });
            }
        },

        showShareFun(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 showShare 未声明');
        }
    }
};
</script>
<style>
page {
    background-color: #f1f1f1;
}

.detail-page {
    padding-bottom: 100rpx;
}

/* 顶部banner */
.top-banner {
    position: relative;
}

.top-banner .banner-swiper {
    width: 750rpx;
    height: 750rpx;
}

.top-banner .count-text-box {
    position: absolute;
    bottom: 20rpx;
    color: #fff;
    right: 20rpx;
    background-color: rgba(0, 0, 0, 0.5);
    width: 72rpx;
    height: 44rpx;
    border-radius: 22rpx;
    text-align: center;
    line-height: 44rpx;
    font-size: 18rpx;
}

.banner-swiper .swiper-item {
    width: 100%;
    height: 100%;
}

.banner-swiper .swiper-content {
    width: 100%;
    height: 100%;
}

.banner-swiper .banner-img {
    width: 100%;
    height: 100%;
    background-color: #ccc;
}

/* 基本信息 */
.base-info {
    background-color: #fff;
    border-radius: 16rpx;
    box-sizing: border-box;
    width: 710rpx;
    margin: 0 auto;
    margin-top: 20rpx;
    overflow: hidden;
}

.base-info .price-down-count {
    height: 100rpx;
    border-radius: 16rpx 16rpx 0 0;
    color: #fff;
    background: linear-gradient(273deg, #e10000 0%, #e70200 100%);
}

.base-info .price-down-count .price-box {
    padding: 0 12rpx;
    box-sizing: border-box;
}

.base-info .price-down-count .seckill-logo-img {
    width: 76rpx;
    height: 76rpx;
    margin-right: 30rpx;
}

.base-info .price-down-count .now-price {
    font-size: 30rpx;
}

.base-info .price-down-count .now-price .price-num {
    font-size: 50rpx;
    font-weight: bold;
}

.base-info .price-down-count .old-price {
    font-size: 28rpx;
    margin-left: 15rpx;
    text-decoration: line-through;
}

.base-info .beautify-box .box1 {
    width: 0;
    height: 0;
    border: 30rpx solid transparent;
    border-top: 25rpx solid #e10000;
    border-left: 15rpx solid #e10000;
    border-right: 15rpx solid #1577ff;
    border-bottom: 25rpx solid #1577ff;
}

.base-info .beautify-box .box2 {
    width: 0;
    height: 0;
    border: 30rpx solid transparent;
    border-top: 25rpx solid #1577ff;
    border-right: 15rpx solid #1577ff;
    border-left: 15rpx solid #e10000;
    border-bottom: 25rpx solid #e10000;
}

.base-info .price-down-count .down-count {
    background-color: #1577ff;
    font-size: 24rpx;
    width: 264rpx;
    color: #fff;
}

.base-info .price-down-count .down-count .time-row {
    font-size: 30rpx;
    color: #fff;
}

.base-info .price-down-count .down-count .count-num {
    margin: 0 5rpx;
    width: 40rpx;
    height: 44rpx;
    background-color: #005ddd;
    text-align: center;
    line-height: 44rpx;
    border-radius: 8rpx;
}

.base-info .labels-container {
    padding: 26rpx 30rpx 10rpx 10rpx;
    box-sizing: border-box;
}

.base-info .labels-container .label-text2 {
    background: linear-gradient(152deg, #ff972a 0%, #fd5c00 100%);
    font-size: 20rpx;
    padding: 3rpx 10rpx;
    border-radius: 22rpx;
    color: #fff;
}

.base-info .remaining-count {
    font-size: 20rpx;
    color: #ffbb38;
    margin-left: 20rpx;
}

.base-info .goods-name {
    font-size: 30rpx;
    color: #0f0f0f;
    font-weight: bold;
    box-sizing: border-box;
    width: 450rpx;
}

.base-info .base-info-bottom {
    padding: 0rpx 0 16rpx 10rpx;
}

.base-info .base-info-bottom .inventory-text {
    font-size: 22rpx;
    color: #666;
}

.base-info .base-info-bottom .share-box {
    font-size: 20rpx;
    background-color: #eb1918;
    color: #fff;
    padding: 5rpx 15rpx;
    border-radius: 22px 0px 0px 22px;
}

.base-info .base-info-bottom .share-box .wx-img {
    width: 36rpx;
    height: 36rpx;
    margin-right: 5rpx;
}

/* 属性信息 */
.attr-info {
    margin: 20rpx auto 0;
    width: 710rpx;
    border-radius: 16rpx;
    background-color: #fff;
    padding: 0 10rpx;
    box-sizing: border-box;
}

.attr-info .info-item {
    height: 92rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
}

.attr-info .info-item:not(:last-child) {
    border-bottom: 1rpx solid #f2f2f2;
}

.attr-info .info-item .attr-title {
    font-size: 24rpx;
    color: #999;
    margin-right: 40rpx;
}

.attr-info .info-item .che-img {
    width: 28rpx;
    height: 28rpx;
}

.attr-info .info-item .label1-text {
    font-size: 20rpx;
    color: #fff;
    border-radius: 10rpx;
    padding: 5rpx 15rpx;
    background: linear-gradient(90deg, #eb1918 0%, #ff6f6e 100%);
    margin-left: 5rpx;
}

.attr-info .info-item .label-text2 {
    font-size: 24rpx;
    color: #fff;
    border-radius: 10rpx;
    padding: 5rpx 15rpx;
    background: linear-gradient(90deg, #ff972a 0%, #fd5c00 100%);
}

.attr-info .info-item .connect-line {
    background: linear-gradient(270deg, #ff972a 0%, #fd5c00 100%);
    width: 60rpx;
    height: 8rpx;
}

.attr-info .info-item .content-str {
    font-size: 24rpx;
    color: #333;
    font-weight: bold;
}

.attr-info .info-item .point-adorn-img {
    width: 40rpx;
    height: 12rpx;
}

/* 模块标题 */
.block-title-box {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.block-title-box .col-line {
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
    width: 12rpx;
    height: 32rpx;
    margin-right: 15rpx;
    border-radius: 6rpx;
}

/* 活动说明 */
.explain-info {
    padding: 20rpx;
    margin-top: 20rpx;
    background-color: #fff;
    box-sizing: border-box;
}

.explain-info .explain-text {
    font-size: 22rpx;
    color: #999;
}

/* 详情图 */
.detail-imgs {
    margin-top: 20rpx;
}

.detail-imgs .block-title-box {
    padding: 0 20rpx;
    box-sizing: border-box;
}

.detail-imgs .detail-img {
    width: 750rpx;
    background-color: #ccc;
}

/* 页面底部 */
.floot-container {
    font-size: 18rpx;
    color: #6d6d6d;
    position: fixed;
    display: flex;
    align-items: center;
    bottom: -22rpx;
    left: 0;
    width: 100%;
    height: 140rpx;
    background-color: #fff;
}

.floot-container .link-item {
    margin-left: 60rpx;
}

.floot-container .icon-img {
    width: 40rpx;
    height: 40rpx;
    margin-bottom: 5rpx;
}

.floot-container .handel-btn {
    font-size: 24rpx;
    color: #fff;
    text-align: center;
    background: linear-gradient(180deg, #f2180c 0%, #ea2610 100%);
    box-shadow: 0px 6px 12px rgba(237, 31, 14, 0.1);
    margin: 0 20rpx 20rpx 0;
    padding: 0;
    width: 346rpx;
    height: 74rpx;
    line-height: 74rpx;
    border-radius: 38rpx;
}
.service {
    margin-bottom: 10rpx;
}
.floot-container .disable-btn {
    background: #999;
}

.floot-container .get-phone-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    background-color: transparent;
    border-radius: 0;
}

.floot-container .get-phone-btn:after {
    border: 0;
}

/* 选择规格弹窗 */
.sel-specification-popup {
    background-color: #fff;
    padding: 30rpx;
    box-sizing: border-box;
}

.sel-specification-popup .goods-base-info {
    border-bottom: 1rpx solid #e5e5e5;
    padding-bottom: 20rpx;
}

.sel-specification-popup .goods-base-info .goods-img {
    width: 156rpx;
    height: 156rpx;
    border-radius: 8rpx;
    margin-right: 16rpx;
    background-color: #ccc;
}

.sel-specification-popup .goods-base-info .right-info {
    height: 156rpx;
    font-size: 28rpx;
    color: #0f0f0f;
}

.sel-specification-popup .goods-base-info .price-text {
    font-size: 40rpx;
    color: #eb1918;
}

.sel-specification-popup .specification-list {
    border-bottom: 1rpx solid #e5e5e5;
    padding: 20rpx 0;
}

.sel-specification-popup .specification-list .title-text {
    font-size: 28rpx;
    color: #000;
    margin-bottom: 20rpx;
}

.sel-specification-popup .specification-list .specification-item {
    font-size: 26rpx;
    color: #acacac;
    padding: 3rpx 15rpx;
    border: 1rpx solid #acacac;
    border-radius: 10rpx;
    margin-right: 20rpx;
}

.sel-specification-popup .specification-list .sel-item {
    background-color: #fde7e7;
    border-color: #eb1918;
    color: #eb1918;
}

.sel-specification-popup .buy-count {
    padding: 20rpx 0;
}

.sel-specification-popup .buy-count .title-text {
    font-size: 28rpx;
    color: #000;
}

.sel-specification-popup .buy-count .msg-text {
    font-size: 24rpx;
    color: #acacac;
    margin-right: 10rpx;
}

.sel-specification-popup .down-order-btn {
    background-color: #eb1918;
    font-size: 24rpx;
    color: #fff;
    width: 382rpx;
    height: 74rpx;
    padding: 0;
    margin: 30rpx auto;
    line-height: 74rpx;
    border-radius: 38rpx;
}

/* 分享弹窗 */
.share-content-popup {
    background-color: #fff;
    font-size: 24rpx;
    color: #999;
    padding: 40rpx 0;
}

.share-content-popup .share-img {
    width: 100rpx;
    height: 100rpx;
    margin-bottom: 10rpx;
}

.share-content-popup .cancel-btn {
    width: 418rpx;
    height: 88rpx;
    font-size: 30rpx;
    background-color: #666;
    color: #fff;
    line-height: 88rpx;
    border-radius: 44rpx;
    padding: 0;
    margin: 32rpx auto 0;
}

.share-content-popup .share-btn {
    padding: 0;
    margin: 0;
    background-color: transparent;
    font-size: 24rpx;
    color: #999;
}

.share-content-popup .share-btn:after {
    border: 0;
}

/* 海报弹窗展示状态 */
.poster-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.poster-popup .poster-img {
    width: 548rpx;
    height: 856rpx;
    position: absolute;
    background-color: #fff;
    top: 50%;
    left: 50%;
    border-radius: 20rpx;
    transform: translate(-50%, -60%);
}

.poster-popup .footer-save {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 132rpx;
    background-color: #fff;
}

.poster-popup .footer-save .save-btn {
    width: 418rpx;
    height: 88rpx;
    line-height: 88rpx;
    padding: 0;
    margin: 0;
    background-color: #ffbb38;
    font-size: 30rpx;
    color: #fff;
    border-radius: 44rpx;
}

/* ---------------------- */

/* 活动结束 蒙层 */
.activity-end-popup-content {
    background-color: #fff;
    border-radius: 28rpx;
    width: 580rpx;
    padding: 28rpx 0 34rpx;
}

.activity-end-popup-content .goods-name {
    font-size: 24rpx;
    color: #999;
}

.activity-end-popup-content .title-text {
    font-size: 36rpx;
    font-weight: bold;
}

.activity-end-popup-content .activity-end-img {
    width: 434rpx;
    height: 250rpx;
    margin: 68rpx 0 32rpx;
}

.activity-end-popup-content .popup-btn {
    font-size: 32rpx;
    width: 490rpx;
    height: 88rpx;
    border-radius: 48rpx;
    background: linear-gradient(273deg, #fe213f 0%, #ff662a 100%);
    color: #fff;
    padding: 0;
    line-height: 88rpx;
}

/* ---------------------------- */

.purchasing-content {
    width: 618rpx;
    height: 500rpx;
    background-color: #fff;
}

.purchasing-content .title-text {
    font-size: 30rpx;
    color: #0f0f0f;
    font-weight: bold;
    margin-bottom: 40rpx;
}

.purchasing-content .msg-text {
    font-size: 26rpx;
    color: #333;
}

.purchasing-content .goods-info {
    background-color: #f7f7f7;
    margin-top: 20rpx;
    width: 578rpx;
    height: 160rpx;
    padding: 10rpx;
    box-sizing: border-box;
}

.purchasing-content .goods-img {
    width: 140rpx;
    height: 140rpx;
    border-radius: 8rpx;
    margin-right: 60rpx;
    background-color: #ccc;
}

.purchasing-content .goods-name {
    font-size: 26rpx;
    color: #0f0f0f;
    font-weight: bold;
}

.purchasing-content .zd-btn {
    width: 328rpx;
    height: 66rpx;
    border-radius: 44rpx;
    background-color: #eb1918;
    font-size: 30rpx;
    color: #fff;
    padding: 0;
    margin: 0;
    line-height: 66rpx;
    margin-top: 40rpx;
}

.purchasing-content .price {
    font-size: 32rpx;
    color: #eb1918;
    font-weight: bold;
}

.purchasing-content .count {
    font-size: 28rpx;
    color: #333;
}
</style>
