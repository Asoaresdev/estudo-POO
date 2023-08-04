export class Video {
    constructor(
        private id: string,
        private title: string,
        private durSeconds: number,
        private dateUpload: string,
    ){}

    public setId = (value:string): void => {
        this.id=value
    } 
    public getId = (): string => {
        return this.id
    } 

    
    public setTitle  = (value:string): void => {
        this.title=value
    } 
    public getTitle = (): string => {
        return this.title
    } 

    public setDurSeconds  = (value:number): void => {
        this.durSeconds=value
    } 
    public getDurSeconds = (): number => {
        return this.durSeconds
    } 

    public setDateUpload  = (value:string): void => {
        this.dateUpload = value
    } 
    public getDateUpload = (): string => {
        return this.dateUpload
    } 
}