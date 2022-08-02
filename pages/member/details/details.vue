<template>
    <view class="member">
        <view class="member_title">会员卡详情</view>
        <view class="member_item">
            <view class="member_item_label">会员等级</view>
            <view class="member_item_desc">{{ memberInfo.memberLeve.name }}</view>
        </view>
        <view class="member_item">
            <view class="member_item_label">有效期</view>
            <view class="member_item_desc">长期有效</view>
        </view>
        <view class="member_item">
            <view class="member_item_label">使用时段</view>
            <view class="member_item_desc">周一至周日 全天可用</view>
        </view>
        <view class="member_item">
            <view class="member_item_label">折扣率</view>
            <view class="member_item_desc">{{ memberInfo.memberLeve.discount }}折</view>
        </view>
        <view class="member_item">
            <view class="member_item_label">当前积分</view>
            <view class="member_item_desc">{{ memberInfo.member.integral }}</view>
        </view>
        <view class="member_item">
            <view class="member_item_label">是否可升级</view>
            <view class="member_item_desc">{{ memberInfo.memberLevel1 ? '是' : '否' }}</view>
        </view>
        <view class="member_item" v-if="memberInfo.memberLevel1.name">
            <view class="member_item_label">下一等级</view>
            <view class="member_item_desc">{{ memberInfo.memberLevel1.name }}</view>
        </view>
        <view class="member_QA">
            <view class="member_QA_q">Q：如何成为会员？</view>
            <view class="member_QA_a">A：申请激活会员，商家审核通过即可成为会员；或者直接联系商家成为会员。</view>
            <view class="member_QA_q">Q：怎么提升会员等级？</view>
            <view class="member_QA_a">A：通过消费获得会员积分，当积分累计到一定数量时自动升级。</view>
        </view>
    </view>
</template>

<script>
// pages/member/details/details.js
const app = getApp();
export default {
    data() {
        return {
            marchantId: 0,
            // 商家id
            memberInfo: {
                memberLeve: {
                    name: '',
                    discount: ''
                },

                member: {
                    integral: ''
                },

                memberLevel1: false
            } // 会员信息
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            marchantId: options.marchantId
        });
        this.getMemberInfo();
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
        getMemberInfo() {
            let data = {
                marchantId: this.marchantId,
                type: 2
            };
            app.globalData.sjrequest('/member/queryMemberInfo', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        memberInfo: res.data.data
                    });
                }
            });
        }
    }
};
</script>
<style>
.member {
    margin-left: 20rpx;
    background-color: #ffffff;
}
.member_title {
    height: 84rpx;
    font-size: 32rpx;
    font-weight: bold;
    line-height: 84rpx;
    color: #000000;
    border-bottom: 2rpx solid #f4f4f4;
    margin-bottom: 10rpx;
}
.member_item {
    margin-top: 30rpx;
    display: flex;
    align-items: center;
}
.member_item_label {
    width: 200rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #999999;
}
.member_item_desc {
    font-size: 24rpx;
    font-weight: 500;
    color: #333333;
}
.member_QA {
    padding: 80rpx 40rpx 0 20rpx;
    font-size: 24rpx;
    font-weight: 500;
    line-height: 34rpx;
}
.member_QA_q {
    color: #ff0000;
}
.member_QA_a {
    color: #333333;
}
</style>
