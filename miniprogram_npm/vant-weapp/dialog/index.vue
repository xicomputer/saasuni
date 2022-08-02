<template>
    <view>
        <van-popup
            :show="show"
            :z-index="zIndex"
            :overlay="overlay"
            :custom-class="'van-dialog ' + className"
            :transition="transition"
            :custom-style="customStyle"
            :close-on-click-overlay="closeOnClickOverlay"
            @close="onClickOverlay"
        >
            <view v-if="title" :class="'van-dialog__header ' + (message || useSlot ? '' : 'van-dialog--isolated')">
                {{ title }}
            </view>

            <slot v-if="useSlot" />
            <view
                v-else-if="message"
                :class="'van-dialog__message ' + (title ? 'van-dialog__message--has-title' : '') + ' ' + (messageAlign ? 'van-dialog__message--' + messageAlign : '')"
            >
                <text>{{ message }}</text>
            </view>

            <view class="van-hairline--top van-dialog__footer">
                <van-button
                    v-if="showCancelButton"
                    size="large"
                    :loading="loading.cancel"
                    class="van-dialog__button van-hairline--right"
                    custom-class="van-dialog__cancel"
                    @click="onCancel"
                >
                    {{ cancelButtonText }}
                </van-button>
                <van-button
                    v-if="showConfirmButton"
                    size="large"
                    class="van-dialog__button"
                    :loading="loading.confirm"
                    custom-class="van-dialog__confirm"
                    :open-type="confirmButtonOpenType"
                    :lang="lang"
                    :business-id="businessId"
                    :session-from="sessionFrom"
                    :send-message-title="sendMessageTitle"
                    :send-message-path="sendMessagePath"
                    :send-message-img="sendMessageImg"
                    :show-message-card="showMessageCard"
                    :app-parameter="appParameter"
                    @click="onConfirm"
                    @getuserinfo="bindGetUserInfo"
                    @contact="bindContact"
                    @getphonenumber="bindGetPhoneNumber"
                    @error="bindError"
                    @launchapp="bindLaunchApp"
                    @opensetting="bindOpenSetting"
                >
                    {{ confirmButtonText }}
                </van-button>
            </view>
        </van-popup>
    </view>
</template>

<script>
import vanPopup from '../popup/index';
import vanButton from '../button/index';
import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
export default {
    components: {
        vanPopup,
        vanButton
    },
    data() {
        return {
            loading: {
                confirm: false,
                cancel: false
            },

            lang: '',
            businessId: '',
            sessionFrom: '',
            sendMessageTitle: '',
            sendMessagePath: '',
            sendMessageImg: '',
            showMessageCard: '',
            appParameter: ''
        };
    },
    mixins: [button, openType],
    props: {
        show: Boolean,
        title: String,
        message: String,
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        zIndex: {
            type: Number,
            default: 2000
        },
        confirmButtonText: {
            type: String,
            default: '确认'
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        showConfirmButton: {
            type: Boolean,
            default: true
        },
        overlay: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: 'scale'
        }
    },
    watch: {
        show: {
            handler: function (show) {
                if (!show) {
                    this.stopLoading();
                }
            },

            immediate: true,
            deep: true
        }
    },
    methods: {
        onConfirm() {
            this.handleAction('confirm');
        },

        onCancel() {
            this.handleAction('cancel');
        },

        onClickOverlay() {
            this.onClose('overlay');
        },

        handleAction(action) {
            if (this.asyncClose) {
                this.set({
                    [`loading.${action}`]: true
                });
            }

            this.onClose(action);
        },

        close() {
            this.set({
                show: false
            });
        },

        stopLoading() {
            this.set({
                loading: {
                    confirm: false,
                    cancel: false
                }
            });
        },

        onClose(action) {
            if (!this.asyncClose) {
                this.close();
            }

            this.$emit('close', action); // 把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading

            this.$emit(action, {
                dialog: this
            });
            const callback = this[action === 'confirm' ? 'onConfirm' : 'onCancel'];

            if (callback) {
                callback(this);
            }
        },

        bindGetUserInfo() {
            console.log('占位：函数 bindGetUserInfo 未声明');
        },

        bindContact() {
            console.log('占位：函数 bindContact 未声明');
        },

        bindGetPhoneNumber() {
            console.log('占位：函数 bindGetPhoneNumber 未声明');
        },

        bindError() {
            console.log('占位：函数 bindError 未声明');
        },

        bindLaunchApp() {
            console.log('占位：函数 bindLaunchApp 未声明');
        },

        bindOpenSetting() {
            console.log('占位：函数 bindOpenSetting 未声明');
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-dialog {
    top: 45% !important;
    width: 85%;
    overflow: hidden;
    font-size: 16px;
    background-color: #fff;
    border-radius: 4px;
}
.van-dialog__header {
    padding-top: 25px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
}
.van-dialog__header--isolated {
    padding: 25px 0;
}
.van-dialog__message {
    max-height: 60vh;
    padding: 25px;
    overflow-y: auto;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    -webkit-overflow-scrolling: touch;
}
.van-dialog__message--has-title {
    padding-top: 12px;
    color: #7d7e80;
}
.van-dialog__message--left {
    text-align: left;
}
.van-dialog__message--right {
    text-align: right;
}
.van-dialog__footer {
    display: -webkit-flex;
    display: flex;
}
.van-dialog__button {
    -webkit-flex: 1;
    flex: 1;
}
.van-dialog__cancel,
.van-dialog__confirm {
    border: 0 !important;
}
.van-dialog__confirm {
    color: #1989fa !important;
}
.van-dialog-bounce-enter {
    opacity: 0;
    -webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
    transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.van-dialog-bounce-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);
    transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>
