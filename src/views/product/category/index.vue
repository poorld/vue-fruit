<template>
  <div class="app-container">
    <!-- <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" /> -->

    <!-- <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    /> -->

    <div style="margin-bottom: 10px;">
      <span style="font-size: 13px;color: #8c8c8c;">分类数：{{dynamicTags.length}}</span>
    </div>

    <edit-tag :tagList="dynamicTags" @onEditTag="onEditTag" @onDeleteTag="onDeleteTag" @onInsertTag="onInsertTag">
    </edit-tag>

  </div>
</template>

<script>
import EditTag from './components/EditTag/index.vue'
import { getCategory, addCategory, updateCategory, deleteCategory } from '@/api/category'

export default {
  data() {
    return {
      filterText: '',
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },

  methods: {
    // 编辑
    onEditTag(item, value, index) {
      console.log(item, value)
      if (value) {
        item.name = value
        updateCategory(item)
          .then(res => {
            this.dynamicTags.splice(index, 1, res)
          })
      }
    },

    // 删除
    onDeleteTag(item, index) {
      console.log(item)
      deleteCategory(item)
        .then(res => {
          this.dynamicTags.splice(index, 1)
        })
    },

    // 添加
    onInsertTag(value) {
      console.log('onInsertTag', value)
      addCategory({ 'name': value } )
        .then(res => {
          this.dynamicTags.push(res)
        })
    }
  },

  created() {
    getCategory()
      .then(res => {
        this.dynamicTags = res
      })
  },

  components: {
    EditTag
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>
