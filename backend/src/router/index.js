const apirouter = require('../router/apiproduct');
const apicategory = require('../router/apicategory');
const apiuser = require("../router/apiuser");
const apiauthor = require("../router/apiauthor");
const apicard = require("../router/apicard")
const router = (app) => {
    app.use("/" , apirouter);
    app.use("/v1" , apicategory);
    app.use("/v2" , apiuser);
    app.use("/v3" , apiauthor);
    app.use("/v4" , apicard);
}
module.exports = router;