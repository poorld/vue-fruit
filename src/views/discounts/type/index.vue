<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="discountsCategoryId"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="discountsType"
        label="优惠类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="说明">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDiscountsCat } from '@/api/discountsCategory'
export default {
  data() {
    return {
      tableData: [{
        discountsCategoryId: '20160501',
        discounts: '折扣折扣折扣',
        discountsType: '折扣'
      }, {
        discountsCategoryId: '20160502',
        discounts: '满减满减满减',
        discountsType: '满减'
      }, {
        discountsCategoryId: '20160503',
        discounts: '充值充值充值',
        discountsType: '充值'
      }, {
        discountsCategoryId: '20160504',
        discounts: '限时活动限时活动',
        discountsType: '限时活动'
      }]
    }
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    filterTag(value, row) {
      return row.members === value
    }
  },

  created() {
    getDiscountsCat()
      .then(res => {
        // console.log(res.data)
        this.tableData = res.data
      })
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

