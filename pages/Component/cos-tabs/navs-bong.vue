<template>
    <view class="btn-container">
        <view class="menu-list" v-if="!isShow">
            <view
                :class="'menu-item ' + (isFold ? item.inAnimation : item.outAnimation)"
                :data-url="item.url"
                @tap="toJump"
                :style="'bottom:' + item.bottom + ';right:' + item.right + ';'"
                v-for="(item, index) in navs"
                :key="index"
            >
                <image mode="widthFix" :src="item.src" class="menu-icon"></image>

                <!-- <text class='menu-name'>{{item.name}}</text> -->

                <view class="btn-num" v-if="item.name == '购物车' && cartnum != 0">{{ cartnum }}</view>
            </view>
        </view>
        <view @tap.stop.prevent="onClickAdd" class="btn-main">
            <image :class="'btn-img ' + (isShow ? '' : isFold ? 'menuOpen' : 'menuClose')" :src="isFold ? '../../../img/my/menu-close.png' : '../../../img/my/menu-open.png'" />
            <view class="btn-num" v-if="!isFold && cartnum != 0">{{ cartnum }}</view>
        </view>
    </view>
</template>

<script>
// components/menu.js
export default {
    data() {
        return {
            isFold: false,
            //动画切换
            isShow: true //是否显示
        };
    },
    /**
     * Component properties
     */
    props: {
        navs: {
            type: Array,
            default: () => []
        },
        cartnum: {
            type: Number,
            default: 0
        },
        marchantId: {
            type: Number,
            default: -1
        }
    },
    /**
     * Component methods
     */
    methods: {
        onClickAdd: function () {
            this.setData({
                isFold: !this.isFold,
                isShow: false
            });
        },

        toJump(e) {
            var url = e.currentTarget.dataset.url;
            console.log(this.marchantId);

            if (url == 'top') {
                if (uni.pageScrollTo) {
                    uni.pageScrollTo({
                        scrollTop: 0
                    });
                } else {
                    uni.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    });
                }
            } else {
                if (url == '/pages/tabPage/me/me') {
                    uni.switchTab({
                        url: '/pages/tabPage/me/me'
                    });
                } else {
                    uni.navigateTo({
                        url: url + '?marchantId=' + this.marchantId
                    });
                }
            }
        }
    }
};
</script>
<style>
.btn-container {
    z-index: 2;
    position: fixed;
    bottom: 0;
    right: 0;
}
.btn-main {
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    bottom: 150rpx;
    right: 20rpx;
}
.btn-img {
    width: 100%;
    height: 100%;
}
.btn-num {
    width: 26rpx;
    height: 26rpx;
    line-height: 26rpx;
    background: #ff1d2e;
    border: 1px solid #ff1c30;
    border-radius: 50%;

    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    opacity: 1;
    position: absolute;
    top: 0rpx;
    right: 0rpx;
    text-align: center;
}
.menuOpen {
    animation: menuO 0.3s both;
}
.menuClose {
    animation: menuC 0.3s both;
}
@keyframes menuO {
    0% {
        transform: rotate(0deg);
    }
    20% {
        transform: rotate(90deg);
    }
    40% {
        transform: rotate(45deg);
    }
    60% {
        transform: rotate(135deg);
    }
    80% {
        transform: rotate(90deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
@keyframes menuC {
    0% {
        transform: rotate(0deg);
    }
    20% {
        transform: rotate(90deg);
    }
    40% {
        transform: rotate(45deg);
    }
    60% {
        transform: rotate(135deg);
    }
    80% {
        transform: rotate(90deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    position: absolute;
}
.menu-icon {
    width: 88rpx;
    height: 8rpx;
    border-radius: 50%;
}
.menu-name {
    color: #607d8b;
    font-size: 25rpx;
    font-weight: 600;
}
.menu-in-animation1 {
    animation: bounceInDown1 0.45s linear both;
}
.menu-out-animation1 {
    animation: bounceOutDown1 0.45s linear both;
}
.menu-in-animation2 {
    animation: bounceInDown2 0.45s linear both;
}
.menu-out-animation2 {
    animation: bounceOutDown2 0.45s linear both;
}
.menu-in-animation3 {
    animation: bounceInDown3 0.45s linear both;
}
.menu-out-animation3 {
    animation: bounceOutDown3 0.45s linear both;
}
@keyframes bounceInDown1 {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    60% {
        transform: translateY(-10%);
    }
    80% {
        transform: translateY(10%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
}
@keyframes bounceOutDown1 {
    0% {
        opacity: 1;
        transform: translateY(0%);
    }
    60% {
        transform: translateY(10%);
    }
    80% {
        transform: translateY(-10%);
    }
    100% {
        opacity: 0;
        transform: translateY(100%);
    }
}
@keyframes bounceInDown2 {
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    60% {
        transform: translateX(-10%);
    }
    80% {
        transform: translateX(10%);
    }
    100% {
        opacity: 1;
        transform: translateX(0%);
    }
}
@keyframes bounceOutDown2 {
    0% {
        opacity: 1;
        transform: translateX(0%);
    }
    60% {
        transform: translateX(10%);
    }
    80% {
        transform: translateX(-10%);
    }
    100% {
        opacity: 0;
        transform: translateX(100%);
    }
}
@keyframes bounceInDown3 {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    60% {
        transform: translateY(10%);
    }
    80% {
        transform: translateY(-10%);
    }
    100% {
        opacity: 1;
        transform: translateY(-0%);
    }
}
@keyframes bounceOutDown3 {
    0% {
        opacity: 1;
        transform: translateY(-0%);
    }
    60% {
        transform: translateY(-10%);
    }
    80% {
        transform: translateY(10%);
    }
    100% {
        opacity: 0;
        transform: translateY(-100%);
    }
}
</style>
