const conn = require("../config/database");

const Role = {
  getAllRole: async () => {
    try {
      const query = "SELECT * FROM role";
      const [result] = await conn.query(query);
      return result;
    } catch (error) {
      throw error;
    }
  },
}
module.exports = Role ;