<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view :class="'van-collapse-item custom-class ' + (index !== 0 ? 'van-hairline--top' : '')">
        <van-cell
            :title="title"
            title-class="title-class"
            :icon="icon"
            :value="value"
            :label="label"
            :is-link="isLink"
            :clickable="clickable"
            :border="border && expanded"
            :class="utils.bem('collapse-item__title', { disabled, expanded })"
            right-icon-class="van-cell__right-icon"
            custom-class="van-cell"
            hover-class="van-cell--hover"
            @click="onClick"
        >
            <slot name="title" slot="title" />
            <slot name="icon" slot="icon" />
            <slot name="value" />
            <slot name="right-icon" slot="right-icon" />
        </van-cell>
        <view :class="utils.bem('collapse-item__wrapper')" style="height: 0" :animation="animation">
            <view class="van-collapse-item__content content-class">
                <slot />
            </view>
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
    classes: ['title-class', 'content-class'],
    relation: {
        name: 'collapse',
        type: 'ancestor',
        current: 'collapse-item'
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        isLink: {
            type: Boolean,
            value: true
        }
    },
    data: {
        expanded: false
    },
    created: function () {
        this.animation = uni.createAnimation({
            duration: 0,
            timingFunction: 'ease-in-out'
        });
    },
    mounted: function () {
        this.updateExpanded();
        this.inited = true;
    },
    methods: {
        updateExpanded: function () {
            if (!this.parent) {
                return Promise.resolve();
            }

            var _a = this.parent.data;
            var value = _a.value;
            var accordion = _a.accordion;
            var _b = this.parent.children;
            var children = _b === void 0 ? [] : _b;
            var name = this.data.name;
            var index = children.indexOf(this);
            var currentName = name == null ? index : name;
            var expanded = accordion
                ? value === currentName
                : (value || []).some(function (name) {
                      return name === currentName;
                  });

            if (expanded !== this.data.expanded) {
                this.updateStyle(expanded);
            }

            this.setData({
                index: index,
                expanded: expanded
            });
        },
        updateStyle: function (expanded) {
            var that = this;
            var inited = this.inited;
            this.getRect('.van-collapse-item__content')
                .then(function (rect) {
                    return rect.height;
                })
                .then(function (height) {
                    var animation = that.animation;

                    if (expanded) {
                        if (height === 0) {
                            animation.height('auto').top(1).step();
                        } else {
                            animation
                                .height(height)
                                .top(1)
                                .step({
                                    duration: inited ? 300 : 1
                                })
                                .height('auto')
                                .step();
                        }

                        that.setData({
                            animation: animation.export()
                        });
                        return;
                    }

                    animation
                        .height(height)
                        .top(0)
                        .step({
                            duration: 1
                        })
                        .height(0)
                        .step({
                            duration: 300
                        });
                    that.setData({
                        animation: animation.export()
                    });
                });
        },
        onClick: function () {
            if (this.data.disabled) {
                return;
            }

            var _a = this.data;
            var name = _a.name;
            var expanded = _a.expanded;
            var index = this.parent.children.indexOf(this);
            var currentName = name == null ? index : name;
            this.parent.switch(currentName, !expanded);
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-collapse-item__title .van-cell__right-icon {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    transition: -webkit-transform var(--collapse-item-transition-duration, 0.3s);
    transition: transform var(--collapse-item-transition-duration, 0.3s);
    transition: transform var(--collapse-item-transition-duration, 0.3s), -webkit-transform var(--collapse-item-transition-duration, 0.3s);
}
.van-collapse-item__title--expanded .van-cell__right-icon {
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
}
.van-collapse-item__title--disabled .van-cell,
.van-collapse-item__title--disabled .van-cell__right-icon {
    color: #c8c9cc !important;
    color: var(--collapse-item-title-disabled-color, #c8c9cc) !important;
}
.van-collapse-item__title--disabled .van-cell--hover {
    background-color: #fff !important;
    background-color: var(--white, #fff) !important;
}
.van-collapse-item__wrapper {
    overflow: hidden;
}
.van-collapse-item__content {
    padding: 15px;
    padding: var(--collapse-item-content-padding, 15px);
    color: #969799;
    color: var(--collapse-item-content-text-color, #969799);
    font-size: 13px;
    font-size: var(--collapse-item-content-font-size, 13px);
    line-height: 1.5;
    line-height: var(--collapse-item-content-line-height, 1.5);
    background-color: #fff;
    background-color: var(--collapse-item-content-background-color, #fff);
}
</style>
