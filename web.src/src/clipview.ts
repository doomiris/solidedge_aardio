import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './clipview.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
const app = createApp(App)
app.use(ElementPlus)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#clipViewApp')