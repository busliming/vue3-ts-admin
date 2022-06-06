import { deleteRoleApi } from "@/api/role";
import { IRoleRequestParams } from "@/api/role/roleModel"
import useInstance from "@/hooks/useInstance";
import { EditType } from "@/types/BaseEnum";
import { ElMessage } from "element-plus";
import { ref } from "vue";

export default function useTable(searchParams: IRoleRequestParams, getRoleList: any) {
  const addRoleRef = ref<{show: (type: string,row?: any) => void}>()
  const assignRef = ref<{roleShow: (row: any) => void}>()
  const { global } = useInstance()
  const addBtn = () => {
    addRoleRef.value?.show(EditType.ADD);
  }
  const searchBtn = () => {
    getRoleList();
  }
  const saveBtn = () => {
    getRoleList();
  }
  const editBtn = (row: any) => {
    addRoleRef.value?.show(EditType.EDIT,row);
  }
  const deleteBtn = async (id: number) => {
      // console.log(global.$myConfirm('确认删除该角色名称吗?'))
      let confirm = await global.$myConfirm('确认删除该角色名称吗?')
      // console.log(res)
      if(confirm){
        let res = await deleteRoleApi(String(id))
        if(res && res.code == 200){
          ElMessage.success(res.msg)
          getRoleList();
        }
      }
  }
  const roleBtn = (row: any) => {
    console.log('assignRef')
    assignRef.value?.roleShow(row);
  }
  const resetBtn =() => {
    searchParams.name = ''
    getRoleList();
  }
  
  return {
    addBtn,
    searchBtn,
    saveBtn,
    editBtn,
    roleBtn,
    resetBtn,
    deleteBtn,
    addRoleRef,
    assignRef
  }
}