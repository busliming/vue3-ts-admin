import { DialogModel } from "@/types/BaseTypes";
import { reactive } from "vue";

export default function useDialog(){
  const dialog = reactive<DialogModel>({
    title: '新增部门',
    width: 630,
    height: 230,
    visible: false
  })
  //显示弹窗
  const onShow = () => {
    dialog.visible = true;
  }
  // 关闭弹窗
  const onClose = () => {
    dialog.visible = false;
  }
  // 确认弹窗
  const onConfirm = () => {
    dialog.visible = false
  }
  return {
    dialog,
    onShow,
    onClose,
    onConfirm
  }
}