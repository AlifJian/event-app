import mongoose from "mongoose";
import { DATABASE_URL } from "./env";


export default async function connect(){
    try{
        await mongoose.connect(DATABASE_URL, {
            "dbName" : "db-acara"
        })
        return Promise.resolve("Success Conected")
    }catch(error){
        return Promise.reject(error)
    }
}