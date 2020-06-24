
var Sequelize = require('sequelize')

var sequelize = new Sequelize('fitnessdb','root','12345678',{
    host : 'localhost',
    dialect: 'mysql',
    logging: false
})

sequelize.authenticate()
.then(
    function(){
        console.log('db connection successfull')
    }
)
.catch(
    function(err){
        console.log(err)
    }
)

module.exports = {
    Sequelize, sequelize
}