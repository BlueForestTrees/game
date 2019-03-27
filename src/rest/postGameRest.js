import {mongoId, number, setUserIdIn, validUser, set} from "../validations"
import {check} from 'express-validator/check'
import {Router, run} from "express-blueforest"
import {col} from "mongo-registry"
import {cols} from "../collections"

const router = Router()
module.exports = router

router.post("/api/game",
    validUser,
    mongoId("_id"),
    check("type").isIn(["qui2"]),
    mongoId("leftId"),
    number("leftBqt"),
    check("fragment").isIn(["impact", "roots", "facet"]),
    mongoId("fragmentId"),
    check("fragmentName").isLength({min: 1, max: 100}),
    check("leftName").isLength({min: 1, max: 100}),
    mongoId("questions.*.rightId"),
    number("questions.*.coef"),
    run(setUserIdIn("oid")),
    run(set("date", ()=>new Date())),
    run(game => col(cols.GAMES)
        .insertOne(game)
        .then(res => res.result))
)



