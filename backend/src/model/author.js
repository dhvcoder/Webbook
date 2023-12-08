const conn = require("../config/database");

const Author = {
  getAllAuthor: async () => {
    try {
      const query = "SELECT * FROM tacgia";
      const [result] = await conn.query(query); // Giả sử bạn đang sử dụng một pool kết nối, hãy thay thế pool bằng đối tượng kết nối thực tế của bạn
      return result;
    } catch (error) {
      throw error;
    }
  },
  InsertAuthor: async (tentacgia, motaAuthor) => {
    try {
      const query =
        "INSERT INTO `tacgia` (`tentacgia` , `motaAuthor`) VALUES (?,?) ";
      const result = await conn.execute(query, [tentacgia, motaAuthor]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  GetAuthorID: async (id) => {
    try {
      const query = "SELECT * FROM tacgia WHERE id_tacgia = ? ";
      const [result] = await conn.execute(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  DeleteAuthorID: async (id) => {
    try {
      const query = "DELETE FROM tacgia WHERE id_tacgia = ? ";
      const result = await conn.execute(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  UpdateAuhtor: async(tentacgia , motaAuthor , id) => {
    try {
      const query = "UPDATE `tacgia` SET `tentacgia` = ? , `motaAuthor` = ? WHERE `tacgia`.`id_tacgia` = ?";
      const result = await conn.execute(query , [tentacgia , motaAuthor , id]);
      return result ;
    } catch (error) {
      throw error;
    }
  }
};
module.exports = Author;
