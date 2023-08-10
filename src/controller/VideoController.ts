import { Request, Response } from "express";
import { VideoBusiness } from "../business/VideoBusiness";

export class VideoController {
    public getVideos = async (req: Request, res: Response) => {
        try {
          
            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.getVideos()
            res.status(200).send(output)

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
            const input = {
                id, 
                title, 
                durSeconds 
            }
            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.createVideo(input)

            res.status(201).send(output)
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

            const input ={
                title, 
                durSeconds, 
                dateUpload,
                updateId
            }
            
            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.editVideo(input)

                res.status(200).send(output)
            
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
            const input = {
                deleteId
            }
        const videoBusiness = new VideoBusiness()
        const output = await videoBusiness.deleteVideo(input)
                res.status(200).send(output)
            
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
