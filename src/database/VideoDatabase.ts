import { VideoDB } from "../models/types"
import { Video } from "../models/video"
import { BaseDatabase } from "./BaseDatabase"

export class VideoDatabase extends BaseDatabase {
    public static TABLE_VIDEO = "video"

    public async getAllVideos() {
        const result: VideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)  
            
        return result
    }

    public  findVideoById = async(id:string)=> {
        const [videoDB]: VideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)
            .where({id:id})

        return videoDB
    }

    public async insertVideo (newVideoDB: VideoDB) {
        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)
            .insert(newVideoDB)
    }

    public async editVideo (editVideo:VideoDB, editId:String) {
        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)
            .update(editVideo)
            .where({id:editId})
    }
    public async deleteVideo (id:string) {
        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEO)
            .delete()
            .where({id:id})
    }
}