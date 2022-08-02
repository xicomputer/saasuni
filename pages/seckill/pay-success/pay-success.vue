<template>
    <view class="me-fx-col me-fx-start-c pay-success-page">
        <image src="/static/pages/seckill/imgs/success-img.png" class="success-img"></image>
        <view class="success-msg">恭喜您已支付成功</view>
        <view>{{ msgText }}</view>

        <view class="goods-info">
            <view class="me-fx-row me-fx-start-c title-box">
                <text class="col-line"></text>
                <text>商品信息</text>
            </view>
            <view>订单号:{{ orderNum }}</view>
            <view>商品信息:{{ goodsName }}</view>
            <view>规格:{{ skuName }}</view>
            <view>购买数量:{{ buyCount }}件</view>
        </view>

        <view class="me-fx-row me-fx-sa-c floot-btns">
            <button class="btn back-home" @tap="btnHandle" data-type="1">返回首页</button>
            <button class="btn view-order" @tap="btnHandle" data-type="2">查看订单</button>
        </view>
    </view>
</template>

<script>
// pages/seckill/pay-success/pay-success.js
export default {
    data() {
        return {
            orderNum: '',
            //订单号
            goodsName: '',
            //商品名
            skuName: '',
            //规格名
            buyCount: '',
            //购买数量
            orderType: '',
            //配送方式 1物流 2同城 3预订
            msgText: '',
            //提示信息副标题
            bookTime: '' //预订时间
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var query = options.query;

        if (query) {
            query = decodeURIComponent(query);
            query = JSON.parse(query);
            this.setData({ ...query }, () => {
                this.getMsgText();
            });
        }
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
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        btnHandle(e) {
            var type = e.currentTarget.dataset.type;

            if (type == 1) {
                uni.reLaunch({
                    url: '/pages/shopHome/home/home'
                });
            } else if (type == 2) {
                var orderType = this.orderType;
                var url = this.getOrderPageUrl(orderType);
                uni.navigateTo({
                    url
                });
            }
        },

        getOrderPageUrl(type) {
            var url = '/pages/seckill/';
            type = Number(type);

            switch (type) {
                case 1:
                    url += 'order-list/order-list';
                    break;

                case 2:
                    url += 'local-list/local-list';
                    break;

                case 3:
                    url += 'booking-list/booking-list';
                    break;
            }

            return url;
        },

        getMsgText() {
            var type = this.orderType;
            var bookTime = this.bookTime;
            var msgText = '';

            switch (Number(type)) {
                case 1:
                    msgText = '商家会在48小时内发货，请留意物流信息哦~';
                    break;

                case 2:
                    msgText = '商家自主配送，请注意配送信息哦';
                    break;

                case 3:
                    msgText = '预计到店时间' + bookTime;
                    break;
            }

            this.setData({
                msgText
            });
        }
    }
};
</script>
<style>
.pay-success-page {
    width: 100%;
    height: 100vh;
    background-color: #f1f1f1;
    font-size: 26rpx;
    color: #333;
    font-weight: bold;
}

.success-img {
    width: 100rpx;
    height: 100rpx;
    margin-top: 74rpx;
}
.success-msg {
    margin: 50rpx 0 20rpx;
}

.goods-info {
    font-size: 28rpx;
    color: #666;
    padding: 30rpx;
    box-sizing: border-box;
    width: 730rpx;
    background-color: #fff;
    border-radius: 20rpx;
    font-weight: normal;
    margin-top: 40rpx;
}
.goods-info .title-box {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 34rpx;
}
.goods-info .col-line {
    width: 12rpx;
    height: 32rpx;
    border-radius: 6rpx;
    margin-right: 15rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}

.floot-btns {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 132rpx;
    background-color: #fff;
}
.floot-btns .btn {
    width: 328rpx;
    height: 88rpx;
    font-size: 30rpx;
    border-radius: 44rpx;
    color: #fff;
    margin: 0;
    padding: 0;
    line-height: 88rpx;
    text-align: center;
    text-align: center;
}
.floot-btns .back-home {
    background-color: #1577ff;
}
.floot-btns .view-order {
    background-color: #eb1918;
}
</style>
