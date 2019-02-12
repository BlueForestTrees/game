import api from "../src"
import ENV from "../src/env"
import {init, withError, withTest} from "test-api-express-mongo"
import {createStringObjectId, createObjectId} from "test-api-express-mongo"
import {authGod, authSimple, god} from "./database/users"
import {cols} from "../src/collections"

describe('game', function () {

    beforeEach(init(api, ENV, cols))

    const game = {
        _id: createObjectId(),
        type: "qui2",
        leftId: createObjectId(),
        leftBqt: 0.3654684,
        fragment: "impact",
        fragmentId: createObjectId(),
        questions: [
            {rightId: createObjectId(), coef: 0.0210648},
            {rightId: createObjectId(), coef: 9.3514684},
            {rightId: createObjectId(), coef: 0.3216474},
        ]
    }
    const gameWithOwner = {...game, oid: god._id}


    it('POST game', withTest({
        req: {
            url: "/api/game",
            method: "POST",
            body: game,
            headers: authGod
        },
        res: {
            body: {n: 1, ok: 1}
        },
        db: {
            expected: {
                colname: cols.GAMES,
                doc: gameWithOwner
            }
        }
    }))

    it('POST bad game', withTest({
        req: {
            url: "/api/game",
            method: "POST",
            body: {},
            headers: authGod
        },
        res: {
            code: 400
        }
    }))

    it('GET game by _id', withTest({
        db: {
            preChange: {
                colname: cols.GAMES,
                doc: gameWithOwner
            }
        },
        req: {
            url: `/api/game/${game._id}`
        },
        res: {
            body: gameWithOwner
        }
    }))

})