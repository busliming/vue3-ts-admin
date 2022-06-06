import { getPermissionTreeApi, postRoleSaveApi } from "@/api/role";
import { IRoleSaveParams } from "@/api/role/roleModel";
import { store } from "@/store";
import { DialogModel } from "@/types/BaseTypes";
import { ElMessage, ElTree } from "element-plus";
import { reactive, ref } from "vue";

export default function useAssign(dialog: DialogModel,onShow: () => void, onClose: () => void){
  const assignTreeRef = ref<InstanceType<typeof ElTree>>()
  const defaultProps = reactive({
    children: 'children',
    label: 'label',
  })
  const assignTreeData = reactive({
    data: [],
    assignTreeChecked: []
  })
  // 保存提交的参数
  const requestParams = reactive<IRoleSaveParams>({
    roleId: '',
    list: []
  })
  const confirm = async () => {
    let nodeChecked = assignTreeRef.value?.getCheckedKeys(false) || [];
    let halfChecked = assignTreeRef.value?.getHalfCheckedKeys() || [];
    requestParams.list = [...nodeChecked, ...halfChecked] as any;
    try {
      let res = await postRoleSaveApi(requestParams)
      if(res && res.code == 200){
        ElMessage.success(res.msg)
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
    
  }
  
  const roleShow = (row: any) => {
    requestParams.roleId = row.id
    // 清空数据
    assignTreeData.data = []
    assignTreeData.assignTreeChecked = []
    dialog.title = `为【${row.name}】分配权限`
    dialog.width = 300
    dialog.height = 420
    onShow();
    getAssignTreeData(row)
  }

  const getAssignTreeData = async (row: any) => {
    console.log(store,'store')
    try {
      let params = {
        userId: store.getters['user/getUserId'],
        roleId: row.id
      }
      let res = await getPermissionTreeApi(params);
      if(res && res.code == 200){
        assignTreeData.data = res.data.listmenu
        assignTreeData.assignTreeChecked = res.data.checkList
        if(assignTreeData.assignTreeChecked.length > 0){
          let newArr: never[] = []
          assignTreeData.assignTreeChecked.forEach(id => {
            handleNeedData(id,assignTreeData.data,newArr)
          })
          assignTreeData.assignTreeChecked = newArr
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleNeedData = (id: string | number, data: any[], newArr: any[]) => {
    data.forEach((item:any) => {
      if(item.id == id){
        if(item.children && item.children.length == 0){
          newArr.push(item.id)
        }
      }else{
        if(item.children && item.children.length != 0){
          handleNeedData(id, item.children,newArr)
        }
      }
      
    });
  }
  return {
    roleShow,
    defaultProps,
    assignTreeData,
    getAssignTreeData,
    confirm,
    assignTreeRef
  }
}
