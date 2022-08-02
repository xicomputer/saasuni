<template>
    <view class="invoice-container">
        <view class="Invoice">
            <view class="Invoice-item">
                <view class="left">
                    <view class="fuhao">*</view>
                    <view class="cpy-name">公司名称</view>
                </view>
                <view class="right">
                    <input type="text" @blur="updateName" placeholder="请输入公司名称" maxlength="30" />
                </view>
            </view>
            <view class="Invoice-item">
                <view class="left">
                    <view class="fuhao">*</view>
                    <view class="cpy-name">公司税号</view>
                </view>
                <view class="right">
                    <input type="text" @input="updateNumber" :value="number" maxlength="18" placeholder="请输入公司税号" />
                </view>
            </view>
            <view class="Invoice-item">
                <view class="left">
                    <view class="fuhao">*</view>
                    <view class="cpy-name">电子邮箱</view>
                </view>
                <view class="right">
                    <input type="text" @blur="updateEmail" placeholder="用于向您发送电子发票" maxlength="25" />
                </view>
            </view>
            <view class="default_list">
                <view class="default_left">
                    <view class="default_text1">设置默认发票</view>
                    <view class="default_text2">提醒：每次下单会默认推荐使用该发票</view>
                </view>
                <image src="/static/pages/img/xuanze.png" @tap="onChange" v-if="checked" class="check_default_icon" />
                <image src="/static/pages/img/weixuan.png" @tap="onChange" v-if="!checked" class="check_default_icon" />
            </view>
        </view>
        <view class="addlist-footer-btn">
            <view class="saveBtn" @tap="Save">保存</view>
        </view>
    </view>
</template>

<script>
// pages/Invoice/NewInvoice/NewInvoice.js
const app = getApp();
export default {
    data() {
        return {
            checked: true,
            name: '',
            number: '',
            email: '',
            orderData: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
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
        onChange() {
            this.setData({
                checked: !this.checked
            });
        },

        Save() {
            console.log(111);

            if (this.name == '') {
                uni.showToast({
                    icon: 'none',
                    title: '请输入公司名称'
                });
                return;
            }

            if (this.number == '') {
                uni.showToast({
                    icon: 'none',
                    title: '请输入公司税号'
                });
                return;
            }

            if (this.email == '') {
                uni.showToast({
                    icon: 'none',
                    title: '请填写邮箱地址'
                });
                return;
            }

            var myReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

            if (myReg.test(this.email)) {
                console.log('true');
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '邮箱号错误'
                });
                return;
            }

            uni.showLoading({
                title: '保存中',
                mask: true
            });
            let data = {
                companyName: this.name,
                companyDp: this.number,
                email: this.email,
                isDefault: this.checked ? 1 : 0
            };
            app.globalData.sjrequest('/commodity/addInvoice', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    console.log(res.data.data);
                    let pages = getCurrentPages();
                    let prevPge = pages[pages.length - 2];
                    uni.navigateBack({
                        delta: 0,
                        success: (res) => {
                            // prevPge.showInvoiceList();
                        },
                        fail: (res) => {},
                        complete: (res) => {}
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        updateName(e) {
            this.setData({
                name: e.detail.value.trim()
            });
        },

        updateNumber(e) {
            let value = this.validateNumber(e.detail.value);
            this.setData({
                number: value
            });
        },

        // 校验只能输入数字,英文
        validateNumber(val) {
            return val.replace(/[\W]/g, '');
        },

        updateEmail(e) {
            this.setData({
                email: e.detail.value
            });
        }
    }
};
</script>
<style>
.invoice-container {
    min-height: 100vh;
}
.Invoice {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
}
.Invoice-item {
    width: 100%;
    height: 116rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #ececec;
}
.left {
    display: flex;
    height: 44rpx;
    align-items: center;
}
.fuhao {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(236, 25, 25, 1);
    opacity: 1;
}
.cpy-name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
    opacity: 1;
    margin-left: 4rpx;
}

.right input {
    text-align: right;
    width: 100%;
    font-size: 32rpx;
    border: none;
    color: #333;
}
.invoice-btn {
    width: 90%;
    height: 100rpx;
    background: rgba(16, 16, 16, 1);
    box-shadow: 0px 10rpx 20rpx rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 50px;
    line-height: 50px;
    margin: 0 auto;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: center;
    position: fixed;
    bottom: 40rpx;
    z-index: 99;
    margin: 0 5%;
}
.default_list {
    width: 690rpx;
    height: 170rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1rpx solid #ececec;
}

.default_text1 {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333;
    margin-bottom: 28rpx;
}

.default_text2 {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ccc;
}

.check_default_icon {
    width: 76rpx;
    height: 40rpx;
}
.addlist-footer-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 210rpx;
}
.saveBtn {
    width: 90%;
    height: 100rpx;
    background: rgba(255, 83, 64, 1);
    box-shadow: 0px 0px 28rpx 8rpx rgba(0, 0, 0, 0.05);
    border-radius: 50rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    line-height: 100rpx;
    color: rgba(255, 255, 255, 1);
    margin: 40rpx 5% 0;
}
</style>
