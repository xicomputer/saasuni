<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view class="van-uploader">
        <view class="van-uploader__wrapper">
            <!-- 预览样式 -->
            <view v-if="previewImage" class="van-uploader__preview" :data-index="index" @tap="onClickPreview" v-for="(item, index) in lists" :key="index">
                <image
                    v-if="item.isImage"
                    :mode="imageFit"
                    :src="item.url || item.path"
                    :alt="item.name || '图片' + index"
                    class="van-uploader__preview-image"
                    :style="'width: ' + utils.addUnit(previewSize) + '; height: ' + utils.addUnit(previewSize) + ';'"
                    :data-index="index"
                    @tap="onPreviewImage"
                />

                <view wx:else class="van-uploader__file" :style="'width: ' + utils.addUnit(previewSize) + '; height: ' + utils.addUnit(previewSize) + ';'">
                    <van-icon name="description" class="van-uploader__file-icon" />
                    <view class="van-uploader__file-name van-ellipsis">{{ item.name || item.url || item.path }}</view>
                </view>

                <view v-if="item.status === 'uploading' || item.status === 'failed'" class="van-uploader__mask">
                    <van-icon v-if="item.status === 'failed'" name="close" class="van-uploader__mask-icon" />
                    <van-loading v-else custom-class="van-uploader__loading" />
                    <text v-if="item.message" class="van-uploader__mask-message">{{ item.message }}</text>
                </view>

                <view v-if="deletable && item.deletable" :data-index="index" class="van-uploader__preview-delete" @tap.stop.prevent="deleteItem">
                    <van-icon name="cross" class="van-uploader__preview-delete-icon" />
                </view>
            </view>

            <!-- 上传样式 -->
            <block v-if="isInCount">
                <view class="van-uploader__slot" @tap="startUpload">
                    <slot />
                </view>

                <!-- 默认上传样式 -->
                <view
                    v-if="showUpload"
                    :class="'van-uploader__upload ' + (disabled ? 'van-uploader__upload--disabled' : '')"
                    :style="'width: ' + utils.addUnit(previewSize) + '; height: ' + utils.addUnit(previewSize) + ';'"
                    @tap="startUpload"
                >
                    <van-icon :name="uploadIcon" class="van-uploader__upload-icon" />
                    <text v-if="uploadText" class="van-uploader__upload-text">{{ uploadText }}</text>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
'use strict';
import vanIcon from '../icon/index';
import vanLoading from '../loading/index';

var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];

                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) {
                            t[p] = s[p];
                        }
                    }
                }

                return t;
            };

        return __assign.apply(this, arguments);
    };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var utils_1 = require('./utils');

var shared_1 = require('./shared');

component_1.VantComponent({
    props: __assign(
        __assign(
            {
                disabled: Boolean,
                multiple: Boolean,
                uploadText: String,
                useBeforeRead: Boolean,
                afterRead: null,
                beforeRead: null,
                previewSize: {
                    type: null,
                    value: 80
                },
                name: {
                    type: [Number, String],
                    value: ''
                },
                accept: {
                    type: String,
                    value: 'image'
                },
                fileList: {
                    type: Array,
                    value: [],
                    observer: 'formatFileList'
                },
                maxSize: {
                    type: Number,
                    value: Number.MAX_VALUE
                },
                maxCount: {
                    type: Number,
                    value: 100
                },
                deletable: {
                    type: Boolean,
                    value: true
                },
                showUpload: {
                    type: Boolean,
                    value: true
                },
                previewImage: {
                    type: Boolean,
                    value: true
                },
                previewFullImage: {
                    type: Boolean,
                    value: true
                },
                imageFit: {
                    type: String,
                    value: 'scaleToFill'
                },
                uploadIcon: {
                    type: String,
                    value: 'photograph'
                }
            },
            shared_1.chooseImageProps
        ),
        shared_1.chooseVideoProps
    ),
    data: {
        lists: [],
        isInCount: true
    },
    methods: {
        formatFileList: function () {
            var _a = this.data;
            var _b = _a.fileList;
            var fileList = _b === void 0 ? [] : _b;
            var maxCount = _a.maxCount;
            var lists = fileList.map(function (item) {
                return __assign(__assign({}, item), {
                    isImage: typeof item.isImage === 'undefined' ? utils_1.isImageFile(item) : item.isImage,
                    deletable: typeof item.deletable === 'undefined' ? true : item.deletable
                });
            });
            this.setData({
                lists: lists,
                isInCount: lists.length < maxCount
            });
        },
        getDetail: function (index) {
            return {
                name: this.data.name,
                index: index == null ? this.data.fileList.length : index
            };
        },
        startUpload: function () {
            var that = this;
            var _a = this.data;
            var maxCount = _a.maxCount;
            var multiple = _a.multiple;
            var accept = _a.accept;
            var lists = _a.lists;
            var disabled = _a.disabled;
            if (disabled) {
                return;
            }

            utils_1
                .chooseFile(
                    __assign(__assign({}, this.data), {
                        maxCount: maxCount - lists.length
                    })
                )
                .then(function (res) {
                    var file = null;

                    if (utils_1.isVideo(res, accept)) {
                        file = __assign(
                            {
                                path: res.tempFilePath
                            },
                            res
                        );
                    } else {
                        if (multiple) {
                            file = res.tempFiles;
                        } else {
                            file = res.tempFiles[0];
                        }
                    }

                    that.onBeforeRead(file);
                })
                .catch(function (error) {
                    that.$emit('error', error);
                });
        },
        onBeforeRead: function (file) {
            var that = this;
            var _a = this.data;
            var beforeRead = _a.beforeRead;
            var useBeforeRead = _a.useBeforeRead;
            var res = true;

            if (typeof beforeRead === 'function') {
                res = beforeRead(file, this.getDetail());
            }

            if (useBeforeRead) {
                res = new Promise(function (resolve, reject) {
                    that.$emit(
                        'before-read',
                        __assign(
                            __assign(
                                {
                                    file: file
                                },
                                that.getDetail()
                            ),
                            {
                                callback: function (ok) {
                                    if (ok) {
                                        resolve();
                                    } else {
                                        reject();
                                    }
                                }
                            }
                        )
                    );
                });
            }

            if (!res) {
                return;
            }

            if (utils_1.isPromise(res)) {
                res.then(function (data) {
                    return that.onAfterRead(data || file);
                });
            } else {
                this.onAfterRead(file);
            }
        },
        onAfterRead: function (file) {
            var maxSize = this.data.maxSize;
            var oversize = Array.isArray(file)
                ? file.some(function (item) {
                      return item.size > maxSize;
                  })
                : file.size > maxSize;

            if (oversize) {
                this.$emit(
                    'oversize',
                    __assign(
                        {
                            file: file
                        },
                        this.getDetail()
                    )
                );
                return;
            }

            if (typeof this.data.afterRead === 'function') {
                this.data.afterRead(file, this.getDetail());
            }

            this.$emit(
                'after-read',
                __assign(
                    {
                        file: file
                    },
                    this.getDetail()
                )
            );
        },
        deleteItem: function (event) {
            var index = event.currentTarget.dataset.index;
            this.$emit(
                'delete',
                __assign(__assign({}, this.getDetail(index)), {
                    file: this.data.fileList[index]
                })
            );
        },
        onPreviewImage: function (event) {
            if (!this.data.previewFullImage) {
                return;
            }

            var index = event.currentTarget.dataset.index;
            var lists = this.data.lists;
            var item = lists[index];
            uni.previewImage({
                urls: lists
                    .filter(function (item) {
                        return item.isImage;
                    })
                    .map(function (item) {
                        return item.url || item.path;
                    }),
                current: item.url || item.path,
                fail: function () {
                    uni.showToast({
                        title: '预览图片失败',
                        icon: 'none'
                    });
                }
            });
        },
        onClickPreview: function (event) {
            var index = event.currentTarget.dataset.index;
            var item = this.data.lists[index];
            this.$emit('click-preview', __assign(__assign({}, item), this.getDetail(index)));
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-uploader {
    position: relative;
    display: inline-block;
}
.van-uploader__wrapper {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.van-uploader__slot:empty {
    display: none;
}
.van-uploader__slot:not(:empty) + .van-uploader__upload {
    display: none !important;
}
.van-uploader__upload {
    position: relative;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    margin: 0 8px 8px 0;
    background-color: #f7f8fa;
}
.van-uploader__upload:active {
    background-color: #f2f3f5;
}
.van-uploader__upload-icon {
    color: #dcdee0;
    font-size: 24px;
}
.van-uploader__upload-text {
    margin-top: 8px;
    color: #969799;
    font-size: 12px;
}
.van-uploader__upload--disabled {
    opacity: 0.5;
    opacity: var(--uploader-disabled-opacity, 0.5);
}
.van-uploader__preview {
    position: relative;
    margin: 0 8px 8px 0;
    cursor: pointer;
}
.van-uploader__preview-image {
    display: block;
    width: 80px;
    height: 80px;
    overflow: hidden;
}
.van-uploader__preview-delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 14px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0 0 0 12px;
}
.van-uploader__preview-delete-icon {
    position: absolute;
    top: -2px;
    right: -2px;
    color: #fff;
    font-size: 16px;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
}
.van-uploader__file {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background-color: #f7f8fa;
}
.van-uploader__file-icon {
    color: #646566;
    font-size: 20px;
}
.van-uploader__file-name {
    box-sizing: border-box;
    width: 100%;
    margin-top: 8px;
    padding: 0 4px;
    color: #646566;
    font-size: 12px;
    text-align: center;
}
.van-uploader__mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: #fff;
    background-color: rgba(50, 50, 51, 0.88);
}
.van-uploader__mask-icon {
    font-size: 22px;
}
.van-uploader__mask-message {
    margin-top: 6px;
    padding: 0 4px;
    font-size: 12px;
    line-height: 14px;
}
.van-uploader__loading {
    width: 22px;
    height: 22px;
    color: #fff !important;
}
</style>
