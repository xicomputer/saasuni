<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view
        v-if="show"
        :class="'custom-class ' + utils.bem('notice-bar', { withicon: mode, wrapable })"
        :style="'color: ' + color + '; background-color: ' + backgroundColor + '; background: ' + background"
        @tap="onClick"
    >
        <van-icon v-if="leftIcon" size="16px" :name="leftIcon" class="van-notice-bar__left-icon" />
        <slot v-else name="left-icon" />

        <view class="van-notice-bar__wrap">
            <view :class="'van-notice-bar__content ' + (!scrollable && !wrapable ? 'van-ellipsis' : '')" :animation="animationData">
                {{ text }}
            </view>
        </view>

        <van-icon v-if="mode === 'closeable'" class="van-notice-bar__right-icon" name="cross" @tap.native.stop.prevent="onClickIcon" />
        <navigator v-else-if="mode === 'link'" :url="url" :open-type="openType">
            <van-icon class="van-notice-bar__right-icon" name="arrow" />
        </navigator>
        <slot v-else name="right-icon" />
    </view>
</template>

<script>
'use strict';
import vanIcon from '../icon/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var utils_1 = require('../common/utils');

component_1.VantComponent({
    props: {
        text: {
            type: String,
            value: '',
            observer: function () {
                var that = this;
                uni.nextTick(function () {
                    that.init();
                });
            }
        },
        mode: {
            type: String,
            value: ''
        },
        url: {
            type: String,
            value: ''
        },
        openType: {
            type: String,
            value: 'navigate'
        },
        delay: {
            type: Number,
            value: 1
        },
        speed: {
            type: Number,
            value: 30,
            observer: function () {
                var that = this;
                uni.nextTick(function () {
                    that.init();
                });
            }
        },
        scrollable: {
            type: Boolean,
            value: true
        },
        leftIcon: {
            type: String,
            value: ''
        },
        color: String,
        backgroundColor: String,
        background: String,
        wrapable: Boolean
    },
    data: {
        show: true
    },
    created: function () {
        this.resetAnimation = uni.createAnimation({
            duration: 0,
            timingFunction: 'linear'
        });
    },
    destroyed: function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    },
    methods: {
        init: function () {
            var that = this;
            Promise.all([this.getRect('.van-notice-bar__content'), this.getRect('.van-notice-bar__wrap')]).then(function (rects) {
                var contentRect = rects[0];
                var wrapRect = rects[1];
                if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width) {
                    return;
                }

                var _a = that.data;
                var speed = _a.speed;
                var scrollable = _a.scrollable;
                var delay = _a.delay;
                if (scrollable && wrapRect.width < contentRect.width) {
                    var duration = (contentRect.width / speed) * 1000;
                    that.wrapWidth = wrapRect.width;
                    that.contentWidth = contentRect.width;
                    that.duration = duration;
                    that.animation = uni.createAnimation({
                        duration: duration,
                        timingFunction: 'linear',
                        delay: delay
                    });
                    that.scroll();
                }
            });
        },
        scroll: function () {
            var that = this;

            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = null;
            this.setData({
                animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
            });
            utils_1.requestAnimationFrame(function () {
                that.setData({
                    animationData: that.animation.translateX(-that.contentWidth).step().export()
                });
            });
            this.timer = setTimeout(function () {
                that.scroll();
            }, this.duration);
        },
        onClickIcon: function (event) {
            if (this.data.mode === 'closeable') {
                if (this.timer) {
                    clearTimeout(this.timer);
                }

                this.timer = null;
                this.setData({
                    show: false
                });
                this.$emit('close', event.detail);
            }
        },
        onClick: function (event) {
            this.$emit('click', event);
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-notice-bar {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    height: 40px;
    height: var(--notice-bar-height, 40px);
    padding: 0 16px;
    padding: var(--notice-bar-padding, 0 16px);
    font-size: 14px;
    font-size: var(--notice-bar-font-size, 14px);
    color: #ed6a0c;
    color: var(--notice-bar-text-color, #ed6a0c);
    line-height: 24px;
    line-height: var(--notice-bar-line-height, 24px);
    background-color: #fffbe8;
    background-color: var(--notice-bar-background-color, #fffbe8);
}
.van-notice-bar--withicon {
    position: relative;
    padding-right: 40px;
}
.van-notice-bar--wrapable {
    height: auto;
    padding: 8px 16px;
    padding: var(--notice-bar-wrapable-padding, 8px 16px);
}
.van-notice-bar--wrapable .van-notice-bar__wrap {
    height: auto;
}
.van-notice-bar--wrapable .van-notice-bar__content {
    position: relative;
    white-space: normal;
}
.van-notice-bar__left-icon {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    margin-right: 4px;
    vertical-align: middle;
}
.van-notice-bar__left-icon,
.van-notice-bar__right-icon {
    font-size: 16px;
    font-size: var(--notice-bar-icon-size, 16px);
    min-width: 22px;
    min-width: var(--notice-bar-icon-min-width, 22px);
}
.van-notice-bar__right-icon {
    position: absolute;
    top: 10px;
    right: 15px;
}
.van-notice-bar__wrap {
    position: relative;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    height: 24px;
    height: var(--notice-bar-line-height, 24px);
}
.van-notice-bar__content {
    position: absolute;
    white-space: nowrap;
}
.van-notice-bar__content.van-ellipsis {
    max-width: 100%;
}
</style>
