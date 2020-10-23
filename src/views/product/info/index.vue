<template>
  <div class="app-container">
    <div class="item-box">
      <el-row>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="product.defaultImg"
              height="300px"
              class="image"
              @click="updateDefaultImg"
            >
            <div style="padding: 14px;">
              <span>{{ product.name }}</span>
              <span class="price">
                <span>{{ product.shopPrice }}</span>
                <span>{{ product.price }}</span>
              </span>
              <div class="bottom clearfix">
                <time class="time">{{ product.explain }}</time>
                <el-button
                  type="text"
                  class="button"
                  @click="baseInfoEdit"
                >更改</el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col
          :span="15"
          :offset="1"
        >
          <el-card :body-style="{ padding: '0px' }">
            <el-carousel
              trigger="click"
              height="300px"
              @change="onChange"
            >
              <el-carousel-item
                v-for="(item,index) in bannerList"
                :key="index"
                autoplay="false"
              >
                <h3
                  v-if="!item.url"
                  class="small"
                >{{ item }}</h3>
                <el-image
                  v-if="item.url"
                  :src="item.url"
                  fit="cover"
                ></el-image>
              </el-carousel-item>
            </el-carousel>
            <div style="padding: 14px;">
              <span>水果幻灯片</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button
                  type="text"
                  class="button"
                  fit="fill"
                  @click="changeBanner()"
                >更改</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="item-box">
      <el-row>
        <el-col :span="8">
          <el-card shadow="hover">
            商品分类: <el-tag type="success">{{ product.productCategory.name }}</el-tag>
            <!-- <el-button type="text" class="button" style="line-height: 32px;">更改</el-button> -->
          </el-card>
        </el-col>

        <el-col
          :span="15"
          :offset="1"
        >
          <el-card shadow="hover">
            商品规格:
            <edit-tag
              :tagList="dynamicTags"
              @onEditTag="onEditTag"
              @onDeleteTag="onDeleteTag"
              @onInsertTag="onInsertTag"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div
      class="item-box"
      style="min-height: 500px;"
    >

      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          label="商品介绍"
          name="first"
        >
          <div class="demo-image__lazy">
            <el-image
              v-for="(item,index) in product.productInfoImages"
              :key="index"
              :src="item.url"
            ></el-image>
            <el-alert
              v-if="product && product.productInfoImages && product.productInfoImages.length === 0"
              title="您暂时没有商品简介图片哦！点击图片编辑添加图片！！！"
              type="error"
              effect="dark">
            </el-alert>
          </div>
        </el-tab-pane>

        <el-tab-pane
          label="图片编辑"
          name="second"
        >
          <el-card shadow="hover">
            <draggable
              :list="product.productInfoImages"
              class="list-group"
              draggable=".item"
              ghost-class="ghost"
              :animation="200"
              :move="checkMove"
              @start="draggableStart"
              @end="draggableEnd"
            >
              <div
                class="list-group-item item"
                v-for="(item, index) in product.productInfoImages"
                :key="index"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.url"
                  fit="fill"
                >
                </el-image>

                <span class="img-order">排序序号：{{ index }}</span>

                <div style="flex: 1;text-align: right;">
                  <el-button
                    type="warning"
                    size="mini"
                    @click="updateInfoImage(item, index)"
                    round
                  >修改图片</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="deleteInfoImage(item, index)"
                    round
                  >删除图片</el-button>
                </div>
              </div>
              <div
                slot="footer"
                class="btn-group list-group-item"
                role="group"
                aria-label="Basic example"
                key="footer"
                style="text-align: right;margin: 30px 0px;"
              >
                <el-button
                  type="success"
                  size="mini"
                  @click="addInfoImage"
                  round
                >添加图片</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="saveInfoSort"
                  round
                >保存序号</el-button>
              </div>
            </draggable>
          </el-card>
        </el-tab-pane>

        <el-tab-pane
          label="用户优惠"
          name="third"
        >
          <!-- <el-transfer v-model="memberDiscountsValue" :data="memberDiscounts"></el-transfer> -->
          <el-transfer
            v-model="userDiscountsValue"
            :data="userDiscounts"
            :titles="['未参与优惠', '已参与优惠']"
            :button-texts="['取消优惠', '参与优惠']"
          >
            <span slot-scope="{ option }">{{ option.label }}
            </span>
          </el-transfer>
          <el-button
            type="warning"
            size="mini"
            @click="setUserDiscounts"
            style="margin-left: 50px;"
            round
          >修改优惠</el-button>
        </el-tab-pane>

        <el-tab-pane
          label="会员优惠"
          name="fourth"
        >
          <el-transfer
            v-model="memberDiscountsValue"
            :data="memberDiscounts"
            :titles="['未参与优惠', '已参与优惠']"
            :button-texts="['取消优惠', '参与优惠']"
          >
            <span slot-scope="{ option }">{{ option.label }}
            </span>
          </el-transfer>
          <el-button
            type="warning"
            size="mini"
            @click="setMembersDiscounts"
            style="margin-left: 50px;"
            round
          >修改优惠</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>



    <el-row>
      <el-card class="box-card">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            title="展示标签"
            name="1"
          >
            <div class="text">
              <span class="item-title">是否在封面添加推荐标签</span>
              <br />
              <el-checkbox v-model="checked">推荐</el-checkbox>
            </div>

            <div class="text">
              <span class="item-title">商品携带标签</span>
              <el-checkbox-group v-model="checkTagList">
                <el-checkbox
                  v-for="item in tags"
                  :key="item.tagId"
                  :label="item.tagId"
                >
                  {{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div style="text-align: right;padding-right: 30px;">
              <el-button
                    type="info"
                    size="mini"
                    @click="updateTags"
                    round
                  >修改</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="上线板块"
            name="3"
          >
            <div><svg-icon icon-class="tick" />新品上市：设计简洁直观的操作流程；</div>
            <div><svg-icon icon-class="tick" />热销水果：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>限时抢购：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            <div>每日精选：设计简洁直观的操作流程；</div>
            <br />
            <div><svg-icon icon-class="time" />产品创建时间: {{product.createTime}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-row>

    <!-- 修改基础信息弹窗 -->
    <info-edit ref="baseInfoDialog" @onUpdate="onUpdate" />

    <!-- 图片上传 -->
    <image-upload :limit="1" @onLink="onLink" ref="bannerUploadDialog"/>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import infoEdit from './components/InfoEdit/index.vue'
import ImageUpload from './components/ImageUpload/index.vue'
import EditTag from './components/EditTag/index.vue'
import { getTags } from '@/api/tag'
import { Loading } from 'element-ui'
import { confirm, info, success } from '@/utils/dialog'

import { getUserDiscounts, getMemberDiscounts } from '@/api/discounts'
import { getProductById, updateProduct } from '@/api/product'
import { addProductBanner, updateProductBanner } from '@/api/productBanner'
import { addSpec, updateSpec, deleteSpec } from '@/api/spec'
import { addProductInfo, updateProductInfo, deleteProductInfo, updateInfoSort } from '@/api/productInfo'
import { updateProductTag } from '@/api/productTag'
import { updateUserDiscounts, updateMemberDiscounts } from '@/api/productDiscounts'

export default {
  computed: {
    specContent: function() {
      return function(item) {
        return `价格:${item.price}（元/${item.sku.attrbute}）| 库存：${item.quantity} ${item.sku.attrbute}`
      }
    }
  },
  data() {
    return {
      enabled: true,
      currentDate: new Date(),
      // 幻灯片下标
      bannerIndex: 0,
      // 用于控制bannerIndex是否改变
      bannerIndexFlag: false,
      /**
       * 上传标记
       * 0修改商品封面
       * 1添加幻灯片
       * 2修改幻灯片
       * 3添加商品介绍图片
       * 4修改商品介绍图片
       */
      uploadFlag: 0,
      // dialog修改表单
      fruitForm: {
        productId: '',
        name: '',
        explain: '',
        shopPrice: '',
        price: '',
        productCategory: {
          productCategoryId: ''
        }
      },

      // 商品信息绑定
      product: {
        name: '',
        defaultImg: '',
        productCategory: {
          name: ''
        }
      },
      // 商品规格
      dynamicTags: [],
      // 会员优惠
      memberDiscounts: [],
      // 选中会员优惠
      memberDiscountsValue: [],
      // 用户优惠
      userDiscounts: [],
      // 选中用户优惠
      userDiscountsValue: [],
      // 商品标签
      tags: [],
      activeNames: ['1'],
      checked: false,
      // 选中的商品标签
      checkTagList: [],
      // 幻灯片数量
      bannerCount: 5,
      // 幻灯片列表
      bannerList: [],
      dragging: false,
      activeName: "first",
      componentData: {
        props: {
          type: "transition",
          url: "flip-list",
        },
      },

      // -----暂时变量-----
      // 商家介绍图片信息
      tempInfoImages: {},
      // 商家介绍图片下标
      tempInfoImagesIndex: 0
    }
  },

  methods: {
    // renderFunc(h, option) {
    //   return <span>{ option.discountsExplain } - { option.discountsExplain }</span>;
    // },

    onChange(index) {
      if (!this.bannerIndexFlag) {
        this.bannerIndex = index
      }
    },

    checkMove: function(e, originalEvent) {
      // console.log(e)
      console.log('Future index: ' + e.draggedContext.futureIndex)
    },
    draggableStart() {},
    /**
     * 图片拖动完成
     */
    draggableEnd(customEvent) {
      // console.log(customEvent)
      this.infoImageOrder()
    },
    // 图片排序
    infoImageOrder() {
      console.log('product',this.product)
      if (this.product && this.product.productInfoImages) {
        const length = this.product.productInfoImages.length
        for (let index = 0; index < length; index++) {
          this.product.productInfoImages[index].sort = index
        }
        return this.product.productInfoImages
      }

    },
    /**
     * 添加商品介绍图片
     */
    addInfoImage() {
      this.uploadFlag = 3
      this.$refs.bannerUploadDialog.showTypeDialog()
    },

    /**
     * 修改商品介绍图片
     */
    updateInfoImage(item, index) {
      this.uploadFlag = 4
      this.tempInfoImages = JSON.parse(JSON.stringify(item))
      this.tempInfoImagesIndex = index
      this.$refs.bannerUploadDialog.showTypeDialog()
    },
    /**
     * 删除商品介绍图片
     */
    deleteInfoImage(item, index) {
      confirm('提示', `确定要删除序号为[${index}]的图片吗?`)
        .then(() => {
          deleteProductInfo(item.piiId).then(data => {
            this.product.productInfoImages.splice(index, 1)
          })
        })
        .catch(() => {
          info('取消删除')
        })
    },
    /**
     * 保存序号
     */
    saveInfoSort() {
      const productInfoImages = this.infoImageOrder()
      confirm('提示', `确定要根据序号排序图片吗?`)
        .then(() => {
          updateInfoSort(productInfoImages).then(data => {
            success('排序成功！')
          })
        })
        .catch(() => {
          info('取消排序')
        })
    },

    /**
     * 上传封面
     */
    updateDefaultImg() {
      this.uploadFlag = 0
      this.$refs.bannerUploadDialog.showTypeDialog()
    },

    /**
     * 修改幻灯片
     */
    changeBanner() {
      this.bannerIndexFlag = true
      const banner = this.bannerList[this.bannerIndex]
      const isObj = Object.prototype.toString.call(banner) === '[Object Object]'
      if (typeof banner === 'object') {
        // 修改幻灯片 2
        // this.bannerUpdate = true
        this.uploadFlag = 2
      } else {
        // 添加幻灯片1
        // this.bannerUpdate = false
        this.uploadFlag = 1
      }
      this.$refs.bannerUploadDialog.showTypeDialog()

      // array.splie(...)

    },

    /**
     * 基础信息修改，弹出Dialog
     */
    baseInfoEdit() {
      // let cloneObj = {}
      // Object.assign(cloneObj, this.fruitForm)
      // console.log(this.fruitForm)
      this.$refs.baseInfoDialog.showDialog(this.fruitForm)
    },

    // 基础信息修改完成，更新product信息
    onUpdate(data) {
      Object.assign(this.product, data)
    },
    // 修改标签
    updateTags() {
      const id = this.product.productId
      // 推荐标签
      if (null !== this.checked) {
        let formData = {
          productId: id,
          recommended: this.checked
        }
        updateProduct(formData)
          .then(data => {
            success('修改成功!')
          })
      }

      // 携带标签
      let tags = []
      this.checkTagList.forEach(e => tags.push({
        productId: id,
        tagId: e
      }))
      updateProductTag(tags, id)
        .then(data => {
          success('修改成功!')
        })
      console.log(this.checkTagList)
      console.log(this.checked)
      console.log(tags)
    },

    /**
     * 上传成功，获取链接
     * 上传标记
     * 0修改商品封面
     * 1添加幻灯片
     * 2修改幻灯片
     * 3添加商品介绍
     * 4修改商品介绍
     */
    onLink(imgLink) {
      // 更新
      switch(this.uploadFlag){

        /**
         * 0修改商品封面
         */
        case 0:
          const productFormData = {
            productId: this.product.productId,
            defaultImg: imgLink
          }
          updateProduct(productFormData).then(data => {
            this.product.defaultImg = imgLink
          })
          break

        /**
         * 1添加幻灯片
         */
        case 1:
          let formData = {
            productId: this.product.productId,
            url: imgLink
          }
          addProductBanner(formData).then(data => {
            this.bannerList.splice(this.bannerIndex, 1, data)
          }).finally(_ => {
            this.bannerIndexFlag = false
          })
          break

        /**
         * 2修改幻灯片
         */
        case 2:
          const banner = this.bannerList[this.bannerIndex]
          banner.url = imgLink
          updateProductBanner(banner).then(data => {
            this.bannerList.splice(this.bannerIndex, 1, data)
          }).finally(_ => {
            this.bannerIndexFlag = false
          })
          break

        /**
         * 3添加商品介绍
         */
        case 3:
          const infoImageForm = {
            productId: this.product.productId,
            url: imgLink
          }
          addProductInfo(infoImageForm).then(data => {
            this.product.productInfoImages.push(data)
          })
          break

        /**
         * 4修改商品介绍
         */
        case 4:
          // this.tempInfoImages = item
          // this.tempInfoImagesIndex = index
          this.tempInfoImages.url = imgLink
          updateProductInfo(this.tempInfoImages).then(data => {
            this.product.productInfoImages.splice(this.tempInfoImagesIndex, 1, data)
          })
          break
      }
    },

    // addSpec, updateSpec, deleteSpec
    // 编辑规格
    onEditTag(item, index) {
      // console.log(item, index)
      updateSpec(item).then(data => {
        this.dynamicTags.splice(index, 1, data)
      })
    },

    // 删除
    onDeleteTag(item, index) {
      console.log(item)
      deleteSpec(item.specId).then(data => {
        this.dynamicTags.splice(index, 1)
      })
    },

    // 添加规格
    onInsertTag(spec) {
      spec.productId = this.product.productId
      // console.log("onInsertTag", value)
      addSpec(spec).then(data => {
        /**
         * 这里push data而不是spec
         * 因为返回的data有新id值，而spec没有
         * 如果使用spec删除会出错，因为没有id值
         */
        this.dynamicTags.push(data)
      })

    },

    // 修改用户优惠
    setUserDiscounts() {
      // console.log(this.userDiscountsValue)
      const productId = this.product.productId
      updateUserDiscounts(this.setDiscountsFormData(this.userDiscountsValue), productId)
        .then(data => {
          success('修改成功!')
        })

    },

    setMembersDiscounts() {
      const productId = this.product.productId
      updateMemberDiscounts(this.setDiscountsFormData(this.memberDiscountsValue), productId)
        .then(data => {
          success('修改成功!')
        })
    },

    setDiscountsFormData(discountsValue) {
      let formData = []
      const productId = this.product.productId
      discountsValue.forEach(element => {
        formData.push({
          productId: productId,
          discountsId: element
        })
      })
      return formData
    },

    /**
     * 初始化数据
     */
    initData() {
      let loadingInstance = Loading.service({ fullscreen: true })

      // 使用setTimeout时，this指向的是window对象，这里先保存this对象
      let _this = this
      setTimeout(function() {
        const id = _this.$route.params.productId
        console.log(id)
        getProductById(id).then(data => {
          _this.product = data
          // _this.fruitForm = JSON.parse(JSON.stringify(data))
          // _this.fruitForm = Object.assign({}, _this.fruitForm, data)
          _this.fruitForm = (({
            productId,
            name,
            explain,
            shopPrice,
            price,
            productCategory: {
              productCategoryId
            }
          }) => ({
            productId,
            name,
            explain,
            shopPrice,
            price,
            productCategory: {
              productCategoryId
            }
          }))(data)

          // 规格
          _this.dynamicTags = data.spec
          _this.checked = data.recommended

          // 标签
          let productTags = []
          data.tags.forEach(e => productTags.push(e.tagId))
          _this.checkTagList = productTags
          // console.log(_this.fruitForm, '_this.fruitForm')

          // 优惠
          const discounts = data.discounts
          discounts.forEach(element => {
            if (element.members) {
              _this.memberDiscountsValue.push(element.discountsId)
            } else {
              _this.userDiscountsValue.push(element.discountsId)
            }
          })

          const banners = data.productBannerImages
          const length = _this.bannerCount - banners.length
          // 幻灯片数量不足用文字代替图片
          // console.log(length)
          for (let i = 0; i < length; i++) {
            banners.push("无幻灯片，请添加")
          }
          _this.bannerList = banners
        })
      }, 100)

      getMemberDiscounts().then((data) => {
        // this.memberDiscounts = data
        let discounts = []
        data.forEach((element) => {
          discounts.push({
            key: element.discountsId,
            label: element.discountsExplain,
            id: element.discountsId,
          })
        })
        this.memberDiscounts = discounts
      })

      getUserDiscounts().then((data) => {
        // this.userDiscounts = data
        let discounts = []
        data.forEach((element) => {
          discounts.push({
            key: element.discountsId,
            label: element.discountsExplain,
            id: element.discountsId,
          })
        })
        this.userDiscounts = discounts
      })

      getTags().then((data) => {
        this.tags = data

      }).finally((_) => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          setTimeout(function() {
            loadingInstance.close()
          },500)
        })
      })

    }

  },

  created() {
    this.initData()
  },

  components: {
    draggable,
    infoEdit,
    ImageUpload,
    EditTag
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.price {
  float: right;
}
.price span:nth-child(1) {
  text-decoration: line-through;
  font-size: 13px;
  color: #adadad;
}
.price span:nth-child(2) {
  font-size: 19px;
  color: #ff5353;
  margin-left: 10px;
}

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
  color: #fff;
  background-color: #409eff;
}
.el-tag + .el-tag {
  margin-left: 10px;
}

.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}
.item {
  border: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #6d6d6d;
  font-size: 13px;
}
.item-box {
  padding: 30px;
  margin-top: 15px;
  font-size: 15px;
  /* box-shadow: 0 0 5px rgba(202, 203, 203, 0.5);
    -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, 0.5);
    -moz-box-shadow: 0 0 5px rgba(202, 203, 204, 0.5); */
}

/* .item-box:hover {
    box-shadow: 0 0 5px #0091ff;
    -webkit-box-shadow: 0 0 5px #0091ff;
    -moz-box-shadow: 0 0 5px #0091ff;
  } */

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}

#info-img {
  text-align: center;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.img-order {
  margin-left: 30px;
}

.el-transfer {
  display: inline-block;
}
</style>
