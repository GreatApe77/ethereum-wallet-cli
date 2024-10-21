export interface Database{
    migrate():Promise<void>
    seed():Promise<void>
}