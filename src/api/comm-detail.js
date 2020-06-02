import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getCommDetail: {
    url: '/app/appGoods/getGoods',
    method: 'post'
  },
  addToShopCar: {
    url: '/app/appShopCart/addShoppingCart',
    method: 'post'
  },
  addOrder: {
    url: '/app/appOrder/addOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
