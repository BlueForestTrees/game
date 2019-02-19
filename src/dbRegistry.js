import {col} from "mongo-registry"
import {cols} from "./collections"

export const registry = [
    {
        version: "0.0.2",
        log: "search (name, stores) IDX",
        script: () => col(cols.GAMES).createIndex({leftName: 1, fragmentName: 1})
    }
]