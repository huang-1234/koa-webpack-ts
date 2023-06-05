const jsonSelectGoods = require('../../db/select_goods/goods.json');

function getSelectGoods() {
  return jsonSelectGoods;
}

module.exports = {
  getSelectGoods
}