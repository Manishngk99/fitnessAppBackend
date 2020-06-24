// var express = require('express');
var user = require('../model/UserModel.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function hashGen(req, res, next) {
    
    saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            // console.log(hash);
            req.userHash = hash;
            next();
        })
        .catch(function (err) {
            next('has gen error');
            console.log(err);
        })
}

function userRegistration(req, res, next) {
    console.log(req.body);
    user.user.create({
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.userHash,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        profileimage: req.body.profileimage,
        height: req.body.height,
        weight: req.body.weight
    })
        .then(function (result) {
            res.status(201);
            res.json({
                status: 201,
                message: 'you have registered successfully'
            })
        })
        .catch(function (err) {
            console.log(err)
            next(err);
        })
}

function userLogin(req, res, next) {
    user.user.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(function (result) {
            if (result === null) {
                res.status(404);
                res.json({
                    message: "Invalid User!"
                })
            }
            else {
                req.id = result.dataValues.id;
                bcrypt.compare(req.body.password, result.dataValues.password)
                    .then(function (isMatch) {
                        if (!isMatch) {
                            let err = new Error('Username or password did not match!');
                            err.status = 404;
                            return next(err);
                        }
                        else {
                            console.log(req.id);
                            var payLoad = {
                                id: req.id
                            }
                            jwt.sign(payLoad, 'keyforSecrecy', function (err, resultToken) {
                                console.log(err)
                                console.log(resultToken)

                                res.json({
                                    status: "200",
                                    token: resultToken
                                })
                            })
                        }
                    })
            }
        })
}


function userUpdate(req, res, next) {
    user.user.update({
        fullname: req.body.fullname,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        height: req.body.height,
        weight: req.body.weight
    }, {
        where: {
            id: req.id
        }
    })
        .then(function (result) {
            if (result !== null) {
                res.json({ status: 200, message: 'User update successfull' })
            } 
        })
        .catch(function (err) {
            console.log(err)
        })
}

function userDelete(req, res, next) {
    console.log(req.params.id);
    if (req.params.id) {
        res.status(500);
        res.json({ status: 500, message: 'id is not provided' })
    } else {
        user.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (result) {
                console.log(result + 'delete');
                if (result === 0) {
                    res.status(400);
                    res.json({ status: 400, message: 'user not found' })
                } else {
                    console.log(result);
                    res.status(200);
                    res.json({ status: 200, message: 'user deleted successfull' });
                }
            })
            .catch(function (err) {
                next(err)
            })
    }
}

function getUser(req, res, next) {
    user.user.findOne({
        where: {
            id: req.id
        }
    })
        .then(function (result) {
            if (result === null) {
                res.json({ status: 404, message: 'User not found' })
            } else {
                res.json(result)
            }
        })
        .catch(function (err) {
            res.json({ status: 500, message: 'Error while displaying user!' })
        })
}

module.exports = {
    hashGen,
    userRegistration,
    userLogin,
    userUpdate,
    userDelete,
    getUser

}