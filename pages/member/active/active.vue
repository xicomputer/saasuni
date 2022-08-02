<template>
    <view class="active">
        <view class="member">
            <!-- 必填信息 -->
            <view class="member_item">
                <view class="member_title">
                    必填信息
                    <view class="member_content_desc" @tap="selectAddress">从收货地址导入</view>
                </view>
                <view class="member_content">
                    <view class="member_content_item">
                        <view class="member_content_label">姓名</view>
                        <input class="member_content_input" :value="name" maxlength="10" @input="inputName" />
                    </view>
                    <view class="member_content_item">
                        <view class="member_content_label">电话</view>
                        <input class="member_content_input" :value="tel" @blur="inputTel" type="number" maxlength="11" />
                    </view>
                </view>
            </view>
            <!-- 选填信息 -->
            <view class="member_item">
                <view class="member_title">选填信息</view>
                <view class="member_content">
                    <view class="member_content_item">
                        <view class="member_content_label" style="width: 128rpx">详情地址</view>
                        <view class="member_content_input" style="font-size: 28rpx; display: flex; justify-content: flex-end">
                            <text>{{ shipping.provincesName ? shipping.provincesName + shipping.cityName + shipping.areaName + shipping.address : '请从收货地址导入' }}</text>
                        </view>
                        <!-- <image src="/pages/img/member/icon_enter.png"></image> -->
                    </view>
                </view>
            </view>
            <!-- 阅读文档 -->
            <view @tap="changeRead" class="member_read">
                <icon :color="isRead ? '#04BE01' : '#CCCCCC'" type="success" size="24rpx" class="member_read_icon"></icon>
                <view class="member_read_text">我已阅读并同意</view>
                <view class="member_read_doc" @tap.stop.prevent="toExplain">会员卡信息使用声明</view>
            </view>
            <!-- 激活按钮 -->
            <view class="member_btn" @tap="comfirmActive">立即激活</view>
        </view>
        <!-- 订阅提示 -->
        <view class="subscribe-notice-box">
            <view class="subscribe-notice-top">
                <image class=""></image>
            </view>
        </view>
    </view>
</template>

<script>
// pages/member/active/active.js
const app = getApp();
export default {
    data() {
        return {
            isRead: true,
            //是否已阅读
            marchantId: 0,
            // 商家id
            id: 0,
            name: '',
            // 姓名
            tel: '',
            // 手机号
            shipping: {
                provincesName: false,
                cityName: '',
                areaName: '',
                address: ''
            },
            // 地址
            province: '',
            // 省的编码
            city: '',
            // 市的编码
            area: '' // 区的编码
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            marchantId: options.marchantId
        });

        if (options.id) {
            this.setData({
                id: options.id
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
        // 立即激活
        comfirmActive() {
            uni.showLoading({
                title: '激活中',
                mask: true
            });

            if (this.name == '') {
                uni.showToast({
                    title: '请输入姓名',
                    icon: 'none'
                });
                return;
            }

            if (this.tel == '') {
                uni.showToast({
                    title: '请输入手机号',
                    icon: 'none'
                });
                return;
            }

            let data = {
                marchantId: this.marchantId,
                name: this.name,
                phone: this.tel
            };

            if (this.area) {
                data.area = this.area;
            }

            if (this.city) {
                data.city = this.city;
            }

            if (this.province) {
                data.province = this.province;
            }

            if (this.id && this.id != 'null') {
                data.id = this.id;
            }

            data.address = this.address;
            app.globalData.sjrequest('/member/addMemberApply', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    uni.showToast({
                        title: '激活成功'
                    });
                    setTimeout((res) => {
                        uni.navigateBack({
                            delta: 0
                        });
                    }, 1000);
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        changeRead() {
            this.setData({
                isRead: !this.isRead
            });
        },

        // 输入姓名
        inputName(e) {
            this.setData({
                name: e.detail.value
            });
        },

        // 输入电话
        inputTel(e) {
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证手机号的正则表达式

            if (!reg.test(e.detail.value)) {
                this.setData({
                    tel: ''
                });
                uni.showToast({
                    title: '请输入正确的手机号码',
                    icon: 'none'
                });
            } else {
                this.setData({
                    tel: e.detail.value
                });
            }
        },

        // 说明
        toExplain() {
            uni.navigateTo({
                url: '/pages/member/explain/explain'
            });
        },

        // 跳转收货地址
        selectAddress() {
            app.globalData.comefrom = 'member';
            uni.navigateTo({
                url: '/pages/Address/AddressList/AddressList'
            });
        }
    }
};
</script>
<style>
.active {
    min-height: 100vh;
    background: #f8f8f8;
    padding-top: 20rpx;
    box-sizing: border-box;
}
.member {
    width: 710rpx;
    height: 590rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx #f7f7f7;
    border-radius: 20rpx;
    margin: 0 auto;
    padding-left: 30rpx;
    box-sizing: border-box;
}
.member_item {
    width: 100%;
}
.member_title {
    margin-top: 10rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    border-bottom: 2rpx solid #f4f4f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.member_content {
    width: 100%;
}
.member_content_item {
    height: 72rpx;
    border-bottom: 2rpx solid #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.member_content_item image {
    width: 14rpx;
    height: 26rpx;
    margin-right: 32rpx;
}
.member_content_label {
    width: 64rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: #000000;
}
.member_content_input {
    width: 0;
    flex: 1;
    padding: 0 20rpx;
    box-sizing: border-box;
    margin: 0 20rpx;
}
.member_content_desc {
    padding: 0 20rpx;
    border: none;
    background-color: #fff;
    width: fit-content;
    white-space: nowrap;
    font-size: 24rpx;
    font-weight: bold;
    color: #04be01;
    margin-right: 18rpx;
}
/* 阅读文档 */
.member_read {
    margin: 36rpx 0;
    font-size: 24rpx;
    font-weight: 400;
    display: flex;
    align-items: center;
}
.member_read_icon {
    margin-right: 16rpx;
}
.member_read_text {
    color: #666666;
}
.member_read_doc {
    color: #426ec3;
}
/* 激活按钮 */
.member_btn {
    width: 658rpx;
    height: 74rpx;
    background: #04be01;
    border-radius: 16rpx;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 74rpx;
    text-align: center;
    margin: 8rpx auto 0;
}
</style>
