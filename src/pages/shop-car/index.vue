<template>
  <div class="container">
    <div class="shopCarEmpty" v-if="this.shopCarList.length === 0">购物车空空如也，快去选购商品吧！</div>
    <ul class="book-list" v-else>
      <li class="book-list-item" v-for="(item, index) in shopCarList" :key="index">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @change="inputChange(item)">
            <div class="action" :style="{display: item.checked === true ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <img :src="item.photoPath" alt="">
          <div>
            <div>{{ item.goodsName }}</div>
            <div>重量：0.32kg 系列：一生自在系列</div>
            <div class="price-count-box">
              <div class="price-box">
                <span>￥</span>
                <span>{{ (item.currentgoodsPrice).toFixed(2) }}</span>
              </div>
              <div class="change-count-box">
                <div @click="countDelete(item)">-</div>
                <div>{{ item.buyNumber }}</div>
                <div @click="countAdd(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="close-count">
      <div>
        <div>
          <input type="checkbox" @click="allInputChange">
          <div class="action" :style="{display: allChecked ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div>
        <div>
          <b>合计:</b>
          <span>{{ totalPrice.toFixed(2) }}</span>
        </div>
        <button @click="deleteShopCarComm">删除</button>
        <button @click="payment">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '../../api/shop-car.js'
export default {
  name: 'shop-car',
  data () {
    return {
      shopCarList: [],
      allChecked: false,
      totalPrice: 0.00
      // currentBuyNumbers: 0
    }
  },
  // computed: {
  //   totalPrice () {
  //     return this.totalPrice()
  //   }
  // },
  mounted () {
    this.getShopCarList()
  },
  methods: {
    // 获取购物车列表
    getShopCarList () {
      req('getShopCarList', {
        pageSize: 150,
        pageNum: 1
      }).then(data => {
        console.log('购物车列表', data)
        // 从数据库获取购物车列表并在每一个商品数组中加入checked属性和当前价格属性(单价乘以购买数量)
        this.shopCarList = data.data.list.map(item => {
          return Object.assign({}, item, {checked: false, currentgoodsPrice: item.goodsPrice * item.buyNumber})
        })
        // console.log(this.shopCarList)
      })
    },
    // 删除购物车选中的商品
    deleteShopCarComm () {
      let selectComm = ''
      for (let i = 0; i < this.shopCarList.length; i++) {
        if (this.shopCarList[i].checked === true) {
          selectComm = this.shopCarList[i].shopCarCode + ',' + selectComm
        }
      }
      // console.log(selectComm)
      if (selectComm === '') {
        this.$message.info('请选择需要删除的商品')
      } else {
        req('deleteShopCar', {
          shopCarCode: selectComm
        }).then(data => {
          // selectComm = ''
          if (data.code === 0) {
            this.getShopCarList()
            this.totalPrice = 0
            this.$message({type: 'success', showClose: true, message: data.msg})
          } else {
            this.$message({type: 'error', showClose: true, message: data.msg})
          }
        })
      }
    },
    // 结算按钮
    payment () {
      let paymentGoodsCode = ''
      let paymentGoodsPrice = ''
      let paymentBuyNumber = ''
      let paymentShopCarCode = ''
      this.shopCarList.forEach(item => {
        if (item.checked) {
          paymentGoodsCode = paymentGoodsCode + item.goodsCode + ','
          paymentGoodsPrice = paymentGoodsPrice + item.goodsPrice + ','
          paymentBuyNumber = paymentBuyNumber + item.buyNumber + ','
          paymentShopCarCode = paymentShopCarCode + item.shopCarCode + ','
        }
      })
      // console.log(paymentGoodsCode)
      // console.log(paymentGoodsPrice)
      // console.log(paymentBuyNumber)
      // console.log(paymentShopCarCode)
      this.addOrder(paymentGoodsCode, paymentGoodsPrice, paymentBuyNumber, paymentShopCarCode)
      this.totalPrice = 0
      if (this.allChecked === true) {
        this.allChecked = !this.allChecked
      }
    },
    // 新增订单
    addOrder (paymentGoodsCode, paymentGoodsPrice, paymentBuyNumber, paymentShopCarCode) {
      req('addOrder', {
        goodsCode: paymentGoodsCode,
        goodsPrice: paymentGoodsPrice,
        buyNumber: paymentBuyNumber,
        shopCarCode: paymentShopCarCode,
        storeCode: JSON.parse(sessionStorage.getItem('roleInfo')).storeCode
      }).then(data => {
        if (data.code === 0) {
          // 刷新购物车
          this.getShopCarList()
          this.$router.push({path: '/order-list'})
          this.$message({type: 'success', showClose: true, message: '购买成功，欢迎下次订购^_^'})
        } else {
          this.$message({type: 'error', showClose: true, message: data.msg})
        }
      })
    },
    inputChange (item) {
      item.checked = !item.checked
      // console.log(item)
      for (let i = 0; i < this.shopCarList.length; i++) {
        if (this.shopCarList[i].checked === false) {
          this.allChecked = false
          break
        } else {
          this.allChecked = true
        }
      }
      this.totalPrice = this.getTotal()
    },
    countDelete (item) {
      if (item.buyNumber > 1) {
        item.buyNumber = parseFloat(item.buyNumber) - 1
        // this.currentBuyNumbers = item.buyNumber
        item.currentgoodsPrice = parseFloat(item.buyNumber) * item.goodsPrice
        // 修改购物车
        req('editShopCar', {
          buyNumber: item.buyNumber,
          shopCarCode: item.shopCarCode,
          goodsCode: item.goodsCode
        }).then(data => {
          if (data.code === 0) {
            this.$message({type: 'success', showClose: true, message: data.msg})
          } else {
            this.$message({type: 'error', showClose: true, message: data.msg})
          }
        })
      }
      this.totalPrice = this.getTotal()
    },
    countAdd (item) {
      item.buyNumber = parseFloat(item.buyNumber) + 1
      // this.currentBuyNumbers = item.buyNumber
      item.currentgoodsPrice = parseFloat(item.buyNumber) * item.goodsPrice
      this.totalPrice = this.getTotal()
      // 修改购物车
      req('editShopCar', {
        buyNumber: item.buyNumber,
        shopCarCode: item.shopCarCode,
        goodsCode: item.goodsCode
      }).then(data => {
        if (data.code === 0) {
          this.$message({type: 'success', showClose: true, message: data.msg})
        } else {
          this.$message({type: 'error', showClose: true, message: data.msg})
        }
      })
    },
    allInputChange () {
      this.allChecked = !this.allChecked
      this.shopCarList.forEach(item => {
        item.checked = this.allChecked
      })
      this.totalPrice = this.getTotal()
    },
    getTotal () {
      let total = 0
      this.shopCarList.forEach(item => {
        if (item.checked) {
          total = total + parseFloat(item.currentgoodsPrice)
        }
      })
      return parseFloat(total.toFixed(2))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 110px;
}
  .shopCarEmpty {
    width: 100%;
    height: 100%;
    line-height: 500px;
    font-size: 18px;
    text-align: center;
    color: rgb(217, 217, 217);
  }
  .book-list {
    width: 96%;
    // position: absolute;
    // left: 50%;
    // bottom: 55px;
    overflow: auto;
    // transform: translate(-50%, 0);
    margin: 0 auto;

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 10px 10px 0;
      box-sizing: border-box;
      margin-top: 10px;

      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 18px;
          height: 18px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 13px;
            height: 13px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: rgb(197, 156, 104);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;
        width: 100%;

        >img {
          width: 30%;
          height: 75%;
          vertical-align: middle;
          align-self: center;
        }

        >div {
          > div:first-child {
            font-size: 16px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            // margin-top: 10px;
          }

          > div:nth-child(2) {
            font-size: 13px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            color: #ddd;
          }

          > div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 215px;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            span:first-child {
              margin-right: -5px;
              font-size: 10px;
              color: red;
            }
            span:nth-child(2) {
              font-size: 16px;
              color: red;
            }

            .change-count-box {
              display: flex;
              height: 20px;

              div:first-child {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-top-left-radius:5px;
                border-bottom-left-radius: 5px;
              }

              div:nth-child(2) {
                width: 40px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
              }

              div:nth-child(3) {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
              }
            }
          }
        }
      }
    }
  }

.close-count {
  position: fixed;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 0px 10px;
  box-sizing: border-box;

  div:first-child {
    display: flex;
    height: 50px;
    align-items: center;

    div {
      position: relative;
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 13px;
        height: 13px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: rgb(197, 156, 104);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;

    div:first-child {
      justify-content: center;
      width: 130px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      b {
        padding-right: 5px;
      }
      span {
        font-size: 18px;
        color: red;
      }
    }

    button {
      width: 85px;
      height: 50px;
      background: rgb(197, 156, 104);
      color: #fff;
      outline: none;
      line-height: 50px;
      text-align: center;
      border: none;
      // border-radius: 10px;
      // margin-left: 10px;
      font-size: 19px;
      font-family: '黑体', 'Courier New', Courier, monospace;
      letter-spacing: 2px;
    }

    button:nth-child(2) {
      background: #333333;
    }
  }
}

</style>
