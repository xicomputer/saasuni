<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view class="van-stepper custom-class">
        <view
            :class="'minus-class ' + utils.bem('stepper__minus', { disabled: minusDisabled })"
            :style="showMinus ? '' : 'display: none;'"
            hover-class="van-stepper__minus--hover"
            hover-stay-time="70"
            @tap="onMinus"
        />
        <input
            :type="integer ? 'number' : 'digit'"
            :class="'input-class ' + utils.bem('stepper__input', { disabled: disabled || disableInput })"
            :style="inputWidth ? 'width: ' + inputWidth : ''"
            :value="value"
            :focus="focus"
            :disabled="disabled || disableInput"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        />
        <view
            :class="'plus-class ' + utils.bem('stepper__plus', { disabled: plusDisabled })"
            :style="showPlus ? '' : 'display: none;'"
            hover-class="van-stepper__plus--hover"
            hover-stay-time="70"
            @tap="onPlus"
        />
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
export default {
    data() {
        return {
            focus: false
        };
    },
    field: true,
    classes: ['input-class', 'plus-class', 'minus-class'],
    props: {
        value: null,
        integer: Boolean,
        disabled: Boolean,
        inputWidth: String,
        asyncChange: Boolean,
        disableInput: Boolean,
        min: {
            type: null,
            default: 1
        },
        max: {
            type: null,
            default: Number.MAX_SAFE_INTEGER
        },
        step: {
            type: null,
            default: 1
        },
        showPlus: {
            type: Boolean,
            default: true
        },
        showMinus: {
            type: Boolean,
            default: true
        },
        disablePlus: Boolean,
        disableMinus: Boolean
    },
    computed: {
        minusDisabled() {
            return this.disabled || this.disableMinus || this.value <= this.min;
        },

        plusDisabled() {
            return this.disabled || this.disablePlus || this.value >= this.max;
        }
    },
    watch: {
        value: {
            handler: function (value) {
                if (value === '') {
                    return;
                }

                const newValue = this.range(value);

                if (typeof newValue === 'number' && +this.value !== newValue) {
                    this.set({
                        value: newValue
                    });
                }
            },

            immediate: true,
            deep: true
        },

        max: {
            handler: 'check',
            immediate: true,
            deep: true
        },

        min: {
            handler: 'check',
            immediate: true,
            deep: true
        }
    },
    created() {
        this.set({
            value: this.range(this.value)
        });
    },
    methods: {
        check() {
            const newValue = this.range(this.value);

            if (typeof newValue === 'number' && +this.value !== newValue) {
                this.set({
                    value: newValue
                });
            }
        },

        onFocus(event) {
            this.$emit('focus', event.detail);
        },

        onBlur(event) {
            const value = this.range(this.value);
            this.triggerInput(value);
            this.$emit('blur', event.detail);
        },

        // limit value range
        range(value) {
            value = String(value).replace(/[^0-9.-]/g, '');
            return Math.max(Math.min(this.max, value), this.min);
        },

        onInput(event) {
            const { value = '' } = event.detail || {};
            this.triggerInput(value);
        },

        onChange(type) {
            if (this[`${type}Disabled`]) {
                this.$emit('overlimit', type);
                return;
            }

            const diff = type === 'minus' ? -this.step : +this.step;
            const value = Math.round((+this.value + diff) * 100) / 100;
            this.triggerInput(this.range(value));
            this.$emit(type);
        },

        onMinus() {
            this.onChange('minus');
        },

        onPlus() {
            this.onChange('plus');
        },

        triggerInput(value) {
            this.set({
                value: this.asyncChange ? this.value : value
            });
            this.$emit('change', value);
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-stepper {
    font-size: 0;
}
.van-stepper__minus,
.van-stepper__plus {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 28px;
    padding: 5px;
    margin: 1px;
    vertical-align: middle;
    background-color: #f2f3f5;
    border: 0;
    box-sizing: border-box;
}
.van-stepper__minus:before,
.van-stepper__plus:before {
    width: 9px;
    height: 1px;
}
.van-stepper__minus:after,
.van-stepper__plus:after {
    width: 1px;
    height: 9px;
}
.van-stepper__minus:after,
.van-stepper__minus:before,
.van-stepper__plus:after,
.van-stepper__plus:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #333;
    content: '';
}
.van-stepper__minus--hover,
.van-stepper__plus--hover {
    background-color: #e8e8e8;
}
.van-stepper__minus--disabled,
.van-stepper__plus--disabled {
    background-color: #f7f8fa;
}
.van-stepper__minus--disabled:after,
.van-stepper__minus--disabled:before,
.van-stepper__plus--disabled:after,
.van-stepper__plus--disabled:before {
    background-color: #c9c9c9;
}
.van-stepper__minus--disabled.van-stepper__minus--hover,
.van-stepper__minus--disabled.van-stepper__plus--hover,
.van-stepper__plus--disabled.van-stepper__minus--hover,
.van-stepper__plus--disabled.van-stepper__plus--hover {
    background-color: #f7f8fa;
}
.van-stepper__minus {
    border-radius: 4px 0 0 4px;
}
.van-stepper__minus:after {
    display: none;
}
.van-stepper__plus {
    border-radius: 0 4px 4px 0;
}
.van-stepper__input {
    display: inline-block;
    width: 30px;
    height: 26px;
    padding: 1px;
    margin: 1px;
    font-size: 14px;
    color: #333;
    text-align: center;
    vertical-align: middle;
    background-color: #f2f3f5;
    border: 0;
    border-width: 1px 0;
    border-radius: 0;
    box-sizing: initial;
    -webkit-appearance: none;
}
.van-stepper__input--disabled {
    color: #c9c9c9;
    background-color: #f2f3f5;
}
</style>
