
<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="视频链接">
        <el-col :span="20">
          <el-input v-model="form.name" />
        </el-col>
        <el-col :span="2">
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
        active: 0,
        activeName: 'first',
        form: {
          name: ''
        }
      }
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      handleClick(tab, event) {
        console.log(tab, event);
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