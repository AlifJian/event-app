import { Types } from "mongoose";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "./env";


export interface IUserToken
  extends Omit<
    User,
    | "fullname"
    | "username"
    | "email"
    | "password"
    | "profilePicture"
    | "isActive"
    | "activationCode"
  > {
    id? : Types.ObjectId
  }

export const getToken = (user : IUserToken): string => {
    
    const token = jwt.sign(user, JWT_SECRET_KEY, {
        expiresIn : "1h"
    })

    return token
}

export const getData = (token : string): IUserToken => {
    const user = jwt.verify(token, JWT_SECRET_KEY) as IUserToken

    return user
}