<template>
  <div class="app-container">
    <!-- <div class="box info-base">
      基础信息
    </div> -->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.productName"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>

          <el-form-item label="价格">
            <el-input type="number" placeholder="请输入内容" v-model="form.date1" style="width: 40%;">
              <template slot="prepend">市场价格</template>
            </el-input>
            <el-input type="number" placeholder="请输入内容" v-model="form.date2" style="width: 40%;float: right;">
              <template slot="prepend">售卖价格</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片信息</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text item">
        <span>商品封面</span>
        <el-upload
          action="http://localhost:9000/api/app/file/upload"
          name="file"
          list-type="picture-card"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      dialogImageUrl: '',
      dialogVisible: false
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
  .app-container {
    background-color: #f7f7f7;
  }

  .box {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    /* // width: 480px; */
    margin-top: 15px;
  }



</style>
