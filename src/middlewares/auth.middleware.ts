import { NextFunction, Request, Response } from "express";
import { getData, IUserToken } from "../utils/jwt";

export interface IRequestToken extends Request {
    user? : IUserToken
}


export default (req : IRequestToken, res : Response, next : NextFunction): void => {
    const authorization = req.headers?.authorization

    try {
        if(!authorization){
            res.status(403).json({
                message : "Unauthorized",
                data : null
            })
            return
        }
    
        const [prefix, accessToken] = authorization.split(" ");
    
        if(!(prefix === "Bearer" && accessToken)){
            res.status(403).json({
                message : "Unauthorized",
                data : null
            })
            return
        }
    
        const user = getData(accessToken)
    
        if(!user){
            res.status(403).json({
                message : "Unauthorized",
                data : null
            })
            return
        }
    
        (req as IRequestToken).user = user
    
        next()
    } catch (error) {
        res.status(403).json({
            message : "Unauthorized",
            data : null
        })
    }

}