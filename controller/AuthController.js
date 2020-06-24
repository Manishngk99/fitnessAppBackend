var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var user = require('../model/UserModel.js');

function validator(req, res, next) {
    console.log(req.body)
    user.user.findOne({
        where: { username: req.body.username }
    })
        .then(function (result) {
            if (result === null) {
                next();
            }
            else {
                console.log('User has already been registered using this email.');
            }
        })
        .catch(function (err) {
            console.log(err)
        })
}

function passwordCheck(req, res, next) {
    console.log(req.body.password, req.passwordFromDB)
    bcrypt.compare(req.body.password, req.passwordFromDB)
        .then(function (result) {
            console.log(result);
            if (result === true) {
                next()
            }
            else {
                res.json({ status: 500, message: 'Password Invalid' });
            }
        })
        .catch(function (err) {
            next(err);
        })
}

function checkToken(req, res, next) {
    if (req.headers.authorization === undefined) {
        res.json({ status: 401, message: "Unauthorized" })
    }
    console.log(req.headers.authorization);

    var token = req.headers.authorization.slice(7, req.headers.authorization.length)
    jwt.verify(token, 'keyforSecrecy', function (err, result) {
        console.log(err);
        console.log(result.id);
        req.id = result.id;
        next()
    })
}

function verifyAdmin(req, res, next) {
    user.user.findOne({
        where: {
            id: req.id
        }
    }).then(function (result) {
        if (result.admin === 1) {

            next();
        }
        else {
            res.json({
                message: "you are not an admin"
            })
        }
    })
}

module.exports = {
    validator,
    passwordCheck,
    checkToken,
    verifyAdmin
}