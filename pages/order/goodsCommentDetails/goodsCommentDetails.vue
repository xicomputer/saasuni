<template>
    <view class="goodsCommentDetails">
        <view class="goodsCommentDetails-item">
            <view class="item-headinfo">
                <view @tap="reply" :data-id="0" :data-name="goodsCommentDetails.nickname" :data-userid="goodsCommentDetails.userId" class="headinfo-left">
                    <image :src="goodsCommentDetails.headimgurl" class="headinfo-img"></image>
                </view>
                <view class="headinfo-right">
                    <view class="headinfo-name">{{ goodsCommentDetails.nickname }}</view>
                    <view class="headinfo-start">
                        <image
                            :src="'../../img/order/start_b' + (goodsCommentDetails.grade > index ? 6 - goodsCommentDetails.grade + index : 0) + '.png'"
                            class="start-img"
                            @tap="changeStartLevel"
                            :data-index="index + 1"
                            v-for="(item, index) in 5"
                            :key="index"
                        ></image>
                    </view>
                </view>
            </view>
            <view class="item-text">{{ goodsCommentDetails.content }}</view>
            <view class="item-image" v-if="goodsCommentDetails.imagList.length">
                <image
                    :src="item"
                    class="image-img"
                    @tap="zoomImg"
                    :data-list="goodsCommentDetails.imagList"
                    :data-src="item"
                    v-for="(item, index) in goodsCommentDetails.imagList"
                    :key="index"
                ></image>
            </view>
            <view class="item-footer">
                <view class="footer-time">{{ goodsCommentDetails.addTime }}发表</view>
                <view class="footer-operate">
                    <view class="operate-item">
                        <image src="/static/pages/img/comment.png" class="operate-icon"></image>
                        <view class="operate-num">{{ goodsCommentDetails.reply }}</view>
                    </view>
                    <view @tap="liketap" :data-id="goodsCommentDetails.id" :data-index="0" class="operate-item">
                        <image v-if="!goodsCommentDetails.myPraise" src="/static/pages/img/good.png" class="operate-icon"></image>
                        <image v-else src="/static/pages/img/gooded.png" class="operate-icon"></image>
                        <view class="operate-num">{{ goodsCommentDetails.praise }}</view>
                    </view>
                </view>
            </view>
            <view class="item-replay" v-if="'goodsCommentDetails.marchantContent'">
                <view class="item-replay-name">商家回复</view>
                <view class="item-replay-text">{{ goodsCommentDetails.marchantContent }}</view>
            </view>
        </view>
        <view class="goodsCommentDetails-comment">
            <view class="comment-title">精彩评论</view>
            <view class="comment-content">
                <view class="content-info" v-for="(item, index) in commentReply" :key="index">
                    <view class="info-left">
                        <image
                            @tap="reply"
                            :data-id="item.id"
                            :data-name="item.userInfo.nickname"
                            :data-userid="item.userId"
                            :src="item.userInfo.headimgurl"
                            class="info-img"
                        ></image>
                    </view>

                    <view class="info-right">
                        <view class="info-name">{{ item.userInfo.nickname }}</view>
                        <view class="info-text">{{ item.content }}</view>
                        <view v-if="item.replytoreplyList.length != 0" class="content-reply">
                            <view
                                @tap="reply"
                                :data-id="item.id"
                                :data-name="ritem.userName"
                                :data-userid="ritem.userId"
                                class="replay-box"
                                v-for="(ritem, rindex) in item.replytoreplyList"
                                :key="ritem.rindex"
                            >
                                <text class="replay-info">{{ ritem.userName }}回复{{ ritem.userReplyName }}:</text>

                                <text class="replay-text">{{ ritem.content }}</text>
                            </view>
                        </view>
                        <view class="footer-time" style="margin-top: 20rpx">{{ item.addTime }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="goodsCommentDetails-footer">
            <input maxlength="80" :placeholder="fabu" :value="value" :focus="isfocus" @input="getvalue" class="footer-input" />
            <view class="footer-btn" @tap="fasong">发布</view>
        </view>
        <view class="goodsCommentDetails-fill"></view>
    </view>
</template>

<script>
// pages/order/goodsCommentDetails/goodsCommentDetails.js
const time = require('../../../utils/util');

const app = getApp();
export default {
    data() {
        return {
            fabu: '发布评论',
            value: '',
            id: 0,
            userid: '',
            name: '',
            goodsCommentDetails: [],
            commentReply: '',
            isfocus: false,

            ritem: {
                userName: '',
                userId: '',
                rindex: '',
                userReplyName: '',
                content: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            goodsCommentDetails: app.globalData.goodsCommentDetails
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getComment();
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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        // 放大图片
        zoomImg(e) {
            const { src, list } = e.currentTarget.dataset;
            uni.previewImage({
                current: src,
                // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            });
        },

        // 点赞
        liketap(e) {
            var id = e.currentTarget.dataset['id'];
            var data = {
                commentId: id
            };
            app.globalData.sjrequest('/orderComment/operationPraise', data).then((res) => {
                var list = this.goodsCommentDetails;
                list.myPraise = !list.myPraise;

                if (list.myPraise) {
                    list.praise += 1;
                } else {
                    list.praise -= 1;
                }

                this.setData({
                    goodsCommentDetails: list
                });
            });
        },

        // 评论列表
        getComment() {
            var data = {
                commentId: this.goodsCommentDetails.id
            };
            app.globalData.sjrequest('/orderComment/queryOrderCommentReply', data).then((res) => {
                var list = res.data.data;

                for (var i in list) {
                    list[i].addTime = time.formatTime(list[i].addTime);
                }

                this.setData({
                    commentReply: res.data.data
                });
            });
        },

        // 点击评论
        reply(e) {
            var id = e.currentTarget.dataset['id'];
            var name = e.currentTarget.dataset['name'];
            var userid = e.currentTarget.dataset['userid'];
            this.setData({
                id: id,
                name: name,
                userid: userid,
                fabu: '回复' + name,
                isfocus: true
            });
        },

        // 绑定input值
        getvalue(e) {
            var val = e.detail.value;
            this.setData({
                value: val
            });
        },

        // 发送评论
        fasong() {
            if (this.value == '') {
                uni.showToast({
                    title: '说点什么吧~',
                    icon: 'none'
                });
            } else {
                var data = {
                    commentId: this.goodsCommentDetails.id,
                    content: this.value,
                    isMarchant: 0,
                    parentId: this.id,
                    userReplyId: this.userid || this.goodsCommentDetails.userId,
                    userReplyName: this.name || this.goodsCommentDetails.nickname
                };
                app.globalData.sjrequest('/orderComment/addOrderCommentReply', data).then((res) => {
                    if (res.data.code == 200) {
                        uni.showToast({
                            title: '发送成功',
                            icon: 'none'
                        });
                        this.getComment();
                        var list = this.goodsCommentDetails;
                        list.reply = list.reply + 1;
                        uni.setStorage({
                            key: 'goodsCommentDetails',
                            data: JSON.stringify(list)
                        });
                        this.setData({
                            value: '',
                            id: 0,
                            fabu: '发布评论',
                            userid: this.goodsCommentDetails.userId,
                            name: this.goodsCommentDetails.nickname,
                            goodsCommentDetails: list
                        });
                    }
                });
            }
        },

        changeStartLevel() {
            console.log('占位：函数 changeStartLevel 未声明');
        }
    }
};
</script>
<style>
.goodsCommentDetails {
    background: #f8f9fb;
    padding-top: 20rpx;
    min-height: 100vh;
}
.goodsCommentDetails-item {
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
    width: 100%;
    /* overflow-x: scroll;
  height: 200rpx; */
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
.goodsCommentDetails-comment {
    background: #ffffff;
}
.comment-title {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #345a85;
    padding: 40rpx 30rpx 0;
}
.comment-content {
    padding: 0 30rpx 40rpx;
    border-bottom: 2rpx solid #f2f2f2;
}
.content-info {
    display: flex;
    margin-top: 20rpx;
}
.info-left {
}
.info-img {
    width: 55rpx;
    height: 55rpx;
    object-fit: cover;
    border-radius: 50%;
}
.info-right {
    padding-left: 20rpx;
}
.info-name {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    color: #999999;
}
.info-text {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    color: #333333;
    margin-top: 10rpx;
    word-break: break-all;
}
.content-reply {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    background: #f2f2f2;
    border-radius: 10px;
    padding: 0 20rpx 20rpx;
    margin-top: 20rpx;
    width: 615rpx;
    box-sizing: border-box;
}
.replay-box {
    padding-top: 20rpx;
}
.replay-info {
    color: #999999;
}
.replay-text {
    color: #333333;
    word-break: break-all;
}
.goodsCommentDetails-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    background: #ffffff;
    box-shadow: 0px 0px 27rpx rgba(0, 0, 0, 0.11);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40rpx;
    box-sizing: border-box;
}
.footer-input {
    width: 690rpx;
    height: 70rpx;
    background: #f2f2f2;
    padding-left: 20rpx;
}
.footer-btn {
    width: 160rpx;
    height: 70rpx;
    background: #a03a0c;
    font-size: 32rpx;
    font-weight: bold;
    line-height: 70rpx;
    color: #f8f9fb;
    text-align: center;
}
.goodsCommentDetails-fill {
    height: 120rpx;
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
