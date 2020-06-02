<template>
  <div>
    <div class="leader">
      <ul> <!-- 记得问队友，这里的4、5有没有改过来 -->
        <li @click="allOrder" :class="{active: this.orderListData.orderState === ''}">全部订单</li>
        <li @click="paidOrder" :class="{active: this.orderListData.orderState === '0'}">已付款</li>
        <li @click="forPickUpOrder" :class="{active: this.orderListData.orderState === '2'}">待取货</li>
        <li @click="finishOrder" :class="{active: this.orderListData.orderState === '5'}">已完成</li>
      </ul>
    </div>
    <div class="order-item" v-for="item of orderlist" :key="item.orderCode" @click="toPage(item)">
      <div class="item-top">
        <img src="../../assets/我的订单.png" alt="">
        <span>{{item.orderCode}}</span>
        <span>{{item.orderState === '0' ? '已下单' : item.orderState === '1' ? '已取消' :
                item.orderState === '2' ? '已到货' : item.orderState === '3' ? '已取货' :
                item.orderState === '4' ? '已完成未评价' : '已完成已评价' }}</span>
      </div>
      <div class="item-center" v-for="(childItem, childIndex) in item.listOrderGoods"
        :key="childIndex">
        <div class="img-con">
          <img :src="childItem.photoPath" alt="">
        </div>
        <div class="text">
          <div class="text-con">
            {{childItem.goodsName}}
          </div>
          <div class="props-con">
            {{childItem.goodsIntroduce}}
          </div>
          <div class="price-con">
            <span>￥</span>
            <span>{{childItem.goodsPrice}} &nbsp;</span>
            <span>x{{childItem.buyNumber}}</span>
          </div>
        </div>
      </div>
      <div class="item-bottom">
        <span>共{{item.countGoods}}件商品，合计</span>
        <span>￥</span>
        <span>{{item.orderAmout}}</span>
      </div>
      <div class="item-more">
        <div class="btn" v-show="item.orderState === '3'" @click.stop="firstButton(item)">
          <span>取消订单</span>
        </div>
        <!-- 这里的stop是为了阻止冒泡事件 -->
        <div class="btn" @click.stop="secondButton(item)"
          v-show="item.orderState === '0' || item.orderState === '2' || item.orderState === '3' || item.orderState === '4'">
          <span>{{item.orderState === '0' ? '取消订单' : item.orderState === '2' ? '取消订单' :
                item.orderState === '3' ? '确认收货' : '评价'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import req from '../../api/order-list'
export default {
  name: 'order-list',
  data () {
    return {
      orderState: '',
      orderlist: [
        // {
        //   id: '001',
        //   orderNum: '2020020713270034',
        //   orderStatus: '已付款',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80'
        // }, {
        //   id: '002',
        //   orderNum: '2020020713270034',
        //   orderStatus: '已完成',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80'
        // }
      ],
      orderListData: {
        orderState: '',
        pageSize: 150,
        pageNum: 1
      }
    }
  },
  methods: {
    // 点击订单跳转
    toPage (data) {
      this.$router.push({path: '/order-detail', query: data})
    },
    // 订单状态按钮
    // 全部
    allOrder () {
      this.orderListData.orderState = ''
      this.getOrderList()
    },
    // 已下单
    paidOrder () {
      this.orderListData.orderState = '0'
      this.getOrderList()
    },
    // 待取货
    forPickUpOrder () {
      this.orderListData.orderState = '2'
      this.getOrderList()
    },
    // 已完成
    finishOrder () {
      this.orderListData.orderState = '5'
      this.getOrderList()
    },
    // 获取订单列表
    getOrderList () {
      req('getOrderList', {
        ...this.orderListData
      }).then(data => {
        console.log('客户订单列表', data)
        if (data.code === 0) {
          this.orderlist = data.data.list
        }
      })
    },
    // 修改订单状态
    editOrderState (item) {
      req('editOrderState', {
        orderCode: item.orderCode,
        orderState: this.orderState,
        version: item.version
      }).then(data => {
        if (data.code === 0) {
          this.$message({type: 'success', showClose: true, message: data.msg})
          this.getOrderList()
        }
      })
    },
    // 修改订单状态按钮1
    firstButton (item) {
      this.$confirm('点击确认按钮，取消订单').then(() => {
        this.orderState = '1'
        // 修改订单状态
        this.editOrderState(item)
      }).catch(() => {})
    },
    // 修改订单状态按钮2
    secondButton (item) {
      if (item.orderState === '0') {
        this.$confirm('点击确定按钮，取消订单').then(() => {
          this.orderState = '1'
          // 修改订单状态
          this.editOrderState(item)
        }).catch(() => {})
      } else if (item.orderState === '2') {
        this.$confirm('点击确定按钮，取消到货').then(() => {
          this.orderState = '1'
          // 修改订单状态
          this.editOrderState(item)
        }).catch(() => {})
      } else if (item.orderState === '3') {
        this.$confirm('点击确定按钮，确认收货').then(() => {
          this.orderState = '4'
          // 修改订单状态
          this.editOrderState(item)
        }).catch(() => {})
        // 跳转评价页
      } else if (item.orderState === '4') {
        this.$router.push({path: '/order-evaluate', query: item})
      }
    }
  },
  mounted () {
    this.getOrderList()
  },
  computed: {
    // buttonShow (item) {
    //   if (item.orderState === '0') {
    //     return '取消订单'
    //   } else if (item.orderState === '2') {
    //     return '取消到货'
    //   } else if (item.orderState === '3') {
    //     return '确认收货'
    //   } else if (item.orderState === '4') {
    //     return '评价'
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
  .leader {
      height: 50px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 50px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .order-item {
      width: 95%;
      margin: 0 auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
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
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 13.5px;
                  line-height: 20px;
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
      .item-more {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          .btn {
              width: 80px;
              height: 30px;
              border-radius: 20px;
              border: 1px solid rgb(195,152,98);
              margin: 5px 0px 5px 5px;
              text-align: center;
              span {
                width: 70px;
                  font-size: 15px;
                  line-height: 30px;
                  color: rgb(195,152,98);
              }
          }
      }
  }
</style>
