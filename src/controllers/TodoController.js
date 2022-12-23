import Todo from "../models/todoModel.js";


const TodoController ={
    async createTask(req, res){
        const {userId,task}= req.body;
        if(task){
            const todoBoard =  new Todo({
                userId,
                task,
            });
            await todoBoard.save().then()
            return res.status(201).json({
                task,
                msg: 'success'
             })
            }
             else {
                res.status(404).json({
                  message: "No data found",
                });
              }
        },
async updateTask(req, res){
    const {userId,task}=req.body;
    
    console.log('jdj' ,req.body)
    // let tasks = Todo.findById({_id});
if(task){
const update =await Todo.findOneAndUpdate({userId},
{$set:{task}})
return res.status(200).json({msg:'updated successfully'})
}
else {
    return res.status(404).json({msg:'not found'})
}
},
async getTask(req, res) {
const {userId,task}=req.body
if(userId){
    const get = await Todo.find({userId})
    res.status(200).json({get,
        msg:'get task successfully'})
}
else{
    return res.status(404).json({msg:'not found'})
}
},
async deleteTask(req,res){
    const {_id,task}=req.body
if(_id){
    const delet = await Todo.deleteOne({_id})
    res.status(200).json({delet,msg:'successfully deleted'})
}else{
    res.status(404).json({msg:'not found'})
}
}
}

export default TodoController;