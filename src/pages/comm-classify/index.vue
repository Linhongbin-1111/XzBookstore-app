<template>
  <div class="container">
    <ul class="book-classify">
      <li v-for="(item, index) in firstCommClassify"
        :key="index"
        @click="getSecondCommClassify(item.sortCode)"
         :class="{active: item.sortCode === currentFirstCommClassify}">
        <b></b>
        <span>{{item.sortName}}</span>
      </li>
    </ul>

    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in SecondCommClassify" :key="index">
        <div class="book-classify-item-title">{{item.sortName}}</div>
        <div v-if="item.listSecondGoods.length === 0" class="Tip">此分类即将上架新商品，敬请期待~</div>
        <ul v-else class="book-list">
          <li v-for="(childItem, childIndex) in item.listSecondGoods" :key="childIndex" @click="getCommDetail(childItem)">
            <img :src="childItem.photoPath" alt="">
            <div>{{childItem.goodsIntroduce}}</div>
            <div>
              <span>￥</span>
              <span>{{childItem.goodsPrice}}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '../../api/comm-classify.js'
export default {
  name: 'comm-classify',
  data () {
    return {
      firstCommClassify: [],
      SecondCommClassify: [],
      currentFirstCommClassify: ''
    }
  },
  methods: {
    getCommDetail (data) {
      sessionStorage.setItem('currentCommInfo', JSON.stringify(data))
      this.$router.push({path: '/comm-detail'})
      // sessionStorage.setItem('currentPage', 2)
    },
    getFirstCommClassify () {
      req('getFirstCommClassify', {
      }).then(data => {
        console.log('一级分类', data)
        this.firstCommClassify = data.data
        // console.log(data.data[0])
        // 默认第一个为active
        this.currentFirstCommClassify = data.data[0].sortCode
        this.getSecondCommClassify(this.currentFirstCommClassify)
      })
    },
    getSecondCommClassify (item) {
      this.currentFirstCommClassify = item
      req('getSecondCommClassify', {
        sortCode: this.currentFirstCommClassify
      }).then(data => {
        console.log('二级分类', data)
        this.SecondCommClassify = data.data
      })
    }
  },
  mounted () {
    this.getFirstCommClassify()
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgb(246, 246, 246);

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 24%;
    background: #fff;

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      border-top-right-radius: 10px;
      overflow: hidden;
      white-space: nowrap;
      // text-overflow: ellipsis;
      text-overflow: clip;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

    }
    li.active {
      color: rgb(197, 156, 104);
      background: rgb(246, 246, 246);

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
        margin-top: -10px;
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 75%;
    margin-left: 10px;

    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        font-size: 14px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
      }
      .Tip {
        width: 98%;
        height: 30px;
        line-height: 30px;
        color: rgb(200, 200, 200);
        text-align: center;
        background: white;
        border-radius: 10px;
        margin: 0 auto;
      }

      .book-list {
        width: 98%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        border-radius: 6px;
        padding: 10px 0;
        box-sizing: border-box;
        margin: 0 auto;

        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin: 5px 0;

          img {
            width: 70%;
            height: 60%;
          }

          div:nth-child(2) {
            width: 80%;
            // display: flex;
            // height: 30px;
            // align-items: center;
            text-align: left;
            // justify-content: space-around;
            // flex-direction: column;
            font-size: 14px;
            margin: 5px 10px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            letter-spacing: 1px;
          }

          div:nth-child(3) {
            width: 80%;
            text-align: left;
            // font-weight: bold;
            span:first-child {
              color: red;
              font-size: 12px;
              margin-right: -5px;
            }
            span:nth-child(2) {
              color: red;
              font-size: 16px;
            }

            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
