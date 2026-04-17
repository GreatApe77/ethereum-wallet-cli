import  qrCodeGenerator from 'qrcode-terminal'
export class QrCode{

    static render(text:string){
       
        qrCodeGenerator.generate(text,{small:true},
            (qrCode)=>{
                console.log(qrCode)
            }
        )
        
    }
}
