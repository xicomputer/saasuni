<template>
    <view class="applyReturn">
        <!-- 购买的商品 -->
        <view class="goods">
            <view class="goods-shop">
                <image :src="citInfo.logoPic" mode="aspectFill" class="shop-logo" />
                <view class="shop-title">{{ citInfo.nickName }}</view>
                <image src="/static/pages/img/back-icon.png" class="shop-enter" />
            </view>
            <view class="goods-list">
                <view class="goods-item" v-for="(item, index) in citInfo.commList" :key="index">
                    <view class="goods-left">
                        <image :src="item.thumbnail" mode="aspectFill" class="goods-logo" />
                    </view>

                    <view class="goods-right">
                        <view class="goods-info">
                            <view class="goods-name">{{ item.commodityName }}</view>
                            <view class="goods-spec">规格：{{ item.itemText }}</view>
                            <view class="goods-num">数量：{{ item.amount }}</view>
                            <view class="goods-price">￥{{ item.actualMoney }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 退款信息 -->
        <view class="info">
            <view class="info-item">
                <view @tap="refund" class="info-content" style="justify-content: space-between">
                    退货原因
                    <view class="info-choose">
                        <text v-if="reason == ''">请选择</text>
                        <text style="color: #333; word-wrap: break-word" v-if="reason != ''">{{ reason }}</text>
                        <image src="/static/pages/img/back-icon.png" class="info-enter" />
                    </view>
                </view>
                <view class="info-content">
                    退款金额：
                    <text class="info-money">￥{{ citInfo.commList[0].actualMoney }}</text>
                </view>
                <view class="info-content">
                    补充说明：
                    <input placeholder="选填" :value="supplementary" class="info-input" @input="inputText" maxlength="20" />
                </view>
            </view>
        </view>
        <!-- 上传图片 -->
        <!-- <view class="certificate">
        <view class="certificate-title">上传凭证（最多3张）</view>
        <view class="content-image">
            <view wx:for="{{fileList}}" class="image-box" wx:key="index">
                <image src="{{item.httpAddress}}" class="image-img" bindtap="zoomImg" mode="aspectFill" data-list="{{fileList}}" data-src="{{item.httpAddress}}"></image>
                <image src="../../img/shanchu.png" class="image-del" bindtap="delImg" data-index="{{index}}"></image>
            </view>
            <view wx:if="{{fileList.length < 3}}" class="uploadImg" bindtap="uploadImage">
                <image class="uploadImg-btn" src="/pages/img/order/upload.png"></image>
            </view>
        </view>
    </view> -->
        <!-- 按钮 -->
        <view class="btnBox">
            <view class="btn" @tap="submit">确定退货</view>
        </view>
        <!-- 退货原因 -->
        <van-popup :show="reasonBox" @close="refundOnClose" round position="bottom" class="reasonBox">
            <view class="reason-title">退货原因</view>
            <view class="reason-content">
                <radio-group @change="radioChange">
                    <label class="reason-item" v-for="(item, index) in refundReason" :key="index">
                        <view class="reason-name">{{ item.name }}</view>

                        <radio :value="item.name" :checked="item.checked" color="#101010" />
                    </label>
                </radio-group>
                <textarea placeholder="输入你的退款原因，20字以内" maxlength="20" @focus="inputFocus" @input="inputEvent" :value="inputReason" class="reason-textarea"></textarea>
                <view class="reason-btn" @tap="sureReason">确认</view>
            </view>
        </van-popup>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanUploader from './@vant/weapp/uploader/index';
// pages/order/applyReturn/applyReturn.js
const app = getApp();
export default {
    components: {
        // vanPopup,
        // vanUploader
    },
    data() {
        return {
            fileList: [],
            reasonBox: false,
            citInfo: [],
            reason: '',
            refundImageUuid: '',
            isAllRefund: true,
            supplementary: '',

            //说明
            inputReason: '',

            refundReason: [
                //退货原因
                {
                    name: '不喜欢/不是自己想要的'
                },
                {
                    name: '商品质量问题'
                },
                {
                    name: '收到的商品破损、损坏'
                },
                {
                    name: '商品出现了错发、漏发'
                },
                {
                    name: '发票的问题'
                },
                {
                    name: '收到商品与店铺描述不符合'
                },
                {
                    name: '其他'
                }
            ],

            actualMoney: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let data = {
            uniqueId: options.uniqueId
        };
        app.globalData.sjrequest('/order/queryCityInfo', data).then((res) => {
            if (res.data.code == 200) {
                if (options.selfUniqueId) {
                    this.setData({
                        isAllRefund: false
                    });
                    res.data.data.commList.forEach((item) => {
                        if (item.uniqueId == options.selfUniqueId) {
                            res.data.data.commList = [];
                            res.data.data.commList.push(item);
                            return;
                        }
                    });
                }

                this.setData({
                    citInfo: res.data.data
                });
            }
        });
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
     */ methods: {
        // 上传图片
        uploadImage() {
            const _this = this;

            uni.chooseImage({
                count: 6 - _this.fileList.length,
                sizeType: ['compressed'],
                sourceType: ['album'],

                success(res) {
                    res.tempFilePaths.forEach((item, index) => {
                        _this.fileList.push(item);
                    });

                    _this.setData({
                        fileList: _this.fileList
                    });
                }
            });
        },

        // 放大图片
        zoomImg(e) {
            const { src, list } = e.currentTarget.dataset;
            uni.previewImage({
                current: src,
                // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            });
        },

        // 删除图片
        delImg(e) {
            const { index } = e.currentTarget.dataset;
            let imgList = this.fileList;
            imgList.splice(index, 1);
            this.setData({
                fileList: imgList
            });
        },

        // 拒绝退货
        refund() {
            this.setData({
                reasonBox: true
            });
        },

        // 取消拒绝退货
        refundOnClose() {
            this.setData({
                reasonBox: false
            });
        },

        // 选择拒绝原因
        radioChange(e) {
            const refundReason = this.refundReason;

            for (let i = 0, len = refundReason.length; i < len; ++i) {
                refundReason[i].checked = refundReason[i].name === e.detail.value;
            }

            this.setData({
                refundReason
            });
        },

        // 输入原因
        inputEvent(e) {
            this.setData({
                inputReason: e.detail.value
            });
        },

        inputText(e) {
            this.setData({
                supplementary: e.detail.value
            });
        },

        //确认原因
        sureReason() {
            this.refundReason.forEach((item) => {
                if (item.checked) {
                    this.setData({
                        reason: item.name
                    });
                }
            });

            if (this.reason == '其他') {
                if (this.inputReason == '') {
                    uni.showToast({
                        title: '请输入退款原因',
                        icon: 'none'
                    });
                    this.setData({
                        reason: ''
                    });
                    return;
                } else {
                    this.setData({
                        reason: this.inputReason
                    });
                }
            }

            this.setData({
                reasonBox: false,
                inputReason: ''
            });
        },

        // 选择其他
        inputFocus() {
            const refundReason = this.refundReason;

            for (let i = 0, len = refundReason.length; i < len; ++i) {
                refundReason[i].checked = refundReason[i].name == '其他';
            }

            this.setData({
                refundReason
            });
        },

        // 上传图片
        upload(count) {
            const _this = this;

            var fxToken = uni.getStorageSync('token');
            uni.uploadFile({
                url: app.globalData.imgUrl2,
                //仅为示例，非真实的接口地址
                filePath: _this.fileList[count],
                name: 'imgs',
                formData: _this.refundImageUuid
                    ? {
                          uuid: _this.refundImageUuid,
                          token: uni.getStorageSync('token')
                      }
                    : {
                          token: uni.getStorageSync('token')
                      },
                header: {
                    token: fxToken,
                    'Content-Type': 'multipart/form-data',
                    //form-data格式
                    Accept: 'application/json'
                },

                complete(res) {
                    console.log(res);
                    count++;

                    _this.setData({
                        refundImageUuid: JSON.parse(res.data).data.imgUuid
                    });

                    if (count == _this.fileList.length) {
                        // 图片上传完毕，去上传文字
                        _this.sureRefund();
                    } else {
                        _this.upload(count);
                    }
                }
            });
        },

        // 提交评论
        submit() {
            if (this.reason == '') {
                uni.showToast({
                    title: '请选择退货原因',
                    icon: 'none'
                });
                return;
            }

            uni.showLoading({
                title: '发布中',
                mask: true
            });

            if (this.fileList.length == 0) {
                this.sureRefund();
            } else {
                this.upload(0);
            }
        },

        //确认退货
        sureRefund() {
            let that = this;

            if (this.isAllRefund) {
                var data = {
                    uniqueId: this.citInfo.uniqueId,
                    reason: this.reason,
                    orderId: this.citInfo.orderId,
                    supplementary: this.supplementary
                };
            } else {
                var data = {
                    uniqueId: this.citInfo.commList[0].uniqueId,
                    reason: this.reason,
                    supplementary: this.supplementary,
                    orderId: this.citInfo.orderId,
                    orderCommodityId: this.citInfo.commList[0].orderCommodityId
                };
            }

            data.refundImageUuid = this.refundImageUuid;
            var token = uni.getStorageSync('token');
            let appid = uni.getStorageSync('appid');
            let data2s = {
                authorizerAppid: appid,
                sceneType: 3
            };
            app.globalData.mb2request('/subTemplate/listPriTemplateId', data2s).then((res) => {
                let tempData = res.data.data;
                uni.requestSubscribeMessage({
                    tmplIds: tempData,
                    success: function (res) {
                        let data3s = {
                            status: 1,
                            marchantId: that.citInfo.marchantId,
                            templateIds: tempData,
                            appId: appid,
                            targetId: that.citInfo.orderId,
                            targetType: 4
                        };
                        app.globalData.sjrequest('/basic/addsubscription', data3s).then((res) => {});
                    },
                    complete: function () {
                        app.globalData.sjrequest1('/order/fastchargeback', data, token).then((res) => {
                            if (res.data.code == 200) {
                                uni.showToast({
                                    title: '已发起申请',
                                    icon: 'none',
                                    duration: 2000
                                });
                                setTimeout((res) => {
                                    uni.navigateBack({
                                        delta: 2
                                    });
                                }, 2000);
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                });
                            }
                        });
                    }
                });
            });
        }
    }
};
</script>
<style>
.applyReturn {
    background: #f2f2f2;
    min-height: 100vh;
}
.applyReturn .goods {
    padding-top: 20rpx;
    box-sizing: border-box;
    font-weight: 400;
    margin-top: 20rpx;
}
.applyReturn .goods .goods-shop {
    height: 80rpx;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 30rpx 0 0 30rpx;
}
.applyReturn .goods .goods-shop .shop-logo {
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
}
.applyReturn .goods .goods-shop .shop-title {
    padding: 0 10rpx 0 6rpx;
    height: 40px;
    line-height: 40px;
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
}
.applyReturn .goods .goods-shop .shop-enter {
    width: 10rpx;
    height: 20rpx;
}
.applyReturn .goods .goods-list {
    background: #ffffff;
    padding-left: 30rpx;
}
.applyReturn .goods .goods-list .goods-item {
    display: flex;
    padding-bottom: 40rpx;
}
.applyReturn .goods .goods-list .goods-item .goods-left .goods-logo {
    width: 170rpx;
    height: 170rpx;
    border-radius: 20rpx;
}
.applyReturn .goods .goods-list .goods-item .goods-right {
    padding-left: 20rpx;
}
.applyReturn .goods .goods-list .goods-item .goods-right .goods-info {
    height: 170rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.applyReturn .goods .goods-list .goods-item .goods-right .goods-info .goods-name {
    font-size: 26rpx;
    font-weight: 400;
    line-height: 38rpx;
    color: #333333;
    width: 440rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.applyReturn .goods .goods-list .goods-item .goods-right .goods-info .goods-spec {
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}
.applyReturn .goods .goods-list .goods-item .goods-right .goods-info .goods-num {
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}
.applyReturn .goods .goods-list .goods-item .goods-right .goods-info .goods-price {
    width: 498rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: #ec1919;
}
.applyReturn .info {
    margin-top: 20rpx;
    background: #ffffff;
    padding: 30rpx;
}
.applyReturn .info .info-item {
    margin-top: 20rpx;
}
.applyReturn .info .info-item .info-content {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
    display: flex;
    margin-top: 20rpx;
}
.applyReturn .info .info-item .info-content .info-choose {
    height: 40rpx;
    font-size: 26rpx;
    color: #cccccc;
    display: flex;
    align-items: center;
}
.applyReturn .info .info-item .info-content .info-choose .info-enter {
    width: 16rpx;
    height: 30rpx;
    padding-left: 10rpx;
}
.applyReturn .info .info-item .info-content .info-money {
    color: #ec1919;
}
.applyReturn .certificate {
    margin-top: 20rpx;
    background: #ffffff;
    padding: 30rpx;
}
.applyReturn .certificate .certificate-title {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
    margin-bottom: 20rpx;
}
.applyReturn .btnBox {
    padding: 40rpx;
    background: #ffffff;
}
.applyReturn .btnBox .btn {
    width: 670rpx;
    background: #101010;
    box-shadow: 0rpx 10rpx 20rpx rgba(0, 0, 0, 0.16);
    border-radius: 100rpx;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 100rpx;
    color: #ffffff;
    text-align: center;
}
.applyReturn .reasonBox .reason-title {
    font-size: 36rpx;
    font-weight: bold;
    line-height: 50rpx;
    color: #333333;
    text-align: center;
    margin: 30rpx auto;
}
.applyReturn .reasonBox .reason-content {
    padding: 0 40rpx;
}
.applyReturn .reasonBox .reason-content .reason-item {
    height: 80rpx;
    border-bottom: 2rpx solid #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.applyReturn .reasonBox .reason-content .reason-item .reason-name {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
}
.applyReturn .reasonBox .reason-content .reason-textarea {
    width: 100%;
    height: 138rpx;
    border: 1rpx solid #cccccc;
    padding: 10rpx;
    box-sizing: border-box;
}
.applyReturn .reasonBox .reason-content .reason-btn {
    margin: 40rpx 0;
    width: 100%;
    height: 100rpx;
    background: #101010;
    box-shadow: 0rpx 10rpx 20rpx rgba(0, 0, 0, 0.16);
    border-radius: 100rpx;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 100rpx;
    text-align: center;
    color: #ffffff;
}
.content-image {
    padding-bottom: 40rpx;
    display: flex;
    flex-wrap: wrap;
}
.image-box {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    margin: 30rpx 30rpx 0 0;
}
.image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.image-del {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    top: 0;
    right: 0;
}
.uploadImg {
    width: 200rpx;
    height: 200rpx;
    background: #f2f2f2;
    margin: 30rpx 30rpx 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.uploadImg-btn {
    width: 68rpx;
    height: 61rpx;
}
.info-input {
    width: 0;
    flex: 1;
}
</style>
