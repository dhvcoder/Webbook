const Author = require("../model/author");

const HandlegetAuthor = async (req, res) => {
  try {
    const data = await Author.getAllAuthor();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("SERVER ERROR");
    console.error(error);
  }
};
const HandleInsert = async (req, res) => {
  try {
    const { tentacgia, mota } = req.body;
    const result = await Author.InsertAuthor(tentacgia, mota);

    // Check if the InsertAuthor function returns a result
    if (result && result[0] && result[0].insertId) {
      const insertedId = result[0].insertId;

      // Fetch the inserted data using the insertedId (adjust this based on your data retrieval method)
      const insertedData = await Author.GetAuthorID(insertedId);

      // Check if the data was successfully fetched
      if (insertedData && insertedData.length > 0) {
        res.status(200).json(insertedData[0]); // Return the inserted data as JSON
      } else {
        res.status(500).send("Failed to fetch inserted data");
      }
    } else {
      res.status(500).send("Insert failed");
    }
  } catch (error) {
    res.status(500).send("SERVER ERROR");
    console.error(error);
  }
};




const HandleGetById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Author.GetAuthorID(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("SERVER ERRO");
    console.error(error);
  }
};

const HandleDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Author.DeleteAuthorID(id);
    res.status(200).send("Xoa Thanh cong");
  } catch (error) {
    res.status(500).send("SERVER ERRO");
    console.error(error);
  }
};

const HandleUpdate = async (req, res) => {
  try {
    const id = req.params.id ;
    const {tentacgia , mota} = req.body ;
    await Author.UpdateAuhtor(tentacgia , mota , id);
    res.status(200).send("Cap nhap thanh cong");
  } catch (error) {
     res.status(500).send("SERVER ERROR");
     console.error(error);
  }
}
module.exports = { HandlegetAuthor, HandleInsert, HandleGetById, HandleDelete, HandleUpdate };
