<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in homePicList" :key="index">
          <img :src="item.chartRoute" alt="" @click="toCommDetail(item)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in hotCommList"
        :key="index"
        @click="toDetailPage(item)">
        <img :src="item.photoPath" alt="">
        <div class="book-info">{{item.goodsIntroduce}}</div>
        <div class="book-price">
          <div>
            <span>￥</span>
            <span>{{item.goodsPrice}}</span>
          </div>
          <div>
            <span class="salesVolume">销量 {{item.salesVolume}}</span>
          </div>
        </div>
        <el-rate
          v-model="item.starClass"
          disabled
          show-score
          text-color="#ff9900">
        </el-rate>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '../../api/comm-home.js'
export default {
  name: 'comm-home',
  data () {
    return {
      homePicList: [
        // '../../../static/assets/u159.jpg',
        // '../../../static/assets/u161.jpg',
        // '../../../static/assets/u157.jpg'
      ],
      hotCommList: [
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // }
      ]
    }
  },
  methods: {
    toDetailPage (data) {
      // console.log('选中的商品编号', data)
      // this.$router.push({path: '/comm-detail', query: data})
      sessionStorage.setItem('currentCommInfo', JSON.stringify(data))
      this.$router.push({path: '/comm-detail'})
      // sessionStorage.setItem('currentPage', 1)
    },
    // 获取轮播图
    getHomePic () {
      req('getHomePic', {
      }).then(data => {
        this.homePicList = data.data
        // console.log('轮播图', this.homePicList)
      })
    },
    // 获取热门商品
    getHotComm () {
      req('getHotComm', {
      }).then(data => {
        // this.hotCommList = data.data.map(item => {
        //   return Object.assign({}, item, {newstarClass: parseFloat(item.starClass)})
        // })
        this.hotCommList = data.data
        // console.log('热门商品', data)
      })
    },
    // 点击轮播图，跳转到商品详情
    toCommDetail (value) {
      sessionStorage.setItem('currentCommInfo', JSON.stringify(value))
      this.$router.push({path: '/comm-detail'})
    }
  },
  mounted () {
    this.getHomePic()
    this.getHotComm()
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(246, 246, 246);
}

.el-carousel {
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 35px;
  text-align: left;
  line-height: 35px;
  font-size: 18px;
  color: rgb(192, 149, 96);
  // background: #ddd;
  margin-top: 10px;
  margin-left: 15px;
}

.comm-list {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 96%;
  margin-top: 10px;

  li {
    position: relative;
    width: 48%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto 10px;
    border-radius: 10px;
    text-align: center;

    img {
      width: 90%;
      height: 60%;
    }

    div:nth-child(2) {
      height: 39px;
      text-align: left;
      font-size: 14px;
      padding-left: 10px;
      overflow: hidden;
      text-overflow: clip;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      letter-spacing: 1px;
    }
  }
}
.book-price {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding-left: 8px;
  height: 20px;
  div:first-child {
    span:first-child {
      font-size: 12px;
      color: red;
      margin-right: -3px;
    }
    span:nth-child(2) {
      font-size: 16px;
      color: red;
    }
  }
  div:nth-child(2) {
    span {
      color: #a8a8a8;
      font-size: 13px;
      width: 70px;
      text-align: right;
    }
  }
}
</style>
