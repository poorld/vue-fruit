<template>
  <div>
    <el-dialog
      title="上传幻灯片"
      :visible.sync="selectTypeVisible"
      width="30%"
      :before-close="handleClose">
      <span>选择方式</span>
      <div style="text-align: center;margin-top: 40px;">
        <el-button type="primary" @click="uploadClick">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button type="primary" @click="linkVisible = true; selectTypeVisible = false">外链<i class="el-icon-link el-icon--right"></i></el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectTypeVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="selectTypeVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

    <!-- 上传窗口 -->
    <el-dialog
      title="提示"
      :visible.sync="uploadVisible"
      width="30%">
      <div>
        <!-- :http-request="uploadImg" -->
        <el-upload
          class="upload-demo"
          action="http://localhost:9000/api/app/file/upload"
          name="file"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="limit"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button>取 消</el-button> -->
        <el-button type="primary" @click="uploadVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 外链添加窗口 -->
    <el-dialog
      title="提示"
      :visible.sync="linkVisible"
      width="30%">
      <div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入外链"
          v-model="textarea">
        </el-input>
      </div>
      <div style="margin-top: 15px">
        <span class="demonstration">预览</span>
        <el-image :src="textarea" @load="loadSuccess" @error="loadError">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="linkVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBannerFromLink">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    limit: Number,
  },
  data() {
    return {
      selectTypeVisible: false,
      uploadVisible: false,
      linkVisible: false,
      fileList: [],
      textarea: '',
      bannerImageFlag: false
    }
  },
  methods: {
    showTypeDialog() {
      this.selectTypeVisible = true
    },
    uploadClick() {
      this.dialogVisible = false
      this.uploadVisible = true
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGorPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPGorPNG && isLt2M
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    loadSuccess(e) {
      console.info('图片加载成功', this.textarea)
      this.bannerImageFlag = true
    },

    loadError(e) {
      console.error('图片加载失败', this.textarea)
      this.bannerImageFlag = false
    },

    addBannerFromLink() {
      if (this.bannerImageFlag) {
        // api
        this.$emit('onLink', this.textarea)
      } else {
        this.$message.error('图像加载失败，请重试!')
      }
    }
  }
}
</script>

<style>

</style>
