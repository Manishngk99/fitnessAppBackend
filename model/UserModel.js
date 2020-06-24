var db = require('../config/dbConfig')
var user = db.sequelize.define('users',{
    //attribures
    id:{
        type:db.Sequelize.INTEGER ,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    fullname:{
        type:db.Sequelize.TEXT,
        allowNull:false
    },
    username: {
        type:db.Sequelize.STRING(200),
        unique:true,
        allowNull:false
    },
    password: {
        type:db.Sequelize.TEXT,
        allowNull:false
    },
    address:{
        type:db.Sequelize.TEXT,
        allowNull:false
    },
    phonenumber:{
        type:db.Sequelize.INTEGER,
        allowNull:true,
    },
    profileimage:{  
        type:db.Sequelize.TEXT,
        allowNull:true
    },
    admin:{
        type:db.Sequelize.INTEGER,
        allowNull: true
    },
    height:{
        type:db.Sequelize.INTEGER,
        allowNull: true
    },
    weight:{
        type:db.Sequelize.INTEGER,
        allowNull: true
    }

},
    {   
        freezeTableName: true,
        tableName:'usertbl',
        paranoid:true
    }
)
user.sync({
    logging: console.log,
    force:false
})
.then(function(){
})
.catch(function(err){
    console.log(err)
})

module.exports = {db, user}