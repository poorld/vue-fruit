<template>
  <div class="app-container">
    <div class="item-box">
      <el-row>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" height="300px" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <span class="price">
                <span>23.5</span>
                <span>13.8</span>
              </span>
              <div class="bottom clearfix">
                <time class="time">好吃的汉堡描述商品描述好吃的汉堡描述商品描述...</time>
                <el-button type="text" class="button">更改</el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="15" :offset="1">
          <el-card :body-style="{ padding: '0px' }">
            <el-carousel trigger="click" height="300px" @change="onChange">
              <el-carousel-item v-for="(item,index) in bannerList" :key="index" autoplay="false">
                <h3 v-if="!item.image" class="small">{{ item }}</h3>
                <el-image v-if="item.image" :src="item.image"></el-image>
              </el-carousel-item>
            </el-carousel>
            <div style="padding: 14px;">
              <span>水果幻灯片</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">更改</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="item-box">
      <el-row>
        <el-col :span="8">
          <el-card shadow="hover">
            商品分类: <el-tag type="success">标签二</el-tag>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      bannerCount: 5,
      bannerList: ['无幻灯片，请添加', '无幻灯片，请添加', '无幻灯片，请添加'],
    }
  },
  methods: {
    ajaxGetBanner() {
      return [
        {
          productId: 12345,
          productName: '新疆葡萄价格美丽',
          image: 'https://img.zcool.cn/community/013de756fb63036ac7257948747896.jpg'
        }
      ]
    },

    onChange(index) {
    }
  },

  created() {
    const banners = this.ajaxGetBanner()
    const length = this.bannerCount - banners.length
    // 幻灯片数量不足用文字代替图片
    // console.log(length)
    for (let i = 0; i < length; i++) {
      banners.push('无幻灯片，请添加')
    }
    this.bannerList = banners
  }
}
</script>

<style scoped>
  .item-box {
    margin-top: 15px;
    font-size: 15px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
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

  .price {
    float: right;
  }
  .price span:nth-child(1) {
    text-decoration: line-through;
    font-size: 13px;
    color: #adadad;
  }
  .price span:nth-child(2) {
    font-size: 19px;
    color: #ff5353;
    margin-left: 10px;
  }
</style>
