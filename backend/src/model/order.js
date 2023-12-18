const conn = require("../config/database");

const Order = {
  CreateOrder: async (id_user , fullname, address, status, amount_total , phone_number) => {
    try {
      const query = "INSERT INTO `orders` (`id_user`, `fullname`, `address`, `order_date`, `status`, `amount_total`, `phone_number`) VALUES (?, ?, ?, current_timestamp(), ?, ? ,?)";
      const result = await conn.execute(query, [id_user , fullname , address , status , amount_total , phone_number]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  GetByIdOder: async (id_user) => {
    try {
       const query = "SELECT * FROM `orders` WHERE id_user = ? ";
      const [result] = await conn.execute(query, [id_user]);
      return result;
    } catch (error) {
      throw error
    }
  }
};
module.exports = Order ;