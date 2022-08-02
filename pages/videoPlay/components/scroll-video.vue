<template>
    <!-- components/scroll-video.wxml -->
    <view class="video-container">
        <view class="video-scroll-container" :animation="scrollAnimate">
            <view class="video-scroll-item" @touchstart="onTouchStart" @touchend="onTouchEnd" :data-videoidx="idx" v-for="(items, idx) in videoList" :key="items.idx">
                <block v-if="items.video_is_player">
                    <block v-if="playerType === 'video'">
                        <video-button-bar @buttonhandle="buttonhandle" :itemdata="items"></video-button-bar>
                        <video
                            class="video-player"
                            :controls="false"
                            :autoplay="true"
                            :poster="items.coverUrl"
                            :src="items.videoUrl"
                            :show-fullscreen-btn="false"
                            :show-play-btn="false"
                            :object-fit="fitType"
                        ></video>
                    </block>
                    <block v-if="playerType === 'live'">
                        <live-player class="video-player" :style="'width:' + screenWidth + 'px'" :src="items.videoUrl" :object-fit="fitType" autoplay mode="RTC">
                            <video-button-bar @buttonhandle="buttonhandle" :itemdata="items"></video-button-bar>
                        </live-player>
                    </block>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
import videoButtonBar from './video-button-bar';
// components/scroll-video.js
export default {
    components: {
        videoButtonBar
    },
    data() {
        return {
            startY: 0,
            //开始y点
            screenHeight: 0,
            //获取当前屏幕高度
            screenWidth: 0,
            scrollAnimate: 0,
            videoidx: 0,
            //保存切换下标
            videoSize: 0 //视频列表的长度
        };
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    props: {
        //父组件传入的视频列表
        videoList: {
            type: Array,
            default: () => []
        },
        //视频或者直播适配页面方式
        fitType: {
            type: String,
            default: 'contain'
        },
        //滑动距离的设置 超过该距离回出现页面下滑或者上滑的情况
        thresholdValue: {
            type: Number,
            default: 100
        },
        //播放器类型
        playerType: {
            type: String,
            default: 'video'
        }
    },
    mounted: function () {
        this.animation = uni.createAnimation({
            duration: 600,
            timingFunction: 'linear'
        });
        let that = this;
        uni.getSystemInfo({
            success: function (res) {
                that.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth
                });
            }
        });
        console.log(this.videoList.length);
        this.setData({
            videoSize: this.videoList.length
        });
    },
    /**
     * 组件的方法列表
     */
    methods: {
        buttonhandle: function (e) {
            const { buttontype, buttonname, itemid } = e.detail;
            this.$emit('menuTap', {
                detail: {
                    buttontype,
                    buttonname,
                    itemid
                }
            });
        },
        onTouchStart: function (e) {
            const { pageY } = e.changedTouches[0]; //记录手指位置

            this.setData({
                startY: pageY
            });
        },
        onTouchEnd: function (e) {
            let { videoidx } = e.currentTarget.dataset;
            videoidx = parseInt(videoidx);
            console.log(videoidx);
            let thresholdValue = this.thresholdValue;
            const { startY } = this;
            let movey = e.changedTouches[0].pageY;
            let changeY = movey - startY;

            if (changeY > 0) {
                if (changeY >= thresholdValue) {
                    if (videoidx === 0) {
                        this.$emit('swipeToStart', {
                            detail: {
                                oldindex: 0,
                                newindex: videoidx,
                                playerType: this.playerType
                            }
                        });
                        return false;
                    }

                    let top_height = -((videoidx - 1) * this.screenHeight);
                    console.log('手指向下滑动,往上切换视频');
                    this.$emit('swipeDown', {
                        detail: {
                            oldindex: videoidx,
                            newindex: videoidx - 1,
                            playerType: this.playerType
                        }
                    });
                    this.animation.translateY(top_height).step();
                    this.setData({
                        scrollAnimate: this.animation.export(),
                        videoidx: videoidx
                    });
                }
            } else {
                let abschangeY = Math.abs(changeY);

                if (abschangeY >= thresholdValue) {
                    if (videoidx + 1 === this.videoSize) {
                        // this.triggerEvent('swipeToEnd', {
                        //   oldindex: videoidx + 1,
                        //   newindex:videoidx,
                        //   playerType: this.properties.playerType
                        // });
                        //return false;
                        videoidx = -1;
                    }

                    let btm_height = -((videoidx + 1) * this.screenHeight);
                    this.$emit('swipeUpper', {
                        detail: {
                            oldindex: videoidx,
                            newindex: videoidx + 1,
                            playerType: this.playerType
                        }
                    });
                    this.animation.translateY(btm_height).step();
                    console.log('向上滑动,往下切换视频');
                    this.setData({
                        scrollAnimate: this.animation.export(),
                        videoidx: videoidx
                    });
                }
            }
        }
    },
    watch: {
        videoList: {
            handler: function (newVal, oldVal) {
                this.setData({
                    videoSize: newVal.length
                });
            },

            immediate: true,
            deep: true
        },

        thresholdValue: {
            handler: function (newVal, oldVal) {
                console.log(newVal, oldVal);
            },

            immediate: true
        },

        playerType: {
            handler: function (newVal, oldVal) {},
            immediate: true
        }
    }
};
</script>
<style>
/* components/scroll-video.wxss */
.video-container {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #000;
    overflow: hidden;
}
.video-scroll-container {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 366;
}
.video-scroll-item {
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 333;
    position: relative;
}
.video-player {
    display: inline-block;
    width: 100%;
    height: 100%;
}
.message-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #000;
}
</style>
