import { Schema, model, ObjectId} from "mongoose";


const Todo = new Schema({
    content: {type: String, require: true},
    creator: {type: String, require: true}
})

export default model('Todo', Todo);