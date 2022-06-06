import { parentApi } from "@/api/dept";
import { IDeptModel, ISelectedNode } from "@/api/dept/deptModel";
import { ElTree } from "element-plus";
import { reactive,ref } from "vue";

export default function useParent() {
  const parentTreeRef = ref<InstanceType<typeof ElTree>>()
  // 树形数据
  const treeData = reactive({
    data: []
  })
  // 树形需要的参数
  const defaultProps = reactive({
    children: 'children',
    label: 'name',
  })
  // 选中的数据
  const selected = reactive<ISelectedNode>({
    name: '',
    id: ''
  })
  // 拉取树形数据
  const getParentList = async () => {
    try {
      let res = await parentApi();
      console.log(res.code, res.data, 'getParentList')
      if (res.code == 200) {
        treeData.data = res.data
      }
    } catch (error) {
      console.error(error)
    }
  }
  // 选中部门
  const handleNodeClick = (data: IDeptModel) => {
    console.log(data)
    selected.name = data.name
    selected.id = data.id
  }
  //是否折叠
  const openBtn = (data: IDeptModel) => {
    data.open = !data.open
    if (parentTreeRef.value) {
      parentTreeRef.value.store.nodesMap[data.id].expanded = !data.open;
    }
  }
  return {
    treeData,
    parentTreeRef,
    defaultProps,
    handleNodeClick,
    getParentList,
    selected,
    openBtn
  }
}