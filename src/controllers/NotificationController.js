import Notification from "../models/NotificationModel.js";


const NotificationController ={
    async inviteUser(req,res){
        const {userId ,inviteId } = req.body;
 try{

     const Invite = new Notification({
         userId,
         inviteId,
     }) 
     await Invite.save().then ()
     return res.status(200).json({msg:'success'})
 }  catch{
     return res.status(500).json({msg:'error'})

 }     
},
async updateInvite(req, res){
const {inviteId} = req.body;
    if(inviteId == inviteId){
        const update = await Notification.updateMany({view:true});
return res.status(200).json({msg:'successfully updated',update})
    } else {
    return res.status(500).json({msg:'error'})

}
} ,
async getInvite(req,res){
    const {inviteId}= req.body;
    if (inviteId){
        const Invite = await Notification.find({inviteId}).populate("userId")
        return res.status(200).json({msg:'success',Invite})

    }  
    
    else{
        return res.status(500).json({msg:'error'})
        
    }
}
}

export default NotificationController;