import  mongoose from "mongoose"; 

const TodoSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },
    task:{
        type: String,
        required: true
    }
    

});
const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;