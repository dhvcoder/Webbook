const conn = require("../config/database");

const Order = {
  CreateOrder: async (
    id_user,
    fullname,
    address,
    status,
    payment,
    amount_total,
    phone_number
  ) => {
    try {
      const query =
        "INSERT INTO `orders` (`id_user`, `fullname`, `address`, `order_date`, `status` , `payment_status` , `amount_total`, `phone_number`) VALUES (?, ?, ?, current_timestamp(), ?, ?, ? ,?)";
      const result = await conn.execute(query, [
        id_user,
        fullname,
        address,
        status,
        payment,
        amount_total,
        phone_number,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  GetByIdOder: async (id_user) => {
    try {
      const query =
        "SELECT * FROM `orders` WHERE id_user = ? ORDER BY id_order DESC ";
      const [result] = await conn.execute(query, [id_user]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  UpdateStatus: async (status, id_order) => {
    try {
      const query =
        "UPDATE `orders` SET `status` = ? WHERE `orders`.`id_order` = ?";
      const result = await conn.execute(query, [status, id_order]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  GetAllOrder: async () => {
    try {
      const query = "SELECT * FROM `orders` ORDER BY id_order DESC";
      const [result] = await conn.execute(query);
      return result;
    } catch (error) {
      throw error;
    }
  },

  GetCountOrder: async () => {
    try {
      const query = "SELECT COUNT(*) AS total_order FROM orders";
      const [result] = await conn.execute(query);
      return result[0]["total_order"];
    } catch (error) {
      throw error;
    }
  },
  GetCountOrderStatusOne: async () => {
    try {
      const query =
        "SELECT COUNT(*) AS total_order_ws1 FROM orders WHERE status = 1;";
      const [result] = await conn.execute(query);
      return result[0]["total_order_ws1"];
    } catch (error) {
      throw error;
    }
  },
  Gettotal_amount: async () => {
    try {
      const query =
        "SELECT DAYNAME(order_date) AS day_of_week, SUM(amount_total) AS total_amount FROM orders WHERE WEEK(order_date) = WEEK(NOW()) AND status = 2 GROUP BY day_of_week ORDER BY DAYOFWEEK(order_date) ";
      const [result] = await conn.execute(query, );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = Order ;