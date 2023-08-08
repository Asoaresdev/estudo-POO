import { videoDB } from "../models/types"
import { Video } from "../models/video"
import { BaseDatabase } from "./BaseDatabase"

export class VideoDatabase extends BaseDatabase {
    public static TABLE_VIDEO = "video"

    public async getAllVideos() {
        const result: videoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)  
            
        return result
    }

    public async findVideoById (id:string) {
        const [videoDB]: Video[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)
            .where({id:id})

        return videoDB
    }

    public async insertVideo (newVideoDB: videoDB) {
        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)
            .insert(newVideoDB)
    }

    public async editVideo (editVideo:videoDB, editId:String) {
        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)
            .update(editVideo)
            .where({id:editId})
    }
}