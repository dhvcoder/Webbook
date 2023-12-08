const Category = require('../model/category');


const get_listCategory = async function (req, res) {
    try {
        const data = await Category.getCategory() ; // Invoke the function with ()
        res.status(200).json(data);
    } catch (error) {
        // Handle errors appropriately, e.g., res.status(500).send("Internal Server Error");
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const HandleInsertCategory = async function (req, res) {
  try {
    const {tendanhmuc} = req.body ;
    const newcategory = { tendanhmuc: tendanhmuc };
    await Category.insertCategory(newcategory);
    res.status(200).send("Them thanh cong");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HandlegetByID = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const data = await Category.getByID(id);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HandleUpdate = async (req , res) => {
  try {
    const id = req.params.id ;
    const tendanhmuc = req.body.tendanhmuc;
    const newcategory = {tendanhmuc: tendanhmuc};
    const data = await Category.updateProduct(newcategory , id);
    res.status(200).send("Updata thanh cong");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

const HandleDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.deleteID(id);
    res.status(200).send("Xoa Thanh Cong");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {get_listCategory , HandleInsertCategory, HandlegetByID , HandleUpdate , HandleDelete};