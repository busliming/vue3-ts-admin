import { getMenuListApi } from "@/api/menu";
import { nextTick, onMounted, reactive, ref } from "vue";

export default function useMenuTable(){
  const tableData = reactive({
    list: [],
    loading: false
  })
  const tableHeight = ref(0)
  const getMenuList =  async () => {
    try {
      tableData.loading = true
      let res = await getMenuListApi();
      if(res && res.code == 200){
        tableData.list = res.data
      }
    } catch (error) {
      console.error(error)
    } finally {
      tableData.loading = false
    }
  }
  onMounted(() => {
    getMenuList();
    nextTick(() => {
      tableHeight.value = window.innerHeight - 200
    })
  })
  return{
    tableData,
    getMenuList,
    tableHeight
  }
}