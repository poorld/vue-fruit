

<!--
 * @Author         : OutwitTheMilk
 * @Date           : 2020-08-15 20:25:12
 * @LastEditors    : OutwitTheMilk
 * @LastEditTime   : 2020-08-16 10:21:47
 * @FilePath       : \src\views\dashboard\index.vue
 * @Description    : 
-->
<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
        <div class="grid-content bg-purple">
          <svg-icon icon-class="watermelon" />
          <a href="#">西瓜视频解析</a>
        </div>
      </el-col>
      <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}"><div class="grid-content bg-purple-light">web服务器</div></el-col>
      <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}"><div class="grid-content bg-purple">portainer面板</div></el-col>
      <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}"><div class="grid-content bg-purple-light">openwrt</div></el-col>
      <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}"><div class="grid-content bg-purple">portainer面板</div></el-col>
      <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}"><div class="grid-content bg-purple-light">openwrt</div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
 
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
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

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-bottom: 20px;
    height: 100px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
