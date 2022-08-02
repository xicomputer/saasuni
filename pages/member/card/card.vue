<template>
    <view class="member">
        <!-- 头部 -->
        <view
            class="member_head"
            style="
                background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E6%BF%80%E6%B4%BB%E4%BC%9A%E5%91%98bgc.png);
            "
        >
            <navigator v-if="type != 0" class="member-explain" :url="'/pages/member/level/level?marchantId=' + marchantId">
                <text>会员等级说明</text>
                <image style="width: 32rpx; height: 32rpx" src="/static/pages/img/member/menber_explain.png"></image>
            </navigator>
            <view class="member_head_left">
                <!-- {{memberInfo.userRegister.headimgurl||memberInfo.merchantInfo.logoPic}} -->
                <image :src="cartShop.headImage" mode="aspectFill"></image>
                <view class="member_head_left_info">
                    <!-- {{memberInfo.userRegister.nickname||memberInfo.merchantInfo.nickName}} -->
                    <view class="member_head_left_name">{{ cartShop.appName }}</view>
                    <view class="member_head_left_desc">{{ memberInfo.merchantInfo.nickName }}会员卡</view>
                </view>
            </view>
            <block v-if="type != 0">
                <!-- <view wx:if="{{vipLevel==0}}" class="member_head_right">
        <image src="/pages/img/member/memberCard_vip2.png" mode="aspectFill"></image>
        <view style="color: #999999;">普通会员</view>
      </view> -->
                <view class="member_head_right">
                    <image src="/static/pages/img/member/memberCard_vip1.png" mode="aspectFill"></image>
                    <view>{{ memberInfo.memberLeve.name }}</view>
                </view>
            </block>
        </view>
        <block v-if="type != 0">
            <!-- 工具 -->
            <view class="member_tool">
                <navigator class="member_tool_item" :url="'/pages/member/integral/integral?marchantId=' + marchantId + '&integral=' + memberInfo.member.integral">
                    <view class="member_tool_item_name">会员积分</view>
                    <view class="member_tool_item_desc">{{ memberInfo.member.integral }}</view>
                </navigator>
                <view class="member_tool_item_line"></view>
                <navigator class="member_tool_item" :url="'/pages/member/level/level?marchantId=' + marchantId">
                    <view class="member_tool_item_name">等级</view>
                    <view class="member_tool_item_desc">{{ memberInfo.memberLeve.name }}</view>
                </navigator>
                <view class="member_tool_item_line"></view>
                <navigator class="member_tool_item" :url="'/pages/Index/couponList/couponList?marchantId=' + marchantId">
                    <view class="member_tool_item_name">会员优惠券</view>
                    <view class="member_tool_item_desc">查看</view>
                </navigator>
            </view>
        </block>
        <block v-else>
            <!-- 激活按钮 -->
            <view class="member_btn">
                <navigator
                    v-if="memberInfo.memberApply.audit != 0"
                    class="member_btn-state"
                    :url="'/pages/member/active/active?marchantId=' + marchantId + '&id=' + memberInfo.memberApply.id"
                >
                    激活会员卡
                </navigator>
                <view v-if="memberInfo.memberApply.audit == 0" class="member_btn-state" style="background: #ccc; border: none">商家审核中</view>
            </view>
        </block>
        <!-- 拒绝状态 -->
        <view class="refund-state-box" v-if="memberInfo.memberApply.audit == 2">
            <view class="refund-title">商家已拒绝您的会员申请</view>
            <view class="refund-reason">拒绝理由：{{ memberInfo.memberApply.refuse }}</view>
            <view class="refund-text">
                你可以
                <view class="refund-text-btn" @tap="contactStore">1.联系商家</view>
                <navigator :url="'/pages/member/active/active?marchantId=' + marchantId + '&id=' + memberInfo.memberApply.id" class="refund-text-btn">
                    2.点击重新激活会员卡
                </navigator>
            </view>
        </view>
        <!-- 列表 -->
        <view class="membere_list">
            <block v-if="type != 0">
                <view class="membere_list_item" @tap="returnShop">
                    <view class="membere_list_item_left">进入店铺</view>
                    <image src="/static/pages/img/member/icon_enter.png" class="membere_list_item_right"></image>
                </view>
            </block>
            <navigator v-if="type != 0" class="membere_list_item" :url="'/pages/member/details/details?marchantId=' + marchantId">
                <view class="membere_list_item_left">会员卡详情</view>
                <image src="/static/pages/img/member/icon_enter.png" class="membere_list_item_right"></image>
            </navigator>
            <!-- <navigator class="membere_list_item" url="/pages/member/illustrate/illustrate">
      <view class="membere_list_item_left">会员卡说明:</view>
      <image src="/pages/img/member/icon_enter.png" class="membere_list_item_right"></image>
    </navigator> -->
            <view class="explain-container">
                <view class="explain-title">会员说明：</view>
                <view class="explaine-text">1、会员卡是商家为您提供尊贵服务的凭证，持有会员卡在购买会员商品时能享受会员折扣;</view>
                <view class="explaine-text">
                    2、点击“激活会员卡”向商家申请会员卡，需要商家进行审核，若审核通过后即可成为普通会员；若审核不通过，会在本页面显示商家拒绝理由，您可以联系商家进行沟通后重新激活会员卡;
                </view>
                <view class="explaine-text">
                    3、首次成为会员，成为基础会员等级 “普通会员”，普通会员不享受会员折扣权益，但能通过购买商品获得积分，升级会员等级，级别越高，折扣力度越大；
                </view>
                <view class="explaine-text">4、不同商家的会员规则稍有不同，具体会员规则详情请成为会员后，在会员卡区查看。</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/member/card/card.js
const app = getApp();
export default {
    data() {
        return {
            // vipLevel: 1, //会员等级 0-普通会员
            type: 0,

            //激活状态 0-未激活，1-已激活
            marchantId: 0,

            // 商家id
            memberInfo: {
                merchantInfo: {
                    nickName: ''
                },

                memberLeve: {
                    name: ''
                },

                member: {
                    integral: ''
                },

                memberApply: {
                    audit: 0,
                    id: '',
                    refuse: ''
                }
            },

            // 会员信息
            cartShop: {
                headImage: '',
                appName: ''
            },

            nowTabbarText: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        app.globalData.options = options;
        this.setData({
            cartShop: { ...app.globalData.setInfo }
        });
        this.setData({
            marchantId: options.marchantId
        }); //查看是否授权

        uni.getSetting({
            success: function (res) {
                if (uni.getStorageSync('wx_userinfo_key')) {
                } else {
                    uni.navigateTo({
                        url: '/pages/shopHome/home/home'
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
    onShow: function () {
        this.getMemberInfo();
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
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.memberInfo.merchantInfo.nickName,
            path: '/pages/member/card/card?marchantId=' + this.marchantId,
            imageUrl: ''
        };
    },
    methods: {
        getMemberInfo() {
            let data = {
                marchantId: this.marchantId,
                type: 1
            };
            app.globalData.sjrequest('/member/queryMemberInfo', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        memberInfo: res.data.data
                    });

                    if (res.data.data.member) {
                        this.setData({
                            type: 1
                        });
                    }
                }
            });
        },

        contactStore() {
            uni.makePhoneCall({
                phoneNumber: this.memberInfo.merchantInfo.contactsMobile
            });
        },

        returnShop() {
            // wx.redirectTo({
            //   url: '/pages/shopHome/home/home',
            // })
            let pages = getCurrentPages(); //当前页面

            let prevPage = pages[pages.length - 2]; //上一页面

            prevPage.setData({
                nowTabbarText: '首页'
            });
            uni.redirectTo({
                url: '/pages/shopHome/home/home'
            });
        }
    }
};
</script>
<style>
.member {
    min-height: 100vh;
    background-color: #f8f8f8;
    padding-top: 20rpx;
    box-sizing: border-box;
}
/* 头部 */
.member_head {
    width: 710rpx;
    height: 266rpx;
    background-size: 710rpx 266rpx;
    background-repeat: no-repeat;
    background-position: center;
    padding: 20rpx 48rpx 166rpx 28rpx;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.member-explain {
    width: 176rpx;
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 32rpx;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 36rpx;
    right: 48rpx;
}
.member_head_left {
    display: flex;
}
.member_head_left image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
.member_head_left_info {
    margin-left: 28rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.member_head_left_name {
    font-size: 32rpx;
    font-weight: bold;
    line-height: 44rpx;
    color: #ffffff;
}
.member_head_left_desc {
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: #ffffff;
}
.member_head_right {
    display: flex;
    font-size: 22rpx;
    font-weight: bold;
    line-height: 32rpx;
    color: #333333;
}
.member_head_right image {
    width: 40rpx;
    height: 34rpx;
    margin-right: 14rpx;
}
/* 工具 */
.member_tool {
    height: 138rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2rpx solid #f4f4f4;
}
.member_tool_item_line {
    width: 0rpx;
    height: 78rpx;
    border: 2rpx solid #f4f4f4;
}
.member_tool_item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.member_tool_item_name {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    color: #000000;
}
.member_tool_item_desc {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
}
/* 激活按钮 */
.member_btn {
    border: 2rpx solid #f4f4f4;
}
.member_btn-state {
    width: 248rpx;
    height: 56rpx;
    border: 2rpx solid #333333;
    border-radius: 12rpx;
    font-size: 24rpx;
    color: #333333;
    font-weight: bold;
    line-height: 56rpx;
    text-align: center;
    margin: 40rpx auto 64rpx;
}
/* 拒绝状态 */
.refund-state-box {
    width: 100%;
    padding: 0 20rpx;
    box-sizing: border-box;
}
.refund-title {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #000000;
}
.refund-reason {
    width: 664rpx;
    height: 140rpx;
    background: #f4f4f4;
    border-radius: 12rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #666666;
    margin: 20rpx 0 20rpx 24rpx;
    padding: 12rpx 20rpx;
    box-sizing: border-box;
}
.refund-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.refund-text-btn {
    color: #002bff;
    width: fit-content;
    margin-left: 24rpx;
    margin-top: 20rpx;
}
/* 列表 */
.membere_list {
    width: 100%;
}
.membere_list_item {
    border-bottom: 2rpx solid #f4f4f4;
    width: 100%;
    height: 84rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.membere_list_item_left {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
}
.membere_list_item_right {
    width: 24rpx;
    height: 48rpx;
}
.explain-container {
    width: 100%;
    height: 100vh;
    padding: 40rpx 20rpx;
    box-sizing: border-box;
}
.explain-title {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #333333;
}
.explaine-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 34rpx;
    color: #333333;
    margin-top: 20rpx;
}
</style>
