

<!--
 * @Author: OutwitTheMilk
 * @Date: 2020-08-16 18:50:14
 * @LastEditors: OutwitTheMilk
 * @LastEditTime: 2020-08-16 21:54:57
 * @FilePath: \src\views\xigua\index.vue
 * @Description: 
-->
<template>
    <div class="dashboard-container">


          
          
    </div>
</template>


<script>
export default {
  name: 'Xigua',
  data () {
      return {
        active: 0,
        activeName: 'first'
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