<template>
  <div>
    <div v-for="(item, index) in  tagList" :key="index" style="display: inline-block;margin-right: 10px;">
      <span class="el-tag el-tag--light">
        {{ item.name }}
        <i class="el-icon-edit el-tag__edit" v-on:click="editTag(item, index)"></i>
        <i class="el-tag__close el-icon-close" v-on:click="removeTag(item, index)"></i>
      </span>
    </div>

    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
import {confirm, success, info, dialogInput} from '@/utils/dialog'

export default {
  props: {
    tagList: Array,
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    editTag(item, index) {

      dialogInput('提示', '编辑标签', item.name)
        .then(({ value }) => {
          this.$emit('onEditTag', item, value, index)
        })
        .catch(() => {
          info('取消编辑')
        })

      // confirm('提示', '确定要编辑吗?')
      //   .then(() => {
      //     this.$emit('onEditTag', item)
      //   })
      //   .catch(() => {
      //     info('取消编辑')
      //   })
    },
    removeTag(item, index) {
      confirm('提示', `确定要删除分类[${item.name}]吗?`)
        .then(() => {
          this.$emit('onDeleteTag', item, index)
        })
        .catch(() => {
          info('取消删除')
        })
    },
    handleClose(tag) {
      this.tagList.splice(this.tagList.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        // this.tagList.push(inputValue);
        this.$emit('onInsertTag', inputValue)
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-edit {
  border-radius: 50%;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  vertical-align: middle;
  top: -1px;
  right: -5px;
}

.el-tag__edit:hover {
  color: #FFF;
  background-color: #409eff;
}
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
