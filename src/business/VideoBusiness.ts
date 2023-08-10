import { VideoDatabase } from "../database/VideoDatabase"
import { VideoDB } from "../models/types"
import { Video } from "../models/video"

export class VideoBusiness {
    public getVideos = async () => {
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
        const output = videos
        return output
    }

    public createVideo = async (input: any) => {
        const { id, title, durSeconds } = input

        if (typeof id !== "string") {
            // res.status(400)
            throw new Error("'id' deve ser string")
        }
        if (typeof title !== "string") {
            // res.status(400)
            throw new Error("'title' deve ser string")
        }
        if (typeof durSeconds !== "number") {
            // res.status(400)
            throw new Error("'durSeconds' deve ser number")
        }

        const videoDatabase = new VideoDatabase()
        const validateId = await videoDatabase.findVideoById(id)


        if (validateId) {
            // res.statusCode = 400
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
        const output = {
            message: "Video inserido com sucesso",
            video: newVideo
        }

        return output
    }

    public editVideo = async (input: any) => {
        const { title, durSeconds, dateUpload, updateId } = input

        if (typeof updateId !== "string") {
            // res.status(400)
            throw new Error("'ID' deve ser string")
        }

        const videoDatabase = new VideoDatabase()
        const validatedId: VideoDB = await videoDatabase.findVideoById(updateId)

        if (!validatedId) {
            // res.status(404)
            throw new Error("'id' não encontrado")
        }

        const updateVideo: VideoDB = {
            id: updateId,
            title: title || validatedId.title,
            dur_seconds: durSeconds || validatedId.dur_seconds,
            date_upload: dateUpload || validatedId.date_upload
        }

        await videoDatabase.editVideo(updateVideo, updateId)

        const output = {
            message: "Vídeo alterado com sucesso",
            updateVideo: updateVideo
        }
        return output
    }

    public deleteVideo = async (input: any) => {
        const { deleteId } = input

        if (typeof deleteId !== "string") {
            // res.status(400)
            throw new Error("'ID' deve ser string")
        }

        const videoDatabase = new VideoDatabase()
        const validatedId = await videoDatabase.findVideoById(deleteId)

        if (!validatedId) {
            // res.status(404)
            throw new Error("'id' não encontrado")
        }

        await videoDatabase.deleteVideo(deleteId)
        const output = {
            message: "Vídeo deletado com sucesso",
            video: validatedId
        }

        return output
    }
}