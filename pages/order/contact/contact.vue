<template>
    <!-- pages/order/contact/contact.wxml -->
    <view class="contact">
        <scroll-view scroll-y id="chatContent" :scroll-into-view="toLast">
            <view style="height: 1px; width: 100%"></view>
            <view :id="'item' + (index + 1)" v-for="(item, index) in chatList" :key="index">
                <view v-if="item.msgFrom == 2">
                    <view class="chatDatetime" v-if="index == 0 || item.addTime !== '刚刚'">{{ item.addTime }}</view>
                    <view class="chatBox_left">
                        <image class="chatImg_left" :src="logoPic" />
                        <view style="margin-top: 10px">
                            <image src="/static/pages/img/black_triangle.png" style="height: 10px; width: 10px" />
                        </view>
                        <view class="chatBubble_left">{{ item.content }}</view>
                    </view>
                </view>

                <view v-else>
                    <view class="chatDatetime" v-if="index == 0 || item.addTime !== '刚刚'">{{ item.addTime }}</view>
                    <view class="chatBox_left chatBox_right">
                        <view class="chatBubble_left chatBubble_right">{{ item.content }}</view>
                        <view style="margin-top: 10px">
                            <image src="/static/pages/img/white_triangle.png" style="height: 10px; width: 10px" />
                        </view>
                        <image class="chatImg_left chatImg_right" :src="headimgurl" />
                    </view>
                    <view style="clear: both"></view>
                </view>
            </view>
        </scroll-view>

        <view class="chatFooter">
            <input :value="chatValue" @input="changInput" cursor-spacing="30" placeholder="请输入消息..." class="send-content" maxlength="80" />
            <view class="footerFS" @tap="fsChat">发送</view>
        </view>
    </view>
</template>

<script>
// pages/order/contact/contact.js
const app = getApp();

const time = require('../../../utils/util');

export default {
    data() {
        return {
            logoPic: '',
            chatValue: '',
            timer: '',
            chatList: [],
            headimgurl: '',
            chatId: '',
            marchantId: '',
            marchantName: '',
            toLast: '',
            reasonHeight: ''
        };
    }
    /**
     *   position: relative;absolute
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        uni.showLoading({
            title: '加载中'
        });
        this.setData({
            marchantId: options.marchantId,
            marchantName: options.marchantName,
            logoPic: options.logoPic
        });
        console.log(this.logoPic, 'logoPic'); // this.data.timer = setInterval(() =>{
        //   this.refresh()
        // },5000)

        uni.setNavigationBarTitle({
            title: this.marchantName
        });

        if (this.chatId == '') {
            this.marchantId = this.id;
            this.openChat();
        } else {
            this.chatId = this.chatId;
            this.getChatList(this.chatId);
        }
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
    onUnload: function () {
        //清除计时器  即清除timer
        clearInterval(this.timer);
    },
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
        //每隔五秒刷新页面
        refresh() {
            this.getChatList(this.chatId);
        },

        //打开聊天窗
        openChat() {
            var data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/basic/addChat', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        chatId: res.data.data.chatId
                    });
                    this.getChatList(this.chatId);
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        //获得聊天内容列表
        getChatList(chatId) {
            var data = {
                chatId: chatId
            };
            app.globalData.sjrequest('/basic/queryChatContent', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    var temp = res.data.data;
                    var list = temp.contentList;

                    for (var i in list) {
                        list[i].addTime = time.formatTime(list[i].addTime);
                    }

                    this.setData({
                        chatList: list,
                        headimgurl: temp.headimgurl,
                        toLast: `item${list.length}`
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        //文本框的值
        changInput(e) {
            var val = e.detail.value;
            this.setData({
                chatValue: val
            });
        },

        //发送聊天内容
        fsChat() {
            if (this.chatValue == '') {
                uni.showToast({
                    title: '说点什么吧~',
                    icon: 'none'
                });
            } else {
                var data = {
                    chatId: this.chatId,
                    marchantId: this.marchantId,
                    content: this.chatValue
                };
                app.globalData.sjrequest('/basic/addChatContent', data).then((res) => {
                    if (res.data.code == 200) {
                        this.setData({
                            chatValue: ''
                        });
                        this.getChatList(this.chatId);
                    }
                });
            }
        }
    }
};
</script>
<style>
/* pages/order/contact/contact.wxss */
.contact {
    background: #f2f2f2;
}
.contact #chatContent {
    height: calc(100vh - 140rpx);
    padding-bottom: 80rpx;
    box-sizing: border-box;
}
.contact #chatContent .chatDatetime {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: center;
    margin: 20rpx auto;
}
.contact #chatContent .chatBox_left {
    margin: 0 0 32rpx 32rpx;
    display: flex;
    align-items: flex-start;
}
.contact #chatContent .chatImg_left {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    margin-right: 18rpx;
}
.contact #chatContent .chatBubble_left {
    max-width: 400rpx;
    background: #000000;
    border-radius: 20rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 40rpx;
    padding: 16rpx;
    display: flex;
    align-items: center;
    min-height: 76rpx;
    word-break: break-all;
    word-wrap: break-word;
}
.contact #chatContent .chatBox_right {
    float: right;
}
.contact #chatContent .chatImg_right {
    margin-right: 32rpx;
}
.contact #chatContent .chatBubble_right {
    background: #ffffff;
    color: #333333;
}
.contact .chatFooter {
    width: 100%;
    height: 140rpx;
    display: flex;
    align-items: center;
    background: #f9f9f9;
    position: fixed;
    position: relative;
    bottom: 0;
    left: 0;
}
.contact .chatFooter .send-content {
    width: 570rpx;
    height: 60rpx;
    line-height: 60rpx;
    background: #ffffff;
    border-radius: 40rpx;
    margin: 0 10rpx 0 10rpx;
    padding: 10rpx 20rpx;
}
.contact .chatFooter .footerFS {
    width: 120rpx;
    height: 60rpx;
    background: #000000;
    border-radius: 6rpx;
    margin: 0 10rpx 0 10rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 60rpx;
    text-align: center;
}
</style>
