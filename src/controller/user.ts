import express from "express"
import {  deleteUserById, getUserById, getUsers } from "../db/user";

export const getAllUsers =async (req:Express.Request,res:express.Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400)
    }
}


export const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        console.log('delete')
       await deleteUserById(id);
    return res.status(200).json("user delete successfuly").end();  
    } catch (error) {
        console.log(error);
        res.status(400);
    }
}
export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
    const { userName } = req.body;

    if (!userName) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);
    
    // user.userName = userName;
    // await user.save();

    return res.status(200).json("user update successfully").end();  
    } catch (error) {
        console.log(error);
        res.status(400);
    }
}