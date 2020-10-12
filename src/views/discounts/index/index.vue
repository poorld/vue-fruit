<template>
  <div class="app-container">
    <el-row>
      <el-button @click="dialogFormVisible = true" icon="el-icon-plus" circle></el-button>
    </el-row>

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
        align="center"
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

    <el-dialog title="优惠活动" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item label="优惠类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择优惠类型">
            <el-option label="满减" value="0"></el-option>
            <el-option label="折扣" value="1"></el-option>
            <el-option label="充值" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="满足条件" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" v-model="form.input2">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="享受优惠" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" v-model="form.input2">
            <template slot="append">{{ form.type | activeFilters }}</template>
          </el-input>
        </el-form-item>

        <el-form-item label="仅限会员" :label-width="formLabelWidth">
          <el-checkbox v-model="form.checked"></el-checkbox>
        </el-form-item>

        <el-form-item label="优惠说明" :label-width="formLabelWidth">
          <el-input v-model="form.input2"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

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
      }],
      dialogFormVisible: false,
      form: {
        type: '',
        input2: '',
        checked: false
      },
      formLabelWidth: '120px'
    }
  },

  filters: {
    activeFilters(value) {
      // console.log(value)
      if (value === '0')
        return '元'
      else if (value === '1')
        return '折'
      return '元'
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

