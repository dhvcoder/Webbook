const Cart = require("../model/card");
const Order = require("../model/order")
const HandleInsertCard = async function (req, res) {
  try {
    const id_card = req.user.id_card;
    const { id_sanpham, soluong } = req.body;
    const number = parseInt(id_sanpham, 10);
    const card_item = await Cart.GetByIdCard_item(id_card);
    const foundProduct = card_item.find(
      (product) => product.product_id === number
    );
    if (!foundProduct) {
      await Cart.InsercardItem(id_card, id_sanpham, soluong);
      res.status(200).json("Thêm thành công");
    } else {
      const newSoluong = parseInt(soluong, 10) + parseInt(foundProduct.soluong, 10);
      if(newSoluong>foundProduct.so_luong){
        res.status(403).json("Đã đặt quá số lượng hàng trong kho....");
      }else{
        await Cart.UpdateCard_item(newSoluong, foundProduct.card_item_id);
        res.status(200).json("Thêm sản phẩm thành công");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HandleGetCard = async (req, res) => {
  try {
    const id_user = req.user.userID;
    const address = await Order.GetByIdOder(id_user);
    let infoArray = []; // Declare an array to store information from the loop

      for (let i = 0 ; i < address.length; i++) {
      const fullname = address[0].fullname;
      const adres = address[0].address;
      const phone = address[0].phone_number;

      let infor = {
        fullname,
        adres,
        phone,
      };
      infoArray.push(infor); // Store each 'infor' object in the array
    }
    const id_card = req.user.id_card;
    const count = await Cart.GetCount(id_card);
    const data = await Cart.GetAllCard_Item(id_card);
    res.status(200).json({ totalCard: count, data: data, infoArray: infoArray[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};



const HandleDeleteCart = async (req , res) => {
  try {
    const id_product = req.params.id ;
    const id_card = req.user.id_card;
    console.log(id_product , id_card);
    await Cart.Delete(id_card , id_product);
    res.status(200).json("xoa thanh cong")
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
}
// const HandleGetAddress = async function (req, res) {
//   try {
//     const id_user = req.user.userID;
//     const address = await Order.GetByIdOder(id_user);
//     for(let i = address.lengh; i>0 ; --i){
//       const fullname = i[0].fullname ;
//       const adres = i[0].address ;
//       const phone = i[0].phone ;
//       const infor = {
//         fullname,
//         adres,
//         phone,
//       };
//     }
//     console.log(infor);
//     res.status(200).json({ address: address });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };


module.exports = { HandleInsertCard , HandleGetCard , HandleDeleteCart };
