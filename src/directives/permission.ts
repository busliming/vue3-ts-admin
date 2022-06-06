import { store } from '@/store';
import { Directive } from 'vue'

export const permission: Directive = {
  mounted(el, binding) {
    let { value } = binding;
    const roles = store.getters['user/getRoles'];
    console.log(roles,'roles')
    if(value && value instanceof Array && value.length > 0){
      let perRoles = value;
      console.log(perRoles,'111')
      let hasPermission = roles.some(role => perRoles.includes(role));
      console.log(hasPermission,'hasPermission')
      if(!hasPermission){
        el.style.display = 'none'
      }else{
        // el.style.display = 'block'
        // throw new Error('need role！ Like v-permission = "[\'add\',\'edit\']"')
      }
    }

  }
}