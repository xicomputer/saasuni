<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view class="van-radio custom-class">
        <view v-if="labelPosition === 'left'" :class="'label-class ' + utils.bem('radio__label', [labelPosition, { disabled }])" @tap="onClickLabel">
            <slot />
        </view>
        <view class="van-radio__icon-wrap" @tap="onChange">
            <slot v-if="useIconSlot" name="icon" />
            <van-icon
                wx:else
                name="success"
                :class="utils.bem('radio__icon', [shape, { disabled, checked: value === name }])"
                :style="checkedColor && !disabled && value === name ? 'border-color:' + checkedColor + '; background-color:' + checkedColor : ''"
                custom-class="icon-class"
                custom-style="line-height: 20px;"
            />
        </view>
        <view v-if="labelPosition === 'right'" :class="'label-class ' + utils.bem('radio__label', [labelPosition, { disabled }])" @tap="onClickLabel">
            <slot />
        </view>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import { VantComponent } from '../common/component';
export default {
    data() {
        return {
            name: ''
        };
    },
    components: {
        vanIcon
    },
    field: true,
    relation: {
        name: 'radio-group',
        type: 'ancestor',

        linked(target) {
            this.parent = target;
        },

        unlinked() {
            this.parent = null;
        }
    },
    classes: ['icon-class', 'label-class'],
    props: {
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: {
            type: String,
            default: 'right'
        },
        labelDisabled: Boolean,
        shape: {
            type: String,
            default: 'round'
        }
    },
    methods: {
        emitChange(value) {
            const instance = this.parent || this;
            instance.$emit('input', value);
            instance.$emit('change', value);
        },

        onChange(event) {
            console.log(event);
            this.emitChange(this.name);
        },

        onClickLabel() {
            const { disabled, labelDisabled, name } = this;

            if (!disabled && !labelDisabled) {
                this.emitChange(name);
            }
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-radio {
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
}
.van-radio__icon-wrap,
.van-radio__label {
    line-height: 20px;
}
.van-radio__icon-wrap {
    -webkit-flex: none;
    flex: none;
}
.van-radio__icon {
    display: block;
    width: 20px;
    height: 20px;
    font-size: 14px;
    color: transparent;
    text-align: center;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    transition: 0.2s;
}
.van-radio__icon--round {
    border-radius: 100%;
}
.van-radio__icon--checked {
    color: #fff;
    background-color: #1989fa;
    border-color: #1989fa;
}
.van-radio__icon--disabled {
    background-color: #eee;
    border-color: #c9c9c9;
}
.van-radio__icon--disabled.van-radio__icon--checked {
    color: #c9c9c9;
}
.van-radio__label {
    margin-left: 10px;
    color: #333;
    word-break: break-all;
}
.van-radio__label--left {
    float: left;
    margin: 0 10px 0 0;
}
.van-radio__label--disabled {
    color: #c9c9c9;
}
.van-radio__label:empty {
    margin: 0;
}
</style>
