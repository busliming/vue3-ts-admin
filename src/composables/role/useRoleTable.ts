import { getRoleListApi } from "@/api/role";
import { IRoleRequestParams } from "@/api/role/roleModel";
import { getUserId } from "@/untils/auth";
import { nextTick, onMounted, reactive, ref } from "vue";

export default function useRoleTable() {
  const tableHeight = ref(0)
  const searchParams = reactive<IRoleRequestParams>({
    userId: getUserId() || '',
    currentPage: 1,
    pageSize: 10,
    name: '',
    total: 0
  })
  const tableData = reactive({
    list: [],
    loading: false
  })
  const getRoleList = async () => {
    try {
      tableData.loading = true;
      let res = await getRoleListApi(searchParams);
      if (res && res.code == 200) {
        tableData.list = res.data.records; 
        searchParams.total = res.data.total 
      }
    } catch (error) {
      console.error(error);
    } finally{
      tableData.loading = false;
    }
  }
  const sizeChange = (pageSize: number) => {
    searchParams.pageSize = pageSize;
    getRoleList();
  }
  const currentChange = (currentPage: number) => {
    searchParams.currentPage = currentPage;
    getRoleList();
  }
  onMounted(() => {
    getRoleList();
    nextTick(() => {
      tableHeight.value = window.innerHeight - 210
    })
  })
  return {
    searchParams,
    tableData,
    getRoleList,
    tableHeight,
    sizeChange,
    currentChange
  }
}