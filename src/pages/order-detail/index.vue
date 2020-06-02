<template>
  <div>
    <div class="content">
      <div class="con-top">
          <div class="top-item">
            <div class="top-img-con">
              <img src="../../assets/卡车.png">
            </div>
            <span>取货门店：{{orderList.storeName}}</span>
          </div>
          <div class="top-item">
            <div class="top-img-con">
              <img src="../../assets/position2.png">
            </div>
            <span>送货地址：{{orderList.address}}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="order-item" v-for="(item, index) in orderList.listOrderGoods" :key="index">
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
                <span>共{{orderList.countGoods}}件商品，合计￥</span>
                <span>{{orderList.orderAmout}}</span>
            </div>
        </div>
    </div>
    <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{orderList.orderCode}}</li>
            <li>{{orderList.payTime}}</li>
            <li class="active">{{orderList.orderState === '0' ? '已下单' : orderList.orderState === '1' ? '已取消' :
              orderList.orderState === '2' ? '已到货' : orderList.orderState === '3' ? '已取货' :
              orderList.orderState === '4' ? '已完成未评价' : '已完成已评价'}}</li>
        </ul>
    </div>
    <div class="btn-div" v-show="this.orderList.orderState === '0' || this.orderList.orderState === '2' || this.orderList.orderState === '3'">
      <el-button @click="firstButton" v-show="this.orderList.orderState === '3'">取消订单</el-button>
      <el-button @click="secondButton"
        v-show="this.orderList.orderState === '0' || this.orderList.orderState === '2' || this.orderList.orderState === '3' || this.orderList.orderState === '4'">{{secondButtonShow}}</el-button>
    </div>
  </div>
</template>

<script>
import req from '../../api/order-detail'
export default {
  name: 'order-detail',
  data () {
    return {
      orderState: '',
      topList: [
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
        // {
        //   id: '001',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80'
        // }
      ]
    }
  },
  methods: {
    getOrderDetail () {
      req('getOrderDetail', {
        orderCode: this.$route.query.orderCode
      }).then(data => {
        console.log('订单详情', data)
        this.orderList = data.data[0]
      })
    },
    // 修改订单状态
    editOrderState () {
      req('editShopOrderState', {
        orderCode: this.orderList.orderCode,
        version: this.orderList.version,
        orderState: this.orderState
      }).then(data => {
        if (data.code === 0) {
          this.getOrderDetail()
          this.$message({type: 'success', showClose: true, message: data.msg})
        }
      })
    },
    firstButton () {
      this.$confirm('您确定取消订单吗？').then(() => {
        this.orderState = '1'
        this.editOrderState()
      }).catch(() => {})
    },
    secondButton () {
      if (this.orderList.orderState === '0') {
        this.$confirm('点击确定按钮，确定到货').then(() => {
          this.orderState = '2'
          this.editOrderState()
        }).catch(() => {})
      } else if (this.orderList.orderState === '2') {
        this.$confirm('点击确定按钮，确认取货').then(() => {
          this.orderState = '3'
          this.editOrderState()
        }).catch(() => {})
      } else if (this.orderList.orderState === '3') {
        this.$confirm('点击确认按钮，取消取货').then(() => {
          this.orderState = '2'
          this.editOrderState()
        }).catch(() => {})
        // 跳转评价页
      } else if (this.orderList.orderState === '4') {
        this.$router.push({path: '/order-evaluate'})
      }
    }
  },
  mounted () {
    this.getOrderDetail()
  },
  computed: {
    secondButtonShow () {
      if (this.orderList.orderState === '0') {
        return '取消订单'
      } else if (this.orderList.orderState === '2') {
        return '取消到货'
      } else if (this.orderList.orderState === '3') {
        return '确认收货'
      } else if (this.orderList.orderState === '4') {
        return '评价'
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
      padding: 13px 13px 0;
      box-sizing: border-box;
      .con-top {
          width: 100%;
          .top-item {
              display: flex;
              padding: 5px 0 22px;
              .top-img-con {
                  width: 30px;
                  text-align: center;
              }
              span {
                  font-size: 15px;
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
          padding: 10px 15px;
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
                  flex: 2.2;
                  .text-con {
                      font-size: 15px;
                      line-height: 22px;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      font-size: 13.5px;
                      line-height: 26px;
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
              line-height: 40px;
              text-align: right;
              padding-top: 5px;
              span:nth-child(1) {
                  font-size: 15px;
              }
              span:nth-child(2) {
                  font-size: 20px;
              }
          }
      }
  }
  .order-msg {
      width: 95%;
      background-color: white;
      box-sizing: border-box;
      padding: 8px 0 12px;
      margin: 0 auto;
      display: flex;
      border-radius: 8px;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0 0 0 25%;
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
          .active {
              color: rgb(195,152,98);
          }
      }
  }
  .btn-div {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: rgb(242,242,242);
    text-align: right;
    line-height: 50px;
  }
</style>
