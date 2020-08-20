<!-- 推送列表 -->
<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="用户链接/用户id">
        <el-col :sm="{span:24}" :lg="{span:18}">
          <el-input v-model="userId" />
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
      <el-table-column label="简介" align="center" width="400">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="认证信息" width="400">
        <template slot-scope="scope">
          <span>{{ scope.row.verified_content }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="发布时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="订阅" align="center" width="100">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-switch
            v-model="scope.row.status"
            active-color="#5B7BFA"
            inactive-color="#dadde5"
            @change="change(scope.$index,scope.row)" />
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
        :total="50" />
    </div>

    <el-dialog
      title="作者"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="author-top">
        <el-avatar :size="80" src="https://sf6-ttcdn-tos.pstatp.com/img/mosaic-legacy/fe4b00009f6e042e713e~120x256.image" />
        <!-- <el-avatar :size="20" :src="authLevel(authorInfo.user_auth_info)" v-if="authorInfo.user_verified" /> -->
        <el-avatar class="level" :size="20" :src="authLevel(1)" />
        <span style="color: #1d1d1d;font-weight: 500;font-size: 16px;">独孤轩辕策</span>
      </div>
      <!-- 分割线 -->
      <el-divider />

      <div class="auth-bottom">
        <div class="left">
          <span>
            <svg-icon icon-class="identity-authentication" style="font-size: 30px;"/>
             用户ID: 4123531254123
          </span>
        </div>

        <div class="right">
          <span>
            <svg-icon icon-class="description" style="font-size: 30px;"/>
            世界未知面，新的观点古老的故事。
          </span>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="follow">关 注</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, sb } from '@/api/subscription'

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
      centerDialogVisible: false,
      authorInfo: {}
    }
  },

  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.fetchData()
  },

  methods: {
    onSubmit() {
      // 链接
      // user_id=85383446500&
      const pattern1 = /user_id=(\d+)&/
      const match1 = this.userId.match(pattern1)

      // 作者id
      // 验证m-n位的数字：^\d{m,n}$
      const pattern2 = /^\d{10,16}$/
      const match2 = this.userId.match(pattern2)

      sb().then(res => {
        console.log(res.data)
        // this.centerDialogVisible = true
      })

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
        return
      }
      console.log(authorId)
      const url = 'https://m.toutiaoimg.cn/group/6861266415723217412/?app=news_article&timestamp=1597591092&group_id=6861266415723217412&use_new_style=1&tt_from=mobile_qq&utm_source=mobile_qq&utm_medium=toutiao_android&utm_campaign=client_share'
      

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
    },

    authLevel(level) {
      const thumb = {
        '0': require('@/assets/subscription_images/v0.png'),
        '1': require('@/assets/subscription_images/v1.png')
      }
      return thumb[level]
    },

    follow() {
      this.$message('关注成功!')
      this.centerDialogVisible = false
    }
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

.level {
  margin-top: -38px;
  margin-right: -60px;
}

.auth-bottom {
  display: flex;
  span {
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .left {
    flex: 1;
  }

  .right {
    flex: 1;
  }
}
</style>
