import {Request, Response} from "express"

export default {
    getDummy(req : Request, res : Response) {
        res.status(200).json({
            message : "OK"
        })
    }
}