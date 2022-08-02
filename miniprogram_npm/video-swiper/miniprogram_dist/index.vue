<template>
    <view class="container">
        <swiper class="video-swiper" :circular="circular" :easing-function="easingFunction" vertical current="0" :duration="duration" @animationfinish="animationfinish">
            <!-- curQueue 循环会导致video重新插入，objectFit 不可变更 -->
            <swiper-item v-for="(item, index) in curQueue" :key="index">
                <video
                    :id="'video_' + index"
                    class="video_item"
                    :loop="loop"
                    :autoplay="item.id == 0"
                    :enable-play-gesture="false"
                    enable-progress-gesture
                    :show-center-play-btn="false"
                    :controls="false"
                    :src="item.url"
                    :data-id="item.id"
                    :object-fit="item.objectFit || 'cover'"
                    :data-index="index"
                    @play="onPlay"
                    @pause="onPause"
                    @ended="onEnded"
                    @error="onError"
                    @timeupdate="onTimeUpdate"
                    @waiting="onWaiting"
                    @progress="onProgress"
                    @loadedmetadata="onLoadedMetaData"
                ></video>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
export default {
    data() {
        return {
            nextQueue: [],
            prevQueue: [],
            curQueue: [],
            circular: false,
            clone_last: 0,
            clone_change: -1,
            clone_invalidUp: 0,
            clone_invalidDown: 0,
            clone_videoContexts: []
        };
    },
    options: {
        addGlobalClass: true,
        pureDataPattern: /^_/
    },
    props: {
        duration: {
            type: Number,
            default: 500
        },
        easingFunction: {
            type: String,
            default: 'default'
        },
        loop: {
            type: Boolean,
            default: true
        },
        videoList: {
            type: Array,
            default: () => []
        }
    },
    beforeMount: function attached() {
        this._videoContexts = [uni.createVideoContext('video_0', this), uni.createVideoContext('video_1', this), uni.createVideoContext('video_2', this)];
    },
    methods: {
        _videoListChanged: function _videoListChanged(newVal) {
            var that = this;
            console.log(newVal);
            var data = this;
            newVal.forEach(function (item) {
                data.nextQueue.push(item);
            });

            if (data.curQueue.length === 0) {
                this.setData(
                    {
                        curQueue: data.nextQueue.splice(0, 3)
                    },
                    function () {
                        that.playCurrent(0);
                    }
                );
            }
        },
        animationfinish: function animationfinish(e) {
            var _data = this;
            var _last = _data._last;
            var _change = _data._change;
            var curQueue = _data.curQueue;
            var prevQueue = _data.prevQueue;
            var nextQueue = _data.nextQueue;
            var current = e.detail.current;
            var diff = current - _last;
            console.log(current, _last);

            if (diff === 0) {
                return;
            }

            this._last = current;
            this.playCurrent(current);
            this.$emit('change', {
                detail: {
                    activeId: curQueue[current].id
                }
            });
            var direction = diff === 1 || diff === -2 ? 'up' : 'down';

            if (direction === 'up') {
                if (this._invalidDown === 0) {
                    var change = (_change + 1) % 3;
                    var add = nextQueue.shift();
                    var remove = curQueue[change];

                    if (add) {
                        prevQueue.push(remove);
                        curQueue[change] = add;
                        this._change = change;
                    } else {
                        this._invalidUp += 1;
                    }
                } else {
                    this._invalidDown -= 1;
                }
            }

            if (direction === 'down') {
                if (this._invalidUp === 0) {
                    var _change2 = _change;
                    var _remove = curQueue[_change2];

                    var _add = prevQueue.pop();

                    if (_add) {
                        curQueue[_change2] = _add;
                        nextQueue.unshift(_remove);
                        this._change = (_change2 - 1 + 3) % 3;
                    } else {
                        this._invalidDown += 1;
                    }
                } else {
                    this._invalidUp -= 1;
                }
            }

            var circular = true;

            if (nextQueue.length === 0 && current !== 0) {
                circular = false;
            }

            if (prevQueue.length === 0 && current !== 2) {
                circular = false;
            }

            this.setData({
                curQueue: curQueue,
                circular: circular
            });
        },
        playCurrent: function playCurrent(current) {
            this._videoContexts.forEach(function (ctx, index) {
                if (index != current) {
                    ctx.pause();
                    ctx.stop();
                } else {
                    ctx.play();
                }
            });
        },
        onPlay: function onPlay(e) {
            this.trigger(e, 'play');
        },
        onPause: function onPause(e) {
            this.trigger(e, 'pause');
        },
        onEnded: function onEnded(e) {
            this.trigger(e, 'ended');
        },
        onError: function onError(e) {
            this.trigger(e, 'error');
        },
        onTimeUpdate: function onTimeUpdate(e) {
            this.trigger(e, 'timeupdate');
        },
        onWaiting: function onWaiting(e) {
            this.trigger(e, 'wait');
        },
        onProgress: function onProgress(e) {
            this.trigger(e, 'progress');
        },
        onLoadedMetaData: function onLoadedMetaData(e) {
            this.trigger(e, 'loadedmetadata');
        },
        trigger: function trigger(e, type) {
            var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var detail = e.detail;
            var activeId = e.target.dataset.id;
            this.$emit(type, {
                detail: Object.assign(
                    Object.assign(Object.assign({}, detail), {
                        activeId: activeId
                    }),
                    ext
                )
            });
        }
    },
    watch: {
        videoList: {
            handler: function observer() {
                var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                this._videoListChanged(newVal);
            },

            immediate: true,
            deep: true
        }
    }
};
/***/
</script>
<style>
.container {
    width: 100%;
    height: 100%;
}
.video-swiper {
    width: 100%;
    height: 100%;
}
.video_item {
    height: 100%;
    width: 100%;
}
</style>
