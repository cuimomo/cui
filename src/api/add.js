import {instance} from '@/composables/axios'
export const addimage = () => {
  return instance.post('?c=WallPaper&a=getAllCategoriesV2&from=360chrome'
  )
}