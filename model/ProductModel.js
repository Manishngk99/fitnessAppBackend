var db = require('../config/dbconfig');
var user = require('./UserModel');
var category = require('./CategoryModel')
var product = db.sequelize.define('products',{
     //attribures
     id:{
        type:db.Sequelize.INTEGER ,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    productname:{
        type:db.Sequelize.TEXT,
        allowNull:false
    },
    productdesc: {
        type:db.Sequelize.TEXT,
        allowNull:false
    },
    productimg:{  
        type:db.Sequelize.STRING,
        allowNull:true
    }
},{
    freezeTableName: true,
    tableName:'productTbl',
    paranoid:true
})
category.category.hasMany(product);
product.belongsTo(category.category);
user.user.hasMany(product),
product.belongsTo(user.user)

product.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err)
})

module.exports = {db, product}