<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view :class="'custom-class ' + utils.bem('grid-item', { square })" :style="viewStyle" @tap="onClick">
        <view
            :class="
                'content-class ' +
                utils.bem('grid-item__content', [direction, { center, square, clickable, surround: border && gutter }]) +
                ' ' +
                (border ? 'van-hairline--surround' : '')
            "
            :style="contentStyle"
        >
            <block v-if="useSlot">
                <slot />
            </block>
            <block v-else>
                <view class="van-grid-item__icon icon-class">
                    <van-icon v-if="icon" :name="icon" :color="iconColor" :dot="dot" :info="badge || info" :size="iconSize" />
                    <slot v-else name="icon"></slot>
                </view>
                <view class="van-grid-item__text text-class">
                    <text v-if="text">{{ text }}</text>
                    <slot v-else name="text"></slot>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
'use strict';
import vanIcon from '../icon/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var link_1 = require('../mixins/link');

var component_1 = require('../common/component');

var utils_1 = require('../common/utils');

component_1.VantComponent({
    relation: {
        name: 'grid',
        type: 'ancestor',
        current: 'grid-item'
    },
    classes: ['content-class', 'icon-class', 'text-class'],
    mixins: [link_1.link],
    props: {
        icon: String,
        iconColor: String,
        dot: Boolean,
        info: null,
        badge: null,
        text: String,
        useSlot: Boolean
    },
    data: {
        viewStyle: ''
    },
    mounted: function () {
        this.updateStyle();
    },
    methods: {
        updateStyle: function () {
            if (!this.parent) {
                return;
            }

            var _a = this.parent;
            var data = _a.data;
            var children = _a.children;
            var columnNum = data.columnNum;
            var border = data.border;
            var square = data.square;
            var gutter = data.gutter;
            var clickable = data.clickable;
            var center = data.center;
            var direction = data.direction;
            var iconSize = data.iconSize;
            var width = 100 / columnNum + '%';
            var styleWrapper = [];
            styleWrapper.push('width: ' + width);

            if (square) {
                styleWrapper.push('padding-top: ' + width);
            }

            if (gutter) {
                var gutterValue = utils_1.addUnit(gutter);
                styleWrapper.push('padding-right: ' + gutterValue);
                var index = children.indexOf(this);

                if (index >= columnNum && !square) {
                    styleWrapper.push('margin-top: ' + gutterValue);
                }
            }

            var contentStyle = '';

            if (square && gutter) {
                var gutterValue = utils_1.addUnit(gutter);
                contentStyle = '\n          right: ' + gutterValue + ';\n          bottom: ' + gutterValue + ';\n          height: auto;\n        ';
            }

            this.setData({
                viewStyle: styleWrapper.join('; '),
                contentStyle: contentStyle,
                center: center,
                border: border,
                square: square,
                gutter: gutter,
                clickable: clickable,
                direction: direction,
                iconSize: iconSize
            });
        },
        onClick: function () {
            this.$emit('click');
            this.jumpLink();
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-grid-item {
    position: relative;
    float: left;
    box-sizing: border-box;
}
.van-grid-item--square {
    height: 0;
}
.van-grid-item__content {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: 16px 8px;
    padding: var(--grid-item-content-padding, 16px 8px);
    background-color: #fff;
    background-color: var(--grid-item-content-background-color, #fff);
}
.van-grid-item__content:after {
    z-index: 1;
    border-width: 0 1px 1px 0;
    border-bottom-width: var(--border-width-base, 1px);
    border-right-width: var(--border-width-base, 1px);
    border-top-width: 0;
}
.van-grid-item__content--surround:after {
    border-width: 1px;
    border-width: var(--border-width-base, 1px);
}
.van-grid-item__content--center {
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}
.van-grid-item__content--square {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
.van-grid-item__content--horizontal {
    -webkit-flex-direction: row;
    flex-direction: row;
}
.van-grid-item__content--horizontal .van-grid-item__icon + .van-grid-item__text {
    margin-top: 0;
    margin-left: 8px;
}
.van-grid-item__content--clickable:active {
    background-color: #f2f3f5;
    background-color: var(--grid-item-content-active-color, #f2f3f5);
}
.van-grid-item__icon {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    font-size: 26px;
    font-size: var(--grid-item-icon-size, 26px);
    height: 26px;
    height: var(--grid-item-icon-size, 26px);
}
.van-grid-item__text {
    word-wrap: break-word;
    color: #646566;
    color: var(--grid-item-text-color, #646566);
    font-size: 12px;
    font-size: var(--grid-item-text-font-size, 12px);
}
.van-grid-item__icon + .van-grid-item__text {
    margin-top: 8px;
}
</style>
