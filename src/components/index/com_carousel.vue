<template>
  <el-carousel indicator-position="outside" height="350px">
    <el-carousel-item v-for="item in carousel_list" :key="item">
      <el-image
          style="height: 100%"
          :src="item.url"
          fit="cover"
      ></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      carousel_list: [
        {url: "http://www.cweme.com/upload/images/2021-10-15/pic_1634270835.jpg"},
        {url: "http://www.cweme.com/upload/images/2021-10-15/pic_1634271673.jpg"},
        {url: "http://www.cweme.com/upload/images/2021-10-15/pic_1634271705.jpg"},
      ]
    };
  },
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
