const path = require("path");
const stream = require("stream");
const { google } = require("googleapis");
const multer = require("multer");
const upload = multer().any();
const Product = require("../model/product");
const KEYFILEPATH = path.join("./cred.json");
console.log(KEYFILEPATH);
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const middlewareController = {
  // //check form
  // checkForm: (req, res, next) => {
  //   const pattern = /^-?[\d.]+(?:e-?\d+)?$/;
  //   const { tensanpham, gia, mota, soluong, id_danhmuc } = req.body;
  //   // console.log(tensanpham, gia, mota, soluong, id_danhmuc);

  //   if (pattern.test(gia) && pattern.test(soluong)) {
  //     next();
  //   } else {
  //     res.status(401).send("Nhập số không được nhập chữ");
  //   }
  //   console.log(gia, soluong);
  // },

  //UploadFile
  checkUploadFile: (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        console.log("Error uploading file:", err);
        res.status(500).send("Error uploading file.");
      } else {
        const { tensanpham, id_danhmuc, id_tacgia, gia, soluong, mota } =
          req.body;
        // Kiểm tra các trường có giá trị rỗng hay không
        if (
          !tensanpham ||
          !id_danhmuc ||
          !id_tacgia ||
          !gia ||
          !soluong ||
          !mota
        ) {
          res.status(400).json("Các trường không được để trống");
          return;
        }
        const fileObject = req.files[0];
        uploadFile(fileObject)
          .then((fileId) => {
            req.fileId = fileId;
            next();
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            res.status(500).send("Error uploading file to Google Drive.");
          });
      }
    });
  },
  // checkFileUpdate
  checkFileUpdate: (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        res.status(500).send("Error uploading file.");
      } else {
        if (!req.files || req.files.length === 0) {
          req.files = null;
          next();
        } else {
          const fileObject = req.files[0];
          // console.log("co");
          uploadFile(fileObject)
            .then((fileId) => {
              req.fileId = fileId;
              next();
            })
            .catch((error) => {
              console.error("Error uploading file:", error);
              res.status(500).send("Error uploading file to Google Drive.");
            });
        }
      }
    });
  },

  // check soluong dat hang
  checkSoLuong: async (req, res, next) => {
    const { id_sanpham, soluong } = req.body;
    if (soluong == 0 || soluong == NaN) {
      res.status(403).json("Vui long chọn số lượng");
    } else {
      const checkSoluong = await Product.getByID(id_sanpham);
      if (checkSoluong[0].so_luong >= soluong) {
        next();
      } else {
        res.status(403).json("Qua so luong san pham");
      }
    }
  },
};

const uploadFile = async (fileObject) => {
  if (!fileObject) {
    // Không có file được chọn
    return null; // hoặc giá trị tương ứng
  }

  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimetype,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1A9URJVLf6fTGAogUvayOfcpBdg07TIFt"],
    },
    fields: "id,name",
  });
  // console.log(`Uploaded file ${data.name} ${data.id}`);
  return data.id;
};

module.exports = middlewareController;
