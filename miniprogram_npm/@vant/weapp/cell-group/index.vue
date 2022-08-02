<template>
    <view>
        <view v-if="title" class="van-cell-group__title">
            {{ title }}
        </view>
        <view :class="'custom-class van-cell-group ' + (border ? 'van-hairline--top-bottom' : '')">
            <slot />
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
    props: {
        title: String,
        border: {
            type: Boolean,
            value: true
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-cell-group__title {
    padding: 16px 16px 8px;
    padding: var(--cell-group-title-padding, 16px 16px 8px);
    font-size: 14px;
    font-size: var(--cell-group-title-font-size, 14px);
    line-height: 16px;
    line-height: var(--cell-group-title-line-height, 16px);
    color: #969799;
    color: var(--cell-group-title-color, #969799);
}
</style>
