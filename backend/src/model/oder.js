const conn = require("../config/database");
const Order = {
    CreateOrder: async (id) => {
      try {
        const query = "";
        const result = await conn.query(query, [id]);
        return result;
      } catch (error) {
        throw error;
      }
    },
}