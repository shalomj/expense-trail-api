const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearer = req.header('authorization');

    if (!bearer) {
        return res.status(401)
            .json({
                status: 'failed',
                message: 'Unable to process request'
            });
    }

    const token = bearer.split(' ')[1];

    try {
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) throw err;

            req.user = decoded.user;

            next();
        })
    } catch (err) {
        return res.status(401)
            .json({
                status: 'failed',
                message: 'Unable to process request'
            });
    }
};