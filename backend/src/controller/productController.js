const Product = require('../model/product');



const get_list = async function (req, res) {
    try {
        const id = req.params.id ;
        const newProduct = {id_danhmuc: id};
        const total = await Product.getCount(newProduct);
        const limit = 12 ;
        const start =  parseInt(req.params.page, 10);
        const page = (start-1)* limit;
        const total_page = Math.ceil(total/limit);
        const data = await Product.getProducts(id , page ); // Invoke the function with ()
        res.status(200).json({total_page , data});
    } catch (error) {
        // Handle errors appropriately, e.g., res.status(500).send("Internal Server Error");
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const get_listAll = async function (req,res){
    try {
        const products = await Product.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}



const insertProduct = async (req, res) => {
  try {
    const files = req.fileId;
    const { tensanpham, id_danhmuc, id_tacgia, gia, soluong, mota } = req.body;

    const newProduct = {
      name: tensanpham,
      price: gia,
      mota: mota,
      number: soluong,
      img: files,
      id_danhmuc: id_danhmuc,
      tacgia_id: id_tacgia
    };

    // Gọi hàm inserProducts để thêm sản phẩm vào cơ sở dữ liệu
     await Product.inserProducts(newProduct);
    // Gửi ID của sản phẩm về client hoặc sử dụng nó theo nhu cầu của bạn
    res.status(200).json(id_danhmuc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};




const HandlegetByID = async (req , res) => {
    try {
        const id = req.params.id ;
        const data = await Product.getByID(id);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}



const HandleDelete = async (req , res) => {
    try {
        const id = req.params.id ;
        await Product.deleteID(id);
        res.status(200).send("Xoa Thanh Cong");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const HandleUpdate = async (req , res) => {
    try {
        const files = req.fileId || null;
        const id = req.params.id;
        const { tensanpham, gia, mota, soluong, id_danhmuc , id_tacgia } = req.body;
        // const img = await uploadFile(files[0]); // Access the first file in the array
        const newProduct = {
            name: tensanpham,
            price: gia,
            mota: mota,
            number: soluong,
            img: files,
            id_danhmuc: id_danhmuc,
            tacgia_id: id_tacgia
            };
            // console.log(newProduct);
            await Product.updateProduct(newProduct, id, newProduct.img);
            res.status(200).send("Update thanh cong");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = { get_listAll , get_list , insertProduct , HandlegetByID , HandleDelete , HandleUpdate};