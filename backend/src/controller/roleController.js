const Role = require("../model/role");

const HandlegetRole = async (req, res) => {
  try {
    const data = await Role.getAllRole();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {HandlegetRole,};
