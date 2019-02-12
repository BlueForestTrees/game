import {Router, run} from "express-blueforest"
import {check} from 'express-validator/check'
import {col} from "mongo-registry"
import {cols} from "../collections"
import {mongoId, setUserIdIn, validUser} from "../validations"

const router = Router()
const scores = col(cols.SCORES)

router.post("/api/game/score",
    validUser,
    mongoId("_id"),
    check("type").isIn(["qui2"]),
    mongoId("gameId"),
    check("reponses.*").isBoolean(),
    run(setUserIdIn("oid")),
    run(score => scores.insertOne(score).then(r => r.result))
)


module.exports = router

