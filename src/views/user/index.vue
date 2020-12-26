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
  </div>
</template>


<script>
import { getAllUser } from '@/api/user'
export default {
  filters: {
    emailFilter(email) {
      return email == null ? '无': email
    },
  },
  data() {
    return {
      tableData: [],
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

  },

  created() {
    getAllUser()
      .then(data => {
        this.tableData = data
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
</style>>
