<template>
    <view>
        <!-- 商品类型类别 -->

        <!-- 滑动类 -->
        <view v-if="tempId == 5" class="goods-types-list">
            <scroll-view :scroll-x="true">
                <view class="me-fx-row me-fx-start-c scroll-content">
                    <view class="type-item0" @tap="navito" :data-name="item.classifyName" :data-id="item.id" v-for="(item, index) in goodsList" :key="index">
                        <image class="type-img" :src="item.imageUuid"></image>

                        <view class="type-name-box">
                            <text class="type-name me-full-text">{{ item.classifyName }}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 平铺类 -->
        <swiper v-if="tempId == 1" :class="list[0].length <= 5 ? 'swiper1' : 'swiper2'">
            <swiper-item v-for="(its, index) in list" :key="index">
                <view class="me-fx-row me-fx-start-c goods-types-list">
                    <view
                        class="me-fx-col me-fx-c-c type-item1 type-item2"
                        @tap="navito"
                        :data-name="item.classifyName"
                        :data-id="item.id"
                        v-for="(item, idx) in its"
                        :key="item.idx"
                    >
                        <image v-if="item.imageUuid" class="type-img" :src="item.imageUuid"></image>

                        <view v-else :class="'me-fx-col me-fx-c-c fill-elem ' + fillElemBg">
                            <text class="fill-elem-text me-full-text">{{ item.classifyName }}</text>
                        </view>

                        <text class="me-full-text">{{ item.classifyName }}</text>
                    </view>
                </view>
            </swiper-item>
        </swiper>

        <!-- 平铺类2 -->
        <scroll-view v-else-if="tempId == 2 || tempId == 6 || tempId > 7" class="swiper1" :scroll-x="true">
            <block v-for="(its, index) in list" :key="index">
                <view class="me-fx-row me-fx-start-c">
                    <view
                        class="me-fx-col me-fx-c-c type-item1 type-item2"
                        @tap="navito"
                        :data-name="item.classifyName"
                        :data-id="item.id"
                        v-for="(item, idx) in its"
                        :key="item.idx"
                    >
                        <image v-if="item.imageUuid" class="type-img" :src="item.imageUuid"></image>

                        <view v-else :class="'me-fx-col me-fx-c-c fill-elem ' + fillElemBg">
                            <text class="fill-elem-text me-full-text">{{ item.classifyName }}</text>
                        </view>

                        <text class="me-full-text">{{ item.classifyName }}</text>
                    </view>
                </view>
            </block>
        </scroll-view>

        <!-- 平铺类3 -->
        <scroll-view v-else-if="tempId == 3 || tempId == 4 || tempId == 7" class="swiper1" :scroll-x="true">
            <block v-for="(its, index) in list" :key="index">
                <view class="me-fx-row me-fx-start-c">
                    <view
                        class="me-fx-col me-fx-c-c type-item1 type-item3"
                        @tap="navito"
                        :data-name="item.classifyName"
                        :data-id="item.id"
                        v-for="(item, idx) in its"
                        :key="item.idx"
                    >
                        <image v-if="item.imageUuid" class="type-img" :src="item.imageUuid"></image>

                        <view v-else :class="'me-fx-col me-fx-c-c fill-elem ' + fillElemBg">
                            <text class="fill-elem-text me-full-text">{{ item.classifyName }}</text>
                        </view>

                        <text class="me-full-text">{{ item.classifyName }}</text>
                    </view>
                </view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
// pages/Index/shopHome/components/goodsTypes/goodsTypes.js
export default {
    data() {
        return {
            tempId: 1,
            fillElemBg: '',
            list: [],
            typeNum: 0,
            its: []
        };
    }
    /**
     * 组件的属性列表
     */,
    props: {
        tempId: {
            type: [String, Number],
            default: 1
        },
        goodsList: {
            type: Array,
            default: () => []
        },
        marchantId: {
            type: [String, Number],
            default: ''
        }
    },
    beforeMount: function () {
        this.tempId = this.tempId;
        this.getTempClass();
    },
    watch: {
        goodsList: {
            handler: function () {
                let list = [];
                let arr = [];
                this.goodsList.map((item, index) => {
                    if (index % 10 === 0 && index !== 0) {
                        list.push(arr);
                        arr = [];
                    }

                    arr.push(item);
                });
                list.push(arr);
                this.setData({
                    list
                });
            },

            immediate: true,
            deep: true
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        navito(e) {
            const { name, id } = e.currentTarget.dataset;
            uni.navigateTo({
                url: `/pages/Index/GoodsList/GoodsList?category=${name}&marchantId=${this.marchantId}&classifyId=${id}`
            });
        },

        getTempClass() {
            var tempId = this.tempId;
            var fillElemBg = '';

            switch (tempId) {
                case '6':
                    fillElemBg = 'fill-elem2';
                    break;

                case '7':
                    fillElemBg = 'fill-elem3';
                    break;

                case '8':
                    fillElemBg = 'fill-elem4';
                    break;

                case '9':
                    fillElemBg = 'fill-elem5';
                    break;

                case '10':
                    fillElemBg = 'fill-elem6';
                    break;

                case '11':
                    fillElemBg = 'fill-elem7';
                    break;

                default:
                    fillElemBg = 'fill-elem1';
            }

            this.setData({
                fillElemBg
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';

.goods-types-list {
    flex-wrap: wrap;
}

/* ----------- 滑动的类 ------------ */
.scroll-content {
    padding: 20rpx 32rpx;
    box-sizing: border-box;
}
.type-item0 {
    width: 218rpx;
    height: 310rpx;
    margin-right: 16rpx;
    flex-shrink: 0;
    position: relative;
}
.type-item0 .type-img {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
    background-color: #ccc;
}
.type-item0 .type-name-box {
    position: absolute;
    left: 0;
    bottom: 16rpx;
    width: 100%;
    text-align: center;
}
.type-item0 .type-name-box .type-name {
    background-color: #fff;
    font-size: 28rpx;
    border-radius: 10rpx;
    margin: 0 30rpx;
}

/* ------------- 平铺的类 --------------- */
.type-item1 {
    font-size: 28rpx;
    color: #333;
    width: 20%;
    padding: 20rpx 0;
    box-sizing: border-box;
}
.type-item1 .type-img {
    width: 100rpx;
    height: 100rpx;
    margin-bottom: 8rpx;
    background-color: #ccc;
    border-radius: 50%;
}
.type-item1 .fill-elem {
    width: 100rpx;
    height: 100rpx;
    color: #fff;
    margin-bottom: 8rpx;
    border-radius: 50%;
}
.fill-elem .fill-elem-text {
    width: 60rpx;
    text-align: center;
    line-height: 35rpx;
}

.fill-elem1 {
    background-color: #fe4f4f;
}
.fill-elem2 {
    background-color: #999;
}
.fill-elem3 {
    background-color: #3f8dff;
}
.fill-elem4 {
    background-color: #fe7e8e;
}
.fill-elem5 {
    background-color: #ff8b4e;
}
.fill-elem6 {
    background-color: #2ca4f0;
}
.fill-elem7 {
    background-color: #9ec06c;
}
.swiper1 {
    height: 193rpx;
}
.swiper2 {
    height: 386rpx;
}
.type-item2 {
    width: 25%;
    flex-grow: 0;
    flex-shrink: 0;
}
.type-item3 {
    flex-grow: 0;
    flex-shrink: 0;
}
</style>
