<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="discounts"
        label="优惠"
        width="180">
      </el-table-column>
      <el-table-column
        prop="explain"
        label="优惠说明">
      </el-table-column>
      <el-table-column
        prop="conditions"
        label="满足条件">
      </el-table-column>
      <el-table-column
        prop="conditions_explain"
        label="满足条件说明">
      </el-table-column>
      <el-table-column
        prop="members"
        label="仅限会员"
        :filters="[{ text: '会员', value: true }, { text: '用户', value: false }]"
        :filter-method="filterTag">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.members ? 'primary' : 'success'"
            disable-transitions>{{scope.row.members ? '会员专享' : '用户优惠'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="type"
        label="优惠类型">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        id: '20160501',
        discounts: '95%',
        explain: '会员购物享受95折优惠',
        conditions: '130',
        conditions_explain: '满30元享受优惠',
        members: true,
        type: '折扣'
      }, {
        id: '20160502',
        discounts: '95%',
        explain: '会员购物享受95折优惠',
        conditions: '230',
        conditions_explain: '满30元享受优惠',
        members: false,
        type: '满减'
      }, {
        id: '20160503',
        discounts: '95%',
        explain: '会员购物享受95折优惠',
        conditions: '330',
        conditions_explain: '满30元享受优惠',
        members: true,
        type: '满减'
      }, {
        id: '20160504',
        discounts: '95%',
        explain: '会员购物享受95折优惠',
        conditions: '430',
        conditions_explain: '满30元享受优惠',
        members: false,
        type: '满减'
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

