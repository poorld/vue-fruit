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

      <div class="banner-info">
        <span>幻灯片{{bannerIndex + 1}}</span>
        <span>商品ID{{ productId }}</span>
        <span>商品名称{{ productName }}</span>
      </div>

      <div class="edit">
        <el-button type="primary" icon="el-icon-edit" circle @click="bannerEdit"></el-button>
        <el-button type="warning" icon="el-icon-plus" circle @click="bannerAdd"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="bannerDelete"></el-button>
      </div>

    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: ['无幻灯片，请添加', '无幻灯片，请添加', '无幻灯片，请添加'],
      bannerCount: 5,
      bannerIndex: 0,
      productId: 0,
      productName: '',
      dialogVisible: false,
      title: ''
    }
  },

  methods: {
    onChange(index) {
      console.log(index)
      this.bannerIndex = index
      let banner = this.bannerList[index]
      if (banner && banner.productId) {
        this.productId = banner.productId
        this.productName = banner.productName
      } else {
        this.productId = ''
        this.productName = ''
      }
    },

    ajaxGetBanner() {
      return [
        {
          productId: 12345,
          productName: '新疆葡萄价格美丽',
          image: 'https://img.zcool.cn/community/013de756fb63036ac7257948747896.jpg'
        }
      ]
    },

    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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

      let banner = this.bannerList[0]
      if (banner && banner.productId) {
        this.productId = banner.productId
        this.productName = banner.productName
      }
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
  .banner-info {
    color: #8c8c8c;
    size: 15px;
    margin-top: 10px;
  }

  .banner-info span {
    margin-left: 20px;
  }

  .edit {
    text-align: center;
  }
</style>
