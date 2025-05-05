<template>
<el-config-provider :locale="locale">
  <el-container class="layout-container-demo">
    <el-header height="60px">
      <el-row>
        <el-col :span="4" style="text-align:start;">  
          <el-space >        
          <el-text class="mx-1 alignment-container" size="large">
            <el-icon size="32"><OfficeBuilding /></el-icon>
            Carrier Future
          </el-text>
          </el-space>
        </el-col>
        <el-col :span="20" justify="end">
            <el-row justify="end">
              <el-button>{{ $t("home.name") }}</el-button>
              <el-button @click="toggleDark()">{{ $t( isDark ? "home.dark" : "home.light")  }}</el-button>
              <el-button @click="toggle()">{{language}}</el-button>
            </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>      
        <el-aside width="200px">
            <div class="demo-collapse">
              <el-collapse v-model="workingSC" accordion @change="handleChange">
                <el-collapse-item
                  v-for = "(item,index) in SCS2"
                  :title="item['name']"
                  :name="item['name']"
                  class="mymenu"
                >
                <el-form-item>
                  <el-input v-model="item['et']">
                    <template #prepend>{{ $t("cols.evapTemp") }}</template>
                    <template #append>°c</template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="item['dt']">
                    <template #prepend>{{ $t("cols.dt") }}</template>
                    <template #append>°c</template>
                  </el-input>
                </el-form-item>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div class="flex flex-col items-start gap-4">
              {{ $t("cols.finSpacing")}}<el-segmented v-model="workingSCa" :options="finsapce" size="default"/>
            </div>
            <div class="flex flex-col items-start gap-4">
              {{ $t("cols.material")}}<el-segmented v-model="workingSCb" :options="material" size="default"/>
            </div>
            <div class="flex flex-col items-start gap-4">
              {{ $t("cols.supplyMethod")}}<el-segmented v-model="workingSCc" :options="供液方式" size="default"/>
            </div>
            <div class="flex flex-col items-start gap-4">
              {{ $t("cols.fanDiameter")}}<el-segmented v-model="workingSCd" :options="风机直径" size="default"/>
            </div>
            <div class="">
              {{ $t("cols.fanQty")}}<el-segmented v-model="workingSCe" :options="风扇数量" size="default"/>
            </div>
            <el-form-item style="align-items: center">
                  <el-input v-model="capacityRange[0]" readonly="true" style="width: 50px"></el-input> - 
                  <el-input v-model="capacityRange[1]" readonly="true" style="width: 50px"></el-input>
            </el-form-item>
            <div class="slider-demo-block">
              <el-slider v-model="capacityRange" range :marks="marks" />
            </div>
        </el-aside>
        <el-main>
              <el-scrollbar> 
            <el-table max-height="93vh" :data="mdata">
              <el-backtop :right="100" :bottom="100"/>
              <el-table-column
                v-for="(item, index)  in fields "
                :key="index"
                :prop="item['字段']"
                :label= "language == 'zh-cn' ? item['field_cn'] : item['field']"
                :width="item['width']"
                :fixed = "item['字段'] == '型号'"
                :sortable = "item['sortable']"
              />
            </el-table>
          </el-scrollbar>
         </el-main>
    </el-container>
  </el-container>
</el-config-provider>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

import { computed, getCurrentInstance, ref, watch, nextTick, reactive} from 'vue'
import { OfficeBuilding } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { ElConfigProvider } from 'element-plus'
// 导入 Element Plus 语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import type { CSSProperties } from 'vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { proxy } = getCurrentInstance() as any
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
  proxy.$i18n.locale = language.value
  //webviewlang = language.value;
}
const workingSC = ref("")
const workingSCa = ref("")
const workingSCb = ref("")
const workingSCc = ref("")
const workingSCd = ref("")
const workingSCe = ref("")
const fields = ref([])
const mdata = ref([])
const SCS = ['SC1', 'SC2', 'SC3', 'SC4']
const SCS2 = [
  { name:'SC1', et:0,    dt:0  },
  { name:'SC2', et:-8,   dt:8  },
  { name:'SC3', et:-25,  dt:7  },
  { name:'SC4', et:-31,  dt:6  }
]
const finsapce = ['4.23', '6.35', '7', '10']
const material = ['Copper', 'Steel']
const 供液方式 = ['直膨', '泵供液']
const 风机直径 = ['500', '800']
const 风扇数量 = ['2', '3', '4', '5']
interface Mark {
  style: CSSProperties
  label: string
}

type Marks = Record<number, Mark | string>

const capacityRange = ref([30, 60])
const marks = reactive<Marks>({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
})
const arr = ref([]);//声明一个新数组
const mdatakeeper = ref([]);//声明一个新数组
const arrfilt = ref([]);//声明一个新数组
const  handleChange = () => {
  setTimeout(() => {
    aardio.getFields(workingSC.value).then(
          (v:string) =>{
            fields.value = JSON.parse(v)//.splice(0,5);
          }
        )
        aardio.getData(workingSC.value).then(
          (v:string) =>{
            mdatakeeper.value = JSON.parse(v);
            mdata.value = mdatakeeper.value;
            arrfilt.value = null;
            
          }
        )
      workingSCa.value = null
      workingSCb.value = null
      workingSCc.value = null
      workingSCd.value = null
      workingSCe.value = null
    }, 500); // 延迟执行
}



watch(workingSCa, (newName, oldName) => {
   if (arrfilt.value==null) arrfilt.value = mdata.value;
  arr.value = arrfilt.value.filter(item => item["翅片间距"]== newName)
  mdata.value  = arr.value
})
watch(workingSCb, (newName, oldName) => {
  if (arrfilt.value==null) arrfilt.value = mdata.value;
  arr.value = arrfilt.value.filter(item => item["铜管/钢管"]== newName)
  mdata.value  = arr.value
})
watch(workingSCe, (newName, oldName) => {
  if (arrfilt.value==null) arrfilt.value = mdata.value;
  arr.value = arrfilt.value.filter(item => item["供液方式"]== newName)
  mdata.value  = arr.value
})
watch(workingSCd, (newName, oldName) => {
  if (arrfilt.value==null) arrfilt.value = mdata.value;
  arr.value = arrfilt.value.filter(item => item["风机直径"]== newName)
  mdata.value  = arr.value
})
watch(workingSCe, (newName, oldName) => {
  if (arrfilt.value==null) arrfilt.value = mdata.value;
  arr.value = arrfilt.value.filter(item => item["风扇数量"]== newName)
  mdata.value  = arr.value
})
</script>
<style scoped>
.layout-container-demo {
  height: 100vh;
}
.layout-container-demo .el-header {
  /* position: relative; */
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding-top: 15px;
  
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.mymenu{
  background: var(--el-color-primary-light-7);
}
/* .layout-container-demo {
  border-right: none;
} */
.layout-container-demo .el-main {
  padding: 0;
  align-items: stretch;
}
/* .layout-container-demo{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
  vertical-align: middle;
} */
body {
  overflow-y: hidden;
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
};
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
