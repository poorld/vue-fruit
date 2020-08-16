
<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="视频链接">
        <el-col :span="17">
          <el-input v-model="form.name" />
        </el-col>
        <el-col :span="1" class="line">-</el-col>
        <el-col :span="4">
          <el-button type="primary" @click="onSubmit">解析</el-button>
          <el-button @click="onCancel">清空</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  export default {
    name: 'Xigua',
    data() {
      return {
        url_list: [
          'www.ixigua.com',
          'm.ixigua.com',
          'm.toutiaoimg.cn',
        ],
        active: 0,
        activeName: 'first',
        form: {
          name: ''
        }
      }
    },
    methods: {

      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },

      /**
       * 解析链接 
      */
      parsingurl(url){
        if(this.isContains(url, ))
      },
      isContains(str, substr) {
        return str.indexOf(substr) >= 0;
      }
    }
  }
</script>


<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>