const conn = require("../config/database");

function User(newuser) {
  this.username = newuser.username;
  this.email = newuser.email;
  this.password = newuser.password;
  this.role = newuser.role;
  this.token = newuser.token;
}

User.getAllUser = async function () {
  try {
    const query =
      "SELECT user.*, role.role_name FROM user INNER JOIN role ON user.role_id = role.id_role WHERE role_id = 2 OR role_id = 3 OR role_id=4";
    const [result] = await conn.execute(query);
    return result;
  } catch (error) {
    throw error;
  }
};
User.SignUp = async function (newuser) {
  try {
    const query =
      "INSERT INTO `user` (`username`, `email`, `password`, `role_id`) VALUES (?,?,?,?)";
    const result = await conn.execute(query, [
      newuser.username,
      newuser.email,
      newuser.password,
      newuser.role,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

User.FindoneByEmail = async function (newuser) {
  try {
    const query = "SELECT * FROM user WHERE email = ?";
    const [result] = await conn.execute(query, [newuser.email]);
    return result;
  } catch (error) {
    throw error;
  }
};
User.getByID = async function (id) {
  try {
    const query = "SELECT user.*, role.role_name FROM user INNER JOIN role ON user.role_id = role.id_role WHERE id = ? ";
    const [result] = await conn.execute(query , [id]);
    return result;
  } catch (error) {
    throw error ;
  }
}
User.Update = async function(newUser , id){
  try {
    const query = "UPDATE `user` SET `role_id` = ? WHERE `user`.`id` = ?";
    const result = conn.execute(query , [newUser.role , id])
    return result ;
  } catch (error) {
    throw error
  }
}
User.Delete = async function(id){
  try {
    const query = "DELETE FROM user WHERE id = ? " ;
    const result = conn.execute(query , [id]);
    return result;
  } catch (error) {
    throw error
  }
}
User.GetCount = async function(){
 try {
   const query = "SELECT COUNT(*) AS total_users FROM user";
   const [result] = await conn.execute(query, );
   return result[0]["total_users"];
 } catch (error) {
   throw error;
 }
}

module.exports = User;
