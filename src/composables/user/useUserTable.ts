import { deleteUserApi, getUserListApi } from "@/api/user";
import { IAddUserModel, IUserList } from "@/api/user/userModel";
import { EditType } from "@/types/BaseEnum";
import { nextTick, onMounted, reactive, ref } from "vue";
import useInstance from "@/hooks/useInstance";
import { ElMessage } from "element-plus";

export default function useUserTable() {
  const { global } = useInstance();
  const tableHeight = ref(0)
  const containerHeight = ref(0);
  const addUserRef = ref<{ show: (type: string, row?: IAddUserModel) => void }>();
  const assignRoleRef = ref<{ showRole: (row?: IAddUserModel) => void }>();
  // 查询参数
  const searchParams = reactive<IUserList>({
    deptId: 1,
    currentPage: 1,
    pageSize: 10,
    loginName: '',
    total: 0
  })
  // 表格相关数据
  const tableData = reactive({
    data: [],
    loading: false
  })
  const getUserList = async () => {
    try {
      tableData.loading = true;
      let res = await getUserListApi(searchParams);
      console.log('表格数据加载完成了')
      console.log(res, 'getUserList')
      if (res && res.code == 200) {
        tableData.data = res.data.records
        searchParams.total = res.data.total
      } else {
        tableData.data = []
      }
    } catch (error) {
      console.error(error)
    } finally {
      tableData.loading = false;
    }
  }
  const searchBtn = () => {
    getUserList();
  }
  const addBtn = () => {
    addUserRef.value?.show(EditType.ADD);
  }
  const saveBtn = () => {
    getUserList();
  }
  const deleteBtn = async (id: string) => {
    let confirm = await global.$myConfirm('确认删除该用户吗？')
    if (confirm) {
      try {
        let res = await deleteUserApi(id)
        if (res && res.code == 200) {
          ElMessage.success(res.msg)
          getUserList();
        }else{
          ElMessage.error(res.msg || res.data)
        }
      } catch (error) {
        console.error(error)
      }
    }else{
      ElMessage.warning('取消了删除操作！')
    }

  }
  const editBtn = (row: IAddUserModel) => {
    addUserRef.value?.show(EditType.EDIT, row)
  }
  const resetBtn = () => {
    searchParams.loginName = ''
  }
  const roleBtn = (row: IAddUserModel) => {
    console.log(row,'roleBtn')
    assignRoleRef.value?.showRole(row)
  }
  const treeClick = async (id: number) => {
    searchParams.deptId = id
    getUserList();
  }
  const sizeChange = (pageSize: number) => {
    searchParams.pageSize = pageSize
    getUserList()
  }
  const currentChange = (currentPage: number) => {
    searchParams.currentPage = currentPage
    getUserList()
  }
  // watch(() => searchParams.deptId, () => getUserList(), { immediate: true, deep: true })
  onMounted(() => {
    // getUserList();
    containerHeight.value = window.innerHeight - 107
    nextTick(() => {
      tableHeight.value = window.innerHeight - 203;
    })
  })
  return {
    searchParams,
    tableData,
    tableHeight,
    containerHeight,
    searchBtn,
    addBtn,
    treeClick,
    resetBtn,
    addUserRef,
    assignRoleRef,
    saveBtn,
    editBtn,
    deleteBtn,
    roleBtn,
    sizeChange,
    currentChange
  }
}