import { deleteUser, getAllUsers, updateUser } from '../controller/user'
import express from "express"
import { isAuthenticated, isOwner } from '../middleware';


const userRouter = (router: express.Router)=>{
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
}

export default userRouter