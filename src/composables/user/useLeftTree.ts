import { getLeftTreeApi } from "@/api/user";
import { IDeptModel } from "@/api/dept/deptModel";
import { ElTree } from "element-plus";
import { nextTick, onMounted, reactive, ref } from "vue";
import { useStore } from "@/store";

export default function useLeftTree(emit) {
  const store = useStore()
  const leftTreeRef = ref<InstanceType<typeof ElTree>>()
  const treeData = reactive({
    data: []
  })
  // 树形需要的参数
  const defaultProps = reactive({
    children: 'children',
    label: 'name'
  })
  // 获取树形数据
  const getTreeDataList = async () => {
    try {
      let res = await getLeftTreeApi();
      if (res && res.code == 200) {
        treeData.data = res.data;
        nextTick(() => {
          const treeNode = document.querySelector('.el-tree-node') as any
          if (treeNode) {
            treeNode.click();
          }
        })
      } else {
        treeData.data = []
      }
    } catch (error) {
      console.error(error)
    }
  }
  // 点击选中的部门
  const handleNodeClick = (data: IDeptModel) => {
    console.log(data, 'handleNodeClick')
    emit('treeClick',data.id)
    // store.commit('user/setDeptId', data.id)
  }
  // +/- 展开折叠树形结构
  const openBtn = (data: IDeptModel) => {
    // console.log(data, 'openBtn')
    data.open = !data.open
    if (leftTreeRef.value) {
      leftTreeRef.value.store.nodesMap[data.id].expanded = !data.open
    }
  }
  onMounted(() => {
    getTreeDataList();
  })
  return {
    treeData,
    defaultProps,
    handleNodeClick,
    leftTreeRef,
    openBtn
  }
}