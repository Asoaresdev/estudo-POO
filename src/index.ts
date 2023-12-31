import express, { Request, Response } from "express"
import cors from "cors"
import { Video } from "./models/video"
import { VideoType, VideoDB } from "./models/types"
import { VideoDatabase } from "./database/VideoDatabase"
import { VideoController } from "./controller/VideoController"
import { videoRouter } from "./router/videoRouter"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log("servidor na porta 3003");
})

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("PONG")
})
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Bem vindo(a) a API desenvolvida para estudos/prática de POO e Arquitetura")
})

app.use("/videos", videoRouter)


// const videoController = new VideoController()

// app.get("/videos",videoController.getVideos)

// // app.get("/videos", async (req: Request, res: Response) => {
// //     try {
// //         // const result = await db("video")
// //         const videoDatabase = new VideoDatabase()
// //         const result = await videoDatabase.getAllVideos()
        
// //         const videos: Video[] = result.map((videoDB) =>
// //             new Video(
// //                 videoDB.id,
// //                 videoDB.title,
// //                 videoDB.dur_seconds,
// //                 videoDB.date_upload
// //             )
// //         )
        
// //         res.status(200).send(videos)

// //     } catch (error) {
// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }
// //         if (error instanceof Error) {
// //             res.send(error.message)
// //         } else {
// //             res.send("Erro inesperado")
// //         }
// //     }
// // })

// app.post("/videos", videoController.addNewVideo)
// // app.post("/videos", async (req: Request, res: Response) => {
// //     try {
// //         const { id, title, durSeconds } = req.body
// //         if (typeof id !== "string") {
// //             res.status(400)
// //             throw new Error("'id' deve ser string")
// //         }
// //         if (typeof title !== "string") {
// //             res.status(400)
// //             throw new Error("'title' deve ser string")
// //         }
// //         if (typeof durSeconds !== "number") {
// //             res.status(400)
// //             throw new Error("'durSeconds' deve ser number")
// //         }

// //         const videoDatabase = new VideoDatabase()
// //         const validateId = await videoDatabase.findVideoById(id)
// //         // const [validateId] = await db("video").where({ id: id })

// //         if (validateId) {
// //             res.statusCode = 400
// //             throw new Error("ID já cadastrado")
// //         }
// //         const newVideo = new Video(
// //             id,
// //             title,
// //             durSeconds,
// //             new Date().toISOString()
// //         )
// //         const newVideoDB:VideoDB = {
// //             id: newVideo.getId(),
// //             title: newVideo.getTitle(),
// //             dur_seconds: newVideo.getDurSeconds(),
// //             date_upload: newVideo.getDateUpload()
// //         }
// //             // await db("video").insert(newVideoDB)
// //             await videoDatabase.insertVideo(newVideoDB)
// //         res.status(201).send("Video cadastrado com sucesso")
// //     } catch (error) {
// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }
// //         if (error instanceof Error) {
// //             res.send(error.message)
// //         } else {
// //             res.send("Erro inesperado")
// //         }
// //     }
// // })

// app.put("/videos/:id", videoController.editVideo)
// // app.put("/videos/:id", async (req: Request, res: Response) => {
// //     try {
// //         const updateId = req.params.id
// //         const { title, durSeconds, dateUpload } = req.body

// //         if (typeof updateId !== "string") {
// //             res.status(400)
// //             throw new Error("'ID' deve ser string")
// //         }

// //         // const [validatedId]: TVideo[] = await db("video").where({ id: updateId })
// //         const videoDatabase = new VideoDatabase()
// //         const validatedId: VideoDB = await  videoDatabase.findVideoById(updateId)

// //         if (!validatedId) {
// //             res.status(404)
// //             throw new Error("'id' não encontrado")
// //         } else {         

// //             // ========entender==========

// //             // const newUpdateVideo = new Video(
// //             //     validatedId.id,
// //             //     validatedId.title, 
// //             //     validatedId.durSeconds, 
// //             //     validatedId.dateUpload
// //             // )
            
// //             const updateVideo: VideoDB = {
// //                 id: updateId,
// //                 title: title || validatedId.title,
// //                 dur_seconds: durSeconds || validatedId.dur_seconds,
// //                 date_upload: dateUpload || validatedId.date_upload
// //             }

// //             // const updateVideo: videoDB = {
// //             //     id: updateId,
// //             //     title: title ,
// //             //     dur_seconds: durSeconds ,
// //             //     date_upload: dateUpload  
// //             // }
            
// //             await videoDatabase.editVideo(updateVideo, updateId)
// //             res.status(200).send("Vídeo alterado com sucesso")
// //         }
// //     } catch (error) {
// //         if (req.statusCode === 200) {
// //             res.status(500)
// //         }

// //         if (error instanceof Error) {
// //             res.send(error.message)
// //         } else {
// //             res.send("Erro inesperado")
// //         }
// //     }
// // })

// app.delete("/videos/:id", videoController.deleteVideo)
// // app.delete("/videos/:id", async (req: Request, res: Response) => {
// //     try {
// //         const deleteId = req.params.id

// //         if (typeof deleteId !== "string") {
// //             res.status(400)
// //             throw new Error("'ID' deve ser string")
// //         }

// //         // const [validatedId]: TVideo[] = await db("video").where({ id: deleteId })
// //             const videoDatabase = new VideoDatabase()
// //             const validatedId = await videoDatabase.findVideoById(deleteId)

// //         if (!validatedId) {
// //             res.status(404)
// //             throw new Error("'id' não encontrado")
// //         } else {
// //             // await db("video").delete().where({ id: deleteId })
// //             await videoDatabase.deleteVideo(deleteId)
// //             res.status(200).send("Vídeo deletado com sucesso")
// //         }
// //     } catch (error) {
// //         if (req.statusCode === 200) {
// //             res.status(500)
// //         }

// //         if (error instanceof Error) {
// //             res.send(error.message)
// //         } else {
// //             res.send("Erro inesperado")
// //         }
// //     }
// // })