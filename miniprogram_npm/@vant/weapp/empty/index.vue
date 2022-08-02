<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view class="custom-class van-empty">
        <view class="van-empty__image">
            <slot name="image"></slot>
        </view>
        <view class="van-empty__image">
            <image v-if="imageUrl" class="van-empty__image__img" :src="imageUrl" />
        </view>

        <view class="van-empty__description">
            <slot name="description"></slot>
        </view>
        <view class="van-empty__description">
            {{ description }}
        </view>

        <view class="van-empty__bottom">
            <slot></slot>
        </view>
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var PRESETS = ['error', 'search', 'default', 'network'];
component_1.VantComponent({
    props: {
        description: String,
        image: {
            type: String,
            value: 'default'
        }
    },
    created: function () {
        if (PRESETS.indexOf(this.data.image) !== -1) {
            this.setData({
                imageUrl: 'https://img.yzcdn.cn/vant/empty-image-' + this.data.image + '.png'
            });
        } else {
            this.setData({
                imageUrl: this.data.image
            });
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-empty {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 32px 0;
}
.van-empty__image {
    width: 160px;
    height: 160px;
}
.van-empty__image:empty {
    display: none;
}
.van-empty__image__img {
    width: 100%;
    height: 100%;
}
.van-empty__image:not(:empty) + .van-empty__image {
    display: none;
}
.van-empty__description {
    margin-top: 16px;
    padding: 0 60px;
    color: #969799;
    font-size: 14px;
    line-height: 20px;
}
.van-empty__description:empty,
.van-empty__description:not(:empty) + .van-empty__description {
    display: none;
}
.van-empty__bottom {
    margin-top: 24px;
}
</style>
