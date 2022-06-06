import { addMenuApi, deleteMenuApi, editMenuApi } from "@/api/menu"
import { IAddMenuModel } from "@/api/menu/menuModel"
import useInstance from "@/hooks/useInstance"
import { EditType } from "@/types/BaseEnum"
import { ElMessage } from "element-plus"
import { ref } from "vue"

export default function useAction(getMenuList: () => void) {
  const { global } = useInstance()
  const addOrEditRef = ref<{ show: (type: string, row?: any) => void }>()
  const addBtn = () => {
    addOrEditRef.value?.show(EditType.ADD)
  }
  const editBtn = (row: any) => {
    addOrEditRef.value?.show(EditType.EDIT, row)
  }
  const deleteBtn = async (id: number) => {
    try {

      let confirm = await global.$myConfirm('确定删除该权限吗？')
      if (confirm) {
        let res = await deleteMenuApi(id)
        if (res && res.code == 200) {
          ElMessage.success(res.msg)
          getMenuList();
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const saveBtn = async (addFormModel: IAddMenuModel) => {
    // console.log(addFormModel,'saveBtn')
    try {
      let res;
      if (addFormModel.editType == EditType.ADD) {
        res = await addMenuApi(addFormModel)
      } else {
        res = await editMenuApi(addFormModel)
      }
      if (res && res.code == 200) {
        ElMessage.success(res.msg);
        getMenuList();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return {
    addBtn,
    editBtn,
    deleteBtn,
    saveBtn,
    addOrEditRef
  }
}