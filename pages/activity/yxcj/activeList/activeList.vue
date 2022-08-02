<template>
    <view class="activity">
        <view class="no-activity" v-if="!activityList.length">
            <image src="/static/pages/img/no_notice.png" class="no-activity-img" />
            <view class="no-activity-text">暂无活动</view>
        </view>
        <view class="activity-list" v-else>
            <view
                class="activity-list-item"
                @tap="toActiveIndex"
                :data-id="item.activityId"
                :data-tag="item.templateTag"
                :data-tips="item.tips"
                v-for="(item, index) in activityList"
                :key="index"
            >
                <image class="activity-list-item-img" :style="item.tips == '活动已结束' ? 'filter:grayscale(80%);' : ''" :src="item.icon" />

                <view class="activity-list-item-content">
                    <view class="activity-list-item-content-box">
                        <view class="activity-list-item-content-itembox">
                            <view class="activity-list-item-content-name">{{ item.title }}</view>
                            <view class="activity-list-item-content-people">参与人数：{{ item.peopleNumber }}</view>
                        </view>
                        <view class="activity-list-item-content-itembox">
                            <view class="activity-list-item-content-datetime">{{ item.startTime }}至{{ item.endTime }}</view>
                            <view class="activity-list-item-content-tips">{{ item.tips }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/activity/yxcj/activeList/activeList.js
const time = require('../../../../utils/util');

const app = getApp();
export default {
    data() {
        return {
            activityList: [],
            marchantId: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            marchantId: options.marchantId || 275
        });
        this.getActiveList();
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
    methods: {
        //获得活动列表
        getActiveList() {
            const data = {
                marchantId: this.marchantId,
                sourceType: 'H5'
            };
            app.globalData.sjrequest('/activity/queryActivityList', data).then((res) => {
                let list = res.data.data;
                list.forEach((item) => {
                    item.startTime = time.formatDate(item.startTime);
                    item.endTime = time.formatDate(item.endTime);

                    if (item.state == 1) {
                        item.tips = '活动暂未开始';
                    } else if (item.state == 2) {
                        item.tips = '活动进行中';
                    } else if (item.state == 3) {
                        item.tips = '活动已结束';
                    }
                });
                this.setData({
                    activityList: list
                });
            });
        },

        // 游戏详情
        toActiveIndex(e) {
            const { id, tag, tips } = e.currentTarget.dataset; // if(tips == '活动已结束') {
            //   wx.showToast({
            //     title: '活动已结束，去其他活动看看吧！',
            //     icon: 'none'
            //   })
            //   return
            // }

            uni.navigateTo({
                url: `../activeDetails/activeDetails?tag=${tag.toLowerCase()}&marchant=${this.marchantId}&activityId=${id}`
            });
        }
    }
};
</script>
<style>
.activity {
    overflow-y: scroll;
    height: 100vh;
}

.no-activity {
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.no-activity-img {
    width: 632rpx;
    height: 368rpx;
}

.no-activity-text {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: rgba(204, 204, 204, 1);
}

.activity-list {
    padding: 20rpx;
}

.activity-list-item {
    margin-bottom: 20rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
}

.activity-list-item-img {
    width: 100%;
    height: 280rpx;
    object-fit: cover;
    border-radius: 10rpx 10rpx 0 0;
    object-fit: fill;
}

.activity-list-item-content-box {
    padding: 28rpx 30rpx;
    height: 142rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.activity-list-item-content {
    width: 100%;
}

.activity-list-item-content-itembox {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.activity-list-item-content-name {
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 26rpx;
    color: rgba(51, 51, 51, 1);
}

.activity-list-item-content-people {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26rpx;
    color: rgba(255, 83, 64, 1);
}

.activity-list-item-content-datetime {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26rpx;
    color: rgba(153, 153, 153, 1);
}

.activity-list-item-content-tips {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: rgba(153, 153, 153, 1);
}
</style>
