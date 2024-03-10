import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const imageList = ref(null)
  const qwe = ref(12)
  const setimageList = (newimageList)=>{
    imageList.value = newimageList
  }
  const setting = ()=>{
    qwe.value++
  }
  return {imageList,setimageList ,qwe ,setting}
},{
  persist: true,
})
