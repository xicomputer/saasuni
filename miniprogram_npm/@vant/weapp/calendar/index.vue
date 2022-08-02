<template>
    <view>
        <script module="computed" lang="wxs" src="./index.wxs"></script>

        <van-popup
            v-if="poppable"
            :custom-class="'van-calendar__popup--' + position"
            close-icon-class="van-calendar__close-icon"
            :show="show"
            :round="round"
            :position="position"
            :closeable="showTitle || showSubtitle"
            :close-on-click-overlay="closeOnClickOverlay"
            @enter="onOpen"
            @close="onClose"
            @after-enter="onOpened"
            @after-leave="onClosed"
        >
            <!-- parse <template is="calendar" 
 :data="title, subtitle, showTitle, showSubtitle, minDate, maxDate, type, color, showMark, formatter, rowHeight, currentDate, safeAreaInsetBottom, showConfirm, confirmDisabledText, confirmText, scrollIntoView, allowSameDay"/> -->
            <block name="calendar">
                <view class="van-calendar">
                    <header :title="title" :showTitle="showTitle" :subtitle="subtitle" :showSubtitle="showSubtitle">
                        <slot name="title" slot="title"></slot>
                    </header>

                    <scroll-view class="van-calendar__body" scroll-y :scroll-into-view="scrollIntoView">
                        <month
                            :id="'month' + index"
                            class="month"
                            :data-date="item"
                            :date="item"
                            :type="type"
                            :color="color"
                            :minDate="minDate"
                            :maxDate="maxDate"
                            :showMark="showMark"
                            :formatter="formatter"
                            :rowHeight="rowHeight"
                            :currentDate="currentDate"
                            :showSubtitle="showSubtitle"
                            :allowSameDay="allowSameDay"
                            :showMonthTitle="index !== 0 || !showSubtitle"
                            @click="onClickDay($event, { date: item, tagId: 'month' + index })"
                            v-for="(item, index) in computed.getMonths(minDate, maxDate)"
                            :key="index"
                        ></month>
                    </scroll-view>

                    <view :class="'van-calendar__footer ' + (safeAreaInsetBottom ? 'van-calendar__footer--safe-area-inset-bottom' : '')">
                        <slot name="footer"></slot>
                    </view>

                    <view :class="'van-calendar__footer ' + (safeAreaInsetBottom ? 'van-calendar__footer--safe-area-inset-bottom' : '')">
                        <van-button
                            v-if="showConfirm"
                            round
                            block
                            type="danger"
                            :color="color"
                            custom-class="van-calendar__confirm"
                            :disabled="computed.getButtonDisabled(type, currentDate)"
                            nativeType="text"
                            @click="onConfirm"
                        >
                            {{ computed.getButtonDisabled(type, currentDate) ? confirmDisabledText : confirmText }}
                        </van-button>
                    </view>
                </view>
            </block>
        </van-popup>

        <!-- parse <template wx:else
 is="calendar" 
 :data="title, subtitle, showTitle, showSubtitle, minDate, maxDate, type, color, showMark, formatter, rowHeight, currentDate, safeAreaInsetBottom, showConfirm, confirmDisabledText, confirmText, scrollIntoView, allowSameDay"/> -->
        <block name="calendar">
            <view class="van-calendar">
                <header :title="title" :showTitle="showTitle" :subtitle="subtitle" :showSubtitle="showSubtitle">
                    <slot name="title" slot="title"></slot>
                </header>

                <scroll-view class="van-calendar__body" scroll-y :scroll-into-view="scrollIntoView">
                    <month
                        :id="'month' + index"
                        class="month"
                        :data-date="item"
                        :date="item"
                        :type="type"
                        :color="color"
                        :minDate="minDate"
                        :maxDate="maxDate"
                        :showMark="showMark"
                        :formatter="formatter"
                        :rowHeight="rowHeight"
                        :currentDate="currentDate"
                        :showSubtitle="showSubtitle"
                        :allowSameDay="allowSameDay"
                        :showMonthTitle="index !== 0 || !showSubtitle"
                        @click="onClickDay($event, { date: item, tagId: 'month' + index })"
                        v-for="(item, index) in computed.getMonths(minDate, maxDate)"
                        :key="index"
                    ></month>
                </scroll-view>

                <view :class="'van-calendar__footer ' + (safeAreaInsetBottom ? 'van-calendar__footer--safe-area-inset-bottom' : '')">
                    <slot name="footer"></slot>
                </view>

                <view :class="'van-calendar__footer ' + (safeAreaInsetBottom ? 'van-calendar__footer--safe-area-inset-bottom' : '')">
                    <van-button
                        v-if="showConfirm"
                        round
                        block
                        type="danger"
                        :color="color"
                        custom-class="van-calendar__confirm"
                        :disabled="computed.getButtonDisabled(type, currentDate)"
                        nativeType="text"
                        @click="onConfirm"
                    >
                        {{ computed.getButtonDisabled(type, currentDate) ? confirmDisabledText : confirmText }}
                    </van-button>
                </view>
            </view>
        </block>

        <van-toast id="van-toast" />
    </view>
</template>

<script>
'use strict';
import header from './components/header/index';
import month from './components/month/index';
import vanButton from '../button/index';
import vanPopup from '../popup/index';
import vanToast from '../toast/index';

var __spreadArrays =
    (this && this.__spreadArrays) ||
    function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
            s += arguments[i].length;
        }

        for (var r = Array(s), k = 0, i = 0; i < il; i++) {
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
                r[k] = a[j];
            }
        }

        return r;
    };

var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule
            ? mod
            : {
                  default: mod
              };
    };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var utils_1 = require('./utils');

var toast_1 = __importDefault(require('../toast/toast'));

var utils_2 = require('../common/utils');

component_1.VantComponent({
    props: {
        title: {
            type: String,
            value: '日期选择'
        },
        color: String,
        show: {
            type: Boolean,
            observer: function (val) {
                if (val) {
                    this.initRect();
                    this.scrollIntoView();
                }
            }
        },
        formatter: null,
        confirmText: {
            type: String,
            value: '确定'
        },
        rangePrompt: String,
        defaultDate: {
            type: [Number, Array],
            observer: function (val) {
                this.setData({
                    currentDate: val
                });
                this.scrollIntoView();
            }
        },
        allowSameDay: Boolean,
        confirmDisabledText: String,
        type: {
            type: String,
            value: 'single',
            observer: 'reset'
        },
        minDate: {
            type: null,
            value: Date.now()
        },
        maxDate: {
            type: null,
            value: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
        },
        position: {
            type: String,
            value: 'bottom'
        },
        rowHeight: {
            type: [Number, String],
            value: utils_1.ROW_HEIGHT
        },
        round: {
            type: Boolean,
            value: true
        },
        poppable: {
            type: Boolean,
            value: true
        },
        showMark: {
            type: Boolean,
            value: true
        },
        showTitle: {
            type: Boolean,
            value: true
        },
        showConfirm: {
            type: Boolean,
            value: true
        },
        showSubtitle: {
            type: Boolean,
            value: true
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        maxRange: {
            type: [Number, String],
            value: null
        }
    },
    data: {
        subtitle: '',
        currentDate: null,
        scrollIntoView: ''
    },
    created: function () {
        this.setData({
            currentDate: this.getInitialDate()
        });
    },
    mounted: function () {
        if (this.data.show || !this.data.poppable) {
            this.initRect();
            this.scrollIntoView();
        }
    },
    methods: {
        reset: function () {
            this.setData({
                currentDate: this.getInitialDate()
            });
            this.scrollIntoView();
        },
        initRect: function () {
            var that = this;

            if (this.contentObserver != null) {
                this.contentObserver.disconnect();
            }

            var contentObserver = this.createIntersectionObserver({
                thresholds: [0, 0.1, 0.9, 1],
                observeAll: true
            });
            this.contentObserver = contentObserver;
            contentObserver.relativeTo('.van-calendar__body');
            contentObserver.observe('.month', function (res) {
                if (res.boundingClientRect.top <= res.relativeRect.top) {
                    // @ts-ignore
                    that.setData({
                        subtitle: utils_1.formatMonthTitle(res.dataset.date)
                    });
                }
            });
        },
        getInitialDate: function () {
            var _a = this.data;
            var type = _a.type;
            var defaultDate = _a.defaultDate;
            var minDate = _a.minDate;
            if (type === 'range') {
                var _b = defaultDate || [];

                var startDay = _b[0];
                var endDay = _b[1];
                return [startDay || minDate, endDay || utils_1.getNextDay(new Date(minDate)).getTime()];
            }

            if (type === 'multiple') {
                return defaultDate || [minDate];
            }

            return defaultDate || minDate;
        },
        scrollIntoView: function () {
            var that = this;
            utils_2.requestAnimationFrame(function () {
                var _a = that.data;
                var currentDate = _a.currentDate;
                var type = _a.type;
                var show = _a.show;
                var poppable = _a.poppable;
                var minDate = _a.minDate;
                var maxDate = _a.maxDate;
                var targetDate = type === 'single' ? currentDate : currentDate[0];
                var displayed = show || !poppable;

                if (!targetDate || !displayed) {
                    return;
                }

                var months = utils_1.getMonths(minDate, maxDate);
                months.some(function (month, index) {
                    if (utils_1.compareMonth(month, targetDate) === 0) {
                        that.setData({
                            scrollIntoView: 'month' + index
                        });
                        return true;
                    }

                    return false;
                });
            });
        },
        onOpen: function () {
            this.$emit('open');
        },
        onOpened: function () {
            this.$emit('opened');
        },
        onClose: function () {
            this.$emit('close');
        },
        onClosed: function () {
            this.$emit('closed');
        },
        onClickDay: function (event) {
            var date = event.detail.date;
            var _a = this.data;
            var type = _a.type;
            var currentDate = _a.currentDate;
            var allowSameDay = _a.allowSameDay;
            if (type === 'range') {
                var startDay = currentDate[0];
                var endDay = currentDate[1];
                if (startDay && !endDay) {
                    var compareToStart = utils_1.compareDay(date, startDay);

                    if (compareToStart === 1) {
                        this.select([startDay, date], true);
                    } else if (compareToStart === -1) {
                        this.select([date, null]);
                    } else if (allowSameDay) {
                        this.select([date, date]);
                    }
                } else {
                    this.select([date, null]);
                }
            } else if (type === 'multiple') {
                var selectedIndex_1;
                var selected = currentDate.some(function (dateItem, index) {
                    var equal = utils_1.compareDay(dateItem, date) === 0;

                    if (equal) {
                        selectedIndex_1 = index;
                    }

                    return equal;
                });

                if (selected) {
                    var cancelDate = currentDate.splice(selectedIndex_1, 1);
                    this.setData({
                        currentDate: currentDate
                    });
                    this.unselect(cancelDate);
                } else {
                    this.select(__spreadArrays(currentDate, [date]));
                }
            } else {
                this.select(date, true);
            }
        },
        unselect: function (dateArray) {
            var date = dateArray[0];

            if (date) {
                this.$emit('unselect', utils_1.copyDates(date));
            }
        },
        select: function (date, complete) {
            if (complete && this.data.type === 'range') {
                var valid = this.checkRange(date);

                if (!valid) {
                    // auto selected to max range if showConfirm
                    if (this.data.showConfirm) {
                        this.emit([date[0], utils_1.getDayByOffset(date[0], this.data.maxRange - 1)]);
                    } else {
                        this.emit(date);
                    }

                    return;
                }
            }

            this.emit(date);

            if (complete && !this.data.showConfirm) {
                this.onConfirm();
            }
        },
        emit: function (date) {
            var getTime = function (date) {
                return date instanceof Date ? date.getTime() : date;
            };

            this.setData({
                currentDate: Array.isArray(date) ? date.map(getTime) : getTime(date)
            });
            this.$emit('select', utils_1.copyDates(date));
        },
        checkRange: function (date) {
            var _a = this.data;
            var maxRange = _a.maxRange;
            var rangePrompt = _a.rangePrompt;
            if (maxRange && utils_1.calcDateNum(date) > maxRange) {
                toast_1.default({
                    context: this,
                    message: rangePrompt || '\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 ' + maxRange + ' \u5929'
                });
                return false;
            }

            return true;
        },
        onConfirm: function () {
            var that = this;

            if (this.data.type === 'range' && !this.checkRange(this.data.currentDate)) {
                return;
            }

            uni.nextTick(function () {
                that.$emit('confirm', utils_1.copyDates(that.data.currentDate));
            });
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-calendar {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    height: 100%;
    height: var(--calendar-height, 100%);
    background-color: #fff;
    background-color: var(--calendar-background-color, #fff);
}
.van-calendar__close-icon {
    top: 11px;
}
.van-calendar__popup--bottom,
.van-calendar__popup--top {
    height: 80%;
    height: var(--calendar-popup-height, 80%);
}
.van-calendar__popup--left,
.van-calendar__popup--right {
    height: 100%;
}
.van-calendar__body {
    -webkit-flex: 1;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.van-calendar__footer {
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    padding: 0 16px;
    padding: 0 var(--padding-md, 16px);
}
.van-calendar__footer--safe-area-inset-bottom {
    padding-bottom: env(safe-area-inset-bottom);
}
.van-calendar__footer + .van-calendar__footer,
.van-calendar__footer:empty {
    display: none;
}
.van-calendar__footer:empty + .van-calendar__footer {
    display: block !important;
}
.van-calendar__confirm {
    height: 36px !important;
    height: var(--calendar-confirm-button-height, 36px) !important;
    margin: 7px 0 !important;
    margin: var(--calendar-confirm-button-margin, 7px 0) !important;
    line-height: 34px !important;
    line-height: var(--calendar-confirm-button-line-height, 34px) !important;
}
</style>
