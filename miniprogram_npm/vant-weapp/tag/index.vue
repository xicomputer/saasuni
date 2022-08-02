<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view :class="'custom-class ' + utils.bem('tag', [size, { mark, plain, round }]) + ' ' + (plain ? 'van-hairline--surround' : '')" :style="style">
        <slot />
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
import { RED, BLUE, GREEN, ORANGE } from '../common/color';
const DEFAULT_COLOR = '#999';
const COLOR_MAP = {
    danger: RED,
    primary: BLUE,
    success: GREEN,
    warning: ORANGE
};
export default {
    data() {
        return {
            style: ''
        };
    },
    props: {
        size: String,
        type: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String
    },
    computed: {
        style() {
            const color = this.color || COLOR_MAP[this.type] || DEFAULT_COLOR;
            const key = this.plain ? 'color' : 'background-color';
            const style = {
                [key]: color
            };

            if (this.textColor) {
                style.color = this.textColor;
            }

            return Object.keys(style)
                .map((key) => `${key}: ${style[key]}`)
                .join(';');
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-tag {
    color: #fff;
    font-size: 10px;
    padding: 0.2em 0.5em;
    line-height: normal;
    border-radius: 0.2em;
    display: inline-block;
}
.van-tag:after {
    border-color: currentColor;
    border-radius: 0.4em;
}
.van-tag--mark {
    padding-right: 0.6em;
    border-radius: 0 0.8em 0.8em 0;
}
.van-tag--mark:after {
    border-radius: 0 1.6em 1.6em 0;
}
.van-tag--round {
    border-radius: 0.8em;
}
.van-tag--round:after {
    border-radius: 1.6em;
}
.van-tag--medium {
    font-size: 12px;
}
.van-tag--large {
    font-size: 14px;
}
</style>
