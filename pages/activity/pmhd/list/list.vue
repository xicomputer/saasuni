<template>
    <view class="list">
        <image @tap="toPmEnter" class="list_myPm" src="https://xssj.letterbook.cn/applet/images/icon_myPm.png"></image>
        <!-- <image bindtap="toShop" class="list_myPm" style="top: 680rpx;" src="https://xssj.letterbook.cn/applet/images/icon_toShop.png"></image> -->
        <image
            mode="widthFix"
            class="list_image"
            :src="auctionList[0].merchantAuctionLogo ? auctionList[0].merchantAuctionLogo : 'https://xssj.letterbook.cn/applet/images/bg_auctionList.png'"
        ></image>
        <block v-for="(item, index) in auctionList" :key="index">
            <view @tap="toDetails" :data-auctionid="item.auctionId" class="list_item">
                <image v-if="item.status == 3" class="list_item_icon" src="https://xssj.letterbook.cn/applet/images/icon_over.png"></image>
                <view class="list_item_image">
                    <image :src="item.logoImg" mode="aspectFill"></image>
                    <view v-if="item.status == 3">已结束</view>
                </view>
                <view class="list_item_info">
                    <view class="list_item_up">
                        <view class="list_item_up_left">
                            <view class="list_item_name">{{ item.xsAuctionItem.auctionItemName }}</view>
                            <view class="list_item_desc">{{ item.xsAuctionItem.description }}</view>
                        </view>
                        <view class="list_item_up_right">
                            <view class="list_item_label">{{ item.timeUnit == 1 ? '即时喊' : item.timeUnit == 2 ? '短时喊' : '长时喊' }}</view>
                            <view class="list_item_startPrice">保底价：￥{{ item.xsAuctionItem.startingPrice }}</view>
                            <block v-if="item.auctionPrice != 0">
                                <view class="list_item_nowPrice" :style="item.status == '3' ? 'color: #999999;' : ''">
                                    {{ item.status == '3' ? '成交价：￥' : '当前价：￥' }}
                                    <text style="font-size: 24rpx">{{ item.auctionPrice }}</text>
                                </view>
                            </block>
                        </view>
                    </view>
                    <view class="list_item_down">
                        <block v-if="item.status != '3'">
                            <van-count-down use-slot @change="changeTime($event, { index })" :data-index="index" :time="item.timeMinutes">
                                <view class="list_item_onLookers">
                                    <text v-if="item.status == '1'">开始时间</text>
                                    <text v-if="item.status == '2'" style="color: #ff0000">距离结束</text>
                                    <text v-if="item.timeData.days != 0">{{ item.timeData.days }}</text>
                                    <text v-if="item.timeData.days != 0">天</text>
                                    <text>{{ item.timeData.hours < 10 ? '0' + item.timeData.hours : item.timeData.hours }}</text>
                                    <text>:</text>
                                    <text>{{ item.timeData.minutes < 10 ? '0' + item.timeData.minutes : item.timeData.minutes }}</text>
                                    <text>:</text>
                                    <text>{{ item.timeData.seconds < 10 ? '0' + item.timeData.seconds : item.timeData.seconds }}</text>
                                </view>
                            </van-count-down>
                            <view v-if="item.status == '1'" class="list_item_onLookers" style="color: #07c160">预约人数：{{ item.reserveNumber }}</view>
                        </block>
                        <view v-if="item.status == '3'" style="color: #333333">结束时间 {{ item.endTime }}</view>
                        <view v-if="item.status != '1'" class="list_item_onLookers">{{ item.personNumber }}人参与喊价</view>
                    </view>
                </view>
            </view>
        </block>

        <view v-if="auctionList.length == 0 && reqComplete" class="me-fx-col me-fx-c-c empty-list">
            <text>抱歉！暂无数据</text>
        </view>
    </view>
</template>

<script>
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// pages/activity/pmhd/list/list.js
const app = getApp();
export default {
    // components: {
    //     vanCountDown
    // },
    data() {
        return {
            auctionList: [],
            pageNum: 1,

            // 当前页
            pageSize: 10,

            // 每页大小
            stopLoading: true,

            merchantId: '',
            reqComplete: false,
            merchantAuctionLogo: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.scene) {
            const scene = decodeURIComponent(options.scene);
            this.getCodeParams(scene);
        }

        {
            app.globalData.options = options;
            this.setData(
                {
                    merchantId: options.marchantId ? options.marchantId : options.merchantId || 275
                },
                () => {
                    this.getAuctionList();
                }
            );
        }
    },
    onReachBottom: function () {
        if (this.stopLoading) {
            this.setData({
                pageNum: this.pageNum + 1
            });
            this.getAuctionList();
        }
    },
    onShareAppMessage: function () {
        return {
            title: this.auctionList[0].xsAuctionItem.merchantName
        };
    },
    methods: {
        getCodeParams(id) {
            let data = {
                id: id
            };
            let that = this;
            app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        merchantId: JSON.parse(res.data.data.scene).id
                    });
                    that.getAuctionList();
                }
            });
        },

        getAuctionList() {
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                merchantId: this.merchantId
            };
            app.globalData.request.auctionRequest('/auction/list', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;

                    if (result.length < this.pageSize) {
                        this.setData({
                            stopLoading: false
                        });
                    }

                    this.setData({
                        auctionList: this.auctionList.concat(result),
                        reqComplete: true
                    });
                }
            });
        },

        toDetails(e) {
            const { auctionid } = e.currentTarget.dataset;
            uni.navigateTo({
                url: `/pages/activity/pmhd/details/details?auctionId=${auctionid}`
            });
        },

        changeTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            const { index } = e.currentTarget.dataset;
            this.auctionList[index].timeData = e.detail;
            this.setData({
                auctionList: this.auctionList
            });
        },

        toPmEnter() {
            uni.navigateTo({
                url: '/pages/activity/pmhd/pmEnter/pmEnter?marchantId=' + this.merchantId
            });
        },

        toShop() {
            uni.navigateTo({
                url: '/pages/shopHome/home/home?marchantId=' + this.merchantId
            });
        }
    }
};
</script>
<style>
.list {
    min-height: 100vh;
    background: #f8f8f8;
}
.list_myPm {
    width: 88rpx;
    height: 88rpx;
    position: fixed;
    top: 780rpx;
    right: 20rpx;
    z-index: 2;
}
.list_image {
    width: 100%;
    vertical-align: bottom;
}
.list_item {
    width: 100%;
    height: 204rpx;
    background: #ffffff;
    margin-bottom: 12rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    position: relative;
}
.list_item_icon {
    width: 100rpx;
    height: 96rpx;
    position: absolute;
    top: 4rpx;
    right: 148rpx;
    z-index: 1;
}
.list_item_image {
    position: relative;
}
.list_item_image image {
    width: 164rpx;
    height: 164rpx;
    border-radius: 12rpx;
}
.list_item_image view {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 112rpx;
    height: 112rpx;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
    line-height: 112rpx;
    text-align: center;
}
.list_item_info {
    width: 0;
    flex: 1;
    margin-left: 18rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.list_item_up {
    display: flex;
    justify-content: space-between;
}
.list_item_up_left {
}
.list_item_name {
    width: 310rpx;
    font-size: 24rpx;
    font-weight: bold;
    line-height: 34rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list_item_desc {
    width: 310rpx;
    font-size: 20rpx;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list_item_up_right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.list_item_label {
    width: 76rpx;
    height: 32rpx;
    background: #ff0000;
    border-radius: 8rpx;
    font-size: 20rpx;
    font-weight: bold;
    line-height: 32rpx;
    text-align: center;
    color: #ffffff;
}
.list_item_startPrice {
    margin-top: 30rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #999999;
}
.list_item_nowPrice {
    margin-top: 4rpx;
    font-size: 18rpx;
    font-weight: bold;
    color: #ff0000;
}
.list_item_down {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22rpx;
    font-weight: bold;
}
.list_item_onLookers {
    font-size: 22rpx;
    font-weight: bold;
    color: #f85c38;
}

/*列表为空时展示的内容*/
.empty-list {
    font-size: 30rpx;
    color: #999;
    height: 300rpx;
}
</style>
