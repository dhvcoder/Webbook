// Import required modules and libraries
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

const https = require("https");
const crypto = require("crypto");

// hanleCPayment function
const hanleCPayment = async function (req, res) {
  try {
    const id_user = req.user.userID;
    const fullname = req.body.Data.fullname;
    const address = req.body.Data.address;
    const phone = req.body.Data.phone;
    const amount_total = req.body.Data.amount;
    const order_detail = req.body.Data.selectedValues;
    let status = 1 ;
    // const data = JSON.stringify(order_detail);
    const payment = parseInt(req.body.Data.selectedPaymentMethod);
    console.log(payment);
    if (!fullname || !address || !phone) {
      res.status(403).json("Vui lòng nhập thông tin");
      return;
    } else {
      if (payment == 2) {
          await yourUpdateFunction(id_user, fullname, address, status , payment , amount_total , phone , order_detail);
        res.status(200).json({ payment: "Đặt hàng thành công" });
      } else if (payment == 1) {
        // Call the Payment function and pass a callback to handle the result
        Payment(amount_total, async (parsedData) => {
          // await yourUpdateFunction(
          //   id_user,
          //   fullname,
          //   address,
          //   status,
          //   payment,
          //   parsedData.amount,
          //   phone,
          //   order_detail
          // );
          res.status(200).json(parsedData.payUrl);
        });
      } else {
        res.status(403).send("Phương thức thanh toán không hợp lệ");
        return;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Payment function
function Payment(amount_total, callback) {
  // Initialize necessary parameters
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = "pay with MoMo";
  var redirectUrl = "http://127.0.0.1:5500/HCI/checkout.html";
  var ipnUrl = "http://127.0.0.1:5500/HCI/checkout.html";
  var amount = amount_total;
  var requestType = "captureWallet";
  var extraData = "";

  // Create the raw signature
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  // Generate the signature
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");

  // Prepare JSON object to send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });

  // Set up HTTPS request options
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  // Send the request and get the response
  const req = https.request(options, (response) => {
    console.log(`Status: ${response.statusCode}`);
    console.log(`Headers: ${JSON.stringify(response.headers)}`);
    response.setEncoding("utf8");

    let rawData = "";

    response.on("data", (chunk) => {
      rawData += chunk;
    });

    response.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log("Response Body:");
        console.log(parsedData);

        if (response.statusCode === 200) {
          console.log("payUrl: ");
          console.log(parsedData.payUrl);
          
          callback(parsedData);
        } else {
          console.error(`Error: ${parsedData.message}`);
        }
      } catch (e) {
        console.error("Error parsing response:", e.message);
      }
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Write data to request body
  console.log("Sending....");
  req.write(requestBody);
  req.end();
}



async function yourUpdateFunction(id_user, fullname , address , status , payment , amount_total , phone , order_detail) {
   const order = await Order.CreateOrder(
     id_user,
     fullname,
     address,
     status,
     payment,
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
       const upquantity = parseInt(check[j].so_luong - order_detail[i].soluong);
       await Prdouct.UpdateQuatity(upquantity, order_detail[i].id_product);
     }
   }
}

// Export functions for external use
module.exports = { Payment, hanleCPayment };
