<template>
    <view>
        <script module="computed" lang="wxs" src="./index.wxs"></script>

        <van-popup
            round
            class="van-share-sheet"
            :show="show"
            position="bottom"
            :overlay="overlay"
            :duration="duration"
            :z-index="zIndex"
            :overlay-style="overlayStyle"
            :close-on-click-overlay="closeOnClickOverlay"
            :safe-area-inset-bottom="safeAreaInsetBottom"
            @close="onClose"
            @click-overlay="onClickOverlay"
        >
            <view class="van-share-sheet__header">
                <view class="van-share-sheet__title">
                    <slot name="title" />
                </view>
                <view v-if="title" class="van-share-sheet__title">{{ title }}</view>

                <view class="van-share-sheet__description">
                    <slot name="description" />
                </view>
                <view v-if="description" class="van-share-sheet__description">
                    {{ description }}
                </view>
            </view>

            <block v-if="computed.isMulti(options)">
                <options :show-border="index !== 0" :options="item" @select="onSelect" v-for="(item, index) in options" :key="index"></options>
            </block>

            <options v-else :options="options" @select="onSelect" />

            <button type="button" class="van-share-sheet__cancel" @tap="onCancel">
                {{ cancelText }}
            </button>
        </van-popup>
    </view>
</template>

<script>
'use strict';
import vanPopup from '../popup/index';
import options from './options';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

component_1.VantComponent({
    props: {
        // whether to show popup
        show: Boolean,
        // overlay custom style
        overlayStyle: Object,
        // z-index
        zIndex: [Number, String],
        title: String,
        cancelText: {
            type: String,
            value: '取消'
        },
        description: String,
        options: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: true
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        duration: {
            type: null,
            value: 300
        }
    },
    methods: {
        onClickOverlay: function () {
            this.$emit('click-overlay');
        },
        onCancel: function () {
            this.onClose();
            this.$emit('cancel');
        },
        onSelect: function (event) {
            this.$emit('select', event.detail);
        },
        onClose: function () {
            this.$emit('close');
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-share-sheet__header {
    padding: 12px 16px 4px;
    text-align: center;
}
.van-share-sheet__title {
    margin-top: 8px;
    color: #323233;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
}
.van-share-sheet__title:empty,
.van-share-sheet__title:not(:empty) + .van-share-sheet__title {
    display: none;
}
.van-share-sheet__description {
    display: block;
    margin-top: 8px;
    color: #969799;
    font-size: 12px;
    line-height: 16px;
}
.van-share-sheet__description:empty,
.van-share-sheet__description:not(:empty) + .van-share-sheet__description {
    display: none;
}
.van-share-sheet__cancel {
    display: block;
    box-sizing: initial;
    width: 100%;
    height: auto;
    padding: 0;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    background: #fff;
    border: none;
}
.van-share-sheet__cancel:before {
    display: block;
    height: 8px;
    background-color: #f7f8fa;
    content: ' ';
}
.van-share-sheet__cancel:after {
    display: none;
}
.van-share-sheet__cancel:active {
    background-color: #f2f3f5;
}
</style>
