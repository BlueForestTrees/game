import {Router, run} from "express-blueforest"
import {col} from "mongo-registry"
import {cols} from "../collections"
import {mongoId} from "../validations"

const router = Router()
const games = col(cols.GAMES)

router.get("/api/game/:_id",
    mongoId("_id"),
    run(filter => games.findOne(filter))
)


module.exports = router
