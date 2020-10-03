<template>
  <div class="app-container">
    <div class="block">
        <!-- <span class="demonstration">Click 指示器触发</span> -->
      <el-carousel trigger="click" height="300px" @change="onChange">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>

      <div class="edit">

        <el-alert
          title="推荐 900 x 383 px"
          type="success"
          :closable="false">
        </el-alert>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: ['无幻灯片，请添加','无幻灯片，请添加','无幻灯片，请添加']
    }
  },

  methods: {
    onChange(index){
      console.log(index)
    }
  }
}
</script>


<style scoped>
  .block {
    width: 80%;
    margin: 0 auto;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
