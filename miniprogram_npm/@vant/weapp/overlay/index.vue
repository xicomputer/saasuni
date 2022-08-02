<template>
    <view>
        <van-transition
            :show="show"
            custom-class="van-overlay"
            :custom-style="'z-index: ' + zIndex + '; ' + customStyle"
            :duration="duration"
            @tap.native="onClick"
            @touchmove.native.stop.prevent="noop"
        >
            <slot></slot>
        </van-transition>
    </view>
</template>

<script>
'use strict';
import vanTransition from '../transition/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

component_1.VantComponent({
    props: {
        show: Boolean,
        customStyle: String,
        duration: {
            type: null,
            value: 300
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    methods: {
        onClick: function () {
            this.$emit('click');
        },
        // for prevent touchmove
        noop: function () {}
    }
});
</script>
<style>
@import '../common/index.css';
.van-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    background-color: var(--overlay-background-color, rgba(0, 0, 0, 0.7));
}
</style>
