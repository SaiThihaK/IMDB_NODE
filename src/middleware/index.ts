import { getUserBySessionToken } from "../db/user";
import express from "express";
import { merge,get } from "lodash";
export const isAuthenticated = async(req:express.Request, res: express.Response, next: express.NextFunction)=>{
    try {
        const sessionToken = req.cookies["SESSIONTOKEN"];
         if (!sessionToken) {
      return res.sendStatus(403);
    }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
      console.log('user not found');
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
    
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
}
}


export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        if (!currentUserId) {
            return res.status(400);
        }
        if (currentUserId.toString() !== id) {
            return res.status(403);
        }
        return next();
    } catch (error) {
        console.log(error);
   }
   

}