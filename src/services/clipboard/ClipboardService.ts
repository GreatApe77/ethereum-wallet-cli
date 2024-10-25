export interface ClipboardService{
    copyToClipboard(text:string):Promise<void>
}