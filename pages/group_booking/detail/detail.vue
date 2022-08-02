<template>
    <view>
        <view class="detail-page">
            <view class="top-banner">
                <swiper circular class="banner-swiper" @change="swiperChange">
                    <swiper-item v-if="activityInfo.videoUrl" class="swiper-item">
                        <video id="swiperVideo" :src="activityInfo.videoUrl" class="banner-img" :poster="activityInfo.videoCover"></video>
                    </swiper-item>
                    <swiper-item class="swiper-item" v-for="(item, index) in activityInfo.bannerImgUrls" :key="index">
                        <view class="swiper-content">
                            <image :src="item" class="banner-img"></image>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="count-text-box">{{ currentBanner }}/{{ activityInfo.bannerImgUrls.length }}</view>
            </view>

            <view class="base-info">
                <view class="me-fx-row me-fx-sb-c price-down-count">
                    <view class="me-fx-row me-fx-start-end price-box">
                        <view class="me-fx-row me-fx-start-end">
                            <text class="symbol-text">￥</text>
                            <text class="price-num">{{ activityInfo.lowPrice }}</text>
                        </view>
                        <view class="me-fx-row me-fx-start-end old-price">￥{{ activityInfo.price }}</view>
                    </view>
                    <van-count-down :time="downTimes" :use-slot="true" :auto-start="true" @finish="activityEnd" @change="changeFun">
                        <view class="me-fx-col me-fx-c-c down-count">
                            <view>距拼团活动{{ activityInfo.state == 1 ? '开始' : '结束' }}还剩:</view>
                            <view class="me-fx-row me-fx-c-c">
                                <block v-if="downTimeObj.days !== '00'">
                                    <text class="num-text">{{ downTimeObj.days }}</text>
                                    天
                                </block>
                                <text class="num-text">{{ downTimeObj.hours }}</text>
                                时
                                <text class="num-text">{{ downTimeObj.minutes }}</text>
                                分
                                <text class="num-text">{{ downTimeObj.seconds }}</text>
                                秒
                            </view>
                        </view>
                    </van-count-down>
                </view>
                <view class="me-fx-row me-fx-start-c labels-container">
                    <text class="label-text1">拼团价</text>
                    <text class="label-text2">{{ activityInfo.groupOfNumber }}人团</text>
                    <text class="label-text2" v-if="activityInfo.limitBuyCount != -1">每人限购{{ activityInfo.limitBuyCount }}件</text>
                </view>
                <view class="me-full-text me-full-line2 goods-name">{{ activityInfo.commodityName }}</view>
                <view class="me-fx-row me-fx-sb-c base-info-bottom">
                    <view class="inventory-text">已售{{ activityInfo.soldCount }}件·库存{{ activityInfo.commodityTotalCount }}件·快递包邮</view>
                    <!-- 下面是活动分享按钮，现在隐藏 -->
                    <!-- <view class='me-fx-row me-fx-c-c share-box' bindtap="handleShareBtnClick">
                <image src='../imgs/wx.png' class='wx-img'></image>
                <text>分享</text>
            </view> -->
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
                    <image src="/static/pages/group_booking/imgs/point-adorn.png" class="point-adorn-img"></image>
                </view>
            </view>

            <!-- 开团列表 -->
            <view class="buy-user" v-if="groupList.list.length">
                <view class="me-fx-row me-fx-sb-c row-item">
                    <text class="title-msg">这些人刚刚发起拼团，可直接参团</text>
                    <view class="me-fx-row me-fx-start-c view-all" @tap="viewAll">
                        <text>查看全部</text>
                        <image src="/static/pages/group_booking/imgs/right-point.png" class="left-point-img"></image>
                    </view>
                </view>
                <block v-for="(item, index) in groupList.list" :key="index">
                    <view class="me-fx-row me-fx-sb-c row-item" v-if="index < 3">
                        <view class="me-fx-row me-fx-start-c">
                            <image :src="item.headimgurl" class="avatar-img"></image>
                            <text class="me-full-text user-name">{{ item.nickname }}</text>
                        </view>
                        <view class="me-fx-row me-fx-start-c">
                            <view class="me-fx-col me-fx-c-end join-info">
                                <view>
                                    还差
                                    <text class="people-num">{{ item.groupOfNumber - item.groupJoinNumber }}人</text>
                                    拼团
                                </view>
                                <van-count-down
                                    :time="item.diffTimes"
                                    :use-slot="true"
                                    :auto-start="true"
                                    @finish="finishFun($event, { index })"
                                    @change="changeFun($event, { index })"
                                    :data-index="index"
                                >
                                    <view class="down-time-str">
                                        <text>剩余:</text>
                                        <text v-if="item.downTimeObj.days !== '00'">{{ item.downTimeObj.days }}天</text>
                                        <text>{{ item.downTimeObj.hours }}:{{ item.downTimeObj.minutes }}:{{ item.downTimeObj.seconds }}</text>
                                    </view>
                                </van-count-down>
                            </view>
                            <view class="join-btn" @tap="goJoin" :data-item="item">去参团</view>
                        </view>
                    </view>
                </block>
            </view>

            <view class="explain-info">
                <view class="me-fx-row me-fx-start-c block-title-box">
                    <text class="col-line"></text>
                    <text>活动规则</text>
                </view>
                <view class="explain-text">
                    <view>1.拼团有效期</view>
                    <view>拼团有效期是由开团时刻起开始计算,商家设置的时间。</view>
                    <view>2.拼团成功</view>
                    <view>拼团有效期内,支付的用户数达到参团人数,则拼团成功,商家进入发货流程。</view>
                    <view>3.拼团失败</view>
                    <view>拼团有效期内,未达到要求参团人数,则为拼团失败。</view>
                    <view>4.等待成团中如何退款？</view>
                    <view>拼团中状态暂不支持退款申请，有需要的可以等待拼团成功后申请或者失败后自动退回。</view>
                    <view>5.商品承诺的发货时间</view>
                    <view>参加拼团活动的商品承诺发货时间，将以拼团成功时间为准开始计算。</view>
                    <view>6.限量规则</view>
                    <view>商家如设置每人开团次数限制,达到限制后,将无法再次开团。</view>
                    <view>7.退货说明</view>
                    <view>活动商品如有保质期、品质、假冒伪劣问题请及时保留证据并联系商家线下退货。</view>
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
                        <image src="/static/pages/group_booking/imgs/msg-img.png" class="icon-img"></image>
                        <text>客服</text>
                    </view>
                    <view class="me-fx-col me-fx-c-c link-item" @tap="jumpShop">
                        <image src="/static/pages/group_booking/imgs/shop-img.png" class="icon-img"></image>
                        <text>店铺</text>
                    </view>
                </view>
                <view class="me-fx-row me-fx-start-c handel-btn">
                    <!-- <view class='me-fx-col me-fx-c-c left-btn' bindtap='handleFlootBtn' data-type='1'>
                <text>¥{{activityInfo.price}}</text>
                <text>单独购买</text>
            </view> -->
                    <view class="me-fx-col me-fx-c-c right-btn" @tap="handleFlootBtn" data-type="2">
                        <text>¥{{ activityInfo.lowPrice }}</text>
                        <text>一键开团({{ activityInfo.groupOfNumber }}人)</text>
                    </view>
                    <!-- <view class='me-fx-col me-fx-c-c right-btn' bindtap='handleFlootBtn' data-type='2'>
                <text>¥1750</text>
                <text>一键开团(3人)</text>
            </view> -->
                    <!-- <view class='me-fx-col me-fx-c-c right-btn' bindtap='handleFlootBtn' data-type='3'>
                <text>查看拼团进度</text>
            </view> -->
                </view>
            </view>
        </view>

        <!-- 拼团弹窗 -->
        <van-popup
            :show="showJoinPopup"
            :round="true"
            :close-on-click-overlay="true"
            @click-overlay="closePopup($event, { attrname: 'showJoinPopup' })"
            data-attrname="showJoinPopup"
        >
            <view class="me-fx-col me-fx-c-c join-spell-group-popup-content">
                <view class="me-fx-row me-fx-c-c top-title">
                    <image class="shizhong-img" src="/static/pages/group_booking/imgs/shizhong-icon.png"></image>
                    <view>
                        等待成团，仅剩
                        <text class="people-count">{{ expectGroup.groupOfNumber - expectGroup.groupJoinNumber }}</text>
                        个名额
                    </view>
                </view>
                <view class="me-fx-row me-fx-start-c user-list">
                    <view class="avatar-item" v-for="(item, index) in expectGroup.groupJoinUserHeads" :key="index">
                        <image :src="item" class="user-avatar"></image>

                        <text v-if="index === 0" class="initiator-user-label">团长</text>
                    </view>
                    <image
                        src="/static/pages/group_booking/imgs/empty-avatar.png"
                        class="empty-avatar-img"
                        v-for="(item, ti) in expectGroup.groupOfNumber - expectGroup.groupJoinNumber"
                        :key="item.ti"
                    ></image>
                </view>
                <van-count-down
                    :time="expectGroup.diffTimes"
                    :use-slot="true"
                    :auto-start="true"
                    @finish="finishFun($event, { groupinfo: expectGroup })"
                    @change="changeFun($event, { groupinfo: expectGroup })"
                    :data-groupinfo="expectGroup"
                >
                    <view class="me-fx-row me-fx-c-c down-count-box">
                        距结束:
                        <block v-if="expectGroup.downTimeObj.days !== '00'">
                            <text class="down-num">{{ expectGroup.downTimeObj.days }}</text>
                            天
                        </block>
                        <text class="down-num">{{ expectGroup.downTimeObj.hours }}</text>
                        时
                        <text class="down-num">{{ expectGroup.downTimeObj.minutes }}</text>
                        分
                        <text class="down-num">{{ expectGroup.downTimeObj.seconds }}</text>
                        秒
                    </view>
                </van-count-down>

                <button class="immediately-join-btn" @tap="jumpJoinDetail">立即参团</button>
            </view>
        </van-popup>

        <!-- 发起平团全部用户 -->
        <van-popup
            :show="showAllUser"
            :round="true"
            :close-on-click-overlay="true"
            @click-overlay="closePopup($event, { attrname: 'showAllUser' })"
            @close="closePopup($event, { attrname: 'showAllUser' })"
            :closeable="true"
            data-attrname="showAllUser"
        >
            <view class="all-user-list-popup">
                <view class="me-fx-row me-fx-c-c popup-title">即将拼成，一键参团</view>
                <scroll-view
                    :scroll-y="true"
                    class="list-scroll"
                    @scrolltolower="scrolltolower"
                    :refresher-enabled="true"
                    :refresher-triggered="refresherStatus"
                    @refresherpulling="refresherpulling"
                    @refresherrefresh="refresherrefresh"
                >
                    <view class="me-fx-row me-fx-sb-c row-item" v-for="(item, index) in groupList.list" :key="index">
                        <view class="me-fx-row me-fx-start-c">
                            <image :src="item.headimgurl" class="avatar-img"></image>
                            <text class="me-full-text user-name">{{ item.nickname }}</text>
                        </view>

                        <view class="me-fx-row me-fx-start-c">
                            <view class="me-fx-col me-fx-c-end join-info">
                                <view>
                                    还差
                                    <text class="people-num">{{ item.groupOfNumber - item.groupJoinNumber }}人</text>
                                    拼团
                                </view>
                                <van-count-down
                                    :time="item.diffTimes"
                                    :use-slot="true"
                                    :auto-start="true"
                                    @finish="finishFun($event, { index })"
                                    @change="changeFun($event, { index })"
                                    :data-index="index"
                                >
                                    <view class="down-time-str">
                                        <text>剩余:</text>
                                        <text v-if="item.downTimeObj.days !== '00'">{{ item.downTimeObj.days }}天</text>
                                        <text>{{ item.downTimeObj.hours }}:{{ item.downTimeObj.minutes }}:{{ item.downTimeObj.seconds }}</text>
                                    </view>
                                </van-count-down>
                            </view>
                            <view class="join-btn" @tap="goJoin" :data-item="item">去参团</view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </van-popup>

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
                    <image :src="currentSku.imageUrl" class="goods-img"></image>
                    <view class="me-fx-1 me-fx-col me-fx-sb right-info">
                        <view class="price-text">¥{{ buyType == 1 ? currentSku.price : currentSku.livePrice }}</view>
                        <view class="me-fx-row me-fx-sb-c">
                            <view class="me-full-text me-full-line2 goods-name">{{ activityInfo.commodityName }}</view>
                            <view>库存:{{ currentSku.residueCommoditySkuCount }}</view>
                        </view>
                    </view>
                </view>
                <view class="specification-list">
                    <view class="title-text">规格分类</view>
                    <view class="me-fx-row">
                        <text
                            :class="'specification-item ' + (item.skuId == goodsSkuId ? 'sel-item' : '')"
                            @tap="selSkuFun"
                            :data-skuitem="item"
                            v-for="(item, index) in skuList"
                            :key="index"
                        >
                            {{ item.skuName }}
                        </text>
                    </view>
                </view>
                <view class="me-fx-row me-fx-sb-c buy-count">
                    <view class="me-fx-row me-fx-start-end">
                        <text class="title-text">购买数量</text>
                        <text class="msg-text" v-if="activityInfo.limitBuyCount != -1">此商品限购{{ activityInfo.limitBuyCount }}件</text>
                    </view>
                    <add-subtract-num @change="countChange" @minusCount="minusCount" :desabled="isCountDesabled"></add-subtract-num>
                </view>
                <view class="me-fx-row me-fx-sb-c address-text" @tap="jumpAddressList">
                    <view>{{ userShipping.fullAddress || '请选择收货地址' }}</view>
                    <image src="/static/pages/group_booking/imgs/right-jiantou.png" class="right-jiantou-img"></image>
                </view>
                <view class="remark-content">
                    <view class="title-text">备注：</view>
                    <view>
                        <textarea value="请输入" :value="reason" @input="textChange" class="remark-ipt"></textarea>
                    </view>
                </view>
                <button class="down-order-btn" @tap="jumpComfirmOrder">{{ buyType == 1 ? '立即支付' : '立即支付并开团' }}</button>
            </view>
        </van-popup>

        <!-- 分享弹窗 -->
        <van-popup :show="showShare" position="bottom" :close-on-click-overlay="true" @click-overlay="closePopup($event, { attrname: 'showShare' })" data-attrname="showShare">
            <view class="share-content-popup">
                <view class="me-fx-row me-fx-sa-c">
                    <button class="me-fx-col me-fx-c-c share-btn" open-type="share">
                        <image src="/static/pages/group_booking/imgs/wx-logo.png" class="share-img"></image>
                        <text>分享至微信</text>
                    </button>
                    <view class="me-fx-col me-fx-c-c" @tap="createPosters">
                        <image src="/static/pages/group_booking/imgs/save-img.png" class="share-img"></image>
                        <text>保存海报</text>
                    </view>
                </view>
                <button class="cancel-btn" @tap="closePopup" data-attrname="showShare">取消</button>
            </view>
        </van-popup>

        <van-popup :show="isEnd" :close-on-click-overlay="true" custom-style="border-radius:28rpx;" @click-overlay="hideEndPopup">
            <view class="me-fx-col me-fx-c-c activity-end-popup-content">
                <view class="title-text">拼团活动已结束</view>
                <view class="goods-name">{{ activityInfo.commodityName }}</view>
                <image class="activity-end-img" src="/static/pages/group_booking/imgs/activity_end_img.png"></image>
                <!-- <button class='popup-btn' bindtap='jumpJoinUserList'>查看推荐订单</button> -->
            </view>
        </van-popup>

        <!-- 海报展示弹窗 -->
        <view v-if="showPoster" class="poster-popup" @tap="closePosterPopup">
            <image class="poster-img" :src="testimgUrl"></image>
            <view class="me-fx-row me-fx-c-c footer-save">
                <button class="save-btn" @tap.stop.prevent="savePoster">保存海报</button>
            </view>
        </view>

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
// pages/group_booking/detail/detail.js
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
            currentBanner: 1,
            //当前banner下标
            showJoinPopup: false,
            //拼团弹窗显示状态
            showAllUser: false,
            //发起拼团用户的所有用户列表显示状态
            showSelSpecification: false,
            //选择规格弹窗显示状态
            showShare: false,
            // 分享弹窗显示状态
            showPoster: false,
            //海报图展示弹窗状态
            loginInfo: {},
            //本地缓存用户信息
            userShipping: {
                fullAddress: ''
            },
            //地址信息
            buyType: '',
            //购买类型 1单独购买  2开团
            buyCount: 1,
            //购买数量
            currentSku: {
                imageUrl: '',
                price: '',
                livePrice: '',
                residueCommoditySkuCount: ''
            },
            //当前所选规格
            activityInfo: {
                videoUrl: '',
                videoCover: '',
                bannerImgUrls: [],
                lowPrice: '',
                price: '',
                state: 0,
                groupOfNumber: '',
                limitBuyCount: '',
                commodityName: '',
                soldCount: '',
                commodityTotalCount: '',
                orderTypeArr: [],
                detailImgUrls: []
            },
            //活动信息
            isEnd: false,
            //活动结束标识
            skuList: [],
            //规格列表
            goodsSkuId: '',
            //商品规格id
            downTimes: '',
            //倒计时毫秒数
            downTimeObj: {
                days: '',
                hours: '',
                minutes: '',
                seconds: ''
            },
            //倒计时展示对象
            isCountDesabled: false,
            //禁止改变数量状态
            expectGroup: {
                groupOfNumber: 0,
                groupJoinNumber: 0,
                groupJoinUserHeads: [],
                diffTimes: '',

                downTimeObj: {
                    days: '',
                    hours: '',
                    minutes: '',
                    seconds: ''
                }
            },
            //期望参与的团信息
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
                    x: 162,
                    y: 30
                },
                {
                    content: '拼团价:',
                    color: '#1577FF',
                    size: 37,
                    x: 24,
                    y: 650
                },
                {
                    content: '1759',
                    color: '#1577FF',
                    size: 50,
                    x: 146,
                    y: 645
                },
                {
                    content: '3人拼团立省241',
                    color: '#616161',
                    size: 26,
                    x: 24,
                    y: 710
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
                    content: '立即扫码参与拼团',
                    color: '#616161',
                    size: 18,
                    x: 362,
                    y: 816
                }
            ],
            testimgUrl: '',
            //生成的海报地址
            groupList: {
                //开团列表信息
                pageSize: 10,
                pageNum: 1,
                stopReq: false,
                list: []
            },
            userOpenGroup: [],
            //当前用户的开团
            reason: '',
            //理由
            testimgUrl: '',
            //海报图
            refresherStatus: true //下拉刷新状态
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
    onPullDownRefresh: function () {
        this.getDetailInfo(); //获取详情数据

        this.getOpenGroupList(); //查询开团列表

        this.getUserOpenGroup(); //查询当前用户的开团信息
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var activityId = this.activityId;
        var userId = this.loginInfo.userId;
        var groupInfo = this.userOpenGroup[0];
        var path = '';

        if (groupInfo) {
            var query = {
                groupInfo
            };
            query = JSON.stringify(query);
            query = encodeURIComponent(query);
            var path = '/pages/group_booking/join_detail/join_detail';
            path = path + '?activityId=' + activityId + '&shareUserId=' + userId;
            path += `&query=${query}`;
        } else {
            var path = '/pages/group_booking/detail/detail';
            path = path + '?activityId=' + activityId + '&shareUserId=' + userId;
        }

        return {
            title: this.loginInfo.nickName + '邀请你参与拼团活动',
            path,
            imageUrl: this.activityInfo.bannerImgUrls[0]
        };
    },
    /* 分享朋友圈 */
    onShareTimeline() {
        return {
            title: this.loginInfo.nickName + '邀请你参与拼团活动',
            imageUrl: this.activityInfo.bannerImgUrls[0]
        };
    },
    methods: {
        scrolltolower() {
            //scroll-view滚动到底部
            var groupList = this.groupList;

            if (!groupList.stopReq) {
                groupList.pageNum++;
                this.setData(
                    {
                        groupList
                    },
                    () => {
                        this.getOpenGroupList();
                    }
                );
            }
        },

        refresherpulling() {
            //scroll-view下拉
            setTimeout(() => {
                this.setData({
                    refresherStatus: false
                });
            }, 1000);
        },

        refresherrefresh() {
            //scroll-view下拉刷新触发
            var groupList = this.groupList;
            groupList.pageNum = 1;
            groupList.stopReq = false;
            this.setData(
                {
                    groupList
                },
                () => {
                    this.getOpenGroupList();
                }
            );
        },

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
                    this.codeInfo = data;
                    this.setData(
                        {
                            loginInfo
                        },
                        () => {
                            this.getOpenGroupList(); //查询开团列表

                            this.getUserOpenGroup(); //查询当前用户的开团信息
                        }
                    );
                    this.getCodeImg(); //获取小程序码图
                }
            });
            this.getDetailInfo(); //获取详情数据
        },

        getCodeImg() {
            var appid = this.loginInfo.appId;
            var activityId = this.activityId;
            var userId = this.loginInfo.userId;
            var groupInfo = this.userOpenGroup[0];
            var path = '';

            if (groupInfo) {
                var query = {
                    groupInfo
                };
                query = JSON.stringify(query);
                query = encodeURIComponent(query);
                var path = '/pages/group_booking/join_detail/join_detail';
                path = path + '?activityId=' + activityId + '&shareUserId=' + userId;
                path += `&query=${query}`;
            } else {
                var path = '/pages/group_booking/detail/detail';
                path = path + '?activityId=' + activityId + '&shareUserId=' + userId;
            }

            app.globalData
                .sjrequest1('/activityBusiness/createQr', {
                    page: path,
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
                    uni.stopPullDownRefresh();

                    if (res.statusCode == 200 && res.data.code === 0) {
                        var nowTime = new Date().getTime();
                        var data = res.data.data;

                        if (data.state == 1) {
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
                        data.soldCount = data.commodityTotalCount - data.residueCommodityTotalCount;
                        var userShipping = data.userShipping || {};

                        if (userShipping) {
                            var { provincesName, cityName, areaName, address } = userShipping;
                            userShipping.fullAddress = provincesName + cityName + areaName + address;
                        }

                        data.orderTypeArr = data.orderTemplate.split(',');
                        this.setData({
                            currentSku,
                            userShipping,
                            activityInfo: data,
                            skuList: data.activityCommoditySkuList,
                            goodsSkuId: currentSku.skuId,
                            downTimes: diffTime
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

            var difference = skuItem1.price - skuItem1.livePrice;
            difference = Number(difference.toFixed(2));
            texts[3].content = data.groupOfNumber + '人拼团立省' + difference; //拼团人数

            texts[4].content = '原价:' + skuItem1.price; //原价

            this.setData({
                imgs,
                texts
            });
        },

        getUserOpenGroup() {
            //获取当前用户开团
            app.globalData
                .sjrequest1('/activityTTPTBusiness/groupListByActivityId', {
                    activityId: this.activityId,
                    merchantId: this.loginInfo.merchantId,
                    status: 1,
                    pageSize: 10,
                    currentPage: 1,
                    userId: this.loginInfo.userId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        list.forEach((item) => {
                            var nowTimes = new Date().getTime();

                            var endTimes = this._parseDate(item.endTime, 'number');

                            var diffTimes = endTimes - nowTimes;
                            item.diffTimes = diffTimes;
                            item.downTimeObj = {};
                        });
                        this.setData({
                            userOpenGroup: list
                        });
                    }
                });
        },

        getOpenGroupList() {
            //获取开团列表
            var groupList = this.groupList;
            app.globalData
                .sjrequest1('/activityTTPTBusiness/groupListByActivityId', {
                    activityId: this.activityId,
                    merchantId: this.loginInfo.merchantId,
                    status: 1,
                    pageSize: groupList.pageSize,
                    currentPage: groupList.pageNum
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        groupList.stopReq = list.length !== groupList.pageSize;
                        list.forEach((item) => {
                            var nowTimes = new Date().getTime();

                            var endTimes = this._parseDate(item.overTime, 'number');

                            var diffTimes = endTimes - nowTimes;
                            item.diffTimes = diffTimes;
                            item.downTimeObj = {};
                        });

                        if (groupList.pageNum == 1) {
                            groupList.list = list;
                        } else {
                            groupList.list.push(...list);
                        }
                    }

                    this.setData({
                        groupList
                    });
                });
        },

        handleShareBtnClick() {
            // 分享弹窗
            this.setData({
                showShare: !this.showShare
            });
        },

        jumpJoinDetail() {
            //跳转参团详情页
            var activityId = this.activityId;
            var query = {
                groupInfo: this.expectGroup
            };
            query = JSON.stringify(query);
            query = 'query=' + encodeURIComponent(query);
            uni.navigateTo({
                url: '/pages/group_booking/join_detail/join_detail?' + query + `&activityId=${activityId}`
            });
        },

        swiperChange(e) {
            //banner图改变时
            var current = e.detail.current;
            this.setData({
                currentBanner: current + 1
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

        viewAll() {
            //查看全部发起平团用户
            this.setData({
                showAllUser: true
            });
        },

        goJoin(e) {
            //点击去拼团
            var expectGroup = e.currentTarget.dataset.item;

            var endTime = this._parseDate(expectGroup.overTime, 'number');

            var nowTime = new Date().getTime();
            var diffTime = endTime - nowTime;
            expectGroup.diffTimes = diffTime;

            if (this.showAllUser) {
                this.setData({
                    showJoinPopup: true,
                    showAllUser: false,
                    expectGroup
                });
            } else {
                this.setData({
                    showJoinPopup: true,
                    expectGroup
                });
            }
        },

        closePopup(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //关闭弹窗
            var attrname = e.currentTarget.dataset.attrname;
            this[e.currentTarget.dataset.attrname] = false;
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
                        shipping.fullAddress = this.joinAddress(shipping);
                        this.setData({
                            userShipping: shipping
                        });
                    }
                }
            });
        },

        joinAddress(shipping) {
            //拼接收货地址
            var { provincesName, cityName, areaName, address } = shipping;
            return provincesName + cityName + areaName + address;
        },

        changeFun(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //倒计时改变
            var detail = e.detail;
            var index = e.currentTarget.dataset.index;
            var expectGroup = e.currentTarget.dataset.groupinfo;
            var groupList = this.groupList;

            for (var key in detail) {
                var value = detail[key];

                if (value < 10) {
                    detail[key] = '0' + value;
                } else {
                    detail[key] = value;
                }
            }

            if (index != undefined) {
                groupList.list[index].downTimeObj = detail;
                this.setData({
                    groupList
                });
            } else if (expectGroup) {
                expectGroup.downTimeObj = detail;
                this.setData({
                    expectGroup
                });
            } else {
                this.setData({
                    downTimeObj: detail
                });
            }
        },

        handleFlootBtn(e) {
            var type = e.currentTarget.dataset.type; //用于判断 拼团 还是 独购

            var activityInfo = this.activityInfo;

            if (activityInfo.state == 1) {
                uni.showToast({
                    title: '活动还未开始',
                    icon: 'none'
                });
            } else {
                this.setData({
                    showSelSpecification: true,
                    buyType: type
                });
            }
        },

        selSkuFun(e) {
            //选择规格
            var skuItem = e.currentTarget.dataset.skuitem;
            this.setData({
                goodsSkuId: skuItem.skuId,
                currentSku: skuItem
            });
        },

        textChange(e) {
            //输入理由
            var value = e.detail.value;
            this.setData({
                reason: value
            });
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

        minusCount() {
            //减数量
            if (this.isCountDesabled) {
                this.setData({
                    isCountDesabled: false
                });
            }
        },

        jumpComfirmOrder() {
            //跳转确认订单页
            var activityInfo = this.activityInfo;
            var buyCount = this.buyCount;
            var skuInfo = this.currentSku;
            var userShipping = this.userShipping;
            var buyType = this.buyType; //购买类型 1单独购买 2开团

            var query = {
                skuInfo,
                buyCount,
                userShipping,
                buyType,
                goodsName: activityInfo.commodityName,
                activityId: this.activityId,
                commodityId: activityInfo.commodityId,
                shareUserId: this.shareUserId,
                orderType: activityInfo.orderTemplate
            };
            query = JSON.stringify(query);
            query = 'query=' + encodeURIComponent(query);
            this.setData({
                showSelSpecification: false
            });
            uni.navigateTo({
                url: '/pages/group_booking/confirm-order/confirm-order?' + query
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

        finishFun(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 finishFun 未声明');
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
}

.base-info .price-down-count {
    padding: 10rpx 10rpx 10rpx 30rpx;
    box-sizing: border-box;
}

.base-info .price-box {
    color: #eb1918;
    font-size: 22rpx;
}

.base-info .price-box .symbol-text {
    font-size: 26rpx;
}

.base-info .price-box .price-num {
    font-size: 50rpx;
    font-weight: bold;
    position: relative;
    top: 4px;
}

.base-info .price-box .old-price {
    text-decoration: line-through;
    margin-left: 24rpx;
}

.base-info .price-down-count .down-count {
    background-color: #eb1918;
    font-size: 18rpx;
    color: #fff;
    padding: 10rpx 36rpx;
    border-radius: 10rpx;
}

.base-info .price-down-count .down-count .num-text {
    width: 30rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    background-color: #fff;
    border-radius: 6rpx;
    font-size: 26rpx;
    color: #eb1918;
    margin: 0 5rpx;
    padding: 0 5rpx;
    font-weight: bold;
}

.base-info .labels-container {
    padding: 10rpx 30rpx 10rpx;
    box-sizing: border-box;
}

.base-info .labels-container .label-text1 {
    font-size: 24rpx;
    color: #eb1918;
    padding: 3rpx 24rpx;
    border-radius: 6rpx;
    background-color: rgba(235, 25, 24, 0.1);
}

.base-info .labels-container .label-text2 {
    background: linear-gradient(152deg, #ff972a 0%, #fd5c00 100%);
    font-size: 20rpx;
    padding: 3rpx 10rpx;
    border-radius: 22rpx;
    color: #fff;
    margin-left: 20rpx;
}

.base-info .goods-name {
    font-size: 30rpx;
    color: #0f0f0f;
    font-weight: bold;
    padding: 0 30rpx;
    box-sizing: border-box;
}

.base-info .base-info-bottom {
    padding: 30rpx 0 26rpx 30rpx;
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

/* 发起拼团的用户 */
.buy-user {
    width: 710rpx;
    background-color: #fff;
    margin: 20rpx auto 0;
    padding: 0 28rpx 0;
    box-sizing: border-box;
    border-radius: 16rpx;
}

.buy-user .row-item {
    padding: 30rpx 0;
}

.buy-user .row-item:not(:last-child) {
    border-bottom: 1rpx solid #e1e1e1;
}

.buy-user .row-item .title-msg {
    font-size: 26rpx;
    color: #0f0f0f;
    font-weight: bold;
}

.buy-user .row-item .view-all {
    font-size: 26rpx;
    color: #eb1918;
}

.buy-user .row-item .left-point-img {
    width: 18rpx;
    height: 26rpx;
}

.buy-user .row-item .avatar-img {
    width: 80rpx;
    height: 80rpx;
    margin-right: 10rpx;
    border-radius: 50%;
    background-color: #ccc;
}

.buy-user .row-item .user-name {
    font-size: 24rpx;
    color: #333;
    width: 216rpx;
}

.buy-user .row-item .join-info {
    font-size: 24rpx;
    color: #333;
}

.buy-user .row-item .join-info .down-time-str {
    font-size: 24rpx;
    color: #333;
}

.buy-user .row-item .people-num {
    color: #ffbb38;
}

.buy-user .row-item .join-btn {
    color: #fff;
    background-color: #ffbb38;
    font-size: 26rpx;
    padding: 5rpx 15rpx;
    border-radius: 6rpx;
    margin-left: 22rpx;
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
    margin: 0 30rpx;
}

.floot-container .icon-img {
    width: 40rpx;
    height: 40rpx;
    margin-bottom: 5rpx;
}

.floot-container .handel-btn {
    margin-right: 20rpx;
    margin-bottom: 28rpx;
    font-size: 20rpx;
    color: #fff;
}
.service {
    margin-bottom: 20rpx;
}
.floot-container .handel-btn .left-btn {
    background-color: #ff8887;
    width: 222rpx;
    border-radius: 38rpx 0 0 38rpx;
    height: 74rpx;
}

.floot-container .handel-btn .right-btn {
    background-color: #eb1918;
    width: 424rpx;
    border-radius: 38rpx;
    height: 74rpx;
}

.floot-container .handel-btn .right-btn1 {
    background-color: #656565;
}

/* 参与平团弹窗 */
.join-spell-group-popup-content {
    background-color: #fff;
    padding: 40rpx 20rpx;
    box-sizing: border-box;
    width: 640rpx;
}

.join-spell-group-popup-content .top-title {
    font-size: 36rpx;
    color: #0f0f0f;
    font-weight: bold;
}

.join-spell-group-popup-content .top-title .shizhong-img {
    width: 56rpx;
    height: 56rpx;
    margin-right: 34rpx;
}

.join-spell-group-popup-content .top-title .people-count {
    color: #eb1918;
    margin: 0 10rpx;
}

.join-spell-group-popup-content .user-list {
    margin: 58rpx 0 34rpx;
    flex-wrap: wrap;
}

.join-spell-group-popup-content .user-list .avatar-item {
    position: relative;
    margin: 0 20rpx 15rpx;
}

.join-spell-group-popup-content .user-list .avatar-item .user-avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: #ccc;
}

.join-spell-group-popup-content .user-list .avatar-item .initiator-user-label {
    background-color: #1577ff;
    border-radius: 14px 14px 14px 0px;
    font-size: 18rpx;
    color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2rpx 10rpx;
}

.join-spell-group-popup-content .user-list .empty-avatar-img {
    width: 100rpx;
    height: 100rpx;
    margin-right: 15rpx;
    margin-bottom: 15rpx;
}

.join-spell-group-popup-content .down-count-box {
    font-size: 26rpx;
    color: #0f0f0f;
    font-weight: bold;
    margin-bottom: 40rpx;
}

.join-spell-group-popup-content .down-count-box .down-num {
    width: 48rpx;
    height: 56rpx;
    border-radius: 8rpx;
    background-color: #ffbb38;
    color: #fff;
    font-size: 35rpx;
    font-weight: bold;
    text-align: center;
    margin: 0 10rpx;
    line-height: 56rpx;
}

.join-spell-group-popup-content .immediately-join-btn {
    width: 382rpx;
    height: 74rpx;
    color: #fff;
    font-size: 24rpx;
    padding: 0;
    margin: 0;
    border-radius: 38rpx;
    background-color: #eb1918;
    line-height: 74rpx;
}

/* 参与拼团全部用户列表弹窗 */
.all-user-list-popup {
    width: 700rpx;
    background-color: #fff;
}

.all-user-list-popup .popup-title {
    font-size: 30rpx;
    color: #0f0f0f;
    height: 98rpx;
    width: 600rpx;
    border-bottom: 1rpx solid #e5e5e5;
    font-weight: bold;
    margin: 0 auto;
}

.all-user-list-popup .list-scroll {
    height: 698rpx;
}

.all-user-list-popup .row-item {
    padding: 30rpx;
    box-sizing: border-box;
}

.all-user-list-popup .row-item .title-msg {
    font-size: 26rpx;
    color: #0f0f0f;
    font-weight: bold;
}

.all-user-list-popup .row-item .view-all {
    font-size: 26rpx;
    color: #eb1918;
}

.all-user-list-popup .row-item .left-point-img {
    width: 18rpx;
    height: 26rpx;
}

.all-user-list-popup .row-item .avatar-img {
    width: 80rpx;
    height: 80rpx;
    margin-right: 10rpx;
    border-radius: 50%;
    background-color: #ccc;
}

.all-user-list-popup .row-item .user-name {
    font-size: 24rpx;
    color: #333;
    width: 216rpx;
}

.all-user-list-popup .row-item .join-info {
    font-size: 24rpx;
    color: #333;
}

.all-user-list-popup .row-item .join-info .down-time-str {
    font-size: 24rpx;
    color: #333;
}

.all-user-list-popup .row-item .people-num {
    color: #ffbb38;
}

.all-user-list-popup .row-item .join-btn {
    color: #fff;
    background-color: #ffbb38;
    font-size: 26rpx;
    padding: 5rpx 15rpx;
    border-radius: 6rpx;
    margin-left: 22rpx;
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

.sel-specification-popup .goods-base-info .goods-name {
    margin-right: 20rpx;
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
    border-bottom: 1rpx solid #e5e5e5;
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

.sel-specification-popup .address-text {
    font-size: 28rpx;
    color: #acacac;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #e5e5e5;
}

.sel-specification-popup .address-text .right-jiantou-img {
    width: 24rpx;
    height: 42rpx;
}

.sel-specification-popup .remark-content {
    padding: 20rpx 0;
}

.sel-specification-popup .remark-content .title-text {
    font-size: 28rpx;
    color: #000;
    margin-bottom: 20rpx;
}

.sel-specification-popup .remark-content .remark-ipt {
    width: 638rpx;
    height: 210rpx;
    border: 1rpx solid #e5e5e5;
    padding: 20rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    color: #acacac;
    position: relative;
    left: 26rpx;
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
</style>
