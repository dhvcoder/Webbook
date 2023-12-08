require('dotenv').config();
const express = require('express');
var cors = require('cors');
const app = express();
const router = require('./router/index');
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded());


router(app);
const port = process.env.PORT;
router(app);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});