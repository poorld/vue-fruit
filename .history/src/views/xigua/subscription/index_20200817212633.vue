<!-- 推送列表 -->
<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="用户链接/用户id">
        <el-col :sm="{span:24}" :lg="{span:18}">
          <el-input />
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
      <el-table-column class-name="status-col" label="订阅" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-switch
            on-text ="是"
            off-text = "否"
            on-color="#5B7BFA"
            off-color="#dadde5"
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
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">视频列表
          </el-button>
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
      listLoading: true
    }
  },
  methods: {
    onSubmit() {

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
</style>
