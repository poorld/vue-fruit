<!-- 推送列表 -->
<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="用户链接/用户id">
        <el-col :sm="{span:24}" :lg="{span:18}">
          <el-input v-model="userId"/>
        </el-col>

        <el-col :sm="{span:24}" :lg="{span:4}">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-col>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center" width="200">
        <template slot-scope="scope">
          <!-- {{ scope.row.title }} -->
          <div class="author-info">
            <el-avatar :src="scope.row.avatar" />
            <span>{{ scope.row.author }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订阅" align="center" width="100">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-switch
            active-color="#5B7BFA"
            inactive-color="#dadde5"
            v-model="scope.row.status"
            @change="change(scope.$index,scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">视频列表
          </el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>

    <el-dialog
      title="作者"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="author-top">
        <el-avatar :size="80" src="https://sf6-ttcdn-tos.pstatp.com/img/mosaic-legacy/fe4b00009f6e042e713e~120x256.image" />
        <span>独孤轩辕策</span>
      </div>
      <el-divider></el-divider>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">订 阅</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/subscription'

export default {
  name: 'Subscription',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      userId: '',
      centerDialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      // 链接
      // user_id=85383446500&
      const pattern1 = /user_id=(\d+)&/
      const match1 = this.userId.match(pattern1)

      // 作者id
      // 验证m-n位的数字：^\d{m,n}$
      const pattern2 = /^\d{10,12}$/
      const match2 = this.userId.match(pattern2)

      let authorId

      if (match1) {
        authorId = match1[1]
      } else if (match2) {
        authorId = match2[0]
      } else {
        this.$message({
          message: '输入错误',
          type: 'warning'
        })
      }
      console.log(authorId)
      this.centerDialogVisible = true
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    change(index, row) {
      console.log(index, row)
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.author {
  &-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.page {
  text-align: center;
  margin: 20px;
}

.author {
  &-top {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 140px;
  }
}
</style>
