<template>
    <view>
        <no-data text="您还没有进行评价哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img7.png" v-if="!goodsCommentList.length"></no-data>
        <view v-else class="goodsCommentList">
            <view v-if="commodityId" class="goodsCommentList-point">
                <view class="point-left">
                    <view class="point-left-averageGrade">{{ averageGrade }}</view>
                    <view class="point-left-text">分</view>
                </view>
                <view class="point-right">
                    <view class="point-right-highGrade">
                        <view class="highGrade-desc">好评</view>
                        <view class="highGrade-progressBox">
                            <view class="highGrade-progress" :style="'width:' + highGrade"></view>
                        </view>
                        <view class="highGrade-point">{{ highGrade }}</view>
                    </view>
                    <view class="point-right-bottomGrade">
                        <view class="bottomGrade-desc">差评</view>
                        <view class="bottomGrade-progressBox">
                            <view class="bottomGrade-progress" :style="'width:' + (bottomGrade == '无差评' ? '0%' : bottomGrade)"></view>
                        </view>
                        <view class="bottomGrade-point">{{ bottomGrade == '无差评' ? '无差评' : bottomGrade }}</view>
                    </view>
                </view>
            </view>
            <view class="goodsCommentList-item" v-for="(item, index) in goodsCommentList" :key="index">
                <view class="item-headinfo">
                    <view class="headinfo-left">
                        <image :src="item.headimgurl" class="headinfo-img"></image>
                    </view>
                    <view class="headinfo-right">
                        <view class="headinfo-name">{{ item.nickname }}</view>
                        <view class="headinfo-start">
                            <image
                                :src="'../../img/order/start_b' + (item.grade > sindex ? 6 - item.grade + sindex : 0) + '.png'"
                                class="start-img"
                                @tap="changeStartLevel"
                                :data-index="sindex + 1"
                                v-for="(sitem, sindex) in 5"
                                :key="sindex"
                            ></image>
                        </view>
                    </view>
                </view>

                <view class="item-text">{{ item.content }}</view>

                <view class="item-image" v-if="item.imagList.length">
                    <image
                        :src="iitem"
                        class="image-img"
                        @tap="zoomImg"
                        :data-list="item.imagList"
                        :data-src="iitem"
                        v-for="(iitem, index1) in item.imagList"
                        :key="index1"
                    ></image>
                </view>

                <view class="item-footer">
                    <view class="footer-time">{{ item.addTime }}发表</view>
                    <view class="footer-operate">
                        <item @tap.native="toComment($event, { item })" :data-item="item" class="operate-item">
                            <image src="/static/pages/img/comment.png" class="operate-icon"></image>
                            <view class="operate-num">{{ item.reply }}</view>
                        </item>
                        <view @tap="liketap" :data-index="index" :data-id="item.id" class="operate-item">
                            <image v-if="!item.myPraise" src="/static/pages/img/good.png" class="operate-icon"></image>
                            <image v-else src="/static/pages/img/gooded.png" class="operate-icon"></image>
                            <view class="operate-num">{{ item.praise }}</view>
                        </view>
                    </view>
                </view>

                <view class="item-replay" v-if="goodsCommentDetails.marchantContent">
                    <view class="item-replay-name">商家回复</view>
                    <view class="item-replay-text">{{ item.marchantContent }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// pages/order/goodsCommentList/goodsCommentList.js
const time = require('../../../utils/util');

const app = getApp();
export default {
    components: {
        noData
    },
    data() {
        return {
            pageCurr: 1,
            pageSize: 10,
            stopLoading: true,
            commodityId: 0,
            goodsCommentList: [],
            averageGrade: 0,
            highGrade: 0,
            bottomGrade: 0,
            sindex: 0,
            iitem: '',

            goodsCommentDetails: {
                marchantContent: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.commodityId) {
            this.setData({
                commodityId: options.commodityId
            });
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            pageCurr: 1,
            stopLoading: true,
            goodsCommentList: []
        });
        this.getData();
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
    onReachBottom: function () {
        this.setData({
            pageCurr: this.pageCurr + 1,
            stopLoading: true
        });
        this.getData();
    },
    /**
     * 用户点击右上角分享
     */ methods: {
        getData() {
            let data = {};

            if (this.commodityId) {
                data = {
                    commodityId: this.commodityId,
                    pageCurr: this.pageCurr,
                    pageSize: this.pageSize
                };
            } else {
                data = {
                    pageCurr: this.pageCurr,
                    pageSize: this.pageSize
                };
            }

            app.globalData.sjrequest('/orderComment/queryOrderCommentList', data).then((res) => {
                if (res.data.code === 200) {
                    let result = res.data.data;
                    let list = result.list;
                    list.forEach((item) => {
                        item.addTime = time.formatTime(item.addTime);
                    });
                    this.setData({
                        goodsCommentList: this.goodsCommentList.concat(list),
                        averageGrade: result.averageGrade,
                        highGrade: result.highGrade,
                        bottomGrade: result.bottomGrade
                    });

                    if (list.length < 1) {
                        this.setData({
                            stopLoading: false
                        });
                    }

                    uni.stopPullDownRefresh();
                }
            });
        },

        // 放大图片
        zoomImg(e) {
            const { src, list } = e.currentTarget.dataset;
            uni.previewImage({
                current: src,
                // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            });
        },

        // 评论
        toComment(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var item = e.currentTarget.dataset['item'];
            app.globalData.goodsCommentDetails = item;
            uni.navigateTo({
                url: '../goodsCommentDetails/goodsCommentDetails'
            });
        },

        // 点赞
        liketap(e) {
            var id = e.currentTarget.dataset['id'];
            var index = e.currentTarget.dataset['index'];
            var data = {
                commentId: id
            };
            app.globalData.sjrequest('/orderComment/operationPraise', data).then((res) => {
                var list = this.goodsCommentList;
                list[index].myPraise = !list[index].myPraise;

                if (list[index].myPraise) {
                    list[index].praise += 1;
                } else {
                    list[index].praise -= 1;
                }

                this.setData({
                    goodsCommentList: list
                });
            });
        },

        changeStartLevel() {
            console.log('占位：函数 changeStartLevel 未声明');
        }
    }
};
</script>
<style>
.goodsCommentList {
    background: #f8f9fb;
    padding-top: 20rpx;
    min-height: 100vh;
}
.goodsCommentList-point {
    width: 100%;
    height: 160rpx;
    background: #ffffff;
    margin-bottom: 20rpx;
    padding: 0 50rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.point-left {
    display: flex;
    align-items: baseline;
}
.point-left-averageGrade {
    font-size: 60rpx;
    font-weight: bold;
    line-height: 84rpx;
    color: #f17239;
    padding-right: 8rpx;
}
.point-left-text {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 40rpx;
    color: #f17239;
}
.point-right {
    height: 120rpx;
    font-size: 26rpx;
    font-weight: 400;
    line-height: 38rpx;
    color: #999999;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.point-right-highGrade {
    display: flex;
    align-items: center;
}
.highGrade-progressBox {
    margin: 0 20rpx;
    width: 232rpx;
    height: 20rpx;
    background: #f8f9fb;
    border: 1rpx solid #f17239;
    box-shadow: 0rpx 2rpx 5rpx rgba(0, 67, 142, 0.15);
}
.highGrade-progress {
    width: 100rpx;
    height: 100%;
    background: #f17239;
}
.point-right-bottomGrade {
    display: flex;
}
.bottomGrade-progressBox {
    margin: 0 20rpx;
    width: 232rpx;
    height: 20rpx;
    background: #ffffff;
    border: 1rpx solid #e2e2e2;
    box-shadow: 0rpx 2rpx 5rpx rgba(0, 67, 142, 0.15);
}
.bottomGrade-progress {
    width: 20rpx;
    height: 100%;
    background: #e2e2e2;
}
.goodsCommentList-item {
    margin-bottom: 20rpx;
    background: #ffffff;
    padding: 40rpx 30rpx;
}
.item-headinfo {
    display: flex;
}
.headinfo-img {
    width: 68rpx;
    height: 68rpx;
    object-fit: cover;
    border-radius: 50%;
}
.headinfo-right {
    height: 68rpx;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
}
.headinfo-name {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
}
.start-img {
    width: 24rpx;
    height: 24rpx;
    padding-right: 16rpx;
}
.item-text {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 45rpx;
    color: #333333;
    margin-top: 20rpx;
    word-break: break-all;
}
.item-image {
    margin-top: 20rpx;
    /* width: 100%; */
}
.image-img {
    width: 200rpx;
    height: 200rpx;
    object-fit: cover;
    padding-right: 20rpx;
}
.item-footer {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
}
.footer-time {
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
}
.footer-operate {
    display: flex;
}
.operate-item {
    display: flex;
}
.operate-icon {
    width: 34rpx;
    height: 34rpx;
    padding: 0 20rpx 0 40rpx;
}
.operate-num {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    color: #999999;
}
.item-replay {
    font-size: 24rpx;
    margin-top: 10rpx;
    background-color: #efeffe;
    padding: 10rpx;
    border-radius: 10rpx;
}
.item-replay-name {
    color: #783705;
    font-weight: 600;
}
.item-replay-text {
    color: #666666;
    font-weight: 400;
    margin-top: 10rpx;
    word-wrap: break-word;
    word-break: break-all;
}
</style>
