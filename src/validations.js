import {check} from 'express-validator/check'
import {objectNoEx, object} from "mongo-registry"

const debug = require('debug')('api:game')
import {decode} from "jsonwebtoken"

export const mongoId = field => check(field).exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
export const number = field => check(field).exists().custom(v => !isNaN(Number.parseFloat(v))).withMessage("must be a valid number").customSanitizer(Number.parseFloat)

export const X_ACCESS_TOKEN = "x-access-token"

export const validUser = (req, res, next) => {
    let token = decode(req.headers[X_ACCESS_TOKEN])
    if (!token || !token.user) {
        throwErr("Pas authentifié", "bf401")
    }
    req.user = token.user
    req.user._id = object(req.user._id)
    if (debug.enabled) {
        debug({USER: req.user})
    }
    next()
}
export const setUserIdIn = field => (o, req) => {
    o[field] = req.user._id

    return o
}

export const optionnalPageSize = [
    (req, res, next) => {
        if (!req.params.ps) {
            req.params.ps = 10
        }
        next()
    },
    check("ps").isInt({
        min: 1,
        max: 30
    }).withMessage(`must be an integer between 1 and 30 (default to ${10})`).toInt()
]