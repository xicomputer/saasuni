<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view class="van-circle">
        <canvas class="van-circle__canvas" :type="type" :style="'width: ' + utils.addUnit(size) + ';height:' + utils.addUnit(size)" id="van-circle" canvas-id="van-circle"></canvas>
        <view v-if="!text" class="van-circle__text">
            <slot></slot>
        </view>
        <cover-view v-else class="van-circle__text">{{ text }}</cover-view>
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var utils_1 = require('../common/utils');

var color_1 = require('../common/color');

var canvas_1 = require('./canvas');

function format(rate) {
    return Math.min(Math.max(rate, 0), 100);
}

var PERIMETER = 2 * Math.PI;
var BEGIN_ANGLE = -Math.PI / 2;
var STEP = 1;
component_1.VantComponent({
    props: {
        text: String,
        lineCap: {
            type: String,
            value: 'round'
        },
        value: {
            type: Number,
            value: 0,
            observer: 'reRender'
        },
        speed: {
            type: Number,
            value: 50
        },
        size: {
            type: Number,
            value: 100,
            observer: function () {
                this.drawCircle(this.currentValue);
            }
        },
        fill: String,
        layerColor: {
            type: String,
            value: color_1.WHITE
        },
        color: {
            type: [String, Object],
            value: color_1.BLUE,
            observer: function () {
                var that = this;
                this.setHoverColor().then(function () {
                    that.drawCircle(that.currentValue);
                });
            }
        },
        type: {
            type: String,
            value: ''
        },
        strokeWidth: {
            type: Number,
            value: 4
        },
        clockwise: {
            type: Boolean,
            value: true
        }
    },
    data: {
        hoverColor: color_1.BLUE
    },
    methods: {
        getContext: function () {
            var that = this;
            var _a = this.data;
            var type = _a.type;
            var size = _a.size;
            if (type === '') {
                var ctx = uni.createCanvasContext('van-circle', this);
                return Promise.resolve(ctx);
            }

            var dpr = uni.getSystemInfoSync().pixelRatio;
            return new Promise(function (resolve) {
                uni.createSelectorQuery()
                    .in(that)
                    .select('#van-circle')
                    .node()
                    .exec(function (res) {
                        var canvas = res[0].node;
                        var ctx = canvas.getContext(type);

                        if (!that.inited) {
                            that.inited = true;
                            canvas.width = size * dpr;
                            canvas.height = size * dpr;
                            ctx.scale(dpr, dpr);
                        }

                        resolve(canvas_1.adaptor(ctx));
                    });
            });
        },
        setHoverColor: function () {
            var that = this;
            var _a = this.data;
            var color = _a.color;
            var size = _a.size;
            if (utils_1.isObj(color)) {
                return this.getContext().then(function (context) {
                    var LinearColor = context.createLinearGradient(size, 0, 0, 0);
                    Object.keys(color)
                        .sort(function (a, b) {
                            return parseFloat(a) - parseFloat(b);
                        })
                        .map(function (key) {
                            return LinearColor.addColorStop(parseFloat(key) / 100, color[key]);
                        });
                    that.hoverColor = LinearColor;
                });
            }

            this.hoverColor = color;
            return Promise.resolve();
        },
        presetCanvas: function (context, strokeStyle, beginAngle, endAngle, fill) {
            var _a = this.data;
            var strokeWidth = _a.strokeWidth;
            var lineCap = _a.lineCap;
            var clockwise = _a.clockwise;
            var size = _a.size;
            var position = size / 2;
            var radius = position - strokeWidth / 2;
            context.setStrokeStyle(strokeStyle);
            context.setLineWidth(strokeWidth);
            context.setLineCap(lineCap);
            context.beginPath();
            context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
            context.stroke();

            if (fill) {
                context.setFillStyle(fill);
                context.fill();
            }
        },
        renderLayerCircle: function (context) {
            var _a = this.data;
            var layerColor = _a.layerColor;
            var fill = _a.fill;
            this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
        },
        renderHoverCircle: function (context, formatValue) {
            var clockwise = this.data.clockwise; // ????????????

            var progress = PERIMETER * (formatValue / 100);
            var endAngle = clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress);
            this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
        },
        drawCircle: function (currentValue) {
            var that = this;
            var size = this.data.size;
            this.getContext().then(function (context) {
                context.clearRect(0, 0, size, size);
                that.renderLayerCircle(context);
                var formatValue = format(currentValue);

                if (formatValue !== 0) {
                    that.renderHoverCircle(context, formatValue);
                }

                context.draw();
            });
        },
        reRender: function () {
            var that = this; // tofector ??????????????????????????????????????????

            var _a = this.data;
            var value = _a.value;
            var speed = _a.speed;
            if (speed <= 0 || speed > 1000) {
                this.drawCircle(value);
                return;
            }

            this.clearInterval();
            this.currentValue = this.currentValue || 0;
            this.interval = setInterval(function () {
                if (that.currentValue !== value) {
                    if (that.currentValue < value) {
                        that.currentValue += STEP;
                    } else {
                        that.currentValue -= STEP;
                    }

                    that.drawCircle(that.currentValue);
                } else {
                    that.clearInterval();
                }
            }, 1000 / speed);
        },
        clearInterval: function () {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    },
    mounted: function () {
        var that = this;
        this.currentValue = this.data.value;
        this.setHoverColor().then(function () {
            that.drawCircle(that.currentValue);
        });
    },
    destroyed: function () {
        this.clearInterval();
    }
});
</script>
<style>
@import '../common/index.css';
.van-circle {
    position: relative;
    display: inline-block;
    text-align: center;
}
.van-circle__text {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    color: #323233;
    color: var(--circle-text-color, #323233);
}
</style>
