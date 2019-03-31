const debug = require('debug')('api:game')
import {version, name} from './../package.json'
import fs from "fs"

const ENV = {
    NAME:name,
    PORT: process.env.PORT || 80,
    
    REST_PATH: process.env.REST_PATH || "rest",

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "doudou",
    DB_PWD: process.env.DB_PWD || "masta",

    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: version,

    RK_GAME_UPSERT: process.env.RK_GAME_UPSERT || "game-upsert",
    RB_PATH: process.env.RB_PATH || "mq.json"
}

ENV.RB = JSON.parse(fs.readFileSync(ENV.RB_PATH, 'utf8'))

if (debug.enabled) {
    debug({ENV})
} else {
    console.log(JSON.stringify(ENV))
}

export default ENV