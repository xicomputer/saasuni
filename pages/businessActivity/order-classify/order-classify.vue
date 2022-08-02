<template>
    <view>
        <view class="list-box">
            <view class="me-fx-row me-fx-sb-c row-item" @tap="jumpOrderList" data-type="1">
                <text>邀三退一物流订单</text>
                <view class="me-fx-row me-fx-sb-c">
                    <view v-if="wuliu > 0" class="count-num"></view>
                    <image src="/static/pages/businessActivity/imgs/right-jiantou.png" class="right-jiantou-img"></image>
                </view>
            </view>
            <view class="me-fx-row me-fx-sb-c row-item" @tap="jumpOrderList" data-type="2">
                <text>邀三退一预订订单</text>
                <view class="me-fx-row me-fx-sb-c">
                    <view v-if="yuding > 0" class="count-num"></view>
                    <image src="/static/pages/businessActivity/imgs/right-jiantou.png" class="right-jiantou-img"></image>
                </view>
            </view>
            <view class="me-fx-row me-fx-sb-c row-item" @tap="jumpOrderList" data-type="3">
                <text>邀三退一同城订单</text>
                <view class="me-fx-row me-fx-sb-c">
                    <view v-if="tongcheng > 0" class="count-num"></view>
                    <image src="/static/pages/businessActivity/imgs/right-jiantou.png" class="right-jiantou-img"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/seckill/order-classify/order-classify.js
let app = getApp();
export default {
    data() {
        return {
            wuliu: 0,

            //物流订单数
            yuding: 0,

            //预订
            //同城
            tongcheng: 0,

            merchantId: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        uni.getStorage({
            key: 'merchantId',
            success: (res) => {
                this.setData(
                    {
                        merchantId: res.data
                    },
                    () => {
                        var typeList = [
                            {
                                orderType: '1',
                                keyName: 'wuliu'
                            },
                            {
                                orderType: '3',
                                keyName: 'yuding'
                            },
                            {
                                orderType: '2',
                                keyName: 'tongcheng'
                            }
                        ];
                        typeList.forEach((item) => {
                            this.getCount(item);
                        });
                    }
                );
            }
        });
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
    onShareAppMessage: function () {},
    methods: {
        jumpOrderList(e) {
            var type = e.currentTarget.dataset.type;
            var url = '/pages/businessActivity/';

            switch (type) {
                case '1':
                    url += 'order_list/order_list';
                    break;
                //物流

                case '2':
                    url += 'booking-list/booking-list';
                    break;
                //预订

                case '3':
                    url += 'local-list/local-list';
                    break;
                //同城
            }

            uni.navigateTo({
                url
            });
        },

        jumpStrategy() {
            //跳转攻略
            uni.navigateTo({
                url: '/pages/group_booking/strategy/strategy'
            });
        },

        getCount(temp) {
            //获取订单数量
            var reqData = {
                merchantId: this.merchantId,
                isQueryRefundOrder: temp.orderType != undefined ? false : true,
                templateTag: 'TJFL'
            };

            if (temp.orderType) {
                reqData.orderType = temp.orderType;
            }

            app.globalData.sjrequest1('/activityOrderBusiness/orderCount', reqData).then((res) => {
                if (res.statusCode == 200 && res.data.code === 0) {
                    var data = res.data.data;
                    var countItem = {};

                    if (temp.orderType) {
                        countItem = data.find((item) => item.orderState != 10000);
                    } else {
                        countItem = data.find((item) => item.orderState == 10000);
                    }

                    if (countItem) {
                        var keyName = temp.keyName;
                        this[temp.keyName] = countItem.total;
                    }
                }
            });
        }
    }
};
</script>
<style>
.list-box {
    padding: 0 30rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    color: #000;
    font-weight: 800;
}

.list-box .row-item {
    height: 122rpx;
    border-bottom: 1rpx solid #e5e5e5;
    align-items: center;
}

.list-box .row-item .count-num {
    /* border-radius: 22px 22px 22px 0px;
    background-color:#EB1918;font-size:26rpx;
    font-weight:normal;color:#fff;
    padding:0 10rpx; */
    width: 20rpx;
    height: 20rpx;
    background-color: #eb1918;
    border-radius: 50%;
}

.list-box .row-item .right-jiantou-img {
    width: 24rpx;
    height: 42rpx;
    margin-left: 15rpx;
}
</style>
