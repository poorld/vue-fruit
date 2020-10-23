<template>
  <div>
    <el-dialog title="关联幻灯片" :visible.sync="dialogTableVisible">
      <el-table :data="bannerData">
        <el-table-column property="bannerId" label="ID" width="100"></el-table-column>
        <el-table-column property="productId" label="关联产品ID" width="100"></el-table-column>
        <el-table-column label="幻灯片" align="center">
          <template slot-scope="scope" align="center">
            <el-image
              style="width: 234px; height: 100px"
              :src="scope.row.image"
              fit="contain"></el-image>
            <!-- <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.image"></el-avatar> -->
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="associated(scope.row)" type="text" size="small">关联</el-button>
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners } from '@/api/banner'
export default {
  data() {
    return {
      bannerData: [],
      dialogTableVisible: false
    }
  },

  methods: {
    showDialog() {
      this.dialogTableVisible = true
    },

    associated(banner) {
      this.$emit('onAssociated', banner)
    },

    initData() {
      this.dialogTableVisible = false
      getBanners()
        .then(data => {
          this.bannerData = data
        })
    }
  },

  created() {
    this.initData()
  }
}
</script>

<style>

</style>
