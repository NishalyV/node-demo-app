const passport = require('passport');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token')
const config = require('../config/config.json')
const User = require('../model/user')
const bcrypt = require('bcryptjs');



module.exports.authentication = function (req, res, next) {
    const reqData = req.body;
    User.findOne({ email: reqData.email })
        .then(user => {
            if (user) {
                if (user['is_student']) {
                bcrypt.compare(reqData.password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        const _jwt_info = {
                            user_id: user['_id'],
                            email: user['email']
                        }
                        const token = jwt.sign(_jwt_info, config.jwt.jwtSecret,{ expiresIn: '1h' })
                        const refreshToken = randtoken.uid(32)
                        user.refresh_token = refreshToken;
                        User.findOneAndUpdate({ _id: user.id }, user, function (err, doc) {
                            console.log(doc)
                            return res.status(200).json({ user_id: user.id, access_token: token, refresh_token: refreshToken });
                        })
                    } else {
                        return res.status(400).json({ "message": 'Wrong password' });
                    }
                });
            }else {
                return res.status(401).json({ errors: { 'message': 'User does not have Access' } })
            }
            } else {
                return res.status(400).json({ "message": 'No User Found' });
            }

        })
        .catch(err => {
            res.status(400).json({ errors: err });
        });
}

module.exports.admin_authentication = function (req, res, next) {
    
    const reqData = req.body;
    console.log('skjdbfkj',reqData)
    User.findOne({ email: reqData.email })
        .then(user => {
            if (user) {
                console.log(user,user['is_admin'])
                if (user['is_admin']) {
                bcrypt.compare(reqData.password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        const _jwt_info = {
                            user_id: user['_id'],
                            email: user['email']
                        }
                        const token = jwt.sign(_jwt_info, config.jwt.jwtSecret,{ expiresIn: '1h' })
                        const refreshToken = randtoken.uid(32)
                        user.refresh_token = refreshToken;
                        User.findOneAndUpdate({ _id: user.id }, user, function (err, doc) {
                            console.log(doc)
                            return res.status(200).json({ user_id: user.id, access_token: token, refresh_token: refreshToken });
                        })
                    } else {
                        return res.status(400).json({ "message": 'Wrong password' });
                    }
                });
            }else {
                return res.status(401).json({ errors: { 'message': 'User does not have Access' } })
            }
            } else {
                return res.status(400).json({ "message": 'No User Found' });
            }

        })
        .catch(err => {
            res.status(400).json({ errors: err });
        });
}

module.exports.staff_authentication = function (req, res, next) {
    const reqData = req.body;
    User.findOne({ email: reqData.email })
        .then(user => {
            if (user) {
                if (user['is_staff']) {
                bcrypt.compare(reqData.password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        const _jwt_info = {
                            user_id: user['_id'],
                            email: user['email']
                        }
                        const token = jwt.sign(_jwt_info, config.jwt.jwtSecret,{ expiresIn: '1h' })
                        const refreshToken = randtoken.uid(32)
                        user.refresh_token = refreshToken;
                        User.findOneAndUpdate({ _id: user.id }, user, function (err, doc) {
                            console.log(doc)
                            return res.status(200).json({ user_id: user.id, access_token: token, refresh_token: refreshToken });
                        })
                    } else {
                        return res.status(400).json({ "message": 'Wrong password' });
                    }
                });
            }else {
                return res.status(401).json({ errors: { 'message': 'User does not have Access' } })
            }
            } else {
                return res.status(400).json({ "message": 'No User Found' });
            }

        })
        .catch(err => {
            res.status(400).json({ errors: err });
        });
}

module.exports.token = function (req, res, next) {
    const refreshToken = req.body.refresh_token
    console.log(refreshToken)
    if (refreshToken) {
        User.findOne({ refresh_token: refreshToken }, function (err, doc) {
            console.log(doc)
            if (err) {
                return res.status(400).json({ errors: 'Invalid refresh token' });
            }
            if (doc) {
                user_json = doc.toJSON()
                delete user_json['password']
                delete user_json['refresh_token']
                const token = jwt.sign(user_json, config.jwt.jwtSecret, { expiresIn: '1h' })
                const refreshToken = randtoken.uid(32)
                doc.refresh_token = refreshToken
                User.findOneAndUpdate({ _id: doc.id }, doc, function (err, user) {
                    console.log(doc)
                    return res.status(200).json({ user_id: user.id, access_token: token, refresh_token: refreshToken });
                })
            } else {
                return res.status(400).json({ errors: 'Invalid refresh token' });
            }
        })
    } else {
        return res.status(400).json({ errors: 'Invalid refresh token' });
    }
}