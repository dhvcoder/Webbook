const connect= require('../config/database');
function Category(newCategory){
    this.tendanhmuc = newCategory.tendanhmuc ;
}


Category.getCategory = async function(){
    try {
        const query = "SELECT * FROM danhmuc";
        const [result] = await connect.execute(query );
        return result;
    } catch (error) {
        throw error;
    }
}
Category.insertCategory = async function(newCategory){
    try {
        const query = "INSERT INTO `danhmuc` (`tendanhmuc`) VALUES (?) ";
        const result = await connect.execute(query , [newCategory.tendanhmuc]);
        return result;
    } catch (error) {
        throw error;
    }
}
Category.getByID = async function (id) {
    try {
        const query = "SELECT * FROM `danhmuc` WHERE id = ? ";
        const [result] = await connect.execute(query , [id]);
        return result;
    } catch (error) {
        throw error
    }
}


Category.updateProduct = async function (newCategory, id) {
  try {
    const query ="UPDATE danhmuc SET tendanhmuc = ?  WHERE id = ? ";
    const [result] = await connect.execute(query, [
      newCategory.tendanhmuc,
      id,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

Category.deleteID = async function (id) {
  try {
    const query = " DELETE FROM danhmuc where id = ? ";
    const [result] = await connect.execute(query, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = Category;


