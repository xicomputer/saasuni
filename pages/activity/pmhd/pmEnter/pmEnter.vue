<template>
    <view class="pmEnter">
        <view class="order">
            <block v-for="(item, index) in list" :key="index">
                <view @tap="toOrderList" :data-status="index" class="order_item">
                    <view class="order_icon">
                        <image :src="'/image/pmhd/icon_pmorder' + (index + 2) + '.png'"></image>
                        <view v-if="item.num" class="order_num">{{ item.num > 99 ? '...' : item.num }}</view>
                    </view>
                    <view class="order_name">{{ item.name }}</view>
                </view>
            </block>
        </view>
        <view @tap="toPmList" class="mypm" :data-index="index" v-for="(item, index) in statusList" :key="index">
            <view class="mypm_left">{{ item }}</view>

            <view class="mypm_right">
                <block :wx:index="index" v-for="(itemNum, itemIndex) in numList" :key="itemNum.itemIndex">
                    <!-- wx:if="{{itemNum.status==index+1}}" -->

                    <view v-if="itemNum.status == index + 1">{{ itemNum.count }}</view>
                </block>
                <image src="/static/image/pmhd/icon_enter.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
// pages/activity/pmhd/pmEnter/pmEnter.js
const app = getApp();
export default {
    data() {
        return {
            merchantId: -1,
            pmNumber: 0,
            list: [
                {
                    name: '待发货',
                    num: 0
                },
                {
                    name: '待收货',
                    num: 0
                },
                {
                    name: '已完成',
                    num: 0
                },
                {
                    name: '退款/售后',
                    num: 0
                }
            ],
            statusList: ['待开喊', '参喊中', '待付款', '已获喊', '未获喊'],
            numList: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        app.globalData.options = options;
        this.setData({
            merchantId: options.marchantId
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
        this.getNumber();
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
    methods: {
        // 获得数字
        getNumber() {
            let params = {};

            if (this.merchantId != -1) {
                params = {
                    merchantId: this.merchantId
                };
            }

            app.globalData.request.auctionRequest('/order/orderStatusCount', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;
                    result.forEach((item) => {
                        if (item.status == 5) {
                            this.setData({
                                pmNumber: item.count
                            });
                        } else {
                            this.list[item.status - 1].num = item.count;
                        }
                    });
                    this.setData({
                        list: this.list,
                        numList: result
                    });
                }
            });
        },

        toOrderList(e) {
            const { status } = e.currentTarget.dataset;

            if (this.merchantId) {
                uni.navigateTo({
                    url: `/pages/activity/pmhd/orderList/orderList?status=${status}&merchantId=${this.merchantId}`
                });
            } else {
                uni.navigateTo({
                    url: `/pages/activity/pmhd/orderList/orderList?status=${status}`
                });
            }
        },

        toPmList(e) {
            let index = e.currentTarget.dataset.index + 1;

            if (this.merchantId) {
                uni.navigateTo({
                    url: `/pages/activity/pmhd/pmList/pmList?merchantId=${this.merchantId}&status=` + index
                });
            } else {
                uni.navigateTo({
                    url: `/pages/activity/pmhd/pmList/pmList`
                });
            }
        }
    }
};
</script>
<style>
.pmEnter {
    min-height: 100vh;
    background: #f8f8f8;
}
.order {
    width: 100%;
    height: 144rpx;
    background-color: #ffffff;
    padding: 20rpx 24rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
    display: flex;
    margin-bottom: 20rpx;
}
.order_item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.order_icon {
    position: relative;
}
.order_icon image {
    width: 56rpx;
    height: 56rpx;
}
.order_num {
    position: absolute;
    top: -14rpx;
    right: -14rpx;
    color: #ffffff;
    font-size: 20rpx;
    font-weight: bold;
    background-color: #ff0000;
    padding: 2rpx 10rpx;
    border-radius: 50%;
}
.order_name {
    color: #000000;
    font-weight: bold;
    font-size: 24rpx;
}
.mypm {
    width: 100%;
    height: 84rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 0 22rpx 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.mypm_left {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
}
.mypm_right {
    display: flex;
    align-items: center;
}
.mypm_right view {
    height: fit-content;
    color: #ffffff;
    font-size: 20rpx;
    font-weight: bold;
    background-color: #ff0000;
    padding: 2rpx 10rpx;
    border-radius: 50%;
}
.mypm_right image {
    width: 26rpx;
    height: 50rpx;
}
</style>
