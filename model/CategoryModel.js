var db = require('../config/dbConfig');

var category = db.sequelize.define('category', 
{

id: {
    type:db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
},

type: {
    type:db.Sequelize.STRING,
    allowNull: false
}
},
{
    freezeTableName: true,
    tableName: 'catagorytbl',
    paranoid:true
}
)

category.sync({force:false})
.then(function(){

})

.catch(function(err){
    console.log(err)
})

module.exports = {
    db, category
}