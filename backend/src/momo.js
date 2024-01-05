require("dotenv").config();
const express = require("express");
var cors = require("cors");
const router = require("./router/apicheckout");

const app2 = express();
const port2 = 3001; // Chọn cổng 2

// Middleware
app2.use(cors());
app2.use(express.json());
app2.use(express.urlencoded({ extended: true }));

// Định nghĩa các route cho Server 2
app2.use('/v6' , router)

// Khởi động Server 2
app2.listen(port2, () => {
  console.log(`Server 2 running on port ${port2}`);
});
