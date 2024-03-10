<template >
<div>
 <ul class="flex flex-wrap justify-between">
  <li v-for="(item,index) in list" :key="index"> 
    <el-button  :loading="loading" type="success" @click="show(item.id) " class="button" data-id="item.id" plain>  {{item.name}}</el-button>
 </li>
 </ul>

  <el-carousel
    height="600px"
    direction="horizontal"
    type="card"
    autoplay="false"
    interval="3000"
    
  >
    <el-carousel-item v-for="item in img" :key="item">
      <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
      <el-image class="mt-4 " :src="item.img_1024_768" alt="" style="width: 100%; height: 100%; object-fit:cover" />
    </el-carousel-item>
  </el-carousel>










 <div v-if="now">
 <el-skeleton>
    <template #template >
      <div class="flex flex-wrap justify-around ">
        <div class="mt-4 image relative" v-for="i in 15" :key="i">
         <el-skeleton-item class="mt-4 image" variant="image" style="width: 300px; height: 300px" />
          <div style="padding: 14px">
           <div
           style="
            display: flex;
            align-items: center;
            justify-items: space-between;
          "
        >
         </div>
       </div>
     </div>
    </div>
    </template>
  </el-skeleton>
</div>

 <div v-else class="flex flex-wrap justify-around " infinite-scroll-distance="100" v-infinite-scroll="load" infinite-scroll-delay="200" > 
    <div  class="relative btn overflow-hidden image" v-for="(item) in img" :key="item.id"> 
      <el-image class="mt-4 " :src="item.img_1024_768" alt="" style="width: 300px; height: 300px;" />
      <el-button type="success" size="default" class="noshow" id="btn1" @click="downloadImage(item.img_1024_768,image)">下载图片</el-button>
      <div class="bg-dark-50 brak">{{item.utag}}</div>
    </div>
 </div>
</div>
</template>
<script setup>
import {addimage} from '@/api/add.js'
import {showimage} from '@/api/show.js'


import {ref } from 'vue'

const loading = ref(null)
const list = ref(null)
const start = ref(1)
const img = ref(null)
const now = ref(true)

const id = ref(null)


function add (){
  addimage().then(
  res=>{
    list.value = res.data.data
  }
)
}
  add();
  //默认展示4K高清图片
show(5)
 function show(i) {
  id.value = i
  loading.value = true
  start.value = 1
  showimage(i,start.value).then(
  res=>{
  //  console.log(res)
img.value = res.data.data
now.value = false

   loading.value = false
  })
} 

function load(){
  // start.value*4
  // console.log("触发下拉触底");
  start.value =  start.value+20
  // console.log(id);
  showimage(id.value,start.value).then((res)=>{
  img.value = [...img.value,...res.data.data]
  console.log("https://www.bitbug.net/");
  })

}
// 调用方式
// 参数一： src
// 参数二： 图片名称，可选
const downloadImage = (imgsrc, name) => {
  // 这里是核心，crossOrigin+带参数的可以解决跨域问题，少一个都会有问题
  imgsrc = imgsrc + "?v=" + Math.random();
  var image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function () {
    var canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    var context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据

    var a = document.createElement('a') // 生成一个a元素
    var event = new MouseEvent('click') // 创建一个单击事件
    a.download = name || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  image.src = imgsrc
}
</script>
<style scoped>
.btn:hover #btn1{
  opacity: 1;
}
.btn #btn1{
  position: absolute;
  right: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  transition: all 0.5s;
}
.noshow{
  opacity: 0;
}
.image{
  border-radius: 50%;
}
.brak{
line-height: 40px;
text-align: center;
position: absolute;
bottom: 0;
width: 300px;
height: 0px;

}
.btn:hover .brak{
  height: 40px;
  transition: all 0.5s;
}

</style>