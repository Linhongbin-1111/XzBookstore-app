<template>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetail.photoPath" alt="">
    </div>

    <div class="book-detail">
      <div class="book-price-starClass">
        <div class="book-price">
          <span>￥</span>
          <span>{{commDetail.goodsPrice}}</span>
        </div>
        <div class="starClass">
          <!-- <span>商品评分&nbsp&nbsp</span> -->
          <el-rate  v-model="commDetail.starClass"
            disabled
            show-score
            text-color="#ff9900"></el-rate>
        </div>
      </div>
      <!-- <div class="book-name">{{commDetail.goodsName}}</div> -->
      <div class="book-Describe">{{commDetail.goodsIntroduce}}</div>
      <div class="stock-page-view">
        <span>库存  {{commDetail.stock}}</span>
        <span>销量 {{commDetail.salesVolume}}</span>
      </div>
      <div class="count-box">
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{storeName}}</span>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <a @click="toShopCarpage()">
          <img src="../../assets/购物车2.png" alt="">
          <span>购物车</span>
      </a>
      <a @click="addToShopCar">加入购物车</a>
      <a @click="addOrder">立即购买</a>
    </div>
  </div>
</template>

<script>
import req from '../../api/comm-detail.js'
export default {
  name: 'comm-detail',
  data () {
    return {
      commDetail: {
        // goodsName: '三国演义',
        // isbn: '',
        // goodsDescribe: '《三国演义是中国古典四大名著之一，亦是中国第一部长篇历史章回小说，作者一般被认为是元末明初的罗贯中。',
        // goodsPrice: '100',
        // goodsImagePath: '',
        // goodsEvaluateScore: '1',
        // goodsAuthor: '罗挂钟',
        // goodsPress: '666'
      },
      bookCount: 1
      // address: JSON.parse(sessionStorage.getItem('roleInfo')).address
    }
  },
  methods: {
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    countAdd () {
      this.bookCount++
    },
    getCommDetail () {
      // console.log(this.$route.query.goodsCode)
      req('getCommDetail', {
        goodsCode: this.goodsCode
      }).then(data => {
        console.log('用户商品详情', data)
        this.commDetail = data.data
        // console.log(typeof this.commDetail.starClass)
      })
    },
    toShopCarpage () {
      this.$router.push({path: '/shop-car'})
    },
    // 加入购物车
    addToShopCar () {
      req('addToShopCar', {
        goodsCode: this.goodsCode,
        buyNumber: this.bookCount
      }).then(data => {
        if (data.code === 0) {
          this.$message({type: 'success', showClose: true, message: '加入购物车成功~'})
        } else if (data.msg === '商品已无库存，请重新挑选！') {
          this.$message({type: 'info', showClose: true, message: '不好意思，目前商品库存不足，请您选购其它商品'})
        } else if (data.msg === '库存量不足，无法购买') {
          this.$message({type: 'info', showClose: true, message: '库存量不足您加入购物车的数量，请重新选购'})
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 加入订单
    addOrder () {
      req('addOrder', {
        goodsCode: this.goodsCode,
        goodsPrice: this.commDetail.goodsPrice,
        buyNumber: this.bookCount,
        shopCarCode: '0',
        storeCode: JSON.parse(sessionStorage.getItem('roleInfo')).storeCode
      }).then(data => {
        if (data.code === 0) {
          this.$message({type: 'success', showClose: true, message: '购买成功~'})
          this.$router.push({path: '/order-list'})
        } else if (data.msg === '未绑定门店，请绑定门店后重新下单！') {
          this.$message({type: 'info', showClose: true, message: '需绑定门店邀请码才可购买商品，即将为您跳转到绑定邀请码页面！'})
          setTimeout(() => {
            this.$router.push({path: '/change-store-code'})
          }, 1500)
        } else if (data.msg === '商品集中存在库存不足的商品,请重新购买！') {
          this.$message({type: 'info', showClose: true, message: '不好意思，目前商品库存不足，请您选购其它商品'})
        } else {
          this.$message({type: 'error', showClose: true, message: data.msg})
        }
        this.bookCount = 1
      })
    }
  },
  mounted () {
    this.getCommDetail()
    // this.commDetail = JSON.parse(sessionStorage.getItem('currentCommInfo'))
  },
  computed: {
    goodsCode () {
      return JSON.parse(sessionStorage.getItem('currentCommInfo')).goodsCode
    },
    storeName () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).storeName
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(246, 246, 246);
}

.book-banner {
  width: 96%;
  height: 300px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 10px auto;

  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
  width: 96%;
  margin: 10px auto;
  .book-price-starClass {
    display: flex;
    justify-content: space-between;
  }
  .book-price {
    font-size: 22px;
    color: red;
    span:first-child {
      font-size: 14px;
      margin-right: -5px;
    }
  }

  .book-name {
    font-size: 18px;
    line-height: 30px;
  }

  .book-Describe {
    // height: 30px;
    font-size: 14px;
    color: black;
    // font-weight: bold;
    // padding: 10px 0;
    margin: 5px 0;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: clip;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    // margin-bottom: 20px;
  }
  .stock-page-view {
    display: flex;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    padding-top: 6px;
    padding-bottom: 6px;
    box-sizing: border-box;
    span:first-child {
      color: #a8a8a8;
      font-size: 14px;
      width: 100px;
    }
    span:last-child {
      color: #a8a8a8;
      font-size: 14px;
      width: 100px;
      text-align: right;
      margin-right: 5px;
    }
  }
  .starClass {
    height: 20px;
    line-height: 20px;
    display: flex;
    margin-top: 5px;
  }

  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 35px;
    margin-top: 5px;
    span {
      height: 35px;
      line-height: 35px;
    }

    .handler-box {
      display: flex;
      height: 25px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      // margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }

  .address {
    margin: 5px 0;

    .iconhtmal5icon14 {
      color: #a8a8a8;
    }
  }
}
.footer {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;
}

.footer a:first-child {
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
}

.footer a:first-child img {
  width: 25px;
  height: 25px;
}

.footer a:first-child > span {
  font-size: 10px;
  letter-spacing: 1px;
}
.footer a:nth-child(2) {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: rgb(192, 149, 96);
  border: 1px solid rgb(197, 156, 104);
  background: #fff;
  border-radius: 10px;
  margin-left: 10px;
}

.footer a:nth-child(3) {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgb(197, 156, 104);
  color: #fff;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  opacity: 0.8;
}
</style>
