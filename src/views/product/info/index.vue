<template>
  <div class="app-container">
    <div class="item-box">
      <el-row>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" height="300px" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <span class="price">
                <span>23.5</span>
                <span>13.8</span>
              </span>
              <div class="bottom clearfix">
                <time class="time">好吃的汉堡描述商品描述好吃的汉堡描述商品描述...</time>
                <el-button type="text" class="button">更改</el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="15" :offset="1">
          <el-card :body-style="{ padding: '0px' }">
            <el-carousel trigger="click" height="300px" @change="onChange">
              <el-carousel-item v-for="(item,index) in bannerList" :key="index" autoplay="false">
                <h3 v-if="!item.image" class="small">{{ item }}</h3>
                <el-image v-if="item.image" :src="item.image"></el-image>
              </el-carousel-item>
            </el-carousel>
            <div style="padding: 14px;">
              <span>水果幻灯片</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">更改</el-button>
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
            商品分类: <el-tag type="success">标签二</el-tag>
            <!-- <el-button type="text" class="button" style="line-height: 32px;">更改</el-button> -->
          </el-card>
        </el-col>

        <el-col :span="15" :offset="1">
          <el-card shadow="hover">
            商品规格:
            <el-tooltip class="item" effect="dark" content="specContent" placement="top">
              <span class="el-tag el-tag--light">
                小果（斤）
                <i class="el-icon-edit el-tag__edit" v-on:click="editTag(item, index)"></i>
                <i class="el-tag__close el-icon-close" v-on:click="removeTag(item, index)"></i>
              </span>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="specContent" placement="top">
              <span class="el-tag el-tag--light">
                中果（斤）
                <i class="el-icon-edit el-tag__edit" v-on:click="editTag(item, index)"></i>
                <i class="el-tag__close el-icon-close" v-on:click="removeTag(item, index)"></i>
              </span>
            </el-tooltip>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="item-box" style="min-height: 500px;">

       <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="商品介绍" name="first">
          <div class="demo-image__lazy" >
            <el-image v-for="url in urls" :key="url" :src="url"></el-image>
          </div>
        </el-tab-pane>

        <el-tab-pane label="图片编辑" name="second">
          <el-card shadow="hover">
            <draggable
              tag="transition-group"
              :componentData="componentData"
              :list="list"
              class="list-group"
              draggable=".item"
              :animation="100"
              @start="dragging = true"
              @end="dragging = false"
            >
                <div v-for="url in urls" :key="url" class="item">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="url"
                      fit="fill">
                    </el-image>
                </div>
                <div
              slot="footer"
              class="btn-group list-group-item"
              role="group"
              aria-label="Basic example"
              key="footer"
            >
          <button class="btn btn-secondary" @click="add">Add</button>
                </div>
            </draggable>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

export default {
  name: "footerslot",
  display: "Footer slot",
  order: 5,
  data() {
    return {
      currentDate: new Date(),
      bannerCount: 5,
      bannerList: ['无幻灯片，请添加', '无幻灯片，请添加', '无幻灯片，请添加'],
      list: [
        { name: "John", text: "", id: 0 , img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'},
        { name: "Joao", text: "", id: 1 , img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'},
        { name: "Jean", text: "", id: 2 , img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'}
      ],
      dragging: false,
      activeName: 'first',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        // 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ],
      componentData: {
        props: {
          type: "transition",
          name: "flip-list"
        }
      }
    }
  },
  methods: {
    ajaxGetBanner() {
      return [
        {
          productId: 12345,
          productName: '新疆葡萄价格美丽',
          image: 'https://img.zcool.cn/community/013de756fb63036ac7257948747896.jpg'
        }
      ]
    },

    onChange(index) {
    },

    editTag(item, index) {

    },

    removeTag(item, index) {

    },

    removeAt(idx) {
      this.urls.splice(idx, 1);
    },
    add: function() {
      // this.urls.push({ name: "Juan " + id, id: id++ })
    },
    replace: function() {
      this.urls = ['https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg']
    },

    addBanner() {

    },

    handleClick(tab, event) {
      console.log(tab, event);
    }

  },

  created() {
    const banners = this.ajaxGetBanner()
    const length = this.bannerCount - banners.length
    // 幻灯片数量不足用文字代替图片
    // console.log(length)
    for (let i = 0; i < length; i++) {
      banners.push('无幻灯片，请添加')
    }
    this.bannerList = banners
  },

  components: {
    draggable
  },
}
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
      clear: both
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

  .el-carousel__item:nth-child(2n+1) {
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
    color: #FFF;
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
  }
  .item-box {
    padding: 30px;
    margin-top: 15px;
    font-size: 15px;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
    -webkit-box-shadow: 0 0 5px rgba(202,203,203,0.5);
    -moz-box-shadow: 0 0 5px rgba(202,203,204,0.5);
  }

  .item-box:hover {
    box-shadow: 0 0 5px #0091FF;
    -webkit-box-shadow: 0 0 5px #0091FF;
    -moz-box-shadow: 0 0 5px #0091FF;
  }
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
</style>
