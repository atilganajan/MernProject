import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
 import ResComment from "../models/resCommentModel.js";


const createResComments = async (req, res) => {
    try {
        const { commentId, resComment, userId } = req.body;

        const user = await User.findById(userId);


        const createdResComment= await ResComment.create({
            resComment,
            userId,
            username: user.name,
            userImage: user.image
        })

        const comment = await Comment.findByIdAndUpdate(
            { _id: commentId },
            { $push: { resComment:createdResComment._id } },

            { new: true }
          );


        res.status(200).json({
            comment,createdResComment
            
        })
    }

    catch (error) {
        res.status(500).json({
            error
        })
    }
}


export { createResComments }