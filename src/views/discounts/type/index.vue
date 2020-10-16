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
        prop="discountsDescription"
        label="说明">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">
            </el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">
            </el-button>
          </el-button-group>
        </template>
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
        this.tableData = res
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

