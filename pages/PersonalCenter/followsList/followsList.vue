<template>
    <view>
        <no-data text="快去关注商家吧~" url="https://xssj.letterbook.cn/applet/images/home_empty_bg.png" v-if="!followsList.length"></no-data>
        <view class="follow-list">
            <van-swipe-cell :right-width="' ' + 65 + ' '" class="follow-list-cell van-swipe-cell" v-for="(item, index) in followsList" :key="index">
                <navigator :url="'/pages/shopHome/home/home?marchantId=' + item.id">
                    <view class="follow-item">
                        <view style="display: flex">
                            <image class="touxiang" :src="item.logoPic" mode="aspectFill"></image>
                            <view class="follow-content">
                                <view style="display: flex; margin: 14rpx 0 12rpx; align-items: center">
                                    <view class="follow-name">{{ item.nickName }}</view>
                                </view>
                                <view class="follow-content-info">
                                    <view class="follow-star-list" v-for="(item, index1) in 5" :key="index1">
                                        <image style="width: 20rpx; height: 20rpx; margin-right: 2rpx" src="/static/pages/img/my/star.png"></image>
                                    </view>
                                    <text style="font-size: 22rpx; font-weight: 400; line-height: 30rpx; color: #da502d; height: 30rpx; margin-left: 4rpx">5分</text>
                                    <view style="width: 1px; height: 19rpx; background: #d2d2d2; margin-left: 8rpx; margin-right: 8rpx"></view>
                                    <view class="looked-man">{{ item.accessNumber || 0 }}访问数</view>
                                </view>
                                <view class="label-list">
                                    <view class="label-item" v-for="(item, index1) in item.labelsList" :key="index1">{{ item }}</view>
                                </view>
                            </view>
                        </view>
                        <view class="follow-content-botton">简介:{{ item.brief }}</view>
                    </view>
                </navigator>

                <view slot="right" class="del">
                    <!-- <text>取消\n关注</text> -->
                    <view class="delDiv" @tap="cancelFollow" :data-id="item.id" :data-index="index"><text>取消\n关注</text></view>
                    <!-- <view  class="delDiv" style="background:#bdbdbd"  bindtap="setFollow" data-item="{{item}}"><text>{{(item.isHome?'取消\n主页':'设置\n主页')}}</text></view> -->
                </view>
            </van-swipe-cell>
        </view>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// import vanSwipeCell from './@vant/weapp/swipe-cell/index';
// pages/PersonalCenter/followsList/followsList.js
const app = getApp();
export default {
    components: {
        noData,
        // vanSwipeCell
    },
    data() {
        return {
            pageCurr: 1,
            pageSize: 10,
            stopLoad: false,
            followsList: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getFollows();
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
    onReachBottom: function () {
        // if(this.data.stopLoad == false){
        //   this.getFollows()
        // }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 获取关注
        getFollows() {
            let data = {
                pageCurr: this.pageCurr,
                pageSize: this.pageSize
            };
            app.globalData.sjrequest('/marchant/queryConcerns', data).then((res) => {
                this.setData({
                    followsList: res.data.data
                });
            });
        },

        cancelFollow(e) {
            var that = this;
            uni.showModal({
                title: '提示',
                content: '确认取消关注吗？',
                success: function (sm) {
                    if (sm.confirm) {
                        // 用户点击了确定 可以调用删除方法了
                        var id = e.currentTarget.dataset.id;
                        var index = e.currentTarget.dataset.index;
                        var data = {
                            type: 2,
                            marchantId: id
                        };
                        app.globalData.sjrequest('/marchant/operateConcerns', data).then((res) => {
                            if (res.data.code == 200) {
                                that.followsList.splice(index, 1);
                                that.setData({
                                    followsList: that.followsList
                                });
                                uni.showToast({
                                    title: '取消成功',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                }
            });
        }
    }
};
</script>
<style>
/* 我的关注 */
.follow-list {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
}
.looked-box {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
}
.follow-item-box {
    padding-top: 15rpx;
    box-sizing: border-box;
}
.big-dot {
    width: 32rpx;
    height: 32rpx;
    background: #ebebeb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.small-dot {
    width: 16rpx;
    height: 16rpx;
    background: red;
    border-radius: 50%;
}
.looked-time {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 40rpx;
    color: #333333;
    margin-left: 20rpx;
}
.follow-item {
    width: 100%;
    padding: 30rpx 0;
    box-sizing: border-box;
    border-bottom: 1rpx solid #ddd;
    box-sizing: border-box;
}
.looked-item {
    width: 98%;
    padding: 0;
    border: none;
    border-left: 1rpx solid #ececec;
    padding-left: 15rpx;
    margin-left: 17rpx;
    padding-bottom: 24rpx;
    box-sizing: border-box;
}
.follow-list .follow-list-cell:last-child .looked-item {
    border: none;
}
.follow-item .touxiang {
    width: 271rpx;
    height: 193rpx;
    border-radius: 14rpx;
}
.follow-content {
    width: 0;
    flex: 1;
    margin-left: 20rpx;
}
.follow-name {
    max-width: 215rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 45rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 45rpx;
    color: #333333;
    margin-right: 20rpx;
}
.follow-content-info {
    display: flex;
    align-items: center;
}
.follow-star-list {
    display: flex;
}
.looked-man {
    height: 30rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #333333;
}
/* 标签 */
.label-list {
    display: flex;
    flex-wrap: wrap;
}
.label-item {
    height: 32rpx;
    background: #f8ecd2;
    border-radius: 4rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #005050;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10rpx;
    padding: 0 10rpx;
    margin-top: 10rpx;
}
.follow-content-botton {
    font-size: 29rpx;
    margin-top: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.del {
    width: 130rpx;
    height: 100%;
    color: #ffffff;
    background-color: #ec1919;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.delDiv {
    width: 100%;
    height: 50%;
    text-align: center;
    line-height: 50rpx;
    box-sizing: border-box;
    padding: 60rpx 0;
}
.delDivTextOne {
    border-bottom: 1px solid #fff;
}
</style>
