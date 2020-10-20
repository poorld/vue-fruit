<template>
  <div>
    <el-dialog
      title="商品信息修改"
      :visible.sync="dialogVisible"
      width="650px"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
      >
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select
            style="width: 100%;"
            v-model="form.productCategory.productCategoryId"
            placeholder="请选择商品分类"
          >
            <el-option
              v-for="item in productCategory"
              :key="item.value"
              :label="item.name"
              :value="item.productCategoryId"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input
            type="number"
            placeholder="请输入内容"
            v-model="form.shopPrice"
            style="width: 100%;"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="售卖价格">
          <el-input
            type="number"
            placeholder="请输入内容"
            v-model="form.price"
            style="width: 100%;"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input
            type="textarea"
            v-model="form.explain"
          ></el-input>
        </el-form-item>


      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="formConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory } from '@/api/category'
import { updateProduct } from '@/api/product'
export default {
  // props: {
  //   fruit: Object
  // },
  data() {
    return {
      dialogVisible: false,
      productCategory: [],
      fruit: {},
      form: {
        name: '',
        explain: '',
        shopPrice: '',
        price: '',
        productCategory: {
          productCategoryId: ''
        }
      },
    }
  },
  methods: {
    showDialog(fruit) {
      console.log(fruit)
      this.form = fruit
      this.dialogVisible = true
    },

    handleClose() {

    },

    formConfirm() {
      console.log(this.form)
    }
  },
  created() {
    getCategory().then(data => {
      this.productCategory = data
    })
  }
}
</script>

<style scoped>
</style>
