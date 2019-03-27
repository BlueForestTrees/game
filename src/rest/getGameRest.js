import {Router, run} from "express-blueforest"
import {col} from "mongo-registry"
import {cols} from "../collections"
import {mongoId, optionnalPageSize, validOptionalQ} from "../validations"
import regexEscape from "regex-escape"

const searchMixin = {date: 1, type: 1, fragmentName: 1, leftName: 1}
const router = Router()

router.get("/api/game/:_id",
    mongoId("_id"),
    run(filter => col(cols.GAMES).findOne(filter))
)

router.get("/api/game",
    mongoId("aidx").optional(),
    mongoId("oid").optional(),
    optionnalPageSize,
    validOptionalQ,
    run(({aidx, oid, ps, q}) => {
        const filter = {}
        aidx && (filter._id = {$lt: aidx})
        oid && (filter.oid = oid)
        if (q !== undefined) {
            const termFilter = {$regex: new RegExp(`^.*${regexEscape(q)}.*`, "i")}
            filter.$or = [
                {leftName: termFilter},
                {fragmentName: termFilter}
            ]
        }
        return col(cols.GAMES)
            .find(filter, searchMixin)
            .sort({date: -1})
            .limit(ps)
            .toArray()
    }))


module.exports = router
