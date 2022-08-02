<template>
    <!-- 秒杀头部 -->
    <view class="seckill_body">
        <view class="seckill-top">
            <image src="https://xssj.letterbook.cn/applet/images/seckill.png" style="width: 100%; height: 200rpx; display: block"></image>
            <scroll-view :scroll-x="true">
                <view class="seckill-time-list">
                    <view class="seckill-time-box" @tap="selectTime" :data-index="index" :data-id="item.id" v-for="(item, index) in seckillTimeList" :key="index">
                        <view :class="'seckill-time ' + (index == timeAcitve ? 'seckill-time-active' : '')">{{ item.startTime }}</view>

                        <view :class="'seckill-statu ' + (index == timeAcitve ? 'seckill-statu-active' : '')" v-if="item.state == 1">{{ item.showTxet }}</view>

                        <view :class="'seckill-statu ' + (index == timeAcitve ? 'seckill-statu-active' : '')" v-if="item.state == 2">抢购中</view>

                        <view :class="'seckill-statu ' + (index == timeAcitve ? 'seckill-statu-active' : '')" v-if="item.state == 3">抢购结束</view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <!-- 秒杀商品列表 -->
        <view class="seckill-goods-list">
            <navigator
                class="secklii-good-item"
                :url="'../ActivityGoodsDetail/ActivityGoodsDetail?id=' + item.activityCommoditySku[0].activityCommodityId + '&seckillId=' + item.seckillId"
                v-for="(item, index) in goodsList"
                :key="index"
            >
                <image class="seckill-good-img" :src="item.commodity.thumbnail" mode="aspectFill" style="width: 200rpx; height: 200rpx"></image>

                <view class="seckill-good-info">
                    <view class="seckill-good-top">
                        <view class="seckill-good-name">{{ item.commodity.commodityName }}</view>
                        <view class="seckill-good-describe">{{ item.commodity.description }}</view>
                    </view>
                    <view class="seckill-good-bottom">
                        <view class="seckill-good-price-box">
                            <view class="seckill-good-activity-price">
                                <text style="font-size: 22rpx">￥</text>
                                {{ item.activityCommoditySku[0].lowPrice }}
                            </view>
                            <view class="seckill-good-original-price">￥{{ item.activityCommoditySku[0].originalPrice }}</view>
                        </view>
                        <view :class="'seckill-buy-btn ' + (item.sold == 100 ? 'sold-all' : '')" v-if="item.state == 2">
                            <text class="seckill-buy-btn-statu">{{ item.sold == 100 ? '已售罄' : '去抢购' }}</text>
                            <view class="seckill-buy-btn-bottom">
                                <view class="seckill-buy-btn-progress">
                                    <view class="seckill-buy-btn-progress-statu" :style="'width:' + item.sold + '%'"></view>
                                </view>
                                <view class="sold-num">{{ item.sold }}%</view>
                            </view>
                        </view>
                        <view class="seckill-buy-btn sold-all" v-if="item.state == 1">
                            <text class="seckill-buy-btn-statu">尚未开始</text>
                        </view>
                    </view>
                </view>
            </navigator>
        </view>
        <!-- 底部 -->
        <view class="daodile"><text>——信书技术支持——</text></view>
    </view>
</template>

<script>
const app = getApp();

const time = require('../../../../utils/util');

export default {
    data() {
        return {
            seckillTimeList: [],
            goodsList: [],
            timeAcitve: 0,
            allStock: 0,
            // 总库存
            soldNum: 0,
            // 已售出
            clone_options: {}
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            clone_options: options
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
        this.setData({
            timeAcitve: 0
        });
        this.getParams(this._options.marchantId);
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
     */ methods: {
        getParams(merchantId) {
            let that = this;
            let data = {
                merchantId: merchantId || 7
            };
            app.globalData.sjrequest('/seckill/findPeriod', data).then((res) => {
                res.data.data.forEach((item) => {
                    let nowDate = new Date();
                    let useTime = new Date(item.startTime * 1000);
                    let td = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
                    let od = new Date(useTime.getFullYear(), useTime.getMonth(), useTime.getDate());
                    let xc = (od - td) / 1000 / 60 / 60 / 24;

                    if (xc == 0) {
                        item.showTxet = '即将开始';
                    } else if (xc < 2) {
                        item.showTxet = '明天开始';
                    } else if (xc < 3) {
                        item.showTxet = '后天开始';
                    } else {
                        console.log(useTime);
                        let useText = `${useTime.getMonth() + 1}月${useTime.getDate()}日`;
                        item.showTxet = useText;
                        console.log(useText);
                    }

                    item.startTime = useTime.getHours() + ':' + (useTime.getMinutes() < 10 ? '0' + useTime.getMinutes() : useTime.getMinutes());
                    console.log(item.startTime);
                });
                console.log(res.data.data);
                this.setData({
                    seckillTimeList: res.data.data,
                    goodsList: res.data.data[0].activityCommodity
                });
                that.getStock(that.goodsList);
            });
        },

        // 获取总库存和已售数量
        getStock(list) {
            list.forEach((item) => {
                let allStock = 0;
                let allLiveStock = 0;
                item.activityCommoditySku.forEach((res) => {
                    allStock += parseInt(res.stock);
                    allLiveStock += res.liveStock;
                });
                item.sold = Math.floor(((allStock - allLiveStock) / allStock).toFixed(2) * 100);
            });
            this.setData({
                goodsList: list
            });
        },

        // 获取商品列表
        getGoodsList(id) {
            let that = this;
            let data = {
                seckillId: id
            };
            app.globalData.sjrequest('/seckill/commodityList', data).then((res) => {
                this.setData({
                    goodsList: res.data.data
                });
                that.getStock(that.goodsList);
                console.log(that.goodsList);
            });
        },

        // 选择时间场次
        selectTime(e) {
            this.setData({
                timeAcitve: e.currentTarget.dataset.index
            });
            this.getGoodsList(e.currentTarget.dataset.id);
        }
    },
    watch: {
        _options: {
            handler: function (newVal, oldVal) {
                this.clone_options = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
page {
    /* padding: 20rpx; */
    box-sizing: border-box;
    background: #f2f2f2;
    position: relative;
}
.seckill-goods-list {
    padding-bottom: 40rpx;
}
/* 秒杀头部 */
.seckill-top {
    margin: 20rpx;
}
.seckill-time-list {
    display: flex;
    margin-top: 9rpx;
    height: 90rpx;
}
.seckill-time-box {
    text-align: center;
    margin-right: 38rpx;
}
.seckill-time {
    height: 45rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 800;
    line-height: 48rpx;
    color: #333;
}
.seckill-time-active {
    color: #ff5340;
}
.seckill-statu {
    width: 112rpx;
    padding: 0 5px;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 40rpx;
    color: #999999;
}
.seckill-statu-active {
    min-width: 110rpx;
    background-color: #ff5340;
    border-radius: 20rpx;
    color: #ffffff;
}
/* 秒杀商品列表 */
.secklii-good-item {
    display: flex;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: white;
    margin-top: 20rpx;
    border-radius: 20rpx;
}
.seckill-good-info {
    width: 0;
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.seckill-good-top {
    margin-top: 10rpx;
}
.seckill-good-name {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.seckill-good-describe {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.seckill-good-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.seckill-good-price-box {
    display: flex;
    align-items: center;
}
.seckill-good-activity-price {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #ff5340;
}
.seckill-good-original-price {
    height: 30rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 30rpx;
    color: #cccccc;
    margin-left: 5rpx;
    text-decoration: line-through;
}
.seckill-buy-btn {
    width: 128rpx;
    height: 60rpx;
    background: #ff5340;
    border-radius: 5rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.seckill-buy-btn-statu {
    height: 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #ffffff;
}
.sold-all {
    background-color: #999;
}
.seckill-buy-btn-bottom {
    display: flex;
    align-items: center;
}
.seckill-buy-btn-progress {
    width: 80rpx;
    height: 6rpx;
    background: #ff877a;
    border-radius: 4px;
    margin-right: 4rpx;
    position: relative;
}
.seckill-buy-btn-progress-statu {
    width: 0;
    height: 6rpx;
    background: #ffffff;
    border-radius: 4rpx;
}
.sold-num {
    height: 20rpx;
    font-size: 16rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 20rpx;
    color: #ffffff;
}
/* 底部 */
.daodile {
    font-size: 20rpx;
    text-align: center;
    color: #999999;
    font-weight: bold;
    position: absolute;
    bottom: 0rpx;
    display: flex;
    justify-content: center;
    width: 100%;
}
.seckill_body {
    min-height: 92vh;
}
</style>
