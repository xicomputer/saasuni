<template>
    <view>
        <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

        <van-transition
            name="slide-down"
            :show="show"
            custom-class="van-notify__container"
            :custom-style="'z-index: ' + zIndex + '; top: ' + utils.addUnit(top)"
            @tap.native="onTap"
        >
            <view :class="'van-notify van-notify--' + type" :style="'background:' + background + ';color:' + color + ';'">
                <view v-if="safeAreaInsetTop" :style="'height: ' + statusBarHeight + 'px'" />
                <text>{{ message }}</text>
            </view>
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

var color_1 = require('../common/color');

component_1.VantComponent({
    props: {
        message: String,
        background: String,
        type: {
            type: String,
            value: 'danger'
        },
        color: {
            type: String,
            value: color_1.WHITE
        },
        duration: {
            type: Number,
            value: 3000
        },
        zIndex: {
            type: Number,
            value: 110
        },
        safeAreaInsetTop: {
            type: Boolean,
            value: false
        },
        top: null
    },
    data: {
        show: false
    },
    created: function () {
        var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
        this.setData({
            statusBarHeight: statusBarHeight
        });
    },
    methods: {
        show: function () {
            var that = this;
            var _a = this.data;
            var duration = _a.duration;
            var onOpened = _a.onOpened;
            clearTimeout(this.timer);
            this.setData({
                show: true
            });
            uni.nextTick(onOpened);

            if (duration > 0 && duration !== Infinity) {
                this.timer = setTimeout(function () {
                    that.hide();
                }, duration);
            }
        },
        hide: function () {
            var onClose = this.data.onClose;
            clearTimeout(this.timer);
            this.setData({
                show: false
            });
            uni.nextTick(onClose);
        },
        onTap: function (event) {
            var onClick = this.data.onClick;

            if (onClick) {
                onClick(event.detail);
            }
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-notify {
    text-align: center;
    word-wrap: break-word;
    padding: 6px 15px;
    padding: var(--notify-padding, 6px 15px);
    font-size: 14px;
    font-size: var(--notify-font-size, 14px);
    line-height: 20px;
    line-height: var(--notify-line-height, 20px);
}
.van-notify__container {
    position: fixed;
    top: 0;
    box-sizing: border-box;
    width: 100%;
}
.van-notify--primary {
    background-color: #1989fa;
    background-color: var(--notify-primary-background-color, #1989fa);
}
.van-notify--success {
    background-color: #07c160;
    background-color: var(--notify-success-background-color, #07c160);
}
.van-notify--danger {
    background-color: #ee0a24;
    background-color: var(--notify-danger-background-color, #ee0a24);
}
.van-notify--warning {
    background-color: #ff976a;
    background-color: var(--notify-warning-background-color, #ff976a);
}
</style>
