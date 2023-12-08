require("dotenv").config();
const User = require("../model/user");
const Card = require("../model/card");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const HandleSignUp = async (req, res) => {
  try {
    let role = req.body.role; // Sử dụng let thay vì const để có thể thay đổi giá trị
    if (!role) {
      role = 4;
    }
    const { username, email, password } = req.body;
    const mahoa = await bcrypt.hash(password, 10);
    const user = await User.FindoneByEmail({ email: email });
    if (user.length > 0) {
      res.status(401).send("Email đã tồn tại");
    } else {
      const newUser = {
        username: username,
        email: email,
        password: mahoa,
        role: role,
      };
      const data = await User.SignUp(newUser);
      await Card.CreateCard(data[0].insertId);
      res.status(200).send("Dang ky thanh cong");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createToke = (id, email, role, id_card) => {
  const token = jwt.sign(
    {
      userID: id,
      email: email,
      role: role,
      id_card: id_card,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

const HandlLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newuser = { email: email };
    const user = await User.FindoneByEmail(newuser);
    if (user.length > 0) {
      const checkPass = await bcrypt.compare(password, user[0].password);

      if (checkPass) {
        delete user[0].password;
        const id_card = await Card.GetByIdCard(user[0].id);
        const token = createToke(user[0].id, user[0].email, user[0].role_id , id_card[0].cardID);

        res.status(200).json({ user: user, token: token });
      } else {
        res.status(401).send("Sai mat khau");
      }
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const HandlCheckToken = async (req, res) => {
  try {
    const { id, email, role } = req.user;
    const newUser = { id: id, email: email, role: role };
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HandlegetAllUser = async (req, res) => {
  try {
    const data = await User.getAllUser();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HandleGetByID = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.getByID(id);
    delete data[0].password;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const HanleEdit = async (req, res) => {
  try {
    let role = req.body.role; // Sử dụng let thay vì const để có thể thay đổi giá trị
    if (!role) {
      role = 4;
    }
    const id = req.params.id;
    const newUser = {
      role: role,
    };
    await User.Update(newUser, id);
    res.status(200).json("Update thanh cong");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const HandleDelete = async (req,res) => {
  try {
    const id = req.params.id ;
    await User.Delete(id);
    res.status(200).json("DELETE thanh cong");
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.error(error);
  }
}

module.exports = {
  HandleSignUp,
  HandlLogin,
  HandlCheckToken,
  HandlegetAllUser,
  HandleGetByID,
  HanleEdit,
  HandleDelete
};
