<template>
    <view>
        <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

        <van-popup
            :show="show"
            position="bottom"
            :z-index="zIndex"
            :overlay="overlay"
            :custom-style="customStyle"
            :overlay-style="overlayStyle"
            custom-class="van-action-sheet"
            :safe-area-inset-bottom="safeAreaInsetBottom"
            :close-on-click-overlay="closeOnClickOverlay"
            @close="onClose"
        >
            <view v-if="title" class="van-hairline--bottom van-action-sheet__header">
                {{ title }}
                <van-icon name="close" custom-class="van-action-sheet__close" @click="onClose" />
            </view>
            <view v-if="actions && actions.length">
                <!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
                <button
                    :open-type="item.openType"
                    :class="utils.bem('action-sheet__item', { disabled: item.disabled || item.loading }) + ' van-hairline--top ' + (item.className || '')"
                    hover-class="van-action-sheet__item--hover"
                    :data-index="index"
                    @tap="onSelect"
                    v-for="(item, index) in actions"
                    :key="index"
                >
                    <block v-if="!item.loading">
                        {{ item.name }}
                        <text v-if="item.subname" class="van-action-sheet__subname">{{ item.subname }}</text>
                    </block>

                    <van-loading v-else size="20px" />
                </button>
            </view>
            <slot />
            <view v-if="cancelText" class="van-action-sheet__cancel" hover-class="van-action-sheet__cancel--hover" hover-stay-time="70" @tap="onCancel">
                {{ cancelText }}
            </view>
        </van-popup>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import vanPopup from '../popup/index';
import vanLoading from '../loading/index';
import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
export default {
    data() {
        return {
            safeAreaInsetBottom: 0
        };
    },
    components: {
        vanIcon,
        vanPopup,
        vanLoading
    },
    mixins: [safeArea()],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            default: 100
        },
        actions: {
            type: Array,
            default: () => []
        },
        overlay: {
            type: Boolean,
            default: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onSelect(event) {
            const { index } = event.currentTarget.dataset;
            const item = this.actions[index];

            if (item && !item.disabled && !item.loading) {
                this.$emit('select', item);
            }
        },

        onCancel() {
            this.$emit('cancel');
        },

        onClose() {
            this.$emit('close');
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-action-sheet {
    max-height: 90% !important;
    color: #333;
}
.van-action-sheet__cancel,
.van-action-sheet__item {
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
}
.van-action-sheet__cancel--hover,
.van-action-sheet__item--hover {
    background-color: #f2f3f5;
}
.van-action-sheet__cancel {
    height: 60px;
}
.van-action-sheet__cancel:before {
    display: block;
    height: 10px;
    background-color: #f8f8f8;
    content: ' ';
}
.van-action-sheet__item--disabled {
    color: #c9c9c9;
}
.van-action-sheet__item--disabled.van-action-sheet__item--hover {
    background-color: #fff;
}
.van-action-sheet__subname {
    margin-left: 5px;
    font-size: 12px;
    color: #7d7e80;
}
.van-action-sheet__header {
    font-size: 16px;
    font-weight: 500;
    line-height: 44px;
    text-align: center;
}
.van-action-sheet__close {
    position: absolute !important;
    top: 0;
    right: 0;
    padding: 0 15px;
    font-size: 18px !important;
    line-height: inherit !important;
    color: #999;
}
</style>
