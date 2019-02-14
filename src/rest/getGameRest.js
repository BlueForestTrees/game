import {Router, run} from "express-blueforest"
import {col} from "mongo-registry"
import {cols} from "../collections"
import {mongoId, optionnalPageSize} from "../validations"

const router = Router()
const games = col(cols.GAMES)

router.get("/api/game/:_id",
    mongoId("_id"),
    run(filter => games.findOne(filter))
)

router.get("/api/game",
    mongoId("aidx").optional(),
    mongoId("oid").optional(),
    optionnalPageSize,
    run(({aidx, oid, ps}) => {
        const filter = {}
        aidx && (filter._id = {$lt: aidx})
        oid && (filter.oid = oid)
        return col(cols.GAMES)
            .find(filter)
            .sort({_id: -1})
            .limit(ps)
            .toArray()
    }))


module.exports = router
