<template>
    <view>
        <view class="details">
            <image @tap="isShowGuanzhuTankuang" class="guanzhu" src="https://xssj.letterbook.cn/applet/images/icon_remind.png"></image>
            <view style="position: relative">
                <swiper class="details_swiper" autoplay circular @change="getCurrentIndex">
                    <block v-for="(item, index) in auctionDetail.carouselPictureList" :key="item.id">
                        <swiper-item class="details_swiper_item">
                            <image @tap="imgClick" :data-list="auctionDetail.carouselPictureList" :data-src="item.httpAddress" mode="aspectFill" :src="item.httpAddress"></image>
                        </swiper-item>
                    </block>
                </swiper>
                <view class="details_swiper_count">
                    {{ currentIndex + 1 }}
                    <view class="details_swiper_sumcount">/{{ auctionDetail.carouselPictureList.length }}</view>
                </view>
            </view>
            <view class="details_goods_name" :style="auctionDetail.status == '3' ? 'background: #999999;' : 'background: #C48D44;'">
                {{ auctionDetail.xsAuctionItem.auctionItemName }}
            </view>
            <view class="details_goods">
                <view class="details_goods_left">{{ auctionDetail.xsAuctionItem.description }}</view>
                <view class="details_goods_right">
                    <image mode="aspectFill" src="/static/image/pmhd/icon_share.png"></image>
                    <view>分享</view>
                    <button open-type="share"></button>
                </view>
            </view>
            <view class="details_auction">
                <view class="details_auction_bottom">
                    <view class="details_auction_bottom_left">
                        <view class="details_auction_bottom_left_text" style="font-weight: 400">
                            <view style="font-size: 28rpx">RMB</view>
                            <view style="font-size: 22rpx">原价</view>
                        </view>
                        <view style="font-size: 56rpx; margin-left: 10rpx">{{ auctionDetail.xsAuctionItem.price }}</view>
                    </view>
                    <view class="details_auction_bottom_left">
                        <view class="details_auction_bottom_left_text">
                            <view style="font-size: 28rpx; color: #0b7eff">RMB</view>
                            <view style="font-size: 22rpx; color: #ff0000">保底价</view>
                        </view>
                        <view class="details_auction_bottom_left_price">{{ auctionDetail.xsAuctionItem.startingPrice }}</view>
                    </view>
                </view>
            </view>
            <view class="yanchibox">
                <view @tap="showYanChi" class="yanchiTime">
                    <view>延</view>
                    <view>迟</view>
                    <view>{{ auctionDetail.timeCycle }}</view>
                    <block v-if="auctionDetail.timeUnit == '1'">
                        <view>秒</view>
                    </block>
                    <block v-else>
                        <view>分</view>
                        <view>钟</view>
                    </block>
                    <view>/</view>
                    <view>次</view>
                    <image src="/static/image/pmhd/icon_help.png"></image>
                </view>
                <view v-if="isShowYanChi" class="yanchi_textbox">
                    <view>喊价延迟:当喊品的竞喊进入最终倒计时的时候，如果有用户出价竞喊，那么系统将会自动延迟喊品的竞喊时间。防止用户恶性等待喊价结束前出价竞喊。</view>
                    <view>例如：商家设置延迟30秒，当喊价剩余时间不足30秒时有用户出价，则需要在出价后30秒内无人出价才能成功获喊。若有其他用户出价，喊价时间也将自动延迟</view>
                </view>
                <view class="yanchi_right">
                    <view v-if="auctionDetail.status != '1' && bidRecordList.length" class="first">
                        <view class="details_auction_left_info">
                            <view class="details_auction_left_logo">
                                <image src="/static/image/pmhd/icon_win.png" class="details_auction_left_win"></image>
                                <image mode="aspectFill" :src="bidRecordList[0].headImgUrl" class="details_auction_left_image"></image>
                            </view>
                            <view class="details_auction_left_name">{{ bidRecordList[0].nickName }}</view>
                            <view class="details_auction_left_text">{{ auctionDetail.status == '2' ? '领先' : '获喊' }}</view>
                        </view>
                        <view class="first_money">
                            {{ auctionDetail.status == '2' ? '当前最高价￥' : '成交价￥' }}
                            <text style="margin-left: 6rpx; font-size: 48rpx; color: #f00">
                                {{ bidRecordList.length ? bidRecordList[0].price : auctionDetail.xsAuctionItem.startingPrice }}
                            </text>
                        </view>
                    </view>
                    <block v-if="auctionDetail.status != '3'">
                        <van-count-down use-slot @change="changeTime" @finish="overTime" :time="auctionDetail.timeMinutes">
                            <view class="details_topTime_time">
                                <view class="details_auction_bottom_right">{{ auctionDetail.status == '1' ? '开始倒计时' : '距喊价结束' }}</view>
                                <view v-if="timeData.days != 0" class="details_topTime_time_box">{{ timeData.days }}</view>
                                <view v-if="timeData.days != 0" class="details_topTime_time_box_icon">天</view>
                                <view class="details_topTime_time_box">{{ timeData.hours < 10 ? '0' + timeData.hours : timeData.hours }}</view>
                                <view class="details_topTime_time_box_icon">:</view>
                                <view class="details_topTime_time_box">{{ timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes }}</view>
                                <view class="details_topTime_time_box_icon">:</view>
                                <view class="details_topTime_time_box details_topTime_time_box_big">{{ timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds }}</view>
                            </view>
                        </van-count-down>
                    </block>
                    <block v-else>
                        <view class="details_auction_right_endtime">结束时间 {{ auctionDetail.endTime }}</view>
                    </block>
                </view>
            </view>
            <view v-if="auctionDetail.status != '1' && bidRecordList.length" class="details_bidlist">
                <view class="details_title details_bidlist_title">
                    <view class="details_title_left">
                        <view class="details_title_icon"></view>
                        <view class="details_title_text">喊价榜</view>
                    </view>
                    <block v-if="auctionDetail.status != '1'">
                        <view class="details_bidlist_title_right">
                            <view v-if="auctionDetail.status == '2'">延迟{{ auctionDetail.delayCount }}次</view>
                            <view v-if="auctionDetail.status == '2'" class="details_bidlist_title_line"></view>
                            <view>出价{{ auctionDetail.premiumCount }}次</view>
                        </view>
                    </block>
                </view>
                <block v-for="(item, index) in bidRecordList" :key="index">
                    <view class="details_bidlist_item">
                        <view class="details_bidlist_left">
                            <view :style="index == 0 ? 'color: #FF0000;' : 'color: #333333;'" class="details_bidlist_index">
                                {{ index + 1 }}
                            </view>
                            <image :src="item.headImgUrl" mode="aspectFill" class="details_bidlist_image"></image>
                            <view :class="'details_bidlist_name color' + index">{{ item.nickName }}</view>
                            <view :class="'details_bidlist_text color' + index">{{ index == 0 ? '领先' : '被超越' }}</view>
                        </view>
                        <view :class="'details_bidlist_right color' + index">￥{{ item.price }}</view>
                    </view>
                </block>
                <view @tap="showBidMask" data-type="1" class="details_bidlist_foot">查看详情</view>
            </view>
            <view class="details_info">
                <view v-if="auctionDetail.userList" class="details_title details_onlooker">
                    <view class="details_title_icon"></view>
                    <view class="details_title_text">正在围观</view>
                    <view class="details_onlooker_image">
                        <block v-for="(item, index) in auctionDetail.userList" :key="item.timeUnit">
                            <image :style="'left: ' + index * 28 + 'rpx'" :src="item.headImgUrl" mode="aspectFill"></image>

                            <view v-if="index == 19" :style="'left: ' + index * 28 + 'rpx'">99+</view>
                        </block>
                    </view>
                </view>
                <view class="details_title details_ship">
                    <view class="details_title_icon"></view>
                    <view class="details_title_text">用户保障</view>
                    <view class="details_ship_list">
                        <view>七天无理由退货</view>
                    </view>
                </view>
                <view class="details_desc">
                    <view class="details_title details_desc_title">
                        <view class="details_title_icon"></view>
                        <view class="details_title_text">喊价说明</view>
                    </view>
                    <view class="details_desc_content">
                        <view class="details_desc_item">
                            <view class="details_desc_label">
                                <view>喊价类型</view>
                            </view>
                            <view class="details_desc_desc">{{ auctionDetail.timeUnit == 1 ? '即时喊' : auctionDetail.timeUnit == 2 ? '短时喊' : '长时喊' }}</view>
                        </view>
                        <!-- <view class="details_desc_item">
          <view class="details_desc_label">
            <view>免密支付</view>
          </view>
          <view class="details_desc_desc">喊价后自动付款</view>
        </view> -->
                        <view class="details_desc_item">
                            <view class="details_desc_label">
                                <view>开始时间</view>
                            </view>
                            <view class="details_desc_desc">{{ auctionDetail.startTime }}</view>
                        </view>
                        <view class="details_desc_item">
                            <view class="details_desc_label">
                                <view>喊价幅度</view>
                            </view>
                            <view class="details_desc_desc">{{ auctionDetail.xsAuctionItem.priceRangeString }}</view>
                        </view>
                        <view class="details_desc_item">
                            <view class="details_desc_label">
                                <view>原价</view>
                            </view>
                            <view class="details_desc_desc">￥{{ auctionDetail.xsAuctionItem.price }}</view>
                        </view>
                        <view class="details_desc_item">
                            <view class="details_desc_label">
                                <view>保底价</view>
                            </view>
                            <view class="details_desc_desc">￥{{ auctionDetail.xsAuctionItem.startingPrice }}</view>
                        </view>
                        <view class="details_desc_item">
                            <view class="details_desc_label">
                                <view>结束时间</view>
                            </view>
                            <view class="details_desc_desc">{{ auctionDetail.endTime }}</view>
                        </view>
                        <view v-if="auctionDetail.timeCycle" class="details_desc_item">
                            <view class="details_desc_label">
                                <view>延迟</view>
                            </view>
                            <view class="details_desc_desc">{{ auctionDetail.timeCycle }}{{ auctionDetail.timeUnit == '1' ? '秒' : '分钟' }}/次</view>
                        </view>
                    </view>
                </view>
                <view @tap="toUserNotice" class="details_notice">用户须知</view>
            </view>
            <view class="details_details">
                <view class="details_title">
                    <view class="details_title_icon"></view>
                    <view class="details_title_text">商品详情</view>
                </view>
                <block v-for="(item, index) in auctionDetail.detailPictureList" :key="item.id">
                    <image @tap="imgClick" :data-list="auctionDetail.detailPictureList" :data-src="item.httpAddress" mode="widthFix" :src="item.httpAddress"></image>
                </block>
            </view>
            <!-- 底部栏 -->
            <view :style="auctionDetail.status == '3' ? '' : 'padding: 16rpx 0 16rpx 36rpx;'" class="details_bottom">
                <block v-if="auctionDetail.status != '3'">
                    <view @tap="contactShop" class="details_bottom_item">
                        <image src="/static/image/pmhd/icon_cs.png"></image>
                        <view class="details_bottom_item_text">客服</view>
                    </view>
                    <view @tap="toShop" class="details_bottom_item">
                        <image src="/static/image/pmhd/icon_shop.png"></image>
                        <view class="details_bottom_item_text">店铺</view>
                    </view>
                    <view @tap="toList" class="details_bottom_item">
                        <image src="/static/image/pmhd/icon_more.png"></image>
                        <view class="details_bottom_item_text">更多商品</view>
                    </view>
                    <view v-if="auctionDetail.isApply == 0" class="details_bottom_btn">
                        <block v-if="auctionDetail.status == '1'">
                            <block v-if="auctionDetail.isSubscribe && auctionDetail.isSubscribe > 0">
                                <view class="btn_centern">
                                    <view class="btn_centern" style="background: #999999; border-radius: 44rpx 0rpx 0rpx 44rpx">已预约</view>
                                    <view @tap="showPayMask" data-type="1" class="btn_centern" style="flex-direction: column">
                                        <view>提前报名</view>
                                        <view style="font-size: 20rpx">（参喊）</view>
                                    </view>
                                </view>
                            </block>
                            <block v-else>
                                <view @tap="reservation" class="btn_centern">预约</view>
                            </block>
                        </block>
                        <block v-else>
                            <view @tap="showPayMask" data-type="1" class="btn_centern">立即参喊</view>
                        </block>
                    </view>
                    <block v-else>
                        <view v-if="auctionDetail.status == '1'" class="details_bottom_btn">
                            <view class="btn_centern">
                                <view class="btn_centern" style="background: #999999; border-radius: 44rpx 0rpx 0rpx 44rpx">已预约</view>
                                <view class="btn_centern" style="background: #07c160">已报名</view>
                            </view>
                        </view>
                        <view v-else @tap="showAddprice" data-type="1" :style="!isMyPrice ? 'background: #999999;' : ''" class="details_bottom_btn">
                            <view>我要喊价</view>
                            <view v-if="!isMyPrice" class="details_bottom_btn_tips">(等待下一轮喊价)</view>
                        </view>
                    </block>
                </block>
                <block v-else>
                    <view @tap="toList" class="details_bottom_more">查看更多商品</view>
                </block>
            </view>
        </view>

        <view v-if="isShowBidMask" @tap="showNotBidMask" class="mask">
            <view @tap.stop.prevent="showBidMask" class="bid">
                <view class="bid_title">喊价详情</view>
                <view @tap.stop.prevent="showNotBidMask" class="bid_close">
                    <image src="/static/image/pmhd/icon_close.png"></image>
                </view>
                <scroll-view scroll-y style="height: 500rpx">
                    <view class="details_bidlist_item bid_item" v-for="(item, index) in bidList" :key="index">
                        <view class="details_bidlist_left">
                            <view :style="index == 0 ? 'color: #000000;' : 'color: #999999;'" class="details_bidlist_index">
                                {{ index + 1 }}
                            </view>
                            <image :src="item.headImgUrl" mode="aspectFill" class="details_bidlist_image"></image>
                            <view :style="index == 0 ? 'color: #000000;' : 'color: #999999;'" class="details_bidlist_name">
                                {{ item.nickName }}
                            </view>
                            <view :style="index == 0 ? 'color: #000000;' : 'color: #999999;'" class="details_bidlist_text">
                                {{ index == 0 ? '领先' : '超越' }}
                            </view>
                        </view>

                        <view :style="index == 0 ? 'color: #000000;' : 'color: #999999;'" class="details_bidlist_right">￥{{ item.price }}</view>
                    </view>
                </scroll-view>
            </view>
        </view>

        <!-- 加价详情 -->
        <view v-if="isShowAddprice" @tap="showNotAddprice" class="mask" style="height: calc(100vh - 120rpx); bottom: 120rpx">
            <view @tap.stop.prevent="showAddpriceDialog" class="addprice">
                <view class="addprice_item">
                    <view class="addprice_item_left">
                        <view class="addprice_item_name">当前价</view>
                        <view class="addprice_item_btn addprice_item_nowPrice">
                            <text style="font-size: 24rpx">￥</text>
                            {{ bidRecordList.length ? bidRecordList[0].price : auctionDetail.xsAuctionItem.startingPrice }}
                        </view>
                    </view>
                    <view class="addprice_item_left">
                        <view class="addprice_item_name">我的报价</view>
                        <view class="addprice_item_btn addprice_item_myPrice">
                            <text style="font-size: 24rpx">￥</text>
                            {{ myPrice }}
                        </view>
                    </view>
                </view>
                <view class="addprice_item" style="margin-top: 20rpx">
                    <view class="addprice_item_left">
                        <view class="addprice_item_name">喊价幅度</view>
                        <view class="me-fx-1 me-fx-row me-fx-start-c" style="flex-wrap: wrap">
                            <view
                                @tap.stop.prevent="addPrice"
                                :data-index="index"
                                :class="'addprice_item_btn ' + (addPriceIndex == index ? 'addprice_item_btnActive' : '')"
                                v-for="(item, index) in auctionDetail.xsAuctionItem.priceRangeArray"
                                :key="index"
                            >
                                +{{ item }}
                            </view>
                        </view>
                    </view>
                    <image @tap.stop.prevent="backAddPrice" class="addprice_item_right" src="/static/image/pmhd/icon_revoke.png"></image>
                </view>
            </view>
        </view>

        <!-- 支付 -->
        <view v-if="isShowPayMask" @tap="showNotPayMask" class="mask">
            <view @tap.stop.prevent="showPayMask" class="payment">
                <image @tap.stop.prevent="showNotPayMask" src="/static/image/pmhd/icon_close.png" class="payment_close"></image>
                <view v-if="auctionDetail.bond > 0" class="me-fx-row me-fx-c-c deposit-text">保证金：{{ auctionDetail.bond }}元</view>
                <view class="payment_desc">
                    <image src="/static/image/pmhd/icon_tips.png"></image>
                    <view style="width: 400rpx; text-align: center">{{ auctionDetail.status == '1' ? '是否确认提前报名本场喊价活动' : '是否确认参加本场喊价活动' }}</view>
                </view>
                <view class="payment_btn" @tap.stop.prevent="toPayment">
                    <block v-if="auctionDetail.bond == 0">
                        {{ auctionDetail.status == '1' ? '提前报名' : '立即喊价' }}
                    </block>
                    <block v-else>去支付</block>
                </view>
                <view @tap.stop.prevent="checkDoc" class="payment_doc">
                    <icon type="success" size="24rpx" :color="isCheckDoc ? '#FF0000' : '#999999'"></icon>
                    <view class="payment_doc_text">喊价需要同意信书喊价协议</view>
                    <view @tap.stop.prevent="toUserNotice">查看协议</view>
                </view>
            </view>
        </view>

        <view v-if="isWon" class="mask mask_center">
            <view style="background-image: url(https://xssj.letterbook.cn/applet/images/bg_won.png)" class="won">
                <image :src="bidRecordList[0].headImgUrl"></image>
                <view class="won_title">恭喜{{ bidRecordList[0].userId == userInfo.userId ? '您' : bidRecordList[0].nickName }}获得购买资格</view>
                <view class="won_price">成交价￥{{ bidRecordList[0].price }}</view>
                <view class="won_desc">还有更多商品等待您的关注</view>
                <view class="won_desc">快去参与吧</view>
            </view>
            <view class="won_btn">
                <view @tap="toList" data-type="1">查看更多商品</view>
                <view v-if="auctionDetail.biddingStatus == 3" @tap="toPayMoney" style="background: #fa2d2d; border-radius: 0 8rpx 8rpx 0">立即支付</view>
            </view>
        </view>

        <view v-if="auctionDetail.status == '3' && !bidRecordList.length" class="mask mask_center">
            <view class="pass">
                <image class="pass_image" src="https://xssj.letterbook.cn/applet/images/icon_pass.png"></image>
                <view class="pass_box">
                    <view>
                        <view class="pass_text">还有更多商品等待您的关注</view>
                        <view class="pass_text">快去参与吧</view>
                    </view>
                    <view @tap="backList" class="pass_btn">确定</view>
                </view>
            </view>
        </view>

        <!-- 是否关注喊价 -->
        <view v-if="!isShowGuangZhu" @tap="showNotGuanzhuan" class="mask mask_center">
            <view @tap.stop.prevent="showGuanzhuan" class="han_price">
                <image src="https://xssj.letterbook.cn/applet/images/icon_hanjiao.png"></image>
                <view class="han_price_text">是否关注喊价</view>
                <view class="ban_price_btn">
                    <view @tap.stop.prevent="exit" class="ban_price_cancelbtn">退出</view>
                    <view @tap.stop.prevent="remind" class="ban_price_surelbtn">退出关注喊价</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
const paymentUtil = require('../../../../utils/paymentUtil');

const templateMessageUtil = require('../../../../utils/templateMessageUtil');

const plugin = requirePlugin('WechatSI');
const app = getApp();
let SocketTask;
export default {
    // components: {
    //     vanCountDown
    // },
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            socketOpen: null,
            socketClose: false,
            clone_connectNum: 0,
            currentIndex: 0,
            isShowBidMask: false,
            isShowPayMask: false,
            isCheckDoc: true,
            isShowAddprice: false,
            isMyPrice: true,
            isWon: false,
            isShowYanChi: false,
            addPriceIndex: 0,
            myPrice: 0,

            auctionDetail: {
                isSubscribe: 0,
                isApply: 0,
                carouselPictureList: [],
                status: '',

                xsAuctionItem: {
                    auctionItemName: '',
                    description: '',
                    price: '',
                    startingPrice: '',
                    priceRangeString: '',
                    priceRangeArray: []
                },

                timeCycle: '',
                timeUnit: '',
                timeMinutes: '',
                endTime: '',
                delayCount: '',
                premiumCount: '',
                userList: '',
                startTime: '',
                detailPictureList: [],
                bond: 0,
                biddingStatus: 0
            },

            bidList: [],
            bidRecordList: [],

            userInfo: {
                type: 0,
                userId: '',
                headImgUrl: '',
                nickName: '',
                auctionId: '',
                endTime: ''
            },

            isShowGuangZhu: true,
            auctionId: null,
            exitType: 0,
            yuyueFlag: true,
            audioSrc: '',

            timeData: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            },

            headImgUrl: '',
            nickName: '',
            price: '',
            userId: ''
        };
    },
    onLoad: function (options) {
        let zl_userInfo = uni.getStorageSync('zl_userInfo');

        if (zl_userInfo) {
            this.initData(options, zl_userInfo);
        } else {
            app.globalData.userLogin().then((res) => {
                zl_userInfo = uni.getStorageSync('zl_userInfo');
                this.initData(options, zl_userInfo);
            });
        }
    },
    onReady: function () {
        this.innerAudioContext = uni.createInnerAudioContext();
        this.innerAudioContext.onError(function (res) {
            uni.showToast({
                title: '语音播放失败',
                icon: 'none'
            });
        });
    },
    onHide: function () {
        this.setData({
            isShowGuangZhu: true
        });
    },
    onUnload: function () {
        this.setData({
            socketOpen: false,
            socketClose: true
        }); //     SocketTask.close()
    },
    onShareAppMessage: function () {
        return {
            title: this.auctionDetail.xsAuctionItem.auctionItemName
        };
    },
    methods: {
        initData(options, zl_userInfo) {
            this.setData({
                ['userInfo.type']: 1,
                ['userInfo.userId']: zl_userInfo.data.data.userId,
                ['userInfo.headImgUrl']: zl_userInfo.data.data.headimgurl,
                ['userInfo.nickName']: zl_userInfo.data.data.nickname,
                socketOpen: null
            });
            app.globalData.options = options;

            if (options.scene) {
                const scene = decodeURIComponent(options.scene);
                this.getCodeParams(scene);
            } else {
                this.setData({
                    auctionId: options.auctionId || '6fbaad2552954b1186b70b3fbbcb76d5',
                    ['userInfo.auctionId']: options.auctionId
                });
                this.getAuctionDetail();
            }
        },

        //检查参拍资格
        getQualification() {
            return new Promise((resolve, reject) => {
                app.globalData.request
                    .auctionRequest('/bidding/isParticipationAuction', this.userInfo.auctionId, 'form-data')
                    .then((res) => {
                        console.log('检查结果', res);

                        if (res && res.data.code == 200) {
                            resolve(true);
                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            });
                            reject(false);
                        }
                    })
                    .catch((err) => {
                        reject(false);
                    });
            });
        },

        async checkTmp(tmplIds) {
            const params = {
                auctionId: this.auctionId,
                templateIds: tmplIds
            };
            let result;
            await app.globalData.request.auctionRequest('/applet/hasSubscription', params).then((res) => {
                result = res.data;
            });
            return result;
        },

        getCodeParams(id) {
            let data = {
                id: id
            };
            let that = this;
            app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        auctionId: JSON.parse(res.data.data.scene).id,
                        ['userInfo.auctionId']: JSON.parse(res.data.data.scene).id
                    });
                    that.getAuctionDetail();
                }
            });
        },

        getAuctionDetail() {
            const params = this.auctionId;
            app.globalData.request.auctionRequest('/auction/detail', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;

                    if (result.userList) {
                        if (result.userList.length > 20) {
                            result.userList.length = 20;
                        } else {
                            result.userList.length = result.userList.length;
                        }
                    }

                    result.xsAuctionItem.priceRangeArray = result.xsAuctionItem.priceRange.split(',');
                    result.xsAuctionItem.priceRangeString = '';

                    for (let index in result.xsAuctionItem.priceRangeArray) {
                        result.xsAuctionItem.priceRangeString = result.xsAuctionItem.priceRangeString + '￥' + result.xsAuctionItem.priceRangeArray[index];

                        if (index != result.xsAuctionItem.priceRangeArray.length - 1) {
                            result.xsAuctionItem.priceRangeString = result.xsAuctionItem.priceRangeString + '/';
                        }
                    }

                    if (result.xsAuctionBiddingRecordVOList.length) {
                        for (let index in result.xsAuctionBiddingRecordVOList) {
                            var nickName = result.xsAuctionBiddingRecordVOList[index].nickName;
                            var nickNameStr = nickName.length > 5 ? nickName.substr(0, 5) + '...' : nickName;
                            result.xsAuctionBiddingRecordVOList[index].nickName = nickNameStr;
                        }

                        this.setData({
                            bidRecordList: result.xsAuctionBiddingRecordVOList,
                            isMyPrice: this.userInfo.userId != result.xsAuctionBiddingRecordVOList[0].userId
                        });
                    }

                    if (result.status == 3 && result.xsAuctionBiddingRecordVOList.length) {
                        this.showWon();
                    }

                    this.setData({
                        ['userInfo.endTime']: result.endTime,
                        auctionDetail: result
                    });

                    if (result.status != 3) {
                        this.createSocket();
                    }
                }
            });
        },

        getBidInfo() {
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                auctionId: this.auctionId
            };
            app.globalData.request.auctionRequest('/record/list', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;

                    for (let index in result) {
                        result[index].nickName = result[index].nickName[0] + '***';
                    }

                    this.setData({
                        bidList: result
                    });
                }
            });
        },

        imgClick(e) {
            const { src, list } = e.currentTarget.dataset;
            let imageList = [];

            for (let index = 0; index < list.length; index++) {
                imageList[index] = list[index].httpAddress;
            }

            uni.previewImage({
                current: src,
                urls: imageList
            });
        },

        getCurrentIndex(e) {
            this.setData({
                currentIndex: e.detail.current
            });
        },

        changeTime(e) {
            this.setData({
                timeData: e.detail
            });
        },

        overTime() {
            this.getAuctionDetail();

            if (this.auctionDetail.status == 3 && this.bidRecordList.length) {
                this.showWon();
            }
        },

        showWon() {
            this.setData({
                isWon: true
            });
        },

        contactShop() {
            uni.navigateTo({
                url: `/pages/order/contact/contact?logoPic=${this.auctionDetail.merchantLogo}&marchantId=${this.auctionDetail.merchantId}&marchantName=${this.auctionDetail.merchantName}`
            });
        },

        toShop() {
            this.setData({
                exitType: 1
            });
            this.isShowGuanzhuTankuang();
        },

        exit() {
            if (this.exitType == 1) {
                uni.navigateTo({
                    url: `/pages/shopHome/home/home?marchantId=${this.auctionDetail.merchantId}`
                });
            } else if (this.exitType == 2) {
                uni.navigateTo({
                    url: `/pages/activity/pmhd/list/list?merchantId=${this.auctionDetail.merchantId}`
                });
            } else {
                this.backList();
            }
        },

        async isShowGuanzhuTankuang() {
            const tmpIsCheck = await this.checkTmp([templateMessageUtil.tmplIds1, templateMessageUtil.tmplIds5]);

            if (tmpIsCheck == 'true') {
                this.setData({
                    isShowGuangZhu: true
                });
                this.exit();
            } else {
                this.setData({
                    isShowGuangZhu: false
                });
            }
        },

        async remind() {
            //检查是否有参拍资格
            var result = await this.getQualification();

            if (!result) {
                return;
            }

            templateMessageUtil
                .templateMessage(1)
                .then((res) => {
                    var params = [];
                    var tempItem = {
                        auctionId: this.auctionId,
                        merchantId: this.auctionDetail.merchantId,
                        status: 1
                    };

                    if (res[templateMessageUtil.tmplIds1] == 'accept') {
                        tempItem.templateId = templateMessageUtil.tmplIds1;
                        var itemobj = { ...tempItem };
                        params.push(itemobj);
                    }

                    if (res[templateMessageUtil.tmplIds5] == 'accept') {
                        tempItem.templateId = templateMessageUtil.tmplIds5;
                        var itemobj = { ...tempItem };
                        params.push(itemobj);
                    }

                    uni.getSetting({
                        success: (res) => {
                            if (res.subscriptionsSetting) {
                                var itemSettings = res.subscriptionsSetting.itemSettings;

                                if (itemSettings) {
                                    var keys = Object.keys(itemSettings);
                                    params.forEach((temp) => {
                                        if (keys.indexOf(temp.templateId) != -1) {
                                            temp.status = 2;
                                        }
                                    });
                                }
                            }

                            if (params.length > 0) {
                                app.globalData.request.auctionRequest('/applet/save', params).then((res) => {
                                    if (res.data.code == 200) {
                                        uni.showToast({
                                            title: '订阅成功',
                                            icon: 'none'
                                        });
                                        this.setData({
                                            isShowGuangZhu: true
                                        });
                                    }
                                });
                                this.exit();
                            }
                        }
                    });
                })
                .catch((err) => {
                    uni.showToast({
                        title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
                        icon: 'none'
                    });
                });
        },

        toUserNotice() {
            uni.navigateTo({
                url: '/pages/activity/pmhd/userNotice/userNotice'
            });
        },

        showBidMask(e) {
            const { type } = e.currentTarget.dataset;

            if (type == 1) {
                this.getBidInfo();
            }

            this.setData({
                isShowBidMask: true
            });
        },

        showNotBidMask() {
            this.setData({
                isShowBidMask: false
            });
        },

        async reservation() {
            //检查是否有参拍资格
            var result = await this.getQualification();

            if (!result) {
                return;
            }

            if (!this.yuyueFlag) {
                return;
            }

            const tmpIsCheck = await this.checkTmp([templateMessageUtil.tmplIds3]);
            const that = this;
            that.setData({
                yuyueFlag: false
            });
            uni.showModal({
                title: '提示',
                content: '确定要预约吗？',

                success(res) {
                    if (res.confirm) {
                        if (!tmpIsCheck) {
                            templateMessageUtil.templateMessage(3).then((res) => {
                                console.log('res[templateMessageUtil.tmplIds3]:', res[templateMessageUtil.tmplIds3]);

                                if (res[templateMessageUtil.tmplIds3] == 'accept') {
                                    const params = [
                                        {
                                            auctionId: that.auctionId,
                                            merchantId: that.auctionDetail.merchantId,
                                            status: 1,
                                            templateId: templateMessageUtil.tmplIds3
                                        }
                                    ];
                                    app.globalData.request.auctionRequest('/applet/save', params).then((res) => {
                                        if (res.data.code == 200) {
                                            that.setData({
                                                ['auctionDetail.isSubscribe']: 1
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }

                    that.setData({
                        yuyueFlag: true
                    });
                }
            });
        },

        async showPayMask(e) {
            //检查是否有参拍资格
            var result = await this.getQualification();

            if (!result) {
                return;
            }

            const { type } = e.currentTarget.dataset;

            if (type == 1) {
                const tmpIsCheck = await this.checkTmp([templateMessageUtil.tmplIds5, templateMessageUtil.tmplIds2, templateMessageUtil.tmplIds4]);

                if (tmpIsCheck) {
                    this.setData({
                        isShowPayMask: true
                    });
                    return;
                }

                templateMessageUtil.templateMessage(5).then((res) => {
                    let params = [];
                    var tempItem = {
                        auctionId: this.auctionId,
                        merchantId: this.auctionDetail.merchantId,
                        status: 1
                    };

                    if (res[templateMessageUtil.tmplIds2] == 'accept') {
                        tempItem.templateId = templateMessageUtil.tmplIds2;
                        params.push(tempItem);
                    }

                    if (res[templateMessageUtil.tmplIds4] == 'accept') {
                        tempItem.templateId = templateMessageUtil.tmplIds4;
                        params.push(tempItem);
                    }

                    if (res[templateMessageUtil.tmplIds5] == 'accept') {
                        tempItem.templateId = templateMessageUtil.tmplIds5;
                        params.push(tempItem);
                    }

                    uni.getSetting({
                        success: (res) => {
                            if (res.subscriptionsSetting) {
                                var itemSettings = res.subscriptionsSetting.itemSettings;

                                if (itemSettings) {
                                    var keys = Object.keys(itemSettings);
                                    params.forEach((temp) => {
                                        if (keys.indexOf(temp.templateId) != -1) {
                                            temp.status = 2;
                                        }
                                    });
                                }
                            }

                            if (params.length) {
                                app.globalData.request.auctionRequest('/applet/save', params).then((res) => {
                                    if (res.data.code == 200) {
                                        this.setData({
                                            ['auctionDetail.isSubscribe']: 1
                                        });
                                    }
                                });
                            }
                        }
                    });
                });
            }

            this.setData({
                isShowPayMask: true
            });
        },

        showNotPayMask() {
            this.setData({
                isShowPayMask: false
            });
        },

        toPayment() {
            let tips = '';

            if (this.auctionDetail.bond == 0) {
                if (this.auctionDetail.status == '1') {
                    tips = '报名成功';
                } else {
                    tips = '参喊成功';
                }
            } else {
                tips = '去支付';
            }

            if (!this.isCheckDoc) {
                uni.showToast({
                    title: '需要同意协议才能竞喊哦~~',
                    icon: 'none'
                });
                return;
            }

            const params = {
                auctionId: this.auctionId,
                cashDeposit: this.auctionDetail.bond,
                status: this.auctionDetail.status
            };
            app.globalData.request.auctionRequest('/bidding/save', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;

                    if (tips == '去支付') {
                        this.paymentMoney(result);
                    } else {
                        uni.showToast({
                            title: tips,
                            icon: 'none'
                        });
                        this.setData({
                            ['auctionDetail.isApply']: 1
                        });
                        this.showNotPayMask();
                    }
                }
            });
        },

        paymentMoney(data) {
            const that = this;
            paymentUtil.auctionWxpay(data).then(() => {
                that.setData({
                    ['auctionDetail.isApply']: 1
                });
                that.showNotPayMask();
            });
        },

        checkDoc() {
            this.setData({
                isCheckDoc: !this.isCheckDoc
            });
        },

        showAddpriceDialog() {
            this.setData({
                isShowAddprice: true
            });
        },

        showAddprice(e) {
            const that = this;
            const { type } = e.currentTarget.dataset;

            if (that.isMyPrice) {
                if (that.isShowAddprice && type == 1) {
                    uni.showModal({
                        title: '是否确认加价',
                        content: '我的报价：' + that.myPrice + '元',

                        success(res) {
                            if (res.confirm) {
                                const params = {
                                    auctionId: that.auctionId,
                                    premiumCount: that.auctionDetail.PremiumCount,
                                    price: that.myPrice,
                                    userId: that.userInfo.userId
                                };
                                app.globalData.request.auctionRequest('/bidding/userPremium', params).then((res) => {
                                    if (res.data.code == 200) {
                                        that.setData({
                                            isShowAddprice: false
                                        });
                                        uni.showToast({
                                            title: '加价成功',
                                            icon: 'none'
                                        });
                                    } else if (res.data.code == 500) {
                                        uni.showModal({
                                            title: '提示',
                                            content: res.data.msg,
                                            showCancel: false,

                                            success(res) {
                                                if (res.confirm) {
                                                    let myPrice = 0;

                                                    if (that.bidRecordList.length) {
                                                        myPrice = Number(that.bidRecordList[0].price) + Number(that.auctionDetail.xsAuctionItem.priceRangeArray[0]);
                                                    } else {
                                                        myPrice =
                                                            Number(that.auctionDetail.xsAuctionItem.startingPrice) + Number(that.auctionDetail.xsAuctionItem.priceRangeArray[0]);
                                                    }

                                                    that.setData({
                                                        addPriceIndex: 0,
                                                        myPrice: myPrice.toFixed(2)
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                } else {
                    let myPrice = 0;

                    if (this.bidRecordList.length) {
                        myPrice = Number(this.bidRecordList[0].price) + Number(this.auctionDetail.xsAuctionItem.priceRangeArray[0]);
                    } else {
                        myPrice = Number(this.auctionDetail.xsAuctionItem.startingPrice) + Number(this.auctionDetail.xsAuctionItem.priceRangeArray[0]);
                    }

                    this.setData({
                        isShowAddprice: true,
                        addPriceIndex: 0,
                        myPrice: myPrice.toFixed(2)
                    });
                }
            }
        },

        showNotAddprice() {
            this.setData({
                isShowAddprice: false
            });
        },

        addPrice(e) {
            const { index } = e.currentTarget.dataset;
            let myPrice = this.myPrice;

            if (index == this.addPriceIndex) {
                myPrice = Number(myPrice) + Number(this.auctionDetail.xsAuctionItem.priceRangeArray[index]);
            } else {
                if (myPrice == 0) {
                    if (this.bidRecordList.length) {
                        myPrice = Number(this.bidRecordList[0].price) + Number(this.auctionDetail.xsAuctionItem.priceRangeArray[index]);
                    } else {
                        myPrice = Number(this.auctionDetail.xsAuctionItem.startingPrice) + Number(this.auctionDetail.xsAuctionItem.priceRangeArray[index]);
                    }
                } else {
                    myPrice = Number(myPrice) + Number(this.auctionDetail.xsAuctionItem.priceRangeArray[index]);
                }
            }

            this.setData({
                isShowAddprice: true,
                myPrice: myPrice.toFixed(2),
                addPriceIndex: index
            });
        },

        backAddPrice() {
            let myPrice = 0;

            if (this.bidRecordList.length) {
                myPrice = Number(this.bidRecordList[0].price) + Number(this.auctionDetail.xsAuctionItem.priceRangeArray[0]);
            } else {
                myPrice = Number(this.auctionDetail.xsAuctionItem.startingPrice) + Number(this.auctionDetail.xsAuctionItem.priceRangeArray[0]);
            }

            this.setData({
                isShowAddprice: true,
                addPriceIndex: 0,
                myPrice: myPrice.toFixed(2)
            });
        },

        toList(e) {
            const { type } = e.currentTarget.dataset;

            if (type == 1) {
                uni.navigateTo({
                    url: `/pages/activity/pmhd/list/list?merchantId=${this.auctionDetail.merchantId}`
                });
            } else {
                this.setData({
                    exitType: 2
                });
                this.isShowGuanzhuTankuang();
            }
        },

        toPayMoney() {
            var query = `auctionId=${this.auctionId}&status${this.auctionDetail.biddingStatus}`;
            uni.navigateTo({
                url: `/pages/activity/pmhd/pmList/pmList?${query}`
            });
        },

        backList() {
            let pages = getCurrentPages();

            if (pages[pages.length - 2]) {
                uni.navigateBack({
                    delta: 0
                });
            } else {
                uni.redirectTo({
                    url: `/pages/activity/pmhd/list/list?merchantId=${this.auctionDetail.merchantId}`
                });
            }
        },

        showYanChi() {
            this.setData({
                isShowYanChi: !this.isShowYanChi
            });
        },

        showGuanzhuan() {
            this.setData({
                isShowGuangZhu: false
            });
        },

        showNotGuanzhuan() {
            this.setData({
                isShowGuangZhu: true
            });
        },

        sendSocketMessage(msg) {
            console.log('msg:', msg);

            if (this.socketOpen) {
                SocketTask.send({
                    data: JSON.stringify(msg)
                });
            }
        },

        createSocket() {
            const that = this;

            if (this.socketOpen) {
                return;
            }

            this.webSocket();
            SocketTask.onOpen(() => {
                this.sendSocketMessage(that.userInfo);
            });
            SocketTask.onClose(() => {
                this.setData({
                    socketOpen: false
                });

                if (!this.socketClose) {
                    this.reConnect();
                }
            });
            SocketTask.onError(() => {
                that.setData({
                    socketOpen: false
                });
            });
            SocketTask.onMessage((onMessage) => {
                let result = JSON.parse(onMessage.data);
                console.log('result:', result);

                if (result.type == 1) {
                    let auctionDetail = that.auctionDetail;
                    console.log('infos:', that.auctionDetail);
                    const params = {
                        userId: result.userId,
                        headImgUrl: result.headImgUrl,
                        nickName: result.nickName
                    };

                    if (auctionDetail.userList) {
                        auctionDetail.userList.push(params);
                    } else {
                        auctionDetail.userList = [params];
                    }

                    that.setData({
                        auctionDetail: auctionDetail
                    });
                } else if (result.type == 2) {
                    this.compoundAudio(result.nickName, result.price);
                    let auctionDetail = that.auctionDetail;
                    auctionDetail.premiumCount = result.premiumCount;
                    auctionDetail.delayCount = result.delayCount;
                    that.setData({
                        auctionDetail: auctionDetail
                    });
                    let nickName = result.nickName;
                    var nickNameStr = nickName.length > 5 ? nickName.substr(0, 5) + '...' : nickName;
                    const params = {
                        id: result.id,
                        auctionId: result.auctionId,
                        userId: result.userId,
                        nickName: nickNameStr,
                        headImgUrl: result.headImgUrl,
                        price: result.price,
                        createTime: result.createTime
                    };
                    let bidRecordList = that.bidRecordList;
                    bidRecordList.unshift(params);

                    if (bidRecordList.length > 3) {
                        bidRecordList = bidRecordList.slice(0, 3);
                    }

                    that.setData({
                        bidRecordList: bidRecordList,
                        isMyPrice: that.userInfo.userId != result.userId
                    });
                }
            });
        },

        compoundAudio(uname, price) {
            var that = this;
            plugin.textToSpeech({
                lang: 'zh_CN',
                tts: true,
                content: uname + '当前喊价' + price + '元',
                success: function (res) {
                    that.setData({
                        audioSrc: res.filename
                    });
                    that.playAudio();
                }
            });
        },

        playAudio() {
            if (this.audioSrc == '') {
                return;
            }

            this.innerAudioContext.src = this.audioSrc;
            this.innerAudioContext.play();
        },

        webSocket() {
            const that = this;
            SocketTask = uni.connectSocket({
                url: app.globalData.request.socketUrl,

                success() {
                    that.setData({
                        socketOpen: true
                    });
                }
            });
        },

        reConnect() {
            let timer;

            let _this = this;

            if (this._connectNum < 20) {
                timer = setTimeout(() => {
                    _this.createSocket();

                    this._connectNum += 1;
                }, 3000);
            } else if (this._connectNum < 50) {
                timer = setTimeout(() => {
                    _this.createSocket();

                    this._connectNum += 1;
                }, 10000);
            }
        }
    }
};
</script>
<style>
.details {
    width: 750rpx;
    min-height: 100vh;
    background: #f8f8f8;
    padding-bottom: 180rpx;
    box-sizing: border-box;
}
.details_topTime_time {
    margin-top: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36rpx;
    font-weight: bold;
    color: #000000;
}
.details_topTime_time_box {
    background: #000000;
    border-radius: 50%;
    font-size: 36rpx;
    font-weight: bold;
    color: #ffffff;
    min-width: 56rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
}
.details_topTime_time_box_big {
    width: 74rpx;
    height: 74rpx;
    line-height: 74rpx;
    font-size: 48rpx;
}
.details_topTime_time_box_icon {
    margin: 0 8rpx;
}
/* 轮播图 */
.details_swiper {
    width: 100%;
    height: 500rpx;
}
.details_swiper_item {
}
.details_swiper_item image {
    width: 100%;
    height: 100%;
}
.details_swiper_count {
    position: absolute;
    bottom: 14rpx;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 88rpx;
    height: 34rpx;
    background: rgba(0, 0, 0, 0.51);
    border-radius: 20rpx 0rpx 0rpx 20rpx;
    font-weight: bold;
    color: #ffffff;
    font-size: 24rpx;
}
.details_swiper_sumcount {
    font-size: 16rpx;
}
/* 拍卖信息 */
.details_auction {
    width: 100%;
    background-size: 100% 164rpx;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
}
.details_auction_bottom {
    margin-top: 20rpx;
    width: 100%;
    height: 80rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.details_auction_bottom_left {
    flex: 1;
    display: flex;
    align-items: center;
}
.details_auction_bottom_left_text {
    font-weight: bold;
    color: #333333;
}
.details_auction_bottom_left_price {
    margin-left: 20rpx;
    font-size: 56rpx;
    font-weight: bold;
    color: #0b7eff;
}
.details_auction_bottom_right {
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    background: #000000;
    border-radius: 28rpx;
    padding: 6rpx 14rpx;
    margin-right: 8rpx;
}
.details_auction_left_info {
    display: flex;
    align-items: center;
}
.details_auction_left_logo {
    position: relative;
}
.details_auction_left_win {
    width: 48rpx;
    height: 48rpx;
    position: absolute;
    top: -24rpx;
    left: -22rpx;
}
.details_auction_left_image {
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
}
.details_auction_left_name {
    margin-left: 16rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
}
.details_auction_left_text {
    margin-left: 16rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}
.details_auction_right {
    width: 450rpx;
    margin-top: 94rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.details_auction_right_endtime {
    font-size: 36rpx;
    font-weight: bold;
    color: #999999;
}
/* 商品名称、分享 */
.details_goods {
    width: 100%;
    background: #ffffff;
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    padding: 22rpx 0 12rpx;
    box-sizing: border-box;
    display: flex;
}
.details_goods_name {
    width: 100%;
    background: #c48d44;
    font-size: 32rpx;
    font-weight: bold;
    color: #ffffff;
    padding: 20rpx 28rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.details_goods_left {
    width: 590rpx;
    font-size: 30rpx;
    font-weight: bold;
    line-height: 42rpx;
    color: #000000;
    padding: 0 24rpx 0 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.details_goods_right {
    width: calc(100% - 590rpx);
    height: 100%;
    padding: 24rpx 0 16rpx;
    border-left: 2rpx solid #f4f4f4;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 22rpx;
    font-weight: 400;
    color: #333333;
    position: relative;
}
.details_goods_right image {
    width: 39rpx;
    height: 39rpx;
}
.details_goods_right button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
/* 标题 */
.details_title {
    display: flex;
    align-items: center;
}
.details_title_left {
    display: flex;
    align-items: center;
}
.details_title_icon {
    width: 12rpx;
    height: 32rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}
.details_title_text {
    margin-left: 8rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
}
/* 竞价榜 */
.details_bidlist {
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx;
}
.details_bidlist_title {
    padding: 18rpx 20rpx 0;
    justify-content: space-between;
}
.details_bidlist_title_right {
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
    display: flex;
    align-items: center;
}
.details_bidlist_title_line {
    width: 2rpx;
    height: 30rpx;
    background-color: #cccccc;
    margin: 0 20rpx;
}
.details_bidlist_item {
    width: 100%;
    height: 100rpx;
    border-bottom: 2rpx solid #f4f4f4;
    padding: 0 20rpx 0 44rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.details_bidlist_left {
    display: flex;
    align-items: center;
}
.details_bidlist_index {
    font-size: 36rpx;
    font-weight: bold;
}
.details_bidlist_image {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin-left: 28rpx;
}
.details_bidlist_name {
    margin-left: 22rpx;
    font-size: 24rpx;
    font-weight: bold;
}
.details_bidlist_text {
    margin-left: 48rpx;
    font-size: 24rpx;
    font-weight: bold;
}
.details_bidlist_right {
    font-size: 24rpx;
    font-weight: bold;
}
.color0 {
    color: #ff0000;
}
.color1 {
    color: #666666;
}
.color2 {
    color: #999999;
}
.details_bidlist_foot {
    width: 100%;
    height: 54rpx;
    font-size: 22rpx;
    font-weight: bold;
    line-height: 54rpx;
    color: #333333;
    text-align: center;
}
/* 正在围观、发货方式、拍卖说明、用户须知 */
.details_info {
    margin-top: 20rpx;
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx;
    overflow: hidden;
}
/* 正在围观 */
.details_onlooker {
    width: 100%;
    height: 96rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f4f4f4;
}
.details_onlooker_image {
    margin-left: 20rpx;
    display: flex;
    position: relative;
    top: -20rpx;
}
.details_onlooker_image image {
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
    position: absolute;
    top: 0;
}
.details_onlooker_image view {
    width: 56rpx;
    height: 56rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.59);
    border-radius: 50%;
    line-height: 56rpx;
    text-align: center;
    position: absolute;
    top: 0;
}
/* 发货方式 */
.details_ship {
    width: 100%;
    height: 76rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f4f4f4;
}
.details_ship_list {
    margin-left: 20rpx;
    display: flex;
    align-items: center;
}
.details_ship_list view {
    margin-right: 16rpx;
    color: #999999;
    border: 2rpx solid #999999;
    border-radius: 4rpx;
    font-size: 22rpx;
    font-weight: 500;
    padding: 2rpx 4rpx;
}
/* 拍卖说明 */
.details_desc {
    width: 100%;
    padding: 0 20rpx 20rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f4f4f4;
}
.details_desc_title {
    margin: 20rpx 0 16rpx;
}
.details_desc_content {
}
.details_desc_item {
    margin-top: 22rpx;
    display: flex;
    align-items: center;
}
.details_desc_label {
    width: 120rpx;
}
.details_desc_label view {
    font-size: 20rpx;
    font-weight: 500;
    color: #333333;
}
.details_desc_desc {
    margin-left: 26rpx;
    padding: 0 10rpx;
    border: 2rpx solid #fa5151;
    border-radius: 8rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #fa5151;
}
/* 用户须知 */
.details_notice {
    width: fit-content;
    padding: 8rpx 12rpx;
    border: 2rpx solid #ff0000;
    border-radius: 8rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: #ff0000;
    margin: 20rpx auto;
}
/* 拍卖详情 */
.details_details {
    margin-top: 20rpx;
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
}
.details_details image {
    width: 100%;
    margin-top: 20rpx;
    vertical-align: bottom;
}
/* 底部栏 */
.details_bottom {
    width: 100%;
    height: 120rpx;
    background: #ffffff;
    box-shadow: 0rpx 0rpx 54rpx rgba(0, 0, 0, 0.11);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
}
.details_bottom_item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.details_bottom_item image {
    width: 40rpx;
    height: 40rpx;
}
.details_bottom_item_text {
    font-size: 18rpx;
    color: #333333;
}
.details_bottom_btn {
    width: 484rpx;
    height: 100%;
    background: #fa2d2d;
    box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.16);
    border-radius: 44rpx 0rpx 0rpx 44rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 36rpx;
    font-weight: 600;
    color: #ffffff;
}
.details_bottom_btn_tips {
    font-size: 20rpx;
    font-weight: 500rpx;
}
.details_bottom_more {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #f95244 0%, #ff1400 100%);
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 竞拍详情 */
.bid {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 584rpx;
    background: #ffffff;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
}
.bid_title {
    width: 100%;
    height: 84rpx;
    text-align: center;
    line-height: 84rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}
.bid_close {
    width: 60rpx;
    height: 60rpx;
    text-align: right;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
}
.bid_close image {
    width: 28rpx;
    height: 28rpx;
}
.bid_item {
    border-top: 2rpx solid #f4f4f4;
    border-bottom: none;
}
/* 加价详情 */
.addprice {
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
    background: #ffffff;
    position: absolute;
    left: 0;
    bottom: 0;
    border-bottom: 2rpx solid #f4f4f4;
}
.addprice_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.addprice_item_left {
    display: flex;
}
.addprice_item_name {
    margin-right: 8rpx;
    width: 96rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
}
.addprice_item_btn {
    margin-right: 20rpx;
    padding: 6rpx 46rpx;
    border-radius: 34rpx;
    height: 44rpx;
    font-size: 32rpx;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    background: #e4e4e4;
    margin-bottom: 20rpx;
}

.addprice_item_btnActive {
    color: #ff0016;
    background: #fddccd;
}
.addprice_item_right {
    width: 40rpx;
    height: 32rpx;
}
.addprice_item_nowPrice {
    margin-right: 0;
    color: #ff0000;
}
.addprice_item_myPrice {
    margin-right: 0;
    color: #ffffff;
    background: #ff0000;
}
/* 支付 */
.payment {
    padding: 20rpx;
    width: 100%;
    height: 470rpx;
    background: #ffffff;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
}
.payment_close {
    width: 28rpx;
    height: 28rpx;
    float: right;
}
.payment_info {
    margin-top: 40rpx;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.payment_info_left {
    font-size: 36rpx;
    font-weight: 600;
    color: #000000;
}
.payment_info_right {
    font-size: 60rpx;
    font-weight: bold;
    color: #ff0000;
}
.deposit-text {
    font-size: 28rpx;
    font-weight: bold;
    margin-top: 40rpx;
}
.payment_desc {
    margin-top: 70rpx;
    width: 100%;
    background: #f4f8ff;
    border-radius: 16rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 12rpx 0;
    box-sizing: border-box;
}
.payment_desc image {
    width: 26rpx;
    height: 26rpx;
    margin-right: 18rpx;
}
.payment_way {
    margin-top: 20rpx;
}
.payment_btn {
    width: 100%;
    height: 92rpx;
    background: #e23e3e;
    border-radius: 46rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 58rpx;
}
.payment_doc {
    margin: 30rpx 0 6rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #ff0000;
    display: flex;
    justify-content: center;
    align-items: center;
}
.payment_doc_text {
    font-size: 24rpx;
    font-weight: bold;
    color: #666666;
    margin: 0 20rpx 0 14rpx;
}
/* 拍卖 */
.won {
    width: 484rpx;
    height: 576rpx;
    background: #ffffff;
    border-radius: 20rpx;
    background-size: 484rpx 410rpx;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.won image {
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
    margin-top: 110rpx;
}
.won_title {
    margin-top: 8rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #ffffff;
}
.won_price {
    margin: 16rpx 0 110rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #ffffff;
}
.won_desc {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
}
.won_btn {
    margin-top: 26rpx;
    width: 484rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    background: #6467f0;
    border-radius: 8rpx;
    display: flex;
}
.won_btn view {
    flex: 1;
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
}
/* 蒙版 */
.mask {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
}
.mask_center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btn_centern {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.first {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40rpx 0 20rpx;
}
.first_money {
    margin-top: 6rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
}
.pass {
    width: 484rpx;
    height: 560rpx;
    background: #ffffff;
    border-radius: 20rpx;
}
.pass_image {
    width: 100%;
    height: 328rpx;
    vertical-align: bottoms;
}
.pass_box {
    height: 232rpx;
    padding: 14rpx 0 38rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.pass_text {
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
}
.pass_btn {
    width: 364rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    background: #333333;
    border-radius: 44rpx;
    font-size: 36rpx;
    font-weight: 400;
    color: #ffffff;
}
.guanzhu {
    width: 96rpx;
    height: 96rpx;
    position: fixed;
    top: 850rpx;
    right: 20rpx;
    z-index: 10;
}
.han_price {
    width: 484rpx;
    height: 502rpx;
    background: #ffffff;
    border-radius: 20rpx;
}
.han_price image {
    width: 484rpx;
    height: 288rpx;
}
.han_price_text {
    font-size: 44rpx;
    font-weight: bold;
    color: #000000;
    text-align: center;
    margin-top: 10rpx;
}
.ban_price_btn {
    margin-top: 32rpx;
    padding: 0 60rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ban_price_cancelbtn {
    width: 172rpx;
    height: 62rpx;
    border: 2rpx solid #666666;
    border-radius: 44rpx;
    font-size: 24rpx;
    font-weight: bold;
    line-height: 62rpx;
    color: #666666;
    text-align: center;
}
.ban_price_surelbtn {
    width: 172rpx;
    height: 62rpx;
    background: linear-gradient(180deg, #fa5151 0%, #ff0000 100%);
    border-radius: 44rpx;
    font-size: 24rpx;
    font-weight: bold;
    line-height: 62rpx;
    color: #ffffff;
    text-align: center;
}
.yanchibox {
    height: 300rpx;
    display: flex;
    position: relative;
}
.yanchiTime {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 52rpx;
    padding: 8rpx 0;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 26rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
}
.yanchiTime image {
    width: 24rpx;
    height: 24rpx;
}
.yanchi_right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.yanchi_textbox {
    width: 620rpx;
    box-sizing: border-box;
    padding: 16rpx 22rpx;
    background: #000000;
    border-radius: 20rpx;
    color: #ffffff;
    font-weight: bold;
    font-size: 22rpx;
    position: absolute;
    top: 260rpx;
    left: 42rpx;
    z-index: 999;
}
</style>
