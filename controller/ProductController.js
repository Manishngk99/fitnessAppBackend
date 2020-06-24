var product = require('../model/ProductModel.js');
var jwt = require('jsonwebtoken');
var user = require('../model/UserModel.js');


function addProduct(req, res, next){
    console.log(req.body);
    console.log(req.imageName);
    product.product.create({
        productname:req.body.productname,
        productdesc:req.body.productdesc,
        categoryId:req.body.categoryId
    })
    .then(function(result){
        res.status(202);
        res.json({
            status:202,
            message:'Product added successfull'
        })
    })
    .catch(function(err){
        console.log(err)
    })
}

function productUpdate(req, res, next){
     product.product.update({
        productname: req.body.productname,
        productdesc: req.body.productdesc,
        productimg: req.body.productimg,
     },{
         where:{
             id: req.params.id
         }
     })
     .then(function (result) {
         console.log(result);
        if (result === 1) {
            res.json({ status: 404, message: 'Product is not found' })
        } else {
            res.json({ status: 200, message: 'Product verified' })
        }
    })
    .catch(function (err) {
        res.json({ status: 500, message: 'Error while updating product!' })
    })
}

function getProduct(req, res, next){
    product.product.findAll()
    .then(function (result) {
        console.log(result);
       if (result === null) {
           res.json({ status: 404, message: 'No products found' })
       } else {
           res.json(result)
       }
   })
   .catch(function (err) {
       res.json({ status: 500, message: 'Error while updating product!' })
   })

}

function productDelete(req, res, next) {
        product.product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (result) {
                console.log(result + 'delete');
                if (result === 0) {
                    res.status(400);
                    res.json({ status: 400, message: 'Product not found' })
                } else {
                    console.log(result);
                    res.status(200);
                        res.json({ status: 200, message: 'Product deleted successfull' });
                }
            })
            .catch(function (err) {
                next(err)
            })
    
}

function searchProduct(req, res, next){
    console.log(req.params.id);
    if(req.params.id === null){
        res.status(500);
        res.json({status:500, message: "Product id is not provided"})
    }
    product.product.findOne({
        where:{
            productname: req.params.productname
        }
    })
    .then(function (result) {
        if (result === 0) {
            res.json({ message: 'Product not found' })
        } else {
            res.json(result)
        }
    })
    .catch(function (err) {
        res.json({status:500, message:"Error while searching product"})
    })

}

function addToCart(req,res,next){
    product.product.update({
        userId: req.id
            },{
         where:{
             id: req.params.id
         }
     })
    .then(function (result) {
        if (result === 0) {
            res.json({ message: 'Add to cart is not successfull' })
        } else {
            res.json(result)
        }
    })
    .catch(function (err) {
        res.json({status:500, message:"Error while adding to cart"})
    })
}

function getProductCart(req, res, next){
    product.product.findAll({
        where:{
            userId: req.id
        }
    })

    .then(function (result) {
        console.log(result);
       if (result === null) {
           res.json({ status: 404, message: 'No products found' })
       } else {
           res.json(result)
       }
   })
   .catch(function (err) {
       res.json({ status: 500, message: 'Error while finding product!' })
   })

}

function getProductByCategory(req, res, next){
    console.log(req.params  )    
    product.product.findAll({
            where: {
                categoryId: req.params.id
            }
        })
        .then(function(result){
            if(result === null){
                res.json({status:404, message:'No products found'})
            }
            else{
                res.json(result)
            }
        })
    
        .catch(function(err){
            res.json(err)
        })
    }   



module.exports = {
    addProduct,
    productUpdate,
    getProduct,
    productDelete,
    searchProduct,
    addToCart,
    getProductCart,
    getProductByCategory
}