import { Schema, model } from "mongoose";

const User = new Schema({
    userName: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    todos: {type: Array, require: true}
})

export default model('User', User);