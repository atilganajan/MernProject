import mongoose from "mongoose";


const resCommentSchema = mongoose.Schema({

    // commentId: {
    //     type: String,
    //     required: true
    // },
    resComment: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userImage: {
        type: String
    }

})

const ResComment = mongoose.model("resComment", resCommentSchema)

 export default ResComment;

// // import mongoose from "mongoose";
// // const Schema = mongoose.Schema;

// // const resCommentSchema = new Schema({

// //     content: {
// //         type: String,
// //         required: true
// //     },
// //     ownerComment: [{
// //         type : Schema.Types.ObjectId,
// //         ref: "comment"
// //     }]

// // })

// //  const ResComment = mongoose.model("resCommet", resCommentSchema)

// // export default ResComment;