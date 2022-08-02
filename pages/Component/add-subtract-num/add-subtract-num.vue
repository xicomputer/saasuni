<template>
    <view class="add-subtract-num-container">
        <text class="icon icon-jian handle-btn" @tap.stop.prevent="minusHandle"></text>
        <text class="count-num">{{ count }}</text>
        <text class="icon icon-add handle-btn" @tap.stop.prevent="addHandle"></text>
    </view>
</template>

<script>
// pages/Component/add-subtract-num/add-subtract-num.js
export default {
    data() {
        return {
            count: 1
        };
    }
    /**
     * 组件的属性列表
     */,
    props: {
        defCount: {
            //默认数量
            type: [String, Number],
            default: 1
        },
        desabled: {
            type: Boolean,
            default: false
        }
    },
    beforeMount: function () {},
    /* 监听数据变化 */
    watch: {
        defCount: {
            handler: function (nowVal) {
                this.setData({
                    count: Number(nowVal)
                });
            },

            immediate: true,
            deep: true
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        minusHandle() {
            this.$emit('minusCount');

            if (this.desabled) {
                return;
            }

            var count = this.count - 1;

            if (count < 1) {
                uni.showToast({
                    title: '最小数量为1',
                    icon: 'none'
                });
            } else {
                this.setData(
                    {
                        count
                    },
                    () => {
                        this.$emit('change', {
                            detail: {
                                value: count
                            }
                        });
                    }
                );
            }
        },

        addHandle() {
            this.$emit('addCount');

            if (this.desabled) {
                return;
            }

            var count = this.count + 1;
            this.setData(
                {
                    count
                },
                () => {
                    this.$emit('change', {
                        detail: {
                            value: count
                        }
                    });
                }
            );
        }
    }
};
</script>
<style>
@font-face {
    font-family: 'icon'; /* Project id 2691355 */
    src: url('//at.alicdn.com/t/font_2691355_o1w0j6hfkr.woff2?t=1626867643354') format('woff2'),
        url('//at.alicdn.com/t/font_2691355_o1w0j6hfkr.woff?t=1626867643354') format('woff'),
        url('//at.alicdn.com/t/font_2691355_o1w0j6hfkr.ttf?t=1626867643354') format('truetype');
}

.icon {
    font-family: 'icon' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-add:before {
    content: '\e627';
}

.icon-jian:before {
    content: '\e726';
}

.add-subtract-num-container {
    display: flex;
    align-items: center;
}
.add-subtract-num-container .handle-btn {
    width: 64rpx;
    height: 60rpx;
    font-size: 18px;
    background-color: #f9f9f8;
    text-align: center;
    line-height: 60rpx;
}
.add-subtract-num-container .count-num {
    min-width: 64rpx;
    height: 60rpx;
    line-height: 60rpx;
    color: #333;
    text-align: center;
    font-size: 30rpx;
    background-color: #f1f1f1;
}
</style>
