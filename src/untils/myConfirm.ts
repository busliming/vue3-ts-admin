import { ElMessageBox } from "element-plus";
export default async function myConfirm(text: string,title: string) {
  try {
    return await new Promise((resolve, reject) => {
      ElMessageBox.confirm(
        text,
        title="系统提示：",
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  } catch {
    return false;
  }
}