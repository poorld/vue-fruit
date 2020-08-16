<!--
 * @Author: OutwitTheMilk
 * @Date: 2020-08-16 18:50:14
 * @LastEditors: OutwitTheMilk
 * @LastEditTime: 2020-08-16 22:17:42
 * @FilePath: \src\views\xigua\index.vue
 * @Description: 
-->
<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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