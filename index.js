"use strict";

const test = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');

var userController = require('./controller/UserController.js');
var AuthController = require('./controller/AuthController.js');
var ImageController = require('./controller/ImageController.js');
var ProductController = require('./controller/ProductController.js');
var CategoryController = require('./controller/CategoryController.js');

var app1 = test();  

app1.use(test(morgan('tiny')));
app1.use(test.static(__dirname + "/public"));
app1.use(cors());
app1.use(bodyParser.urlencoded({extended:true}));
app1.use(bodyParser.json('application/json'));


app1.post('/registration', AuthController.validator, userController.hashGen, userController.userRegistration);

app1.post('/user/login', userController.userLogin);
app1.post('/user/imageUpload', ImageController.image, ImageController.imageName);
app1.put('/user/userUpdate', AuthController.checkToken, userController.userUpdate);
app1.delete('/userDelete/:id', AuthController.checkToken, userController.userDelete);
app1.get('/getUser', AuthController.checkToken, userController.getUser);
app1.post('/uservalidation', AuthController.checkToken, AuthController.verifyAdmin);

app1.post('/productAdd',AuthController.checkToken, AuthController.verifyAdmin, ProductController.addProduct);
app1.put('/productUpdate/:id',ProductController.productUpdate);
app1.delete('/productDelete/:id', AuthController.checkToken, AuthController.verifyAdmin, ProductController.productDelete);
app1.get('/getProduct', ProductController.getProduct);
app1.get('/searchProduct/:productname',ProductController.searchProduct);
app1.put('/addToCart/:id',AuthController.checkToken,ProductController.addToCart);

app1.get('/getProductCart', AuthController.checkToken, ProductController.getProductCart);


app1.get('/getCategory', CategoryController.getCategory);
app1.post('/addCategory', CategoryController.addCategory);
app1.get('/getProductByCategory/:id', ProductController.getProductByCategory);


app1.listen(3000);