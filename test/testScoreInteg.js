import api from "../src"
import ENV from "../src/env"
import {init, withError, withTest} from "test-api-express-mongo"
import {createStringObjectId, createObjectId} from "test-api-express-mongo"
import {authGod, authSimple, god} from "./database/users"
import {cols} from "../src/collections"

describe('score', function () {

    beforeEach(init(api, ENV, cols))

    const score = {
        _id: createObjectId(),
        type: "qui2",
        gameId: createObjectId(),
        reponses:[true, false, true],
    }
    const gameWithOwner = {...score, oid: god._id}


    it('POST score', withTest({
        req: {
            url: "/api/game/score",
            method: "POST",
            body: score,
            headers: authGod
        },
        res: {
            body: {n: 1, ok: 1}
        },
        db: {
            expected: {
                colname: cols.SCORES,
                doc: gameWithOwner
            }
        }
    }))

    it('POST bad score', withTest({
        req: {
            url: "/api/game/score",
            method: "POST",
            body: {},
            headers: authGod
        },
        res: {
            code: 400
        }
    }))

})