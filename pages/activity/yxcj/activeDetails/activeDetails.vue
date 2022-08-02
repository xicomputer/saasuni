<template>
    <view>
        <!-- <navigator wx:if="{{buton}}" url="/pages/AuthLogin/AuthLogin" class="butt" >授权登录</navigator> -->
        <view v-if="buton"></view>
        <web-view v-else :src="'https://xssj.letterbook.cn/?applet_token=' + token + '&activityId=' + activityId + '&marchant=' + marchant + '#/yxcj/' + tag"></web-view>
    </view>
</template>

<script>
// pages/activity/yxcj/activeDetails/activeDetails.js
const app = getApp();
export default {
    data() {
        return {
            tag: '',
            token: '',
            marchant: '',
            activityId: '',
            buton: true
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        app.globalData.options = options;
        this.setData({
            tag: options.tag,
            token: uni.getStorageSync('token'),
            marchant: options.marchantId,
            activityId: options.activityId
        });
        let that = this; //查看是否授权

        uni.getSetting({
            success: function (res) {
                if (uni.getStorageSync('wx_userinfo_key')) {
                    // 已授权
                    if (that.token) {
                        that.setData({
                            buton: false
                        });
                    } else {
                        uni.navigateTo({
                            url: '/pages/shopHome/home/home'
                        });
                    }
                } else {
                    uni.navigateTo({
                        url: '/pages/shopHome/home/home'
                    }); //用户没有授权

                    that.setData({
                        buton: true
                    });
                }
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
    onUnload: function () {
        app.globalData.options = {};
    },
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
    methods: {}
};
</script>
<style>
/* pages/activity/yxcj/activeDetails/activeDetails.wxss */
</style>
