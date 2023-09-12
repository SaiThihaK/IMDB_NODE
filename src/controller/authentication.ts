import express from "express";
import {createUser, getUserByEmail} from "../db/user";
import {authentication, random} from "../helper";

const register = (req: express.Request, res: express.Response) => {
    try {
        const {userName, email, password} = req.body;
        const existUser = getUserByEmail(email);
        if (!userName || !email || !password) {
            return res.status(400).json({message: "field is missing"});
        }
        if (existUser) {
            return res.send(200).json({message: "user already exist"});
        }

        const salt = random();

        const user = createUser({
            email,
            userName,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.send(200).json({data: user}).end();


    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }

}