<template>
  <div>
    <div class="content">
        <div class="con-top">
            <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/货车.png">
                    <span>取货门店：{{shopOrderDetail.storeName}}</span>
                </div>
                <div class="top-img-con">
                    <img src="../../assets/定位.png">
                    <span>配送地址：{{shopOrderDetail.address}}</span>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-item" v-for="item in shopOrderDetail.listOrderGoods" :key="item.goodsCode">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.photoPath">
                </div>
                <div class="text">
                    <div class="text-con">{{item.goodsName}}</div>
                    <div class="props-con">{{item.goodsIntroduce}}</div>
                    <div class="price-con">
                        <span>￥</span>
                        <span>{{item.goodsPrice}} </span>
                        <span>x{{item.buyNumber}}</span>
                    </div>
                </div>
            </div>
            <div class="item-bottom">
            <span>共{{shopOrderDetail.countGoods}}件商品，合计</span>
            <span>￥</span>
            <span>{{shopOrderDetail.orderAmout}}</span>
        </div>
        </div>
    </div>
    <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
            <li>客户姓名：</li>
            <li>手机号码：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{shopOrderDetail.orderCode}}</li>
            <li>{{shopOrderDetail.payTime}}</li>
            <li class="active">{{shopOrderState}}</li>
            <li>{{shopOrderDetail.userName}}</li>
            <li>{{shopOrderDetail.phone}}</li>
        </ul>
    </div>
    <div class="btn-div" v-show="this.shopOrderDetail.orderState === '0' || this.shopOrderDetail.orderState === '2' || this.shopOrderDetail.orderState === '3'">
      <el-button @click="firstButton" v-show="this.shopOrderDetail.orderState === '0' || this.shopOrderDetail.orderState === '2'">{{firstButtonShow}}</el-button>
      <el-button @click="secondButton" v-show="this.shopOrderDetail.orderState === '0' || this.shopOrderDetail.orderState === '2' || this.shopOrderDetail.orderState === '3'">{{secondButtonShow}}</el-button>
    </div>
  </div>
</template>

<script>
import req from '../../api/shop-order-detail.js'
export default {
  name: 'shop-order-detail',
  data () {
    return {
      // 存放要修改成的订单状态
      orderState: '',
      shopOrderDetail: [
        // {
        //   id: '001',
        //   img: require('../../assets/卡车.png'),
        //   width: '18px',
        //   text: '取货门店：新华书店（新街口店）'
        // }, {
        //   id: '002',
        //   img: require('../../assets/position2.png'),
        //   width: '13px',
        //   text: '取货门店：新华书店（新街口店）'
        // }
      ],
      orderList: [
        {
          id: '001',
          adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
          img: require('../../assets/book1.jpg'),
          prop: '重量：0.32kg 系列：一生自在系列',
          price: '42.80',
          number: '1',
          count: '42.80'
        }
      ],
      msgList: [
        '2020020713270034',
        '2020-02-11 11:54:01',
        '已付款',
        '张无忌',
        13762468793
      ]
    }
  },
  methods: {
    // 获取订单详情
    getShopOrderDetail () {
      req('getShopOrderDetail', {
        orderCode: this.$route.query.orderCode
      }).then(data => {
        this.shopOrderDetail = data.data[0]
        console.log('店长订单详情', data)
        console.log(this.shopOrderDetail.storeName)
      })
    },
    // 修改订单状态
    editShopOrderState () {
      req('editShopOrderState', {
        orderCode: this.shopOrderDetail.orderCode,
        version: this.shopOrderDetail.version,
        orderState: this.orderState
      }).then(data => {
        if (data.code === 0) {
          this.getShopOrderDetail()
          this.$message.success(data.msg)
        }
      })
    },
    firstButton () {
      if (this.shopOrderDetail.orderState === '0') {
        this.$confirm('您确定取消订单吗？').then(() => {
          this.orderState = '1'
          this.editShopOrderState()
          this.getShopOrderDetail()
        }).catch(() => {})
      } else if (this.shopOrderDetail.orderState === '2') {
        this.$confirm('点击确定按钮，取消到货').then(() => {
          this.orderState = '0'
          this.editShopOrderState()
          this.getShopOrderDetail()
        }).catch(() => {})
      }
    },
    secondButton () {
      if (this.shopOrderDetail.orderState === '0') {
        this.$confirm('点击确定按钮，确定到货').then(() => {
          this.orderState = '2'
          this.editShopOrderState()
          this.getShopOrderDetail()
        }).catch(() => {})
      } else if (this.shopOrderDetail.orderState === '2') {
        this.$confirm('点击确定按钮，确认取货').then(() => {
          this.orderState = '3'
          this.editShopOrderState()
          this.getShopOrderDetail()
        }).catch(() => {})
      } else if (this.shopOrderDetail.orderState === '3') {
        this.$confirm('点击确认按钮，取消取货').then(() => {
          this.orderState = '2'
          this.editShopOrderState()
          this.getShopOrderDetail()
        }).catch(() => {})
      }
    }
  },
  mounted () {
    // console.log(this.$route.query.orderCode)
    this.getShopOrderDetail()
  },
  computed: {
    // userType () {
    //   return JSON.parse(sessionStorage.getItem('roleInfo'))
    // }
    shopOrderState () {
      if (this.shopOrderDetail.orderState === '0') {
        return '已下单'
      } else if (this.shopOrderDetail.orderState === '1') {
        return '已取消'
      } else if (this.shopOrderDetail.orderState === '2') {
        return '已到货'
      } else if (this.shopOrderDetail.orderState === '3') {
        return '已取货'
      } else if (this.shopOrderDetail.orderState === '4') {
        return '已完成未评价'
      } else if (this.shopOrderDetail.orderState === '5') {
        return '已完成已评价'
      }
    },
    firstButtonShow () {
      if (this.shopOrderDetail.orderState === '0') {
        return '取消订单'
      } else if (this.shopOrderDetail.orderState === '2') {
        return '取消到货'
      }
    },
    secondButtonShow () {
      if (this.shopOrderDetail.orderState === '0') {
        return '确认到货'
      } else if (this.shopOrderDetail.orderState === '2') {
        return '确认取货'
      } else if (this.shopOrderDetail.orderState === '3') {
        return '取消取货'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 12px auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 10px 0;
      box-sizing: border-box;
      .con-top {
          width: 100%;
          .top-item {
              // display: flex;
              padding: 5px 0 5px 0;
              .top-img-con {
                position: relative;
                width: 100%;
                text-align: left;
                margin-bottom: 10px;
                img {
                  position: absolute;
                  width: 20px;
                  height: 20px;
                  top: 2px;
                }
                span {
                  margin-left: 25px;
                  font-size: 15px;
                }
              }
          }
      }
      .line {
          width: 100%;
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
      .order-item {
          width: 95%;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          padding: 5px 5px;
          box-sizing: border-box;
          .item-center {
              width: 100%;
              display: flex;
              box-sizing: border-box;
              padding-top: 5px;
              .img-con {
                  flex: 1;
                  text-align: center;
                  img {
                      width: 84px;
                  }
              }
              .text {
                  margin-left: 5px;
                  flex: 2.2;
                  .text-con {
                      font-size: 15px;
                      line-height: 22px;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 1;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      width: 100%;
                      font-size: 13.5px;
                      line-height: 21px;
                      color: rgb(168,168,168);
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .price-con {
                      text-align: right;
                      line-height: 26px;
                      span:nth-child(1) {
                          font-size: 11px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(2) {
                          font-size: 16px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(3) {
                          font-size: 11px;
                          color: rgb(168,168,168);
                      }
                  }
              }
          }
        .item-bottom {
          width: 100%;
          height: 35px;
          // padding-top: 5px;
          box-sizing: border-box;
          line-height: 35px;
          text-align: right;
          // padding-top: 5px;
          span:nth-child(1) {
            font-size: 15px;
          }
          span:nth-child(2) {
            font-size: 12px;
            color: red;
          }
          span:nth-child(3) {
            margin-left: -5px;
            color: red;
            font-size: 20px;
          }
        }
      }
  }
  .order-msg {
      width: 95%;
      background-color: white;
      box-sizing: border-box;
      padding: 10px 0px;
      margin: 0 auto;
      display: flex;
      border-radius: 10px;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
              padding: 0 0 0 20%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0 0 0 20%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0 0 0 20%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0 0 0 20%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(5) {
              margin: 0;
              padding: 0 0 0 20%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(6) {
              margin: 0;
              padding: 0 0 0 20%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
      }
      ul:nth-child(2) {
          margin: 0;
          padding: 0;
          flex: 2;
          margin-left: -20px;
          li:nth-child(1) {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(5) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(6) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          .active {
              color: rgb(195,152,98);
          }
      }
  }
  .btn-div {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    // background: rgb(242,242,242);
    text-align: right;
    line-height: 60px;
  }
  .el-button {
    height: 40px;
    background: rgb(195,149,96);
    color: white;
    border-radius: 20px;
    font-size: 16px;
    margin: 0 10px 0 0;
    border: rgb(195,149,96);
  }
</style>
