import { config } from "dotenv";

config();


export const DATABASE_URL = process.env.MONGODB_URL || ""

export const SECRET_KEY = process.env.SECRET_KEY || ""

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ""