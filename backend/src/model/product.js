const connect= require('../config/database');

function Product(newProduct){
    this.name = newProduct.name ;
    this.price = newProduct.price ;
    this.number = newProduct.number ;
    this.mota = newProduct.mota ;
    this.img = newProduct.img ;
    this.id_danhmuc = newProduct.id_danhmuc ;
    this.tacgia_id = newProduct.tacgia_id ;
}

Product.getProducts = async function(id , limit){
    try {
        const query =
          "SELECT sanpham.*, danhmuc.tendanhmuc, tacgia.tentacgia FROM sanpham INNER JOIN danhmuc ON sanpham.id_danhmuc = danhmuc.id INNER JOIN tacgia ON sanpham.tacgia_id = tacgia.id_tacgia WHERE danhmuc.id = ? LIMIT ?, 12;";
        const [result] = await connect.query(query , [id, limit]);
        return result;
    } catch (error) {
        throw error;
    }
}
Product.getAllProducts = async function(){
    try {
        const query = "SELECT sanpham.*, tacgia.tentacgia FROM sanpham INNER JOIN tacgia ON sanpham.tacgia_id = tacgia.id_tacgia" ;
        const [result] = await connect.query(query);
        return result;
    } catch (error) {
        throw error;
    }
}

Product.getCount = async function(newProduct) {
    try {
        const query = "SELECT COUNT(id_danhmuc) as totalCount FROM sanpham WHERE id_danhmuc = ?;";
        const [result] = await connect.query(query , [newProduct.id_danhmuc]);
        return result[0]['totalCount'];
    } catch (error) {
        throw error;
    }
}

Product.inserProducts = async function(newProduct){
    try {
        const query = "INSERT INTO `sanpham` (`ten`, `gia`, `so_luong`, `mo_ta`, `img` , `id_danhmuc` , `tacgia_id`) VALUES (?,?,?,?,?,?,?);"
        const result = await connect.execute(query, [newProduct.name , newProduct.price , newProduct.number , newProduct.mota , newProduct.img , newProduct.id_danhmuc , newProduct.tacgia_id]);
        return result;
    } catch (error) {
        throw error;
    }
}

Product.getByID = async function (id) {
    try {
        const query =
          "SELECT sanpham.*, danhmuc.tendanhmuc, tacgia.tentacgia FROM sanpham INNER JOIN danhmuc ON sanpham.id_danhmuc = danhmuc.id INNER JOIN tacgia ON sanpham.tacgia_id = tacgia.id_tacgia WHERE id_sanpham = ?";
        const [result] =  await connect.execute(query , [id]);
        return result;
    } catch (error) {
        throw error;
    }
}
Product.deleteID = async function (id) {
    try {
        const query = "DELETE FROM sanpham where id_sanpham = ? ";
        const [result] =  await connect.execute(query , [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

Product.updateProduct = async function (newProduct , id , newImg) {
    try {
        const query = "UPDATE sanpham SET ten = ?, gia = ?, so_luong = ?, mo_ta = ?, id_danhmuc = ? , tacgia_id = ? " + 
        " , img = CASE WHEN ? IS NOT NULL THEN ? ELSE img END" +
        " WHERE id_sanpham = ?";
        const [result] =  await connect.execute(query , [newProduct.name , newProduct.price , newProduct.number , newProduct.mota , newProduct.id_danhmuc, newProduct.tacgia_id , newProduct.img , newImg , id]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = Product;