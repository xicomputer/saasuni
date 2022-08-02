<template>
    <view>
        <!-- 我的动态 -->
        <view style="width: 100%; height: 1rpx; background: #e5e5e5"></view>
        <view class="dynamic-item">
            <view class="dynamic-top">
                <view class="touxiang-box">
                    <image class="my-touxiang" :src="commentListItem.userInfo.headimgurl"></image>
                    <image v-if="commentListItem.userInfo.sex == 1" class="sex" src="/static/pages/img/man.png"></image>
                    <image v-if="commentListItem.userInfo.sex == 2" class="sex" src="/static/pages/img/woman.png"></image>
                </view>
                <view class="my-info-box">
                    <view class="name-box">
                        {{ commentListItem.userInfo.nickname }}
                        <!-- <image class="set" src="../../img/set.png"></image> -->
                    </view>
                    <view class="autograngh">{{ commentListItem.userInfo.signature }}</view>
                </view>
            </view>
            <rich-text :nodes="commentListItem.content" class="dynamic-text"></rich-text>
            <view class="dynamic-img-list">
                <image
                    class="dynamic-img-item"
                    mode="aspectFill"
                    :src="pitem"
                    @tap="imgClick"
                    :data-list="commentListItem.picture"
                    :data-src="pitem"
                    v-for="(pitem, pindex) in commentListItem.picture"
                    :key="pitem.pindex"
                ></image>
            </view>
            <view class="dynamic-bottom">
                <view class="dynamic-time">{{ commentListItem.addTime }}</view>
                <view class="dynamic-zan-box">
                    <view class="comment">
                        <image style="width: 30rpx; height: 28rpx" src="/static/pages/img/comment.png"></image>
                        <view class="comment-text">{{ commentListItem.reply == 0 ? '评论' : commentListItem.reply }}</view>
                    </view>
                    <view class="comment dianzan" @tap="liketap" :data-id="commentListItem.id" :data-index="0">
                        <image style="width: 30rpx; height: 28rpx" v-if="commentListItem.isPraise" src="/static/pages/img/gooded.png"></image>
                        <image style="width: 30rpx; height: 28rpx" v-else src="/static/pages/img/good.png"></image>
                        <view class="comment-text">{{ commentListItem.praise == 0 ? '赞' : commentListItem.praise }}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 评论 -->
        <view class="discuss-box">
            <view class="discuss-top">精彩评论</view>
            <view class="discuss-item" v-for="(item, index) in commentReply" :key="index">
                <image
                    style="width: 60rpx; height: 60rpx; border-radius: 50%"
                    @tap="reply"
                    :data-id="item.id"
                    :data-name="item.userInfo.nickname"
                    :data-userid="item.userId"
                    :src="item.isMarchant == 0 ? item.userInfo.headimgurl : item.userInfo.logoPic"
                ></image>

                <view class="discuss-content">
                    <view class="discuss-nickname">{{ item.userInfo.nickname }}</view>
                    <view class="discuss-text">{{ item.content }}</view>
                    <view class="discuss-detail" v-if="item.replytoreply.length != 0">
                        <view
                            class="discuss-detail-box huifu-box"
                            @tap="reply"
                            :data-id="item.id"
                            :data-name="ritem.userName"
                            :data-userid="ritem.userId"
                            v-for="(ritem, rindex) in item.replytoreply"
                            :key="ritem.rindex"
                        >
                            <text class="discuss-nickname">{{ ritem.userName }}</text>

                            <text class="discuss-huifu">回复</text>

                            <text class="discuss-nickname">{{ ritem.userReplyName }}:</text>

                            <text class="discuss-huifu">{{ ritem.content }}</text>
                        </view>
                    </view>
                    <view class="discuss-time">{{ item.addTime }}</view>
                </view>
            </view>
        </view>
        <!-- 发布评论 -->
        <view class="release-dynamic-box">
            <input
                maxlength="80"
                :placeholder="fabu"
                :value="value"
                :focus="isfocus"
                @input="getvalue"
                placeholder-style="font-size:24rpx;font-weight:400;color:#033333;"
                class="release-dynamic-input"
            />
            <view class="release-dynamic-btn" @tap="fasong">发表</view>
        </view>
        <van-toast id="van-toast" />
    </view>
</template>

<script>
// import vanToast from './@vant/weapp/toast/index';
// pages/Dynamic/DynamicDetails/DynamicDetails.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();

const time = require('../../../utils/util');

export default {
    components: {
        // vanToast
    },
    data() {
        return {
            commentListItem: [],
            commentReply: [],
            fabu: '发布评论',
            value: '',
            id: 0,
            name: '',
            userid: '',
            isfocus: false,
            headimgurl: '',
            sex: 0,
            signature: '',

            pitem: {
                pindex: ''
            },

            ritem: {
                userName: '',
                userId: '',
                rindex: '',
                userReplyName: '',
                content: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const commentListItem = JSON.parse(uni.getStorageSync('commentListItem'));
        this.setData({
            commentListItem: commentListItem
        });
        this.getComment(commentListItem.id);
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
        // 点赞
        liketap(e) {
            var id = e.currentTarget.dataset['id'];
            var index = e.currentTarget.dataset['index'];
            var data = {
                commentId: id
            };
            app.globalData.sjrequest('/dynamic/praise', data).then((res) => {
                var list = this.commentListItem;
                list.isPraise = !list.isPraise;

                if (list.isPraise) {
                    list.praise += 1;
                } else {
                    list.praise -= 1;
                }

                this.setData({
                    commentListItem: list
                });
            });
        },

        // 评论列表
        getComment(id) {
            var data = {
                commentId: id
            };
            app.globalData.sjrequest('/marchant/queryMarchantCommentReply', data).then((res) => {
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
                Toast('说点什么吧~');
            } else {
                var data = {
                    commentId: this.commentListItem.id,
                    content: this.value,
                    isMarchant: 0,
                    parentId: this.id,
                    userReplyId: this.userid,
                    userReplyName: this.name
                };
                app.globalData.sjrequest('/marchant/addMarchantCommentReply', data).then((res) => {
                    if (res.data.code == 200) {
                        Toast('发送成功');
                        this.getComment(this.commentListItem.id);
                        var list = this.commentListItem;
                        list.reply = list.reply + 1;
                        uni.setStorage({
                            key: 'commentListItem',
                            data: JSON.stringify(list)
                        });
                        this.setData({
                            value: '',
                            id: 0,
                            fabu: '发布评论',
                            userid: this.commentListItem.userInfo.id,
                            name: this.commentListItem.userInfo.nickname,
                            commentListItem: list
                        });
                    }
                });
            }
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
/* 我的动态 */
page {
    background: #f9f9f9;
}
.dynamic-item {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    border-bottom: 20rpx solid #f9f9f9;
    background: #ffffff;
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
/* 评论 */
.discuss-box {
    padding: 30rpx;
    box-sizing: border-box;
    background: #ffffff;
    margin-bottom: 120rpx;
}
.discuss-top {
    height: 46rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 46rpx;
    color: #333333;
    margin-bottom: 36rpx;
}
.discuss-item {
    display: flex;
    margin-top: 30rpx;
}
.discuss-content {
    width: 0;
    flex: 1;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #efefef;
    padding-bottom: 26rpx;
}
.discuss-nickname {
    height: 30rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 30rpx;
    color: #ec1919;
}
.discuss-text {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 38rpx;
    color: #333333;
    margin-top: 10rpx;
    word-break: break-all;
    word-wrap: break-word;
}
.discuss-detail {
    padding: 27rpx 24rpx;
    box-sizing: border-box;
    background: #f9f9f9;
    margin-top: 20rpx;
}
.discuss-detail-box {
    /* display: flex; */
}
.discuss-huifu {
    height: 30rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #333333;
    word-break: break-all;
    word-wrap: break-word;
}
.huifu-box {
    margin-top: 20rpx;
}
.discuss-time {
    height: 30rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
    margin-top: 14rpx;
}
/* 发布动态 */
.release-dynamic-box {
    width: 100%;
    height: 120rpx;
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
    position: fixed;
    bottom: 0;
    display: flex;
}
.release-dynamic-input {
    width: 0;
    flex: 1;
    height: 60rpx;
    border-radius: 30rpx;
    background: #f9f9f9;
    padding-left: 30rpx;
}
.release-dynamic-btn {
    margin-left: 20rpx;
    width: 120rpx;
    height: 60rpx;
    background: #ec1919;
    border-radius: 5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
}
</style>
