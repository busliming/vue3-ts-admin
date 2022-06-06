import { createApp, createVNode } from 'vue'
import App from './App.vue'
import routes from './router'
import { store, key } from './store/index'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 统一导入el-icon图标
import * as Icons from '@element-plus/icons'
import router from './router'
import { clearSession, getToken } from './untils/auth'
// import * as Icons from '@element-plus/icons-vue'
import myConfirm from '@/untils/myConfirm';
import resetForm from '@/untils/resetForm';
import objCopy from '@/untils/objCopy';

//引入自定义指令
import { permission } from '@/directives/permission'

// 全局挂载echarts
import * as echarts from 'echarts'

const app = createApp(App)
app.use(routes).use(store, key).use(ElementPlus, { locale: zhCn }).mount('#app')
app.directive('permission', permission) // 注册全局指令
app.config.globalProperties.$myConfirm = myConfirm;
app.config.globalProperties.$resetForm = resetForm;
app.config.globalProperties.$objCopy = objCopy;

app.config.globalProperties.$echarts = echarts

//方式一
// Object.keys(Icons).forEach(key => {
//   app.component(key, Icons[key as keyof typeof Icons])
// })

// 方式二
const Icon = (props: { icon: string }) => {
  const { icon } = props; return createVNode(Icons[icon as keyof typeof Icons]);
};
app.component('Icon', Icon);


console.log(Icons, 'icons')

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  let token = getToken();
  if (token) {
    if (to.path == '/login' || to.path == '/') {
      next('/')
    } else {
      //是否有无权限
      let hasRoles = store.state.user.permissions && store.state.user.permissions.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfoAction')
          await store.dispatch('menu/menuListAction', router)
          // 确保动态添加的路由已经被完全加载上去
          next({ ...to, replace: true })
        } catch (error) {
          // 清除session
          clearSession();
          // 跳转到首页
          next('/login')
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})