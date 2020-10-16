<template>
  <div class="app-container">
    <el-row>
      <el-button icon="el-icon-plus" circle @click="handleOpen"/>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="discountsId"
        label="ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="discounts"
        label="优惠"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.discounts | discountsFilter(scope.row.discountsCategory.discountsFlag) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="discountsExplain"
        label="优惠说明">
      </el-table-column>
      <el-table-column
        prop="conditions"
        align="center"
        label="满足条件">
      </el-table-column>
      <el-table-column
        prop="conditionsExplain"
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
        prop="discountsCategory.discountsType"
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

    <el-dialog
      title="优惠活动"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose">

      <el-form :model="form" ref="form">

        <el-form-item label="优惠类型" :label-width="formLabelWidth" prop="discountsCategory.discountsFlag">
          <el-select v-model="form.discountsCategory.discountsCategoryId" placeholder="请选择优惠类型">
            <el-option
              v-for="item in options"
              :key="item.discountsFlag"
              :label="item.discountsType"
              :value="item.discountsCategoryId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="满足条件" :label-width="formLabelWidth" prop="conditions">
          <el-input type="number" placeholder="请输入内容" v-model="form.conditions">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="满足条件说明" :label-width="formLabelWidth" prop="conditionsExplain">
          <el-input type="text" placeholder="请输入内容" v-model="form.conditionsExplain">
          </el-input>
        </el-form-item>

        <el-form-item label="享受优惠" :label-width="formLabelWidth" prop="discounts">
          <el-input type="number" placeholder="请输入内容" v-model="form.discounts">
            <template slot="append">{{ form.discountsCategory.discountsFlag | activeFilters }}</template>
          </el-input>
        </el-form-item>

        <el-form-item label="仅限会员" :label-width="formLabelWidth" prop="members">
          <el-checkbox v-model="form.members"></el-checkbox>
        </el-form-item>

        <el-form-item label="优惠说明" :label-width="formLabelWidth" prop="explain">
          <el-input v-model="form.explain"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="formConfirm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getDiscountsCat } from '@/api/discountsCategory'
import { addDiscounts, getDiscounts, updateDiscounts, deleteDiscounts } from '@/api/discounts'
import { confirm } from '@/utils/dialog'
export default {
  data() {
    return {
      tableData: [{
        discountsId: 10010,
        explain: '满22元减2噢噢噢噢',
        conditions: 22,
        conditionsExplain: '满22元才能享受优惠',
        discounts: 2,
        members: false,
        discountsCategory: {
          discountsCategoryId: 2001,
          discountsType: '满减',
          discountsFlag: 0,
          description: '满减呀呀呀'
        }
      }],
      dialogFormVisible: false,
      form: {
        // 满足条件
        conditions: '',
        // 享受优惠
        discounts: '',
        members: false,
        conditionsExplain: '',
        explain: '',
        discountsCategory: {
          discountsCategoryId: '',
          discountsFlag: ''
        }
      },
      options: [],
      formLabelWidth: '120px',
      update: false
    }
  },

  filters: {
    activeFilters(value) {
      if (value === 0) {
        return '元'
      } else if (value === 1) {
        return '折'
      }
      return '元'
    },

    /**
     * {{ scope.row.discounts | discountsFilter(scope.row.discountsCategory.discountsFlag) }}
     * discounts作为第一个参数传入discountsFilter过滤器
     * scope.row.discountsCategory.discountsFlag作为第二个参数传入discountsFilter过滤器
     */
    discountsFilter(discounts, discountsFlag) {
      // console.log(discounts,discountsFlag)
      // return discounts + this.activeFilters(discountsFlag)
      let unit = '元'
      if (discountsFlag === 0) {
        unit = '元'
      } else if (discountsFlag === 1) {
        unit = '折'
      }
      return discounts + unit
    }
  },

  methods: {
    initData() {
      getDiscounts()
        .then(data => {
          this.tableData = data
        })
      getDiscountsCat()
        .then(data => {
          // this.form.type = res.data
          this.options = data
        })
    },

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
    },

    getDiscountsCatByFlag(list, discountsCatFlag) {
      return list.find(element => element.discountsCatFlag === discountsCatFlag)
    },

    getDiscountsCatById(list, discountsCategoryId) {
      return list.find(element => element.discountsCategoryId === discountsCategoryId)
    },

    formConfirm() {
      // console.log(this.form)
      // const cat = this.getDiscountsCatByFlag(this.options, this.form.type)
      // this.form.discountsCategory.discountsCategoryId = cat.discountsCategoryId
      // console.log(this.form)
      if (this.update) {
        updateDiscounts(this.form)
          .then(data => {
            this.initData()
          })
      } else {
        addDiscounts(this.form)
          .then(data => {
            this.initData()
          })
      }
      this.dialogFormVisible = false
    },

    handleEdit(index, row) {
      this.$nextTick(() => {
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }

        // this.form = Object.assign({}, row)
        Object.assign(this.form, row)
      })

      // this.form = Object.assign({}, row)
      this.dialogFormVisible = true
      this.update = true
    },

    handleOpen() {
      // this.$nextTick(()=>{
      //   if(this.$refs['form'])
      //     this.$refs['form'].resetFields()
      // })
      this.update = false
      this.dialogFormVisible = true
    },

    handleClose() {
      this.dialogFormVisible = false
      this.$nextTick( () => {
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      })
    },

    handleDelete(index, row) {
      confirm('提示', `您确定要删除[${row.explain}]吗？`)
        .then((_) => {
          return deleteDiscounts(row.discountsId)
        })
        .then(data => {
          this.$router.go(0)
        })

    }

  },

  computed: {
    // 计算属性的 getter
    flag: function () {
      // `this` 指向 vm 实例
      if (this.options && this.form.discountsCategory.discountsCategoryId) {
        const disc = this.getDiscountsCatById(this.options, this.form.discountsCategory.discountsCategoryId)
        const value = disc.discountsCategory.discountsFlag
        if (value === 0)
          return '元'
        else if (value === 1)
          return '折'
        return '元'
      }
      return '元'
    }
  },

  created() {
    this.initData()
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

