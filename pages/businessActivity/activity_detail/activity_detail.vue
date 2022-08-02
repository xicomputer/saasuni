<template>
    <view>
        <view class="top-swiper-container">
            <swiper style="height: 750rpx" :indicator-dots="false" @change="swiperChange">
                <swiper-item v-if="detailInfo.videoUrl" class="swiper-item-box">
                    <video id="swiperVideo" :src="detailInfo.videoUrl" class="banner-img" :poster="detailInfo.videoCover"></video>
                </swiper-item>
                <swiper-item class="swiper-item-box" v-for="(item, index) in detailInfo.detailImgUrls" :key="index">
                    <image mode="aspectFill" class="banner-img" :src="item"></image>
                </swiper-item>
            </swiper>
            <view class="me-fx-row me-fx-sb-c top-activity-info">
                <view class="me-full-text goods-name">{{ detailInfo.commodityName }}</view>
                <button open-type="share" class="me-fx-row me-fx-c-c share-btn">
                    <image class="share-icon" src="/static/pages/businessActivity/imgs/share-icon.png"></image>
                    <text>{{ detailInfo.templateName }}</text>
                </button>
            </view>
            <!-- <view class='join-user-show'>
            <view class='me-fx-row line-row'>
                <view class='me-fx-row me-fx-c-c user-item remove-item'
                    wx:for='{{joinUserList1}}' wx:key='index'
                >
                    <image src='{{item.headimgurl}}' class='user-avatar'></image>
                    <view style='flex-shrink:0;'>{{item.nickname}}已下单，正在分享好友购买</view>
                </view>
            </view>
            <view class='me-fx-row line-row'>
                <view class='me-fx-row me-fx-c-c user-item remove-item'
                    wx:for='{{joinUserList2}}' wx:key='index'
                >
                    <image src='{{item.headimgurl}}' class='user-avatar'></image>
                    <view style='flex-shrink:0;'>{{item.nickname}}已下单，正在分享好友购买</view>
                </view>
            </view>
        </view> -->
        </view>

        <view class="base-info">
            <view class="me-fx-row me-fx-sb-c goods-describe">
                <view class="me-full-text describe-text">剩余:{{ detailInfo.residueCommodityTotalCount }}</view>
                <view class="me-fx-row me-fx-c-c goods-price">
                    <text>￥</text>
                    <text class="price-num">{{ detailInfo.livePrice }}</text>
                </view>
            </view>
            <view class="me-fx-row me-fx-sb-c down-count">
                <view class="me-full-text template-name">活动名称：{{ detailInfo.templateName }}</view>
                <van-count-down :time="detailInfo.diffTimes" @change="timeChange" :auto-start="true" :use-slot="true" @finish="activityEnd">
                    <view class="me-fx-row me-fx-c-c times-str">
                        <text>{{ detailInfo.state == 1 ? '距开始' : '距结束' }}：</text>
                        <block v-if="activityTimes.days !== '00'">
                            <text class="num-val-box">{{ activityTimes.days }}</text>
                            天
                        </block>
                        <view class="num-val-box">{{ activityTimes.hours }}</view>
                        时
                        <view class="num-val-box">{{ activityTimes.minutes }}</view>
                        分
                        <view class="num-val-box" v-if="!recommendTimes.days">{{ activityTimes.seconds }}</view>
                        秒
                    </view>
                </van-count-down>
            </view>
        </view>
        <view class="msg-container" v-for="(item, index) in hasPushed" :key="index">
            <view :class="'me-fx-row me-fx-sb-c task-status-msg ' + (item.status == 2 || item.status == 3 ? 'complete' : 'ongoing')" v-if="item.status == 2 || item.status == 3">
                <view>
                    您已完成{{ item.alreadyOrder }}单任务，您购买商品已退还金额({{ item.income }}元)
                    <text v-if="item.status == 2">服务费：{{ item.serviceCharge }}</text>
                </view>
                <text class="view-detail" :data-item="item" @tap="viewOrder">订单</text>
            </view>
        </view>

        <!-- 参与活动公告 -->
        <view class="notice-container" v-if="userList.length">
            <view class="list-data-container">
                <view class="me-fx-col me-fx-c-c title-box">
                    <text>
                        已下单{{ detailInfo.activityJoinNumberTotal || 0 }}人数, 已邀请{{ detailInfo.activityVisitTotal || 0 }}人数, 已完成任务{{
                            detailInfo.activityJoinNumberSuccessTotal || 0
                        }}人数
                    </text>
                </view>
                <view class="data-list">
                    <view class="list-box" :style="'animation-duration:' + userList.length * 3 + 's'">
                        <view class="me-fx-row me-fx-start-c item-data" v-for="(item, index) in userList" :key="index">
                            <image :src="item.headimgurl" class="user-avatar"></image>

                            <text class="msg-content">{{ item.nickname }}已下单，正在分享好友购买</text>

                            <text class="me-full-text">下单时间 {{ item.createTime }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 属性列表 -->
        <view class="attr-list">
            <!-- <view class='me-fx-row me-fx-sb-c attr-item'>
            <text class='attr-name'>已选</text>
            <view class='me-fx-1'>
                <text class='product-specification'>{{detailInfo.itemText}}</text>
            </view>
        </view> -->
            <view class="me-fx-row me-fx-sb-c attr-item" @tap="selectAddress">
                <text class="attr-name">送至</text>
                <view class="me-fx-1 me-fx-row me-fx-start-c">
                    <image class="location-img" src="/static/pages/businessActivity/imgs/location-icon.png"></image>
                    <text>{{ addressFill || '请选择收货地址' }}</text>
                </view>
                <image class="point-adorn" src="/static/pages/businessActivity/imgs/point-adorn-img.png"></image>
            </view>
            <view class="me-fx-row me-fx-sb-c attr-item" @tap="selectAddress">
                <text class="attr-name">服务</text>
                <view class="me-fx-1 me-fx-row me-fx-start-c">
                    <text>
                        <text>付款后{{ detailInfo.shipmentsDay || 0 }}天发货</text>
                    </text>
                </view>
            </view>
            <!-- <view class='me-fx-row me-fx-sb-c attr-item' bindtap='hideLabel'>
            <text class='attr-name'>保障</text>
            <view class='me-fx-1 me-fx-row me-fx-start-c security-label-list'>
                <view class='me-fx-row me-fx-start-c security-label-item'
                    wx:for='{{securityLabel}}' wx:key='index'
                >
                    <text class='point-adorn-text' wx:if='{{index!==0}}'>·</text>
                    <text>{{item}}</text>
                </view>
            </view>
            <image class='point-adorn' src='../imgs/point-adorn-img.png'></image>
        </view> -->
            <view class="me-fx-row me-fx-sb-c attr-item" v-for="(item, index) in detailInfo.orderTypeArr" :key="index">
                <text class="attr-name">{{ item == 1 ? '物流发货' : item == 2 ? '同城配送' : '预订自取' }}</text>

                <view class="me-fx-1 me-fx-row me-fx-start-c">
                    <text class="logistics-label">购买</text>
                    <view class="connect-line"></view>
                    <text class="logistics-label">{{ item == 1 ? '接单发货' : item == 2 ? '配送' : '门店团购' }}</text>
                    <view class="connect-line"></view>
                    <text class="logistics-label">{{ item == 1 ? '收货完成' : '完成' }}</text>
                </view>
            </view>
        </view>

        <!-- 参与用户 与 活动说明 -->
        <view class="join-user-explain">
            <view class="explain-content">
                <view class="me-fx-row me-fx-start-c title-box">
                    <view class="v-line"></view>
                    <text class="title-text">{{ detailInfo.templateName }}活动规则</text>
                </view>
                <view class="me-fx-col text-content">
                    <view>1.用户需要购买本次活动商品获取参与资格。</view>
                    <view>2.购买后用户通过分享推荐三位朋友购买</view>
                    <view>3.一位朋友购买成功您购买的商品按比例进行退还金额直到推荐三位朋友购买成功，商家会把您购买的商品免费赠送</view>
                    <view>4.活动商品如有保质期，品质，假冒伪劣商品问题商家无条件支持退货，如有损坏可以退换，其它不给予支持退货</view>
                    <view>5.活动参与名额/次数/时间：商家设定后无法更改，直到活动结束</view>
                    <view>6.如需退货请及时保留证据并联系商家进行线下协调退货</view>
                    <view>
                        7.参与名额为{{ detailInfo.limitPeopleNumber == -1 ? '不限' : detailInfo.limitPeopleNumber }}，每人参与次数{{
                            detailInfo.limitJoinNumber == -1 ? '不限' : '为' + detailInfo.limitJoinNumber + '次'
                        }}
                    </view>
                </view>
                <view style="height: 20rpx"></view>
                <!-- <view class='me-fx-row me-fx-start-c title-box'>
                <view class='v-line'></view>
                <text class='title-text'>活动说明</text>
            </view>
            <view class='me-fx-col text-content'>
                <text>{{detailInfo.activityExplain}}</text>
            </view> -->
            </view>
        </view>

        <view class="detail-content">
            <view class="me-fx-row me-fx-start-c title-box">
                <view class="v-line"></view>
                <text class="title-text">详情</text>
            </view>
            <image class="detail-img" :src="item" mode="widthFix" v-for="(item, index) in detailInfo.detailImgUrls" :key="index"></image>
        </view>

        <view class="place-empty"></view>
        <view class="me-fx-row me-fx-sb-c foot-container">
            <view class="me-fx-row me-fx-c-c service">
                <view class="me-fx-col me-fx-c-c entrance-item" @tap="jumpChat">
                    <image class="foot-icon" src="/static/pages/businessActivity/imgs/msg-icon.png"></image>
                    <text>客服</text>
                </view>
                <view class="me-fx-col me-fx-c-c entrance-item" @tap="jumpShop">
                    <image class="foot-icon" src="/static/pages/businessActivity/imgs/foot-shop-icon.png"></image>
                    <text>店铺</text>
                </view>
            </view>
            <view class="me-fx-1 me-fx-col me-fx-c-c buy-btn ongoing" @tap="viewOrder" v-if="detailInfo.currentJoinStatus == 1">
                <text>已推{{ hasPushed[0].alreadyOrder || 0 }}单，商品金额退还{{ hasPushed[0].income || 0 }} 只差{{ hasPushed[0].residueOrder }}单赚取商品</text>
            </view>
            <view
                v-else
                :class="'me-fx-1 me-fx-row me-fx-sb-c buy-btn ' + (detailInfo.joinNumberResidue === 0 || detailInfo.residueCommodityTotalCount == 0 ? 'disabled-btn' : '')"
                @tap="jumpConfirmOrder"
            >
                <view v-if="detailInfo.residueCommodityTotalCount == 0">商品已售罄</view>
                <view v-else class="me-fx-col me-fx-c-c">
                    <text style="font-size: 30rpx; font-weight: bold">立即购买参与活动</text>
                    <text style="font-size: 20rpx" v-if="detailInfo.joinNumberResidue !== -1">
                        ({{ detailInfo.joinNumberResidue > 0 ? '可参与次数: ' + detailInfo.joinNumberResidue : '已无参与次数' }})
                    </text>
                </view>
                <view class="me-fx-row me-fx-c-c">
                    <text class="amount-symbol">￥</text>
                    <text class="foot-amount">{{ detailInfo.livePrice }}</text>
                </view>
            </view>
        </view>

        <van-popup :show="showXS" position="bottom" z-index="999" closeable close-icon="close" @close="hideLabel">
            <view class="xs-content">
                <view class="xs-top">商家自营保障</view>
                <view class="xs-des">服务说明</view>
                <view class="xs-item" v-for="(item, index) in labelList" :key="index">
                    <view class="xs-title">
                        <image src="/static/pages/img/hdui.png" class="dui-img" />
                        【{{ item.dict_label }}】
                    </view>

                    <view class="xs-text">{{ item.remark }}</view>
                </view>
                <view class="xs-btn" @tap="hideLabel">确认</view>
            </view>
        </van-popup>

        <van-popup :show="isEnd" :close-on-click-overlay="true" custom-style="border-radius:28rpx;" @click-overlay="hideEndPopup">
            <view class="me-fx-col me-fx-c-c activity-end-popup-content">
                <view class="title-text">推三返一活动已结束</view>
                <view class="goods-name">{{ detailInfo.commodityName }}</view>
                <image class="activity-end-img" src="/static/pages/businessActivity/imgs/activity_end_img.png"></image>
                <button class="popup-btn" @tap="jumpJoinUserList">查看推荐订单</button>
            </view>
        </van-popup>

        <van-popup :show="showAddressPopup" :close-on-click-overlay="true" custom-style="border-radius:28rpx;" @click-overlay="hideAddressPopup">
            <view class="me-fx-col me-fx-c-c not-address-popup">
                <text>您好</text>
                <text>你还没填入收货地址</text>
                <image class="not-address-img" src="/static/pages/businessActivity/imgs/not-address.png"></image>
                <button class="jump-btn" @tap="selectAddress">请填入收货地址</button>
            </view>
        </van-popup>

        <!-- 授权组件 -->
        <auth-get-info></auth-get-info>
    </view>
</template>

<script>
import countDown from '../components/countdown/countdown';
// import vanPopup from './@vant/weapp/popup/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import authGetInfo from '../../Component/auth-get-info/auth-get-info';
let app = getApp();
export default {
    components: {
        countDown,
        // vanPopup,
        // vanCountDown,
        authGetInfo
    },
    data() {
        return {
            appid: '',
            merchantId: '',
            activityId: '',

            //活动id
            activityTimes: {
                days: '',
                hours: '',
                minutes: '',
                seconds: ''
            },

            //倒计时数据
            btnDisabled: false,

            detailData: {},

            //商品信息
            labelList: [],

            //保障详情数据
            showXS: false,

            //保障详情显示状态
            isEnd: false,

            rebatedUserList: [],

            detailInfo: {
                videoUrl: '',
                videoCover: '',
                detailImgUrls: [],
                commodityName: '',
                templateName: '',
                residueCommodityTotalCount: '',
                livePrice: '',
                diffTimes: '',
                state: 0,
                activityJoinNumberTotal: '',
                activityVisitTotal: '',
                activityJoinNumberSuccessTotal: '',
                shipmentsDay: '',
                orderTypeArr: [],
                limitPeopleNumber: '',
                limitJoinNumber: '',
                currentJoinStatus: 0,
                joinNumberResidue: 0
            },

            hasPushed: [],

            //已推信息
            userList: [],

            //参与用户列表
            addressFill: '',

            //组合的完整地址
            showAddressPopup: false,

            //显示填写收货地址提示弹窗状态
            userShipping: {},

            //地址信息
            securityLabel: ['放心购', '材质保障', '限时折扣', '假一罚十'],

            supportToShop: ['购买', '到店', '完成'],
            logistics: ['购买', '接单发货', '收货完成'],
            shareUrl: '/pages/businessActivity/activity_detail/activity_detail',
            nickName: '',

            //用户昵称
            joinUserList1: [],

            joinUserList2: [],
            joinUserList: [],
            userInfo: {},

            //code接口返回的用户信息
            userPhone: '',

            //用户手机号
            marchantLogic: '',

            //商家log
            marchantName: '',

            //商家名称
            //查看订单调整的对应订单页面地址
            orderPageUrl: '',

            showSelSpecification: false,

            recommendTimes: {
                days: ''
            },

            alreadyOrder: '',
            income: '',
            residueOrder: ''
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
    onPullDownRefresh: function () {
        var activityId = this.activityId;
        this.getActivityDetail(activityId);
        this.participationUserList(activityId);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var title = '';

        if (this.nickName) {
            title = `${this.nickName} 邀请您参与${this.detailInfo.templateName}活动，一起免费赚商品！`;
        } else {
            title = this.detailInfo.title;
        }

        return {
            title: title,
            path: this.shareUrl,
            imageUrl: this.detailInfo.coverImage
        };
    },
    /* 分享朋友圈 */
    onShareTimeline() {
        var title = '';

        if (this.nickName) {
            title = `${this.nickName} 邀请您参与${this.detailInfo.templateName}活动，一起免费赚商品！`;
        } else {
            title = this.detailInfo.title;
        }

        return {
            title: title
        };
    },
    methods: {
        initData(options) {
            var activityId = options.activityid;
            this.activityId = activityId;
            this.setData({
                activityId: activityId
            });
            this.getActivityDetail(activityId);
            this.participationUserList(activityId);
            uni.getStorage({
                key: 'zl_userInfo',
                success: (res) => {
                    var data = res.data;

                    if (data.statusCode == 200 && data.data.code == 200) {
                        var info = data.data.data;
                        var userId = info.userId;
                        var shareUrl = this.shareUrl + '?activityid=' + activityId + '&shareUserId=' + userId;
                        var nickName = info.nickname;
                        var marchantLogic = info.setInfo.headImage;
                        var marchantName = info.setInfo.appName;
                        this.setData({
                            shareUrl,
                            nickName,
                            marchantLogic,
                            marchantName,
                            appid: info.setInfo.appId,
                            merchantId: info.setInfo.merchantId,
                            userInfo: info,
                            userPhone: info.phoneNumber
                        });
                    }
                }
            });

            if (options.shareUserId) {
                this.shareUserId = options.shareUserId;
                this.addRecord(activityId);
            }

            this.appid = uni.getStorageSync('appid');
        },

        getCodeParams(id) {
            let data = {
                id: id
            };
            return app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    var scene = JSON.parse(data.scene);
                    this.initData(scene);
                }
            });
        },

        handleBuy() {
            uni.navigateTo({
                url: '/pages/businessActivity/order_list/order_list'
            });
        },

        jumpShop() {
            uni.navigateTo({
                url: '/pages/shopHome/home/home'
            });
        },

        jumpChat() {
            var { marchantLogic, marchantName } = this;
            uni.navigateTo({
                url: `/pages/order/contact/contact?logoPic=${marchantLogic}&marchantId=${this.marchantId}&marchantName=${marchantName}`
            });
        },

        jumpPoster() {
            var query = encodeURIComponent(this.shareUrl);
            uni.navigateTo({
                url: '/pages/businessActivity/posters/posters?shareUrl=' + query
            });
        },

        // 跳转收货地址
        selectAddress() {
            app.globalData.comefrom = 'goodsDetail';
            uni.navigateTo({
                url: '/pages/Address/AddressList/AddressList',
                complete: (res) => {
                    this.hideAddressPopup();
                }
            });
        },

        //跳转参与用户列表
        jumpJoinUserList() {
            var query = '?activityId=' + this.activityId;
            uni.navigateTo({
                url: '/pages/businessActivity/joinuser_list/joinuser_list' + query
            });
        },

        hideLabel() {
            //关闭打开保障详情
            this.setData({
                showXS: !this.showXS
            });
        },

        hideAddressPopup() {
            this.setData({
                showAddressPopup: false
            });
        },

        getParams() {
            //查商品信息/commodity/queryCommodityInfo
            app.globalData
                .sjrequest1('/activityCommodityBusiness/queryCommodityInfo', {
                    activityId: this.activityId,
                    commodityId: this.detailInfo.commodityId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        this.setData(
                            {
                                detailData: data
                            },
                            () => {
                                // this.getLabelList();
                            }
                        );
                    }
                });
        },

        getJoinUser() {
            //查询参与活动用户
            app.globalData
                .sjrequest1('/activityTJFLBusiness/pullJoinList', {
                    pageSize: 8,
                    currentPage: 1,
                    activityId: this.activityId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0 && res.data.data) {
                        var list = res.data.data;

                        if (list.length) {
                            this.setData(
                                {
                                    joinUserList: [...list]
                                },
                                () => {
                                    this.startTime();
                                }
                            );
                        } else {
                            setTimeout(() => {
                                this.getJoinUser();
                            }, 10000);
                        }
                    }
                });
        },

        startTime() {
            //开始跑定时器展现参与用户
            var joinUserList = this.joinUserList;
            var i = 0;
            var len = joinUserList.length;
            var joinUserList1 = this.joinUserList1;
            var joinUserList2 = this.joinUserList2;
            var inter = setInterval(() => {
                var item = joinUserList.shift();
                i++;

                if (i % 2 == 0) {
                    joinUserList2.shift();
                    joinUserList2.push(item);
                } else {
                    joinUserList1.shift();
                    joinUserList1.push(item);
                }

                if (i == len) {
                    clearInterval(inter);
                    inter = null;
                    this.getJoinUser();
                }

                this.setData({
                    joinUserList1,
                    joinUserList2
                });
            }, 6000);
        },

        //获取标签列表
        getLabelList() {
            let data = {
                labelIntros: this.detailData.arrLabels
            };
            app.globalData.sjrequest('/commodity/queryLabelIntro', data).then((res) => {
                this.setData({
                    labelList: res.data.data
                });
            });
        },

        findFreightStr() {
            this.getActivityDetail();
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        viewOrder(e) {
            //查看任务详情
            var item = e.currentTarget.dataset.item || {};
            var orderState = item.orderState || '';
            var orderNum = item.orderNo || '';
            var orderPageUrl = this.orderPageUrl;
            uni.navigateTo({
                url: orderPageUrl + '?orderState=' + orderState + '&orderNo=' + orderNum
            });
        },

        getJumpOrderUrl(orderTemplate) {
            var orderType = Number(orderTemplate || 1);
            var url = '/pages/businessActivity/';

            switch (orderType) {
                case 1:
                    url += 'order_list/order_list';
                    break;

                case 2:
                    rul += 'local-list/local-list';
                    break;

                case 3:
                    url += 'booking-list/booking-list';
                    break;
            }

            this.setData({
                orderPageUrl: url
            });
        },

        hideEndPopup() {
            //隐藏活动结束弹出层
            this.setData({
                isEnd: false
            });
        },

        //活动详情
        getActivityDetail() {
            app.globalData
                .sjrequest1('/activityBusiness/activityDetail', {
                    activityId: this.activityId
                })
                .then((res) => {
                    uni.stopPullDownRefresh();

                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        var nowDate = new Date().getTime();

                        if (data.state == 1) {
                            //未开始
                            var startDate = this._parseDate(data.startTime, 'number');

                            data.diffTimes = startDate - nowDate;
                        } else {
                            var endDate = this._parseDate(data.endTime, 'number');

                            data.diffTimes = endDate - nowDate;
                            var isEnd = data.diffTimes <= 0;

                            if (isEnd) {
                                this.activityEnd();
                            }
                        }

                        this.marchantId = data.marchantId;
                        var userShipping = data.userShipping || {};
                        var addressKeyName = ['provincesName', 'cityName', 'areaName', 'address'];
                        var addressFill = '';
                        addressKeyName.forEach((item) => {
                            //组合完整地址
                            if (userShipping[item]) {
                                addressFill += userShipping[item];
                            }
                        });
                        var skuItem1 = data.activityCommoditySkuList[0] || {};
                        data.livePrice = skuItem1.livePrice;
                        data.imageUrl = skuItem1.imageUrl;
                        data.preferences = JSON.parse(data.preferences); //计算已参与用户跳转对应订单列表地址 物流 同城 预订

                        var joinState = data.currentJoinStatus; //用户参与状态

                        if (joinState == 1) {
                            var orderTemplate = uni.getStorageSync('orderTemplate_key');
                            this.getJumpOrderUrl(orderTemplate);
                        } else {
                            uni.setStorage({
                                key: 'orderTemplate_key',
                                data: ''
                            });
                        }

                        data.orderTypeArr = data.orderTemplate.split(',');
                        this.setData(
                            {
                                detailInfo: data,
                                addressFill,
                                userShipping,
                                hasPushed: data.activityFinanceResponses || []
                            },
                            () => {
                                this.getParams();
                            }
                        );
                    }
                });
        },

        timeChange(e) {
            var times = e.detail;

            if (times.days < 10) {
                times.days = '0' + times.days;
            }

            if (times.hours < 10) {
                times.hours = '0' + times.hours;
            }

            if (times.minutes < 10) {
                times.minutes = '0' + times.minutes;
            }

            if (times.seconds < 10) {
                times.seconds = '0' + times.seconds;
            }

            this.setData({
                activityTimes: times
            });
        },

        addRecord(activityId) {
            //增加分享记录
            app.globalData
                .sjrequest1('/activityBusiness/addShareRecord', {
                    activityId,
                    shareUserId: this.shareUserId
                })
                .then((res) => {
                    console.log('新增记录', res);
                });
        },

        participationUserList(activityId) {
            //活动参与用户列表
            app.globalData
                .sjrequest1('/activityTJFLBusiness/financePageList', {
                    pageSize: 20,
                    currentPage: 1,
                    activityId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;

                        if (data) {
                            this.setData({
                                userList: data.list
                            });
                        }
                    }
                });
        },

        buyNow() {
            //立即购买
            if (this.btnDisabled) {
                return;
            }

            this.setData({
                btnDisabled: true
            });
            setTimeout(() => {
                this.setData({
                    btnDisabled: false
                });
            }, 1500);
            var detailInfo = this.detailInfo;
            var { commodityId, marchantId, activityId, joinNumberResidue, residueCommodityTotalCount, state } = detailInfo;

            if (state == 1) {
                return uni.showToast({
                    title: '活动还未开始',
                    icon: 'none'
                });
            }

            if (joinNumberResidue === 0 || residueCommodityTotalCount == 0) {
                if (residueCommodityTotalCount == 0) {
                    return uni.showToast({
                        title: '商品已售息',
                        icon: 'none'
                    });
                }

                if (joinNumberResidue === 0) {
                    return uni.showToast({
                        title: '参与次数已使用完',
                        icon: 'none'
                    });
                }
            } else {
                uni.showLoading({
                    title: '正在下单',
                    mask: true
                });
                var data = {
                    commodityId,
                    //商品id,
                    appId: this.appid,
                    //appid
                    merchantId: marchantId,
                    //商家id
                    activityId,
                    //活动id
                    amount: 1,
                    //购买数量
                    message: '',
                    //用户留言
                    skuId: '' //商品规格id
                };

                if (this.shareUserId) {
                    data.shareUserId = this.shareUserId;
                } //分享者id

                if (this.userShipping.id) {
                    data.userHippingId = this.userShipping.id;
                } //收货地址id

                app.globalData
                    .sjrequest1('/activityOrderBusiness/wxPay', data)
                    .then((res) => {
                        uni.hideLoading();

                        if (res.statusCode == 200 && res.data.code === 0) {
                            var data = res.data.data;
                            uni.requestPayment({
                                ...data,
                                success: (res) => {
                                    this.getActivityDetail();

                                    if (!this.addressFill) {
                                        this.setData({
                                            showAddressPopup: true
                                        });
                                        return;
                                    }

                                    this.subscribeMsg(data.orderNo, () => {
                                        uni.navigateTo({
                                            url: '/pages/businessActivity/order_list/order_list'
                                        });
                                    });
                                },
                                fail: (err) => {
                                    console.log('支付失败：', err);
                                }
                            });
                        } else {
                            uni.showToast({
                                title: res.data.info || '请求异常',
                                icon: 'none'
                            });
                        }
                    })
                    .catch((err) => {
                        uni.hideLoading();
                    });
            }
        },

        jumpConfirmOrder() {
            //跳转确认订单
            var detailInfo = this.detailInfo;
            var { commodityId, marchantId, activityId, joinNumberResidue, residueCommodityTotalCount, state, orderTemplate } = detailInfo;

            if (state == 1) {
                return uni.showToast({
                    title: '活动还未开始',
                    icon: 'none'
                });
            }

            if (joinNumberResidue === 0 || residueCommodityTotalCount == 0) {
                if (residueCommodityTotalCount == 0) {
                    return uni.showToast({
                        title: '商品已售息',
                        icon: 'none'
                    });
                }

                if (joinNumberResidue === 0) {
                    return uni.showToast({
                        title: '参与次数已使用完',
                        icon: 'none'
                    });
                }
            }

            var query = {
                buyCount: 1,
                activityId,
                commodityId,
                marchantId,
                skuInfo: detailInfo.activityCommoditySkuList[0],
                goodsName: detailInfo.commodityName,
                userShipping: detailInfo.userShipping || {},
                shareUserId: this.shareUserId || '',
                orderType: orderTemplate
            };
            var queryStr = JSON.stringify(query);
            queryStr = 'query=' + encodeURIComponent(queryStr);
            this.setData({
                showSelSpecification: false
            });
            uni.navigateTo({
                url: '/pages/businessActivity/confirm-order/confirm-order?' + queryStr,
                events: {
                    uploadData: () => {
                        this.getActivityDetail();
                    }
                }
            });
        },

        activityEnd() {
            //显示活动结束弹出并返回首页
            var detailInfo = this.detailInfo;

            if (detailInfo.state == 1) {
                //未开始的倒计时结束
                var nowDate = new Date().getTime();

                var endDate = this._parseDate(detailInfo.endTime, 'number');

                detailInfo.diffTimes = endDate - nowDate;
                detailInfo.state = 2;
                this.setData({
                    detailInfo
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

        subscribeMsg(orderNum, callback) {
            var appid = this.appid;

            if (appid) {
                return app.globalData
                    .sjrequest1('/subTemplate/listPriTemplateId', {
                        authorizerAppid: appid,
                        sceneTypes: [1, 7, 9]
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

        swiperChange(e) {
            var current = e.detail.current;
            var videoUrl = this.detailInfo.videoUrl;

            if (videoUrl) {
                var videoContext = uni.createVideoContext('swiperVideo');

                if (current == 0) {
                    // videoContext.play();
                } else {
                    videoContext.pause();
                }
            }
        }
    }
};
</script>
<style>
page {
    background-color: #f7f7f7;
}

/* 顶部banner */
.top-swiper-container {
    position: relative;
}

.top-swiper-container .swiper-item-box {
    width: 100%;
    height: 100%;
}

.top-swiper-container .banner-img {
    width: 750rpx;
    height: 750rpx;
    background-color: #ccc;
}

.top-swiper-container .foot-msg {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    bottom: 0;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    color: #ffe600;
    font-size: 24rpx;
    width: 100%;
}

.top-activity-info {
    height: 62rpx;
    width: 100%;
    font-size: 24rpx;
    color: #fff;
    background-color: #ed2625;
    padding-left: 20rpx;
    box-sizing: border-box;
}

.top-activity-info .goods-name {
    font-size: 28rpx;
    font-weight: bold;
    width: 448rpx;
}

.top-activity-info .share-btn {
    font-size: 20rpx;
    color: #ed2625;
    padding: 5rpx 15rpx;
    background-color: #fff;
    border-radius: 22px 0px 0px 22px;
    margin: 0;
}

.top-activity-info .share-btn .share-icon {
    width: 36rpx;
    height: 36rpx;
    margin-right: 10rpx;
}

@keyframes moveUser {
    from {
        transform: translateX(750rpx);
    }

    to {
        transform: translateX(-100%);
    }
}

.join-user-show {
    position: absolute;
    top: 190rpx;
    left: 0;
    width: 100%;
}

.join-user-show .line-row {
    margin-bottom: 34rpx;
    position: relative;
}

.join-user-show .user-item {
    font-size: 22rpx;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 3rpx 10rpx;
    border-radius: 28rpx;
    transform: translateX(750rpx);
}

.join-user-show .remove-item {
    animation: moveUser 6s linear;
}

.join-user-show .user-avatar {
    width: 32rpx;
    height: 32rpx;
    background-color: #ccc;
    flex-shrink: 0;
    border-radius: 50%;
    margin-right: 15rpx;
}

/* 基本信息 */
.base-info .down-count {
    padding: 0 20rpx;
}

.base-info .template-name {
    font-size: 30rpx;
    color: #fff;
    border-radius: 8rpx;
    font-weight: bold;
    padding: 3rpx 10rpx;
    background-color: #1577ff;
}

.base-info .times-str {
    font-size: 24rpx;
    color: #333;
    font-weight: normal;
}

.base-info .times-str .num-val-box {
    background-color: #d92322;
    padding: 0 5rpx;
    border-radius: 8rpx;
    color: #fff;
    margin: 0 3rpx;
}

.base-info .goods-describe {
    background-color: #fff;
    padding: 10rpx 20rpx;
    margin-bottom: 20rpx;
}

.base-info .goods-describe .describe-text {
    font-size: 28rpx;
    color: #ffbb38;
    -webkit-line-clamp: 2;
    width: 456rpx;
}

.base-info .goods-describe .goods-price {
    padding: 0 15rpx;
    background-color: #ed2625;
    color: #fff;
    font-size: 28rpx;
    font-weight: 500;
    border-radius: 8rpx;
}

.base-info .goods-describe .goods-price .price-num {
    font-size: 40rpx;
}

.msg-container {
    background-color: #fff;
    padding-top: 10rpx;
}

.msg-container .task-status-msg {
    font-size: 22rpx;
    box-sizing: border-box;
    color: #fff;
    padding: 15rpx;
    flex-wrap: wrap;
}

.msg-container .ongoing {
    background-color: #1577ff;
}

.msg-container .complete {
    background-color: #ff9215;
}

.msg-container .ongoing .view-detail {
    padding: 0rpx 10rpx;
    background-color: #074fb3;
}

.msg-container .complete .view-detail {
    padding: 0rpx 10rpx;
    background-color: #dc7600;
}

/* 属性信息 */
.attr-list {
    padding: 20rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    background-color: #fff;
    margin-top: 18rpx;
    color: #333;
}

.attr-list .attr-item {
    min-height: 90rpx;
    border-bottom: 1rpx solid #f2f2f2;
    display: flex;
    align-items: center;
}

.attr-list .attr-name {
    color: #999;
    font-weight: bold;
    margin-right: 40rpx;
}

.attr-list .product-specification {
    border: 2rpx solid #eb1918;
    color: #eb1918;
    padding: 5rpx 15rpx;
    border-radius: 20rpx;
}

.attr-list .freight-label {
    background: linear-gradient(90deg, #eb1918 0%, #ff6f6e 100%);
    border-radius: 10rpx;
    padding: 5rpx 15rpx;
    color: #fff;
}

.attr-list .logistics-label {
    background: linear-gradient(90deg, #ff972a 0%, #fd5c00 100%);
    border-radius: 10rpx;
    padding: 5rpx 15rpx;
    color: #fff;
}

.attr-list .connect-line {
    width: 68rpx;
    height: 8rpx;
    background: linear-gradient(270deg, #ff972a 0%, #fd5c00 100%);
}

.attr-list .to-shop-label {
    background: linear-gradient(90deg, #eb1918 0%, #ff6f6e 100%);
    border-radius: 10rpx;
    padding: 5rpx 15rpx;
    color: #fff;
}

.attr-list .security-label-list {
    flex-wrap: wrap;
}

.attr-list .security-label-item .point-adorn-text {
    margin: 0 5rpx;
    font-weight: bold;
}

.attr-list .point-adorn {
    width: 40rpx;
    height: 12rpx;
}

.attr-list .location-img {
    width: 28rpx;
    height: 30rpx;
    margin-right: 10rpx;
}

/* 正在完成任务公告 */
.notice-container {
    margin-top: 20rpx;
    position: relative;
    padding: 0 20rpx;
    box-sizing: border-box;
}

.notice-container .title-box {
    height: 64rpx;
    background-color: #000;
    border-radius: 16rpx 16rpx 0 0;
    color: #fff;
    font-size: 26rpx;
    text-align: center;
}

.notice-container .list-data-container {
    background-color: #fff;
    border-radius: 16rpx;
    border: 4rpx solid #000;
    box-sizing: border-box;
}

.notice-container .data-list {
    font-size: 26rpx;
    color: #666;
    overflow: hidden;
    max-height: 260rpx;
    padding: 10rpx;
}

@keyframes listBoxMove {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-100%);
    }
}

.notice-container .data-list .list-box {
    position: relative;
    animation: listBoxMove linear infinite;
}

.notice-container .data-list .item-data {
    padding: 0 10rpx;
    box-sizing: border-box;
    height: 80rpx;
    font-size: 20rpx;
}

.notice-container .data-list .user-avatar {
    width: 48rpx;
    height: 48rpx;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 20rpx;
    flex-shrink: 0;
}

.notice-container .data-list .msg-content {
    margin-right: 15rpx;
    color: #ed2625;
    flex-shrink: 0;
}

.notice-container .data-list .already-rebate {
    color: #eb1918;
    font-size: 20rpx;
}

/* 参与用户 与 活动说明 */
.join-user-explain {
    margin-top: 20rpx;
    background-color: #fff;
    padding: 20rpx 0;
}

.join-user-explain .earnings-msg {
    font-size: 26rpx;
    color: #fff;
    border-radius: 0px 24px 24px 0px;
    background-color: #ff9215;
    margin: 0 20rpx 10rpx 0;
    padding: 5rpx 15rpx;
    height: 46rpx;
    line-height: 46rpx;
}

.join-user-explain .explain-content {
    padding: 20rpx;
    box-sizing: border-box;
    font-size: 22rpx;
    color: #999;
}

.join-user-explain .explain-content .title-box {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 30rpx;
}

.join-user-explain .template-name {
    font-size: 30rpx;
    color: #fff;
    border-radius: 8rpx;
    font-weight: bold;
    padding: 3rpx 10rpx;
    background-color: #1577ff;
}

.join-user-explain .explain-content .v-line {
    width: 12rpx;
    height: 32rpx;
    border-radius: 6rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}

.join-user-explain .explain-content .title-box .title-text {
    margin: 0 15rpx;
}

.join-user-explain .explain-content .wen-icon {
    width: 28rpx;
    height: 30rpx;
}

.join-user-explain .view-all-btn {
    width: 355rpx;
    height: 52rpx;
    border-radius: 26rpx;
    color: #ffa800;
    border: 1rpx solid #ffa800;
    font-size: 26rpx;
    margin: 0 auto;
}

/* 详情 */
.detail-content {
    margin-top: 20rpx;
    background-color: #fff;
}

.detail-content .title-box {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 10rpx;
    padding: 20rpx;
    box-sizing: border-box;
}

.detail-content .title-box .v-line {
    width: 12rpx;
    height: 32rpx;
    border-radius: 6rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}

.detail-content .title-box .title-text {
    margin: 0 15rpx;
}

.detail-content .detail-table {
    width: 710rpx;
    margin: 0 auto;
    margin-bottom: 38rpx;
    border-bottom: 1rpx solid #707070;
}

.detail-content .detail-table .table-row {
    border-top: 1rpx solid #707070;
    border-left: 1rpx solid #707070;
    height: 56rpx;
}

.detail-content .detail-table .table-col {
    border-right: 1rpx solid #707070;
}

.detail-content .detail-table .key-str {
    font-size: 24rpx;
    color: #999;
    width: 126rpx;
    padding: 0 10rpx;
    box-sizing: border-box;
}

.detail-content .detail-table .val-str {
    font-size: 26rpx;
    color: #333;
    padding: 0 20rpx;
    box-sizing: border-box;
}

.detail-content .detail-img {
    width: 100%;
    background-color: #ccc;
}

/* 底部操作 */
.place-empty {
    height: 128rpx;
}

.foot-container {
    height: 160rpx;
    width: 100%;
    font-size: 18rpx;
    position: fixed;
    display: flex;
    align-items: center;
    bottom: -10px;
    left: 0;
    background-color: #fff;
}

.foot-container .entrance-item {
    margin-left: 40rpx;
}

.foot-container .foot-icon {
    width: 40rpx;
    height: 40rpx;
}

.foot-container .amount-symbol {
    font-size: 36rpx;
    font-weight: bold;
}

.foot-container .foot-amount {
    font-size: 50rpx;
    color: #fff;
    font-weight: bold;
}

.foot-container .buy-btn {
    background-color: #eb4058;
    font-size: 26rpx;
    color: #fff;
    height: 86rpx;
    display: flex;
    align-items: center;
    border-radius: 12rpx;
    margin: 0px 20rpx 18rpx 30rpx;
    padding: 40rpx 20rpx;
    box-sizing: border-box;
    position: relative;
}
.service {
    margin-bottom: 10rpx;
}

.foot-container .buy-btn .remaining-count {
    font-size: 20rpx;
}

.foot-container .buy-btn .get-phone-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    background-color: transparent;
}

.foot-container .disabled-btn {
    background-color: #6e6e6e;
}

.foot-container .ongoing {
    background-color: #1577ff;
    text-align: center;
}

/* 保障详情 */
.xs-content {
    padding: 22rpx 30rpx 40rpx;
}

.xs-content .xs-top {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
    text-align: center;
}

.xs-content .xs-des {
    margin-top: 30rpx;
    margin-bottom: 20rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
}

.xs-content .xs-title {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #333333;
}

.xs-content .dui-img {
    width: 18rpx;
    height: 18rpx;
}

.xs-content .xs-text {
    margin-top: 20rpx;
    margin-bottom: 40rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}

.xs-content .xs-btn {
    margin: 30rpx auto 0;
    height: 100rpx;
    background: #ff5340;
    box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.16);
    border-radius: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
}

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

/* 没有默认地址时的弹窗 */
.not-address-popup {
    font-size: 36rpx;
    color: #333;
    border-radius: 28rpx;
    width: 580rpx;
    padding: 24rpx 10rpx 34rpx;
    box-sizing: border-box;
    font-weight: bold;
}

.not-address-popup .not-address-img {
    width: 300rpx;
    height: 252rpx;
}

.not-address-popup .jump-btn {
    width: 490rpx;
    height: 88rpx;
    border-radius: 48rpx;
    background: linear-gradient(273deg, #fe213f 0%, #ff662a 100%);
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 32rpx;
}
</style>
