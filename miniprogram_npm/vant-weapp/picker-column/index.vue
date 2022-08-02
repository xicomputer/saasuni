<template>
    <script module="getOptionText" lang="wxs" src="./index.wxs"></script>

    <view
        class="van-picker-column custom-class"
        :style="'height: ' + itemHeight * visibleItemCount + 'px'"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
    >
        <view :style="wrapperStyle">
            <view
                :data-index="index"
                :style="'height: ' + itemHeight + 'px'"
                :class="
                    'van-ellipsis van-picker-column__item ' +
                    (option && option.disabled ? 'van-picker-column__item--disabled' : '') +
                    ' ' +
                    (index === currentIndex ? 'van-picker-column__item--selected active-class' : '')
                "
                @tap="onClickItem"
                v-for="(option, index) in options"
                :key="index"
            >
                {{ getOptionText(option, valueKey) }}
            </view>
        </view>
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
import { isObj, range } from '../common/utils';
const DEFAULT_DURATION = 200;
export default {
    data() {
        return {
            startY: 0,
            offset: 0,
            duration: 0,
            startOffset: 0,
            options: [],
            currentIndex: 0,
            wrapperStyle: '',

            option: {
                disabled: ''
            }
        };
    },
    classes: ['active-class'],
    props: {
        valueKey: String,
        className: String,
        itemHeight: Number,
        visibleItemCount: Number,
        initialOptions: {
            type: Array,
            default: () => []
        },
        defaultIndex: {
            type: Number,
            default: 0
        }
    },
    created() {
        const { defaultIndex, initialOptions } = this;
        this.set({
            currentIndex: defaultIndex,
            options: initialOptions
        }).then(() => {
            this.setIndex(defaultIndex);
        });
    },
    computed: {
        count() {
            return this.options.length;
        },

        baseOffset() {
            const { data } = this;
            return (data.itemHeight * (data.visibleItemCount - 1)) / 2;
        },

        wrapperStyle() {
            const { data } = this;
            return [`transition: ${data.duration}ms`, `transform: translate3d(0, ${data.offset + data.baseOffset}px, 0)`, `line-height: ${data.itemHeight}px`].join('; ');
        }
    },
    watch: {
        defaultIndex: {
            handler: function (value) {
                this.setIndex(value);
            },

            immediate: true,
            deep: true
        }
    },
    methods: {
        onTouchStart(event) {
            this.set({
                startY: event.touches[0].clientY,
                startOffset: this.offset,
                duration: 0
            });
        },

        onTouchMove(event) {
            const { data } = this;
            const deltaY = event.touches[0].clientY - data.startY;
            this.set({
                offset: range(data.startOffset + deltaY, -(data.count * data.itemHeight), data.itemHeight)
            });
        },

        onTouchEnd() {
            const { data } = this;

            if (data.offset !== data.startOffset) {
                this.set({
                    duration: DEFAULT_DURATION
                });
                const index = range(Math.round(-data.offset / data.itemHeight), 0, data.count - 1);
                this.setIndex(index, true);
            }
        },

        onClickItem(event) {
            const { index } = event.currentTarget.dataset;
            this.setIndex(index, true);
        },

        adjustIndex(index) {
            const { data } = this;
            index = range(index, 0, data.count);

            for (let i = index; i < data.count; i++) {
                if (!this.isDisabled(data.options[i])) {
                    return i;
                }
            }

            for (let i = index - 1; i >= 0; i--) {
                if (!this.isDisabled(data.options[i])) {
                    return i;
                }
            }
        },

        isDisabled(option) {
            return isObj(option) && option.disabled;
        },

        getOptionText(option) {
            const { data } = this;
            return isObj(option) && data.valueKey in option ? option[data.valueKey] : option;
        },

        setIndex(index, userAction) {
            const { data } = this;
            index = this.adjustIndex(index) || 0;
            const offset = -index * data.itemHeight;

            if (index !== data.currentIndex) {
                return this.set({
                    offset,
                    currentIndex: index
                }).then(() => {
                    if (userAction) {
                        this.$emit('change', index);
                    }
                });
            }

            return this.set({
                offset
            });
        },

        setValue(value) {
            const { options } = this;

            for (let i = 0; i < options.length; i++) {
                if (this.getOptionText(options[i]) === value) {
                    return this.setIndex(i);
                }
            }

            return Promise.resolve();
        },

        getValue() {
            const { data } = this;
            return data.options[data.currentIndex];
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-picker-column {
    overflow: hidden;
    font-size: 16px;
    color: #999;
    text-align: center;
}
.van-picker-column__item {
    padding: 0 5px;
}
.van-picker-column__item--selected {
    font-weight: 500;
    color: #333;
}
.van-picker-column__item--disabled {
    opacity: 0.3;
}
</style>
