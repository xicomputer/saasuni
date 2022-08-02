<template>
    <view class="live-card">
        <view class="today-live" v-if="todayLiveList.length > 0">
            <text class="today-live-text">今日直播</text>
            <swiper>
                <swiper-item v-for="(item, index) in todayLiveList" :key="index">
                    <view class="preview">
                        <view class="tips" :style="item.color">
                            <image
                                v-if="item.live_status == 101"
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD%E4%B8%AD%E7%9A%84git%E5%9B%BE.gif"
                                mode="widthFix"
                            ></image>
                            <image
                                v-if="item.live_status == 102"
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD%E6%9C%AA%E5%BC%80%E5%A7%8B.png"
                                mode="widthFix"
                            ></image>
                            <image
                                v-if="item.live_status == 103"
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD%E7%BB%93%E6%9D%9F.png"
                                mode="widthFix"
                            ></image>
                            <image
                                v-if="item.live_status !== 101 && item.live_status !== 102 && item.live_status !== 103"
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD%E7%BB%93%E6%9D%9F.png"
                                mode="widthFix"
                            ></image>
                            <!-- 垫底模块, 两个样式，根据数据变化，红和黑 -->
                            <text v-if="item.live_status == 101">直播中</text>
                            <text v-if="item.live_status == 102">预告</text>
                            <text v-if="item.live_status == 103">已结束</text>
                            <text v-if="item.live_status == 104">禁播</text>
                            <text v-if="item.live_status == 105">暂停中</text>
                            <text v-if="item.live_status == 106">主播离开中</text>
                            <text v-if="item.live_status == 107">已过期</text>
                            <!-- 直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期 -->
                        </view>
                        <image :src="item.feeds_img" mode="aspectFill"></image>
                        <view class="middle">
                            <view>{{ item.name }}</view>
                            <view>{{ item.formatStartTime[1] }}/{{ item.formatEndTime[3] }}</view>
                            <view>{{ item.formatStartTime[4] }} - {{ item.formatEndTime[4] }}</view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
        </view>
        <!-- 下面直播回放和其他,上面正在直播和今日直播 -->
        <view class="live-playback">
            <text>直播记录</text>
            <view class="single-live-cont">
                <view class="single-live" @tap="toLiveRoom" :data-roomid="item.roomid" v-for="(item, index) in liveRecording" :key="index">
                    <!-- 左边直播间预览 -->

                    <view class="preview">
                        <view class="tips" :style="item.color">
                            <image
                                v-if="item.live_status == 101"
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD%E4%B8%AD%E7%9A%84git%E5%9B%BE.gif"
                                mode="widthFix"
                            ></image>
                            <image
                                v-if="item.live_status == 102"
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD%E6%9C%AA%E5%BC%80%E5%A7%8B.png"
                                mode="widthFix"
                            ></image>
                            <image
                                v-if="item.live_status == 103"
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD%E7%BB%93%E6%9D%9F.png"
                                mode="widthFix"
                            ></image>
                            <image
                                v-if="item.live_status !== 101 && item.live_status !== 102 && item.live_status !== 103"
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD%E7%BB%93%E6%9D%9F.png"
                                mode="widthFix"
                            ></image>
                            <!-- 垫底模块, 两个样式，根据数据变化，红和黑 -->
                            <text v-if="item.live_status == 101">直播中</text>
                            <text v-if="item.live_status == 102">预告</text>
                            <text v-if="item.live_status == 103">已结束</text>
                            <text v-if="item.live_status == 104">禁播</text>
                            <text v-if="item.live_status == 105">暂停中</text>
                            <text v-if="item.live_status == 106">主播离开中</text>
                            <text v-if="item.live_status == 107">已过期</text>
                            <!-- 直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期 -->
                        </view>
                        <image :src="item.feeds_img" mode="aspectFill"></image>
                    </view>

                    <view class="middle">
                        <view>{{ item.name }}</view>
                        <view>{{ item.formatStartTime[1] }}/{{ item.formatEndTime[3] }}</view>
                        <view>{{ item.formatStartTime[4] }} - {{ item.formatEndTime[4] }}</view>
                    </view>

                    <!-- 右边进入按钮 -->
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/kefu/kefu.js
var app = getApp();

const time = require('../../utils/util');

export default {
    data() {
        return {
            liveList: [],
            // 直播间列表，未经转换的数据
            liveListUrl: '/live/create/liveList',
            todayLiveList: [],
            // 今天直播数据
            liveRecording: [] // 存放直播记录数据
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function () {
        this.getLiveList();
    },
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
        // 获取直播列表
        async getLiveList() {
            let appId = uni.getStorageSync('appid');
            let marchantId = Number(uni.getStorageSync('merchantId'));
            console.log(appId, marchantId, 'dafkhskdjfh');
            let data = {
                appId,
                marchantId,
                start: 0,
                // 起始拉取房间，start = 0 表示从第 1 个房间开始拉取
                limit: 10 // 每次拉取的个数上限，不要设置过大，建议 100 以内
            };

            try {
                let res = await app.globalData.sjrequest(this.liveListUrl, data);
                console.log(res, '直播列表');
                let formatdata = res.data.rows;

                for (let item of formatdata) {
                    //处理日期
                    item.completeStartTime = time.formatStampDate(item.start_time * 1000).split(' ');
                    item.completeEndTime = time.formatStampDate(item.start_time * 1000).split(' ');
                    item.formatStartTime = time.formatStampDate(item.start_time * 1000).split('-');
                    item.formatEndTime = time.formatStampDate(item.end_time * 1000).split('-');
                    item.formatStartTime.push(item.formatStartTime[2].slice(0, 2));
                    item.formatStartTime.push(item.formatStartTime[2].slice(2, 8));
                    item.formatEndTime.push(item.formatEndTime[2].slice(0, 2));
                    item.formatEndTime.push(item.formatEndTime[2].slice(2, 8));
                }

                for (let item of formatdata) {
                    if (item.live_status == 101) {
                        item.color = 'background-color: #ED2726;';
                    } else if (item.live_status == 102) {
                        item.color = 'background-color: #2689FF;';
                    } else {
                        item.color = 'background-color: #BBBBBB;';
                    }
                }

                this.setData({
                    liveList: formatdata
                });
                this.todayLive();
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        // 存放今天的直播数据
        todayLive() {
            let todayTime = time.formatStampDate(Number(new Date().getTime())).split(' ');
            let data = this.liveList;
            let todayLiveList = [];
            let liveRecording = [];

            for (let item of data) {
                if (item.completeStartTime[0] == todayTime[0]) {
                    // 如果创建时间等于今天日期
                    todayLiveList.push(item);
                } else {
                    liveRecording.push(item);
                }
            }

            this.setData({
                todayLiveList,
                liveRecording
            });
        },

        // 跳转直播间
        async toLiveRoom(e) {
            let roomid = e.currentTarget.dataset.roomid; // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
            // let customParams = encodeURIComponent(JSON.stringify({
            //   path: 'pages/index/index',
            //   pid: 1
            // })) // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）

            uni.navigateTo({
                url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomid}`
            });
        }
        /**
         * 用户点击右上角分享
         */
    }
};
</script>
<style>
/* pages/kefu/kefu.wxss */
.live-card {
    width: 100vw;
    position: relative;
    display: flex;
    padding-top: 22rpx;
    flex-direction: column;
    align-items: center;
}

.live-card .single-live {
    width: 336rpx;
    height: 526rpx;
    background-color: #fff;
    border-radius: 15rpx;
    margin-bottom: 20rpx;
    position: relative;
}

.live-card .single-live .preview {
    width: 336rpx;
    height: 526rpx;
    position: relative;
}

.live-card .single-live .preview .tips {
    position: absolute;
    left: 20rpx;
    top: 20rpx;
    height: 40rpx;
    border-radius: 50rpx;
    display: flex;
    box-sizing: border-box;
    padding: 0 10rpx 4rpx 10rpx;
    align-items: center;
}

.live-card .single-live .preview .tips text {
    font-size: 22rpx;
    color: #fff;
    font-weight: 300;
    margin-left: 5rpx;
}

.live-card .single-live .preview .tips image {
    width: 20rpx;
    height: 20rpx;
    margin: 4rpx 0 0 5rpx;
}

.live-card .single-live .preview > image {
    width: inherit;
    height: inherit;
    border-radius: 10rpx;
    background-color: #9dd8ff;
}

.live-card .single-live .middle {
    width: 100%;
    height: 268rpx;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    background: linear-gradient(180deg, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 67%) 100%);
    position: absolute;
    z-index: 10;
    bottom: 0rpx;
    line-height: 47rpx;
    box-sizing: border-box;
    padding: 0 0 20rpx 20rpx;
}

.live-card .single-live .middle view:nth-child(1) {
    font-size: 28rpx;
    color: #fff;
}

.live-card .single-live .middle view:nth-child(2) {
    font-size: 52rpx;
    color: #fff;
}

.live-card .single-live .middle view:nth-child(3) {
    font-size: 20rpx;
    color: #fff;
}

.live-card .single-live .middle view:nth-child(2) text:nth-child(1) {
    width: 180rpx;
    font-size: 24rpx;
}

.live-card .single-live .middle view:nth-child(2) text:nth-child(2) {
    width: 110rpx;
    font-size: 24rpx;
}

.live-card .single-live .enter {
    width: 116rpx;
    height: 56rpx;
    border-radius: 40rpx;
    margin-right: 20rpx;
}

.live-card .single-live .enter view {
    display: flex;
    justify-content: center;
    align-items: center;
}

.live-card .single-live .enter view text {
    font-size: 24rpx;
    margin-top: 10rpx;
}

.live-card .single-live .enter view image {
    width: 24rpx;
    height: 24rpx;
    margin-top: 8rpx;
    margin-left: 4rpx;
}

.enterColor-gray {
    background-color: #b9b9b9;
    color: #7d7d7d;
}

.enterColor-active {
    background-color: #fa756c;
    color: #ffffff;
}

.tipsbgc-grey {
    background-color: #464646b8;
}

.tipsbgc-active {
    background-color: #fa756c;
}

.live-card .today-live {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 700rpx;
    height: 800rpx;
    margin-bottom: 30rpx;
}

.live-card .today-live .today-live-text {
    text-align: center;
    padding-top: 16rpx;
    width: 690rpx;
    height: 84rpx;
    border: 2rpx #333 solid;
    border-radius: 15rpx;
    box-sizing: border-box;
}

.live-card .today-live swiper {
    width: 700rpx;
    height: 700rpx;
}

.live-card .today-live swiper swiper-item .preview {
    position: relative;
    width: inherit;
    height: inherit;
    border-radius: 0 0 20rpx 20rpx;
}

.live-card .today-live swiper swiper-item .preview .tips {
    position: absolute;
    left: 40rpx;
    top: 70rpx;
    height: 40rpx;
    border-radius: 50rpx;
    display: flex;
    box-sizing: border-box;
    padding: 0 10rpx 4rpx 10rpx;
    align-items: center;
}

.live-card .today-live swiper swiper-item .preview .tips > image {
    position: absolute;
    top: 8rpx;
    width: 24rpx;
    height: 40rpx;
}

.live-card .today-live swiper swiper-item .preview .tips > text {
    font-size: 22rpx;
    color: #fff;
    margin-left: 30rpx;
    margin-top: 5rpx;
}

.live-card .today-live swiper swiper-item .preview > image {
    width: inherit;
    height: 669rpx;
    background-color: rgb(255, 180, 180);
    margin-top: 30rpx;
    border-radius: 20rpx;
}

.live-card .live-playback {
    width: 700rpx;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
}

.live-card .live-playback > text {
    width: 700rpx;
    height: 84rpx;
    text-align: center;
    padding-top: 16rpx;
    box-sizing: border-box;
    border-radius: 15rpx;
    border: solid 2rpx #333;
    margin-bottom: 30rpx;
}

.live-card .live-playback .single-live-cont {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.live-card .today-live swiper swiper-item .preview .middle {
    width: 100%;
    height: 268rpx;
    display: flex;
    border-radius: 20rpx;
    justify-content: flex-end;
    flex-direction: column;
    background: linear-gradient(180deg, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 46%) 100%);
    position: absolute;
    z-index: 10;
    bottom: 0rpx;
    line-height: 47rpx;
    box-sizing: border-box;
    padding: 0 0 20rpx 20rpx;
}

.live-card .today-live swiper swiper-item .preview .middle view:nth-child(1) {
    font-size: 28rpx;
    color: #fff;
}

.live-card .today-live swiper swiper-item .preview .middle view:nth-child(2) {
    font-size: 52rpx;
    color: #fff;
}

.live-card .today-live swiper swiper-item .preview .middle view:nth-child(3) {
    font-size: 20rpx;
    color: #fff;
}
</style>
