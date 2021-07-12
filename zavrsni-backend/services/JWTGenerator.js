// Gets data from config/env file
const config = require('../config');
// Get jwt package
const jwt = require("jsonwebtoken");
// Gets logger
const { nodelogger } = require('../loaders/logger');
module.exports = class JWTGenerator {

    // Function that returns jwt with page index so that user can send it to server every time it gets data from it
    async generateJWT(browserIndex, role) {

        // Create payload for jwt
        const payload = {
            browserIndex: browserIndex,
            role: role,
            aud: config.jwt.audience || "localhost/api",
            iss: config.jwt.issuer || "server",
        }

        // Logg that jwt is signed
        nodelogger.info(`Sign JWT for loggined user: browserIndex(${browserIndex})`);

        // Generate token from payload
        const token = this.generateToken(payload);

        // Return token
        return token;
    }

    // Function that generates token
    generateToken(payload) {
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });
    }
}