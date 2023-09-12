import * as crypto from "crypto";

export const random = ()=>crypto.randomBytes(128).toString('base64');

const SECRET = 'TMDB-SECRET';
export const authentication = (salt:string,password:string):string=>{
    return crypto.createHmac('sha256',[salt,password].join("/")).update(SECRET).digest('hex');
}