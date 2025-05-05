import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import i18n from '@/i18n/index'
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(i18n)
app.mount('#app')

