<template>
  <div>
    <div class="search">
      <img src="../../assets/u770.png" alt="">
      <el-input placeholder="请输入搜索关键词"></el-input>
    </div>
    <div class="leader">
        <ul>
            <li @click="allOrder" :class="{active: this.orderListData.orderState === ''}">全部订单</li>
            <li @click="paidOrder" :class="{active: this.orderListData.orderState === '0'}">已付款</li>
            <li @click="forPickUpOrder" :class="{active: this.orderListData.orderState === '2'}">待取货</li>
            <li @click="finishOrder" :class="{active: this.orderListData.orderState === '5'}">已完成</li>
        </ul>
    </div>
    <div class="order-item" v-for="item of list" :key="item.orderCode" @click="toPage(item)">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderCode}}</span>
            <span>{{item.orderState === '0' ? '已下单' : item.orderState === '1' ? '已取消' :
                    item.orderState === '2' ? '已到货' : item.orderState === '3' ? '已取货' :
                    item.orderState === '4' ? '已完成未评价' : '已完成已评价' }}</span>
        </div>
        <div class="item-center" v-for="(goodsItem, index) in item.listOrderGoods"
          :key="index">
            <div class="img-con">
                <img :src="goodsItem.photoPath" alt="">
            </div>
            <div class="text">
                <div class="props-con">
                    {{goodsItem.goodsName}}
                </div>
                <div class="text-con">
                    {{goodsItem.goodsIntroduce}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{goodsItem.goodsPrice}} &nbsp;</span>
                    <span>x{{goodsItem.buyNumber}}</span>
                </div>
            </div>
        </div>
        <div class="client-info">
          <span>
            <img src="../../assets/mine.png" alt="">
            {{item.userName}}
          </span>
          <span>
            <img src="../../assets/手机 (1).png" alt="">
            {{item.phone}}
          </span>
        </div>
        <div class="item-bottom">
            <span>共{{item.countGoods}}件商品，合计</span>
            <span>￥</span>
            <span>{{item.orderAmout}}</span>
        </div>
        <!-- <div class="item-more" v-show="item.orderStatus == '3'">
            <div class="btn" @click.stop="evaluate(item)">
                <span>评价</span>
            </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import req from '../../api/shop-order.js'
export default {
  name: 'order-list',
  data () {
    return {
      list: [
        // {
        //   id: '001',
        //   orderNum: '2020020713270034',
        //   orderStatus: '待取货',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80',
        //   clientName: '张三三',
        //   clienPhoneNumber: '13714438546'
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
    toPage (data) {
      // console.log('选中的订单', data)
      this.$router.push({path: '/shop-order-detail', query: data})
    },
    // evaluate (data) {
    //   console.log(data)
    //   this.$router.push({path: '/order-evaluate'})
    // },
    allOrder () {
      this.orderListData.orderState = ''
      this.shopOrderList()
    },
    paidOrder () {
      this.orderListData.orderState = '0'
      this.shopOrderList()
    },
    forPickUpOrder () {
      this.orderListData.orderState = '2'
      this.shopOrderList()
    },
    finishOrder () {
      this.orderListData.orderState = '5'
      this.shopOrderList()
    },
    shopOrderList () {
      req('shopOrderList', {
        ...this.orderListData
      }).then(data => {
        console.log('店长订单列表', data)
        if (data.code === 0) {
          this.list = data.data.list
          // if (this.list.orderState === '0') {
          //   this.list.orderState = '已下单'
          // } else if (this.list.orderState === '1') {
          //   this.list.orderState = '已取消'
          // } else if (this.list.orderState === '2') {
          //   this.list.orderState = '已到货'
          // } else if (this.list.orderState === '3') {
          //   this.list.orderState = '已取货'
          // } else if (this.list.orderState === '4') {
          //   this.list.orderState = '已完成未评价'
          // } else if (this.list.orderState === '5') {
          //   this.list.orderState = '已完成已评价'
          // }
        }
      })
    }
  },
  mounted () {
    this.shopOrderList()
  }
}
</script>

<style lang="scss" scoped>
  .search {
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 5px;
    line-height: 50px;
    box-sizing: border-box;
    background: rgb(242, 242, 242);

    img {
      width: 32px;
      height: 32px;
      margin-left: 10px;
      margin-top: 10px;
    }
    .el-input {
        width: 80%;
        margin-left: 15px;
    }
  }
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
      padding: 0px 15px 10px 15px;
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
                  font-size: 14px;
                  line-height: 18px;
                  color: rgb(168,168,168);
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 16px;
                  line-height: 26px;

              }
              .price-con {
                  text-align: right;
                  line-height: 26px;
                  span:nth-child(1) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                      margin-right: -5px;
                  }
                  span:nth-child(2) {
                      font-size: 17px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
                      font-size: 14px;
                      color: rgb(168,168,168);
                  }
              }
          }
      }
      .item-bottom {
        width: 100%;
        height: 35px;
        padding-top: 5px;
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
      .client-info {
        height: 41px;
        text-align: left;
        line-height: 41px;
        font-size: 14px;
        border-bottom: 1px solid rgb(200, 200, 200);
        span {
          position: relative;
          margin-left: 20px;
          margin-right: 5px;
          padding: 10px 0;
          img {
            position: absolute;
            left: -20px;
            top: 10px;
            width: 17px;
            height: 18px;
            // padding-top: 10px;
            // box-sizing: border-box;
          }
        }
        span:first-child {
          img {
            top: 11px;
            width: 16px;
            height: 16px;
          }
        }
      }
  }
/deep/ .el-input__inner {
    &::placeholder {
        color: rgb(217, 217, 217);
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
    }

    &::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color: rgb(217, 217, 217);
    }

    &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        color: rgb(217, 217, 217);
    }

    &::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        color: rgb(217, 217, 217);
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10+  适配ie*/
        color: rgb(217, 217, 217);
    }
}
</style>
