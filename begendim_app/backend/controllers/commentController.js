import Comment from "../models/commentModel.js";
import User from "../models/userModel.js"
import ResComment from "../models/resCommentModel.js";
import Product from "../models/productModel.js";

const createComment = async (req, res) => {

    try {
        const { userComment, userId } = req.body

        const user = await User.findById(userId);


        const createdComment = await Comment.create({
            userComment,
            userId,
            productId: req.params.id,
            username: user.name,
            userImage: user.image
        })

        res.status(200).json({
            createdComment
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}



const getAllComments = async (req, res) => {
    const prdId = req.params.id
    try {

        const comments = await Comment.find({ productId: prdId })


        let responseComment = []
        let resCommentId = []


        for (let i = 0; i < comments.length; i++) {

            resCommentId.push(comments[i].resComment)

        }   
        for (let i = 0; i < resCommentId.length; i++) {

            for (let b = 0; b < resCommentId[i].length; b++) {
                responseComment.push(await ResComment.findById(resCommentId[i][b]))
            }

        }

        res.status(200).json({
           // resCommentId,
            // productComments,
            comments,

            responseComment
        })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

}


export { createComment, getAllComments }