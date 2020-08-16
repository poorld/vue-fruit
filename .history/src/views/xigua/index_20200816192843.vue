<template>
    <div class="dashboard-container">

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="今日头条" name="first">
                <el-steps :active="active" finish-status="success">
                    <el-step title="步骤 1"></el-step>
                    <el-step title="步骤 2"></el-step>
                    <el-step title="步骤 3"></el-step>
                  </el-steps>
                  
                  <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </el-tab-pane>

            <el-tab-pane label="西瓜视频app" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="西瓜视频网页版" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="抖音" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
        
          
          
    </div>
</template>


<script>
export default {
  name: 'Xigua',
  data () {
      return {
        active: 0
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