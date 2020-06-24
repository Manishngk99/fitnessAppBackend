var category = require('../model/CategoryModel.js');

function addCategory(req, res, next){
    console.log(req.body);
    category.category.create({
        type:req.body.type
    })

    .then(function(result){
        if(result === null){
            res.json({
                message: "Nothing to be added"
            })
        }
        console.log(result);
        res.json(result);
    })

    .catch(function(err){
        console.log(err);
    })
}

function getCategory(req, res, next){
    category.category.findAll()
    .then(function(result){
        if(result === null){
            res.json({status:404, message:'category  not found'})

        }
        else{
            res.json(result)
        }
    })

    .catch(function(err){
        res.json({status:500, message:'There was an error searching category!'})
    })
}    





module.exports = {
    addCategory,
    getCategory
}