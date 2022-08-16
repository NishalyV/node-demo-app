const User = require('../model/user');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('../config/config.json')


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.jwtSecret
},
     (jwtPayload, cb)=> {
        console.log(jwtPayload,cb);
        return User.findOne({ _id: jwtPayload.user_id })
            .then(user => {
                console.log(user);
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));


module.exports = passport;