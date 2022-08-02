<template>
    <view class="member">
        <navigator
            :url="'/pages/member/card/card?marchantId=' + item.marchantId"
            class="member_item"
            style="background-image: url(https://xssj.letterbook.cn/applet/images/memberList_bg1.png)"
            v-for="(item, index) in memberList"
            :key="index"
        >
            <image :src="item.marchant.logoPic" mode="aspectFill"></image>

            <view class="member_item_info">
                <view class="member_item_name">{{ item.marchant.nickName }}</view>
                <view class="member_item_desc">
                    <view class="member_item_level">{{ item.memberLevel.name }}</view>
                    <view class="member_item_score">会员积分{{ item.integral || 0 }}</view>
                </view>
            </view>
        </navigator>
        <no-data text="您还没有会员卡哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img6.png" v-if="!memberList.length && reqComplete"></no-data>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// pages/member/list/list.js
const app = getApp();
export default {
    components: {
        noData
    },
    data() {
        return {
            memberList: [],
            // 会员卡列表
            reqComplete: '' //请求完成状态
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        uni.showLoading({
            title: '加载中'
        });
        this.getMemberList();
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
        getMemberList() {
            app.globalData.sjrequest('/member/queryMemberList', {}).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        memberList: res.data.data,
                        reqComplete: true
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        }
    }
};
</script>
<style>
.member {
    width: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;
}
.member_item {
    width: 746rpx;
    height: 216rpx;
    background-size: 746rpx 216rpx;
    background-repeat: no-repeat;
    background-position: center;
    padding: 52rpx 0 64rpx 46rpx;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
}
.member_item image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
}
.member_item_info {
    margin-left: 22rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.member_item_name {
    font-size: 32rpx;
    font-weight: bold;
    line-height: 44prx;
    color: #ffffff;
}
.member_item_desc {
    font-size: 24rpx;
    font-weight: bold;
    line-height: 34rpx;
    color: #ffffff;
}
.member_item_level {
    display: inline;
}
.member_item_score {
    display: inline;
    margin-left: 40rpx;
}

/* 空列表样式 */
.empty-list-box {
    height: 300rpx;
    font-size: 30rpx;
    color: #ccc;
}
</style>
