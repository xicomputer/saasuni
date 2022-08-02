<template>
    <view class="van-panel van-hairline--top-bottom custom-class">
        <van-cell v-if="title || desc || status" :title="title" :label="desc" :value="status" custom-class="header-class" value-class="van-panel__header-value" />
        <slot v-else name="header" />

        <view class="van-panel__content">
            <slot />
        </view>

        <view v-if="useFooterSlot" class="van-panel__footer van-hairline--top footer-class">
            <slot name="footer" />
        </view>
    </view>
</template>

<script>
'use strict';
import vanCell from '../cell/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

component_1.VantComponent({
    classes: ['header-class', 'footer-class'],
    props: {
        desc: String,
        title: String,
        status: String,
        useFooterSlot: Boolean
    }
});
</script>
<style>
@import '../common/index.css';
.van-panel {
    background: #fff;
    background: var(--panel-background-color, #fff);
}
.van-panel__header-value {
    color: #ee0a24;
    color: var(--panel-header-value-color, #ee0a24);
}
.van-panel__footer {
    padding: 8px 16px;
    padding: var(--panel-footer-padding, 8px 16px);
}
</style>
