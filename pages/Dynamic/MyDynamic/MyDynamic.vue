<template>
    <view>
        <view style="width: 100%; height: 1rpx; background: #e5e5e5"></view>
        <view v-if="!dynamicList.length" class="no-dynamic">
            <image class="no-dynamic-img" src="/static/pages/img/no_notice.png"></image>
            <view class="no-dynamic-text">您还没有发表动态……</view>
        </view>
        <view v-else>
            <view class="dynamic-item" v-for="(item, index) in dynamicList" :key="index">
                <view class="dynamic-top">
                    <view class="touxiang-box">
                        <image class="my-touxiang" mode="aspectFill" :src="item.userInfo.headimgurl"></image>
                        <image v-if="item.userInfo.sex == 1" class="sex" src="/static/pages/img/man.png"></image>
                        <image v-if="item.userInfo.sex == 2" class="sex" src="/static/pages/img/woman.png"></image>
                    </view>
                    <view class="my-info-box">
                        <view class="name-box">
                            {{ item.userInfo.nickname }}
                            <!-- <image class="set" src="../../img/set.png"></image> -->
                        </view>
                        <view class="autograngh">{{ item.userInfo.signature }}</view>
                    </view>
                </view>

                <rich-text :nodes="item.content" class="dynamic-text"></rich-text>

                <view class="dynamic-img-list">
                    <image
                        class="dynamic-img-item"
                        mode="aspectFill"
                        lazy-load
                        :src="pitem"
                        @tap="imgClick"
                        :data-list="item.picture"
                        :data-src="pitem"
                        v-for="(pitem, pindex) in item.picture"
                        :key="pitem.pindex"
                    ></image>
                </view>

                <view class="dynamic-bottom">
                    <view class="dynamic-time">{{ item.addTime }}</view>
                    <view class="dynamic-zan-box">
                        <view class="comment" @tap="toComment" :data-item="item">
                            <image style="width: 30rpx; height: 28rpx" src="/static/pages/img/comment.png"></image>
                            <view class="comment-text">{{ item.reply == 0 ? '评论' : item.reply }}</view>
                        </view>
                        <view class="comment dianzan" @tap="liketap" :data-id="item.id" :data-index="index">
                            <image style="width: 30rpx; height: 28rpx" v-if="item.isPraise" src="/static/pages/img/gooded.png"></image>
                            <image style="width: 30rpx; height: 28rpx" v-else src="/static/pages/img/good.png"></image>
                            <view class="comment-text">{{ item.praise == 0 ? '赞' : item.praise }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/Dynamic/MyDynamic/MyDynamic.js
const app = getApp();

const time = require('../../../utils/util');

export default {
    data() {
        return {
            pageCurr: 1,
            pageSize: 15,
            dynamicList: [],
            stopLoading: true,

            pitem: {
                pindex: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            pageCurr: 1,
            stopLoading: true,
            dynamicList: []
        });
        this.showMyDynamic();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
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
    onPullDownRefresh: function () {
        this.setData({
            pageCurr: 1,
            stopLoading: true,
            dynamicList: []
        });
        this.showMyDynamic();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.stopLoading) {
            this.setData({
                pageCurr: this.pageCurr + 1
            });
            this.showMyDynamic();
        }
    },
    /**
     * 用户点击右上角分享
     */ methods: {
        showMyDynamic() {
            var data = {
                pageCurr: this.pageCurr,
                pageSize: this.pageSize
            };
            app.globalData.sjrequest('/marchant/queryMyComm', data).then((res) => {
                var list = res.data.data;

                for (var i in list) {
                    list[i].addTime = time.formatTime(list[i].addTime);
                    var contentString = '';
                    var contentList = JSON.stringify(list[i].content);
                    contentList = contentList.slice(1, contentList.length - 1);
                    contentList = contentList.split('\\n');
                    contentList.forEach((item) => {
                        contentString = contentString + item + '<br />';
                    });
                    list[i].content = contentString;
                }

                this.setData({
                    dynamicList: this.dynamicList.concat(list)
                });

                if (list.length < 1) {
                    this.setData({
                        stopLoading: false
                    });
                }

                uni.stopPullDownRefresh();
            });
        },

        // 评论
        toComment(e) {
            var item = e.currentTarget.dataset['item'];
            uni.setStorage({
                key: 'commentListItem',
                data: JSON.stringify(item)
            });
            uni.navigateTo({
                url: '../DynamicDetails/DynamicDetails'
            });
        },

        // 点赞
        liketap(e) {
            var id = e.currentTarget.dataset['id'];
            var index = e.currentTarget.dataset['index'];
            var data = {
                commentId: id
            };
            app.globalData.sjrequest('/dynamic/praise', data).then((res) => {
                var list = this.dynamicList;
                list[index].isPraise = !list[index].isPraise;

                if (list[index].isPraise) {
                    list[index].praise += 1;
                } else {
                    list[index].praise -= 1;
                }

                this.setData({
                    dynamicList: list
                });
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
/* pages/Dynamic/MyDynamic/MyDynamic.wxss */
.dynamic-item {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    border-bottom: 10rpx solid #f5f5f5;
}
.dynamic-top {
    display: flex;
}
.touxiang-box {
    width: 84rpx;
    height: 84rpx;
    position: relative;
}
.my-touxiang {
    width: 84rpx;
    height: 84rpx;
    border-radius: 50%;
}
.sex {
    width: 30rpx;
    height: 28rpx;
    position: absolute;
    right: 4rpx;
    bottom: 4rpx;
}
.my-info-box {
    width: 0;
    flex: 1;
    height: 84rpx;
    margin-left: 20rpx;
}
.name-box {
    width: 100%;
    height: 40rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 26rpx;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
}
.set {
    width: 30rpx;
    height: 8rpx;
}
.autograngh {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26rpx;
    color: #999999;
}
.dynamic-text {
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 48rpx;
    color: #333333;
    margin-top: 20rpx;
    word-break: break-all;
    word-wrap: break-word;
}
.dynamic-img-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.dynamic-img-item {
    width: 210rpx;
    height: 210rpx;
    /* object-fit: cover; */
    margin-right: 30rpx;
    margin-top: 20rpx;
}
.dynamic-img-list .dynamic-img-item:nth-child(3n) {
    margin-right: 0;
}
.dynamic-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
}
.dynamic-time {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
}
.dynamic-zan-box {
    height: 28rpx;
    display: flex;
}
.comment {
    display: flex;
    align-items: center;
}
.dianzan {
    margin-left: 30rpx;
}
.comment-text {
    margin-left: 14rpx;
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
</style>
