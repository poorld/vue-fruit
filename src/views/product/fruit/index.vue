<template>
  <div class="app-container">

    <div class="menu">

      <div style="margin-bottom: 20px">
        <el-button type="primary" size="small" @click="addProduct">添加产品</el-button>
      </div>

      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCategory" @change="handlecheckedCategoryChange">
          <el-checkbox
            v-for="category in categorys"
            :label="category.productCategoryId"
            :key="category.productCategoryId"
          >
            {{category.name}}
          </el-checkbox>
        </el-checkbox-group>

      <div class="product-menu">
        <el-row>
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select" size="small">
            <el-select v-model="select" slot="prepend" placeholder="非必选" class="classify">
              <el-option label="已上线" value="0"></el-option>
              <el-option label="已下线" value="1"></el-option>
              <!-- <el-option label="精选水果" value="3"></el-option> -->
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-row>
      </div>
    </div>



    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row>

      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="status">
            <span>上线板块</span>
            <el-tag>新品上市</el-tag>
            <el-tag type="success">热销水果</el-tag>
            <!-- <el-tag type="info">标签三</el-tag> -->
            <el-tag type="warning">限时抢购</el-tag>
            <el-tag type="danger">每日精选</el-tag>
          </div>

          <el-form label-position="left" inline class="demo-table-expand">

            <el-form-item label="商品 ID">
              <span>{{ props.row.productId }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-tag type="info" size="small">{{ props.row.productCategory.name }}</el-tag>
            </el-form-item>

            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
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
              <span style="color: #ff0d0d;">满30-2元</span>
            </el-form-item>

            <el-form-item label="创建时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>

            <el-form-item label="携带标签">
              <span class="tag">产地直销</span>
              <span class="tag">限时优惠</span>
              <span class="tag">店长推荐</span>
              <span class="tag">新鲜时蔬</span>
            </el-form-item>

            <!-- <el-image
              style="width: 100px;height: 100px;float: right;margin-top: -110px;"
              :src="url"
              fit="full"></el-image> -->

          </el-form>

          <el-row class="fruit-setting">
            <el-button type="info" size="mini">
              <svg-icon icon-class="fruit_hot" />设为热销水果
            </el-button>

            <el-button type="primary" size="mini">
              <svg-icon icon-class="fruit_limit" />设为限时抢购
            </el-button>

            <el-button type="success" size="mini">
              <svg-icon icon-class="fruit_choiceness" />设为每日精选
            </el-button>

            <el-button type="warning" size="mini">
              <svg-icon icon-class="fruit_choiceness" />关联幻灯片
            </el-button>

            <el-button type="danger" size="mini" style="float: right;" @click="toProductInfo(props.row.productId)">
              查看详情
            </el-button>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column
        width="110"
        label="商品 ID"
        prop="productId">
      </el-table-column>

      <!-- <el-table-column label="Title" width="110">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column> -->
      <el-table-column label="商品封面" width="110" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.img }}</span> -->
          <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.defaultImg"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
        width="110"
        label="商品名称"
        prop="name"
        align="center">
      </el-table-column>
      <!-- <el-table-column label="商品名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="描述"  align="center">
        <template slot-scope="scope">
          {{ scope.row.explain }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.productStatus | colorFilter">{{ scope.row.productStatus | statusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="价格" width="200">
        <template slot-scope="scope">
          <svg-icon icon-class="fruit_price" />
          <span>{{ scope.row.price }}</span>
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

    <el-pagination
      style="text-align: center;margin: 50px;"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/table'
const cityOptions = ['上海1', '北京2', '广州3', '深圳4','上海5', '北京6', '广州7', '深圳8']
import { getCategory } from '@/api/category'
import { getProducts, getProductById, getProductByCategory, getProductByQuery } from '@/api/product'

export default {
  filters: {
    colorFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },

    statusFilter(status) {
      const statusMap = {
        '0': '上线',
        '1': '下线'
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
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      checkAll: false,
      checkedCategory: [],
      categorys: [],
      isIndeterminate: true

    }
  },
  created() {
    this.fetchData()

  },
  methods: {
    fetchData() {
      this.listLoading = true
      let formData = {
        name: '',
        categories: [],
        status: 0
      }
      getCategory().then(data => {
        this.categorys = data
      })
      getProductByQuery(formData)
        .then(data => {
          this.list = data
          this.listLoading = false
        })
    },

    handleCheckAllChange(val) {
      this.checkedCategory = val ? this.getCategoryIds() : []
      this.isIndeterminate = false
    },
    getCategoryIds() {
      let ids = []
      this.categorys.forEach(item =>ids.push(item.productCategoryId))
      return ids
    },
    handlecheckedCategoryChange(value) {
      console.log(this.checkedCategory)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.categorys.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.categorys.length
    },

    /**
     * 添加商品
     */
    addProduct() {
      this.$router.push('/product/addProduct')
    },

    /**
     * 查看产品详情
     */
    toProductInfo(productId) {
      this.$router.push(`/product/productInfo/${productId}`)
    },

    /**
     * 搜索
     */
    search() {
      // 构造表单数据

      let categorys = []
      // 查询对象
      let formData = {
        name: '',
        categories: [],
        status: 0
      }

      this.listLoading = true

      const checkedLength =  this.checkedCategory.length
      // 把全选或者不选都归为 获取全部分类
      if ( checkedLength > 0 && checkedLength < this.categorys.length) {
        this.checkedCategory.forEach(item => categorys.push({'productCategoryId': item}))
        formData.categories = categorys
      }

      if ('' != this.input.trim()) {
        formData.name = this.input
      }

      if ('' != this.select) {
        formData.status = this.select
      }

      getProductByQuery(formData)
        .then(data => {
          this.list = data
          this.listLoading = false
        })

    }

  },

}
</script>

<style scoped>
  .app-container {
    background: #eee;
  }
  .menu {
    background: #fff;
    padding: 20px;
    margin-bottom: 10px;
  }


  .classify {
    width: 100px;
  }

  .input-with-select {
    background-color: #fff;
    width: 500px;
    margin: 20px 0;
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
    text-align: left;
    margin: 15px 0;
  }

  .tag {
    background-color: #ffe98a;
    color: #888888;
    padding: 2px 5px;
    border-radius: 3px;
    margin-right: 3px;
  }
</style>
