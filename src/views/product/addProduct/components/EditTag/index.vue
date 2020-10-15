<template>
  <div>
    <div v-for="(item, index) in tagList" :key="index" style="display: inline-block;margin-right: 10px;">
      <el-tooltip class="item" effect="dark" :content="specContent(item)" placement="top">
        <span class="el-tag el-tag--light">
          {{ item.specName }}（{{ item.sku.attrbute }}）
          <i class="el-icon-edit el-tag__edit" v-on:click="editTag(item, index)"></i>
          <i class="el-tag__close el-icon-close" v-on:click="removeTag(item, index)"></i>
        </span>
      </el-tooltip>
    </div>

    <el-button class="button-new-tag" size="small" @click="showInput">+ 添加规格</el-button>


    <el-dialog
      title="添加规格"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <span style="margin-left: 20px;font-size: 13px;">请设置一个规格名称（比如：小果）</span>
      <el-form style="margin-top: 10px" :model="spec" :rules="rules" ref="spec" label-width="100px" class="demo-ruleForm">
        <el-form-item label="规格名称" prop="specName">
          <el-input v-model="spec.specName"></el-input>
        </el-form-item>

        <el-form-item label="SKU" prop="attrbute">
          <el-radio-group v-model="spec.sku.attrbute" size="mini" @change="skuChange">
            <el-radio-button
              v-for="item in skus"
              :label="item.attrbute"
              :key="item.skuId">
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="库存" prop="quantity">
          <el-input v-model.number="spec.quantity">
            <template slot="append">{{ spec.sku.attrbute }}</template>
          </el-input>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input v-model="spec.price">
             <template slot="append">元/{{ spec.sku.attrbute }}</template>
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('spec')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { confirm, success, info, dialogInput } from '@/utils/dialog'
import { getSku } from '@/api/sku'

export default {
  props: {
    tagList: Array,
  },
  computed: {
    specContent: function() {
      return function(item) {
        return `价格:${item.price}（元/${item.sku.attrbute}）| 库存：${item.quantity} ${item.sku.attrbute}`
      }
    }
  },
  data() {
    return {
      skus: [],
      centerDialogVisible: false,
      spec: {
        specName:'',
        price: '',
        quantity: '',
        sku:{
            skuId: '',
            attrbute:''
        }
      },
      rules: {
        // specName: [
        //   { required: true, message: '请输入规格名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // attrbute: [
        //   { required: true, message: '请选择规格属性', trigger: 'change' }
        // ],
        // quantity: [
        //   { required: true, message: '请输入库存', trigger: 'blur' },
        //   { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        // ],
        // price: [
        //   { required: true, message: '请输入价格', trigger: 'blur' },
        //   { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    editTag(item, index) {

      // dialogInput('提示', '编辑标签', item.name)
      //   .then(({ value }) => {
      //     this.$emit('onEditTag', item, value, index)
      //   })
      //   .catch(() => {
      //     info('取消编辑')
      //   })

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


    // handleDialogConfirm() {
    //   console.log(this.spec)
    // },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$emit('onInsertTag', Object.assign({}, this.spec))
          // 简单粗暴的对象深拷贝
          this.$emit('onInsertTag', JSON.parse(JSON.stringify(this.spec)))
          this.centerDialogVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    skuChange(label) {
      if(!label)
        return

      this.spec.sku.attrbute = label
      this.spec.sku.skuId = this.skus.find( item => {
        return item.attrbute === label
      }).skuId
    }
  },

  created() {
    getSku()
      .then(data => {
        this.skus = data
        if (data.length > 0) {
          this.spec.sku.skuId = data[0].skuId
          this.spec.sku.attrbute = data[0].attrbute
        }
      })
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
