export interface Controller{
    handle(): Promise<void>;
}