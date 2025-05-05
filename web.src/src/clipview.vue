<template>
    <el-container class="layout-container-demo">
        <el-main>
            <el-tabs type="border-card">
                <el-tab-pane label="Role">
                  <Listbox v-model="sc" :options="scs3" optionLabel="name" class="w-full md:w-56"/>
                </el-tab-pane>
                <el-tab-pane label="+"></el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { computed, ref, watch} from 'vue'
import Listbox from 'primevue/listbox';
import { useClipboard } from '@vueuse/core';
const { copy } = useClipboard();

const sc = ref()
const scs3 = ref([])

aardio.getData("").then(
  (v:string) =>{
    scs3.value = JSON.parse(v)//.splice(0,5);
    //console.log(v)
  }
)

watch(sc, (newValue) => {
  if (newValue) {
    copy(newValue.name).then(() => {
      console.log(`Copied to clipboard: ${newValue.name}`);
    });
  }
});
const handleDblClick = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target && target.classList.contains('p-listbox-option')) {
    target.setAttribute('contentEditable', 'true');
    target.setAttribute('role', 'textbox');
    target.setAttribute('aria-multiline', 'false');
    //target.focus();
  }
};

watch(() => scs3.value, () => {
  const listbox = document.querySelector('.p-listbox');
  if (listbox) {
    listbox.addEventListener('dblclick', handleDblClick);
  }
});

</script>
<style scoped>
.layout-container-demo {
  height: 100vh;
}
.layout-container-demo {
  /* position: relative; */
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding-top: 15px;
  
}
.layout-container-demo .el-main {
  padding: 0;
  align-items: stretch;
}
body {
  overflow-y: hidden;
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
};
</style>