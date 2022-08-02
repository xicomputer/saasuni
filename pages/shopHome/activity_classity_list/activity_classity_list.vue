<template>
    <view>
        <!-- 头部分类导航 -->
        <view class="classity-nav-box" v-if="!classId">
            <scroll-view class="top-nav-scroll" :scroll-x="true">
                <view class="me-fx-row nav-list-box">
                    <view
                        :class="'me-fx-col me-fx-sb-c class-item ' + (nowClassId == item.id ? 'sel-item' : '')"
                        :data-classid="item.id"
                        @tap="switchClass"
                        v-for="(item, index) in classNavList"
                        :key="index"
                    >
                        <text class="me-fx-1 me-fx-row me-fx-c-c">{{ item.classifyName }}</text>

                        <view class="under-line"></view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 秒杀 -->
        <view class="ms-data-list-box" v-if="type == 'JSMS' && dataList.length">
            <block v-for="(item, index) in dataList" :key="index">
                <view class="me-fx-row ms-item-box" @tap="jumpDetail" :data-activityid="item.activityId">
                    <image :src="item.imageUrl" class="goods-img"></image>
                    <view class="me-fx-1 me-fx-col me-fx-sb">
                        <view>
                            <van-count-down use-slot @change="changeTime($event, { index })" :data-index="index" :time="item.diffTimes" @finish="finishFun($event, { index })">
                                <view class="down-time">
                                    <text>{{ item.state == 1 ? '距开始' : '距结束' }}:</text>
                                    <text v-if="item.times.days !== '00'">{{ item.times.days }}天</text>
                                    <text>{{ item.times.hours }}:{{ item.times.minutes }}:{{ item.times.seconds }}</text>
                                </view>
                            </van-count-down>
                            <view class="me-full-text goods-name">{{ item.commodityName }}</view>
                        </view>
                        <view class="me-fx-row me-fx-sb-end">
                            <view class="me-fx-row me-fx-c-c price-box">
                                <view class="now-price">
                                    <text>￥</text>
                                    <text class="now-price-num">{{ item.lowPrice }}</text>
                                    <view class="now-price-tite">
                                        秒杀价
                                        <text class="triangle-box"></text>
                                    </view>
                                </view>
                                <text class="old-price">¥{{ item.price }}</text>
                            </view>
                            <view class="me-fx-col me-fx-c-c qg-btn">
                                <view>立即抢购</view>
                                <view class="me-fx-row me-fx-c-c progress-box">
                                    <progress :percent="item.percentNum" font-size="14rpx" stroke-width="2" activeColor="#fff" backgroundColor="#FE8987" class="me-fx-1"></progress>
                                    <text class="percentage-num">{{ item.percentNum }}%</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </block>
        </view>

        <!-- 拼团 -->
        <view class="pt-data-list-box" v-if="type == 'TTPT' && dataList.length">
            <block v-for="(item, index) in dataList" :key="index">
                <view class="me-fx-row pt-item-box" @tap="jumpDetail" :data-activityid="item.activityId">
                    <image :src="item.imageUrl" class="goods-img"></image>
                    <view class="me-fx-1 me-fx-col me-fx-sb">
                        <view class="goods-name-info">
                            <view class="me-full-text goods-name">{{ item.classifyName }}</view>
                            <view class="label-text">{{ item.groupOfNumber }}人团</view>
                        </view>
                        <view class="center-info">
                            <image class="pt-adorn-bg" src="/static/pages/img/pt-adorn.png"></image>
                            <view class="me-fx-row me-fx-sb upper-content">
                                <text class="old-price">¥{{ item.price }}</text>
                                <van-count-down use-slot @change="changeTime($event, { index })" :data-index="index" @finish="finishFun($event, { index })" :time="item.diffTimes">
                                    <view class="down-timeing">
                                        <text>{{ item.state == 1 ? '距开始' : '距结束' }}:</text>
                                        <text v-if="item.times.days !== '00'">{{ item.times.days }}天</text>
                                        <text>{{ item.times.hours }}:{{ item.times.minutes }}:{{ item.times.seconds }}</text>
                                    </view>
                                </van-count-down>
                            </view>

                            <view class="save-info">
                                <image class="pt-adorn-jiantou-bg" src="/static/pages/img/pt-adorn-jiantou.png"></image>
                                <view class="me-fx-col me-fx-c-c upper-content">
                                    <view>立省</view>
                                    <view class="save-num">{{ item.saveAmount }}</view>
                                </view>
                            </view>
                        </view>
                        <view class="me-fx-row item-footer">
                            <view class="now-price">
                                <text class="symbol-text">￥</text>
                                <text class="price-num">{{ item.lowPrice }}</text>
                                <text>起</text>
                            </view>
                            <text class="pin-btn">拼一单</text>
                        </view>
                    </view>
                </view>
            </block>
        </view>

        <!-- <view class='me-fx-col me-fx-c-c'  wx:if='{{dataList.length==0}}'> 
        <no-data text="该分类暂无活动商品" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img3.png"></no-data>
    </view> -->
    </view>
</template>

<script>
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import noData from '@/pages/Component/noData/index';
// pages/shopHome/activity_classity_list/activity_classity_list.js
let app = getApp();
export default {
    components: {
        // vanCountDown,
        noData
    },
    data() {
        return {
            nowClassId: '',
            classNavList: [],
            type: '',
            // JSMS 秒杀  TTPT 拼团
            dataList: [],
            listDatas: {},
            pageSize: 10,
            classId: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var type = options.type;
        var classId = options.classid;

        if (classId) {
            this.setData({
                nowClassId: classId,
                classId
            });
        }

        uni.setNavigationBarTitle({
            title: type == 'TTPT' ? '拼团活动' : '秒杀活动'
        });
        this.setData(
            {
                type
            },
            () => {
                var merchantId = uni.getStorageSync('merchantId');
                this.merchantId = merchantId;
                this.getClassityList();
            }
        );
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
    /* 分享朋友 */
    onShareAppMessage() {},
    /* 分享朋友圈 */
    onShareTimeline() {},
    methods: {
        switchClass(e) {
            //切换分类
            var classId = e.currentTarget.dataset.classid;
            this.setData(
                {
                    nowClassId: classId
                },
                () => {
                    this.getActivityGoodsList();
                }
            );
        },

        getClassityList() {
            //获取分类列表
            app.globalData
                .sjrequest1('/activityCommodityBusiness/commodityClassifyPageList', {
                    pageSize: 20,
                    currentPage: 1,
                    merchantId: this.merchantId,
                    templateTag: this.type
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        list = list.filter((item) => {
                            return item.activityList !== null;
                        });
                        var nowClassId = this.nowClassId;

                        if (!nowClassId) {
                            if (list[0]) {
                                nowClassId = list[0].id;
                            } else {
                                nowClassId = '';
                            }
                        }

                        var listDatas = {};
                        list.forEach((item) => {
                            var keyName = 'list' + item.id;
                            listDatas[keyName] = {
                                stopReq: false,
                                pageNum: 1,
                                list: []
                            };
                        });
                        this.setData(
                            {
                                classNavList: list,
                                nowClassId,
                                listDatas
                            },
                            () => {
                                this.getActivityGoodsList();
                            }
                        );
                    }
                });
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        getActivityGoodsList() {
            //获取活动商品列表
            var nowClassId = this.nowClassId;

            if (!nowClassId) {
                return;
            }

            var listDatas = this.listDatas;
            var listObj = listDatas['list' + nowClassId];
            app.globalData
                .sjrequest1('/activityBusiness/pageList', {
                    pageSize: this.pageSize,
                    currentPage: listObj.pageNum,
                    merchantId: this.merchantId,
                    // "state": 2,
                    templateTag: this.type,
                    commodityClassifyId: nowClassId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        listObj.stopReq = list.length != this.pageSize;
                        list.forEach((item) => {
                            var nowTime = new Date().getTime();

                            if (item.state == 1) {
                                //活动未开始
                                var startTime = this._parseDate(item.startTime, 'number');

                                item.diffTimes = startTime - nowTime;
                            } else {
                                var endTime = this._parseDate(item.endTime, 'number');

                                item.diffTimes = endTime - nowTime;
                            }

                            item.times = {
                                days: 0,
                                hours: 0,
                                minutes: 0,
                                seconds: 0
                            };
                            item.activityCommoditySkuList = item.activityCommoditySkuList || [];
                            var skuItem = item.activityCommoditySkuList[0] || {};
                            item.imageUrl = item.bannerImgUrls[0];
                            item.price = skuItem.price;
                            item.lowPrice = skuItem.livePrice;
                            var percentNum = item.residueCommodityTotalCount / item.commodityTotalCount;
                            percentNum *= 100;
                            item.percentNum = Number(percentNum.toFixed(2));
                            var saveAmount = item.price - item.lowPrice;
                            item.saveAmount = parseInt(saveAmount);
                        });

                        if (listObj.pageNum == 1) {
                            listObj.list = list;
                        } else {
                            listObj.list.push(...list);
                        }

                        this.setData({
                            listDatas,
                            dataList: listObj.list
                        });
                    }
                });
        },

        changeTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var detail = e.detail;
            var index = e.currentTarget.dataset.index;
            var dataList = this.dataList;

            for (var key in detail) {
                var value = detail[key];

                if (value < 10) {
                    detail[key] = '0' + value;
                } else {
                    detail[key] = value;
                }
            }

            dataList[index].times = detail;
            this.setData({
                dataList
            });
        },

        finishFun(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //到计时结束
            var index = e.currentTarget.dataset.index;
            var dataList = this.dataList;
            var item = dataList[index];

            if (item && item.state == 1) {
                var nowTime = new Date().getTime();

                var endTime = this._parseDate(item.endTime, 'number');

                item.diffTimes = endTime - nowTime;
                item.state = 2;
                this.setData({
                    dataList
                });
            }
        },

        jumpDetail(e) {
            var type = this.type;
            var activityId = e.currentTarget.dataset.activityid;
            var url = '';

            if (type == 'JSMS') {
                url = '/pages/seckill/detail/detail?activityId=' + activityId;
            } else if (type == 'TTPT') {
                url = '/pages/group_booking/detail/detail?activityId=' + activityId;
            }

            uni.navigateTo({
                url
            });
        }
    }
};
</script>
<style>
page {
    background-color: #f1f1f1;
}

/* 头部分类导航 */
.classity-nav-box {
    height: 88rpx;
}
.top-nav-scroll {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88rpx;
    background-color: #fff;
}
.top-nav-scroll .nav-list-box {
    height: 88rpx;
}
.top-nav-scroll .class-item {
    font-size: 28rpx;
    color: #333;
    flex-shrink: 0;
    padding: 0 20rpx;
}
.top-nav-scroll .under-line {
    width: 76rpx;
    height: 4rpx;
    background-color: transparent;
    border-radius: 4rpx;
}
.top-nav-scroll .sel-item {
    color: #eb1918;
}
.top-nav-scroll .sel-item .under-line {
    background-color: #eb1918;
}

/* 列表数据 */
.ms-data-list-box {
    box-sizing: border-box;
    width: 710rpx;
    background-color: #fff;
    margin: 20rpx auto;
    padding: 20rpx 0 20rpx 10rpx;
    border-radius: 16rpx;
}

.ms-item-box:not(:last-child) {
    margin-bottom: 38rpx;
}
.ms-item-box .goods-img {
    width: 200rpx;
    height: 200rpx;
    background-color: #ccc;
    border-radius: 8px 0px 0px 8px;
}
.ms-item-box .down-time {
    width: 312rpx;
    height: 43rpx;
    line-height: 43rpx;
    background-color: #ff0000;
    text-align: center;
    font-size: 24rpx;
    color: #fff;
    border-radius: 0 26rpx 26rpx 0;
}
.ms-item-box .goods-name {
    font-size: 30rpx;
    color: #333;
    padding: 0 20rpx;
    box-sizing: border-box;
}

.ms-item-box .price-box {
    width: 216rpx;
    height: 56rpx;
    background-color: #f7f7f7;
    border-radius: 0px 32px 32px 0px;
    position: relative;
}
.ms-item-box .price-box .now-price {
    color: #ff0000;
    font-size: 24rpx;
    font-weight: bold;
    margin-right: 8rpx;
}
.ms-item-box .now-price .now-price-num {
    font-size: 40rpx;
}

.ms-item-box .price-box .old-price {
    color: #999;
    font-size: 20rpx;
    text-decoration: line-through;
}
.ms-item-box .now-price .now-price-tite {
    position: absolute;
    top: 0;
    left: 22rpx;
    text-align: center;
    background-color: #ff0000;
    width: 72rpx;
    height: 36rpx;
    border-radius: 6rpx;
    font-size: 20rpx;
    color: #fff;
    transform: translateY(-46rpx);
    line-height: 36rpx;
}
.ms-item-box .now-price .now-price-tite .triangle-box {
    position: absolute;
    bottom: 0;
    left: 50%;
    border: 10rpx solid transparent;
    border-top-color: #ff0000;
    transform: translate(-50%, 20rpx);
}

.ms-item-box .qg-btn {
    font-size: 26rpx;
    color: #fff;
    width: 166rpx;
    height: 62rpx;
    background: linear-gradient(175deg, #faead5 0%, #ff0200 100%);
    box-shadow: 0px 6px 12px rgba(255, 30, 30, 0.33);
    border-radius: 34px 0px 0px 34px;
}
.ms-item-box .qg-btn .progress-box {
    width: 70%;
}
.ms-item-box .qg-btn .percentage-num {
    font-size: 14rpx;
    color: #fff;
    margin-left: 10rpx;
}

/* 拼团 */
.pt-data-list-box {
    width: 710rpx;
    margin: 20rpx auto;
}
.pt-item-box {
    padding: 16rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;
}
.pt-item-box:not(:last-child) {
    margin-bottom: 20rpx;
}
.pt-item-box .goods-img {
    width: 240rpx;
    height: 240rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
    background-color: #ccc;
}
.pt-item-box .goods-name-info {
    margin-bottom: 20rpx;
}
.pt-item-box .goods-name {
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
}
.pt-item-box .label-text {
    font-size: 20rpx;
    color: #fff;
    border-radius: 4rpx;
    width: 78rpx;
    height: 32rpx;
    background: linear-gradient(152deg, #ff972a 0%, #fd5c00 100%);
    text-align: center;
    line-height: 32rpx;
}

.pt-item-box .center-info {
    height: 62rpx;
    font-size: 20rpx;
    position: relative;
}
.pt-item-box .center-info .pt-adorn-bg {
    width: 356rpx;
    height: 62rpx;
    position: absolute;
    left: 0;
    top: 0;
}
.pt-item-box .center-info .upper-content {
    position: relative;
    z-index: 100;
}

.pt-item-box .center-info .old-price {
    color: #999;
}
.pt-item-box .center-info .down-timeing {
    color: #fd5c00;
    font-size: 20rpx;
}
.pt-item-box .center-info .save-info {
    width: 80rpx;
    height: 75rpx;
    background-size: 80rpx 75rpx;
    font-size: 22rpx;
    color: #fff;
    position: absolute;
    top: 0;
    left: 177rpx;
    transform: translate(-50%, -50%);
}
.pt-item-box .center-info .save-info .pt-adorn-jiantou-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 80rpx;
    height: 75rpx;
}
.pt-item-box .center-info .save-info .upper-content {
    position: relative;
    z-index: 100;
}
.pt-item-box .center-info .save-info .save-num {
    font-size: 20rpx;
}

.pt-item-box .item-footer {
    position: relative;
}
.pt-item-box .now-price {
    color: #fd5f02;
    font-size: 22rpx;
    width: 356rpx;
    text-align: center;
}
.pt-item-box .now-price .symbol-text {
    font-size: 28rpx;
    font-weight: bold;
}
.pt-item-box .now-price .price-num {
    font-size: 40rpx;
    font-weight: bold;
}
.pt-item-box .pin-btn {
    background: linear-gradient(180deg, #ff972a 0%, #fd5c00 100%);
    width: 116rpx;
    height: 52rpx;
    text-align: center;
    line-height: 52rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 10rpx;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
