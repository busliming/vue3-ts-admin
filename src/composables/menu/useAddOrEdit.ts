import { ISelectedNode } from "@/api/dept/deptModel"
import { IAddMenuModel } from "@/api/menu/menuModel"
import useInstance from "@/hooks/useInstance"
import { EditType } from "@/types/BaseEnum"
import { DialogModel } from "@/types/BaseTypes"
import { ElForm } from "element-plus"
import { reactive, ref } from "vue"

export default function useAddOrEdit(dialog: DialogModel, onShow: () => void, onClose: () => void, emit: any) {
  const { global } = useInstance()
  const addMenuFormRef = ref<InstanceType<typeof ElForm>>()
  const parentRef = ref<{ parentShow: () => void }>()
  const addFormModel = reactive<IAddMenuModel>({
    id: '',
    editType: '',
    type: '',
    parentId: '',
    parentName: '',
    label: '',
    icon: '',
    name: '',
    path: '',
    url: '',
    code: '',
    orderNum: ''
  })
  const rules = reactive({
    type: [{
      trigger: 'blur',
      required: true,
      message: '请选择菜单类型'
    }],
    parentName: [{
      trigger: 'change',
      required: true,
      message: '请选择上级部门'
    }],
    label: [{
      trigger: 'blur',
      required: true,
      message: '请输入菜单名称'
    }],
    icon: [{
      trigger: 'blur',
      required: true,
      message: '请输入菜单图标'
    }],
    name: [{
      trigger: 'blur',
      required: true,
      message: '请输入路由名称'
    }],
    path: [{
      trigger: 'blur',
      required: true,
      message: '请输入路由地址'
    }],
    url: [{
      trigger: 'blur',
      required: true,
      message: '请输入组件路径'
    }],
    code: [{
      trigger: 'blur',
      required: true,
      message: '请输入权限字段'
    }]
  })
  const confirm = () => {
    // console.log('confirm', addFormModel, addMenuFormRef.value)
    addMenuFormRef.value?.validate(valid => {
      if (valid) {
        console.log(addFormModel, 'confirm')
        emit('saveBtn', addFormModel)
        onClose()
      }
    })

  }
  const show = (type: string, row?: any) => {
    dialog.title = type == EditType.ADD ? '新增权限' : '编辑权限'
    dialog.height = 250
    onShow()
    global.$resetForm(addMenuFormRef.value,addFormModel)
    if(type == EditType.EDIT){
      global.$objCopy(row,addFormModel)
    }
    addFormModel.editType = type;
  }
  const handleClickShow = () => {
    parentRef.value?.parentShow();
  }

  const select = (selected: ISelectedNode) => {
    addFormModel.parentName = selected.name
    addFormModel.parentId = selected.id
  }
  return {
    confirm,
    show,
    handleClickShow,
    select,
    addFormModel,
    addMenuFormRef,
    parentRef,
    rules,
  }
}