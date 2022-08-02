<template>
    <view>
        <view class="integralTask">
            <image src="https://xssj.letterbook.cn/applet/images/integral_task_bg.png" class="integralTask_image"></image>
            <view class="integralTask_title" v-if="userintegral">
                <view class="integralTask_title_left">
                    <view>可兑换礼品</view>
                    <image src="/static/pages/img/icon_gift.png"></image>
                </view>
                <view class="integralTask_title_right">当前可用积分：{{ userintegral }}</view>
            </view>
            <view class="integralTask_list" v-if="exchangeGoodsList.length">
                <view class="integralTask_list_item" @tap="showDetail" :data-idx="index" v-for="(item, index) in exchangeGoodsList" :key="index">
                    <view class="integralTask_list_title">{{ item.presentName }}</view>

                    <view class="integralTask_list_content">
                        <image :src="item.imageUuid" mode="aspectFill"></image>
                        <view class="integralTask_list_content_right">
                            <view class="integralTask_list_content_integral">{{ item.score }}积分</view>
                            <view class="integralTask_list_content_tips">
                                <view class="integralTask_list_content_tips_item" v-if="item.disbursement == 1 || item.disbursement == 3">到店领取</view>
                                <view class="integralTask_list_content_tips_item" v-if="item.disbursement == 2 || item.disbursement == 3">商家配送</view>
                            </view>
                            <view class="integralTask_list_content_tips_item">剩余{{ item.rest }}</view>
                            <view class="integralTask_list_content_btn" @tap.stop.prevent="showSelectTypeFun" :data-idx="index">立即兑换</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="integralTask_title">
                <view class="integralTask_title_left">
                    <view>做任务</view>
                    <image src="/static/pages/img/icon_task.png"></image>
                </view>
            </view>
            <view class="integralTask_content">
                <!-- 发布动态 -->
                <view class="integralTask_content_item" v-for="(item, index) in taskList" :key="index">
                    <view class="integralTask_content_item_left">
                        <view class="integralTask_content_item_left_up">
                            <image :src="item.icon" class="integralTask_content_item_left_up_left"></image>
                            <view class="integralTask_content_item_left_up_right">
                                <view class="integralTask_content_item_left_up_right_title">
                                    <view>{{ item.name }}</view>
                                    <view class="integralTask_content_item_left_up_right_title_desc" v-if="item.limit != 0">（{{ item.announce }}/{{ item.limit }}）</view>
                                </view>
                                <view class="integralTask_content_item_left_up_right_desc">{{ item.module }}</view>
                            </view>
                        </view>
                        <view class="integralTask_content_item_left_down">{{ item.description }}</view>
                    </view>

                    <view class="integralTask_content_item_right">
                        <navigator class="integralTask_content_item_right_btn" v-if="item.announce < item.limit || item.limit == 0" :url="item.jump + '?marchantId=' + marchantId">
                            去完成
                        </navigator>
                        <view class="integralTask_content_item_right_btn" style="background: #999" v-else>已完成</view>
                    </view>
                </view>
                <!-- 浏览商品 -->
                <!-- <view class="integralTask_content_item">
      <view class="integralTask_content_item_left">
        <view class="integralTask_content_item_left_up">
          <image src="/pages/img/index/task2.png" class="integralTask_content_item_left_up_left"></image>
          <view class="integralTask_content_item_left_up_right">
            <view class="integralTask_content_item_left_up_right_title">
              <view>分享店铺</view>
              <view class="integralTask_content_item_left_up_right_title_desc">（{{taskNum.transitermarchant}}/5）</view>
            </view>
            <view class="integralTask_content_item_left_up_right_desc">分享转发</view>
          </view>
        </view>
        <view class="integralTask_content_item_left_down">分享店铺5次可获取5积分</view>
      </view>
      <view class="integralTask_content_item_right">
        <navigator class="integralTask_content_item_right_btn" wx:if="{{taskNum.transitermarchant < 5}}" url="/pages/shopHome/home/home?marchantId={{marchantId}}">去完成</navigator>
        <view class="integralTask_content_item_right_btn" style="background:#999" wx:else>已完成</view>
      </view>
    </view> -->
                <!-- 分享商品 -->
                <!-- <view class="integralTask_content_item">
      <view class="integralTask_content_item_left">
        <view class="integralTask_content_item_left_up">
          <image src="/pages/img/index/task3.png" class="integralTask_content_item_left_up_left"></image>
          <view class="integralTask_content_item_left_up_right">
            <view class="integralTask_content_item_left_up_right_title">
              <view>分享商品</view>
              <view class="integralTask_content_item_left_up_right_title_desc">（{{taskNum.transitercommodity}}/5）</view>
            </view>
            <view class="integralTask_content_item_left_up_right_desc">分享转发</view>
          </view>
        </view>
        <view class="integralTask_content_item_left_down">分享商品详情页5次可获取5积分</view>
      </view>
      <view class="integralTask_content_item_right">
        <navigator class="integralTask_content_item_right_btn" wx:if="{{taskNum.transitercommodity < 5}}" url="/pages/shopHome/home/home?marchantId={{marchantId}}">去完成</navigator>
        <view class="integralTask_content_item_right_btn" style="background:#999" wx:else>已完成</view>
      </view>
    </view> -->
                <!-- 购买商品 -->
                <!-- <view class="integralTask_content_item">
      <view class="integralTask_content_item_left">
        <view class="integralTask_content_item_left_up">
          <image src="/pages/img/index/task4.png" class="integralTask_content_item_left_up_left"></image>
          <view class="integralTask_content_item_left_up_right">
            <view class="integralTask_content_item_left_up_right_title">
              <view>购买商品</view>
            </view>
            <view class="integralTask_content_item_left_up_right_desc">购买商品</view>
          </view>
        </view>
        <view class="integralTask_content_item_left_down">店铺每消费金额1元可获取1积分</view>
      </view>
      <view class="integralTask_content_item_right">
        <navigator class="integralTask_content_item_right_btn" url="/pages/Index/Index?marchantId={{marchantId}}">去消费</navigator>
      </view>
    </view> -->
            </view>
        </view>
        <!-- 完成任务后弹框 -->
        <taskPop
            :showTaskPop="showTaskPop"
            text="你已完成发布动态任务获取3积分"
            :marchantId="marchantId"
            style="position: fixed; top: 0; left: 0; right: 0; z-index: 9999"
        ></taskPop>
        <!-- 显示商品详情弹框 -->
        <van-popup :show="showGoodsDetail" closeable position="bottom" @close="closeDetail" close-icon="close" round>
            <view class="goods-detail-container">
                <image :src="nowGoodsDetail.imageUuid" class="goods-detail-img" mode="widthFix"></image>
                <view class="goods-detail-content">
                    <view class="goods-detail-top">
                        <view class="goods-detail-price">
                            <image class="goods-detail-icon" src="/static/pages/img/index/goods_price_icon.png" />
                            {{ nowGoodsDetail.score }}积分
                        </view>
                        <view class="goods-detail-label">剩余{{ nowGoodsDetail.rest }}</view>
                        <view class="goods-detail-label" v-if="nowGoodsDetail.disbursement == 1 || nowGoodsDetail.disbursement == 3">到店领取</view>
                        <view class="goods-detail-label" v-if="nowGoodsDetail.disbursement == 2 || nowGoodsDetail.disbursement == 3">商家配送</view>
                    </view>
                    <view class="goods-detail-name">{{ nowGoodsDetail.presentName }}</view>
                    <view class="goods-detail-text">{{ nowGoodsDetail.descriptions }}</view>
                    <view
                        class="goods-detail-btn"
                        @tap.stop.prevent="showSelectTypeFun"
                        :style="'background:' + (nowGoodsDetail.rest > 0 && userintegral >= nowGoodsDetail.score ? '' : '#999')"
                    >
                        {{ userintegral < nowGoodsDetail.score ? '积分不足' : nowGoodsDetail.rest == 0 ? '库存不足' : '立即兑换' }}
                    </view>
                </view>
            </view>
        </van-popup>
        <!-- 显示配送方式弹框 -->
        <van-popup :show="showSelectType" closeable position="bottom" @close="closeType" close-icon="close" round>
            <view class="selectType">
                <view class="selectType_title" v-if="!hideTabs">
                    <block v-for="(item, index) in typeList" :key="index">
                        <view @tap="changeType" :data-index="index" :class="'selectType_title_item ' + (selectType == index ? item.class : '')">{{ item.name }}</view>
                    </block>
                </view>
                <view class="no-select-type" v-if="hideTabs">{{ selectType ? '商家配送' : '门店团购' }}</view>
                <view class="selectType_content">
                    <view class="selectType_content_item" v-if="selectType == 0">
                        <view class="selectType_content_item_label">到店时间</view>
                        ：
                        <view class="selectType_content_item_box" @tap="showTimeSelectFun">
                            <view class="selectType_content_item_box_input">
                                <view>{{ selectedTime ? selectedTime : '请选择到店领取时间' }}</view>
                                <image src="/static/pages/img/index/arrow_right.png" style="width: 24rpx; height: 48rpx"></image>
                            </view>
                        </view>
                    </view>
                    <view class="selectType_content_item">
                        <view class="selectType_content_item_label">联系方式</view>
                        ：
                        <view class="selectType_content_item_box" @tap="toSelectAddress">
                            <view class="selectType_contemt_item_box_item" style="border-bottom: 2rpx solid #f7f7f7">
                                联系人：{{ selectType == 0 ? toStoreContactMan : logisticsContactMan }} {{ selectType == 0 ? toStoreTel : logisticsTel }}
                            </view>
                            <view class="selectType_contemt_item_box_item">地址：{{ selectType == 0 ? toStoreAddress : logisticsAddress }}</view>
                        </view>
                    </view>
                    <view class="selectType_content_item">
                        <view class="selectType_content_item_label">留言</view>
                        ：
                        <view class="selectType_content_item_box_textarea">
                            <textarea :value="messageValue" @input="getMessageValue" maxlength="50"></textarea>
                            <view>{{ messageValue.length < 50 ? messageValue.length : 50 }}/50</view>
                        </view>
                    </view>
                    <view @tap="exchangeIn" class="selectType_btn">提交</view>
                </view>
            </view>
        </van-popup>
        <!-- 选择到店时间弹框 -->
        <!-- 时间选择 -->
        <van-popup :show="showTimeSelect" @close="closeTimeSelect" position="bottom">
            <van-datetime-picker type="date" title="请选择年月日" @confirm="onInput" @cancel="closeTimeSelect" :min-date="minDate" :max-date="maxDate" :formatter="formatter" />
        </van-popup>
    </view>
</template>

<script>
import taskPop from '@/pages/Index/integral/components/integralTask/integralTask';
// import vanPopup from './@vant/weapp/popup/index';
// import vanDatetimePicker from './@vant/weapp/datetime-picker/index';
// pages/Index/integral/integralTask/integralTask.js
const app = getApp();
export default {
    components: {
        taskPop,
        // vanPopup,
        // vanDatetimePicker
    },
    data() {
        return {
            taskList: [],
            showTaskPop: false,
            showGoodsDetail: false,
            // 是否显示商品详情
            showSelectType: false,
            // 是否显示配送方式
            selectType: 0,
            // 选择配送的方式
            typeList: [
                // 配送方式列表
                {
                    name: '门店团购',
                    class: 'selectType_title_item_active1'
                },
                {
                    name: '商家配送',
                    class: 'selectType_title_item_active2'
                }
            ],
            marchantId: 0,
            // 商家id
            exchangeGoodsList: [],
            // 可兑换商品列表
            nowGoodsDetail: {
                imageUuid: '',
                rest: '',
                disbursement: 0,
                presentName: '',
                descriptions: '',
                score: 0
            },
            //当前商品详情
            userintegral: 0,
            //用户积分
            toStoreContactMan: '',
            // 到店的联系人
            toStoreAddress: '',
            // 到店的地址
            toStoreTel: '',
            // 到店的联系电话
            logisticsContactMan: '',
            // 配送的联系人
            logisticsAddress: '',
            // 配送的地址
            logisticsTel: '',
            // 配送的联系电话
            messageValue: '',
            // 留言
            hideTabs: true,
            // 是否有tab类型选择
            minDate: new Date().getTime(),
            // 可选最小时间
            maxDate: new Date().getTime() + 6 * 24 * 60 * 60 * 1000,
            // 可选最大时间
            showTimeSelect: false,
            // 选择时间弹框
            currentDate: '',
            // 当前选择框时间中间变量
            selectedTime: '',
            // 当前所选时间
            community: 0,

            // 是否开启订阅通知
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`;
                } else if (type === 'day') {
                    return `${value}日`;
                }

                return value;
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            marchantId: options.marchantId
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
        this.getTaskNum(); // 获取用户当前任务完成情况

        await this.getUserIntegral(); // 获取用户当前积分

        this.getIntegralInfo(); // 获取用户当前积分可兑换商品列表
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
        // 获取参数
        getTaskNum() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/integral/queryMyTaskList', data).then((res) => {
                this.setData({
                    taskList: res.data.data
                });
            });
        },

        // 查询积分商品信息
        getIntegralInfo() {
            let that = this;
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/integral/queryPrize', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    let goodsList = [];
                    res.data.data.forEach((item) => {
                        if (that.userintegral >= item.score && item.rest != 0) {
                            goodsList.push(item);
                        }
                    });
                    this.setData({
                        exchangeGoodsList: goodsList
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        //  查询用户积分
        getUserIntegral() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/integral/queryInte', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        userintegral: res.data.data.score,
                        toStoreContactMan: res.data.data.merchantInfo.legalPerson || res.data.data.merchantInfo.nickName,
                        toStoreTel: res.data.data.merchantInfo.telephone,
                        community: res.data.data.merchantInfo.community,
                        toStoreAddress: res.data.data.merchantInfo.entirelyAddress
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 显示商品详情弹框
        showDetail(e) {
            let idx = e.currentTarget.dataset.idx;
            this.setData({
                showGoodsDetail: true,
                nowGoodsDetail: this.exchangeGoodsList[idx]
            });
        },

        // 关闭商品详情弹框
        closeDetail() {
            this.setData({
                showGoodsDetail: false
            });
        },

        // 显示方式选择
        showSelectTypeFun(e) {
            let idx = e.currentTarget.dataset.idx;

            if (idx >= 0) {
                this.setData({
                    nowGoodsDetail: this.exchangeGoodsList[idx]
                });
            }

            if (this.nowGoodsDetail.score > this.userintegral) {
                uni.showToast({
                    title: '您的积分不足',
                    icon: 'none'
                });
                return;
            }

            if (this.nowGoodsDetail.rest == 0) {
                uni.showToast({
                    title: '库存不足',
                    icon: 'none'
                });
                return;
            }

            if (this.nowGoodsDetail.disbursement == 3) {
                //两种都有
                this.setData({
                    hideTabs: false,
                    selectType: 0
                });
            } else {
                // 只有一种
                this.setData({
                    hideTabs: true,
                    selectType: this.nowGoodsDetail.disbursement - 1
                });
            }

            this.setData({
                showSelectType: true,
                showGoodsDetail: false
            });
        },

        // 显示方式选择
        closeType() {
            this.setData({
                showSelectType: false
            });
        },

        // 更改配送方式
        changeType(e) {
            this.setData({
                selectType: e.currentTarget.dataset.index
            });
        },

        // 选择配送地址
        toSelectAddress() {
            if (this.selectType == 1) {
                app.globalData.comefrom = 'integral';
                uni.navigateTo({
                    url: '/pages/Address/AddressList/AddressList'
                });
            }
        },

        // 获得留言信息
        getMessageValue(e) {
            this.setData({
                messageValue: e.detail.value.trim()
            });
        },

        //  选择时间弹框
        showTimeSelectFun() {
            this.setData({
                showTimeSelect: true,
                currentDate: new Date(this.currentDate).getTime()
            });
        },

        //  关闭选择时间弹框
        closeTimeSelect() {
            this.setData({
                showTimeSelect: false
            });
        },

        onInput(event) {
            // 确认时间
            this.setData({
                currentDate: this.formatDate(event.detail),
                selectedTime: this.formatDate(event.detail)
            });
            this.closeTimeSelect();
        },

        // 兑换
        exchangeIn() {
            let data = {
                marchantId: this.marchantId,
                presentId: this.nowGoodsDetail.id,
                getWay: this.selectType + 1,
                message: this.messageValue
            };

            if (this.selectType == 0) {
                // 到店
                if (!this.selectedTime) {
                    uni.showToast({
                        title: '请选择到店时间',
                        icon: 'none'
                    });
                    return;
                }

                data.address = this.toStoreAddress;
                data.contacts = this.toStoreContactMan;
                data.contactsWay = this.toStoreTel;
                data.arriveTime = this.selectedTime;
            }

            if (this.selectType == 1) {
                //  配送
                if (!this.logisticsAddress) {
                    uni.showToast({
                        title: '请选择联系方式',
                        icon: 'none'
                    });
                    return;
                }

                data.address = this.logisticsAddress;
                data.contacts = this.logisticsContactMan;
                data.contactsWay = this.logisticsTel;
            }

            uni.showLoading({
                title: '兑换中',
                mask: true
            });
            return app.globalData.sjrequest('/integral/exchangeIn', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '兑换成功'
                    });
                    this.setData({
                        showSelectType: false
                    });
                    setTimeout((res) => {
                        uni.navigateTo({
                            url: `/pages/Index/integral/integralRecord/integralRecord?marchantId=${this.marchantId}`
                        });
                    }, 1000);
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        formatDate(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return YY + MM + DD;
        }
    }
};
</script>
<style>
.integralTask {
    width: 100%;
    min-height: 100vh;
    background: #ffe8b6;
}
.integralTask_image {
    width: 100%;
    height: 408rpx;
    vertical-align: bottom;
}
.integralTask_title {
    width: 710rpx;
    height: 62rpx;
    background: linear-gradient(180deg, #f95607 0%, #f57432 100%);
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    margin: 0 auto 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.integralTask_title_left {
    font-size: 32rpx;
    font-weight: bold;
    line-height: 44rpx;
    color: #ffffff;
    margin-right: 6rpx;
    display: flex;
    align-items: center;
}
.integralTask_title_left image {
    width: 32rpx;
    height: 32rpx;
}
.integralTask_title_right {
    font-size: 24rpx;
    font-weight: 500;
    line-height: 34rpx;
    color: #ffffff;
}
.integralTask_list {
    margin: 0 20rpx 24rpx 20rpx;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
}
.integralTask_list_item {
    width: 276rpx;
    height: 184rpx;
    background: linear-gradient(180deg, #f95607 0%, #f57432 100%);
    border-radius: 16rpx;
    margin-right: 22rpx;
}
.integralTask_list_title {
    width: 240rpx;
    height: 38rpx;
    font-size: 20rpx;
    font-weight: bold;
    line-height: 38rpx;
    text-align: center;
    color: #ffffff;
    margin-left: 8rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.integralTask_list_content {
    width: 260rpx;
    height: 138rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin: 0 auto;
    display: flex;
}
.integralTask_list_content image {
    width: 132rpx;
    height: 138rpx;
    border-radius: 10px 0px 0px 10px;
    vertical-align: bottom;
}
.integralTask_list_content_right {
    padding: 6rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.integralTask_list_content_integral {
    font-size: 20rpx;
    font-weight: bold;
    line-height: 28rpx;
    color: #f95607;
}
.integralTask_list_content_tips {
    display: flex;
    flex-wrap: wrap;
}
.integralTask_list_content_tips_item {
    width: 56rpx;
    height: 24rpx;
    background: #fddccd;
    border-radius: 12rpx;
    font-size: 12rpx;
    font-weight: bold;
    line-height: 24rpx;
    text-align: center;
    color: #fe4a0b;
    margin: 4rpx 2rpx 0 0;
}
.integralTask_list_content_btn {
    width: 116rpx;
    height: 36rpx;
    background: linear-gradient(180deg, #f95607 0%, #f57432 100%);
    border-radius: 18rpx;
    font-size: 20rpx;
    font-weight: 500;
    line-height: 36rpx;
    text-align: center;
    color: #ffffff;
}
.integralTask_content {
    padding: 10rpx 20rpx 20rpx;
    box-sizing: border-box;
}
.integralTask_content_item {
    display: flex;
    margin-top: 20rpx;
    width: 100%;
    height: 150rpx;
}
.integralTask_content_item:first-child {
    margin-top: 0;
}
.integralTask_content_item_left {
    background: #fcf8f6;
    border: 2rpx solid #fa9e7e;
    border-right: none;
    border-radius: 16rpx 0 0 16rpx;
    box-sizing: border-box;
    width: 530rpx;
    padding: 26rpx 0 12rpx 20rpx;
    display: flex;
    flex-direction: column;
    position: relative;
}
.integralTask_content_item_left:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    margin-top: -2rpx;
    transform: translate(50%);
    background: #ffe8b6;
    border: 1rpx#FA9E7E solid;
    border-top: none;
    border-radius: 0 0 8rpx 8rpx;
    width: 16rpx;
    height: 8rpx;
}
.integralTask_content_item_left:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: -2rpx;
    transform: translate(50%);
    background: #ffe8b6;
    border: 1rpx#FA9E7E solid;
    border-bottom: none;
    border-radius: 8rpx 8rpx 0 0;
    width: 16rpx;
    height: 8rpx;
}
.integralTask_content_item_left_up {
    display: flex;
}
.integralTask_content_item_left_up_left {
    width: 72rpx;
    height: 72rpx;
}
.integralTask_content_item_left_up_right {
    margin-left: 12rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.integralTask_content_item_left_up_right_title {
    display: flex;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 44rpx;
    color: #666666;
}
.integralTask_content_item_left_up_right_title_desc {
    font-size: 22rpx;
}
.integralTask_content_item_left_up_right_desc {
    padding: 2rpx 4rpx;
    height: 22rpx;
    width: fit-content;
    background: #f95607;
    border-radius: 4rpx;
    font-size: 16rpx;
    font-weight: 400;
    color: #ffffff;
}
.integralTask_content_item_left_down {
    margin: 12rpx 0 0 84rpx;
    font-size: 22rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: #666666;
}
.integralTask_content_item_right {
    background: #fcf8f6;
    border: 2rpx solid #fa9e7e;
    border-radius: 0 16rpx 16rpx 0;
    box-sizing: border-box;
    border-left: 2rpx dashed #fa9e7e;
    box-sizing: border-box;
    width: 180rpx;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.integralTask_content_item_right_btn {
    padding: 6rpx 18rpx;
    background: linear-gradient(180deg, #f95607 0%, #f57432 100%);
    border-radius: 30rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #8326f2;
}
/* 显示商品详情弹框 */
.goods-detail-container {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}
.goods-detail-img {
    width: 100%;
    /* height: 460rpx; */
}
.goods-detail-content {
    width: 100%;
    padding: 10rpx 28rpx 22rpx 20rpx;
    box-sizing: border-box;
}
.goods-detail-top {
    width: 100%;
    display: flex;
    align-items: flex-end;
}
.goods-detail-price {
    height: 50rpx;
    display: flex;
    align-items: center;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #ff0000;
}
.goods-detail-icon {
    width: 36rpx;
    height: 36rpx;
    margin-right: 6rpx;
}
.goods-detail-label {
    width: fit-content;
    height: 32rpx;
    background: #fddccd;
    border-radius: 4rpx;
    padding: 0 2rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fe4a0b;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16rpx;
    margin-bottom: 8rpx;
}
.goods-detail-name {
    max-height: 80rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin: 16rpx 0 8rpx;
}
.goods-detail-text {
    width: 500rpx;
    max-height: 56rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.goods-detail-btn {
    width: 250rpx;
    height: 52rpx;
    background: #e23e3e;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 36rpx auto 0;
}
/* 配送方式弹框 */
.selectType {
    padding-top: 80rpx;
    height: 674rpx;
    box-sizing: border-box;
}
.no-select-type {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
    background: #e23e3e;
}
.selectType_title {
    display: flex;
    width: 100%;
    height: 60rpx;
    font-size: 24rpx;
    font-weight: bold;
    text-align: center;
    line-height: 60rpx;
    color: #ffffff;
    background: #999999;
}
.selectType_title_item {
    width: 100%;
}
.selectType_title_item_active1,
.selectType_title_item_active2 {
    background: #e23e3e;
    position: relative;
}
.selectType_title_item_active1::after,
.selectType_title_item_active2::after {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
}
.selectType_title_item_active1::after {
    right: 0;
    border-top: 60rpx solid #e23e3e;
    border-right: 44rpx solid transparent;
    transform: translate(100%);
}
.selectType_title_item_active2::after {
    left: 0;
    border-bottom: 60rpx solid #e23e3e;
    border-left: 44rpx solid transparent;
    transform: translate(-100%);
}
.selectType_content {
    padding: 0 20rpx;
}
.selectType_content_item {
    margin-top: 20rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
    display: flex;
}
.selectType_content_item_label {
    width: 140rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: justify;
    text-align-last: justify;
}
.selectType_content_item_label:after {
    content: '';
    display: inline-block;
    width: 100%;
}
.selectType_content_item_box {
    color: #999999;
    font-size: 24rpx;
    width: 424rpx;
    border: 2rpx solid #e4e4e4;
    border-radius: 8rpx;
    line-height: 50rpx;
    box-sizing: border-box;
}
.selectType_content_item_box_input {
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
.selectType_content_item_box_input image {
    width: 24rpx;
    height: 48rpx;
}
.selectType_contemt_item_box_item {
    padding-left: 20rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: 100rpx;
}
.selectType_content_item_box_textarea {
    position: relative;
}
.selectType_content_item_box_textarea textarea {
    width: 424rpx;
    height: 140rpx;
    background: #e4e4e4;
    color: #666;
    font-size: 24rpx;
    border-radius: 8rpx;
    padding: 10rpx 20rpx;
    line-height: 30rpx;
    box-sizing: border-box;
}
.selectType_content_item_box_textarea view {
    position: absolute;
    right: 8rpx;
    bottom: 8rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #666666;
}
.selectType_btn {
    width: 424rpx;
    height: 68rpx;
    background: #e23e3e;
    border-radius: 34rpx;
    font-size: 32rpx;
    font-weight: bold;
    line-height: 68rpx;
    color: #ffffff;
    text-align: center;
    margin: 28rpx auto 0;
}
</style>
