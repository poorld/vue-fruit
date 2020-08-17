<!-- 推送列表 -->
<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="用户链接/用户id">
        <el-col :sm="{span:24}" :lg="{span:18}">
          <el-input/>
        </el-col>

        <el-col :sm="{span:24}" :lg="{span:4}">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Subscription",
  data() {
    return {

    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  }
}
</script>

<style scoped>
/* @import url(); 引入css类 */
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