<template>
    <view class="video-container">
        <video
            :loop="true"
            :autoplay="true"
            :enable-play-gesture="false"
            enable-progress-gesture
            :show-center-play-btn="false"
            :controls="false"
            :src="videoInfo.videoUrl"
            class="video-detail"
        ></video>
        <view class="news-goods-container">
            <!-- <image src="/pages/img/index/arrow_bottom.png"
      style="width:48rpx;height:24rpx;position:absolute;top:0;right:0;padding:0 0 20rpx 20rpx"></image> -->
            <view class="news-goods-top">
                <view class="news-goods-name">{{ videoInfo.commodityName }}</view>
                <view class="news-goods-price">
                    <view class="news-goods-sale-price">
                        ￥{{ videoInfo.activityType == 1 || (videoInfo.activityType == 2 && videoInfo.isMember == 1) ? videoInfo.lowPrice : videoInfo.originalPrice }}
                    </view>
                    <view class="news-goods-origin-price" v-if="videoInfo.originalPrice != videoInfo.lowPrice">￥{{ videoInfo.originalPrice }}</view>
                </view>
            </view>
            <view class="news-goods-bottom">
                <view class="news-goods-introduction">产品介绍：{{ videoInfo.description }}</view>
                <view @tap="toBuy" :data-id="videoInfo.id" class="news-goods-btn">立即购买</view>
            </view>
        </view>
        <image v-if="isShare" src="/static/pages/img/index/video_to_store_icon.png" @tap="toStore" class="to-store-icon"></image>
    </view>
</template>

<script>
// pages/Index/videoDetail/videoDetail.js
const app = getApp();
export default {
    data() {
        return {
            videoInfo: {
                videoUrl: '',
                commodityName: '',
                activityType: 0,
                isMember: 0,
                lowPrice: '',
                originalPrice: '',
                description: '',
                id: ''
            },
            // 视频信息
            marchantId: 0,
            videoId: 0,
            isShare: 0 // 是否分享进入
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: async function (options) {
        if (options.scene) {
            // 小程序码
            const scene = decodeURIComponent(options.scene);
            await this.getCodeParams(scene);
        } else {
            //  正常跳转
            this.setData({
                marchantId: options.marchantId,
                videoId: options.id,
                isShare: options.isShare || 0
            });
        }

        this.getVideoInfo(this.marchantId, this.videoId);
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
    onShareAppMessage: function () {
        uni.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
        return {
            title: this.videoInfo.commodityName,
            path: `/pages/Index/videoDetail/videoDetail?marchantId=${this.marchantId}&id=${this.videoId}&isShare=1`,
            imageUrl: this.videoInfo.coverUrl
        };
    },
    onShareTimeline: function () {
        return {
            title: this.videoInfo.commodityName,
            query: `marchantId=${this.marchantId}&id=${this.videoId}&isShare=1`,
            imageUrl: this.videoInfo.coverUrl
        };
    },
    methods: {
        //是否从小程序码进来
        getCodeParams(id) {
            let data = {
                id: id
            };
            let that = this;
            return app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        marchantId: JSON.parse(res.data.data.scene).marchantId,
                        videoId: JSON.parse(res.data.data.scene).id
                    });
                }
            });
        },

        //  获取视频参数
        getVideoInfo(id, vid) {
            let data = {
                marchantId: id,
                videoId: vid
            };
            app.globalData.sjrequest('/commodity/queryVideoCommodityDetails', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        videoInfo: res.data.data
                    });
                }
            });
        },

        toBuy(e) {
            uni.navigateTo({
                url: `/pages/Index/GoodsDetails/GoodsDetails?id=${e.currentTarget.dataset.id}`
            });
        },

        toStore() {
            uni.navigateTo({
                url: `/pages/shopHome/home/home?marchantId=${this.marchantId}`
            });
        }
    }
};
</script>
<style>
/* pages/Index/videoDetail/videoDetail.wxss */
.video-container {
    width: 100%;
    height: 100vh;
}
.video-container-sp {
    width: 100%;
    height: calc(100vh - 68rpx);
}
.video-detail {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
}
.news-goods-container {
    width: 100%;
    height: 138rpx;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 16rpx 20rpx 40rpx;
    box-sizing: border-box;
}
.news-goods-top {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
.news-goods-name {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ffffff;
    flex: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.news-goods-price {
    flex: 1;
    white-space: nowrap;
    display: flex;
    align-items: flex-end;
}
.news-goods-sale-price {
    height: 50rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #ffffff;
}
.news-goods-origin-price {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #f7f7f7;
    text-decoration: line-through;
}
.news-goods-bottom {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    margin-top: 10rpx;
    justify-content: space-between;
}
.news-goods-introduction {
    width: 500rpx;
    height: 56rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.news-goods-btn {
    width: 132rpx;
    height: 48rpx;
    background: #e23e3e;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.to-store-icon {
    width: 88rpx;
    height: 88rpx;
    position: absolute;
    bottom: 20%;
    right: 20rpx;
}
</style>
