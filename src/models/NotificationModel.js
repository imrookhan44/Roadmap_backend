import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        
    },
    inviteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    view:{
        type:Boolean,
        default:false
            }
});

const Notification = mongoose.model('Notification',NotificationSchema);

export default Notification;
