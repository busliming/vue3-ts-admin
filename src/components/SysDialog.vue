<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width + 'px'"
    :before-close="onClose"
    append-to-body
  >
    <div class="container" :style="{ height: height + 'px' }">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="onClose">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  width: {
    type: Number,
    default: 600
  },
  height: {
    type: Number,
    default: 250
  },
  visible: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['onClose', 'onConfirm'])
const onClose = () => {
  emit('onClose')
}
const onConfirm = () => {
  emit('onConfirm')
}
</script>
<style lang='scss' scope >
.container {
  overflow-x: initial;
  overflow-y: auto;
}
.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
  .el-dialog__header {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #1890ff !important;
    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 10px;
  }
  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>