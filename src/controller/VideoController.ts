import { Request, Response } from "express";
import { VideoDatabase } from "../database/VideoDatabase";
import { Video } from "../models/video";
import { VideoDB } from "../models/types";

export class VideoController {
    public getVideos = async (req: Request, res: Response) => {
        try {
            const videoDatabase = new VideoDatabase()
            const result = await videoDatabase.getAllVideos()

            const videos: Video[] = result.map((videoDB) =>
                new Video(
                    videoDB.id,
                    videoDB.title,
                    videoDB.dur_seconds,
                    videoDB.date_upload
                )
            )

            res.status(200).send(videos)

        } catch (error) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public addNewVideo = async (req: Request, res: Response) => {
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

            const videoDatabase = new VideoDatabase()
            const validateId = await videoDatabase.findVideoById(id)


            if (validateId) {
                res.statusCode = 400
                throw new Error("ID já cadastrado")
            }
            const newVideo = new Video(
                id,
                title,
                durSeconds,
                new Date().toISOString()
            )
            const newVideoDB: VideoDB = {
                id: newVideo.getId(),
                title: newVideo.getTitle(),
                dur_seconds: newVideo.getDurSeconds(),
                date_upload: newVideo.getDateUpload()
            }

            await videoDatabase.insertVideo(newVideoDB)
            res.status(201).send("Video cadastrado com sucesso")
        } catch (error) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editVideo = async (req: Request, res: Response) => {
        try {
            const updateId = req.params.id
            const { title, durSeconds, dateUpload } = req.body

            if (typeof updateId !== "string") {
                res.status(400)
                throw new Error("'ID' deve ser string")
            }

            const videoDatabase = new VideoDatabase()
            const validatedId: VideoDB = await videoDatabase.findVideoById(updateId)

            if (!validatedId) {
                res.status(404)
                throw new Error("'id' não encontrado")
            } else {

                const updateVideo: VideoDB = {
                    id: updateId,
                    title: title || validatedId.title,
                    dur_seconds: durSeconds || validatedId.dur_seconds,
                    date_upload: dateUpload || validatedId.date_upload
                }

                await videoDatabase.editVideo(updateVideo, updateId)
                res.status(200).send("Vídeo alterado com sucesso")
            }
        } catch (error) {
            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteVideo = async (req: Request, res: Response) => {
        try {
            const deleteId = req.params.id

            if (typeof deleteId !== "string") {
                res.status(400)
                throw new Error("'ID' deve ser string")
            }

            const videoDatabase = new VideoDatabase()
            const validatedId = await videoDatabase.findVideoById(deleteId)

            if (!validatedId) {
                res.status(404)
                throw new Error("'id' não encontrado")
            } else {
                await videoDatabase.deleteVideo(deleteId)
                res.status(200).send("Vídeo deletado com sucesso")
            }
        } catch (error) {
            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}
