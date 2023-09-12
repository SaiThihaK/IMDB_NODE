import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false}
    }
})

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});

export const getUserBySessionToken = (token: string) => UserModel.findOne({
    ' authetication.sessionToken': token
});


export const getUserById = (id: string) => UserModel.findById({id})

export const createUser = (value: Record<string, any>) => new UserModel(value).save().then((user) => user.toObject())

export const deleteUser = (id: string) => UserModel.findByIdAndDelete({_id: id});

export const upDateUser = (id: string, value: Record<string, any>) => UserModel.findByIdAndUpdate({id, value})