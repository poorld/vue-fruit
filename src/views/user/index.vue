<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="userId"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <!-- <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column> -->
      <el-table-column label="邮箱"  align="center">
        <template slot-scope="scope">
          {{ scope.row.email | emailFilter }}
        </template>
      </el-table-column>
      <el-table-column label="QQ"  align="center">
        <template slot-scope="scope">
          {{ scope.row.qq | emailFilter }}
        </template>
      </el-table-column>
      <el-table-column label="手机号"  align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile | emailFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="注册时间">
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
      title="订单"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose">

      <el-form :model="form" ref="form">

        <el-form-item label="用户ID" :label-width="formLabelWidth" prop="userId">
          <el-input disabled type="text" placeholder="请输入内容" v-model="form.userId">
          </el-input>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input  placeholder="请输入内容" v-model="form.username">
          </el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="QQ" :label-width="formLabelWidth" prop="qq">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
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
import { getAllUser, updateUser } from '@/api/user'
export default {
  filters: {
    emailFilter(email) {
      return email == null ? '无': email
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      form: {
        userId: '',
        username: '',
        email: '',
        qq: '',
        mobile: ''
      },
      formLabelWidth: '120px',
    }
  },
  methods: {
    init() {
      getAllUser()
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

    formConfirm() {
      updateUser(this.form).then(data => {
        this.init()
        this.$message.success('修改成功')
      })
      this.dialogFormVisible = false
    }

  },

  created() {
    this.init()
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
</style>>
