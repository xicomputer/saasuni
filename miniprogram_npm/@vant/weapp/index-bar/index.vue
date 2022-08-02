<template>
    <view class="van-index-bar">
        <slot />

        <view
            v-if="showSidebar"
            class="van-index-bar__sidebar"
            @tap.stop.prevent="onClick"
            @touchmove.stop.prevent="onTouchMove"
            @touchend.stop.prevent="onTouchStop"
            @touchcancel.stop.prevent="onTouchStop"
        >
            <view
                class="van-index-bar__index"
                :style="'z-index: ' + (zIndex + 1) + '; color: ' + (activeAnchorIndex === index ? highlightColor : '')"
                :data-index="index"
                v-for="(item, index) in indexList"
                :key="index"
            >
                {{ item }}
            </view>
        </view>
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var color_1 = require('../common/color');

var page_scroll_1 = require('../mixins/page-scroll');

var indexList = function () {
    var indexList = [];
    var charCodeOfA = 'A'.charCodeAt(0);

    for (var i = 0; i < 26; i++) {
        indexList.push(String.fromCharCode(charCodeOfA + i));
    }

    return indexList;
};

component_1.VantComponent({
    relation: {
        name: 'index-anchor',
        type: 'descendant',
        current: 'index-bar',
        linked: function () {
            this.updateData();
        },
        unlinked: function () {
            this.updateData();
        }
    },
    props: {
        sticky: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 1
        },
        highlightColor: {
            type: String,
            value: color_1.GREEN
        },
        stickyOffsetTop: {
            type: Number,
            value: 0
        },
        indexList: {
            type: Array,
            value: indexList()
        }
    },
    mixins: [
        page_scroll_1.pageScrollMixin(function (event) {
            this.scrollTop = event.scrollTop || 0;
            this.onScroll();
        })
    ],
    data: {
        activeAnchorIndex: null,
        showSidebar: false
    },
    created: function () {
        this.scrollTop = 0;
    },
    methods: {
        updateData: function () {
            var that = this;
            uni.nextTick(function () {
                if (that.timer != null) {
                    clearTimeout(that.timer);
                }

                that.timer = setTimeout(function () {
                    that.setData({
                        showSidebar: !!that.children.length
                    });
                    that.setRect().then(function () {
                        that.onScroll();
                    });
                }, 0);
            });
        },
        setRect: function () {
            return Promise.all([this.setAnchorsRect(), this.setListRect(), this.setSiderbarRect()]);
        },
        setAnchorsRect: function () {
            var that = this;
            return Promise.all(
                this.children.map(function (anchor) {
                    return anchor.getRect('.van-index-anchor-wrapper').then(function (rect) {
                        Object.assign(anchor, {
                            height: rect.height,
                            top: rect.top + that.scrollTop
                        });
                    });
                })
            );
        },
        setListRect: function () {
            var that = this;
            return this.getRect('.van-index-bar').then(function (rect) {
                Object.assign(that, {
                    height: rect.height,
                    top: rect.top + that.scrollTop
                });
            });
        },
        setSiderbarRect: function () {
            var that = this;
            return this.getRect('.van-index-bar__sidebar').then(function (res) {
                that.sidebar = {
                    height: res.height,
                    top: res.top
                };
            });
        },
        setDiffData: function (_a) {
            var target = _a.target;
            var data = _a.data;
            var diffData = {};
            Object.keys(data).forEach(function (key) {
                if (target.data[key] !== data[key]) {
                    diffData[key] = data[key];
                }
            });

            if (Object.keys(diffData).length) {
                target.setData(diffData);
            }
        },
        getAnchorRect: function (anchor) {
            return anchor.getRect('.van-index-anchor-wrapper').then(function (rect) {
                return {
                    height: rect.height,
                    top: rect.top
                };
            });
        },
        getActiveAnchorIndex: function () {
            var that = this;
            var children = that.children;
            var scrollTop = that.scrollTop;
            var _b = this.data;
            var sticky = _b.sticky;
            var stickyOffsetTop = _b.stickyOffsetTop;
            for (var i = this.children.length - 1; i >= 0; i--) {
                var preAnchorHeight = i > 0 ? children[i - 1].height : 0;
                var reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;

                if (reachTop + scrollTop >= children[i].top) {
                    return i;
                }
            }

            return -1;
        },
        onScroll: function () {
            var that = this;

            var _a = this;

            var _b = _a.children;
            var children = _b === void 0 ? [] : _b;
            var scrollTop = _a.scrollTop;
            if (!children.length) {
                return;
            }

            var _c = this.data;
            var sticky = _c.sticky;
            var stickyOffsetTop = _c.stickyOffsetTop;
            var zIndex = _c.zIndex;
            var highlightColor = _c.highlightColor;
            var active = this.getActiveAnchorIndex();
            this.setDiffData({
                target: this,
                data: {
                    activeAnchorIndex: active
                }
            });

            if (sticky) {
                var isActiveAnchorSticky_1 = false;

                if (active !== -1) {
                    isActiveAnchorSticky_1 = children[active].top <= stickyOffsetTop + scrollTop;
                }

                children.forEach(function (item, index) {
                    if (index === active) {
                        var wrapperStyle = '';
                        var anchorStyle = '\n              color: ' + highlightColor + ';\n            ';

                        if (isActiveAnchorSticky_1) {
                            wrapperStyle = '\n                height: ' + children[index].height + 'px;\n              ';
                            anchorStyle =
                                '\n                position: fixed;\n                top: ' +
                                stickyOffsetTop +
                                'px;\n                z-index: ' +
                                zIndex +
                                ';\n                color: ' +
                                highlightColor +
                                ';\n              ';
                        }

                        that.setDiffData({
                            target: item,
                            data: {
                                active: true,
                                anchorStyle: anchorStyle,
                                wrapperStyle: wrapperStyle
                            }
                        });
                    } else if (index === active - 1) {
                        var currentAnchor = children[index];
                        var currentOffsetTop = currentAnchor.top;
                        var targetOffsetTop = index === children.length - 1 ? that.top : children[index + 1].top;
                        var parentOffsetHeight = targetOffsetTop - currentOffsetTop;
                        var translateY = parentOffsetHeight - currentAnchor.height;
                        var anchorStyle =
                            '\n              position: relative;\n              transform: translate3d(0, ' +
                            translateY +
                            'px, 0);\n              z-index: ' +
                            zIndex +
                            ';\n              color: ' +
                            highlightColor +
                            ';\n            ';
                        that.setDiffData({
                            target: item,
                            data: {
                                active: true,
                                anchorStyle: anchorStyle
                            }
                        });
                    } else {
                        that.setDiffData({
                            target: item,
                            data: {
                                active: false,
                                anchorStyle: '',
                                wrapperStyle: ''
                            }
                        });
                    }
                });
            }
        },
        onClick: function (event) {
            this.scrollToAnchor(event.target.dataset.index);
        },
        onTouchMove: function (event) {
            var sidebarLength = this.children.length;
            var touch = event.touches[0];
            var itemHeight = this.sidebar.height / sidebarLength;
            var index = Math.floor((touch.clientY - this.sidebar.top) / itemHeight);

            if (index < 0) {
                index = 0;
            } else if (index > sidebarLength - 1) {
                index = sidebarLength - 1;
            }

            this.scrollToAnchor(index);
        },
        onTouchStop: function () {
            this.scrollToAnchorIndex = null;
        },
        scrollToAnchor: function (index) {
            var that = this;

            if (typeof index !== 'number' || this.scrollToAnchorIndex === index) {
                return;
            }

            this.scrollToAnchorIndex = index;
            var anchor = this.children.find(function (item) {
                return item.data.index === that.data.indexList[index];
            });

            if (anchor) {
                anchor.scrollIntoView(this.scrollTop);
                this.$emit('select', anchor.data.index);
            }
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-index-bar {
    position: relative;
}
.van-index-bar__sidebar {
    position: fixed;
    top: 50%;
    right: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    text-align: center;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-user-select: none;
    user-select: none;
}
.van-index-bar__index {
    font-weight: 500;
    padding: 0 4px 0 16px;
    padding: 0 var(--padding-base, 4px) 0 var(--padding-md, 16px);
    font-size: 10px;
    font-size: var(--index-bar-index-font-size, 10px);
    line-height: 14px;
    line-height: var(--index-bar-index-line-height, 14px);
}
</style>
