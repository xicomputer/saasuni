<template>
    <view>
        <store-close v-if="isClose"></store-close>
        <view class="integral-container">
            <!-- 积分头部 -->
            <view class="integral-top">
                <image class="integral-top-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/integral_img.png">
                    <navigator :url="'/pages/Index/integral/integralRule/integralRule?marchantId=' + marchantId" class="integral-rule">积分规则</navigator>
                </image>
            </view>
            <view class="integral-tool-list-box">
                <view class="integral-tool-list">
                    <navigator class="integral-tool-item" :url="item.url + '?marchantId=' + marchantId" v-for="(item, index) in toolList" :key="index">
                        <image class="integral-tool-item-img" :src="item.img"></image>

                        <view class="integral-tool-item-text">{{ item.text }} {{ index == 0 ? userintegral : '' }}</view>
                    </navigator>
                </view>
            </view>
            <view class="integral-change-box">
                <!-- 活动倒计时 -->
                <view class="integral-content-container activity-container">
                    <view class="integral-title-container">
                        <view class="integral-title-left-box"></view>
                        <view class="integral-title-text">活动结束倒计时</view>
                    </view>
                    <van-count-down use-slot @change="changeTime" @finish="overActivity" :time="signData.countDownTime" class="activity-count-down">
                        <text class="activity-count-down-text" v-if="timeData.days != 0">{{ timeData.days }}</text>
                        <text v-if="timeData.days != 0">天</text>
                        <text class="activity-count-down-text">{{ timeData.hours < 10 ? '0' + timeData.hours : timeData.hours }}</text>
                        :
                        <text class="activity-count-down-text">{{ timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes }}</text>
                        :
                        <text class="activity-count-down-text">{{ timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds }}</text>
                    </van-count-down>
                </view>

                <!-- 当前参与人数 -->
                <view class="integral-content-container" :style="!haveSignIn ? 'border-radius: 0 0 20rpx 20rpx;position:relative' : ''">
                    <view class="integral-title-container">
                        <view class="integral-title-left-box"></view>
                        <view class="integral-title-text">当前参与人数</view>
                    </view>
                    <scroll-view :scroll-x="true" style="width: 100%; margin-top: 20rpx">
                        <view class="integral-member-list">
                            <image :src="item.headimgurl" class="integral-member-img" v-for="(item, index) in signData.signinUserList" :key="index"></image>
                        </view>
                    </scroll-view>
                </view>

                <!-- 七天签到领取积分 -->
                <view class="integral-content-container" style="border-radius: 20rpx 20rpx 0 0; position: relative; margin-bottom: 0rpx">
                    <view class="integral-title-container">
                        <view class="integral-title-left-box"></view>
                        <view class="integral-title-text">七天签到领取积分</view>
                    </view>

                    <block v-if="signData.signinList[nowDay - 1].isSignin == 1">
                        <view @tap="signIn" class="integral-sign-in-btn integral-signed-in-btn">已签到</view>
                    </block>
                    <view v-else @tap="signIn" class="integral-sign-in-btn">立即签到</view>
                    <view class="integral-sign-in-list">
                        <view class="integral-sign-in-item-box" v-for="(item, index) in signData.signinList" :key="index">
                            <block v-if="item.isSignin == 1 || index == nowDay - 1">
                                <view class="integral-sign-in-item" style="background: #ffffff">
                                    <view class="integral-sign-in-item-status" style="color: #000">{{ item.isSignin == 0 && index == nowDay - 1 ? '签到' : '已签' }}</view>
                                    <image src="/static/pages/img/index/integral_state1.png" class="integral-sign-in-item-image"></image>
                                    <view class="integral-sign-in-add" style="color: #000">+{{ item.score }}</view>
                                </view>
                            </block>

                            <block v-else>
                                <view class="integral-sign-in-item" style="background: #d8d8d8; border: 2rpx solid #999">
                                    <view class="integral-sign-in-item-left-top" style="background: #ffffff"></view>
                                    <view class="integral-sign-in-item-status" style="color: #999">{{ index > nowDay - 1 ? weekList[index] : '未签' }}</view>
                                    <image src="/static/pages/img/index/integral_state2.png" class="integral-sign-in-item-image"></image>
                                    <view class="integral-sign-in-add" style="color: #999">+{{ item.score }}</view>
                                </view>
                            </block>

                            <view class="integral-sign-in-progress" v-if="index != 6">
                                <view v-if="index < nowDay - 1" style="width: 100%" class="integral-sign-in-progress-in"></view>
                                <view v-if="index == nowDay - 1" style="width: 50%" class="integral-sign-in-progress-in"></view>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 做任务赚积分 -->
                <view class="integral-task-container">
                    <view class="integral-task-top">
                        <view class="integral-title-container">
                            <view class="integral-title-left-box"></view>
                            <view class="integral-title-text">做任务赚积分</view>
                        </view>
                        <!-- <view class="integral-title-container">
          <view class="integral-title-left-box"></view>
          <view class="integral-title-text">提醒我</view>
          <image style="width:60rpx;height:60rpx;margin-left:20rpx" src="/pages/img/index/integral4.png"></image>
        </view> -->
                    </view>
                    <!-- 任务 -->
                    <view class="integral-task-item" v-if="item.type != 6" v-for="(item, index) in taskList" :key="index">
                        <view class="integral-task-item-left">
                            <image style="width: 60rpx; height: 60rpx; margin-right: 12rpx" :src="item.icon"></image>
                            <view class="integral-task-item-content">
                                <view class="integral-task-item-content-top">
                                    {{ item.name }}
                                    <image style="width: 40rpx; height: 40rpx; margin: 0 10rpx" src="/static/pages/img/index/integral_icon.png"></image>
                                    <text v-if="item.type == 2" style="font-size: 20rpx">({{ item.description }})</text>
                                    <text v-else>+{{ item.score }}</text>
                                </view>
                                <view class="integral-task-item-content-bottom">
                                    <view class="integral-task-item-content-bottom-process" v-if="item.limit != 0">
                                        <view class="integral-task-item-content-bottom-process-state" :style="'width:' + (item.announce / item.limit) * 100 + '%'"></view>
                                    </view>
                                    <text v-if="item.limit != 0">（{{ item.announce > item.limit ? item.limit : item.announce }}/{{ item.limit }}）</text>
                                    <!-- <text wx:if="{{item.limit==0}}">（已消费xxx元，获得xx积分）</text> -->
                                    <text v-if="item.limit == 0">可累计</text>
                                </view>
                            </view>
                        </view>

                        <view class="integralTask_content_item_right_btn" v-if="!(item.type == 5 || item.type == 4)" @tap="toFinishTask" :data-url="item.jump">
                            {{ item.buttonName }}
                        </view>

                        <button open-type="share" :data-url="item.jump" v-if="item.announce < item.limit || item.limit == 0" class="integralTask_content_item_right_btn">
                            {{ item.buttonName }}
                        </button>

                        <view class="integralTask_content_item_right_btn" style="background: #999" v-else>已完成</view>
                    </view>
                </view>
            </view>

            <!-- 积分可兑换列表 -->
            <view class="exchange-list-cintainer">
                <view class="exchange-list-top">
                    <view class="exchange-list-top-title">积分兑换</view>
                    <view class="exchange-list-top-text">积分不停,好礼不断</view>
                </view>
                <!-- 商品列表 -->
                <view class="exchange-goods-list">
                    <view class="exchange-goods-item" @tap="showDetail" :data-idx="index" v-for="(item, index) in exchangeGoodsList" :key="index">
                        <image class="exchange-goods-img" :src="item.imageUuid" mode="aspectFill"></image>

                        <view class="exchange-goods-content">
                            <view class="goods-name">{{ item.presentName }}</view>
                            <view class="goods-price-box">
                                {{ item.score }}积分
                                <view class="goods-type">
                                    <view class="goods-type-item" v-if="item.disbursement == 1 || item.disbursement == 3">到店领取</view>
                                    <view class="goods-type-item" v-if="item.disbursement == 2 || item.disbursement == 3" style="margin-left: 10rpx">商家配送</view>
                                </view>
                            </view>
                            <view class="goods-bottom-box">
                                <view
                                    class="goods-bottom-btn"
                                    @tap.stop.prevent="showSelectTypeFun"
                                    :data-idx="index"
                                    :style="'background:' + (item.rest > 0 && userintegral >= item.score ? '' : '#999')"
                                >
                                    {{ userintegral < item.score ? '积分不足' : item.rest == 0 ? '库存不足' : '立即兑换' }}
                                </view>
                                <view class="goods-bottom-stock">剩余{{ item.rest }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 完成任务后弹框 -->
        <taskPop :showTaskPop="showTaskPop" :text="taskText" :marchantId="marchantId" style="position: fixed; top: 0; left: 0; right: 0; z-index: 9999"></taskPop>
        <!-- 显示商品详情弹框 -->
        <van-popup :show="showGoodsDetail" closeable position="bottom" @close="closeDetail" close-icon="close" round>
            <view class="goods-detail-container">
                <image :src="nowGoodsDetail.imageUuid" class="goods-detail-img" mode="widthFix"></image>
                <view class="goods-detail-content">
                    <view class="goods-detail-top">
                        <view class="goods-detail-price">
                            <image class="goods-detail-icon" src="/static/pages/img/index/goods_price_icon.png" />
                            {{ nowGoodsDetail.score }}积分
                        </view>
                        <view class="goods-detail-label">剩余{{ nowGoodsDetail.rest }}</view>
                        <view class="goods-detail-label" v-if="nowGoodsDetail.disbursement == 1 || nowGoodsDetail.disbursement == 3">到店领取</view>
                        <view class="goods-detail-label" v-if="nowGoodsDetail.disbursement == 2 || nowGoodsDetail.disbursement == 3">商家配送</view>
                    </view>
                    <view class="goods-detail-name">{{ nowGoodsDetail.presentName }}</view>
                    <view class="goods-detail-text">{{ nowGoodsDetail.descriptions }}</view>
                    <view
                        class="goods-detail-btn"
                        @tap.stop.prevent="showSelectTypeFun"
                        :style="'background:' + (nowGoodsDetail.rest > 0 && userintegral >= nowGoodsDetail.score ? '' : '#999')"
                    >
                        {{ userintegral < nowGoodsDetail.score ? '积分不足' : nowGoodsDetail.rest == 0 ? '库存不足' : '立即兑换' }}
                    </view>
                </view>
            </view>
        </van-popup>
        <!-- 显示配送方式弹框 -->
        <van-popup :show="showSelectType" closeable position="bottom" @close="closeType" close-icon="close" round>
            <view class="selectType">
                <view class="selectType_title" v-if="!hideTabs">
                    <block v-for="(item, index) in typeList" :key="index">
                        <view @tap="changeType" :data-index="index" :class="'selectType_title_item ' + (selectType == index ? item.class : '')">{{ item.name }}</view>
                    </block>
                </view>
                <view class="no-select-type" v-if="hideTabs">{{ selectType ? '商家配送' : '门店团购' }}</view>
                <view class="selectType_content">
                    <view class="selectType_content_item" v-if="selectType == 0">
                        <view class="selectType_content_item_label">到店时间</view>
                        ：
                        <view class="selectType_content_item_box" @tap="showTimeSelectFun">
                            <view class="selectType_content_item_box_input">
                                <view>{{ selectedTime ? selectedTime : '请选择到店领取时间' }}</view>
                                <image src="/static/pages/img/index/arrow_right.png" style="width: 24rpx; height: 48rpx"></image>
                            </view>
                        </view>
                    </view>
                    <view class="selectType_content_item">
                        <view class="selectType_content_item_label">联系方式</view>
                        ：
                        <view class="selectType_content_item_box" @tap="toSelectAddress">
                            <view class="selectType_contemt_item_box_item" style="border-bottom: 2rpx solid #f7f7f7">
                                联系人：{{ selectType == 0 ? toStoreContactMan : logisticsContactMan }}
                                <text style="margin-left: 20rpx">{{ selectType == 0 ? toStoreTel : logisticsTel }}</text>
                            </view>
                            <view class="selectType_contemt_item_box_item">地址：{{ selectType == 0 ? toStoreAddress : logisticsAddress }}</view>
                        </view>
                    </view>
                    <view class="selectType_content_item">
                        <view class="selectType_content_item_label">留言</view>
                        ：
                        <view class="selectType_content_item_box_textarea">
                            <textarea :value="messageValue" @input="getMessageValue" maxlength="50"></textarea>
                            <view>{{ messageValue.length < 50 ? messageValue.length : 50 }}/50</view>
                        </view>
                    </view>
                    <view @tap="exchangeIn" class="selectType_btn">提交</view>
                </view>
            </view>
        </van-popup>
        <!-- 选择到店时间弹框 -->
        <!-- 时间选择 -->
        <van-popup :show="showTimeSelect" @close="closeTimeSelect" position="bottom">
            <van-datetime-picker type="date" title="请选择年月日" @confirm="onInput" @cancel="closeTimeSelect" :min-date="minDate" :max-date="maxDate" :formatter="formatter" />
        </van-popup>
        <!-- 活动倒计时 -->
        <van-popup :show="isOverTime" round position="center">
            <view class="over-activity-container" style="background-image: url(https://xssj.letterbook.cn/applet/images/integral_overtime_bg.png)">
                <view class="overtime-title">活动结束</view>
                <view class="overtime-content">请耐心等待商家发布下一轮活动</view>
                <view class="overtime-btn" @tap="closePages">确认</view>
            </view>
        </van-popup>
        <!-- 签到成功 -->
        <van-overlay :show="isFinishSign" z-index="999">
            <view
                class="sign-in-container"
                style="
                    background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E7%AD%BE%E5%88%B0%E9%80%9A%E7%9F%A5.png);
                "
            >
                <view class="sign-in-container-btn" @tap="closeSign">我知道啦！</view>
            </view>
        </van-overlay>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanOverlay from './@vant/weapp/overlay/index';
import taskPop from '@/pages/Index/integral/components/integralTask/integralTask';
// import vanDatetimePicker from './@vant/weapp/datetime-picker/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import storeClose from '@/pages/Component/storeClose/index';
// pages/Index/integral/integral.js
const app = getApp();

const time = require('../../../utils/util');

export default {
    components: {
        // vanPopup,
        // vanOverlay,
        taskPop,
        // vanDatetimePicker,
        // vanCountDown,
        storeClose
    },
    data() {
        return {
            toolList: [
                // 工具列表
                {
                    text: '总积分',
                    img: '/static/pages/img/index/integral1.png',
                    url: '/pages/Index/integral/myIntegral/myIntegral'
                },
                {
                    text: '进入店铺',
                    img: '/static/pages/img/index/integral2.png',
                    url: '/pages/shopHome/home/home'
                },
                {
                    text: '兑换记录',
                    img: '/static/pages/img/index/integral3.png',
                    url: '/pages/Index/integral/integralRecord/integralRecord'
                }
            ],

            taskList: [],

            // 任务列表
            uniqueId: '',

            // 用户标识
            isClose: false,

            // 是否关店
            showGoodsDetail: false,

            // 是否显示商品详情
            showSelectType: false,

            // 是否显示配送方式
            isFinishSign: false,

            // 是否显示签到成功
            isSubmit: false,

            // 是否提交
            isFirst: true,

            // 是否第一次进入
            selectType: 0,

            // 选择配送的方式
            typeList: [
                // 配送方式列表
                {
                    name: '到店自取',
                    class: 'selectType_title_item_active1'
                },
                {
                    name: '商家配送',
                    class: 'selectType_title_item_active2'
                }
            ],

            showTaskPop: false,

            // 任务弹框
            taskText: '你已完成分享积分任务获取1积分',

            // 任务文字
            marchantId: 0,

            // 商家id
            exchangeGoodsList: [],

            // 可兑换商品列表
            nowGoodsDetail: {
                imageUuid: '',
                rest: '',
                disbursement: 0,
                presentName: '',
                descriptions: '',
                score: 0
            },

            //当前商品详情
            userintegral: 0,

            //用户积分
            toStoreContactMan: '',

            // 到店的联系人
            toStoreAddress: '',

            // 到店的地址
            toStoreTel: '',

            // 到店的联系电话
            logisticsContactMan: '',

            // 配送的联系人
            logisticsAddress: '',

            // 配送的地址
            logisticsTel: '',

            // 配送的联系电话
            messageValue: '',

            // 留言
            hideTabs: true,

            // 是否有tab类型选择
            weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],

            minDate: new Date().getTime(),

            // 可选最小时间
            maxDate: new Date().getTime() + 6 * 24 * 60 * 60 * 1000,

            // 可选最大时间
            showTimeSelect: false,

            // 选择时间弹框
            currentDate: '',

            // 当前选择框时间中间变量
            selectedTime: '',

            // 当前所选时间
            community: 0,

            // 是否开启订阅通知
            haveSignIn: false,

            // 是否有签到
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`;
                } else if (type === 'day') {
                    return `${value}日`;
                }

                return value;
            },

            timeData: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            },

            signData: {
                countDownTime: '',
                signinUserList: [],
                signinList: []
            },

            nowDay: -1,

            //今天的时间
            isOverTime: false,

            // 活动倒计时弹框
            logoPic: '',

            // 商家头像
            getShopInfo: {},

            nickName: '',
            shopInfo: '',
            isSignin: 0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        app.globalData.options = options;
        app.globalData.userLogin().then(async (res) => {
            if (options.scene) {
                const scene = decodeURIComponent(options.scene);
                await this.getCodeParams(scene);
            } else {
                if (options.uniqueId) {
                    this.setData({
                        uniqueId: options.uniqueId
                    });
                }

                this.setData({
                    marchantId: options.marchantId
                });
            }

            console.log(this.marchantId);
            var that = this; //查看是否授权

            uni.getSetting({
                success: function (res) {
                    if (uni.getStorageSync('wx_userinfo_key')) {
                        that.getIntegralInfo();
                        that.getSignData();
                        that.getUserIntegral();
                        that.getTaskList();

                        if (that.uniqueId) {
                            that.getShareState();
                        }
                    } else {
                        uni.navigateTo({
                            url: '/pages/shopHome/home/home'
                        });
                    }
                }
            });
            let nowDay = new Date().getDay();

            if (nowDay == 0) {
                nowDay = 7;
            }

            this.setData({
                nowDay: nowDay,
                isFirst: false
            });
            this.getShopInfoFun();
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
        if (!this.isFirst) {
            this.getUserIntegral();
            this.getTaskList();
            this.getIntegralInfo();
        }
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
     */
    onShareAppMessage: function (e) {
        let uniqueId = uni.getStorageSync('uniqueId1');
        console.log(uniqueId, '444444');

        if (e.target) {
            let setInfo = app.globalData.setInfo;
            return {
                title: this.shopInfo.appletInfo.nickName + '做任务赚积分兑商品',
                path: e.target.dataset.url + '?marchantId=' + this.marchantId + '&uniqueId=' + uniqueId,
                imageUrl: e.target.dataset.url == '/pages/shopHome/home/home' ? setInfo.headImage : 'https://xssj.letterbook.cn/applet/images/integral_share_img.png'
            };
        }

        return {
            title: this.nickName,
            path: '/pages/Index/integral/integral?marchantId=' + this.marchantId + '&uniqueId=' + uniqueId,
            imageUrl: 'https://xssj.letterbook.cn/applet/images/integral_share_img.png'
        };
    },
    methods: {
        //是否从小程序码进来
        getCodeParams(id) {
            let data = {
                id: id
            };
            let that = this;
            return app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        marchantId: JSON.parse(res.data.data.scene).id
                    });
                }
            });
        },

        //  查询用户积分
        getUserIntegral() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/integral/queryInte', data).then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data.data.merchantInfo.telephone, '用户到店自取联系电话');
                    this.setData({
                        userintegral: res.data.data.score,
                        toStoreContactMan: res.data.data.merchantInfo.legalPerson || res.data.data.merchantInfo.nickName,
                        logoPic: res.data.data.merchantInfo.logoPic,
                        toStoreTel: res.data.data.merchantInfo.telephone,
                        community: res.data.data.merchantInfo.community,
                        nickName: res.data.data.merchantInfo.nickName,
                        toStoreAddress: res.data.data.merchantInfo.entirelyAddress
                    });
                } else if (res.data.code == 338) {
                    this.setData({
                        isClose: true
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 获取任务
        getTaskList() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/integral/queryMyTaskList', data).then((res) => {
                console.log(res, '我的任务');
                res.data.data.forEach((item) => {
                    if (item.type == 6) {
                        this.setData({
                            haveSignIn: true
                        });
                    }
                });
                let TaskList = res.data.data;
                TaskList.map((res) => {
                    if (res.jump == '/pages/Index/Index') {
                        res.jump = '/pages/shopHome/home/home';
                    }
                });
                this.setData({
                    taskList: res.data.data
                });
            });
        },

        // 查询积分商品信息
        getIntegralInfo() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/integral/queryPrize', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        exchangeGoodsList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 显示商品详情弹框
        showDetail(e) {
            let idx = e.currentTarget.dataset.idx;
            this.setData({
                showGoodsDetail: true,
                nowGoodsDetail: this.exchangeGoodsList[idx]
            });
        },

        // 关闭商品详情弹框
        closeDetail() {
            this.setData({
                showGoodsDetail: false
            });
        },

        // 分享转发
        getShareState() {
            let data = {
                marchantId: this.marchantId,
                uniqueId: this.uniqueId,
                type: 5
            };
            app.globalData.sjrequest('/transiter/onTransmit', data).then((res) => {});
        },

        // 显示方式选择
        showSelectTypeFun(e) {
            let idx = e.currentTarget.dataset.idx;

            if (idx >= 0) {
                this.setData({
                    nowGoodsDetail: this.exchangeGoodsList[idx]
                });
            }

            if (this.nowGoodsDetail.score > this.userintegral) {
                uni.showToast({
                    title: '您的积分不足',
                    icon: 'none'
                });
                return;
            }

            if (this.nowGoodsDetail.rest == 0) {
                uni.showToast({
                    title: '库存不足',
                    icon: 'none'
                });
                return;
            }

            if (this.nowGoodsDetail.disbursement == 3) {
                //两种都有
                this.setData({
                    hideTabs: false,
                    selectType: 0
                });
            } else {
                // 只有一种
                this.setData({
                    hideTabs: true,
                    selectType: this.nowGoodsDetail.disbursement - 1
                });
            }

            this.setData({
                showSelectType: true,
                showGoodsDetail: false
            });
        },

        // 显示方式选择
        closeType() {
            this.setData({
                showSelectType: false
            });
        },

        // 更改配送方式
        changeType(e) {
            this.setData({
                selectType: e.currentTarget.dataset.index
            });
        },

        // 选择配送地址
        toSelectAddress() {
            if (this.selectType == 1) {
                app.globalData.comefrom = 'integral';
                uni.navigateTo({
                    url: '/pages/Address/AddressList/AddressList'
                });
            }
        },

        // 获得留言信息
        getMessageValue(e) {
            this.setData({
                messageValue: e.detail.value.trim()
            });
        },

        //  选择时间弹框
        showTimeSelectFun() {
            this.setData({
                showTimeSelect: true,
                currentDate: new Date(this.currentDate).getTime()
            });
        },

        //  关闭选择时间弹框
        closeTimeSelect() {
            this.setData({
                showTimeSelect: false
            });
        },

        onInput(event) {
            // 确认时间
            this.setData({
                currentDate: this.formatDate(event.detail),
                selectedTime: this.formatDate(event.detail)
            });
            this.closeTimeSelect();
        },

        // 兑换
        exchangeIn() {
            let that = this;
            uni.showLoading({
                title: '兑换中',
                mask: true
            });

            if (!this.isSubmit) {
                this.setData({
                    isSubmit: !this.isSubmit
                });
                let data = {
                    marchantId: this.marchantId,
                    presentId: this.nowGoodsDetail.id,
                    getWay: this.selectType + 1,
                    message: this.messageValue
                };

                if (this.selectType == 0) {
                    // 到店
                    if (!this.selectedTime) {
                        uni.showToast({
                            title: '请选择到店时间',
                            icon: 'none'
                        });
                        this.setData({
                            isSubmit: false
                        });
                        return;
                    }

                    data.address = this.toStoreAddress;
                    data.contacts = this.toStoreContactMan;
                    data.contactsWay = this.toStoreTel;
                    data.arriveTime = this.selectedTime;
                }

                if (this.selectType == 1) {
                    //  配送
                    if (!this.logisticsAddress) {
                        uni.showToast({
                            title: '请选择联系方式',
                            icon: 'none'
                        });
                        this.setData({
                            isSubmit: false
                        });
                        return;
                    }

                    data.address = this.logisticsAddress;
                    data.contacts = this.logisticsContactMan;
                    data.contactsWay = this.logisticsTel;
                }

                uni.requestSubscribeMessage({
                    tmplIds: [app.globalData.sj_shipments],
                    complete: function () {
                        return app.globalData.sjrequest('/integral/exchangeIn', data).then((res) => {
                            if (res.data.code == 200) {
                                uni.showToast({
                                    title: '兑换成功'
                                });
                                that.setData({
                                    showSelectType: false
                                });
                                setTimeout((res) => {
                                    that.setData({
                                        isSubmit: false
                                    });
                                    uni.navigateTo({
                                        url: `/pages/Index/integral/integralRecord/integralRecord?marchantId=${that.marchantId}`
                                    });
                                }, 1000);
                            } else {
                                that.setData({
                                    isSubmit: false
                                });
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                });
                            }
                        });
                    }
                });
            }
        },

        formatDate(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return YY + MM + DD;
        },

        // 完成任务
        toFinishTask(e) {
            let url = e.currentTarget.dataset.url;
            uni.navigateTo({
                url: url + '?marchantId=' + this.marchantId
            });
        },

        changeTime(e) {
            this.setData({
                timeData: e.detail
            });
        },

        // 签到
        signIn() {
            let that = this;
            let data = {
                marchantId: this.marchantId,
                type: 1
            };
            app.globalData.sjrequest('/integral/operateSignin', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        isFinishSign: true
                    });
                    that.getUserIntegral();
                    that.getSignData();
                }
            });
        },

        // 查询签到接口
        getSignData() {
            let data = {
                marchantId: this.marchantId,
                type: 2
            };
            app.globalData.sjrequest('/integral/operateSignin', data).then((res) => {
                console.log(res, '查询签到数据');

                if (res.data.code == 200) {
                    let time1 = time.formatTimeSec(res.data.data.countDownTime);
                    console.log(time1, '时间');
                    res.data.data.countDownTime = new Date(time1.replace(/-/g, '/')).getTime() - new Date().getTime();
                    this.setData({
                        signData: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 倒计时结束
        overActivity() {
            this.setData({
                isOverTime: true
            });
        },

        // 关闭签到页面
        closeSign() {
            this.setData({
                isFinishSign: false
            });
        },

        // 关闭页面
        closePages() {
            wx;
            uni.redirectTo({
                url: '/pages/shopHome/home/home?marchantId=' + this.marchantId
            });
        },

        getShopInfoFun() {
            let ids = this.marchantId;
            app.globalData
                .sjrequest('/marchant/subjectInfo', {
                    merchantId: ids
                })
                .then((res) => {
                    this.setData({
                        shopInfo: res.data.data
                    });
                    console.log('res:', res);
                });
        }
    }
};
</script>
<style>
/* pages/Index/integral/integral.wxss */
.integral-container {
    width: 100%;
    min-height: 100vh;
    background-color: #f7f7f7;
    position: relative;
}
.integral-top {
    width: 100%;
    display: flex;
    background-color: #fff;
}
.integral-top-img {
    width: 100%;
    height: 400rpx;
}
/* .integral-tool-list-box{
  width:100%;
  padding: 16rpx 20rpx;
  box-sizing: border-box;
  position: sticky;
  z-index: 88;
  top: 0;
  left: 0;
  /* background: linear-gradient(90deg, #7261FF 0%, #8321F0 100%);
} */
.integral-tool-list {
    width: 100%;
    height: 148rpx;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 16rpx;
}
.integral-tool-item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.integral-tool-item-img {
    width: 60rpx;
    height: 60rpx;
    position: relative;
}
.integral-rule {
    width: 150rpx;
    height: 48rpx;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 40rpx 0rpx 0rpx 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #735dfe;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 82rpx;
    right: 0;
    z-index: 88;
}
.integral-tool-item-text {
    height: 40rpx;
    font-size: 28rpx;
    margin-top: 8rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #323232;
}
.integral-change-box {
    width: 100%;
    padding: 0 20rpx 20rpx;
    box-sizing: border-box;
    /* background: linear-gradient(90deg, #7261FF 0%, #8321F0 100%); */
    border-radius: 0rpx 0rpx 20rpx 20rpx;
}
/* 积分内容的标题样式 */
.integral-content-container {
    width: 100%;
    background: #fff;
    padding: 16rpx 20rpx;
    margin-bottom: 12rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
}
/* .integral-content-container:last-child{
  border-radius: 0 0 20rpx 20rpx;
  position:relative
} */
.integral-title-container {
    width: fit-content;
    display: flex;
    align-items: center;
    white-space: nowrap;
}
.integral-title-left-box {
    width: 8rpx;
    height: 28rpx;
    background: #fbe945;
    border-radius: 2rpx;
    margin-right: 16rpx;
}
.integral-title-text {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333;
}
/* 活动倒计时 */
.activity-container {
    display: flex;
    align-items: center;
}
.activity-count-down {
    width: 0;
    flex: 1;
    height: 40rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    margin-left: 20rpx;
}
.van-count-down {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 24rpx !important;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff0000 !important;
}
.activity-count-down-text {
    width: fit-content;
    min-width: 30rpx;
    height: 40rpx;
    padding: 0 6rpx;
    border-radius: 6rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff0000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 4rpx;
}
/* 当前参与人数 */
.integral-member-list {
    width: fit-content;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}
.integral-member-img {
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
    margin-right: 8rpx;
}
/* 七天签到领取积分 */
.integral-sign-in-btn {
    width: 112rpx;
    height: 40rpx;
    background: #7755fd;
    border-radius: 20rpx;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.integral-signed-in-btn {
    background: #999999;
    color: #ffffff;
}
.integral-sign-in-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 38rpx 0 14rpx;
}
.integral-sign-in-item-box {
    flex: 1;
    display: flex;
    align-items: center;
}
.integral-sign-in-item {
    width: 72rpx;
    height: 120rpx;
    background-color: #fff;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 2rpx solid #784afa;
    box-sizing: border-box;
    border-radius: 8rpx;
    position: relative;
    overflow: hidden;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.integral-sign-in-item-image {
    width: 40rpx;
    height: 40rpx;
    margin: 8rpx 0 4rpx;
}
.integral-sign-in-item-status {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #000000;
    margin-top: 8rpx;
}
.integral-sign-in-add {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #000000;
}
.integral-sign-in-progress {
    width: 28rpx;
    height: 10rpx;
    background-color: #efedec;
}
.integral-sign-in-progress-in {
    height: 100%;
    background: #7261ff;
    /* border-radius: 8rpx; */
}
/* 做任务赚积分 */
.integral-task-container {
    width: 100%;
    background-color: #fff;
    border-radius: 0 0 20rpx 20rpx;
    overflow: hidden;
}
.integral-task-top {
    width: 100%;
    height: 92rpx;
    background-color: #fff;
    border-radius: 0rpx 0rpx 16rpx 16rpx;
    display: flex;
    padding: 0 20rpx;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    border-top: 2rpx solid #f4f4f4;
}
/* 任务 */
.integral-task-item {
    width: 100%;
    height: 110rpx;
    background: #fff;
    margin-top: 8rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-top: 2rpx solid #f4f4f4;
}
.integral-task-item-left {
    flex: 1;
    display: flex;
    align-items: center;
}
.integral-task-item-content {
    width: fit-content;
    height: 76rpx;
}
.integral-task-item-content-top {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
}
.integral-task-item-content-bottom {
    height: 32rpx;
    line-height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
    display: flex;
    align-items: center;
}
.integral-task-item-content-bottom-process {
    width: 200rpx;
    height: 12rpx;
    background: #efedec;
    border-radius: 8rpx;
    margin-right: 10rpx;
}
.integral-task-item-content-bottom-process-state {
    height: 12rpx;
    background: #7755fd;
    border-radius: 8rpx;
}
.integralTask_content_item_right_btn {
    width: 108rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: #7755fd;
    border-radius: 30rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #fff;
    font-weight: bold;
}
/* 积分可兑换列表 */
.exchange-list-cintainer {
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
}
.exchange-list-top {
    width: 100%;
    height: 62rpx;
    background: linear-gradient(273deg, #8324f1 0%, #745dfe 100%);
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    display: flex;
    align-items: center;
}
.exchange-list-top-title {
    height: 36rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #ffffff;
    margin-left: 20rpx;
    margin-right: 24rpx;
    padding-right: 24rpx;
    border-right: 2rpx solid #fff;
}
.exchange-list-top-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
/* 商品列表 */
.exchange-goods-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.exchange-goods-item {
    width: 344rpx;
    height: 508rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx #f7f7f7;
    border-radius: 20rpx;
    margin-top: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
}
.exchange-goods-list .exchange-goods-item:nth-child(1),
.exchange-goods-list .exchange-goods-item:nth-child(2) {
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    margin-top: 0rpx;
}
.exchange-goods-img {
    width: 100%;
    height: 304rpx;
    border-radius: 20rpx;
}
.exchange-goods-content {
    width: 100%;
    height: 164rpx;
    padding-top: 16rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.goods-name {
    width: 100%;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.goods-price-box {
    width: 100%;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff0000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
}
.goods-type {
    width: 162rpx;
    height: 30rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.goods-type-item {
    width: 76rpx;
    height: 30rpx;
    background: linear-gradient(180deg, #8324f1 0%, #745dfe 100%);
    border-radius: 4rpx;
    font-size: 18rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.goods-bottom-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.goods-bottom-btn {
    flex: 1;
    height: 44rpx;
    background: linear-gradient(180deg, #8324f1 0%, #745dfe 100%);
    border-radius: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.goods-bottom-stock {
    width: fit-content;
    height: 32rpx;
    padding: 2rpx 10rpx;
    background: linear-gradient(180deg, #8324f1 0%, #745dfe 100%);
    border-radius: 4rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;
    margin-left: 16rpx;
}
/* 显示商品详情弹框 */
.goods-detail-container {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}
.goods-detail-img {
    width: 100%;
    /* height: 460rpx; */
}
.goods-detail-content {
    width: 100%;
    padding: 10rpx 28rpx 22rpx 20rpx;
    box-sizing: border-box;
}
.goods-detail-top {
    width: 100%;
    display: flex;
    align-items: flex-end;
}
.goods-detail-price {
    height: 50rpx;
    display: flex;
    align-items: center;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #ff0000;
}
.goods-detail-icon {
    width: 36rpx;
    height: 36rpx;
    margin-right: 6rpx;
}
.goods-detail-label {
    width: fit-content;
    height: 32rpx;
    background: #fddccd;
    border-radius: 4rpx;
    padding: 0 2rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fe4a0b;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16rpx;
    margin-bottom: 8rpx;
}
.goods-detail-name {
    max-height: 80rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin: 16rpx 0 8rpx;
}
.goods-detail-text {
    width: 500rpx;
    max-height: 56rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.goods-detail-btn {
    width: 250rpx;
    height: 52rpx;
    background: linear-gradient(180deg, #8324f1 0%, #745dfe 100%);
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 36rpx auto 0;
}
/* 配送方式弹框 */
.selectType {
    padding-top: 80rpx;
    height: 674rpx;
    box-sizing: border-box;
}
.no-select-type {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
    background: #e23e3e;
}
.selectType_title {
    display: flex;
    width: 100%;
    height: 60rpx;
    font-size: 24rpx;
    font-weight: bold;
    text-align: center;
    line-height: 60rpx;
    color: #ffffff;
    background: #999999;
}
.selectType_title_item {
    width: 100%;
}
.selectType_title_item_active1,
.selectType_title_item_active2 {
    background: #e23e3e;
    position: relative;
}
.selectType_title_item_active1::after,
.selectType_title_item_active2::after {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
}
.selectType_title_item_active1::after {
    right: 0;
    border-top: 60rpx solid #e23e3e;
    border-right: 44rpx solid transparent;
    transform: translate(100%);
}
.selectType_title_item_active2::after {
    left: 0;
    border-bottom: 60rpx solid #e23e3e;
    border-left: 44rpx solid transparent;
    transform: translate(-100%);
}
.selectType_content {
    padding: 0 20rpx;
}
.selectType_content_item {
    margin-top: 20rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
    display: flex;
}
.selectType_content_item_label {
    width: 140rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: justify;
    text-align-last: justify;
}
.selectType_content_item_label:after {
    content: '';
    display: inline-block;
    width: 100%;
}
.selectType_content_item_box {
    color: #999999;
    font-size: 24rpx;
    width: 424rpx;
    border: 2rpx solid #e4e4e4;
    border-radius: 8rpx;
    line-height: 50rpx;
    box-sizing: border-box;
}
.selectType_content_item_box_input {
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
.selectType_content_item_box_input image {
    width: 24rpx;
    height: 48rpx;
}
.selectType_contemt_item_box_item {
    padding-left: 20rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: 100rpx;
}
.selectType_content_item_box_textarea {
    position: relative;
}
.selectType_content_item_box_textarea textarea {
    width: 424rpx;
    height: 140rpx;
    background: #e4e4e4;
    color: #666;
    font-size: 24rpx;
    border-radius: 8rpx;
    padding: 10rpx 20rpx;
    line-height: 30rpx;
    box-sizing: border-box;
}
.selectType_content_item_box_textarea view {
    position: absolute;
    right: 8rpx;
    bottom: 8rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #666666;
}
.selectType_btn {
    width: 424rpx;
    height: 68rpx;
    background: #e23e3e;
    border-radius: 34rpx;
    font-size: 32rpx;
    font-weight: bold;
    line-height: 68rpx;
    color: #ffffff;
    text-align: center;
    margin: 28rpx auto 0;
}
/* 活动倒计时 */
.over-activity-container {
    width: 628rpx;
    height: 628rpx;
    text-align: center;
    background-size: 628rpx 628rpx;
    background-repeat: no-repeat;
    padding: 70rpx 0 46rpx;
    box-sizing: border-box;
    position: relative;
}
.overtime-title {
    height: 84rpx;
    font-size: 60rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 84rpx;
    color: #333333;
}
.overtime-content {
    height: 36rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #666666;
    margin-top: 22rpx;
}
.overtime-btn {
    width: 440rpx;
    height: 68rpx;
    background: #7c3df7;
    box-shadow: 0rpx 6rpx 12rpx rgba(247, 247, 247, 0.16);
    border-radius: 34rpx;
    font-size: 48rpx;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 46rpx;
    left: 50%;
    transform: translateX(-50%);
}
/* 签到成功 */
.sign-in-container {
    width: 706rpx;
    height: 712rpx;
    background-size: 706rpx 712rpx;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}
.sign-in-container-btn {
    width: 340rpx;
    height: 90rpx;
    border-radius: 90rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 162rpx;
    left: 176rpx;
}
</style>
