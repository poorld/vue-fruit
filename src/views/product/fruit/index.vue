<template>
  <div class="app-container">

    <div class="product-menu">
      <el-row>
        <el-button type="primary" size="small">添加产品</el-button>

        <el-input placeholder="请输入内容" v-model="input" class="input-with-select" size="small">
          <el-select v-model="select" slot="prepend" placeholder="分类" class="classify">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row>

      <el-table-column type="expand">
        <template slot-scope="">
          <el-form label-position="left" inline class="demo-table-expand">

            <el-form-item label="商品 ID">
              <span>123455</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>陕西优质红提葡萄</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-tag type="info" size="small">葡萄</el-tag>
            </el-form-item>

            <el-form-item label="商品价格">
              <span>15.7</span>
            </el-form-item>
            <el-form-item label="库存">
              <span>59（斤）</span>
            </el-form-item>

            <!-- <el-form-item label="封面">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                fit="fill"></el-image>
            </el-form-item> -->

            <el-form-item label="是否推荐">
              <el-tag type="success" size="small"><span>true</span></el-tag>
            </el-form-item>

            <el-form-item label="水果优惠">
              <span>满30-2元</span>
            </el-form-item>

            <el-form-item label="创建时间">
              <span>2009-01-30 12:02:52</span>
            </el-form-item>

            <el-image
              style="width: 100px;height: 100px;float: right;margin-top: -110px;"
              :src="url"
              fit="full"></el-image>

          </el-form>

          <el-row class="fruit-setting">
            <el-button type="info" size="small">
              <svg-icon icon-class="fruit_hot" />设为热销水果
            </el-button>

            <el-button type="primary" size="small">
              <svg-icon icon-class="fruit_limit" />设为限时抢购
            </el-button>

            <el-button type="success" size="small">
              <svg-icon icon-class="fruit_choiceness" />设为每日精选
            </el-button>

            <el-button type="warning" size="small">
              <svg-icon icon-class="fruit_choiceness" />关联幻灯片
            </el-button>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品ID" width="110">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Title" width="110">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column> -->
      <el-table-column label="商品封面" width="110" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.img }}</span> -->
          <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.img"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述"  align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
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
      input: '',
      select: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .product-menu {
    margin-bottom: 10px;
  }

  .classify {
    width: 100px;
  }

  .input-with-select {
    background-color: #fff;
    width: 400px;
    float: right;
  }
  /* .el-input {
    width: 430px;
  } */

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .fruit-setting {
    text-align: right;
    margin: 15px 0;
  }
</style>
