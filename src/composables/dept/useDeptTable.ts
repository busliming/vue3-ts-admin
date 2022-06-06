import { deptListApi } from "@/api/dept";
import { ISearchParams, ITableData } from "@/api/dept/deptModel";
import { nextTick, onMounted, reactive, ref } from "vue";

export default function useDeptTale() {
  const tableHeight = ref(0)
  const loading = ref(false)
  const tableData = reactive<ITableData>({
    list: []
  })
  const searchParams = reactive<ISearchParams>({
    searchName: ''
  })
  const getDeptList = async () => {
    loading.value = true;
    try {
      let res = await deptListApi(searchParams);
      if (res && res.code == 200) {
        tableData.list = res.data
      }
    } catch (error) {
      console.error(error)
    } finally{
      loading.value = false;
    }
  }
  onMounted(() => {
    getDeptList()
    nextTick(() => {
      tableHeight.value = window.innerHeight - 200
    })
  })
  return {
    loading,
    searchParams,
    tableData,
    tableHeight,
    getDeptList
  }
}