export default function resetForm(formEle:any,obj: any){
  // 清除当前对象数据
  Object.keys(obj).forEach(key => {
    obj[key] = ''
  })
  // 清除表单数据和验证
  if(formEle){
    formEle.resetFields();
    formEle.clearValidate();
  }
}