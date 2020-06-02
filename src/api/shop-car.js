import req from '../fetch/index.js'

const config = {
  getShopCarList: {
    url: '/app/appShopCart/listShoppingCarts',
    method: 'post'
  },
  editShopCar: {
    url: '/app/appShopCart/updateShoppingCart',
    method: 'post'
  },
  deleteShopCar: {
    url: '/app/appShopCart/deleteShoppingCart',
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
