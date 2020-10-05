<template>
  <div class="app-container">
    <div class="block">
      <!-- <span class="demonstration">Click 指示器触发</span> -->
      <el-carousel trigger="click" height="300px" @change="onChange">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index" autoplay="false">
          <h3 v-if="!item.image" class="small">{{ item }}</h3>
          <el-image v-if="item.image" :src="item.image"></el-image>
        </el-carousel-item>
      </el-carousel>

      <div>
        <el-alert
          title="商城首页轮播图"
          type="success"
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
        <!-- <el-button type="warning" icon="el-icon-plus" circle @click="bannerAdd"></el-button> -->
        <el-button type="danger" icon="el-icon-delete" circle @click="bannerDelete"></el-button>
      </div>

    </div>

    <el-dialog
      title="上传幻灯片"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>选择方式</span>
      <div style="text-align: center;margin-top: 40px;">
        <el-button type="primary" @click="uploadClick">上传<i class="el-icon-upload el-icon--right"></i></el-button>

        <el-button type="primary">外链<i class="el-icon-link el-icon--right"></i></el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="uploadVisible"
      width="30%">
      <div>
        <el-upload
          class="upload-demo"
          action
          name="file"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :http-request="uploadImg"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getBook, addBook } from '@/api/banner'

export default {
  data() {
    return {
      bannerList: ['无幻灯片，请添加', '无幻灯片，请添加', '无幻灯片，请添加'],
      bannerCount: 5,
      bannerIndex: 0,
      productId: 0,
      productName: '',
      dialogVisible: false,
      uploadVisible: false,
      title: '',
      fileList: []
    }
  },

  methods: {
    onChange(index) {
      // console.log(index)
      this.bannerIndex = index
      const banner = this.bannerList[index]
      if (banner && banner.productId) {
        this.productId = banner.productId
        this.productName = banner.productName
      } else {
        this.productId = ''
        this.productName = ''
      }
    },

    bannerEdit() {
      this.dialogVisible = true
    },

    bannerDelete() {

    },

    uploadClick() {
      this.dialogVisible = false
      this.uploadVisible = true
    },

    uploadImg(fileObj) {
      let formData = new FormData();
      formData.set("file", fileObj.file);
      // axios
      //   .post('接口地址', formData, {
      //     headers: {
      //       "Content-type": "multipart/form-data"
      //     }
      //   }).then().catch();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
          done()
        })
        .catch(_ => {})
    }
  },
  created() {
    const banners = this.ajaxGetBanner()
    const length = this.bannerCount - banners.length
    // 幻灯片数量不足用文字代替图片
    console.log(length)
    for (let i = 0; i < length; i++) {
      banners.push('无幻灯片，请添加')
    }
    this.bannerList = banners

    const banner = this.bannerList[0]
    if (banner && banner.productId) {
      this.productId = banner.productId
      this.productName = banner.productName
    }

    // getBook()
    //   .then(res => {
    //     console.log(res)
    //   })


    addBook({'bookName': 'sbsbs'})
      .then(res => {
        console.log(res)
      })
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
