import figlet from "figlet";


export async function printAsciiArt(txt:string){
    return new Promise((resolve,reject)=>{
        figlet.text(txt,(err,asciiArt)=>{
            if(err) reject(err);
            console.log(asciiArt)
            resolve(asciiArt)
        })
    })
}