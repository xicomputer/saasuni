<template>
    <view class="van-index-anchor-wrapper" :style="wrapperStyle">
        <view :class="'van-index-anchor ' + (active ? 'van-index-anchor--active van-hairline--bottom' : '')" :style="anchorStyle">
            <slot v-if="useSlot" />
            <block v-else>
                <text>{{ index }}</text>
            </block>
        </view>
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

component_1.VantComponent({
    relation: {
        name: 'index-bar',
        type: 'ancestor',
        current: 'index-anchor'
    },
    props: {
        useSlot: Boolean,
        index: null
    },
    data: {
        active: false,
        wrapperStyle: '',
        anchorStyle: ''
    },
    methods: {
        scrollIntoView: function (scrollTop) {
            var that = this;
            this.getBoundingClientRect().then(function (rect) {
                uni.pageScrollTo({
                    duration: 0,
                    scrollTop: scrollTop + rect.top - that.parent.data.stickyOffsetTop
                });
            });
        },
        getBoundingClientRect: function () {
            return this.getRect('.van-index-anchor-wrapper');
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-index-anchor {
    padding: 0 16px;
    padding: var(--index-anchor-padding, 0 16px);
    color: #323233;
    color: var(--index-anchor-text-color, #323233);
    font-weight: 500;
    font-weight: var(--index-anchor-font-weight, 500);
    font-size: 14px;
    font-size: var(--index-anchor-font-size, 14px);
    line-height: 32px;
    line-height: var(--index-anchor-line-height, 32px);
    background-color: initial;
    background-color: var(--index-anchor-background-color, transparent);
}
.van-index-anchor--active {
    right: 0;
    left: 0;
    color: #07c160;
    color: var(--index-anchor-active-text-color, #07c160);
    background-color: #fff;
    background-color: var(--index-anchor-active-background-color, #fff);
}
</style>
