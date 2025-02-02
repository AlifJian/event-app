import express from "express"
import router from "./routes/api"
import bodyParser from "body-parser"
import database from "./utils/database"
import docs from "./docs/route"
import cors from "cors"

async function init(){
    
    const app = express()
    const PORT = 3000
    
    try {
        
        const dbResult = await database()

        console.log(`Database Info: ${dbResult}`)


        app.use(cors())

        // Body Parser Middleware
        app.use(bodyParser.json())
        
        // Router Middleware
        app.use("/api", router)

        docs(app)
        
        app.listen(PORT, () => {
            console.log(`Running in http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
    
}

init()