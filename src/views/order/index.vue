<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @expand-change="expandSelect"
      :row-key='getRowKeys'
      :expand-row-keys="expands"
      >
      <el-table-column
        prop="orderNum"
        label="订单编号"
        width="220">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="message"
        label="订单留言">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        :filters="[{text: '等待支付', value: 1}, { text: '已支付', value: 2 },
                  {text: '配送中', value: 3}, { text: '配送完成', value: 4 },
                  {text: '订单支付超时', value: 5}, {text: '订单取消', value: 6}]"
        :filter-method="filterTag">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status == 0 ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.status | activeFilters }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="订单时间">
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

            <!-- <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">
            </el-button> -->
          </el-button-group>
        </template>
      </el-table-column>


      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div v-for="item in props.row.orderItems" :key="item.orderItemId">
              <div class="product">
                <div class="product_left">
                  <el-image
                  style="width: 100px; height: 100px"
                  :src="item.product.defaultImg"
                  fit="fill"></el-image>
                </div>
                <div class="product_right">
                  <span>商品ID：{{ item.productId }}</span>
                  <span>商品名称：{{ item.product.name }}</span>
                  <span>商品规格：{{ item.product.spec.sku.attrbute }} x {{item.quantity}}</span>
                  <span style="color:red">商品价格：{{ item.price }}元</span>
                </div>
              </div>
            </div>
            <div class="price" v-if="props.row.status != 0">
              付款金额：{{ props.row.totalPrice }}元
            </div>
            <div v-if="props.row.status != 0">
              <p>订单编号：{{ props.row.orderNum }}</p>
              <p>联系人：{{ props.row.contactName }}</p>
              <p>联系电话：{{ props.row.contactMobile }}</p>
              <p>收货地址：{{ props.row.contactAddress }}</p>
              <p>用户留言：{{ props.row.message }}</p>
            </div>
            <el-button v-if="props.row.status === 2" type="success" size="mini" style="float: right;" @click="cancleOrderClick(props.row.orderNum)">
              发货
            </el-button>
            <el-button v-if="props.row.status > 0 && props.row.status < 5" type="danger" size="mini" style="float: right;" @click="cancleOrderClick(props.row.orderNum)">
              取消订单
            </el-button>
          </el-form>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="订单"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose">

      <el-form :model="form" ref="form">

        <el-form-item label="订单编号" :label-width="formLabelWidth" prop="orderNum">
          <el-input disabled type="text" placeholder="请输入内容" v-model="form.orderNum">
          </el-input>
        </el-form-item>

        <el-form-item label="联系人" :label-width="formLabelWidth" prop="contactName">
          <el-input  placeholder="请输入内容" v-model="form.contactName">
          </el-input>
        </el-form-item>

        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="contactMobile">
          <el-input type="number" v-model="form.contactMobile"></el-input>
        </el-form-item>

        <el-form-item label="收货地址" :label-width="formLabelWidth" prop="contactAddress">
          <el-input v-model="form.contactAddress"></el-input>
        </el-form-item>

        <el-form-item label="用户留言" :label-width="formLabelWidth" prop="message">
          <el-input v-model="form.message"></el-input>
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
import { getOrders, cancelOrder, updateContact } from '@/api/order'
import { confirm } from '@/utils/dialog'
export default {
  data() {
    return {
      tableData: [],
      expands: [],
      dialogFormVisible: false,
      form: {
        orderNum: '',
        contactName: '',
        contactMobile: '',
        contactAddress: '',
        message: ''
      },
      options: [],
      formLabelWidth: '120px',
    }
  },

  filters: {
    activeFilters(value) {
      if (value === 0) {
        return '下订单'
      } else if (value === 1) {
        return '等待支付'
      }else if (value === 2) {
        return '已支付'
      }else if (value === 3) {
        return '配送中'
      }else if (value === 4) {
        return '配送完成'
      }else if (value === 5) {
        return '订单支付超时'
      }else if (value === 6) {
        return '订单取消'
      }
      return '嗯嗯'
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
      getOrders()
        .then(data => {
          this.tableData = data
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
      return row.status === value
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
      updateContact(this.form)
        .then(data => {
          this.$message.success('修改成功')
          this.initData()
        })

      this.dialogFormVisible = false
    },

    handleEdit(index, row) {
      console.log(row);
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

    },
    cancleOrderClick(orderNum) {
      cancelOrder(orderNum).then(res => {
        this.initData()
      })
    },
    // 折叠面板每次只能展开一行
    expandSelect (row, expandedRows) {
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.orderNum)
        }
      } else {
        that.expands = []
      }
    },
    getRowKeys(row) {
      return row.orderNum
    },

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

  .product {
    display: flex;
    border-bottom: 1px solid #eee;
    margin-top: 15px;
  }
  .product_left {

  }
  .product_right {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: space-around;
  }
  .price {
    background-color: #f0f9eb;
    color: #67C23A;
    text-align: right;
    padding: 10px;
  }
</style>
