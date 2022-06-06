import { onMounted, ref } from "vue";
import { getImageApi } from "@/api/user";

export default function userImage(){
  const imageSrc = ref('')
  const getImageSrc = async () => {
    return await getImageApi().then(res => {
      console.log('111111111',res.data)
      let data = 'data:image/png;base64,' + btoa(new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      console.log('222',data)
      return data
    }).then(data => {
      console.log(data)
      imageSrc.value = data
    })
   
  }
  onMounted(() => {
    // console.log('33333')
    getImageSrc()
  })
  return {
    imageSrc,
    getImageSrc
  }
}