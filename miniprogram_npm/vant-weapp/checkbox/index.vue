<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view class="van-checkbox custom-class">
        <view class="van-checkbox__icon-wrap" @tap="toggle">
            <slot v-if="useIconSlot" name="icon" />
            <van-icon
                wx:else
                name="success"
                :class="utils.bem('checkbox__icon', [shape, { disabled, checked: value }])"
                :style="checkedColor && value && !disabled ? 'border-color:' + checkedColor + '; background-color:' + checkedColor : ''"
                custom-class="icon-class"
                custom-style="line-height: 20px;"
            />
        </view>
        <view :class="'label-class ' + utils.bem('checkbox__label', [labelPosition, { disabled }])" @tap="onClickLabel">
            <slot />
        </view>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import { VantComponent } from '../common/component';

function emit(target, value) {
    target.$emit('input', value);
    target.$emit('change', value);
}

export default {
    data() {
        return {};
    },
    components: {
        vanIcon
    },
    field: true,
    relation: {
        name: 'checkbox-group',
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
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            default: 'round'
        }
    },
    methods: {
        emitChange(value) {
            if (this.parent) {
                this.setParentValue(this.parent, value);
            } else {
                emit(this, value);
            }
        },

        toggle() {
            const { disabled, value } = this;

            if (!disabled) {
                this.emitChange(!value);
            }
        },

        onClickLabel() {
            const { labelDisabled, disabled, value } = this;

            if (!disabled && !labelDisabled) {
                this.emitChange(!value);
            }
        },

        setParentValue(parent, value) {
            const parentValue = parent.data.value.slice();
            const { name } = this;
            const { max } = parent.data;

            if (value) {
                if (max && parentValue.length >= max) {
                    return;
                }

                if (parentValue.indexOf(name) === -1) {
                    parentValue.push(name);
                    emit(parent, parentValue);
                }
            } else {
                const index = parentValue.indexOf(name);

                if (index !== -1) {
                    parentValue.splice(index, 1);
                    emit(parent, parentValue);
                }
            }
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-checkbox {
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
}
.van-checkbox__icon-wrap,
.van-checkbox__label {
    line-height: 20px;
}
.van-checkbox__icon-wrap {
    -webkit-flex: none;
    flex: none;
}
.van-checkbox__icon {
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
.van-checkbox__icon--round {
    border-radius: 100%;
}
.van-checkbox__icon--checked {
    color: #fff;
    background-color: #1989fa;
    border-color: #1989fa;
}
.van-checkbox__icon--disabled {
    background-color: #eee;
    border-color: #c9c9c9;
}
.van-checkbox__icon--disabled.van-checkbox__icon--checked {
    color: #c9c9c9;
}
.van-checkbox__label {
    margin-left: 10px;
    color: #333;
    word-break: break-all;
}
.van-checkbox__label--left {
    float: left;
    margin: 0 10px 0 0;
}
.van-checkbox__label--disabled {
    color: #c9c9c9;
}
.van-checkbox__label:empty {
    margin: 0;
}
</style>
