<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <!-- 2222 -->
    <template #content>
      <!-- 组件提供的默认模板 -->
      <!-- <el-tree
        default-expand-all
        highlight-current
        :data="treeData.data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
      />-->
      <el-tree
        default-expand-all
        highlight-current
        :data="treeData.data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        ref="parentTreeRef"
        node-key="id"
        style="font-size: 14px;"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <!-- {{data}} -->
            <!-- 长度为0说明没有下级 -->
            <span v-if="data.children.length === 0">
              <DocumentRemove style="width: 1.2em;height: 1.2em; margin-right: 5px;color:#8c8c8c ; vertical-align: middle;"></DocumentRemove>
            </span>
            <span v-else @click.stop="openBtn(data)">
              <Component
                style="width: 1.1em;height: 1.1em; margin-right: 5px;color:#8c8c8c ;"
                :is="data.open ? Plus : Minus"
              ></Component>
            </span>
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import useDialog from '@/hooks/useDialog';
import useParent from '@/composables/dept/useParent';
import SysDialog from '@/components/SysDialog.vue';
import { DocumentRemove, Plus, Minus } from '@element-plus/icons'
const { dialog, onClose, onShow } = useDialog()
const emit = defineEmits(['select'])
//树形弹窗确认按钮
const confirm = () => {
  emit('select', selected)  //传值给父组件将选中的上级部门
  onClose();
}
// 数形弹窗是否显示 由其父组件调用
const parentShow = () => {
  dialog.title = "选择上级部门"
  dialog.width = 300
  dialog.height = 360
  onShow()
  getParentList();
}
defineExpose({ parentShow })

// 数的相关属性和方法
const { treeData, defaultProps, handleNodeClick, getParentList, selected,parentTreeRef,openBtn } = useParent()
</script>
<style lang='scss'>
.el-tree {
  // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }
  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 15px;
  }
  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }
  .el-tree > .el-tree-node:before {
    border-left: none;
  }
  .el-tree > .el-tree-node:after {
    border-top: none;
  }
  //这自定义的线 的公共部分
  .el-tree-node:before,
  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
  .tree :first-child .el-tree-node:before {
    border-left: none;
  }
  // 竖线
  .el-tree-node:before {
    border-left: 1px dotted #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }
  //横线
  .el-tree-node:after {
    border-top: 1px dotted #d9d9d9;
    height: 20px;
    top: 14px;
    // width: 24px;
  }
  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }
  //去掉elementui自带的展开按钮 一个向下的按钮,打开时向右
  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }
  //每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
    padding-left: 10px !important;
  }
}
//去掉最上级的before after 即是去电最上层的连接线
.el-tree > div {
  &::before {
    display: none;
  }
  &::after {
    display: none;
  }
}
</style>