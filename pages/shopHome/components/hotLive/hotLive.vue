<template>
    <view class="hotLive">
        <view class="text">
            <view>
                <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%9B%B4%E6%92%AD.gif" mode="widthFix"></image>
                <text>火爆直播</text>
            </view>
            <view>
                <text class="moreLive" @tap="toMore">更多</text>
                <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FVector%402x.png" mode="aspectFill"></image>
            </view>
        </view>
        <!-- 直播个数，数据渲染 -->
        <view class="live-card">
            <view class="single-live" @tap="toLiveRoom" :data-roomid="item.roomid" v-for="(item, index) in liveList" :key="index">
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

                <!-- 中间直播描述 -->

                <view class="middle">
                    <view>
                        <text>{{ item.name }}</text>
                        <text>{{ item.anchor_name }}</text>
                    </view>
                    <view v-if="item.goods.length > 0">
                        <!-- 循环出图片 ， 如果数组超过三就把给最后一张图片添加蒙版 -->
                        <image :src="item.goods[0].cover_img"></image>
                        <image v-if="item.goods.length > 1" :src="item.goods[1].cover_img"></image>
                        <text v-if="item.goods.length > 2">{{ item.goods.length }}件</text>
                        <image v-if="item.goods.length > 2" :src="item.goods[2].cover_img" class="more"></image>
                    </view>
                </view>

                <!-- 右边进入按钮，改版后首页没有了 -->

                <!-- <view class="enter {{item.live_status == 101 ? 'enterColor-active' : 'enterColor-gray'}}">
                <view>
                    <text wx:if="{{item.live_status == 101}}">进入</text>
                    <text wx:else="">回看</text>
                    <image wx:if="{{item.live_status == 101}}" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FFrame%402x(2).png" mode="widthFix"></image>
                    <image wx:else src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FFrame%402x(3).png" mode="widthFix"></image>
                </view>
                <view class="bgc"></view>
            </view> -->
            </view>
        </view>
    </view>
</template>

<script>
// pages/Index/shopHome/components/goodsTypes/goodsTypes.js
var app = getApp();
export default {
    data() {
        return {
            liveList: [] // 直播间列表
        };
    },
    /**
     * 组件的属性列表
     */
    props: {},
    beforeMount: function () {
        this.getLiveList();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        async getLiveList() {
            let appId = uni.getStorageSync('appid');
            let marchantId = Number(uni.getStorageSync('merchantId'));
            let data = {
                appId,
                marchantId,
                start: 0,
                // 起始拉取房间，start = 0 表示从第 1 个房间开始拉取
                limit: 10 // 每次拉取的个数上限，不要设置过大，建议 100 以内
            };
            console.log(data, '直播列表请求参数');

            try {
                let res = await app.globalData.sjrequest('/live/create/liveList', data);
                let resData = res.data.rows.splice(0, 5); // 最多展示五个

                for (let item of resData) {
                    if (item.live_status == 101) {
                        item.color = 'background-color: #ED2726;';
                    } else if (item.live_status == 102) {
                        item.color = 'background-color: #2689FF;';
                    } else {
                        item.color = 'background-color: #BBBBBB;';
                    }
                } // 直播中的展示最多五个，直播结束的最多展示两个

                this.setData({
                    liveList: resData
                });
                console.log(this.liveList, '首页直播列表');
            } catch (error) {
                console.log(error);
            }
        },

        toMore() {
            uni.navigateTo({
                url: '/pages/hotLiveList/hotLiveList'
            });
        },

        // 跳转直播间
        async toLiveRoom(e) {
            let roomid = e.currentTarget.dataset.roomid; // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取

            console.log(roomid, '房间号房间号'); // let customParams = encodeURIComponent(JSON.stringify({
            //   path: 'pages/index/index',
            //   pid: 1
            // })) // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）

            uni.navigateTo({
                url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomid}`
            });
        }
    }
};
</script>
<style>
@charset "UTF-8";

.hotLive {
    margin-top: 80rpx;
    width: 100%;
    background-color: #fff2e2;
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 20rpx;
}

.hotLive > image {
    width: 100%;
    height: 100%;
    position: absolute;
}

.hotLive .text {
    /** 直播上半 */
    width: 100%;
    height: 96rpx;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hotLive .text view:nth-child(1) {
    width: 190rpx;
    height: 36rpx;
    margin-left: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.hotLive .text view:nth-child(1) image {
    width: 36rpx;
    height: 36rpx;
}

.hotLive .text view:nth-child(1) text {
    font-size: 36rpx;
    color: rgb(26, 26, 26);
    font-weight: bold;
}

.hotLive .text view:nth-child(2) {
    width: 85rpx;
    height: 36rpx;
    text-align: right;
    margin-right: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hotLive .text view:nth-child(2) text {
    color: #7b7b7b;
    font-size: 24rpx;
}

.hotLive .text view:nth-child(2) image {
    width: 13rpx;
    height: 20rpx;
    margin-right: 13rpx;
}

.hotLive .live-card {
    width: 100%;
    margin-top: 96rpx;
    position: relative;
}

.hotLive .live-card .single-live {
    width: 650rpx;
    height: 343rpx;
    margin-left: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
}

.hotLive .live-card .single-live:not(:last-child) {
    border-bottom: 2rpx white solid;
}

.hotLive .live-card .single-live .preview {
    width: 320rpx;
    height: 320rpx;
    position: relative;
}

.hotLive .live-card .single-live .preview .tips {
    position: absolute;
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

.tipsbgc-grey {
    background-color: #464646b8;
}

.tipsbgc-active {
    background-color: #fa756c;
}

.hotLive .live-card .single-live .preview .tips text {
    font-size: 22rpx;
    color: #fff;
    font-weight: 300;
    margin-left: 7rpx;
}

.hotLive .live-card .single-live .preview .tips image {
    width: 20rpx;
    height: 20rpx;
    margin: 4rpx 0 0 5rpx;
}

.hotLive .live-card .single-live .preview > image {
    width: inherit;
    height: inherit;
    border-radius: 10rpx;
    background-color: #9dd8ff;
}

.hotLive .live-card .single-live .middle {
    width: 330rpx;
    height: 320rpx;
    box-sizing: border-box;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.hotLive .live-card .single-live .middle view:nth-child(1) {
    height: 92rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin-top: 20rpx;
}

.hotLive .live-card .single-live .middle view:nth-child(2) {
    width: 300rpx;
    height: 100rpx;
    display: flex;
    margin-bottom: 17rpx;
    position: relative;
}

.hotLive .live-card .single-live .middle view:nth-child(2) text {
    position: absolute;
    top: 27rpx;
    right: 17rpx;
    z-index: 1;
    font-size: 24rpx;
    color: #fff;
}

.hotLive .live-card .single-live .middle view .more::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    height: 88rpx;
    width: 88rpx;
    background-color: rgba(0, 0, 0, 0.493);
}

.hotLive .live-card .single-live .middle view image {
    width: 88rpx;
    height: 88rpx;
    background-color: rgb(255, 180, 110);
    border-radius: 8rpx;
    margin-right: 12rpx;
    position: relative;
}
.hotLive .live-card .single-live .middle view image:last-child {
    margin-right: 0;
}

.hotLive .live-card .single-live .middle view text:nth-child(1) {
    font-size: 30rpx;
    font-weight: bold;
}

.hotLive .live-card .single-live .middle view text:nth-child(2) {
    font-size: 24rpx;
    color: #999999;
}

.hotLive .live-card .single-live .middle view:nth-child(2) text:nth-child(1) {
    width: 180rpx;
    font-size: 24rpx;
}

.hotLive .live-card .single-live .middle view:nth-child(2) text:nth-child(2) {
    width: 110rpx;
    font-size: 24rpx;
}

.hotLive .live-card .single-live .enter {
    width: 116rpx;
    height: 56rpx;
    border-radius: 40rpx;
}

.enterColor-gray {
    background-color: #b9b9b9;
    color: #7d7d7d;
}

.enterColor-active {
    background-color: #fa756c;
    color: #ffffff;
}

.hotLive .live-card .single-live .enter view {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hotLive .live-card .single-live .enter view text {
    color: inherit;
    font-size: 24rpx;
    margin-top: 10rpx;
}

.hotLive .live-card .single-live .enter view image {
    width: 24rpx;
    height: 24rpx;
    margin-top: 8rpx;
    margin-left: 4rpx;
}
</style>
