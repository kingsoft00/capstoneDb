var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var userRoute = require('./router/UserRoute.js');
var userBrand = require('./router/brand.router.js')
//Database URL Details 
var config = require('./DB');
var PORT = process.env.PORT || 5000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.DB).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
  );

//creating reference of express 
var app = express();
//Middlware mdoules setup 
app.use(bodyParser.urlencoded({extended:true}));   //Enable post, put and delete body data 
app.use(bodyParser.json()); //converting json req data. post method  
//app.use(cors()); //Enable CORS feature
let corsOptions = {
    origin: 'http://localhost:4260', //to allow server connect with 4200, we can add more http behind after ',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
app.use(cors(corsOptions));//Enable CORS feature

//Connect to database 
// mongoose.connection;

//Coding .....
// var Brand = require("./router/brand.router.js");
// var userRoute = require('./router/UserRoute.js');

//Middleware 
//app.use("/product",Brand); //localhost:9090/product/brandFromDb
app.use('/api/users', userRoute);
app.use('/product',userBrand)

app.listen(PORT,()=>console.log(`Server is running on ${PORT} number`));