
/**
 * Sleeps for given amount of time
 * @param timeInSeconds The time in seconds (defaults to 2 seconds)
 */
export async function sleep(timeInSeconds:number = 2000){
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve(undefined)},timeInSeconds*1000)
    })
}