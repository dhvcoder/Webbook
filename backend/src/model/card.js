const conn = require("../config/database");

const Card = {
  CreateCard: async (id) => {
    try {
      const query = "INSERT INTO `card` (`userID`) VALUES (?) ";
      const result = await conn.query(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  GetByIdCard: async (id_user) => {
    try {
      const query = "SELECT cardID FROM `card` WHERE userID = ?  ";
      const [result] = await conn.query(query, [id_user]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  InsercardItem: async (card_id, product_id, soluong) => {
    try {
      const query =
        "INSERT INTO `card_item` (`card_id` , `product_id` , `soluong`) VALUES (?,?,?) ";
      const result = await conn.query(query, [card_id, product_id, soluong]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  GetAllCard_Item: async (card_id) => {
    try {
      const query =
        "SELECT card_item.* , sanpham.ten, sanpham.gia , sanpham.img FROM card_item INNER JOIN sanpham ON card_item.product_id = sanpham.id_sanpham WHERE card_id = ?";
      const [result] = await conn.query(query, [card_id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  GetByIdCard_item: async (card_id) => {
    try {
      const query =
        "SELECT card_item.*, sanpham.so_luong FROM card_item INNER JOIN sanpham ON card_item.product_id = sanpham.id_sanpham WHERE card_id = ?";
      const [result] = await conn.query(query, [card_id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  UpdateCard_item: async (soluong, card_item_id) => {
    try {
      const query =
        "UPDATE `card_item` SET `soluong` = ? WHERE `card_item`.`card_item_id` = ? ";
      const [result] = await conn.query(query, [soluong, card_item_id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  GetCount: async (card_id) => {
    try {
      const query =
        "SELECT COUNT(card_id) as totalCount FROM card_item WHERE card_id = ?";
      const [result] = await conn.execute(query, [card_id]);
      return result[0]["totalCount"];
    } catch (error) {
      throw error;
    }
  },
  Delete: async (id_cart , product_id) => {
    try {
      const query =
        "DELETE FROM card_item WHERE card_id = ? AND product_id = ? " ;
      const result = conn.execute(query , [id_cart , product_id]);
      return result ;
    } catch (error) {
      throw error ;
    }
  }
};
module.exports = Card ;