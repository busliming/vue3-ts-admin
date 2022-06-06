import { assignRoleApi, getRoleByUserIdApi, getRoleListForAssignApi } from "@/api/user";
import { IAssignRoleParams } from "@/api/user/userModel";
import { DialogModel } from "@/types/BaseTypes";
import { getUserId } from "@/untils/auth";
import { ElMessage } from "element-plus";
import { nextTick, onMounted, reactive, ref } from "vue";

export default function useAssignRole(dialog: DialogModel, onShow: () => void, onClose: () => void) {
  const roleList = reactive({
    list: [],
    loading: false
  })
  const params = reactive<IAssignRoleParams>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    userId: getUserId() || ''
  })
  const tableHeight = ref(0)
  const selectedRoleId = ref('')
  const selectedUserId = ref('')

  // 确定按钮
  const confirm = async () => {
    let params = {
      userId: selectedUserId.value,
      roleId: selectedRoleId.value
    }
    try {
      let res = await assignRoleApi(params)
      if(res && res.code == 200){
        ElMessage.success(res.msg)
        onClose();
      }
    } catch (error) {
      console.error(error)
    }
    
  }
  // 是否显示角色弹窗
  const showRole = (row: any) => {
    console.log(row, 'showRole')
    selectedUserId.value = row.id
    dialog.title = `为【${row.loginName}】分配角色`;
    dialog.height = 300;
    getRoleIdByUserId()
    getRoleList();
    onShow();
  }
  // 根据选择的用户名称查询所拥有的角色
  const getRoleIdByUserId = async () => {
    try {
      let res = await getRoleByUserIdApi(selectedUserId.value)
      if(res && res.code == 200){
        selectedRoleId.value = res.data.roleId
      }
    } catch (error) {
      console.error(error)
    }
  }
  // 获取角色列表
  const getRoleList = async () => {
    try {
      let res = await getRoleListForAssignApi(params)
      if (res && res.code == 200) {
        roleList.list = res.data.records
        params.total = res.data.total
      }
    } catch (error) {
      console.error(error)
    }
  }
  // 当前页码容量改变
  const sizeChange = (pageSize: number) => {
    params.pageSize = pageSize
    getRoleList()
  }
  // 当前页数改变
  const currentChange = (currentPage: number) => {
    params.currentPage = currentPage
    getRoleList()
  }
  // 选中角色
  const handleSelected = (row:any) => {
    selectedRoleId.value = row.id
  }
  onMounted(() => {
    nextTick(() => {
      tableHeight.value = window.innerHeight - 675
    })
  })
  return {
    confirm,
    showRole,
    roleList,
    params,
    tableHeight,
    sizeChange,
    currentChange,
    selectedRoleId,
    handleSelected
  }
}