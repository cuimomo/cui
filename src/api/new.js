import {newhttp} from '@/composables/axios'
export const newimage = () => {
  return newhttp.get('?c=WallPaper&a=getAllCategoriesV2&from=360chrome')
}