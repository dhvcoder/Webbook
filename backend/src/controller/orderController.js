const Order = require("../model/order");
const Order_detail = require("../model/order_detal");
const User = require("../model/user");
const Prdouct = require("../model/product");
const base64 = require("base-64");
function encodeOrderId(id) {
  const encodedId = base64.encode(String(id));
  const shortenedId = encodedId.substring(0, 10);
  return shortenedId;
}
const HandleInsertOrder = async function (req, res) {
  try {
    const id_user = req.user.userID;
    const fullname = req.body.Data.fullname;
    const address = req.body.Data.address;
    const phone = req.body.Data.phone;
    const amount_total = req.body.Data.amount;
    const order_detail = req.body.Data.selectedValues;
    if (!fullname || !address || !phone) {
      res.status(401).json("Vui long nhap thong tin");
    } else {
      const status = 1;
      const order = await Order.CreateOrder(
        id_user,
        fullname,
        address,
        status,
        amount_total,
        phone
      );
      for (let i = 0; i < order_detail.length; i++) {
        await Order_detail.CreateOrder_detail(
          order[0].insertId,
          order_detail[i].id_product,
          order_detail[i].soluong
        );
        const check = await Prdouct.getByID(order_detail[i].id_product);
        for (let j = 0; j < check.length; j++) {
          const upquantity = parseInt(
            check[j].so_luong - order_detail[i].soluong
          );
          await Prdouct.UpdateQuatity(upquantity, order_detail[i].id_product);
        }
      }
      res.status(200).json("Đặt hàng thành công");
    }
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
    console.log(orders);
    for (let i = 0; i < orders.length; i++) {
      const id_order = orders[i].id_order;
      const encodedId = encodeOrderId(id_order);
      const fullname = orders[i].fullname;
      const address = orders[i].address;
      const phone = orders[i].phone_number;
      const amount_total = orders[i].amount_total;
      const date_order = orders[i].order_date;
      const status = orders[i].status;
      const payment = orders[i].payment_status;
      console.log(payment);
      const Information = {
        id_order,
        encodedId,
        fullname,
        address,
        amount_total,
        phone,
        date_order,
        status,
        payment
      };
      const order_detail = await Order_detail.GetByIdOrder_detail(
        orders[i].id_order
      );
      arrayOrder.push({
        product: order_detail,
        information: Information,
      });
    }
    console.log(arrayOrder);
    res.status(200).json({ success: true, data: arrayOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// const HandleUpdateStatus = async function (req, res) {
//   try {
//     const quality = req.body.quality;
//     const status = req.body.status;
//     const id_order = req.params.id_order;
//     console.log(req.body);
//     if (!quality) {
//       await Order.UpdateStatus(status, id_order);
//       res.status(200).json("Cập nhật thành công");
//     } else {
//       await Order.UpdateStatus(status, id_order);
//       for (let i = 0; i < quality.length; i++) {
//         const check = await Prdouct.getByID(order_detail[i].id_product);
//         for (let j = 0; j < check.length; j++) {
//           console.log(j);
//           res.status(200).json("Xác nhận thành công");
//           const upquantity = parseInt(
//             check[j].so_luong - order_detail[i].soluong
//           );
//           await Prdouct.UpdateQuatity(upquantity, order_detail[i].id_product);
//         }
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const HandleUpStatusOrder = async function (req, res) {
  try {
    const status = 3;
    const id_order = req.params.id_order;
    console.log(id_order);
    await Order.UpdateStatus(status, id_order);
    const check = await Order_detail.GetByIdOrder_detail(id_order);
    for (let j = 0; j < check.length; j++) {
      const upquantity = parseInt(check[j].quantity + check[j].so_luong);
      console.log(upquantity);
      await Prdouct.UpdateQuatity(upquantity, check[j].id_product);
    }
    res.status(200).json("Hủy đơn hàng thành công");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HandleOrderconfirmation = async function (req, res) {
  try {
    const status = 2;
    const id_order = req.params.id_order;
    await Order.UpdateStatus(status, id_order);
    res.status(200).json("Xác nhận đơn hàng thành công");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const HandlMualai = async function (req, res) {
  try {
    const status = 1;
    const id_order = req.params.id_order;
    await Order.UpdateStatus(status, id_order);
    const check = await Order_detail.GetByIdOrder_detail(id_order);
    for (let j = 0; j < check.length; j++) {
      const upquantity = parseInt(check[j].so_luong - check[j].quantity);
      console.log(upquantity);
      await Prdouct.UpdateQuatity(upquantity, check[j].id_product);
    }
    res.status(200).send("Mua lại thành công");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const HandleGetByIdOrder = async function (req, res) {
  try {
    const id_order = req.params.id_order;
    const arrayOrder = [];
    let order_detail = await Order_detail.GetByIdOrder_detail(id_order);
    const fullname = order_detail[0].fullname;
    const address = order_detail[0].address;
    const phone_number = order_detail[0].phone_number;
    const order_date = order_detail[0].order_date;
    const amount_total = order_detail[0].amount_total;
    const status = order_detail[0].status;
    const payment = order_detail[0].payment_status;
    const encodedId = encodeOrderId(id_order);
    const information = {
      fullname,
      address,
      phone_number,
      order_date,
      amount_total,
      status,
      payment,
      encodedId,
    };
    arrayOrder.push({ product: order_detail, information: information });
    res.status(200).json({ data: arrayOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HandleGetAllOrder = async function (req, res) {
  try {
    const data = await Order.GetAllOrder();
    for (let i = 0; i < data.length; i++) {
      let id_order = data[i].id_order;
      const encodedId = encodeOrderId(id_order);
      data[i] = { ...data[i], encodedId };
    }
    res.status(200).json({ data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HandleGetAllCount = async function (req, res) {
  try {
    const total_users = await User.GetCount();
    const total_book = await Prdouct.GetCountBook();
    const total_order = await Order.GetCountOrder();
    const total_order_ws1 = await Order.GetCountOrderStatusOne();
    const total_count = {
      total_users,
      total_book,
      total_order,
      total_order_ws1,
    };

    res.status(200).json({ total_count: total_count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const HandleGetAll_amountTotal = async function (req, res) {
  try {
    const total_amount = await Order.Gettotal_amount();
    console.log(total_amount);
    res.status(200).json({ data: total_amount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  HandleInsertOrder,
  handGetlOrder,
  HandleUpStatusOrder,
  HandleGetByIdOrder,
  HandleGetAllOrder,
  HandleGetAllCount,
  HandleOrderconfirmation,
  HandleGetAll_amountTotal,
  HandlMualai,
};
