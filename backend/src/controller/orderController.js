const Order = require("../model/order");
const Order_detail = require("../model/order_detal");
const Product = require("../model/product")
const HandleInsertOrder = async function (req, res) {
  try {
    console.log(req.body);
    const id_user = req.user.userID;
    const fullname = req.body.Data.fullname ;
    const address = req.body.Data.address ;
    const phone = req.body.Data.phone ;
    const amount_total = req.body.Data.amount ;
    const order_detail = req.body.Data.selectedValues;
    const status = 1 ;
    const order = await Order.CreateOrder(id_user, fullname , address , status , amount_total , phone );
      for (let i = 0; i < order_detail.length; i++) {
          await Order_detail.CreateOrder_detail(
            order[0].insertId,
            order_detail[i].id_product,
            order_detail[i].soluong
          );
      }
    res.status(200).json("Đặt hàng thành công");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const handGetlOrder = async function (req, res) {
  try {
    let arrayOrder = [];
    const id_user = req.user.userID;
    const orders = await Order.GetByIdOder(id_user);
    for (let i = 0 ; i<orders.length ; i++){
      const fullname = orders[i].fullname;
      const address = orders[i].address;
      const phone = orders[i].phone_number ;
      const amount_total = orders[i].amount_total;
      const date_order = orders[i].order_date ;
      const status = orders[i].status ;
      const Information = {
        fullname ,
        address ,
        amount_total ,
        phone,
        date_order,
        status
      }
      const order_detail = await Order_detail.GetByIdOrder_detail(orders[i].id_order);
      arrayOrder.push({ 
        product: order_detail , 
        information: Information 
      });
    }
    console.log(arrayOrder);
    res.status(200).json({ success: true, data: arrayOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};



module.exports = { HandleInsertOrder , handGetlOrder };
