<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view
        v-if="show"
        :class="'custom-class ' + utils.bem('notice-bar', { withicon: mode, wrapable })"
        :style="'color: ' + color + '; background-color: ' + backgroundColor + ';'"
        @tap="onClick"
    >
        <van-icon v-if="leftIcon" size="16px" :name="leftIcon" class="van-notice-bar__left-icon" />

        <view class="van-notice-bar__wrap">
            <view :class="'van-notice-bar__content ' + (!scrollable && !wrapable ? 'van-ellipsis' : '')" :animation="animationData">
                {{ text }}
            </view>
        </view>

        <van-icon v-if="mode === 'closeable'" class="van-notice-bar__right-icon" name="cross" @tap.native="onClickIcon" />
        <navigator v-if="mode === 'link'" :url="url" :open-type="openType">
            <van-icon class="van-notice-bar__right-icon" name="arrow" />
        </navigator>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import { VantComponent } from '../common/component';
const FONT_COLOR = '#ed6a0c';
const BG_COLOR = '#fffbe8';
export default {
    components: {
        vanIcon
    },
    data() {
        return {
            show: true,
            animationData: ''
        };
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        openType: {
            type: String,
            default: 'navigate'
        },
        delay: {
            type: Number,
            default: 1
        },
        speed: {
            type: Number,
            default: 50
        },
        scrollable: {
            type: Boolean,
            default: true
        },
        leftIcon: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: FONT_COLOR
        },
        backgroundColor: {
            type: String,
            default: BG_COLOR
        },
        wrapable: Boolean
    },
    watch: {
        text: {
            handler: function () {
                this.set({}, this.init);
            },

            immediate: true,
            deep: true
        }
    },
    created() {
        this.resetAnimation = uni.createAnimation({
            duration: 0,
            timingFunction: 'linear'
        });
    },
    destroyed() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    },
    methods: {
        init() {
            Promise.all([this.getRect('.van-notice-bar__content'), this.getRect('.van-notice-bar__wrap')]).then((rects) => {
                const [contentRect, wrapRect] = rects;

                if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width) {
                    return;
                }

                const { speed, scrollable, delay } = this;

                if (scrollable && wrapRect.width < contentRect.width) {
                    const duration = (contentRect.width / speed) * 1000;
                    this.wrapWidth = wrapRect.width;
                    this.contentWidth = contentRect.width;
                    this.duration = duration;
                    this.animation = uni.createAnimation({
                        duration,
                        timingFunction: 'linear',
                        delay
                    });
                    this.scroll();
                }
            });
        },

        scroll() {
            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = null;
            this.set({
                animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
            });
            setTimeout(() => {
                this.set({
                    animationData: this.animation.translateX(-this.contentWidth).step().export()
                });
            }, 20);
            this.timer = setTimeout(() => {
                this.scroll();
            }, this.duration);
        },

        onClickIcon() {
            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = null;
            this.set({
                show: false
            });
        },

        onClick(event) {
            this.$emit('click', event);
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-notice-bar {
    display: -webkit-flex;
    display: flex;
    height: 40px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 24px;
    -webkit-align-items: center;
    align-items: center;
}
.van-notice-bar--withicon {
    position: relative;
    padding-right: 40px;
}
.van-notice-bar--wrapable {
    height: auto;
    padding: 8px 15px;
}
.van-notice-bar--wrapable .van-notice-bar__wrap {
    height: auto;
}
.van-notice-bar--wrapable .van-notice-bar__content {
    position: relative;
    white-space: normal;
}
.van-notice-bar__left-icon {
    display: -webkit-flex;
    display: flex;
    margin-right: 4px;
    vertical-align: middle;
    -webkit-align-items: center;
    align-items: center;
}
.van-notice-bar__right-icon {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 16px;
}
.van-notice-bar__wrap {
    position: relative;
    height: 24px;
    overflow: hidden;
    -webkit-flex: 1;
    flex: 1;
}
.van-notice-bar__content {
    position: absolute;
    white-space: nowrap;
}
.van-notice-bar__content.van-ellipsis {
    max-width: 100%;
}
</style>
