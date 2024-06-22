const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

class AuthService {
    static verifyToken(jwtToken) {
        // process.stdout.write(jwtToken+"\n\n");
        return jwt.verify(jwtToken, secret)
    }

    static createToken(claims) {
        console.log(claims);
        return jwt.sign(claims, secret);
    }
}

module.exports = AuthService;