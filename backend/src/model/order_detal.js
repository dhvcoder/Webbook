const conn = require("../config/database");

const Order_detail = {
  CreateOrder_detail: async (id_order, id_product, quantity) => {
    try {
      const query =
        "INSERT INTO `order_detail` ( `id_order`, `id_product`, `quantity`) VALUES (?, ?, ?)";
      const result = await conn.execute(query, [
        id_order,
        id_product,
        quantity,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  GetByIdOrder_detail: async (id_order) => {
    try {
      const query =
        "SELECT order_detail.*, orders.*, sanpham.ten, sanpham.img, sanpham.gia , sanpham.so_luong FROM order_detail INNER JOIN sanpham ON order_detail.id_product = sanpham.id_sanpham INNER JOIN orders ON order_detail.id_order = orders.id_order WHERE orders.id_order = ?";
      const [result] = await conn.execute(query, [id_order]);
      return result ;
    } catch (error) {
      throw error;
    }
  },

  GetByIDOneOrder_detail: async (id_order) => {
    try {
      const query = "SELECT * FROM `order_detail` WHERE id_order = ?";
      const [result] = await conn.execute(query , [id_order]);
      return result ;
    } catch (error) {
      throw error
    }
  }
};
module.exports = Order_detail ;