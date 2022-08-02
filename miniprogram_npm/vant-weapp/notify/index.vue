<template>
    <view>
        <van-transition
            name="slide-down"
            :show="show"
            custom-class="van-notify"
            :custom-style="'background-color:' + backgroundColor + '; color: ' + color + '; z-index: ' + zIndex + ';'"
        >
            <view v-if="safeAreaInsetTop" class="van-notify__safe-top" :style="'padding-top: ' + statusBarHeight + 'px'"></view>
            {{ text }}
        </van-transition>
    </view>
</template>

<script>
import vanTransition from '../transition/index';
import { VantComponent } from '../common/component';
import { RED } from '../common/color';
import { safeArea } from '../mixins/safe-area';
export default {
    data() {
        return {
            show: '',
            safeAreaInsetTop: 0,
            statusBarHeight: ''
        };
    },
    components: {
        vanTransition
    },
    mixins: [safeArea()],
    props: {
        text: String,
        color: {
            type: String,
            default: '#fff'
        },
        backgroundColor: {
            type: String,
            default: RED
        },
        duration: {
            type: Number,
            default: 3000
        },
        zIndex: {
            type: Number,
            default: 110
        }
    },
    methods: {
        showFun() {
            const { duration } = this;
            clearTimeout(this.timer);
            this.set({
                show: true
            });

            if (duration > 0 && duration !== Infinity) {
                this.timer = setTimeout(() => {
                    this.hide();
                }, duration);
            }
        },

        hide() {
            clearTimeout(this.timer);
            this.set({
                show: false
            });
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-notify {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 6px 15px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    word-break: break-all;
    box-sizing: border-box;
}
.van-notify__safe-top {
    height: 44px;
}
</style>
