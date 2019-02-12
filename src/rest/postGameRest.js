import {mongoId, number, setUserIdIn, validUser} from "../validations"
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
    mongoId("questions.*.rightId"),
    number("questions.*.coef"),
    run(setUserIdIn("oid")),
    run(game => col(cols.GAMES)
        .insertOne(game)
        .then(res => res.result))
)



