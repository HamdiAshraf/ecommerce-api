
const appError = require('../utils/appError')

exports.allowedTo = (req, res, next) => {

    if (req.currentUser.isAdmin === true) {
        next();

    }
    else {
        return next(appError.create('this role is not authorized', 401));
    }


}