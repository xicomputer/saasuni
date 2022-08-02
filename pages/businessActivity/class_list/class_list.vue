<template>
    <view>
        <view class="activity-list-container me-fx-col">
            <block v-for="(temp, ti) in dataList" :key="temp.ti">
                <view class="class-item-top-box" v-if="temp.activityList.list.length">
                    <view class="me-fx-row me-fx-c-c">
                        <text class="class-type-name">{{ temp.classifyName }}</text>
                        <text class="view-more" @tap="toMoreList" :data-classid="temp.id" :data-classname="temp.classifyName">查看更多></text>
                    </view>
                </view>

                <block v-for="(item, index) in temp.activityList.list" :key="index">
                    <view :class="'activity-list-info me-fx-col activity-' + item.activityId" @tap="toDetail" :data-atyid="item.activityId">
                        <view class="activity-top">
                            <image mode="aspectFill" class="activity-img" :src="item.imageUrl"></image>
                            <view class="me-fx-row me-fx-sb-c activity-num down-order-num" v-if="item.activityJoinNumberTotal">
                                <text class="triangle-box"></text>
                                <text class="btn_last">已有{{ item.activityJoinNumberTotal }}人下单</text>
                            </view>
                            <view class="me-fx-row me-fx-sb-c activity-num" v-if="item.residueNumber != -1">
                                <text class="triangle-box"></text>
                                <text class="btn_last">{{ '剩余名额：' + (item.residueNumber || 0) }}</text>
                            </view>
                        </view>
                        <view class="activity-foot">
                            <view style="padding: 10rpx; box-sizing: border-box">
                                <view class="me-fx-row me-fx-sb-c foot-line-item">
                                    <text class="me-full-text activity-shop-name">活动名称：{{ item.templateName }}</text>
                                    <van-count-down
                                        :time="item.diffTimes"
                                        @change="timeChange($event, { tindex: ti, index })"
                                        @finish="finishFun($event, { tindex: ti, index })"
                                        :auto-start="true"
                                        :use-slot="true"
                                        :data-tindex="ti"
                                        :data-index="index"
                                    >
                                        <view class="me-fx-row me-fx-start-c times-text">
                                            <text>{{ item.state == 1 ? '距开始' : '距结束' }}：</text>
                                            <view class="time-num" v-if="item.times.days">{{ item.times.days || 0 }}</view>
                                            <text v-if="item.times.days">天</text>
                                            <view class="time-num">{{ item.times.hours }}</view>
                                            时
                                            <view class="time-num">{{ item.times.minutes }}</view>
                                            分
                                            <view class="time-num">{{ item.times.seconds }}</view>
                                            秒
                                        </view>
                                    </van-count-down>
                                </view>
                                <view class="me-fx-row me-fx-sb-c foot-line-item">
                                    <text class="me-full-text activity-goods-name">{{ item.commodityName }}</text>
                                    <view class="me-fx-row me-fx-c-end price-box">
                                        <text>活动价:¥</text>
                                        <text class="price-num">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </view>
                            <view v-for="(temp, ti) in item.meJoinInfo" :key="temp.ti">
                                <view :class="'me-fx-row me-fx-sb-c msg-line-box ' + (temp.status == 2 || temp.status == 3 ? 'complete' : 'not-complete')">
                                    <text v-if="temp.status == 2 || temp.status == 3">
                                        您已完成{{ temp.alreadyOrder }}单任务，您购买商品已退还金额({{ item.meJoinInfo.income }}元)
                                    </text>
                                    <text v-else>已推{{ temp.alreadyOrder }}单，商品金额退还{{ temp.income }} 只差{{ temp.residueOrder }}单赚取商品</text>
                                    <text class="view-detail" :data-item="temp" @tap.stop.prevent="jumpJoinDetail">查看详情</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </block>
            <view class="me-fx-row me-fx-c-c place-empty" v-if="!dataList.length">
                <text>暂无数据</text>
            </view>
        </view>

        <!-- 授权组件 -->
        <!-- <auth-get-info></auth-get-info> -->
    </view>
</template>

<script>
// import vanTab from './@vant/weapp/tab/index';
// import vanTabs from './@vant/weapp/tabs/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import countDown from '../components/countdown/countdown';
import authGetInfo from '../../Component/auth-get-info/auth-get-info';
let app = getApp();
export default {
    components: {
        // vanTab,
        // vanTabs,
        // vanCountDown,
        countDown,
        authGetInfo
    },
    data() {
        return {
            appid: '',

            //小程序appid
            merchantId: '',

            //商家id
            dataList: [],

            pageSize: 10,
            pageNum: 1,

            temp: {
                ti: '',

                activityList: {
                    list: []
                },

                classifyName: '',
                id: '',
                status: 0,
                alreadyOrder: '',
                income: '',
                residueOrder: ''
            },

            ti: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var activityId = options.activityId;
        var merchantId = options.merchantId;

        if (activityId) {
            this.activityId = activityId;
        }

        if (merchantId) {
            this.merchantId = merchantId;
            this.setData({
                merchantId: merchantId
            });
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var merchantId = uni.getStorageSync('merchantId');

        if (merchantId) {
            this.merchantId = merchantId;
            this.setData({
                merchantId: merchantId
            });
        }

        uni.getStorage({
            //获取小程序appid
            key: 'appid',
            success: (res) => {
                this.setData({
                    appid: res.data
                });
            }
        });
        this.getClassList();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (this.merchantId) {
            this.getClassList();
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
    onPullDownRefresh: function () {
        this.getClassList();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /* 分享朋友 */
    onShareAppMessage() {},
    /* 分享朋友圈 */
    onShareTimeline() {},
    methods: {
        toDetail(e) {
            var activityId = e.currentTarget.dataset.atyid;
            uni.navigateTo({
                url: '/pages/businessActivity/activity_detail/activity_detail?activityid=' + activityId
            });
        },

        toMoreList(e) {
            var classId = e.currentTarget.dataset.classid;
            var classname = e.currentTarget.dataset.classname;
            var qurey = `classId=${classId}&classname=${classname}`;
            uni.navigateTo({
                url: '/pages/businessActivity/activityShop/activityShop?' + qurey
            });
        },

        jumpJoinDetail(e) {
            //跳转参与详情
            var item = e.currentTarget.dataset.item;
            var orderState = item.orderState;
            var orderNum = item.orderNo;
            uni.navigateTo({
                url: '/pages/businessActivity/order_list/order_list?orderState=' + orderState + '&orderNo=' + orderNum
            });
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        getClassList() {
            //获取分类活动列表
            this.setData(
                {
                    dataList: []
                },
                () => {
                    app.globalData
                        .sjrequest1('/activityCommodityBusiness/commodityClassifyPageList', {
                            pageSize: 30,
                            currentPage: 1,
                            merchantId: this.merchantId,
                            templateTag: 'TJFL'
                        })
                        .then((res) => {
                            uni.stopPullDownRefresh();

                            if (res.statusCode == 200 && res.data.code == 0 && res.data.data) {
                                var classTypeList = res.data.data.list || [];
                                classTypeList.forEach((temp) => {
                                    var activityList = temp.activityList || {};
                                    var list = activityList.list || [];
                                    list.forEach((item) => {
                                        var nowDate = new Date().getTime();

                                        if (item.state == 1) {
                                            //活动未开始
                                            var startDate = this._parseDate(item.startTime, 'number');

                                            item.diffTimes = startDate - nowDate;
                                        } else {
                                            var endDate = this._parseDate(item.endTime, 'number');

                                            item.isEnd = endDate - nowDate <= 0;
                                            item.diffTimes = endDate - nowDate;
                                        }

                                        item.times = {
                                            days: 0,
                                            hours: 0,
                                            minutes: 0,
                                            seconds: 0
                                        };
                                        var skuList = item.activityCommoditySkuList || [];
                                        var skuItem = skuList[0] || {};
                                        item.imageUrl = item.bannerImgUrls[0]; //skuItem.imageUrl;

                                        item.lowPrice = skuItem.livePrice;
                                        item.price = skuItem.price;
                                    });
                                });
                                this.setData({
                                    dataList: classTypeList
                                });
                            }
                        });
                }
            );
        },

        timeChange(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var index = e.currentTarget.dataset.index;
            var tindex = e.currentTarget.dataset.tindex;
            var times = e.detail;

            for (var key in times) {
                var value = times[key];

                if (value < 10) {
                    times[key] = '0' + value;
                } else {
                    times[key] = value;
                }
            }

            var list = this.dataList;

            if (list[tindex].activityList.list[index]) {
                list[tindex].activityList.list[index].times = times;
            }

            this.setData({
                dataList: list
            });
        },

        finishFun(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //倒计时结束
            var index = e.currentTarget.dataset.index;
            var tindex = e.currentTarget.dataset.tindex;
            var list = this.dataList;
            var item = list[tindex].activityList.list[index];

            if (item && item.state == 1) {
                var nowDate = new Date().getTime();

                var endDate = this._parseDate(item.endTime, 'number');

                item.diffTimes = endDate - nowDate;
                item.state = 2;
                this.setData({
                    dataList: list
                });
            }
        }
    }
};
</script>
<style>
@import '../../../styles/me_common.css'; /* pages/businessActivity/activityShop/activityShop.wxss */
page {
    background-color: #000;
}

.class-item-top-box {
    font-size: 24rpx;
    color: #fff;
    position: relative;
    margin-bottom: 15rpx;
}
.class-item-top-box .class-type-name {
    padding: 6rpx 20rpx;
    color: #fff;
    font-size: 32rpx;
    border-radius: 14rpx;
    background: linear-gradient(180deg, #fe213f 0%, #ff662a 100%);
}
.class-item-top-box .view-more {
    position: absolute;
    bottom: 0;
    right: 0;
}

.activity-list-container {
    margin: 20rpx;
    position: relative;
}
.new-activity-remind {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 28rpx;
    background-color: #eb1918;
    width: 192rpx;
    color: #fff;
    height: 62rpx;
    text-align: center;
    line-height: 62rpx;
    border-radius: 0px 16rpx 0px 16rpx;
}
.activity-list-info {
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
}
.activity-top {
    position: relative;
    width: 100%;
}
.activity-img {
    width: 100%;
    height: 454rpx;
    background-color: #999999;
}
.activity-num {
    height: 60rpx;
    line-height: 60rpx;
    position: absolute;
    font-size: 30rpx;
    left: -10rpx;
    bottom: 8rpx;
    color: #fff;
}
.activity-num .triangle-box {
    border: 20rpx solid transparent;
    border-right-color: #ed2625;
}
.activity-num .btn_last {
    height: 64rpx;
    padding: 0 10rpx;
    line-height: 64rpx;
    background-color: #ed2625;
    border-radius: 10rpx;
}
.down-order-num {
    bottom: 84rpx;
}

.activity-foot {
    background-color: #fff;
    padding-bottom: 28rpx;
}
.activity-foot .msg-line-box {
    font-size: 24rpx;
    color: #fff;
    box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 10rpx;
    margin-bottom: 10rpx;
}
.activity-foot .not-complete {
    font-size: 26rpx;
    background-color: #1577ff;
    height: 52rpx;
    line-height: 42rpx;
}
.activity-foot .complete {
    background-color: #ff9215;
    height: 52rpx;
}
.activity-foot .complete .view-detail {
    background-color: #dc7600;
    padding: 0rpx 10rpx;
    border-radius: 10rpx;
}
.activity-foot .not-complete .view-detail {
    background-color: #074fb3;
    padding: 0rpx 10rpx;
    border-radius: 10rpx;
}
.activity-foot .foot-line-item {
    height: 60rpx;
}
.activity-foot .activity-shop-name {
    font-size: 30rpx;
    color: #fff;
    border-radius: 10rpx;
    background-color: #1577ff;
    padding: 5rpx 10rpx;
}
.activity-foot .people-num {
    font-size: 22rpx;
    color: #ed2625;
}
.activity-foot .price-box {
    font-size: 24rpx;
    color: #ed2625;
    position: relative;
    bottom: 2px;
}
.activity-foot .price-box .price-num {
    font-size: 36rpx;
    font-weight: bold;
    position: relative;
    top: 3px;
}
.activity-foot .activity-goods-name {
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
}
.activity-foot .remind-btn {
    padding: 5rpx 25rpx;
    background-color: #eb1918;
    font-size: 22rpx;
    color: #fff;
    border-radius: 6rpx;
}
.activity-foot .times-text {
    font-size: 24rpx;
    color: #ed2625;
}
.activity-foot .times-text .time-num {
    padding: 3rpx 8rpx;
    border-radius: 8rpx;
    background-color: #d92322;
    color: #fff;
    margin: 0 3rpx;
}

.place-empty {
    width: 100%;
    height: 500rpx;
    font-size: 32rpx;
    color: #999;
}
</style>
