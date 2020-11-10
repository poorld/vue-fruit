
<template>
  <div class="chart-container">
    <chart :options="options" height="100%" width="100%" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Chart from './Charts/LineMarker.vue'
  import { getEveryDayToCurrent } from '@/utils/my-date'
  import { colorConfig, chartConfig, getSeries } from '@/utils/chart-data'
  import { getCategory } from '@/api/category'
  import { getOrderSales } from '@/api/order'

  export default {
    name: 'Dashboard',
    data() {
      return {
        options: {}
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ]),
    },
    methods: {
      initSales(categorys) {
        let orderSalesPromise = []
        categorys.forEach(category => {
          console.log(category)
          orderSalesPromise.push(getOrderSales(category.productCategoryId))
        })
        Promise.all(orderSalesPromise).then((result) => {
          console.log(result)
          this.initData(result)
        }).catch((error) => {
          console.log(error)      // 失败了，打出 '失败'
        })
      },
      initData(salesArray) {
        const days = getEveryDayToCurrent()
        console.log(colorConfig.colors)

        // 存放当前分类的月销售额
        let categorySales = {
          // 分类名称
          category: '',
          sales: []
        }
        // 存放所有分类的月销售额
        let chartDatas = []
        for (let j = 0; j < salesArray.length; j++) {
          for (let index = 0; index < days.length; index++) {
            const day = days[index]
            // 获取每个分类的销售额
            const category = salesArray[j]
            if (category) {
              // 设置分类名称
              categorySales.category = category.categoryName
              // 获取每一天的销售额
              const sales = category.sales.find(sales => sales.day === day)
              // console.log(sales)
              if (sales){
                categorySales.sales.push(sales.sales)
              } else {
                // 当天没有销售额则设为0
                categorySales.sales.push(0)
              }
            }else{
              break
            }
          }
          const data = Object.assign({}, categorySales)
          categorySales.sales.length > 0 &&  chartDatas.push(data)
          categorySales.sales = []
        }

        // 打印从1号到目前的日期
        console.log(days)
        console.log(chartDatas)

        let options = chartConfig.options
        options.xAxis[0].data = days

        let seriesArray = []
        for (let index = 0; index < chartDatas.length; index++) {
          const data = chartDatas[index]
          const colorLen = colorConfig.colors.length
          if(index < colorLen) {
            const color = colorConfig.colors[index]
            seriesArray.push(getSeries(color, data))
          }

        }
        options.series = seriesArray
        console.log(options)
        this.options = options
      },

      getsalesByDay(salesArray, day) {
        return salesArray.find(sales => sales.day === day)
      }
    },
    created() {


      getCategory().then(data => {
        this.initSales(data)
        // console.log(data)
      })

    },
    components: { Chart }
  }
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
