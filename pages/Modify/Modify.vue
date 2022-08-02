<template>
    <!-- pages/Modify/Modify.wxml -->
    <view style="background: #f5f5f5; min-height: 100vh">
        <view class="signature_headers">
            <!-- <view class="signature_cancel" bindtap="cancel">取消</view> -->
            <view v-if="active" class="signature_determine signature_determine-acative" @tap="signatureSure">完成</view>
            <view v-else class="signature_determine" @tap="signatureSure">完成</view>
        </view>
        <van-field :value="signatureData" type="textarea" @input="InputContent" placeholder="请输入个性签名~" maxlength="30" show-word-limit autosize />
    </view>
</template>

<script>
// import vanField from './@vant/weapp/field/index';
// pages/Modify/Modify.js
export default {
    components: {
        // vanField
    },
    data() {
        return {
            signatureData: '',
            active: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var signature = uni.getStorageSync('signature');
        this.setData({
            signatureData: signature
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
        // onDescribe:function(e){
        //   this.setData({
        //     signatureData:e.detail.value,
        //   })
        // },
        InputContent: function (e) {
            var that = this;
            that.setData({
                signatureData: e.detail.trim()
            });

            if (that.signatureData == '' || that.signatureData == undefined) {
                that.setData({
                    active: false
                });
            } else {
                that.setData({
                    active: true
                });
            }
        },

        cancel: function () {
            uni.switchTab({
                url: '/pages/tabPage/me/me'
            });
        },

        signatureSure: function () {
            var that = this;
            var token = uni.getStorageSync('token');

            if (!that.signatureData) {
                uni.showToast({
                    title: '请输入个性签名',
                    icon: 'none'
                });
                return;
            } else {
                uni.request({
                    //接口，
                    url: 'https://xssj.letterbook.cn/xssj-third/userRegister/upUserInfo',
                    header: {
                        token: token,
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        signature: that.signatureData
                    },
                    method: 'POST',
                    success: function (res) {
                        uni.setStorageSync('signature', that.signatureData);
                        uni.showToast({
                            title: '修改成功',
                            icon: 'none'
                        });
                        setTimeout((res) => {
                            uni.switchTab({
                                url: '/pages/tabPage/me/me'
                            });
                        }, 1000);
                    },
                    fail: function () {
                        doFail();
                    }
                });
            }
        }
    }
};
</script>
<style>
/* pages/Modify/Modify.wxss */
.signature_headers {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    background: #fff;
    height: 88rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
}

.signature_cancel {
    font-size: 28rpx;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
}

.signature_determine {
    width: 90rpx;
    height: 50rpx;
    background: #fff;
    border-radius: 10rpx;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 50rpx;
    text-align: center;
}

.signature_determine-acative {
    background: #ff5340;
    color: #fff;
}
</style>
