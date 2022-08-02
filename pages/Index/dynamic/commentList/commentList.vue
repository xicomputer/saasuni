<template>
    <view class="comment-list">
        <!-- 没数据 -->
        <view v-if="!commentList.length" class="no-dynamic">
            <image class="no-dynamic-img" src="/static/pages/img/no_notice.png"></image>
            <view class="no-dynamic-text">暂无更多评论</view>
        </view>
        <!-- 有数据 -->
        <block v-for="(item, index) in commentList" :key="index">
            <view class="user-dynamic-itme">
                <view class="store-info-box">
                    <image class="store-dynamic-logo" :src="item.headimgurl"></image>
                    <view class="store-dynamic-box-info">
                        <view class="user-dynamic-name-box">
                            <view class="user-dynamic-name">{{ item.userInfo.nickname }}</view>
                            <image class="user-dynamic-member" v-if="item.isMember" src="/static/pages/img/index/member_icon.png"></image>
                            <!-- <view class="user-dynamic-tip">优质评论</view> -->
                        </view>
                        <view class="user-dynamic-signature">{{ item.userInfo.signature || '暂无个性签名' }}</view>
                    </view>
                    <view class="user-info-right-top">
                        <view>{{ item.addTime }}</view>
                        <view class="user-info-solid"></view>
                        <view class="user-info-icon" @tap="operationPraise" :data-id="item.id" :data-idx="index">
                            <image
                                class="store-dynamic-bottom-item-icon"
                                :src="item.isPraise ? '/pages/img/index/dynamic/praised.png' : '/pages/img/index/dynamic/praise.png'"
                            ></image>
                            <text>{{ item.praise || '点赞' }}</text>
                        </view>
                    </view>
                </view>
                <view class="user-dynamic-text">{{ item.content }}</view>
                <scroll-view style="width: 100%; padding-top: 20rpx" scroll-x v-if="item.imagList.length">
                    <view class="user-img-list">
                        <image
                            :class="item.imagList.length >= 3 ? 'user-img-item user-small-img' : 'user-img-item'"
                            @tap.stop.prevent="imgClick"
                            :data-list="item.imagList"
                            :data-src="pitem"
                            mode="aspectFill"
                            :src="pitem"
                            v-for="(pitem, index1) in item.imagList"
                            :key="index1"
                        ></image>
                    </view>
                </scroll-view>
            </view>
        </block>
        <view v-if="stopLoad && commentList.length" class="no-more">没有更多了~</view>
    </view>
</template>

<script>
const app = getApp();

const formate = require('../../../../utils/util');

export default {
    data() {
        return {
            commentList: [],

            //评论列表
            pageCurr: 1,

            stopLoad: false,
            marchantId: 0,
            stick: 0,
            pitem: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: async function (options) {
        uni.showLoading({
            title: '加载中'
        });
        this.setData({
            marchantId: options.marchantId,
            stick: options.stick
        });
        await this.getCommunityList();
        uni.hideLoading();
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
    onPullDownRefresh: async function () {
        uni.showLoading({
            title: '刷新中'
        });
        this.setData({
            commentList: [],
            pageCurr: 1,
            stopLoad: false
        });
        await this.getCommunityList();
        uni.stopPullDownRefresh();
        setTimeout(function () {
            uni.hideLoading({
                success() {
                    uni.showToast({
                        title: '刷新成功'
                    });
                }
            });
        }, 500);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.stopLoad) {
            this.getCommunityList();
        }
    },
    /**
     * 用户点击右上角分享
     */ methods: {
        // 点赞/取消
        operationPraise(e) {
            const { id, idx } = e.currentTarget.dataset;
            let data = {
                commentId: id
            };
            return app.globalData.sjrequest('/marchant/operationPraise', data).then((res) => {
                let isPraise = 'commentList[' + idx + '].isPraise';
                let praise = 'commentList[' + idx + '].praise';

                if (this.commentList[idx].isPraise) {
                    this.commentList[idx].praise = this.commentList[idx].praise - 1;
                    this.commentList[idx].isPraise = 0;
                } else {
                    this.commentList[idx].praise = this.data.commentList[idx].praise + 1;
                    this.commentList[idx].isPraise = 1;
                }
            });
        },

        toDetail(e) {
            let item = JSON.stringify(e.currentTarget.dataset.item);
            uni.navigateTo({
                url: '/pages/Index/dynamic/userDynamicDetails/userDynamicDetails?item=' + encodeURIComponent(item)
            });
        },

        // 获取订阅通知列表
        getCommunityList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: this.pageCurr,
                pageSize: 10,
                stick: this.stick,
                isMarchant: 0
            };
            return app.globalData.sjrequest('/marchant/queryMarchantCommentNew', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.forEach((item) => {
                        item.addTime = formate.formatTime(item.addTime);
                    });
                    this.setData({
                        pageCurr: this.pageCurr + 1,
                        commentList: [...this.commentList, ...res.data.data]
                    });

                    if (res.data.data.length < 10) {
                        this.setData({
                            stopLoad: true
                        });
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        /**图片预览 */
        imgClick(e) {
            var src = e.currentTarget.dataset.src;
            var imgList = e.currentTarget.dataset.list;
            uni.previewImage({
                current: src,
                urls: imgList
            });
        }
    }
};
</script>
<style>
page {
    background-color: #f2f2f2;
}
.no-dynamic {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-dynamic-img {
    width: 632rpx;
    height: 368rpx;
}

.no-dynamic-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 42rpx;
    color: #000;
    opacity: 1;
    margin-top: 40rpx;

    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29rpx;
    color: #999999;
}

/* 优质评论 */
.user-dynamic-itme {
    width: 100%;
    background-color: #fff;
    padding: 20rpx 30rpx 20rpx 20rpx;
    box-sizing: border-box;
    margin-bottom: 12rpx;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.1);
}
.user-info-right-top {
    display: flex;
    align-items: start;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.user-info-solid {
    width: 2rpx;
    height: 34rpx;
    background-color: #666;
    margin: 0 20rpx;
}
.user-info-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 22rpx;
    color: #333333;
}
.user-dynamic-name-box {
    flex: 1;
    display: flex;
    align-items: center;
}
.user-dynamic-name {
    max-width: 200rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10rpx;
}
.user-dynamic-member {
    width: 28rpx;
    height: 28rpx;
    margin-right: 16rpx;
}
.user-dynamic-tip {
    width: 88rpx;
    height: 32rpx;
    background: #fe4a0b;
    border-radius: 24rpx 24rpx 24rpx 0rpx;
    font-size: 20rpx;
    font-family: HuXiaoBo-NanShen;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.user-dynamic-signature {
    max-width: 300rpx;
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.user-dynamic-text {
    width: 100%;
    margin-top: 16rpx;
    max-height: 72rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    vertical-align: middle;
}
.store-info-box {
    width: 100%;
    height: 62rpx;
    display: flex;
    align-items: center;
}
.store-dynamic-logo {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
}
.store-dynamic-box-info {
    flex: 1;
    margin-left: 20rpx;
}
.store-dynamic-bottom-item-icon {
    width: 40rpx;
    height: 40rpx;
}
/* 用户图片 */
.user-img-list {
    width: fit-content;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}
.user-img-item {
    width: 320rpx;
    height: 320rpx;
    border-radius: 10rpx;
    overflow: hidden;
    margin-right: 20rpx;
}
.user-small-img {
    width: 220rpx;
    height: 220rpx;
    border-radius: 10rpx;
}
.no-more {
    font-size: 24rpx;
    text-align: center;
    color: #999999;
    padding-bottom: 10rpx;
}
</style>
