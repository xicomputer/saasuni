<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view class="van-submit-bar custom-class">
        <slot name="top" />

        <view class="van-submit-bar__tip">
            <van-icon v-if="tipIcon" size="12px" :name="tipIcon" custom-class="van-submit-bar__tip-icon" />
            <view v-if="hasTip" class="van-submit-bar__tip-text">
                {{ tip }}
            </view>
            <slot name="tip" />
        </view>

        <view :class="'bar-class ' + utils.bem('submit-bar__bar', { safe: safeAreaInsetBottom && isIPhoneX })">
            <slot />
            <view v-if="hasPrice" class="van-submit-bar__text">
                <text>{{ label || '合计：' }}</text>
                <text class="van-submit-bar__price price-class">
                    <text class="van-submit-bar__currency">{{ currency }}</text>
                    <text>{{ priceStr }}</text>
                </text>
                <text class="van-submit-bar__suffix-label">{{ suffixLabel }}</text>
            </view>
            <van-button square size="large" :type="buttonType" :loading="loading" :disabled="disabled" class="van-submit-bar__button" custom-class="button-class" @click="onSubmit">
                {{ loading ? '' : buttonText }}
            </van-button>
        </view>
    </view>
</template>

<script>
import vanButton from '../button/index';
import vanIcon from '../icon/index';
import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
export default {
    data() {
        return {
            hasTip: '',
            safeAreaInsetBottom: '',
            isIPhoneX: '',
            hasPrice: '',
            priceStr: ''
        };
    },
    components: {
        vanButton,
        vanIcon
    },
    mixins: [safeArea()],
    classes: ['bar-class', 'price-class', 'button-class'],
    props: {
        tip: {
            type: null
        },
        tipIcon: String,
        type: Number,
        price: {
            type: null
        },
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
            type: String,
            default: '¥'
        },
        buttonType: {
            type: String,
            default: 'danger'
        },
        decimalLength: {
            type: Number,
            default: 2
        },
        suffixLabel: String
    },
    methods: {
        updatePrice() {
            const { price, decimalLength } = this;
            this.set({
                hasPrice: typeof price === 'number',
                priceStr: (price / 100).toFixed(decimalLength)
            });
        },

        updateTip() {
            this.set({
                hasTip: typeof this.tip === 'string'
            });
        },

        onSubmit(event) {
            this.$emit('submit', event.detail);
        }
    },
    watch: {
        tip: {
            handler: function () {
                this.set({
                    hasTip: typeof this.tip === 'string'
                });
            },

            immediate: true
        },

        price: {
            handler: function () {
                const { price, decimalLength } = this;
                this.set({
                    hasPrice: typeof price === 'number',
                    priceStr: (price / 100).toFixed(decimalLength)
                });
            },

            immediate: true
        },

        decimalLength: {
            handler: function () {
                const { price, decimalLength } = this;
                this.set({
                    hasPrice: typeof price === 'number',
                    priceStr: (price / 100).toFixed(decimalLength)
                });
            },

            immediate: true
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-submit-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    -webkit-user-select: none;
    user-select: none;
}
.van-submit-bar__tip {
    padding: 10px;
    font-size: 12px;
    line-height: 1.5;
    color: #f56723;
    background-color: #fff7cc;
}
.van-submit-bar__tip:empty {
    display: none;
}
.van-submit-bar__tip-icon {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    vertical-align: middle;
}
.van-submit-bar__tip-text {
    display: inline;
    vertical-align: middle;
}
.van-submit-bar__bar {
    display: -webkit-flex;
    display: flex;
    height: 50px;
    font-size: 14px;
    background-color: #fff;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
}
.van-submit-bar__bar--safe {
    padding-bottom: 34px;
}
.van-submit-bar__text {
    padding-right: 12px;
    font-weight: 500;
    color: #333;
    -webkit-flex: 1;
    flex: 1;
    text-align: right;
}
.van-submit-bar__price {
    font-size: 18px;
    color: #f44;
}
.van-submit-bar__currency {
    font-size: 14px;
}
.van-submit-bar__suffix-label {
    margin-left: 5px;
}
.van-submit-bar__button {
    width: 110px;
}
</style>
