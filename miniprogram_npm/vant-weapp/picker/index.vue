<template>
    <view class="van-picker custom-class">
        <view v-if="showToolbar" class="van-picker__toolbar van-hairline--top-bottom toolbar-class">
            <view class="van-picker__cancel" hover-class="van-picker__cancel--hover" hover-stay-time="70" data-type="cancel" @tap="emit">
                {{ cancelButtonText }}
            </view>
            <view v-if="title" class="van-picker__title van-ellipsis">{{ title }}</view>
            <view class="van-picker__confirm" hover-class="van-picker__confirm--hover" hover-stay-time="70" data-type="confirm" @tap="emit">
                {{ confirmButtonText }}
            </view>
        </view>
        <view v-if="loading" class="van-picker__loading">
            <loading color="#1989fa" />
        </view>
        <view class="van-picker__columns" :style="'height: ' + itemHeight * visibleItemCount + 'px'" @touchmove.stop.prevent="noop">
            <picker-column
                class="van-picker__column"
                :data-index="index"
                custom-class="column-class"
                :value-key="valueKey"
                :initial-options="isSimple(columns) ? item : item.values"
                :default-index="item.defaultIndex || defaultIndex"
                :item-height="itemHeight"
                :visible-item-count="visibleItemCount"
                active-class="active-class"
                @change="onChange($event, { index })"
                v-for="(item, index) in isSimple(columns) ? [columns] : columns"
                :key="index"
            ></picker-column>
            <view class="van-picker__frame van-hairline--top-bottom" :style="'height: ' + itemHeight + 'px'" />
        </view>
    </view>

    <script module="isSimple" lang="wxs">
        function isSimple(columns) {
          return columns.length && !columns[0].values;
        }
        module.exports = isSimple;
    </script>
</template>

<script>
import pickerColumn from '../picker-column/index';
import loading from '../loading/index';
import { VantComponent } from '../common/component';
import { pickerProps } from './shared';
export default {
    data() {
        return {
            showToolbar: '',
            cancelButtonText: '',
            title: '',
            confirmButtonText: '',
            loading: '',
            visibleItemCount: 0,
            valueKey: '',
            defaultIndex: '',
            columns: ''
        };
    },
    components: {
        pickerColumn,
        loading
    },
    classes: ['active-class', 'toolbar-class', 'column-class'],
    props: Object.assign({}, pickerProps, {
        valueKey: {
            type: String,
            value: 'text'
        },
        defaultIndex: {
            type: Number,
            value: 0
        },
        columns: {
            type: Array,
            value: [],

            observer(columns = []) {
                this.simple = columns.length && !columns[0].values;
                this.children = this.selectAllComponents('.van-picker__column');

                if (Array.isArray(this.children) && this.children.length) {
                    this.setColumns().catch(() => {});
                }
            }
        }
    }),
    beforeCreate() {
        this.children = [];
    },
    methods: {
        noop() {},

        setColumns() {
            const { data } = this;
            const columns = this.simple
                ? [
                      {
                          values: data.columns
                      }
                  ]
                : data.columns;
            const stack = columns.map((column, index) => this.setColumnValues(index, column.values));
            return Promise.all(stack);
        },

        emit(event) {
            const { type } = event.currentTarget.dataset;

            if (this.simple) {
                this.$emit(type, {
                    value: this.getColumnValue(0),
                    index: this.getColumnIndex(0)
                });
            } else {
                this.$emit(type, {
                    value: this.getValues(),
                    index: this.getIndexes()
                });
            }
        },

        onChange(event, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(event, _dataset);
            /* ---??????dataset end--- */
            if (this.simple) {
                this.$emit('change', {
                    picker: this,
                    value: this.getColumnValue(0),
                    index: this.getColumnIndex(0)
                });
            } else {
                this.$emit('change', {
                    picker: this,
                    value: this.getValues(),
                    index: event.currentTarget.dataset.index
                });
            }
        },

        // get column instance by index
        getColumn(index) {
            return this.children[index];
        },

        // get column value by index
        getColumnValue(index) {
            const column = this.getColumn(index);
            return column && column.getValue();
        },

        // set column value by index
        setColumnValue(index, value) {
            const column = this.getColumn(index);

            if (column == null) {
                return Promise.reject(new Error('setColumnValue: ??????????????????'));
            }

            return column.setValue(value);
        },

        // get column option index by column index
        getColumnIndex(columnIndex) {
            return (this.getColumn(columnIndex) || {}).data.currentIndex;
        },

        // set column option index by column index
        setColumnIndex(columnIndex, optionIndex) {
            const column = this.getColumn(columnIndex);

            if (column == null) {
                return Promise.reject(new Error('setColumnIndex: ??????????????????'));
            }

            return column.setIndex(optionIndex);
        },

        // get options of column by index
        getColumnValues(index) {
            return (this.children[index] || {}).data.options;
        },

        // set options of column by index
        setColumnValues(index, options, needReset = true) {
            const column = this.children[index];

            if (column == null) {
                return Promise.reject(new Error('setColumnValues: ??????????????????'));
            }

            const isSame = JSON.stringify(column.data.options) === JSON.stringify(options);

            if (isSame) {
                return Promise.resolve();
            }

            return column
                .set({
                    options
                })
                .then(() => {
                    if (needReset) {
                        column.setIndex(0);
                    }
                });
        },

        // get values of all columns
        getValues() {
            return this.children.map((child) => child.getValue());
        },

        // set values of all columns
        setValues(values) {
            const stack = values.map((value, index) => this.setColumnValue(index, value));
            return Promise.all(stack);
        },

        // get indexes of all columns
        getIndexes() {
            return this.children.map((child) => child.data.currentIndex);
        },

        // set indexes of all columns
        setIndexes(indexes) {
            const stack = indexes.map((optionIndex, columnIndex) => this.setColumnIndex(columnIndex, optionIndex));
            return Promise.all(stack);
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-picker {
    position: relative;
    overflow: hidden;
    -webkit-text-size-adjust: 100%;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
}
.van-picker__toolbar {
    display: -webkit-flex;
    display: flex;
    height: 44px;
    line-height: 44px;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.van-picker__cancel,
.van-picker__confirm {
    padding: 0 15px;
    font-size: 14px;
    color: #1989fa;
}
.van-picker__cancel--hover,
.van-picker__confirm--hover {
    background-color: #f2f3f5;
}
.van-picker__title {
    max-width: 50%;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
}
.van-picker__columns {
    position: relative;
    display: -webkit-flex;
    display: flex;
}
.van-picker__column {
    -webkit-flex: 1 1;
    flex: 1 1;
    width: 0;
}
.van-picker__loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    display: -webkit-flex;
    display: flex;
    background-color: hsla(0, 0%, 100%, 0.9);
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}
.van-picker__frame,
.van-picker__loading .van-loading {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    width: 100%;
    pointer-events: none;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>
