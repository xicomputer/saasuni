<template>
    <view>
        <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

        <van-cell
            :icon="leftIcon"
            :title="label"
            :center="center"
            :border="border"
            :is-link="isLink"
            :required="required"
            :custom-style="customStyle"
            :title-width="titleWidth"
            custom-class="van-field"
            :size="size"
        >
            <slot name="left-icon" slot="icon" />
            <slot name="label" slot="title" />
            <view :class="utils.bem('field__body', [type, system])">
                <textarea
                    v-if="type === 'textarea'"
                    :class="'input-class ' + utils.bem('field__input', [inputAlign, type, { disabled, error }])"
                    :fixed="fixed"
                    :focus="focus"
                    :value="value"
                    :disabled="disabled || readonly"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="utils.bem('field__placeholder', { error })"
                    :auto-height="autosize"
                    :cursor-spacing="cursorSpacing"
                    :adjust-position="adjustPosition"
                    :show-confirm-bar="showConfirmBar"
                    :selection-end="selectionEnd"
                    :selection-start="selectionStart"
                    @input="onInput"
                    @blur="onBlur"
                    @focus="onFocus"
                    @confirm="onConfirm"
                ></textarea>
                <input
                    wx:else
                    :class="'input-class ' + utils.bem('field__input', [inputAlign, { disabled, error }])"
                    :type="type"
                    :focus="focus"
                    :value="value"
                    :disabled="disabled || readonly"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="utils.bem('field__placeholder', { error })"
                    :confirm-type="confirmType"
                    :confirm-hold="confirmHold"
                    :cursor-spacing="cursorSpacing"
                    :adjust-position="adjustPosition"
                    :selection-end="selectionEnd"
                    :selection-start="selectionStart"
                    :password="password || type === 'password'"
                    @input="onInput"
                    @blur="onBlur"
                    @focus="onFocus"
                    @confirm="onConfirm"
                />
                <van-icon
                    v-if="clearable && focused && value && !readonly"
                    size="16px"
                    name="clear"
                    class="van-field__clear-root van-field__icon-root"
                    @touchstart.native="onClear"
                />
                <view class="van-field__icon-container" @tap="onClickIcon">
                    <van-icon v-if="rightIcon || icon" size="16px" :name="rightIcon || icon" :class="'van-field__icon-root ' + iconClass" custom-class="right-icon-class" />
                    <slot name="right-icon" />
                    <slot name="icon" />
                </view>
                <view class="van-field__button">
                    <slot name="button" />
                </view>
            </view>
            <view v-if="errorMessage" :class="'van-field__error-message ' + utils.bem('field__error', [errorMessageAlign, { disabled, error }])">
                {{ errorMessage }}
            </view>
        </van-cell>
    </view>
</template>

<script>
import vanCell from '../cell/index';
import vanIcon from '../icon/index';
import { VantComponent } from '../common/component';
import { getSystemInfoSync } from '../common/utils';
export default {
    components: {
        vanCell,
        vanIcon
    },
    data() {
        return {
            focused: false,
            system: getSystemInfoSync().system.split(' ').shift().toLowerCase(),
            value: ''
        };
    },
    field: true,
    classes: ['input-class', 'right-icon-class'],
    props: {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        fixed: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        disabled: Boolean,
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        inputAlign: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        errorMessage: String,
        placeholder: String,
        placeholderStyle: String,
        errorMessageAlign: String,
        selectionEnd: {
            type: Number,
            default: -1
        },
        selectionStart: {
            type: Number,
            default: -1
        },
        showConfirmBar: {
            type: Boolean,
            default: true
        },
        adjustPosition: {
            type: Boolean,
            default: true
        },
        cursorSpacing: {
            type: Number,
            default: 50
        },
        maxlength: {
            type: Number,
            default: -1
        },
        type: {
            type: String,
            default: 'text'
        },
        border: {
            type: Boolean,
            default: true
        },
        titleWidth: {
            type: String,
            default: '90px'
        }
    },
    methods: {
        onInput(event) {
            const { value = '' } = event.detail || {};
            this.set(
                {
                    value
                },
                () => {
                    this.emitChange(value);
                }
            );
        },

        onFocus(event) {
            this.set({
                focused: true
            });
            this.$emit('focus', event.detail);
        },

        onBlur(event) {
            this.set({
                focused: false
            });
            this.$emit('blur', event.detail);
        },

        onClickIcon() {
            this.$emit('click-icon');
        },

        onClear() {
            this.set(
                {
                    value: ''
                },
                () => {
                    this.emitChange('');
                    this.$emit('clear', '');
                }
            );
        },

        onConfirm() {
            this.$emit('confirm', this.value);
        },

        emitChange(value) {
            this.$emit('input', value);
            this.$emit('change', value);
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-field__body {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
}
.van-field__body--textarea {
    min-height: 24px;
    line-height: 1.2em;
}
.van-field__body--textarea.van-field__body--ios {
    margin-top: -4.5px;
}
.van-field__input {
    position: relative;
    display: block;
    width: 100%;
    height: 24px;
    min-height: 24px;
    padding: 0;
    margin: 0;
    line-height: inherit;
    color: #333;
    text-align: left;
    background-color: initial;
    border: 0;
    box-sizing: border-box;
    resize: none;
}
.van-field__input--textarea {
    height: 18px;
    min-height: 18px;
}
.van-field__input--error {
    color: #f44;
}
.van-field__input--disabled {
    color: #999;
    background-color: initial;
    opacity: 1;
}
.van-field__input--center {
    text-align: center;
}
.van-field__input--right {
    text-align: right;
}
.van-field__placeholder {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    color: #999;
    pointer-events: none;
}
.van-field__placeholder--error {
    color: #f44;
}
.van-field__icon-root {
    display: -webkit-flex;
    display: flex;
    min-height: 24px;
    -webkit-align-items: center;
    align-items: center;
}
.van-field__clear-root,
.van-field__icon-container {
    padding: 0 10px;
    margin-right: -10px;
    line-height: inherit;
    vertical-align: middle;
}
.van-field__button,
.van-field__clear-root,
.van-field__icon-container {
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
}
.van-field__clear-root {
    color: #c9c9c9;
}
.van-field__icon-container {
    color: #999;
}
.van-field__icon-container:empty {
    display: none;
}
.van-field__button {
    padding-left: 10px;
}
.van-field__button:empty {
    display: none;
}
.van-field__error-message {
    font-size: 12px;
    color: #f44;
    text-align: left;
}
.van-field__error-message--center {
    text-align: center;
}
.van-field__error-message--right {
    text-align: right;
}
</style>
