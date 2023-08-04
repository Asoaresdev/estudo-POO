export class Video {
    constructor(
        private id: string,
        private title: string,
        private durSeconds: number,
        private dateUpload: string,
    ){}

    public getId = (value:string): void => {
        this.id=value
    } 
    public setId = (): string => {
        return this.id
    } 

    
    public getTitle = (value:string): void => {
        this.title=value
    } 
    public setTitle = (): string => {
        return this.title
    } 

    public getDurSeconds = (value:number): void => {
        this.durSeconds=value
    } 
    public setDurSeconds = (): number => {
        return this.durSeconds
    } 

    public getDateUpload = (value:string): void => {
        this.dateUpload = value
    } 
    public setDateUpload = (): string => {
        return this.dateUpload
    } 
}