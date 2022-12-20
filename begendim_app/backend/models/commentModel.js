import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userComment: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    productId: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    userImage:{
        type:String
    },
    resComment:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
    // replies: [{
    //     type : Schema.Types.ObjectId,
    //     ref: "resComment"
    // }]
});


const Comment = mongoose.model("Comment", commentSchema)

export default Comment