<template>
  <div class="app-container">
    <div v-for="product in products" :key="product.productId">
      <div class="product-body">

       <div class="product-name">
          <el-image
          style="width: 100px; height: 100px"
          :src="product.defaultImg"
          fit="fill">
        </el-image>
        {{product.name}}
       </div>

        <div v-for="spec in product.spec" :key="spec.specId" class="inventory">
          {{spec.specName}}/{{spec.sku.attrbute}} 库存：{{spec.quantity}}{{spec.sku.attrbute}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts } from '@/api/product'

export default {
  data() {
    return {
      products: []
    }
  },
  methods: {
    init() {
      getProducts().then(data => {
        this.products = data
      })
    }
  },

  created() {
    this.init()
  }
}
</script>

<style scoped>
 .product-body {
  padding: 20px 30px;
  box-shadow: 0 0 5px rgba(202,203,203,0.5);
  -webkit-box-shadow: 0 0 5px rgba(202,203,203,0.5);
  -moz-box-shadow: 0 0 5px rgba(202,203,204,0.5);
  margin: 10px;
 }

 .product-name {
  display: flex;
  align-items: center;
 }
 .inventory {
   color: #696969;
   margin-top: 5px;
 }
</style>
