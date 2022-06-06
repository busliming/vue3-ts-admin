import { addDeptApi, deleteDeptApi, editDeptApi } from "@/api/dept"
import { IAddDeptModel } from "@/api/dept/deptModel"
import useInstance from "@/hooks/useInstance"
import { IResult } from "@/http/request"
import { EditType } from "@/types/BaseEnum"
import { ElMessage } from "element-plus"
import { ref } from "vue"

/**
 * 表格的增删改查
 */
export default function useDept(getDeptList: () => void) {
  const addDeptRef = ref<{ show: (type: string,  row?: IAddDeptModel) => void }>()
  const { global } = useInstance();
  // const addDeptRef = ref()
  //搜索
  const searchBtn = () => {
    getDeptList();
  }
  // 增加
  const addBtn = () => {
    console.log(EditType.ADD, 'addBtn1')
    console.log(addDeptRef.value)
    addDeptRef.value?.show(EditType.ADD);
  }
  // 编辑
  const editBtn = (row: IAddDeptModel) => {
    addDeptRef.value?.show(EditType.EDIT, row)
  }
  // 删除
  const deleteBtn = async (id: string) => {
    console.log(id,'id')
    let confirm = await global.$myConfirm('确定删除该数据吗？', '系统提示：')
    if (confirm) {
      let res = await deleteDeptApi(id);
      if(res && res.code == 200){
        getDeptList();
        ElMessage.success('删除成功！')
      }else{
        ElMessage.error('删除失败！')
      }
      
    } else {
      ElMessage.warning('取消删除操作！')
    }
    // console.log(global)
    // console.log(proxy)
  }
  // 保存
  const saveBtn = async (model: IAddDeptModel) => {
    // console.log(model, 'model')
    let res: IResult<any>;
    if (model.type == EditType.ADD) {
      res = await addDeptApi(model);
    } else {
      console.log(model, 'model')
      res = await editDeptApi(model)
    }
    if (res && res.code == 200) {
      ElMessage.success(model.type == EditType.ADD ? '新增成功！' : '编辑成功！')
      getDeptList();
    }
  }
  return {
    addBtn,
    editBtn,
    deleteBtn,
    saveBtn,
    addDeptRef,
    searchBtn
  }
}

