import swaggerAutogen from "swagger-autogen";


const doc = {
    info : {
        version : "v0.1",
        title : "API Event App",
        description : "Dokumentasi untuk API Event APP"
    },
    servers : [
        {
            url : "https://event-app-eight-plum.vercel.app/api",
            description : "Production"
        },
        {
            url : "http://localhost:3000/api",
            description : "Local Server"
        }
    ],

    components : {
        securitySchemes : {
            bearerAuth : {
                type : "http",
                scheme : "bearer" ,
            },
        },
        schemas  : {
            LoginRequest : {
                identifier : "XinJian",
                password : "test1234"
            }
        }
    }
}

const output = "./swagger.json"

const endpoint = ["../routes/api.ts"]

swaggerAutogen({openapi: "3.0.0"})(output, endpoint, doc)