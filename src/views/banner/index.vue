<template>
  <div class="app-container">
    <div class="block">
      <!-- <span class="demonstration">Click 指示器触发</span> -->
      <el-carousel trigger="click" height="300px" @change="onChange">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <h3 class="small" v-if="!item.image">{{ item }}</h3>
          <el-image v-if="item.image" :src="item.image"></el-image>
        </el-carousel-item>
      </el-carousel>

      <div class="edit">
        <el-alert
          title="商城首页轮播图"
          type="success"
          show-icon
          description="推荐数量：5张 格式推荐： 900 x 383px"
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
      bannerList: ['无幻灯片，请添加', '无幻灯片，请添加', '无幻灯片，请添加'],
      bannerCount: 5
    }
  },

  methods: {
    onChange(index) {
      console.log(index)
    },

    ajaxGetBanner() {
      return [
        {
          image: 'https://img.zcool.cn/community/013de756fb63036ac7257948747896.jpg'
        }
      ]
    }

  },
  created() {
      let banners = this.ajaxGetBanner()
      let length = this.bannerCount - banners.length;
      // 幻灯片数量不足用文字代替图片
      console.log(length)
      for(let i = 0; i < length; i++) {
        banners.push('无幻灯片，请添加')
      }
      this.bannerList = banners
    },
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
