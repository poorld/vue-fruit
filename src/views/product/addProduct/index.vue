<template>
  <div class="app-container">
    <!-- <div class="box info-base">
      基础信息
    </div> -->

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>基础信息</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text item">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="商品名称">
            <el-input v-model="form.productName"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select
              v-model="form.region"
              placeholder="请选择活动区域"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input
              type="textarea"
              v-model="form.desc"
            ></el-input>
          </el-form-item>

          <el-form-item label="封面价格">
            <el-input
              type="number"
              placeholder="请输入内容"
              v-model="form.date1"
              style="width: 40%;"
            >
              <template slot="prepend">市场价格</template>
            </el-input>
            <el-input
              type="number"
              placeholder="请输入内容"
              v-model="form.date2"
              style="width: 40%;float: right;"
            >
              <template slot="prepend">售卖价格</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>商品规格</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text item">
        <span class="item-title">添加规格</span>
        <div>
          <edit-tag
            :tagList="dynamicTags"
            @onEditTag="onEditTag"
            @onDeleteTag="onDeleteTag"
            @onInsertTag="onInsertTag"
          />
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>图片信息</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text item">
        <span class="item-title">商品封面（最多上传1张）</span>
        <el-upload
          action="http://localhost:9000/api/app/file/upload"
          name="file"
          list-type="picture-card"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
      </div>

      <div class="text item">
        <span class="item-title">商品详情（用于展示幻灯片，最多上传6张）</span>
        <el-upload
          action="http://localhost:9000/api/app/file/upload"
          list-type="picture-card"
          :auto-upload="false"
        >
          <i
            slot="default"
            class="el-icon-plus"
          ></i>
          <div
            slot="file"
            slot-scope="{file}"
          >
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="detailVisible">
          <img
            width="100%"
            :src="detailImageUrl"
            alt=""
          >
        </el-dialog>
      </div>

      <div class="text item">
        <span class="item-title">水果介绍（用于水果详情，最多上传6张）</span>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-card>


    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>优惠活动</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text item">
        <!-- <span class="item-title">参与活动</span> -->
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="会员优惠" name="1">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="禁用" disabled></el-checkbox>
              <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="用户优惠" name="2">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="禁用" disabled></el-checkbox>
              <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="上线板块" name="3">
            <div>新品上市：设计简洁直观的操作流程；</div>
            <div>热销水果：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>限时抢购：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            <div>每日精选：设计简洁直观的操作流程；</div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="禁用" disabled></el-checkbox>
              <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>

        </el-collapse>
      </div>
    </el-card>

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>展示标签</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text item">
        <span class="item-title">是否在封面添加推荐标签</span>
          <br />
          <el-checkbox v-model="checked">推荐</el-checkbox>
      </div>

       <div class="text item">
        <span class="item-title">商品携带标签</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="产地直销"></el-checkbox>
            <el-checkbox label="会员优惠"></el-checkbox>
            <el-checkbox label="限时优惠"></el-checkbox>
            <el-checkbox label="新品上市" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
          </el-checkbox-group>

      </div>
    </el-card>
  </div>
</template>

<script>
import EditTag from "./components/EditTag/index.vue";

export default {
  data() {
    return {
      form: {},
      // 商品封面
      dialogImageUrl: "",
      dialogVisible: false,
      // 商品详情
      detailVisible: false,
      detailImageUrl: "",
      disabled: false,
      // 水果介绍
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],

      //规格
      dynamicTags: ["标签一", "标签二", "标签三"],
      activeNames: ['1'],

      // 会员优惠
      checkList: [],

      // 推荐
      checked: true

    };
  },
  components: {
    EditTag,
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    handlePreview(file) {
      console.log(file);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 编辑
    onEditTag(item, value, index) {
      console.log(item, value);
      if (value) {
        item.name = value;
        updateCategory(item).then((res) => {
          this.dynamicTags.splice(index, 1, res)
        });
      }
    },

    // 删除
    onDeleteTag(item, index) {
      console.log(item);
      deleteCategory(item).then((res) => {
        this.dynamicTags.splice(index, 1);
      });
    },

    // 添加
    onInsertTag(value) {
      console.log("onInsertTag", value);
      addCategory({ name: value }).then((res) => {
        this.dynamicTags.push(res)
      });
    },

    handleChange() {

    }
  },
};
</script>

<style scoped>
.app-container {
  background-color: #f7f7f7;
}

.box {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  /* // width: 480px; */
  margin-top: 15px;
}

.item-title {
  margin-top: 15px;
}
</style>
