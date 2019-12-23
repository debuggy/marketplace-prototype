const express = require("express");
const cors = require('cors');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const router = require("./router");
const init = require("./init");

app.set('json spaces', 4);

app.use(cors());
app.use(compress());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text({type: 'text/*'}));
app.use(cookieParser());

app.use(express.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.use("/api/v2/", router);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
