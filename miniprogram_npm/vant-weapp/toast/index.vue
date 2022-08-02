<template>
    <view>
        <van-overlay v-if="mask || forbidClick" :show="show" :mask="mask" :z-index="zIndex" />
        <van-transition :show="show" :custom-style="'z-index: ' + zIndex" custom-class="van-toast__container">
            <view :class="'van-toast van-toast--' + (type === 'text' ? 'text' : 'icon') + ' van-toast--' + position" @touchmove.stop.prevent="noop">
                <!-- text only -->
                <text v-if="type === 'text'">{{ message }}</text>

                <!-- with icon -->
                <block v-else>
                    <van-loading v-if="type === 'loading'" color="white" :type="loadingType" custom-class="van-toast__loading" />
                    <van-icon v-else class="van-toast__icon" :name="type" />
                    <text v-if="message" class="van-toast__text">{{ message }}</text>
                </block>

                <slot />
            </view>
        </van-transition>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import vanLoading from '../loading/index';
import vanOverlay from '../overlay/index';
import vanTransition from '../transition/index';
import { VantComponent } from '../common/component';
export default {
    data() {
        return {};
    },
    components: {
        vanIcon,
        vanLoading,
        vanOverlay,
        vanTransition
    },
    props: {
        show: Boolean,
        mask: Boolean,
        message: String,
        forbidClick: Boolean,
        zIndex: {
            type: Number,
            default: 1000
        },
        type: {
            type: String,
            default: 'text'
        },
        loadingType: {
            type: String,
            default: 'circular'
        },
        position: {
            type: String,
            default: 'middle'
        }
    },
    methods: {
        // for prevent touchmove
        noop() {}
    }
};
</script>
<style>
@import '../common/index.css';
.van-toast {
    display: -webkit-flex;
    display: flex;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    border-radius: 4px;
    word-break: break-all;
    -webkit-align-items: center;
    align-items: center;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    justify-content: center;
    box-sizing: initial;
    background-color: rgba(51, 51, 51, 0.88);
    white-space: pre-wrap;
}
.van-toast__container {
    position: fixed;
    top: 50%;
    left: 50%;
    max-width: 70%;
    width: -webkit-fit-content;
    width: fit-content;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.van-toast--text {
    padding: 8px 12px;
    min-width: 96px;
}
.van-toast--icon {
    width: 90px;
    padding: 15px;
    min-height: 90px;
}
.van-toast--icon .van-toast__icon {
    font-size: 48px;
}
.van-toast--icon .van-toast__text {
    padding-top: 5px;
}
.van-toast__loading {
    margin: 10px 0;
}
.van-toast--top {
    -webkit-transform: translateY(-30vh);
    transform: translateY(-30vh);
}
.van-toast--bottom {
    -webkit-transform: translateY(30vh);
    transform: translateY(30vh);
}
</style>
