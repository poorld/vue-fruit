//                    _oo0oo_
//                   o8888888o
//                   88" . "88
//                   (| -_- |)
//                   0\  =  /0
//                 ___/`---'\___
//               .' \\|     |// '.
//              / \\|||  :  |||// \
//             / _||||| -:- |||||- \
//            |   | \\\  -  /// |   |
//            | \_|  ''\---/''  |_/ |
//            \  .-\__  '-'  ___/-. /
//          ___'. .'  /--.--\  `. .'___
//       ."" '<  `.___\_<|>_/___.' >' "".
//      | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//      \  \ `_.   \_ __\ /__ _/   .-` /  /
//  =====`-.____`.___ \_____/___.-`___.-'=====
//                    `=---='


//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//             菩提本无树      明镜亦非台
//             本来无BUG      何必常修改
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
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select
              v-model="form.productCategory.productCategoryId"
              placeholder="请选择商品分类"
            >
              <el-option
                v-for="item in productCategory"
                :key="item.value"
                :label="item.name"
                :value="item.productCategoryId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input
              type="textarea"
              v-model="form.explain"
            ></el-input>
          </el-form-item>

          <el-form-item label="价格">
            <el-input
              type="number"
              placeholder="请输入内容"
              v-model="form.shopPrice"
              style="width: 40%;"
            >
              <template slot="prepend">市场价格</template>
            </el-input>
            <el-input
              type="number"
              placeholder="请输入内容"
              v-model="form.price"
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
        <!-- <span class="item-title">添加规格</span> -->
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
        <!-- action="http://localhost:9000/api/app/file/upload" -->
        <!-- :http-request="uploadImg" -->
        <el-upload
          name="file"
          action=""
          :limit="1"
          :http-request="uploadCoverImg"
          list-type="picture-card"
          :before-upload="beforeCoverUpload"
          :on-success="handleCoverSuccess"
          :on-preview="handleCoverPreview"
          :on-remove="handleCoverRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="CoverImgVisible">
          <img
            width="100%"
            :src="coverImageUrl"
            alt=""
          >
        </el-dialog>
      </div>

      <div class="text item">
        <span class="item-title">商品详情（用于展示幻灯片，最多上传6张）</span>
        <el-upload
          action="http://localhost:9000/api/app/file/upload"
          list-type="picture-card"
          :limit="6"
          :on-success="handleBannerSuccess"
          :on-preview="handleBannerPreview"
          :on-remove="handleBannerRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="bannerVisible">
          <img width="100%" :src="bannerImageUrl" alt="">
        </el-dialog>

      </div>

      <div class="text item">
        <span class="item-title">水果介绍（用于水果详情）</span>
        <el-upload
          class="upload-demo"
          action="http://localhost:9000/api/app/file/upload"
          :on-success="handleInfoSuccess"
          :on-remove="handleInfoRemove"
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
            <el-checkbox-group v-model="checkMDiscountList">
              <el-checkbox
                v-for="item in memberDiscounts"
                :key="item.discountsId"
                :label="item.discountsId">
                {{item.discountsExplain}}
              </el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="用户优惠" name="2">
            <el-checkbox-group v-model="checkUDiscountList">
              <el-checkbox
                v-for="item in userDiscounts"
                :key="item.discountsId"
                :label="item.discountsId">
                {{item.discountsExplain}}
              </el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="上线板块" name="3">
            <div>新品上市：设计简洁直观的操作流程；</div>
            <div>热销水果：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>限时抢购：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            <div>每日精选：设计简洁直观的操作流程；</div>
            <el-checkbox-group v-model="checkMDiscountList">
              <el-checkbox label="新品上市" disabled></el-checkbox>
              <el-checkbox label="热销水果"></el-checkbox>
              <el-checkbox label="限时抢购" disabled></el-checkbox>
              <el-checkbox label="每日精选"></el-checkbox>
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
          <el-checkbox-group v-model="checkTagList">
            <el-checkbox
                v-for="item in tags"
                :key="item.tagId"
                :label="item.tagId">
                {{item.name}}
              </el-checkbox>
          </el-checkbox-group>

      </div>
    </el-card>

    <el-row style="margin: 0 auto;margin-top: 20px;text-align: center;">
      <el-button type="primary" @click="add" round>提交表单</el-button>
    </el-row>
  </div>
</template>

<script>
import EditTag from './components/EditTag/index.vue'
import { uploadImage } from '@/api/common'
import { getCategory } from '@/api/category'
import { getUserDiscounts, getMemberDiscounts } from '@/api/discounts'
import { getTags } from '@/api/tag'
import { info } from '@/utils/dialog'
export default {
  data() {
    return {
      form: {
        name: '',
        productCategory: {
          productCategoryId: ''
        },
        explain: '',
        shopPrice: '',
        price: '',

        spec: [],

        // 封面
        defaultImg: '',
        // 商品幻灯片 与bannerImageList关联
        productBannerImages: [],
        // 商品介绍 与infoImageList管理
        productInfoImages: [],

        // 优惠
        discounts: [],

        // 标签
        tags: []

      },
      // 商品封面
      coverImageUrl: '',
      CoverImgVisible: false,
      // 商品详情
      bannerVisible: false,
      bannerImageUrl: '',
      // 用于保存幻灯片图片地址，与表单关联
      bannerImageList: [],

      // 用于保存介绍图片地址，与表单关联
      infoImageList: [],
      disabled: false,
      // 水果介绍
      fileList: [],

      //规格
      dynamicTags: [],
      activeNames: ['1'],

      // 选中会员优惠
      checkMDiscountList: [],
      // 选中用户优惠
      checkUDiscountList: [],
      // 选中标签
      checkTagList: [],

      // 会员优惠列表
      memberDiscounts: [],
      // 用户优惠列表
      userDiscounts: [],
      // 标签列表
      tags: [],
      // 分类
      productCategory: [],

      // 推荐
      checked: true

    };
  },
  components: {
    EditTag,
  },

  methods: {
    handleCoverSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeBannerUpload(file) {
      console.log(file)
    },
    beforeCoverUpload(file) {
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

    // 封面
    handleCoverRemove(file) {
      this.form.defaultImg = null
    },
    handleCoverPreview(file) {
      this.coverImageUrl = file.url;
      this.CoverImgVisible = true;
    },

    // 幻灯片
    handleBannerPreview(file) {
      this.bannerImageUrl = file.url
      this.CoverImgVisible = true
    },
    handleBannerSuccess(response, file, fileList) {
      this.bannerImageList = fileList
    },
    handleBannerRemove(file, fileList) {
      console.log(fileList)
      this.bannerImageList = fileList
    },

    // 介绍
    handleInfoSuccess(response, file, fileList) {
      this.infoImageList = fileList
    },
    handleInfoRemove(file, fileList) {
      this.infoImageList = fileList
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
      this.dynamicTags.push(value)
      // addCategory({ name: value }).then((res) => {
      //   this.dynamicTags.push(res)
      // });
    },

    handleChange() {

    },

    uploadCoverImg(fileObj) {
      uploadImage(fileObj)
        .then(data => {
          this.form.defaultImg = data.fileDownloadUrl
        })

    },

    add() {
      this.form.spec = Object.assign(this.form.spec, this.dynamicTags)
      let banners = []
      let infos = []
      this.bannerImageList.forEach(item => {
        let banner = {
          url: item.response.data.fileDownloadUrl
        }
        banners.push(banner)
      })
      this.infoImageList.forEach(item => {
        let info = {
          url: item.response.data.fileDownloadUrl
        }
        infos.push(info)
      })
      this.form.productBannerImages = Object.assign(this.form.productBannerImages, banners)
      this.form.productInfoImages = Object.assign(this.form.productInfoImages, infos)
      console.log(this.form)
    },

    initData() {
      getCategory()
        .then(data => {
          this.productCategory = data
        })

      getMemberDiscounts()
        .then(data => {
          this.memberDiscounts = data
        })
      getUserDiscounts()
        .then(data => {
          this.userDiscounts = data
        })
      getTags()
        .then(data => {
          this.tags = data
        })
    }
  },

  created() {
    this.initData()
  }
}
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
