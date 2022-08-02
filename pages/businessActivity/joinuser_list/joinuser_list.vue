<template>
    <view>
        <view class="join-user-list" v-if="userList.length">
            <view style="margin-bottom: 40rpx" v-for="(item, index) in userList" :key="index">
                <view class="earnings-msg" v-if="item.financeUnitResponses.length">
                    已推{{ item.alreadyOrder || 0 }}单，收益{{ item.income || 0 }}元，还可以获得{{ item.residueIncome || 0 }}元收益
                </view>

                <view class="me-fx-row me-fx-sb-c pushed-item" v-for="(temp, ti) in item.financeUnitResponses" :key="temp.ti">
                    <view class="me-fx-row me-fx-c-c">
                        <image :src="temp.headimgurl" class="user-avatar-img"></image>
                        <text class="">{{ temp.nickname }}</text>
                    </view>

                    <view class="me-fx-row me-fx-c-c">
                        <text class="amount-str">+{{ temp.earnings }}元</text>
                        <text class="service-fee" v-if="temp.isLast == true">(服务费¥{{ temp.serviceCharge }})</text>
                    </view>
                </view>
            </view>
        </view>

        <view v-else class="me-fx-col me-fx-c-c list-empty-box">
            <text>暂无数据</text>
        </view>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            activityId: '',
            userList: [],

            temp: {
                ti: '',
                headimgurl: '',
                nickname: '',
                earnings: '',
                isLast: false,
                serviceCharge: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        //var userList=decodeURIComponent(options.userlist);
        var activityId = options.activityId;
        this.setData(
            {
                activityId: activityId //userList:JSON.parse(userList)
            },
            () => {
                this.getDataList();
            }
        );
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
        getDataList() {
            app.globalData
                .sjrequest1('/activityBusiness/activityDetail', {
                    activityId: this.activityId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        var actyList = data.activityFinanceResponses;
                        var tempArr = [];

                        if (actyList) {
                            actyList.forEach((item) => {
                                tempArr.push(...item.financeUnitResponses);
                            });
                        }

                        this.setData({
                            userList: actyList
                        });
                    }
                });
        }
    }
};
</script>
<style>
.join-user-list {
    padding: 20rpx 20rpx 50rpx;
    border-bottom: 1rpx solid #f2f2f2;
    box-sizing: border-box;
}
.join-user-list .pushed-item {
    font-size: 30rpx;
    color: #333;
    padding: 0 20rpx;
    box-sizing: border-box;
}
.join-user-list .pushed-item:not(:last-child) {
    margin-bottom: 40rpx;
}
.join-user-list .user-avatar-img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 20rpx;
}
.join-user-list .amount-str {
    color: #eb1918;
    font-weight: bold;
}
.join-user-list .service-fee {
    font-size: 20rpx;
    color: #999;
}

.list-empty-box {
    font-size: 32rpx;
    color: #999;
    height: 500rpx;
}

.join-user-list .earnings-msg {
    font-size: 26rpx;
    color: #fff;
    border-radius: 0px 24px 24px 0px;
    background-color: #ff9215;
    margin: 0 20rpx 10rpx 0;
    padding: 5rpx 15rpx;
    height: 46rpx;
    line-height: 46rpx;
}
</style>
