<template>
    <view class="details">
        <view class="details_title">
            <image :src="dynamicData.userInfo.headimgurl" mode="aspectFill" class="details_title_left"></image>
            <view class="details_title_right">
                <view class="details_title_name">
                    <view>{{ dynamicData.userInfo.nickname }}</view>
                    <image v-if="dynamicData.isMember" src="/static/pages/img/index/member_icon.png"></image>
                </view>
                <view class="details_title_sign">{{ dynamicData.userInfo.signature }}</view>
            </view>
        </view>
        <view class="details_content">{{ dynamicData.content }}</view>
        <view class="details_image">
            <block v-for="(pitem, pindex) in dynamicData.imagList" :key="pitem.pindex">
                <image :src="pitem" @tap.stop.prevent="imgClick" :data-list="dynamicData.imagList" :data-src="pitem" mode="aspectFill"></image>
            </block>
        </view>
        <view class="details_foot">
            <view class="details_foot_left">发布时间：{{ dynamicData.addTime }}</view>
            <view class="details_foot_right" @tap="operationPraise">
                <image :src="dynamicData.isPraise ? '/pages/img/gooded.png' : '/pages/img/index/dynamic_icon_4.png'"></image>
                <view>{{ dynamicData.praise }}</view>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp();

const time = require('../../../../utils/util');

export default {
    data() {
        return {
            dynamicData: {
                userInfo: {
                    headimgurl: '',
                    nickname: '',
                    signature: ''
                },

                isMember: '',
                content: '',
                imagList: [],
                addTime: '',
                isPraise: false,
                praise: ''
            },

            pitem: {
                pindex: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        options.item = decodeURIComponent(options.item);
        let item = JSON.parse(options.item);
        console.log('========', item);
        item.addTime = time.formatTimeSec(item.addTime);
        this.setData({
            dynamicData: item
        });
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
     */ methods: {
        // 点赞/取消
        operationPraise() {
            let data = {
                commentId: this.dynamicData.id
            };
            return app.globalData.sjrequest('/marchant/operationPraise', data).then((res) => {
                let isPraise = 'dynamicData.isPraise';
                let praise = 'dynamicData.praise';
                var pages = getCurrentPages();
                var prevPge = pages[pages.length - 2];
                prevPge.data.commentList.forEach((item, idx) => {
                    //更新上一个页面的内容
                    let isPraise1 = 'commentList[' + idx + '].isPraise';
                    let praise1 = 'commentList[' + idx + '].praise';

                    if (item.id == this.dynamicData.id) {
                        if (item.isPraise) {
                            prevPge.commentList[idx].praise = this.dynamicData.praise - 1;
                            prevPge.commentList[idx].isPraise = 0;
                        } else {
                            prevPge.commentList[idx].praise = this.data.dynamicData.praise + 1;
                            prevPge.commentList[idx].isPraise = 1;
                        }
                    }
                });

                if (this.dynamicData.isPraise) {
                    this[dynamicData.praise] = this.dynamicData.praise - 1;
                    this[dynamicData.isPraise] = 0;
                } else {
                    this[dynamicData.praise] = this.data.dynamicData.praise + 1;
                    this[dynamicData.isPraise] = 1;
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
.details {
    padding: 20rpx;
}
.details_title {
    display: flex;
    width: 100%;
}
.details_title_left {
    width: 66rpx;
    height: 66rpx;
    border-radius: 50%;
}
.details_title_right {
    flex: 1;
    width: 80%;
    height: 66rpx;
    margin-left: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.details_title_name {
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
    display: flex;
}
.details_title_name image {
    margin-left: 16rpx;
    width: 28rpx;
    height: 28rpx;
}
.details_title_sign {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 20rpx;
    font-weight: bold;
    color: #999999;
}
.details_content {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    color: #333333;
    margin-top: 12rpx;
    padding: 0 8rpx;
}
.details_image image {
    width: 220rpx;
    height: 220rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin: 24rpx 25rpx 0 0;
}
.details_image image:nth-child(3n) {
    margin-right: 0;
}
.details_foot {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.details_foot_left {
    font-size: 22rpx;
    font-weight: bold;
    color: #000000;
}
.details_foot_right {
    display: flex;
    align-items: center;
}
.details_foot_right image {
    width: 25rpx;
    height: 25rpx;
    margin-right: 8rpx;
}
.details_foot_right view {
    font-size: 18rpx;
    font-weight: bold;
    color: #000000;
}
</style>
