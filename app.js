//Config- should always be imported first
const dotenv = require('dotenv')
dotenv.config({ path: "config/config.env" })

const express = require('express');
const router = express.Router();
const app = express();



// const bodyParser = require('body-Parser');
const mainRouter = require('./api/route/main');
const authRouter = require("./api/route/auth");
const careGroupCareHomeControllerRouter = require('./api/CareGroupAndHomeRoute/careGroupAndHomeRoute');

var cors = require('cors');

// User.sync({ force : false });
// RefreshToken.sync({ force : false });




// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://fuzzy-getup-moth.cyclic.app")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
});

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin" ,'*');
//   res.header("Access-Control-Allow-Headers" ,'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader( "Access-Control-Allow-Methods", "*" );
//   next();
// })

app.use('/main', mainRouter);
app.use('/auth', authRouter);
app.use('/care', careGroupCareHomeControllerRouter);



app.use('/', (req, res, next) => {

  console.log('this controller is hitted')
  res.status(404).json({

    error: 'page is not found 404 error and you hitted wrong url'
  })
})


module.exports = app;