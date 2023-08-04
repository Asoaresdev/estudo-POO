import express, { Request, Response } from "express"
import cors from "cors"
import { db } from "./database/knex"
import { Video } from "./models/Video"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log("servidor na porta 3003");
})

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("PONG")
})

app.get("/videos", async (req: Request, res: Response) => {
    try {
        const result = await db("video")
        const videos: Video[] = result.map((videoDB) =>
            new Video(
                videoDB.id,
                videoDB.title,
                videoDB.durSeconds,
                videoDB.dateUpload
            )
        )
        res.status(200).send(videos)

    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/videos", async (req: Request, res: Response) => {
    try {
        const { id, title, durSeconds } = req.body
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if (typeof title !== "string") {
            res.status(400)
            throw new Error("'title' deve ser string")
        }
        if (typeof durSeconds !== "number") {
            res.status(400)
            throw new Error("'durSeconds' deve ser number")
        }

        const [validateId] = await db("video").where({ id: id })
        console.log(validateId);

        if(validateId){
            res.statusCode = 400
            throw new Error("ID já cadastrado")
        }
        const newVideo = new Video(
            id,
            title, 
            durSeconds,
            new Date().toISOString()
        )
        console.log(newVideo);
        
        res.status(201).send(validateId)
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
})