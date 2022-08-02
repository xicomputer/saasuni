<template>
    <view>
        <van-button
            square
            :id="id"
            size="large"
            :lang="lang"
            :type="type"
            :loading="loading"
            :disabled="disabled"
            :open-type="openType"
            custom-class="custom-class"
            :business-id="businessId"
            :session-from="sessionFrom"
            :app-parameter="appParameter"
            :send-message-img="sendMessageImg"
            :send-message-path="sendMessagePath"
            :show-message-card="showMessageCard"
            :send-message-title="sendMessageTitle"
            @click="onClick($event, { tagId: id })"
            @error="bindError($event, { tagId: id })"
            @contact="bindContact($event, { tagId: id })"
            @opensetting="bindOpenSetting($event, { tagId: id })"
            @getuserinfo="bindGetUserInfo($event, { tagId: id })"
            @getphonenumber="bindGetPhoneNumber($event, { tagId: id })"
            @launchapp="bindLaunchApp($event, { tagId: id })"
        >
            {{ text }}
        </van-button>
    </view>
</template>

<script>
import vanButton from '../button/index';
import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
export default {
    data() {
        return {
            id: '',
            lang: '',
            openType: '',
            businessId: '',
            sessionFrom: '',
            appParameter: '',
            sendMessageImg: '',
            sendMessagePath: '',
            showMessageCard: '',
            sendMessageTitle: ''
        };
    },
    components: {
        vanButton
    },
    mixins: [link, button, openType],
    props: {
        text: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            default: 'danger'
        }
    },
    methods: {
        onClick(event, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(event, _dataset);
            /* ---处理dataset end--- */
            this.$emit('click', event.detail);
            this.jumpLink();
        },

        bindError(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 bindError 未声明');
        },

        bindContact(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 bindContact 未声明');
        },

        bindOpenSetting(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 bindOpenSetting 未声明');
        },

        bindGetUserInfo(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 bindGetUserInfo 未声明');
        },

        bindGetPhoneNumber(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 bindGetPhoneNumber 未声明');
        },

        bindLaunchApp(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 bindLaunchApp 未声明');
        }
    }
};
</script>
<style>
@import '../common/index.css';
:host {
    -webkit-flex: 1;
    flex: 1;
}
</style>
