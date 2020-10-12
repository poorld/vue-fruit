<template>
  <div>
    <div v-for="(item, index) in  tagList" :key="index" style="display: inline-block;margin-right: 10px;">
      <el-tooltip class="item" effect="dark" content="价格:37.2（斤）| 库存：52 " placement="top">
        <span class="el-tag el-tag--light">
          {{ item }}
          <i class="el-icon-edit el-tag__edit" v-on:click="editTag(item, index)"></i>
          <i class="el-tag__close el-icon-close" v-on:click="removeTag(item, index)"></i>
        </span>
      </el-tooltip>
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


    <el-dialog
      title="添加规格"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <span style="margin-left: 20px;font-size: 13px;">请设置一个规格名称（比如：小果）</span>
      <el-form style="margin-top: 10px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性质" prop="attr">
          <el-radio-group v-model="ruleForm.attr">
            <el-radio label="斤"></el-radio>
            <el-radio label="箱"></el-radio>
            <el-radio label="盒"></el-radio>
            <el-radio label="包"></el-radio>
            <el-radio label="袋"></el-radio>
            <el-radio label="罐"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="库存" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="价格" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      inputValue: '',
      centerDialogVisible: false,
      ruleForm: {
        name: '',
        resource: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入规格名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        attr:[
          { required: true, message: '请选择规格属性', trigger: 'change' }
        ],
      }
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
      // this.inputVisible = true;
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // });
      this.centerDialogVisible = true
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.centerDialogVisible = true
        // this.tagList.push(inputValue);
        this.$emit('onInsertTag', inputValue)
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
