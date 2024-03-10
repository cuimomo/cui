import { http } from "@/composables/axios"
export const showimage = (id, start) => {
  return http.get(`?c=WallPaper&a=getAppsByCategory&cid=${id}&start=${start}&count=20`
  )
}